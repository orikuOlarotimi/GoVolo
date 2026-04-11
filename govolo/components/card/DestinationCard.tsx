import { Star, MapPin } from "lucide-react";

type DestinationCardProps = {
  image: string;
  location: string;
  tours: string;
  rating: number;
  label?: string;

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
        <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-medium">
          🔥 {label}
        </div>
      )}

      {/* Rating */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 text-black text-sm px-2 py-1 rounded-full">
        <Star size={14} className="fill-yellow-400 text-yellow-400" />
        {rating}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-4 left-4 text-white">
        <div className="flex items-center gap-1 text-sm opacity-90">
          <MapPin size={16} className="text-[rgb(13,162,231)]"/>
          <span className="font-[700] text-[20px] ">{location}</span>
        </div>
        <p className="text-sm opacity-80">{tours} Tours</p>
      </div>
    </div>
  );
}
