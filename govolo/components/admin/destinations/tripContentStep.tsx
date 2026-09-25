"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";

type TripHighlight = {
  title: string;
  description: string;
};

type TripContentData = {
  tripHighlights: TripHighlight[];
  included: string[];
  notIncluded: string[];
  amenities: string[];
};

type TripContentStepProps = {
  data: TripContentData;
  onChange: (data: TripContentData) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function TripContentStep({
  data,
  onChange,
  onNext,
  onBack,
}: TripContentStepProps) {
  // --- Trip highlights ---
  const addHighlight = () => {
    onChange({
      ...data,
      tripHighlights: [...data.tripHighlights, { title: "", description: "" }],
    });
  };

  const updateHighlight = (
    index: number,
    field: keyof TripHighlight,
    value: string,
  ) => {
    const updated = data.tripHighlights.map((h, i) =>
      i === index ? { ...h, [field]: value } : h,
    );
    onChange({ ...data, tripHighlights: updated });
  };

  const removeHighlight = (index: number) => {
    onChange({
      ...data,
      tripHighlights: data.tripHighlights.filter((_, i) => i !== index),
    });
  };

  // --- Simple string lists (included / notIncluded / amenities) ---
  const addListItem = (field: "included" | "notIncluded" | "amenities") => {
    onChange({ ...data, [field]: [...data[field], ""] });
  };

  const updateListItem = (
    field: "included" | "notIncluded" | "amenities",
    index: number,
    value: string,
  ) => {
    const updated = data[field].map((item, i) => (i === index ? value : item));
    onChange({ ...data, [field]: updated });
  };

  const removeListItem = (
    field: "included" | "notIncluded" | "amenities",
    index: number,
  ) => {
    onChange({ ...data, [field]: data[field].filter((_, i) => i !== index) });
  };

  const canProceed =
    data.tripHighlights.length > 0 &&
    data.tripHighlights.every((h) => h.title.trim() && h.description.trim());

  const renderStringList = (
    label: string,
    field: "included" | "notIncluded" | "amenities",
    placeholder: string,
  ) => (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-[rgb(15,23,42)]">
        {label}
      </label>
      <div className="flex flex-col gap-2">
        {data[field].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              placeholder={placeholder}
              value={item}
              onChange={(e) => updateListItem(field, i, e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
            />
            <button
              onClick={() => removeListItem(field, i)}
              className="w-9 h-9 shrink-0 rounded-xl border border-border flex items-center justify-center text-[rgb(101,117,139)] hover:border-red-300 hover:text-red-500 transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => addListItem(field)}
        className="self-start flex items-center gap-1.5 text-sm font-medium text-[rgb(13,162,231)] hover:underline"
      >
        <Plus className="h-4 w-4" /> Add item
      </button>
    </div>
  );

  return (
    <div className="space-y-10">
      <h2 className="text-xl font-bold text-[rgb(15,23,42)]">Trip Content</h2>

      {/* Trip Highlights */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-[rgb(15,23,42)]">
          Trip Highlights
        </label>
        <div className="flex flex-col gap-3">
          {data.tripHighlights.map((highlight, i) => (
            <div
              key={i}
              className="flex items-start gap-2 border border-border rounded-xl p-4"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Title (e.g. Sacred Temples)"
                  value={highlight.title}
                  onChange={(e) => updateHighlight(i, "title", e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
                />
                <input
                  type="text"
                  placeholder="Description (e.g. Visit Tanah Lot & Uluwatu)"
                  value={highlight.description}
                  onChange={(e) =>
                    updateHighlight(i, "description", e.target.value)
                  }
                  className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
                />
              </div>
              <button
                onClick={() => removeHighlight(i)}
                className="w-9 h-9 shrink-0 rounded-xl border border-border flex items-center justify-center text-[rgb(101,117,139)] hover:border-red-300 hover:text-red-500 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addHighlight}
          className="self-start flex items-center gap-1.5 text-sm font-medium text-[rgb(13,162,231)] hover:underline"
        >
          <Plus className="h-4 w-4" /> Add highlight
        </button>
      </div>

      {renderStringList(
        "What's Included",
        "included",
        "e.g. 5-star beachfront resort accommodation",
      )}

      {renderStringList(
        "What's Not Included",
        "notIncluded",
        "e.g. International flights",
      )}

      {renderStringList("Amenities", "amenities", "e.g. Free WiFi")}

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
