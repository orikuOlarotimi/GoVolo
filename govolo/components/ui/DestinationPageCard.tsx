import React from 'react'

const destinationCard = () => {
  return (
    <div>
      <div className="opacity-100 transform-none">
        <div className="group relative bg-[rgb(248,250,252)] border border-border rounded-3xl overflow-hidden cursor-pointer hover:border-[rgb(14,164,230)]/30 hover:shadow-xl hover:shadow-[rgb(14,164,230)]/5 transition-all duration-300 hover:-translate-y-1">
          <div className="relative h-full overflow-hidden">
            <img
              src="/assets/dest-bali-BdY6U0p1.jpg"
              alt="Bali, Indonesia"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-400 to-rose-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">
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
                  className="lucide lucide-compass h-3 w-3"
                >
                  <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                Trending
              </span>
            </div>
            <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all hover:bg-black/50">
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
                className="lucide lucide-heart h-4 w-4 transition-colors text-white"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </button>
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
              <span className="text-white text-xs font-bold">4.9</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
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
                Bali, Indonesia
              </h3>
            </div>
            <p className="text-[rgb(101,109,120)] text-sm leading-relaxed mb-3 line-clamp-2">
              Temples, rice terraces &amp; pristine beaches
            </p>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-[rgb(101,109,120)]">120+ Tours</p>
                <p className="text-sm font-bold text-[rgb(14,164,230)]">
                  $499
                  <span className="text-xs font-normal text-[rgb(101,109,120)]">
                    / person
                  </span>
                </p>
              </div>
              <a
                href="/BaliDetailPage"
                className="shrink-0 w-9 h-9 rounded-xl bg-[rgb(14,164,230)]/10 border border-[rgb(14,164,230)]/20 flex items-center justify-center group-hover:bg-[rgb(14,164,230)] transition-all duration-300"
              >
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
                  className="lucide lucide-arrow-right h-4 w-4 text-[rgb(14,164,230)] group-hover:text-[rgb(255,255,255)] transition-colors"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default destinationCard