import React from "react";
import { Star, Clock, Users, Check } from "lucide-react";

type Feature = string;

interface TravelCardProps {
  label?: string; // optional
  title: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  people: string;
  features: Feature[];
  buttonText?: string;
  buttonColor?: string;
  backgroundColor?: string;
}

const TravelCard: React.FC<TravelCardProps> = ({
  label,
  title,
  price,
  duration,
  rating,
  reviews,
  people,
  features,
  buttonText = "Book Now",
  backgroundColor,
}) => {
  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-lg bg-white">
      {/* Top Section */}
      <div
        className={`${
          backgroundColor || "bg-gradient-to-br from-sky-400 to-blue-600"
        } text-white p-6 relative pb-10`}
      >
        {label && (
          <p className="text-xs uppercase tracking-wide opacity-80">{label}</p>
        )}

        <h2 className="text-2xl font-bold mt-1">{title}</h2>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-sm opacity-80 mb-1">/ person</span>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 w-full pt-5 bg-white rounded-t-[2rem]" />
      </div>

      {/* Info Row */}
      <div className="flex justify-between items-center px-6 pb-5 text-[14px] border-b">
        <div className="flex items-center gap-1 text-[rgb(15,23,41)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-clock h-4 w-4 text-muted-foreground"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{duration}</span>
        </div>

        <div className="flex items-center gap-1 font-[700]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-star h-4 w-4 text-[rgb(245,159,10)] fill-[rgb(245,159,10)]"
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
          </svg>
          <span>{rating}</span>
          <span className="opacity-60 text-[rgb(101,117,139)] text-[12px] font-[400]">
            ({reviews})
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Users size={16} />
          <span className="text-[12px] font-[500]">{people}</span>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-5 space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 ">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-check h-3.5 w-3.5 text-muted-foreground"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
            </div>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="px-6 pb-6">
        <button className="w-full font-semibold transition-all duration-200 cursor-pointer rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-gray-50   group border-2 border-border hover:border-[rgb(13,162,231)] hover:text-[rgb(13,162,231)] bg-transparent">
          {buttonText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-arrow-right h-4 w-4 group-hover:translate-x-0.5 transition-transform mt-[3px]"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TravelCard;
