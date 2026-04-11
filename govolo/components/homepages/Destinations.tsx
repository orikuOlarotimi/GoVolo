import React from "react";
import { Card } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";
import DestinationCard  from "../card/DestinationCard";
const Destinations = () => {
  return (
    <div className="min-h-[1366px] w-full flex items-center justify-between flex-col pt-[96px]">
      <div className="w-full container min-h-[200px] flex items-center justify-center ">
        <div className="min-h-[150px] flex flex-col items-center justify-between  ">
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

          <p className="text-[18px] mt-4  text-[rgb(101,117,139)] font-[500]">
            Handpicked locations for unforgettable experiences around the globe
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full container px-24   my-[40px] auto-rows-[275px]">
        {/* BIG ITEM (spans 2 rows only on desktop) */}
        <div className=" lg:row-span-2">
          <DestinationCard
            image="/images/dest-bali.jpg"
            location="Bali, Indonesia"
            tours="120+"
            rating={4.9}
            label="Trending"
            height="h-full"
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
          />
        </div>
      </div>

      <div className="border border-black h-[500px]"></div>
    </div>
  );
};

export default Destinations;
