"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Hotel,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import LoadingBar from "@/components/ui/loadingBar";
import type { AddOn, Destination, RoomType } from "@/types/destination";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SERVICE_FEE = 0;
const RECALC_MS = 450;
const CONTAINER = "container mx-auto px-4 py-16 max-w-6xl relative z-10";

type DestinationApiResponse = {
  success: boolean;
  destination?: Destination;
};

type LineItem = {
  key: string;
  label: string;
  formula: string;
  amount: number;
};

export type BookingSelection = {
  destinationId: string;
  roomType: { name: string; price: number };
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  addOns: { name: string; price: number; unit: string }[];
  estimatedTotal: number; // display only: the server must recompute the price
};

// ---------- helpers ----------

const pad = (n: number) => String(n).padStart(2, "0");
const toDateString = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseDate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (s: string, days: number) => {
  const d = parseDate(s);
  d.setDate(d.getDate() + days);
  return toDateString(d);
};
const nightsBetween = (from: string, to: string) =>
  Math.round(
    (parseDate(to).getTime() - parseDate(from).getTime()) / 86_400_000,
  );
const money = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
const plural = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`;

// ---------- fetch wrapper (default export) ----------

export default function BookingDetails({
  initialData,
}: {
  initialData: DestinationApiResponse;
}) {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DestinationApiResponse>(initialData);
  const [loading, setLoading] = useState(false);

  const retry = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/destinations/${id}`, {
        cache: "no-store",
      });
      const json: DestinationApiResponse = await res.json();

      if (!res.ok || !json.success || !json.destination) {
        throw new Error("Unsuccessful response");
      }
      setData(json);
    } catch {
      setData({ success: false });
      toast.error("We couldn't load this destination.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={CONTAINER}>
        <LoadingBar />
        <p className="text-center text-sm text-[rgb(99,111,129)] py-24">
          Loading booking details…
        </p>
      </div>
    );
  }

  if (!data.success || !data.destination) {
    return (
      <div className={CONTAINER}>
        <div className="flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl text-center px-6">
          <p className="text-gray-500">
            We couldn&apos;t load this destination.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={retry}
              className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
            >
              Retry
            </button>
            <Link
              href={`/destinations/${id}`}
              className="px-6 py-2.5 rounded-xl border border-border text-[rgb(15,23,42)] font-semibold hover:bg-white transition-all"
            >
              Back to destination
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <BookingFlow key={data.destination._id} destination={data.destination} />
  );
}

// ---------- the booking flow ----------

function BookingFlow({ destination }: { destination: Destination }) {
  const rooms: RoomType[] = destination.roomTypes?.length
    ? destination.roomTypes
    : [{ name: "Standard Room", price: destination.price }];
  const addOnList: AddOn[] = destination.addOns ?? [];
  const maxGuests = destination.groupSize?.max;

  const [confirmed, setConfirmed] = useState<BookingSelection | null>(null);
  const step = confirmed ? 2 : 1;

  const [roomIndex, setRoomIndex] = useState(0);
  const [roomMenuOpen, setRoomMenuOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(() =>
    Math.max(1, maxGuests !== undefined ? Math.min(2, maxGuests) : 2),
  );
  const [children, setChildren] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);
  const [errors, setErrors] = useState<{ checkIn?: string; checkOut?: string }>(
    {},
  );
  const [today, setToday] = useState("");
  const roomMenuRef = useRef<HTMLDivElement>(null);

  // Set after mount so the server and the browser can't disagree about "today"
  useEffect(() => {
    setToday(toDateString(new Date()));
  }, []);

  // Close the room menu when clicking outside it
  useEffect(() => {
    if (!roomMenuOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (
        roomMenuRef.current &&
        !roomMenuRef.current.contains(e.target as Node)
      ) {
        setRoomMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [roomMenuOpen]);

  // ---------- derived values ----------

  const room = rooms[roomIndex] ?? rooms[0];
  const totalGuests = adults + children;
  const overMax = maxGuests !== undefined && totalGuests > maxGuests;
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const hasDates = nights >= 1;

  const lineItems: LineItem[] = [];
  if (hasDates) {
    lineItems.push({
      key: "room",
      label: room.name,
      formula: `${money(room.price)} × ${plural(nights, "night", "nights")}`,
      amount: room.price * nights,
    });

    selectedAddOns.forEach((i) => {
      const a = addOnList[i];
      if (!a) return;
      const unit = a.unit ?? "/night";
      const qty =
        unit === "/person" ? totalGuests : unit === "/trip" ? 1 : nights;
      const qtyLabel =
        unit === "/person"
          ? plural(totalGuests, "guest", "guests")
          : unit === "/trip"
            ? "1 trip"
            : plural(nights, "night", "nights");

      lineItems.push({
        key: `addon-${i}`,
        label: a.name,
        formula: `${money(a.price)} × ${qtyLabel}`,
        amount: a.price * qty,
      });
    });

    lineItems.push({
      key: "fee",
      label: "Service fee",
      formula: "Flat fee",
      amount: SERVICE_FEE,
    });
  }
  const total = lineItems.reduce((sum, item) => sum + item.amount, 0);

  // ---------- short loading bar whenever the price inputs change ----------

  const pricingKey = `${roomIndex}|${checkIn}|${checkOut}|${adults}|${children}|${selectedAddOns.join(",")}`;
  const prevPricingKey = useRef(pricingKey);
  const [recalcTick, setRecalcTick] = useState(0);
  const [recalculating, setRecalculating] = useState(false);

  useEffect(() => {
    if (prevPricingKey.current === pricingKey) return;
    prevPricingKey.current = pricingKey;

    setRecalcTick((t) => t + 1);
    setRecalculating(true);
    const timer = setTimeout(() => setRecalculating(false), RECALC_MS + 100);
    return () => clearTimeout(timer);
  }, [pricingKey]);

  // ---------- handlers ----------

  const handleCheckIn = (value: string) => {
    setCheckIn(value);
    // a check-out on or before the new check-in is no longer valid
    if (checkOut && value && checkOut <= value) setCheckOut("");
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

  const handleSubmit = (e: React.FormEvent) => {
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
    }

    if (next.checkIn || next.checkOut) {
      setErrors(next);
      return;
    }

    setErrors({});
    setConfirmed({
      destinationId: destination._id,
      roomType: { name: room.name, price: room.price },
      checkIn,
      checkOut,
      nights,
      adults,
      children,
      addOns: selectedAddOns.flatMap((i) =>
        addOnList[i]
          ? [
              {
                name: addOnList[i].name,
                price: addOnList[i].price,
                unit: addOnList[i].unit ?? "/night",
              },
            ]
          : [],
      ),
      estimatedTotal: total,
    });
  };

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

  return (
    <div className={CONTAINER}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Stepper */}
          <div className="flex items-center justify-between max-w-md">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step === 1
                    ? "bg-[rgb(14,168,230)] text-white shadow-md"
                    : "bg-[rgb(14,168,230)]/15 text-[rgb(14,168,230)]"
                }`}
              >
                {step === 1 ? 1 : <Check className="h-5 w-5" />}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step === 1 ? "text-[rgb(15,23,41)]" : "text-[rgb(99,111,129)]"
                }`}
              >
                Select Package
              </span>
              <div className="w-12 h-px bg-[rgb(225,231,239)] mx-4"></div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step === 2
                    ? "bg-[rgb(14,168,230)] text-white shadow-md"
                    : "bg-[rgb(242,245,247)] text-[rgb(99,111,129)]"
                }`}
              >
                2
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step === 2 ? "text-[rgb(15,23,41)]" : "text-[rgb(99,111,129)]"
                }`}
              >
                Guest Details
              </span>
            </div>
          </div>

          {step === 2 ? (
            <div className="border border-[rgb(225,231,239)] bg-[rgb(248,250,252)] rounded-2xl p-8 space-y-4">
              <h2 className="font-heading font-bold text-xl text-[rgb(15,23,41)]">
                Guest Details
              </h2>
              <p className="text-sm text-[rgb(99,111,129)]">
                Your selection is saved. The guest details form comes next.
              </p>
              <button
                type="button"
                onClick={() => setConfirmed(null)}
                className="px-6 py-2.5 rounded-xl border border-[rgb(225,231,239)] text-sm font-semibold text-[rgb(15,23,41)] hover:bg-[rgb(242,245,247)] transition-all"
              >
                Back
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Destination (fixed: chosen on the previous page) */}
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
                        {destination.duration && (
                          <>
                            <span>•</span>
                            <span>{destination.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dates */}
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
                      min={checkIn ? addDays(checkIn, 1) : today || undefined}
                      onChange={(e) => handleCheckOut(e.target.value)}
                      className={dateInputClass(!!errors.checkOut)}
                    />
                    {errors.checkOut && (
                      <p className="text-xs text-red-500 mt-1.5">
                        {errors.checkOut}
                      </p>
                    )}
                  </div>
                </div>

                {/* Guests */}
                <div className="relative">
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
                          onClick={() => setChildren((n) => Math.max(0, n - 1))}
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

                  {maxGuests !== undefined && (
                    <p className="text-xs text-[rgb(99,111,129)] mt-2">
                      Maximum {plural(maxGuests, "guest", "guests")} ·{" "}
                      {totalGuests} selected
                    </p>
                  )}

                  {maxGuests !== undefined && overMax && (
                    <div
                      role="alert"
                      className="absolute left-0 right-0 top-full mt-2 z-20 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 shadow-lg"
                    >
                      <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
                      <div className="text-sm text-amber-900">
                        <p className="font-semibold">Too many guests</p>
                        <p>
                          This trip allows a maximum of{" "}
                          {plural(maxGuests, "guest", "guests")}, but
                          you&apos;ve selected {totalGuests}. Remove{" "}
                          {totalGuests - maxGuests} to continue.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Room type */}
                <div ref={roomMenuRef} className="relative">
                  <p className={labelClass}>
                    <Hotel className="h-4 w-4 text-[rgb(14,168,230)]" />
                    Room Type
                  </p>
                  <button
                    type="button"
                    onClick={() => setRoomMenuOpen((o) => !o)}
                    aria-haspopup="listbox"
                    aria-expanded={roomMenuOpen && rooms.length > 1}
                    className="w-full flex items-center justify-between gap-3 p-4 rounded-xl border border-[rgb(225,231,239)] bg-[rgb(248,250,252)] hover:border-[rgb(14,168,230)]/40 transition-all"
                  >
                    <div className="text-left min-w-0">
                      <p className="font-semibold text-[rgb(15,23,41)]">
                        {room.name}
                      </p>
                      {room.description && (
                        <p className="text-xs text-[rgb(99,111,129)]">
                          {room.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-semibold text-[rgb(14,168,230)]">
                        {money(room.price)}
                        <span className="text-xs font-normal text-[rgb(99,111,129)]">
                          {" "}
                          / night
                        </span>
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-[rgb(99,111,129)] transition-transform ${
                          roomMenuOpen && rooms.length > 1 ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {roomMenuOpen && rooms.length > 1 && (
                    <ul
                      role="listbox"
                      className="absolute left-0 right-0 top-full mt-2 z-20 rounded-xl border border-[rgb(225,231,239)] bg-white shadow-lg overflow-hidden"
                    >
                      {rooms.map((r, i) => (
                        <li key={i}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={i === roomIndex}
                            onClick={() => {
                              setRoomIndex(i);
                              setRoomMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-[rgb(242,245,247)] transition-colors ${
                              i === roomIndex ? "bg-[rgb(14,168,230)]/5" : ""
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="font-semibold text-[rgb(15,23,41)]">
                                {r.name}
                              </p>
                              {r.description && (
                                <p className="text-xs text-[rgb(99,111,129)]">
                                  {r.description}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-sm font-semibold text-[rgb(15,23,41)]">
                                {money(r.price)}
                              </span>
                              {i === roomIndex && (
                                <Check className="h-4 w-4 text-[rgb(14,168,230)]" />
                              )}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Add-ons */}
                <div>
                  <p className="block text-sm font-semibold text-[rgb(15,23,41)] mb-3">
                    Add-ons
                  </p>
                  {addOnList.length === 0 ? (
                    <p className="text-sm text-[rgb(99,111,129)]">
                      No add-ons available for this trip.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {addOnList.map((a, i) => {
                        const selected = selectedAddOns.includes(i);
                        return (
                          <button
                            key={i}
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
                                {money(a.price)}
                                {a.unit ?? "/night"}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Continue */}
                <div>
                  <button
                    type="submit"
                    disabled={overMax}
                    className="cursor-pointer bg-[linear-gradient(135deg,rgb(13,165,231),rgb(33,196,93))] px-6 w-full py-3 flex items-center justify-center gap-2 group font-semibold transition-all duration-300 ease-in-out text-white hover:scale-105 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Continue to Guest Details
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  {overMax && (
                    <p className="text-xs text-amber-700 text-center mt-2">
                      Reduce the number of guests to continue.
                    </p>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Summary column */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 overflow-hidden bg-[rgb(248,250,252)] border border-[rgb(225,231,239)] rounded-3xl p-6 shadow-xl shadow-[rgb(14,168,230)]/5">
            {recalculating && (
              <LoadingBar
                key={recalcTick}
                to={100}
                durationMs={RECALC_MS}
                className="absolute top-0 left-0"
              />
            )}

            <h3 className="font-heading font-bold text-lg text-[rgb(15,23,41)] mb-4">
              Booking Summary
            </h3>

            {hasDates ? (
              <div className="space-y-4">
                <p className="text-xs text-[rgb(99,111,129)]">
                  {destination.location} · {plural(nights, "night", "nights")} ·{" "}
                  {plural(totalGuests, "guest", "guests")}
                </p>
                {lineItems.map((item) => (
                  <div
                    key={item.key}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="text-[rgb(99,111,129)]">{item.label}</span>
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

            <div className="mt-6 p-3 rounded-xl bg-[rgb(242,245,247)]/50 text-xs text-[rgb(99,111,129)] flex items-start gap-2">
              <Info className="h-4 w-4 text-[rgb(14,168,230)] shrink-0 mt-0.5" />
              <span>
                Free cancellation up to 30 days before check-in. No hidden fees.
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-[rgb(99,111,129)]">
              <Shield className="h-3 w-3 text-[rgb(14,168,230)]" />
              <span>SSL Secure Payment</span>
              <span className="mx-1">•</span>
              <span>Best Price Guarantee</span>
            </div>
          </div>

          <div className="mt-6 bg-[rgb(248,250,252)] border border-[rgb(225,231,239)] rounded-2xl p-5">
            <p className="font-semibold text-sm text-[rgb(15,23,41)] mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-[rgb(14,168,230)]" />
              Need help?
            </p>
            <div className="space-y-2">
              <a
                href="tel:+15551234567"
                className="flex items-center gap-3 text-sm text-[rgb(99,111,129)] hover:text-[rgb(14,168,230)] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[rgb(14,168,230)]/10 flex items-center justify-center">
                  <Phone className="h-3.5 w-3.5 text-[rgb(14,168,230)]" />
                </div>
                +1 (555) 123-4567
              </a>
              <a
                href="mailto:bookings@travelix.com"
                className="flex items-center gap-3 text-sm text-[rgb(99,111,129)] hover:text-[rgb(14,168,230)] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[rgb(14,168,230)]/10 flex items-center justify-center">
                  <Mail className="h-3.5 w-3.5 text-[rgb(14,168,230)]" />
                </div>
                bookings@travelix.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
