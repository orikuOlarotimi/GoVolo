"use client";

import { X, Plus } from "lucide-react";

type RoomType = {
  name: string;
  description: string;
  price: number;
};

type AddOn = {
  name: string;
  price: string;
  unit: string;
};

type PricingData = {
  price: string; // Step 1's Standard Room price, read-only reference here
  roomTypes: RoomType[]; // index 0 is always Standard Room
  addOns: AddOn[];
};

type PricingStepProps = {
  data: PricingData;
  onChange: (data: PricingData) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting?: boolean;
};

export default function PricingStep({
  data,
  onChange,
  onSubmit,
  onBack,
  submitting,
}: PricingStepProps) {
  // --- Extra room types (beyond Standard Room at index 0) ---
  const addRoomType = () => {
    onChange({
      ...data,
      roomTypes: [...data.roomTypes, { name: "", description: "", price: 0 }],
    });
  };

  const updateRoomType = (
    index: number,
    field: keyof RoomType,
    value: string,
  ) => {
    const updated = data.roomTypes.map((r, i) =>
      i === index
        ? { ...r, [field]: field === "price" ? Number(value) : value }
        : r,
    );
    onChange({ ...data, roomTypes: updated });
  };

  const removeRoomType = (index: number) => {
    // Standard Room (index 0) can't be removed — it's tied to Step 1's price
    if (index === 0) return;
    onChange({
      ...data,
      roomTypes: data.roomTypes.filter((_, i) => i !== index),
    });
  };

  // --- Add-ons ---
  const addAddOn = () => {
    onChange({
      ...data,
      addOns: [...data.addOns, { name: "", price: "", unit: "/night" }],
    });
  };

  const updateAddOn = (index: number, field: keyof AddOn, value: string) => {
    const updated = data.addOns.map((a, i) =>
      i === index ? { ...a, [field]: value } : a,
    );
    onChange({ ...data, addOns: updated });
  };

  const removeAddOn = (index: number) => {
    onChange({ ...data, addOns: data.addOns.filter((_, i) => i !== index) });
  };

  const canSubmit =
    data.roomTypes.every((r) => r.name.trim() && r.price > 0) &&
    data.addOns.every((a) => a.name.trim() && a.price.trim());

  return (
    <div className="space-y-10">
      <h2 className="text-xl font-bold text-[rgb(15,23,42)]">Pricing</h2>

      {/* Room Types */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-[rgb(15,23,42)]">
          Room Types
        </label>
        <div className="flex flex-col gap-3">
          {data.roomTypes.map((room, i) => {
            const isStandard = i === 0;
            return (
              <div
                key={i}
                className={`flex items-start gap-2 border rounded-xl p-4 ${
                  isStandard
                    ? "border-[rgb(13,162,231)]/40 bg-[rgb(13,162,231)]/5"
                    : "border-border"
                }`}
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Room name (e.g. Deluxe Room)"
                    value={isStandard ? "Standard Room" : room.name}
                    disabled={isStandard}
                    onChange={(e) => updateRoomType(i, "name", e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)] disabled:bg-white disabled:text-[rgb(15,23,42)] disabled:font-semibold"
                  />
                  <input
                    type="text"
                    placeholder="Description (e.g. King bed, sea view)"
                    value={room.description}
                    onChange={(e) =>
                      updateRoomType(i, "description", e.target.value)
                    }
                    className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
                  />
                  <input
                    type="number"
                    placeholder="Price ($)"
                    value={isStandard ? data.price : room.price || ""}
                    disabled={isStandard}
                    onChange={(e) => updateRoomType(i, "price", e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)] disabled:bg-white disabled:text-[rgb(15,23,42)] disabled:font-semibold"
                  />
                </div>
                {!isStandard && (
                  <button
                    onClick={() => removeRoomType(i)}
                    className="w-9 h-9 shrink-0 rounded-xl border border-border flex items-center justify-center text-[rgb(101,117,139)] hover:border-red-300 hover:text-red-500 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <button
          onClick={addRoomType}
          className="self-start flex items-center gap-1.5 text-sm font-medium text-[rgb(13,162,231)] hover:underline"
        >
          <Plus className="h-4 w-4" /> Add room type
        </button>
      </div>

      {/* Add-ons */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-[rgb(15,23,42)]">
          Add-ons
        </label>
        <div className="flex flex-col gap-3">
          {data.addOns.map((addon, i) => (
            <div
              key={i}
              className="flex items-start gap-2 border border-border rounded-xl p-4"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Add-on name (e.g. Daily Breakfast)"
                  value={addon.name}
                  onChange={(e) => updateAddOn(i, "name", e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  value={addon.price}
                  onChange={(e) => updateAddOn(i, "price", e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
                />
                <select
                  value={addon.unit}
                  onChange={(e) => updateAddOn(i, "unit", e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
                >
                  <option value="/night">/night</option>
                  <option value="/person">/person</option>
                  <option value="/trip">/trip</option>
                </select>
              </div>
              <button
                onClick={() => removeAddOn(i)}
                className="w-9 h-9 shrink-0 rounded-xl border border-border flex items-center justify-center text-[rgb(101,117,139)] hover:border-red-300 hover:text-red-500 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addAddOn}
          className="self-start flex items-center gap-1.5 text-sm font-medium text-[rgb(13,162,231)] hover:underline"
        >
          <Plus className="h-4 w-4" /> Add add-on
        </button>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-xl border border-border text-[rgb(15,23,42)] font-semibold hover:bg-[rgb(248,250,252)] transition-all"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit || submitting}
          className="px-8 py-3 rounded-xl bg-[rgb(13,162,231)] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(13,162,231)]/90 transition-all"
        >
          {submitting ? "Submitting..." : "Submit Destination"}
        </button>
      </div>
    </div>
  );
}
