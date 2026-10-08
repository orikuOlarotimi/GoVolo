import type { Rating, Review } from "@/types/destination";

type ReviewsTabProps = {
  reviews: Review[];
  rating: Rating;
};

const STAR_PATH =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";

const AVATAR_GRADIENTS = [
  "from-sky-400 to-blue-600",
  "from-emerald-400 to-teal-600",
  "from-violet-400 to-purple-600",
  "from-amber-400 to-orange-600",
  "from-rose-400 to-pink-600",
];

const Star = ({
  filled,
  className,
}: {
  filled: boolean;
  className: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} ${
      filled ? "text-amber-400" : "text-[rgb(225,231,239)]"
    }`}
  >
    <path d={STAR_PATH} />
  </svg>
);

const Stars = ({ value, size }: { value: number; size: string }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} filled={n <= Math.round(value)} className={size} />
    ))}
  </div>
);

const getInitials = (user: Review["user"]) => {
  if (!user) return "?";
  return (
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() ||
    "?"
  );
};

const getDisplayName = (user: Review["user"]) =>
  user ? `${user.firstName} ${user.lastName}`.trim() : "Anonymous traveller";

// Same user always gets the same colour, based on their review id
const getGradient = (id: string) => {
  const sum = [...id].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_GRADIENTS[sum % AVATAR_GRADIENTS.length];
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

export default function ReviewsTab({ reviews, rating }: ReviewsTabProps) {
  // How many reviews left each star count, e.g. { 5: 12, 4: 3, ... }
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach((r) => {
    if (counts[r.rating] !== undefined) counts[r.rating] += 1;
  });

  const percent = (n: number) =>
    reviews.length ? Math.round((counts[n] / reviews.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-6 p-6 bg-[rgb(242,245,247)]/40 border border-[rgb(225,231,239)] rounded-2xl">
        <div className="text-center">
          <p className="text-5xl font-bold text-[rgb(15,23,41)]">
            {rating.count ? rating.average.toFixed(1) : "–"}
          </p>
          <div className="flex justify-center my-1">
            <Stars value={rating.average} size="h-4 w-4" />
          </div>
          <p className="text-xs text-[rgb(99,111,129)]">
            {rating.count} {rating.count === 1 ? "review" : "reviews"}
          </p>
        </div>

        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((n) => (
            <div key={n} className="flex items-center gap-3">
              <span className="text-xs text-[rgb(99,111,129)] w-10">
                {n} Star
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-[rgb(225,231,239)] overflow-hidden">
                <div
                  className="h-full bg-[rgb(14,168,230)] rounded-full"
                  style={{ width: `${percent(n)}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-[rgb(15,23,41)] w-9 text-right">
                {percent(n)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className="text-sm text-[rgb(99,111,129)] py-6">
          No reviews yet. Be the first to review this trip.
        </p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="border border-[rgb(225,231,239)] rounded-2xl p-6 hover:border-[rgb(14,168,230)]/20 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getGradient(
                  review._id,
                )} flex items-center justify-center`}
              >
                <span className="text-white text-xs font-bold">
                  {getInitials(review.user)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-sm text-[rgb(15,23,41)]">
                  {getDisplayName(review.user)}
                </p>
                <p className="text-xs text-[rgb(99,111,129)]">
                  {formatDate(review.createdAt)}
                </p>
              </div>
              <div className="ml-auto">
                <Stars value={review.rating} size="h-3.5 w-3.5" />
              </div>
            </div>
            <p className="text-sm text-[rgb(99,111,129)] leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
