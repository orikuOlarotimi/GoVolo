"use client";

import { useState } from "react";
import { X, Plus, ImagePlus, AlertCircle } from "lucide-react";
import { useApiFetch } from "../../../utils/useApiFetch";
import { ApiError } from "@/utils/apiClient";

type SectionRow = {
  title: string;
  content: string;
  images: File[];
  captions: string[];
};

const inputClass =
  "px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)] w-full";

const MAX_SECTION_IMAGES = 3;

export default function CreateBlogForm() {
  const apiFetch = useApiFetch();
  const countChars = (text: string) => text.trim().length;

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [readTimeMinutes, setReadTimeMinutes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);

  const [sections, setSections] = useState<SectionRow[]>([
    { title: "", content: "", images: [], captions: [] },
  ]);

  const [quickFacts, setQuickFacts] = useState<string[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // ---------- Tags ----------
  const addTag = () => {
    const value = tagInput.trim();
    if (!value || tags.includes(value)) {
      setTagInput("");
      return;
    }
    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const removeTag = (i: number) => {
    setTags((prev) => prev.filter((_, idx) => idx !== i));
  };

  // ---------- Main image ----------
  const handleMainImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const removeMainImage = () => {
    setMainImage(null);
    setMainImagePreview(null);
  };

  // ---------- Sections ----------
  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { title: "", content: "", images: [], captions: [] },
    ]);
  };

  const removeSection = (i: number) => {
    if (i === 0) return; // main content section can't be removed
    setSections((prev) => prev.filter((_, idx) => idx !== i));
  };

  const updateSectionField = (
    i: number,
    field: "title" | "content",
    value: string,
  ) => {
    setSections((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)),
    );
  };

  const addSectionImages = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setSections((prev) =>
      prev.map((s, idx) => {
        if (idx !== i) return s;
        const combined = [...s.images, ...Array.from(files)].slice(
          0,
          MAX_SECTION_IMAGES,
        );
        const combinedCaptions = [
          ...s.captions,
          ...Array.from(files).map(() => ""),
        ].slice(0, MAX_SECTION_IMAGES);
        return { ...s, images: combined, captions: combinedCaptions };
      }),
    );
    e.target.value = "";
  };

  const removeSectionImage = (sectionIndex: number, imageIndex: number) => {
    setSections((prev) =>
      prev.map((s, idx) => {
        if (idx !== sectionIndex) return s;
        return {
          ...s,
          images: s.images.filter((_, i) => i !== imageIndex),
          captions: s.captions.filter((_, i) => i !== imageIndex),
        };
      }),
    );
  };

  const updateCaption = (
    sectionIndex: number,
    imageIndex: number,
    value: string,
  ) => {
    setSections((prev) =>
      prev.map((s, idx) => {
        if (idx !== sectionIndex) return s;
        return {
          ...s,
          captions: s.captions.map((c, i) => (i === imageIndex ? value : c)),
        };
      }),
    );
  };

  // ---------- Quick facts ----------

  const addQuickFact = () => {
    setQuickFacts((prev) => [...prev, ""]);
  };

  const updateQuickFact = (i: number, value: string) => {
    setQuickFacts((prev) => prev.map((f, idx) => (idx === i ? value : f)));
  };

  const removeQuickFact = (i: number) => {
    setQuickFacts((prev) => prev.filter((_, idx) => idx !== i));
  };

  // ---------- Submit ----------
  const canSubmit =
    title.trim() !== "" &&
    tags.length > 0 &&
    shortDescription.trim() !== "" &&
    !!mainImage &&
    Number(readTimeMinutes) > 0 &&
    sections[0]?.title.trim() !== "" &&
    sections[0]?.content.trim() !== "";
  quickFacts.every((f) => countChars(f) <= 40);

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    setSubmitError(null);
    setSubmitted(false);

    try {
      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("shortDescription", shortDescription.trim());
      formData.append("readTimeMinutes", readTimeMinutes);
      formData.append("tags", JSON.stringify(tags));

      const cleanQuickFacts = quickFacts.map((f) => f.trim()).filter(Boolean);
      if (cleanQuickFacts.length) {
        formData.append("quickFacts", JSON.stringify(cleanQuickFacts));
      }

      // Sections: only non-empty optional sections are sent; empty rows
      // beyond the first are dropped before building the payload.
      const sectionsToSend = sections.filter(
        (s, i) => i === 0 || s.title.trim() || s.content.trim(),
      );

      const sectionsPayload = sectionsToSend.map((s) => ({
        title: s.title.trim(),
        content: s.content.trim(),
        imageCaptions: s.captions.map((c) => c.trim()),
      }));
      formData.append("sections", JSON.stringify(sectionsPayload));

      // Files go in under sectionImages_<index>, matching the index in
      // sectionsPayload above — not the original sections array, since
      // empty rows were filtered out before this point.
      sectionsToSend.forEach((s, i) => {
        s.images.forEach((file) => {
          formData.append(`sectionImages_${i}`, file);
        });
      });

      if (mainImage) formData.append("mainImage", mainImage);

      await apiFetch("/api/blogs", {
        method: "POST",
        body: formData,
        requiresAuth: true,
      });

      setSubmitted(true);
      setTitle("");
      setShortDescription("");
      setReadTimeMinutes("");
      setTags([]);
      setMainImage(null);
      setMainImagePreview(null);
      setSections([{ title: "", content: "", images: [], captions: [] }]);
      setQuickFacts([]);
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

  return (
    <div className="container max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[rgb(15,23,42)]">
          Create a Blog Post
        </h1>
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-8">
        {submitted && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
            Blog post created successfully.
          </div>
        )}

        {submitError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {submitError}
          </div>
        )}

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[rgb(15,23,42)]">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Short description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[rgb(15,23,42)]">
            Short description
          </label>
          <textarea
            rows={2}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Read time */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[rgb(15,23,42)]">
              Estimated read time (minutes)
            </label>
            <input
              type="number"
              value={readTimeMinutes}
              onChange={(e) => setReadTimeMinutes(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[rgb(15,23,42)]">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Bali"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className={inputClass}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 rounded-xl border border-border text-sm font-medium hover:bg-[rgb(248,250,252)]"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 -mt-4">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 bg-[rgb(13,162,231)]/10 text-[rgb(13,162,231)] text-sm font-medium px-3 py-1.5 rounded-full"
              >
                #{tag}
                <button type="button" onClick={() => removeTag(i)}>
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Main image */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-[rgb(15,23,42)]">
            Main image
          </label>
          {mainImagePreview ? (
            <div className="relative w-64 h-40 rounded-xl overflow-hidden border border-border">
              <img
                src={mainImagePreview}
                alt="Main"
                className="w-full h-full object-cover"
              />
              <button
                onClick={removeMainImage}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <label className="w-64 h-40 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-sm text-[rgb(101,117,139)] cursor-pointer hover:border-[rgb(13,162,231)]">
              Upload main image
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageSelect}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Table of contents preview */}
        {sections.some((s) => s.title.trim()) && (
          <div className="rounded-xl border border-border p-4">
            <p className="text-sm font-medium text-[rgb(15,23,42)] mb-2">
              Table of contents preview
            </p>
            <ol className="flex flex-col gap-1 text-sm text-[rgb(13,162,231)]">
              {sections
                .filter((s) => s.title.trim())
                .map((s, i) => (
                  <li key={i}>
                    {String(i + 1).padStart(2, "0")}. {s.title}
                  </li>
                ))}
            </ol>
          </div>
        )}

        {/* Sections */}
        <div className="flex flex-col gap-5">
          <label className="text-sm font-medium text-[rgb(15,23,42)]">
            Content
          </label>

          {sections.map((section, i) => {
            const isMain = i === 0;
            return (
              <div
                key={i}
                className={`border rounded-xl p-4 flex flex-col gap-3 ${
                  isMain
                    ? "border-[rgb(13,162,231)]/40 bg-[rgb(13,162,231)]/5"
                    : "border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[rgb(101,117,139)] uppercase tracking-wide">
                    {isMain ? "Main content" : `Sub-content #${i}`}
                  </span>
                  {!isMain && (
                    <button
                      type="button"
                      onClick={() => removeSection(i)}
                      className="text-[rgb(101,117,139)] hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Section title"
                  value={section.title}
                  onChange={(e) =>
                    updateSectionField(i, "title", e.target.value)
                  }
                  className={`${inputClass} font-semibold`}
                />
                <textarea
                  rows={4}
                  placeholder="Section content"
                  value={section.content}
                  onChange={(e) =>
                    updateSectionField(i, "content", e.target.value)
                  }
                  className={`${inputClass} resize-none`}
                />

                {/* Section images */}
                <div className="flex flex-wrap gap-3">
                  {section.images.map((file, imgIdx) => (
                    <div key={imgIdx} className="flex flex-col gap-1">
                      <div className="relative w-28 h-20 rounded-lg overflow-hidden border border-border">
                        <img
                          src={URL.createObjectURL(file)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeSectionImage(i, imgIdx)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Caption"
                        value={section.captions[imgIdx] ?? ""}
                        onChange={(e) =>
                          updateCaption(i, imgIdx, e.target.value)
                        }
                        className="px-2 py-1 text-xs rounded-lg border border-border outline-none focus:border-[rgb(13,162,231)] w-28"
                      />
                    </div>
                  ))}

                  {section.images.length < MAX_SECTION_IMAGES && (
                    <label className="w-28 h-20 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-xs text-[rgb(101,117,139)] cursor-pointer hover:border-[rgb(13,162,231)]">
                      <ImagePlus className="h-4 w-4" />
                      Add image
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => addSectionImages(i, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={addSection}
            className="self-start flex items-center gap-1.5 text-sm font-medium text-[rgb(13,162,231)] hover:underline"
          >
            <Plus className="h-4 w-4" /> Add sub-content
          </button>
        </div>

        {/* Quick facts */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-[rgb(15,23,42)]">
            Quick facts{" "}
            <span className="text-[rgb(101,117,139)] font-normal">
              (optional)
            </span>
          </label>
          {quickFacts.map((fact, i) => {
             const charCount = countChars(fact);
             const overLimit = charCount > 40;
            return (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Country: Indonesia"
                    value={fact}
                    onChange={(e) => updateQuickFact(i, e.target.value)}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => removeQuickFact(i)}
                    className="w-9 h-9 shrink-0 rounded-xl border border-border flex items-center justify-center text-[rgb(101,117,139)] hover:border-red-300 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {overLimit && (
                  <p className="text-xs text-red-500">
                    This quick fact is {charCount} words — please keep it under
                    40.
                  </p>
                )}
              </div>
            );
          })}
          <button
            type="button"
            onClick={addQuickFact}
            className="self-start flex items-center gap-1.5 text-sm font-medium text-[rgb(13,162,231)] hover:underline"
          >
            <Plus className="h-4 w-4" /> Add quick fact
          </button>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className="px-8 py-3 rounded-xl bg-[rgb(13,162,231)] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(13,162,231)]/90 transition-all"
          >
            {submitting ? "Publishing..." : "Publish Blog Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
