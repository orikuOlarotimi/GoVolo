import Link from "next/link";

type Rating = { average: number; count: number };

type Destination = {
  _id: string;
  title: string;
  location?: string;
  price?: number;
  description: string;
  rating: Rating;
  mainImage: string;
  visits?: number;
};

function truncateDesc(description: string) {
  if (!description) return "";
  const words = description.trim().split(/\s+/);
  if (words.length <= 12) return description;
  return words.slice(0, 12).join(" ") + " .....";
}

export default function DestinationPageCard({
  destination,
}: {
  destination: Destination;
}) {
  const {
    _id,
    title,
    location,
    price,
    description,
    rating,
    mainImage,
    visits,
  } = destination;

  return (
    <div className="">
      <div className="group relative bg-[rgb(248,250,252)] border border-border rounded-3xl overflow-hidden cursor-pointer hover:border-[rgb(14,164,230)]/30 hover:shadow-xl hover:shadow-[rgb(14,164,230)]/5 transition duration-500 hover:-translate-y-1">
        <div className="relative  overflow-hidden">
          <img
            src={mainImage}
            alt={title}
            className="w-full object-cover max-h-[440px] transition-transform duration-300 group-hover:scale-110 inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-400 to-rose-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">
              Trending
            </span>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1">
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
              className="lucide lucide-star h-3 w-3 text-amber-400 fill-amber-400"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
            </svg>
            <span className="text-white text-xs font-bold">
              {rating?.average}
            </span>
          </div>
        </div>

        {/* changes need to be made here */}
        <div className="p-5 ">
          <h3 className="font-heading font-bold text-lg text-[rgb(15,23,42)] flex items-center gap-1">
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
              className="lucide lucide-map-pin h-4 w-4 text-[rgb(14,164,230)] shrink-0"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {location}
          </h3>
          <p className="text-[rgb(101,109,120)] text-sm leading-relaxed mb-3 line-clamp-2">
            {truncateDesc(description)}
          </p>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-[rgb(101,109,120)]">
                {visits ?? 0}+ Tours
              </p>
              <p className="text-sm font-bold text-[rgb(14,164,230)] mt-[2px]">
                ${price ?? "—"}
                <span className="text-xs font-normal text-[rgb(101,109,120)]">
                  / person
                </span>
              </p>
            </div>
            <Link
              href={`/destinations/${_id}`}
              className="shrink-0 w-9 h-9 rounded-xl bg-[rgb(14,164,230)]/10 border border-[rgb(14,164,230)]/20 flex items-center justify-center group-hover:bg-[rgb(14,164,230)] transition-all duration-300"
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
                className="lucide lucide-arrow-right h-4 w-4 text-[rgb(14,164,230)] group-hover:text-[rgb(255,255,255)] transition-colors"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
