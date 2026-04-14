import React from "react";
import { Card } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";
import DestinationCard  from "../card/DestinationCard";
const Destinations = () => {
  return (
    <div className="w-full flex items-center justify-between flex-col py-[96px] px-6 ">
      <div className="w-full container  flex items-center justify-center">
        <div className="flex flex-col items-center justify-between">
          <div className="inline-block text-[rgb(13,162,231)] font-[600] text-xs uppercase tracking-[0.25em] px-4 py-1.5 rounded-full bg-[rgb(13,162,231)]/10 border border-[rgb(13,162,231)]/20 mb-3">
            TOP DESTINATIONS
          </div>
          <h2 className="lg:text-5xl md:text-4xl font-[700] mt-4 text-[rgb(15,23,41)]">
            Explore Popular{" "}
            <span className="relative inline-block ">
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

          <p className="text-[18px] mt-4  text-[rgb(101,117,139)] font-[500] text-center">
            Handpicked locations for unforgettable experiences around the globe
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full container  my-[40px] auto-rows-[280px] max-w-7xl">
        {/* BIG ITEM (spans 2 rows only on desktop) */}
        <div className=" lg:row-span-2">
          <DestinationCard
            image="/images/dest-bali.jpg"
            location="Bali, Indonesia"
            tours="120+"
            rating={4.9}
            label="Trending"
            height="h-full"
            desc="Temples, rice terraces & pristine beaches"
          />
        </div>

        {/* Other items */}
        <div className="">
          <DestinationCard
            image="/images/dest-paris.jpg"
            location="Bali, Indonesia"
            tours="120+"
            rating={4.8}
            label="Most Loved"
            height="h-full"
            desc="Romance, art & world-class cuisine"
          />
        </div>
        <div className="">
          <DestinationCard
            image="/images/dest-santorini.jpg"
            location="Bali, Indonesia"
            tours="120+"
            rating={4.7}
            label="Scenic"
            height="h-full"
            desc="Iconic sunsets & whitewashed villages"
          />
        </div>
        <div className="">
          <DestinationCard
            image="/images/dest-tokyo.jpg"
            location="Bali, Indonesia"
            tours="120+"
            rating={4.9}
            label="Top Pick"
            height="h-full"
            desc="Ancient tradition meets futuristic energy

"
          />
        </div>
        <div className="">
          <DestinationCard
            image="/images/dest-maldives.jpg"
            location="Bali, Indonesia"
            tours="120+"
            rating={5}
            label="Luxury"
            height="h-full"
            desc="Overwater villas & crystal-clear lagoons"
          />
        </div>
        <div className="">
          <DestinationCard
            image="/images/dest-swiss.jpg"
            location="Bali, Indonesia"
            tours="120+"
            rating={4.8}
            label="Adventure"
            height="h-full"
            desc="Glaciers, ski slopes & alpine villages

"
          />
        </div>
        <div className="">
          <DestinationCard
            image="/images/1706.jpg"
            location="Bali, Indonesia"
            tours="120+"
            rating={4.9}
            label="Adventure"
            height="h-full"
            desc="Glaciers, ski slopes & alpine villages"
          />
        </div>
        <div className="">
          <DestinationCard
            image="/images/21571.jpg"
            location="Bali, Indonesia"
            tours="120+"
            rating={5}
            label="Adventure"
            height="h-full"
            desc="Glaciers, ski slopes & alpine villages"
          />
        </div>
      </div>

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
  );
};

export default Destinations;
