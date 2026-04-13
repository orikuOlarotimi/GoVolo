import React from 'react'
import TravelCard from '../card/TravelCard';

const AdventureCard = () => {
  return (
    <div className="w-full flex items-center justify-between flex-col py-[96px] bg-muted/50">
      <div className="w-full container flex items-center justify-center mb-[64px]">
        <div className="flex flex-col items-center justify-between  ">
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
            Handpicked locations for unforgettable experiences around the globe
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6  max-w-5xl mx-auto container ">
        <TravelCard
          label="Maldives, Thailand"
          title="Beach Paradise"
          price={499}
          duration="5 Days"
          rating={4.8}
          reviews={128}
          people="2–4"
          features={[
            "Hotel Included",
            "Guided Tours",
            "Meals Included",
            "Airport Transfer",
          ]}
        />
        <TravelCard
          label="Swiss Alps, Norway"
          title="Mountain Adventure"
          price={699}
          duration="7 Days"
          rating={4.8}
          reviews={214}
          people="2–6"
          features={[
            "Luxury Lodge",
            "Hiking Guide",
            "All Meals",
            "Equipment Provided",
          ]}
          backgroundColor="bg-gradient-to-br from-[rgb(13,162,231)] to-[rgb(13,162,231)]/70"
          tag="Most Popular"
        />
        <TravelCard
          label="Paris, Tokyo, NYC"
          title="City Explorer"
          price={399}
          duration="4 Days"
          rating={4.8}
          reviews={96}
          people="1–3"
          features={["Boutique Hotel", "City Tours", "Breakfast", "Metro Pass"]}
          backgroundColor="bg-gradient-to-br from-violet-400 to-purple-600"
          tag="Best Value"
        />
      </div>

      <div className="opacity-100">
        <p className="text-center text-sm text-muted-foreground mt-10">
          All packages include travel insurance.{" "}
          <span className="text-[rgb(13,162,231)] underline underline-offset-2 cursor-pointer font-medium">
            Compare all packages →
          </span>
        </p>
      </div>
    </div>
  );
}

export default AdventureCard