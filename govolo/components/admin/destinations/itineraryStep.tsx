"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
};

type ItineraryData = {
  itinerary: ItineraryDay[];
};

type ItineraryStepProps = {
  data: ItineraryData;
  onChange: (data: ItineraryData) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function ItineraryStep({
  data,
  onChange,
  onNext,
  onBack,
}: ItineraryStepProps) {
  const addDay = () => {
    onChange({
      ...data,
      itinerary: [
        ...data.itinerary,
        { day: data.itinerary.length + 1, title: "", description: "" },
      ],
    });
  };

  const updateDay = (
    index: number,
    field: "title" | "description",
    value: string,
  ) => {
    const updated = data.itinerary.map((d, i) =>
      i === index ? { ...d, [field]: value } : d,
    );
    onChange({ ...data, itinerary: updated });
  };

  const removeDay = (index: number) => {
    // remove, then renumber remaining days 1..n so numbering stays sequential
    const updated = data.itinerary
      .filter((_, i) => i !== index)
      .map((d, i) => ({ ...d, day: i + 1 }));
    onChange({ ...data, itinerary: updated });
  };

  const canProceed =
    data.itinerary.length > 0 &&
    data.itinerary.every((d) => d.title.trim() && d.description.trim());

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[rgb(15,23,42)]">
        Day-by-Day Itinerary
      </h2>

      <div className="flex flex-col gap-4">
        {data.itinerary.map((entry, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-9 h-9 shrink-0 rounded-full bg-[rgb(13,162,231)] text-white flex items-center justify-center font-bold text-sm mt-1">
              {entry.day}
            </div>
            <div className="flex-1 border border-border rounded-xl p-4 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title (e.g. Arrival & Seminyak Beach)"
                value={entry.title}
                onChange={(e) => updateDay(i, "title", e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)] font-semibold"
              />
              <textarea
                rows={2}
                placeholder="Description (e.g. Check in to your beachfront villa, sunset cocktails...)"
                value={entry.description}
                onChange={(e) => updateDay(i, "description", e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)] resize-none"
              />
            </div>
            <button
              onClick={() => removeDay(i)}
              className="w-9 h-9 shrink-0 rounded-xl border border-border flex items-center justify-center text-[rgb(101,117,139)] hover:border-red-300 hover:text-red-500 transition-all mt-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addDay}
        className="flex items-center gap-1.5 text-sm font-medium text-[rgb(13,162,231)] hover:underline"
      >
        <Plus className="h-4 w-4" /> Add day
      </button>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-xl border border-border text-[rgb(15,23,42)] font-semibold hover:bg-[rgb(248,250,252)] transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-8 py-3 rounded-xl bg-[rgb(13,162,231)] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(13,162,231)]/90 transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
}
