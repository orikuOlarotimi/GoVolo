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
    <div className="space-y-5">
      {itinerary.map((entry) => (
        <div key={entry.day} className="flex items-start gap-4">
          <div className="w-9 h-9 shrink-0 rounded-full bg-[rgb(14,168,230)] text-white flex items-center justify-center font-bold text-sm">
            {entry.day}
          </div>
          <div className="flex-1 border border-border rounded-xl p-4">
            <p className="text-xs font-semibold text-[rgb(14,168,230)] uppercase tracking-wide mb-1">
              Day {entry.day}
            </p>
            <p className="font-semibold text-[rgb(15,23,41)]">{entry.title}</p>
            {entry.description && (
              <p className="text-sm text-[rgb(99,111,129)] mt-1">
                {entry.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
