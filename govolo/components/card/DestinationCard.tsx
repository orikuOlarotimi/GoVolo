import { Star, MapPin } from "lucide-react";

type DestinationCardProps = {
  image: string;
  location: string;
  tours: string;
  rating: number;
  label?: string;
  desc: string;

  // optional sizing
  width?: string;
  height?: string;

  className?: string;

};

export default function DestinationCard({
  image,
  location,
  tours,
  rating,
  label = "Trending",
  width = "w-full",
  height = "h-[420px]",
  className = "",
  desc,
}: DestinationCardProps) {
  return (
    <div
      className={`relative ${width} ${height} rounded-2xl overflow-hidden shadow-lg group ${className}`}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={location}
        className="w-full h-full object-cover group-hover:scale-107 transition duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t "></div>

      {/* Label */}
      {label && (
        <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
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
            className="lucide lucide-compass h-3 w-3"
          >
            <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          {label}
        </div>
      )}

      {/* Rating */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 text-black text-sm px-2 py-1 rounded-full">
        <Star size={14} className="fill-yellow-400 text-yellow-400" />
        {rating}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-6 left-0 text-white flex items-center gap-3 justify-between w-full px-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="">
          <p className="mb-2 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 text-[12px]">{desc}</p>
          <div className="flex items-center gap-1 text-sm opacity-90">
            <MapPin size={16} className="text-[rgb(13,162,231)]" />
            <span className="font-[700] text-[20px] ">{location}</span>
          </div>
          <p className="text-[12px] text-white-60  mt-0.5" >{tours} Tours</p>
        </div>

        <button className="cursor-pointer shrink-0 w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 hover:bg-primary hover:border-primary">
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
            className="lucide lucide-arrow-right h-4 w-4 text-white"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
