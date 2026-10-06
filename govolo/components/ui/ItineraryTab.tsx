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
      <div className=" opacity-100 transform-none">
        <h2 className="font-heading font-bold text-xl text-[rgb(15,23,41)] mb-4">
          Day-by-Day Itinerary
        </h2>
      </div>
      <div className="opacity-100 transform-none">
        <div className="relative flex gap-4">
          <div className="absolute left-5 top-10 bottom-0 w-px bg-border"></div>
          <div className="w-10 h-10 rounded-full bg-[rgb(14,168,230)] flex items-center justify-center shrink-0 text-[rgb(255,255,255)] text-sm font-bold z-10">
            1
          </div>
          <div className="flex-1 bg-[rgb(242,245,247)]/40 border border-border rounded-2xl p-5 mb-1 hover:border-[rgb(14,168,230)]/30 transition-colors">
            <p className="text-xs text-[rgb(14,168,230)] font-semibold uppercase tracking-wide mb-1">
              Day 1
            </p>
            <h3 className="font-heading font-bold text-[rgb(15,23,41)] mb-2">
              Arrival &amp; Seminyak Beach
            </h3>
            <p className="text-sm text-[rgb(99,111,129)] leading-relaxed">
              Check in to your beachfront villa, sunset cocktails at Potato Head
              Beach Club, welcome dinner.
            </p>
          </div>
        </div>
      </div>
      <div className="opacity-100 transform-none">
        <div className="relative flex gap-4">
          <div className="absolute left-5 top-10 bottom-0 w-px bg-border"></div>
          <div className="w-10 h-10 rounded-full bg-[rgb(14,168,230)] flex items-center justify-center shrink-0 text-[rgb(255,255,255)] text-sm font-bold z-10">
            2
          </div>
          <div className="flex-1 bg-[rgb(242,245,247)]/40 border border-border rounded-2xl p-5 mb-1 hover:border-[rgb(14,168,230)]/30 transition-colors">
            <p className="text-xs text-[rgb(14,168,230)] font-semibold uppercase tracking-wide mb-1">
              Day 2
            </p>
            <h3 className="font-heading font-bold text-[rgb(15,23,41)] mb-2">
              Sacred Temple Trail
            </h3>
            <p className="text-sm text-[rgb(99,111,129)] leading-relaxed">
              Morning visit to Tanah Lot, lunch in Canggu, evening Kecak fire
              dance at Uluwatu Temple.
            </p>
          </div>
        </div>
      </div>
      <div className="opacity-100 transform-none">
        <div className="relative flex gap-4">
          <div className="absolute left-5 top-10 bottom-0 w-px bg-border"></div>
          <div className="w-10 h-10 rounded-full bg-[rgb(14,168,230)] flex items-center justify-center shrink-0 text-[rgb(255,255,255)] text-sm font-bold z-10">
            3
          </div>
          <div className="flex-1 bg-[rgb(242,245,247)]/40 border border-border rounded-2xl p-5 mb-1 hover:border-[rgb(14,168,230)]/30 transition-colors">
            <p className="text-xs text-[rgb(14,168,230)] font-semibold uppercase tracking-wide mb-1">
              Day 3
            </p>
            <h3 className="font-heading font-bold text-[rgb(15,23,41)] mb-2">
              Ubud Cultural Immersion
            </h3>
            <p className="text-sm text-[rgb(99,111,129)] leading-relaxed">
              Tegallalang rice terraces, Ubud Monkey Forest, traditional art
              markets, cooking class.
            </p>
          </div>
        </div>
      </div>
      <div className="opacity-100 transform-none">
        <div className="relative flex gap-4">
          <div className="absolute left-5 top-10 bottom-0 w-px bg-border"></div>
          <div className="w-10 h-10 rounded-full bg-[rgb(14,168,230)] flex items-center justify-center shrink-0 text-[rgb(255,255,255)] text-sm font-bold z-10">
            4
          </div>
          <div className="flex-1 bg-[rgb(242,245,247)]/40 border border-border rounded-2xl p-5 mb-1 hover:border-[rgb(14,168,230)]/30 transition-colors">
            <p className="text-xs text-[rgb(14,168,230)] font-semibold uppercase tracking-wide mb-1">
              Day 4
            </p>
            <h3 className="font-heading font-bold text-[rgb(15,23,41)] mb-2">
              Island Escape – Nusa Penida
            </h3>
            <p className="text-sm text-[rgb(99,111,129)] leading-relaxed">
              Full-day snorkeling trip, Kelingking Beach viewpoint, Crystal Bay
              swim.
            </p>
          </div>
        </div>
      </div>
      <div className="transform-none opacity-100">
        <div className="relative flex gap-4">
          <div className="w-10 h-10 rounded-full bg-[rgb(14,168,230)] flex items-center justify-center shrink-0 text-[rgb(255,255,255)] text-sm font-bold z-10">
            5
          </div>
          <div className="flex-1 bg-[rgb(242,245,247)]/40 border border-border rounded-2xl p-5 mb-1 hover:border-[rgb(14,168,230)]/30 transition-colors">
            <p className="text-xs text-[rgb(14,168,230)] font-semibold uppercase tracking-wide mb-1">
              Day 5
            </p>
            <h3 className="font-heading font-bold text-[rgb(15,23,41)] mb-2">
              Spa Day &amp; Departure
            </h3>
            <p className="text-sm text-[rgb(99,111,129)] leading-relaxed">
              Balinese massage at the resort spa, last beach walk, airport
              transfer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
