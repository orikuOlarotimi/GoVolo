"use client";

import { useState } from "react";
import DestinationDetailsCard from "@/components/ui/destinationDetailsCard";
  
type Rating = { average: number; count: number };

type Creator = {
  _id: string;
  name?: string;
  email?: string;
};

type Destination = {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  mainImage: string;
  images?: string[];
  visits?: number;
  rating: Rating;
  createdBy?: Creator;
};

type DestinationApiResponse = {
  success: boolean;
  destination?: Destination;
};

type DestinationDetailsProps = {
  id: string;
  initialData: DestinationApiResponse;
};

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const DestinationDetails = ({ id, initialData }: DestinationDetailsProps) => {
  const [data, setData] = useState<DestinationApiResponse>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(!initialData?.success);
  const [activeIndex, setActiveIndex] = useState(0);

  const retry = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${API_URL}/api/destinations/${id}`, {
        cache: "no-store",
      });
      const json: DestinationApiResponse = await res.json();

      if (!res.ok || !json.success || !json.destination) {
        throw new Error("Unsuccessful response");
      }

      setData(json);
      setActiveIndex(0);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-32 bg-gray-100">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[rgb(13,162,231)] rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data?.success || !data.destination) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 py-32 bg-gray-100">
        <p className="text-gray-500">An error occurred.</p>
        <button
          onClick={retry}
          className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  const destination = data.destination;
  console.log(destination)
  const gallery = [destination.mainImage, ...(destination.images ?? [])];

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));

  const goNext = () =>
    setActiveIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));

  return (
    <div>
      <div className="relative h-[95vh] min-h-[400px] overflow-hidden group">
        <img
          src={gallery[activeIndex]}
          alt={destination.title}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {gallery.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
            >
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
                className="lucide lucide-chevron-left h-5 w-5"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
            >
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
                className="lucide lucide-chevron-right h-5 w-5"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>

            <div className="absolute bottom-4 right-4 hidden md:flex gap-2">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                    i === activeIndex
                      ? "border-white"
                      : "border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </>
        )}

        <div className="absolute bottom-8 left-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-400 to-rose-500 text-white text-[11px] font-bold px-3 py-1 rounded-full">
              Trending
            </span>
            <span className="bg-black/30 backdrop-blur-sm border border-white/20 text-white text-[11px] px-3 py-1 rounded-full">
              {destination.visits ?? 0}+ Tours
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white">
            {destination.title}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
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
                className="lucide lucide-star h-4 w-4 text-amber-400 fill-amber-400"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
              </svg>
              <span className="text-white/80 text-sm ml-1">
                {destination.rating?.average?.toFixed(1) ?? "0.0"} (
                {destination.rating?.count ?? 0} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1 text-white/80 text-sm">
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
                className="lucide lucide-map-pin h-4 w-4"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>{" "}
              {destination.location}
            </div>
          </div>
        </div>
      </div>

      <DestinationDetailsCard
        rating={destination.rating}
        description={destination.description}
      />
    </div>
  );
};

export default DestinationDetails;
