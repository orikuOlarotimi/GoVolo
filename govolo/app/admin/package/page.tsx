"use client";

import { useEffect, useState, } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, Plus, MapPin, Check, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useApiFetch } from "../../../utils/useApiFetch";
import { ApiError } from "@/utils/apiClient";
import { toast } from "sonner";

type MyDestination = {
  _id: string;
  title: string;
  location: string;
  mainImage: string;
  price: number;
};

type AddOnRow = { name: string; price: string; unit: string };

const inputClass =
  "px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)] w-full";

export default function PostPackageForm() {
  const { user, loading: authLoading } = useAuth();
    const apiFetch = useApiFetch();
    const pathname = usePathname();

  const [destinations, setDestinations] = useState<MyDestination[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [listError, setListError] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [groupMin, setGroupMin] = useState("");
  const [groupMax, setGroupMax] = useState("");
  const [included, setIncluded] = useState<string[]>([]);
  const [addOns, setAddOns] = useState<AddOnRow[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const loadDestinations = async () => {
    setLoadingList(true);
    setListError(false);
    try {
      const res = await apiFetch<{
        success: boolean;
        destinations: MyDestination[];
      }>("/api/destinations/mine", { method: "GET", requiresAuth: true });

      if (!res.success || !Array.isArray(res.destinations)) {
        throw new Error("Unsuccessful response");
      }
      setDestinations(res.destinations);
    } catch {
      setListError(true);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoadingList(false);
      return;
    }
    loadDestinations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.email, pathname]);
    useEffect(() => {
      console.log("DESTINATIONS COMPONENT MOUNTED");

      return () => {
        console.log("DESTINATIONS COMPONENT UNMOUNTED");
      };
    }, []);
    useEffect(() => {
      console.log("DESTINATIONS EFFECT RAN");

      return () => {
        console.log("DESTINATIONS EFFECT CLEANUP");
      };
    }, []);

  const selected = destinations.find((d) => d._id === selectedId) ?? null;

  const min = Number(groupMin);
  const max = Number(groupMax);
  const canSubmit =
    !!selected &&
    Number(price) > 0 &&
    duration.trim() !== "" &&
    Number.isInteger(min) &&
    Number.isInteger(max) &&
    min >= 1 &&
    max >= 1 &&
    min <= max;

  const handleSubmit = async () => {
    if (!canSubmit || !selected) return;

    setSubmitting(true);
    setSubmitError(null);
    setSubmitted(false);

    // only send optional fields that actually have a value
    const cleanIncluded = included.map((s) => s.trim()).filter(Boolean);
    const cleanAddOns = addOns
      .filter((a) => a.name.trim() && Number(a.price) > 0)
      .map((a) => ({
        name: a.name.trim(),
        price: Number(a.price),
        unit: a.unit,
      }));

    const payload: Record<string, unknown> = {
      destination: selected._id,
      price: Number(price),
      duration: duration.trim(),
      groupSize: { min, max },
    };
    if (cleanIncluded.length) payload.included = cleanIncluded;
    if (cleanAddOns.length) payload.addOns = cleanAddOns;

    try {
      await apiFetch("/api/packages", {
        method: "POST",
        body: payload,
        requiresAuth: true,
      });

      setSubmitted(true);
      setSelectedId(null);
      setPrice("");
      setDuration("");
      setGroupMin("");
      setGroupMax("");
      setIncluded([]);
        setAddOns([]);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- Left column: destination picker ----------
  const renderPicker = () => {
    if (loadingList) {
      return (
        <div className="flex items-center justify-center py-24 bg-gray-100 rounded-2xl">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-[rgb(13,162,231)] rounded-full animate-spin" />
        </div>
      );
    }

    if (listError) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl">
          <p className="text-gray-500">An error occurred.</p>
          <button
            onClick={loadDestinations}
            className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
          >
            Retry
          </button>
        </div>
      );
    }

    if (destinations.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl text-center px-6">
          <p className="text-gray-500">
            You haven&apos;t created any destinations yet.
          </p>
          <Link
            href="/admin/destination"
            className="px-6 py-2.5 rounded-xl bg-[rgb(13,162,231)] text-white font-semibold hover:bg-[rgb(13,162,231)]/90 transition-all"
          >
            Create a destination
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-1">
        {destinations.map((d) => {
          const isSelected = d._id === selectedId;
          return (
            <button
              key={d._id}
              type="button"
              onClick={() => setSelectedId(d._id)}
              className={`relative text-left rounded-2xl overflow-hidden border-2 transition-all ${
                isSelected
                  ? "border-[rgb(13,162,231)] shadow-lg shadow-[rgb(13,162,231)]/10"
                  : "border-border hover:border-[rgb(13,162,231)]/40"
              }`}
            >
              <img
                src={d.mainImage}
                alt={d.title}
                className="w-full h-32 object-cover"
              />
              {isSelected && (
                <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[rgb(13,162,231)] text-white flex items-center justify-center">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
              <div className="p-3">
                <p className="font-semibold text-sm text-[rgb(15,23,42)] truncate">
                  {d.title}
                </p>
                <p className="flex items-center gap-1 text-xs text-[rgb(101,117,139)] truncate">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {d.location}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  // ---------- Page ----------
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[rgb(15,23,42)]">
          Create a Package
        </h1>
        <p className="text-sm text-[rgb(101,117,139)] mt-1">
          Pick one of your destinations, then set the package price and
          conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Picker */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <h2 className="text-sm font-medium text-[rgb(15,23,42)]">
            1. Choose a destination
          </h2>
          {renderPicker()}
        </div>

        {/* Form */}
        <div className="lg:col-span-3 bg-white border border-border rounded-2xl p-6 flex flex-col gap-6">
          <h2 className="text-sm font-medium text-[rgb(15,23,42)]">
            2. Package details
          </h2>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
              Package created successfully.
            </div>
          )}

          {submitError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {submitError}
            </div>
          )}

          {/* Selected destination preview */}
          {selected ? (
            <div className="flex items-center gap-4 rounded-xl border border-[rgb(13,162,231)]/30 bg-[rgb(13,162,231)]/5 p-3">
              <img
                src={selected.mainImage}
                alt={selected.title}
                className="w-24 h-16 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <p className="font-bold text-[rgb(15,23,42)] truncate">
                  {selected.title}
                </p>
                <p className="flex items-center gap-1 text-sm text-[rgb(101,117,139)] truncate">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {selected.location}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-border py-6 text-center text-sm text-[rgb(101,117,139)]">
              No destination selected yet
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[rgb(15,23,42)]">
                Package price ($ / person)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[rgb(15,23,42)]">
                Duration
              </label>
              <input
                type="text"
                placeholder="e.g. 5 Days"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[rgb(15,23,42)]">
                Group size (min)
              </label>
              <input
                type="number"
                value={groupMin}
                onChange={(e) => setGroupMin(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[rgb(15,23,42)]">
                Group size (max)
              </label>
              <input
                type="number"
                value={groupMax}
                onChange={(e) => setGroupMax(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {groupMin && groupMax && min > max && (
            <p className="text-sm text-red-500 -mt-3">
              Minimum group size cannot be greater than the maximum.
            </p>
          )}

          {/* What's included */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-[rgb(15,23,42)]">
              What&apos;s included{" "}
              <span className="text-[rgb(101,117,139)] font-normal">
                (optional)
              </span>
            </label>
            {included.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. Airport transfer"
                  value={item}
                  onChange={(e) =>
                    setIncluded((prev) =>
                      prev.map((v, idx) => (idx === i ? e.target.value : v)),
                    )
                  }
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() =>
                    setIncluded((prev) => prev.filter((_, idx) => idx !== i))
                  }
                  className="w-9 h-9 shrink-0 rounded-xl border border-border flex items-center justify-center text-[rgb(101,117,139)] hover:border-red-300 hover:text-red-500 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setIncluded((prev) => [...prev, ""])}
              className="self-start flex items-center gap-1.5 text-sm font-medium text-[rgb(13,162,231)] hover:underline"
            >
              <Plus className="h-4 w-4" /> Add item
            </button>
          </div>

          {/* Add-ons */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-[rgb(15,23,42)]">
              Add-ons{" "}
              <span className="text-[rgb(101,117,139)] font-normal">
                (optional)
              </span>
            </label>
            {addOns.map((a, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={a.name}
                  onChange={(e) =>
                    setAddOns((prev) =>
                      prev.map((row, idx) =>
                        idx === i ? { ...row, name: e.target.value } : row,
                      ),
                    )
                  }
                  className={inputClass}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={a.price}
                  onChange={(e) =>
                    setAddOns((prev) =>
                      prev.map((row, idx) =>
                        idx === i ? { ...row, price: e.target.value } : row,
                      ),
                    )
                  }
                  className={`${inputClass} max-w-[110px]`}
                />
                <select
                  value={a.unit}
                  onChange={(e) =>
                    setAddOns((prev) =>
                      prev.map((row, idx) =>
                        idx === i ? { ...row, unit: e.target.value } : row,
                      ),
                    )
                  }
                  className={`${inputClass} max-w-[120px]`}
                >
                  <option value="/night">/night</option>
                  <option value="/person">/person</option>
                  <option value="/trip">/trip</option>
                </select>
                <button
                  type="button"
                  onClick={() =>
                    setAddOns((prev) => prev.filter((_, idx) => idx !== i))
                  }
                  className="w-9 h-9 shrink-0 rounded-xl border border-border flex items-center justify-center text-[rgb(101,117,139)] hover:border-red-300 hover:text-red-500 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setAddOns((prev) => [
                  ...prev,
                  { name: "", price: "", unit: "/night" },
                ])
              }
              className="self-start flex items-center gap-1.5 text-sm font-medium text-[rgb(13,162,231)] hover:underline"
            >
              <Plus className="h-4 w-4" /> Add add-on
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="px-8 py-3 rounded-xl bg-[rgb(13,162,231)] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(13,162,231)]/90 transition-all"
            >
              {submitting ? "Creating..." : "Create Package"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
