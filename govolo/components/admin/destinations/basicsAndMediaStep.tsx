"use client";

import { useState } from "react";
import { X, AlertCircle } from "lucide-react";

const ACCEPTED_TYPES = ["jpg", "jpeg", "png", "webp", "avif", "heic", "heif"];
const MAX_GALLERY_IMAGES = 8;

type BasicsAndMediaData = {
  title: string;
  description: string;
  location: string;
  price: string;
  duration: string;
  groupSizeMin: string;
  groupSizeMax: string;
  mainImage: File | null;
  images: File[];
};

type BasicsAndMediaStepProps = {
  data: BasicsAndMediaData;
  onChange: (data: BasicsAndMediaData) => void;
  onNext: () => void;
};

function getExtension(filename: string) {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

export default function BasicsAndMediaStep({
  data,
  onChange,
  onNext,
}: BasicsAndMediaStepProps) {
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(
    data.mainImage ? URL.createObjectURL(data.mainImage) : null,
  );
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(
    data.images.map((file) => URL.createObjectURL(file)),
  );
  const [error, setError] = useState<string | null>(null);

  const handleMainImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 1) {
      setError("Only one main image can be selected.");
      e.target.value = "";
      return;
    }

    const file = files[0];
    if (!ACCEPTED_TYPES.includes(getExtension(file.name))) {
      setError(
        `Unsupported file type. Accepted types: ${ACCEPTED_TYPES.join(", ")}`,
      );
      e.target.value = "";
      return;
    }

    setError(null);
    setMainImagePreview(URL.createObjectURL(file));
    onChange({ ...data, mainImage: file });
    e.target.value = "";
  };

  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const incoming = Array.from(files);
    const invalid = incoming.filter(
      (file) => !ACCEPTED_TYPES.includes(getExtension(file.name)),
    );

    if (invalid.length > 0) {
      setError(
        `${invalid.length} file(s) rejected — unsupported type. Accepted types: ${ACCEPTED_TYPES.join(", ")}`,
      );
      e.target.value = "";
      return;
    }

    const valid = incoming.filter((file) =>
      ACCEPTED_TYPES.includes(getExtension(file.name)),
    );

    if (data.images.length + valid.length > MAX_GALLERY_IMAGES) {
      setError(`You can only add up to ${MAX_GALLERY_IMAGES} gallery images.`);
      e.target.value = "";
      return;
    }

    setError(null);
    const updatedImages = [...data.images, ...valid];
    setGalleryPreviews((prev) => [
      ...prev,
      ...valid.map((file) => URL.createObjectURL(file)),
    ]);
    onChange({ ...data, images: updatedImages });
    e.target.value = "";
  };

  const removeGalleryImage = (index: number) => {
    const updatedImages = data.images.filter((_, i) => i !== index);
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    onChange({ ...data, images: updatedImages });
  };

  const removeMainImage = () => {
    setMainImagePreview(null);
    onChange({ ...data, mainImage: null });
  };

  const canProceed =
    data.title.trim() &&
    data.description.trim() &&
    data.location.trim() &&
    data.price.trim() &&
    data.mainImage;

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[rgb(15,23,42)]">Basics & Media</h2>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[rgb(15,23,42)]">
            Title
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[rgb(15,23,42)]">
            Location
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange({ ...data, location: e.target.value })}
            className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[rgb(15,23,42)]">
            Standard Room Price ($)
          </label>
          <input
            type="number"
            value={data.price}
            onChange={(e) => onChange({ ...data, price: e.target.value })}
            className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[rgb(15,23,42)]">
            Duration
          </label>
          <input
            type="text"
            placeholder="e.g. 5 Days / 4 Nights"
            value={data.duration}
            onChange={(e) => onChange({ ...data, duration: e.target.value })}
            className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[rgb(15,23,42)]">
            Group Size (Min)
          </label>
          <input
            type="number"
            value={data.groupSizeMin}
            onChange={(e) =>
              onChange({ ...data, groupSizeMin: e.target.value })
            }
            className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[rgb(15,23,42)]">
            Group Size (Max)
          </label>
          <input
            type="number"
            value={data.groupSizeMax}
            onChange={(e) =>
              onChange({ ...data, groupSizeMax: e.target.value })
            }
            className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[rgb(15,23,42)]">
          Description
        </label>
        <textarea
          rows={4}
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          className="px-4 py-2.5 rounded-xl border border-border outline-none focus:border-[rgb(13,162,231)] resize-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-[rgb(15,23,42)]">
          Main Image
        </label>
        {mainImagePreview ? (
          <div className="relative w-48 h-32 rounded-xl overflow-hidden border border-border">
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
          <label className="w-48 h-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-sm text-[rgb(101,117,139)] cursor-pointer hover:border-[rgb(13,162,231)]">
            Upload main image
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMainImageSelect}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-[rgb(15,23,42)]">
          Gallery Images ({data.images.length}/{MAX_GALLERY_IMAGES})
        </label>
        <div className="flex flex-wrap gap-4">
          {galleryPreviews.map((src, i) => (
            <div
              key={i}
              className="relative w-32 h-24 rounded-xl overflow-hidden border border-border"
            >
              <img
                src={src}
                alt={`Gallery ${i}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeGalleryImage(i)}
                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {data.images.length < MAX_GALLERY_IMAGES && (
            <label className="w-32 h-24 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-xs text-[rgb(101,117,139)] cursor-pointer hover:border-[rgb(13,162,231)] text-center px-2">
              Add images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGallerySelect}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
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
