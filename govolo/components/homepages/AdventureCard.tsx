"use client";

import { useState } from "react";
import TravelCard from "../card/TravelCard";
import Section from "../animationComponents/Section";

type Rating = {
  average?: number;
  count?: number;
};

type Accommodation = {
  min: number;
  max: number;
};

type Booking = {
  _id?: string;
  title: string;
  location?: string;
  price: number;
  days: number;
  accommodation: Accommodation;
  checkpoints?: string[];
  tag?: string;
  rating?: Rating;
};

type BookingsApiResponse = {
  success: boolean;
  count?: number;
  total?: number;
  bookings?: Booking[];
};

type AdventureCardProps = {
  data: BookingsApiResponse;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TAG_BACKGROUNDS = [
  "bg-gradient-to-br from-sky-400 to-blue-600",
  "bg-gradient-to-br from-[rgb(13,162,231)] to-[rgb(13,162,231)]/70",
  "bg-gradient-to-br from-violet-400 to-purple-600",
];

function formatPeople(accommodation: Accommodation): string {
  if (!accommodation) return "";
  const { min, max } = accommodation;
  if (min === max) return `${min}`;
  return `${min}–${max}`;
}

function toCardProps(booking: Booking, index: number) {
  const features: string[] = [];
  if (booking.checkpoints?.length) {
    features.push(...booking.checkpoints.slice(0, 4));
  }

  return {
    label: booking.location,
    title: booking.title,
    price: booking.price,
    duration: `${booking.days} Days`,
    rating: booking.rating?.average ?? 0,
    reviews: booking.rating?.count ?? 0,
    people: formatPeople(booking.accommodation),
    features,
    tag: booking.tag ?? undefined,
    backgroundColor: TAG_BACKGROUNDS[index % TAG_BACKGROUNDS.length],
  };
}

const AdventureCard = ({ data: initialData }: AdventureCardProps) => {
  const initialSuccess = initialData?.success ?? false;
  const initialItems =
    initialSuccess && Array.isArray(initialData?.bookings)
      ? initialData.bookings.slice(0, 3)
      : [];

  const [items, setItems] = useState<Booking[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(!initialSuccess);

  const retry = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${API_URL}/api/booking?limit=3`);
      if (!res.ok) throw new Error("Request failed");
      const json: BookingsApiResponse = await res.json();

      if (!json.success || !Array.isArray(json.bookings)) {
        throw new Error("Unsuccessful response");
      }

      setItems(json.bookings.slice(0, 3));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const gridClasses =
    items.length === 1
      ? "flex justify-center"
      : items.length === 2
        ? "flex flex-wrap justify-center gap-6"
        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  const cardWrapperClass =
    items.length === 1
      ? "w-full max-w-sm"
      : items.length === 2
        ? "w-full max-w-sm"
        : "";

  return (
    <Section>
      <div className="w-full flex items-center justify-between flex-col py-[96px] bg-muted/50 px-6">
        <div className="w-full container flex items-center justify-center mb-[64px]">
          <div className="flex flex-col items-center justify-between">
            <div className="inline-block text-[rgb(13,162,231)] font-[600] text-xs uppercase tracking-[0.25em] px-4 py-1.5 rounded-full bg-[rgb(13,162,231)]/10 border border-[rgb(13,162,231)]/20 mb-3">
              OUR PACKAGES
            </div>
            <h2 className="lg:text-5xl md:text-4xl font-[700] mt-4 text-[rgb(15,23,41)]">
              Choose Your{" "}
              <span className="relative inline-block ">
                Adventure
                <svg
                  className="absolute -bottom-1 left-0 w-full text-[rgb(13,162,231)]"
                  viewBox="0 0 300 8"
                  fill="none"
                >
                  <path
                    d="M1 5.5 Q75 1 150 5.5 Q225 10 299 5.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-[18px] mt-4  text-[rgb(101,117,139)] font-[500] text-center">
              Handpicked locations for unforgettable experiences around the
              globe
            </p>
          </div>
        </div>

        {loading ? (
          <div className="w-full flex items-center justify-center py-24 bg-gray-100 rounded-2xl my-10 max-w-5xl">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-[rgb(13,162,231)] rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="w-full flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl my-10 max-w-5xl">
            <p className="text-gray-500">Couldn't load packages right now.</p>
            <button
              onClick={retry}
              className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
            >
              Retry
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="w-full flex items-center justify-center py-24 bg-gray-100 rounded-2xl my-10 max-w-5xl">
            <p className="text-gray-500">No bookings available for now.</p>
          </div>
        ) : (
          <div className={`${gridClasses} max-w-5xl mx-auto container`}>
            {items.map((booking, index) => (
              <div key={booking._id ?? index} className={cardWrapperClass}>
                <TravelCard {...toCardProps(booking, index)} />
              </div>
            ))}
          </div>
        )}

        <div className="opacity-100">
          <p className="text-center text-sm text-muted-foreground mt-10">
            All packages include travel insurance.{" "}
            <span className="text-[rgb(13,162,231)] underline underline-offset-2 cursor-pointer font-medium">
              Compare all packages →
            </span>
          </p>
        </div>
      </div>
    </Section>
  );
};

export default AdventureCard;
