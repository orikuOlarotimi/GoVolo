"use client";

import { useState } from "react";
import DestinationCard from "../card/DestinationCard";
import Section from "../animationComponents/Section";

type Destination = {
  _id?: string;
  title: string;
  description: string;
  rating: number;
  mainImage: string;
  visits?: number;
};

type DestinationsApiResponse = {
  success: boolean;
  count?: number;
  destinations?: Destination[];
};

type DestinationsProps = {
  data: DestinationsApiResponse;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function truncateDesc(description: string) {
  if (!description) return "";
  const words = description.trim().split(/\s+/);
  if (words.length <= 5) return description;
  return words.slice(0, 5).join(" ") + " .....";
}

function toCardProps(dest: Destination, isTop: boolean) {
  return {
    image: dest.mainImage,
    location: dest.title,
    tours: dest.visits ?? 0,
    rating: dest.rating,
    label: isTop ? "Trending" : undefined,
    desc: truncateDesc(dest.description),
  };
}

const Destinations = ({ data: initialData }: DestinationsProps) => {
    const initialSuccess = initialData?.success ?? false;
    const initialItems =
      initialSuccess && Array.isArray(initialData?.destinations)
        ? initialData.destinations
        : [];

 
  const [items, setItems] = useState<Destination[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(!initialSuccess);

  const retry = async () => {
    setLoading(true);
    setError(false);
   try {
     const res = await fetch(`${API_URL}/api/destinations/top-destinations`);
     if (!res.ok) throw new Error("Request failed");
     const json: DestinationsApiResponse = await res.json();

     if (!json.success || !Array.isArray(json.destinations)) {
       throw new Error("Unsuccessful response");
     }

     setItems(json.destinations);
   } catch {
     setError(true);
   } finally {
     setLoading(false);
   }
  };

  const sorted = [...items].sort((a, b) => b.rating - a.rating);
  const top = sorted[0];
  const rest = sorted.slice(1);

  const renderGrid = () => {
    if (sorted.length === 3) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full container my-[40px] auto-rows-[280px] max-w-7xl">
          <div className="md:row-span-2">
            <DestinationCard {...toCardProps(top, true)} height="h-full" />
          </div>
          <div>
            <DestinationCard {...toCardProps(rest[0], false)} height="h-full" />
          </div>
          <div>
            <DestinationCard {...toCardProps(rest[1], false)} height="h-full" />
          </div>
        </div>
      );
    }

    if (sorted.length <= 2) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full container my-[40px] max-w-7xl">
          {sorted.map((dest, i) => (
            <DestinationCard
              key={dest._id ?? i}
              {...toCardProps(dest, i === 0)}
              height="h-[420px]"
            />
          ))}
        </div>
      );
    }

    // 4+ items — original masonry: featured card spans 2 rows, rest auto-flow
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full container my-[40px] auto-rows-[280px] max-w-7xl">
        <div className="lg:row-span-2">
          <DestinationCard {...toCardProps(top, true)} height="h-full" />
        </div>
        {rest.map((dest, i) => (
          <div key={dest._id ?? i}>
            <DestinationCard {...toCardProps(dest, false)} height="h-full" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Section>
      <div className="w-full flex items-center justify-between flex-col py-[96px] px-6">
        <div className="w-full container flex items-center justify-center">
          <div className="flex flex-col items-center justify-between">
            <div className="inline-block text-[rgb(13,162,231)] font-[600] text-xs uppercase tracking-[0.25em] px-4 py-1.5 rounded-full bg-[rgb(13,162,231)]/10 border border-[rgb(13,162,231)]/20 mb-3">
              TOP DESTINATIONS
            </div>
            <h2 className="lg:text-5xl md:text-4xl font-[700] mt-4 text-[rgb(15,23,41)]">
              Explore Popular{" "}
              <span className="relative inline-block">
                Destinations
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
            <p className="text-[18px] mt-4 text-[rgb(101,117,139)] font-[500] text-center">
              Handpicked locations for unforgettable experiences around the
              globe
            </p>
          </div>
        </div>

        {loading ? (
          <div className="w-full flex items-center justify-center py-24 bg-gray-100 rounded-2xl my-10 max-w-7xl">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-[rgb(13,162,231)] rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="w-full flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl my-10 max-w-7xl">
            <p className="text-gray-500">
              Couldn't load destinations right now.
            </p>
            <button
              onClick={retry}
              className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
            >
              Retry
            </button>
          </div>
        ) : sorted.length === 0 ? (
          <div className="w-full flex items-center justify-center py-24 bg-gray-100 rounded-2xl my-10 max-w-7xl">
            <p className="text-gray-500">No destinations for now.</p>
          </div>
        ) : (
          renderGrid()
        )}

        <button className="inline-flex items-center justify-center gap-2.5 group cursor-pointer px-8 py-3.5 text-[rgb(13,162,231)] rounded-2xl border-2 border-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300">
          View all Destinations
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right h-4 w-4 group-hover:translate-x-0.5 transition-transform mt-[3px]"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </Section>
  );
};

export default Destinations;
