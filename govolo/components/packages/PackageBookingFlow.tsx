"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  Check,
  MapPin,
  Plus,
  Star,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import type { AddOn } from "@/types/destination";
import { ApiError } from "@/utils/apiClient";
import { useApiFetch } from "@/utils/useApiFetch";
import GuestDetailsForm from "@/components/packages/GuestDetailsForm";
import type { GuestDetails } from "@/components/packages/GuestDetailsForm";
import {
  addDays,
  daysBetween,
  money,
  plural,
  toDateString,
} from "@/lib/bookingHelpers";
import { GoGift } from "react-icons/go";

const CONTAINER = "container mx-auto px-4 py-16 max-w-6xl relative z-10";

type PackageAddOn = AddOn & { _id?: string };

export type PackageData = {
  _id: string;
  price: number;
  duration: string;
  groupSize: { min: number; max: number };
  addOns?: PackageAddOn[];
  destination: {
    _id: string;
    title: string;
    location: string;
    mainImage: string;
    rating?: { average?: number; count?: number };
  };
};

type LineItem = { key: string; label: string; formula: string; amount: number };

type Selection = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  addOns: { _id: string; name: string; price: number }[];
};

export default function PackageBookingFlow({ pkg }: { pkg: PackageData }) {
  const router = useRouter();
  const apiFetch = useApiFetch();

  const { destination } = pkg;
  const maxGuests = pkg.groupSize.max;
  const addOnList: PackageAddOn[] = pkg.addOns ?? [];

  // "5 days" -> 5. If the duration text has no number, the day limit is skipped.
  const parsedDays = parseInt(pkg.duration, 10);
  const maxDays =
    Number.isFinite(parsedDays) && parsedDays > 0 ? parsedDays : undefined;

  const [selection, setSelection] = useState<Selection | null>(null);
  const step = selection ? 2 : 1;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(Math.min(2, maxGuests));
  const [children, setChildren] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);
  const [errors, setErrors] = useState<{ checkIn?: string; checkOut?: string }>(
    {},
  );
  const [today, setToday] = useState("");

  const [guest, setGuest] = useState<GuestDetails>({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    setToday(toDateString(new Date()));
  }, []);

  // ---------- derived values ----------

  const totalGuests = adults + children;
  const overMax = totalGuests > maxGuests;
  const days = checkIn && checkOut ? daysBetween(checkIn, checkOut) : 0;
  const overDuration = maxDays !== undefined && days > maxDays;
  const priceReady = days >= 1 && !overDuration;

  // The package price is flat: guests don't change it. Add-ons are flat per day.
  const lineItems: LineItem[] = [];
  if (priceReady) {
    lineItems.push({
      key: "package",
      label: "Package",
      formula: "Flat package price",
      amount: pkg.price,
    });

    selectedAddOns.forEach((i) => {
      const a = addOnList[i];
      if (!a) return;
      lineItems.push({
        key: `addon-${i}`,
        label: a.name,
        formula: `${money(a.price)} × ${plural(days, "day", "days")}`,
        amount: a.price * days,
      });
    });
  }
  const total = lineItems.reduce((sum, item) => sum + item.amount, 0);

  // ---------- step 1 handlers ----------

  const handleCheckIn = (value: string) => {
    setCheckIn(value);
    // a check-out that is now too early or too late is no longer valid
    if (checkOut && value) {
      const tooEarly = checkOut <= value;
      const tooLate =
        maxDays !== undefined && daysBetween(value, checkOut) > maxDays;
      if (tooEarly || tooLate) setCheckOut("");
    }
    setErrors((e) => ({ ...e, checkIn: undefined }));
  };

  const handleCheckOut = (value: string) => {
    setCheckOut(value);
    setErrors((e) => ({ ...e, checkOut: undefined }));
  };

  const toggleAddOn = (i: number) =>
    setSelectedAddOns((cur) =>
      cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i],
    );

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (overMax) return;

    const next: typeof errors = {};
    const todayNow = toDateString(new Date());

    if (!checkIn) {
      next.checkIn = "Please select a check-in date.";
    } else if (checkIn < todayNow) {
      next.checkIn = "Check-in can't be in the past.";
    }

    if (!checkOut) {
      next.checkOut = "Please select a check-out date.";
    } else if (checkIn && checkOut <= checkIn) {
      next.checkOut = "Check-out must be after check-in.";
    } else if (checkIn && overDuration && maxDays !== undefined) {
      next.checkOut = `This package lasts ${plural(maxDays, "day", "days")}. Check-out can't be later than that.`;
    }

    if (next.checkIn || next.checkOut) {
      setErrors(next);
      return;
    }

    setErrors({});
    setSelection({
      checkIn,
      checkOut,
      adults,
      children,
      addOns: selectedAddOns.flatMap((i) => {
        const a = addOnList[i];
        return a?._id ? [{ _id: a._id, name: a.name, price: a.price }] : [];
      }),
    });
  };

  // ---------- step 2 submit ----------

  const handleConfirm = async (details: GuestDetails) => {
    if (!selection) return;

    setSubmitting(true);
    try {
      const res = await apiFetch<{
        success: boolean;
        booking: { _id: string };
      }>("/api/booking/package", {
        method: "POST",
        body: {
          packageId: pkg._id,
          checkIn: selection.checkIn,
          checkOut: selection.checkOut,
          adults: selection.adults,
          children: selection.children,
          addOns: selection.addOns,
          guestDetails: details,
        },
        requiresAuth: true,
      });

      setBookingId(res.booking._id);
      toast.success("Your booking has been created successfully.");
      router.push("/");
    } catch (error) {
      if (error instanceof ApiError) {
        console.error("Package booking failed:", error.message, error.data);
      } else {
        console.error("Package booking failed:", error);
      }
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- styles ----------

  const dateInputClass = (hasError: boolean) =>
    `w-full p-3 rounded-xl border bg-[rgb(248,250,252)] text-[rgb(15,23,41)] focus:ring-2 focus:ring-[rgb(14,168,230)]/20 outline-none transition-all ${
      hasError
        ? "border-red-400"
        : "border-[rgb(225,231,239)] focus:border-[rgb(14,168,230)]"
    }`;
  const counterButton =
    "w-8 h-8 rounded-lg border border-[rgb(225,231,239)] flex items-center justify-center hover:bg-[rgb(242,245,247)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent";
  const labelClass =
    "text-sm font-semibold text-[rgb(15,23,41)] mb-2 flex items-center gap-2";

  const stepLabels = ["Choose Options", "Guest Details"];

  return (
    <div className="bg-[rgb(248,250,252)]">
      <div className="relative">
        <div className="py-30 px-4 flex items-center justify-center bg-gradient-to-br from-[rgb(5,15,25)] via-[rgb(8,30,45)] to-[rgb(10,65,90)]">
          <div className="container">
            <div className="flex flex-col items-center">
              <GoGift size={70} className="text-white mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-[rgb(255,255,255)]">
                All Packages
              </h1>
              <div className="h-1 w-20 bg-[rgb(14,164,230)]/50 mx-auto rounded-full mb-4"></div>
            </div>
            <p className="text-[rgb(255,255,255)]/70 text-base mx-[20px] text-center">
              Handpicked packages for unforgettable experiences around the globe
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[rgb(248,250,252)] rounded-t-3xl"></div>
      </div>

      <div className={CONTAINER}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Stepper */}
            <div className="flex items-center max-w-md">
              {stepLabels.map((label, i) => {
                const n = i + 1;
                const active = step === n;
                const done = step > n;
                return (
                  <div key={label} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        active
                          ? "bg-[rgb(14,168,230)] text-white shadow-md"
                          : done
                            ? "bg-[rgb(14,168,230)]/15 text-[rgb(14,168,230)]"
                            : "bg-[rgb(242,245,247)] text-[rgb(99,111,129)]"
                      }`}
                    >
                      {done ? <Check className="h-5 w-5" /> : n}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        active
                          ? "text-[rgb(15,23,41)]"
                          : "text-[rgb(99,111,129)]"
                      }`}
                    >
                      {label}
                    </span>
                    {i === 0 && (
                      <div className="w-12 h-px bg-[rgb(225,231,239)] mx-4"></div>
                    )}
                  </div>
                );
              })}
            </div>

            {step === 2 ? (
              <GuestDetailsForm
                guest={guest}
                onChange={(field, value) =>
                  setGuest((g) => ({ ...g, [field]: value }))
                }
                submitting={submitting}
                completed={!!bookingId}
                onBack={() => setSelection(null)}
                onSubmit={handleConfirm}
              />
            ) : (
              <form noValidate onSubmit={handleContinue}>
                <div className="space-y-6">
                  {/* Destination (fixed) */}
                  <div>
                    <p className={labelClass}>
                      <MapPin className="h-4 w-4 text-[rgb(14,168,230)]" />
                      Destination
                    </p>
                    <div className="w-full flex items-center gap-3 p-4 rounded-xl border border-[rgb(225,231,239)] bg-[rgb(248,250,252)]">
                      <img
                        src={destination.mainImage}
                        alt={destination.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="text-left min-w-0">
                        <p className="font-semibold text-[rgb(15,23,41)] truncate">
                          {destination.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[rgb(99,111,129)]">
                          <span className="flex items-center gap-0.5">
                            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                            {destination.rating?.average?.toFixed(1) ?? "0.0"} (
                            {destination.rating?.count ?? 0})
                          </span>
                          <span>•</span>
                          <span>{pkg.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block ${labelClass}`}>
                          <Calendar className="h-4 w-4 text-[rgb(14,168,230)]" />
                          Check-in
                        </label>
                        <input
                          type="date"
                          value={checkIn}
                          min={today || undefined}
                          onChange={(e) => handleCheckIn(e.target.value)}
                          className={dateInputClass(!!errors.checkIn)}
                        />
                        {errors.checkIn && (
                          <p className="text-xs text-red-500 mt-1.5">
                            {errors.checkIn}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className={`block ${labelClass}`}>
                          <Calendar className="h-4 w-4 text-[rgb(14,168,230)]" />
                          Check-out
                        </label>
                        <input
                          type="date"
                          value={checkOut}
                          min={
                            checkIn ? addDays(checkIn, 1) : today || undefined
                          }
                          max={
                            checkIn && maxDays
                              ? addDays(checkIn, maxDays)
                              : undefined
                          }
                          onChange={(e) => handleCheckOut(e.target.value)}
                          className={dateInputClass(
                            !!errors.checkOut || overDuration,
                          )}
                        />
                        {(errors.checkOut || overDuration) && (
                          <p className="text-xs text-red-500 mt-1.5">
                            {errors.checkOut ??
                              `This package lasts ${plural(maxDays ?? 0, "day", "days")}.`}
                          </p>
                        )}
                      </div>
                    </div>
                    {maxDays !== undefined && (
                      <p className="text-xs text-[rgb(99,111,129)] mt-2">
                        Your stay can be up to {plural(maxDays, "day", "days")}.
                      </p>
                    )}
                  </div>

                  {/* Guests */}
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block ${labelClass}`}>
                          <Users className="h-4 w-4 text-[rgb(14,168,230)]" />
                          Adults
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            aria-label="Decrease adults"
                            disabled={adults <= 1}
                            onClick={() => setAdults((n) => Math.max(1, n - 1))}
                            className={counterButton}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {adults}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase adults"
                            onClick={() => setAdults((n) => n + 1)}
                            className={counterButton}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className={`block ${labelClass}`}>
                          <Users className="h-4 w-4 text-[rgb(14,168,230)]" />
                          Children
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            aria-label="Decrease children"
                            disabled={children <= 0}
                            onClick={() =>
                              setChildren((n) => Math.max(0, n - 1))
                            }
                            className={counterButton}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {children}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase children"
                            onClick={() => setChildren((n) => n + 1)}
                            className={counterButton}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[rgb(99,111,129)] mt-2">
                      Maximum {plural(maxGuests, "guest", "guests")} ·{" "}
                      {totalGuests} selected
                    </p>

                    {overMax && (
                      <div
                        role="alert"
                        className="mt-3 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4"
                      >
                        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
                        <div className="text-sm text-amber-900">
                          <p className="font-semibold">Too many guests</p>
                          <p>
                            This package allows a maximum of{" "}
                            {plural(maxGuests, "guest", "guests")}, but
                            you&apos;ve selected {totalGuests}. Remove{" "}
                            {totalGuests - maxGuests} to continue.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Add-ons */}
                  <div>
                    <p className="block text-sm font-semibold text-[rgb(15,23,41)] mb-3">
                      Add-ons
                    </p>
                    {addOnList.length === 0 ? (
                      <p className="text-sm text-[rgb(99,111,129)]">
                        No add-ons available for this package.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {addOnList.map((a, i) => {
                          const selected = selectedAddOns.includes(i);
                          return (
                            <button
                              key={a._id ?? i}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => toggleAddOn(i)}
                              className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                                selected
                                  ? "border-[rgb(14,168,230)] bg-[rgb(14,168,230)]/5"
                                  : "border-[rgb(225,231,239)] hover:border-[rgb(14,168,230)]/30"
                              }`}
                            >
                              <span
                                className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center ${
                                  selected
                                    ? "bg-[rgb(14,168,230)] text-white"
                                    : "bg-[rgb(242,245,247)] text-[rgb(99,111,129)]"
                                }`}
                              >
                                {selected ? (
                                  <Check className="h-3.5 w-3.5" />
                                ) : (
                                  <Plus className="h-3.5 w-3.5" />
                                )}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[rgb(15,23,41)] truncate">
                                  {a.name}
                                </p>
                                <p className="text-xs text-[rgb(99,111,129)]">
                                  {money(a.price)} / night
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Continue */}
                  <button
                    type="submit"
                    disabled={overMax}
                    className="cursor-pointer bg-[linear-gradient(135deg,rgb(13,165,231),rgb(33,196,93))] px-6 w-full py-3 flex items-center justify-center gap-2 group font-semibold transition-all duration-300 ease-in-out text-white hover:scale-105 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Continue to Guest Details
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Summary column */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden bg-[rgb(248,250,252)] border border-[rgb(225,231,239)] rounded-3xl p-6 shadow-xl shadow-[rgb(14,168,230)]/5">
              <h3 className="font-heading font-bold text-lg text-[rgb(15,23,41)] mb-4">
                Booking Summary
              </h3>

              {priceReady ? (
                <div className="space-y-4">
                  <p className="text-xs text-[rgb(99,111,129)]">
                    {destination.location} · {plural(days, "day", "days")} ·{" "}
                    {plural(totalGuests, "guest", "guests")}
                  </p>
                  {lineItems.map((item) => (
                    <div
                      key={item.key}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <span className="text-[rgb(99,111,129)]">
                        {item.label}
                      </span>
                      <span className="font-medium">{money(item.amount)}</span>
                    </div>
                  ))}
                  <div className="h-px bg-[rgb(225,231,239)]"></div>
                  <div className="flex justify-between font-bold text-[rgb(15,23,41)]">
                    <span>Total</span>
                    <span className="text-[rgb(14,168,230)] text-xl">
                      {money(total)}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[rgb(225,231,239)]">
                    <p className="text-xs font-semibold text-[rgb(15,23,41)] mb-2">
                      How this price is calculated
                    </p>
                    <ul className="space-y-1.5 text-xs text-[rgb(99,111,129)]">
                      {lineItems.map((item) => (
                        <li key={item.key}>
                          <span className="font-medium text-[rgb(15,23,41)]">
                            {item.label}:
                          </span>{" "}
                          {item.formula}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-[rgb(99,111,129)]">
                  Select your check-in and check-out dates to see your price.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
