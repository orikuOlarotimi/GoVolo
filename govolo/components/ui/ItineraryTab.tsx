type ItineraryDay = {
  day: number;
  title: string;
  description?: string;
};

type ItineraryTabProps = {
  itinerary: ItineraryDay[];
};

export default function ItineraryTab({ itinerary }: ItineraryTabProps) {
  if (itinerary.length === 0) {
    return (
      <p className="text-center text-sm text-[rgb(99,111,129)] py-10">
        Itinerary unavailable for this trip.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading font-bold text-xl text-[rgb(15,23,41)] mb-4">
          Day-by-Day Itinerary
        </h2>
      </div>

      {itinerary.map((entry, i) => {
        const isLast = i === itinerary.length - 1;
        return (
          <div key={entry.day}>
            <div className="relative flex gap-4">
              {!isLast && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-[rgb(225,231,239)]"></div>
              )}
              <div className="w-10 h-10 rounded-full bg-[rgb(14,168,230)] flex items-center justify-center shrink-0 text-[rgb(255,255,255)] text-sm font-bold z-10">
                {entry.day}
              </div>
              <div className="flex-1 bg-[rgb(242,245,247)]/40 border border-[rgb(225,231,239)] rounded-2xl p-5 mb-1 hover:border-[rgb(14,168,230)]/30 transition-colors">
                <p className="text-xs text-[rgb(14,168,230)] font-semibold uppercase tracking-wide mb-1">
                  Day {entry.day}
                </p>
                <h3 className="font-heading font-bold text-[rgb(15,23,41)] mb-2">
                  {entry.title}
                </h3>
                {entry.description && (
                  <p className="text-sm text-[rgb(99,111,129)] leading-relaxed">
                    {entry.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
