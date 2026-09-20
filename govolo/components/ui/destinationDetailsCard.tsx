import React from "react";

const DestinationDetailsCard = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-3 gap-4 opacity-100 transform-none">
              <div className="bg-[rgb(242,245,247)]/50 border border-border rounded-2xl p-4 text-center">
                <div className="w-9 h-9 rounded-xl bg-[rgb(14,168,230)]/10 flex items-center justify-center mx-auto mb-2">
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
                    className="lucide lucide-clock h-4 w-4 text-[rgb(14,168,230)]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <p className="text-xs text-[rgb(99,111,129)] mb-0.5">
                  Duration
                </p>
                <p className="text-sm font-bold text-[rgb(15,23,41)]">
                  5 Days / 4 Nights
                </p>
              </div>
              <div className="bg-[rgb(242,245,247)]/50 border border-border rounded-2xl p-4 text-center">
                <div className="w-9 h-9 rounded-xl bg-[rgb(14,168,230)]/10 flex items-center justify-center mx-auto mb-2">
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
                    className="lucide lucide-users h-4 w-4 text-[rgb(14,168,230)]"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <p className="text-xs text-[rgb(99,111,129)] mb-0.5">
                  Group Size
                </p>
                <p className="text-sm font-bold text-[rgb(15,23,41)]">
                  2 – 12 People
                </p>
              </div>
              <div className="bg-[rgb(242,245,247)]/50 border border-border rounded-2xl p-4 text-center">
                <div className="w-9 h-9 rounded-xl bg-[rgb(14,168,230)]/10 flex items-center justify-center mx-auto mb-2">
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
                    className="lucide lucide-star h-4 w-4 text-[rgb(14,168,230)]"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                </div>
                <p className="text-xs text-[rgb(99,111,129)] mb-0.5">Rating</p>
                <p className="text-sm font-bold text-[rgb(15,23,41)]">
                  4.9 / 5.0
                </p>
              </div>
            </div>
            <div className="opacity-100 transform-none">
              <div className="flex gap-1 border-b border-border">
                <button className="px-5 py-2.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px border-[rgb(14,168,230)] text-[rgb(14,168,230)]">
                  overview
                </button>
                <button className="px-5 py-2.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px border-transparent text-[rgb(99,111,129)] hover:text-[rgb(15,23,41)]">
                  itinerary
                </button>
                <button className="px-5 py-2.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px border-transparent text-[rgb(99,111,129)] hover:text-[rgb(15,23,41)]">
                  reviews
                </button>
              </div>
            </div>
            <div className="space-y-8">
              <div className="opacity-100 transform-none">
                <div>
                  <h2 className="font-heading font-bold text-xl text-[rgb(15,23,41)] mb-3">
                    About This Trip
                  </h2>
                  <p className="text-[rgb(99,111,129)] leading-relaxed">
                    Bali is the world's most beloved island for good reason.
                    From misty volcanic peaks and emerald rice terraces to
                    sacred Hindu temples and powder-white beaches — every corner
                    of this Indonesian paradise captivates. Our 5-day curated
                    package takes you beyond the tourist trail and into the soul
                    of Bali, guided by locals who know every hidden gem.
                  </p>
                  <p className="text-[rgb(99,111,129)] leading-relaxed mt-3">
                    Stay in a 5-star beachfront villa in Seminyak, explore the
                    cultural heart of Ubud, take a boat to Nusa Penida for
                    world-class snorkeling, and end with a rejuvenating Balinese
                    spa session. This is Bali at its finest.
                  </p>
                </div>
              </div>
              <div className="opacity-100 transform-none">
                <div>
                  <h2 className="font-heading font-bold text-xl text-[rgb(15,23,41)] mb-4">
                    Trip Highlights
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="group flex items-start gap-3 border border-border rounded-2xl p-4 hover:border-[rgb(14,168,230)]/30 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl bg-[rgb(14,168,230)]/10 flex items-center justify-center shrink-0 group-hover:bg-[rgb(14,168,230)] transition-colors">
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
                          className="lucide lucide-mountain h-5 w-5 text-[rgb(14,168,230)] group-hover:text-[rgb(255,255,255)] transition-colors"
                        >
                          <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[rgb(15,23,41)]">
                          Sacred Temples
                        </p>
                        <p className="text-xs text-[rgb(99,111,129)] mt-0.5">
                          Visit Tanah Lot &amp; Uluwatu
                        </p>
                      </div>
                    </div>
                    <div className="group flex items-start gap-3 border border-border rounded-2xl p-4 hover:border-[rgb(14,168,230)]/30 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl bg-[rgb(14,168,230)]/10 flex items-center justify-center shrink-0 group-hover:bg-[rgb(14,168,230)] transition-colors">
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
                          className="lucide lucide-waves h-5 w-5 text-[rgb(14,168,230)] group-hover:text-[rgb(255,255,255)] transition-colors"
                        >
                          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                          <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[rgb(15,23,41)]">
                          Beach Bliss
                        </p>
                        <p className="text-xs text-[rgb(99,111,129)] mt-0.5">
                          Seminyak &amp; Nusa Dua shores
                        </p>
                      </div>
                    </div>
                    <div className="group flex items-start gap-3 border border-border rounded-2xl p-4 hover:border-[rgb(14,168,230)]/30 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl bg-[rgb(14,168,230)]/10 flex items-center justify-center shrink-0 group-hover:bg-[rgb(14,168,230)] transition-colors">
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
                          className="lucide lucide-camera h-5 w-5 text-[rgb(14,168,230)] group-hover:text-[rgb(255,255,255)] transition-colors"
                        >
                          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                          <circle cx="12" cy="13" r="3"></circle>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[rgb(15,23,41)]">
                          Rice Terraces
                        </p>
                        <p className="text-xs text-[rgb(99,111,129)] mt-0.5">
                          Iconic Tegallalang views
                        </p>
                      </div>
                    </div>
                    <div className="group flex items-start gap-3 border border-border rounded-2xl p-4 hover:border-[rgb(14,168,230)]/30 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl bg-[rgb(14,168,230)]/10 flex items-center justify-center shrink-0 group-hover:bg-[rgb(14,168,230)] transition-colors">
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
                          className="lucide lucide-coffee h-5 w-5 text-[rgb(14,168,230)] group-hover:text-[rgb(255,255,255)] transition-colors"
                        >
                          <path d="M10 2v2"></path>
                          <path d="M14 2v2"></path>
                          <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path>
                          <path d="M6 2v2"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[rgb(15,23,41)]">
                          Local Cuisine
                        </p>
                        <p className="text-xs text-[rgb(99,111,129)] mt-0.5">
                          Authentic Balinese food
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-100 transform-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-heading font-bold text-base text-[rgb(15,23,41)] mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
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
                          className="lucide lucide-check h-3 w-3 text-emerald-500"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                      </span>
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-[rgb(15,23,41)]">
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
                          className="lucide lucide-check h-4 w-4 text-emerald-500 shrink-0 mt-0.5"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>{" "}
                        5-star beachfront resort accommodation
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[rgb(15,23,41)]">
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
                          className="lucide lucide-check h-4 w-4 text-emerald-500 shrink-0 mt-0.5"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>{" "}
                        Daily breakfast &amp; 3 curated dinners
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[rgb(15,23,41)]">
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
                          className="lucide lucide-check h-4 w-4 text-emerald-500 shrink-0 mt-0.5"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>{" "}
                        Airport pickup &amp; drop-off
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[rgb(15,23,41)]">
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
                          className="lucide lucide-check h-4 w-4 text-emerald-500 shrink-0 mt-0.5"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>{" "}
                        Private guided temple tour
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[rgb(15,23,41)]">
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
                          className="lucide lucide-check h-4 w-4 text-emerald-500 shrink-0 mt-0.5"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>{" "}
                        Tegallalang rice terrace visit
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[rgb(15,23,41)]">
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
                          className="lucide lucide-check h-4 w-4 text-emerald-500 shrink-0 mt-0.5"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>{" "}
                        Traditional Balinese spa session
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[rgb(15,23,41)]">
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
                          className="lucide lucide-check h-4 w-4 text-emerald-500 shrink-0 mt-0.5"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>{" "}
                        Snorkeling trip to Nusa Penida
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[rgb(15,23,41)]">
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
                          className="lucide lucide-check h-4 w-4 text-emerald-500 shrink-0 mt-0.5"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>{" "}
                        24/7 personal travel concierge
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-[rgb(15,23,41)] mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center">
                        <span className="text-rose-500 text-xs font-bold">
                          ✕
                        </span>
                      </span>
                      Not Included
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-[rgb(99,111,129)]">
                        <span className="text-rose-400 shrink-0 mt-0.5 text-xs font-bold">
                          ✕
                        </span>{" "}
                        International flights
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[rgb(99,111,129)]">
                        <span className="text-rose-400 shrink-0 mt-0.5 text-xs font-bold">
                          ✕
                        </span>{" "}
                        Personal shopping &amp; souvenirs
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[rgb(99,111,129)]">
                        <span className="text-rose-400 shrink-0 mt-0.5 text-xs font-bold">
                          ✕
                        </span>{" "}
                        Alcoholic beverages
                      </li>
                      <li className="flex items-start gap-2 text-sm text-[rgb(99,111,129)]">
                        <span className="text-rose-400 shrink-0 mt-0.5 text-xs font-bold">
                          ✕
                        </span>{" "}
                        Travel insurance
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="opacity-100 transform-none">
                <div>
                  <h2 className="font-heading font-bold text-xl text-[rgb(15,23,41)] mb-4">
                    Amenities
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(242,245,247)] border border-border text-sm text-[rgb(15,23,41)]">
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
                        className="lucide lucide-wifi h-4 w-4 text-[rgb(14,168,230)]"
                      >
                        <path d="M12 20h.01"></path>
                        <path d="M2 8.82a15 15 0 0 1 20 0"></path>
                        <path d="M5 12.859a10 10 0 0 1 14 0"></path>
                        <path d="M8.5 16.429a5 5 0 0 1 7 0"></path>
                      </svg>{" "}
                      Free WiFi
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(242,245,247)] border border-border text-sm text-[rgb(15,23,41)]">
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
                        className="lucide lucide-car h-4 w-4 text-[rgb(14,168,230)]"
                      >
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                        <circle cx="7" cy="17" r="2"></circle>
                        <path d="M9 17h6"></path>
                        <circle cx="17" cy="17" r="2"></circle>
                      </svg>{" "}
                      Airport Transfer
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(242,245,247)] border border-border text-sm text-[rgb(15,23,41)]">
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
                        className="lucide lucide-coffee h-4 w-4 text-[rgb(14,168,230)]"
                      >
                        <path d="M10 2v2"></path>
                        <path d="M14 2v2"></path>
                        <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path>
                        <path d="M6 2v2"></path>
                      </svg>{" "}
                      Breakfast
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(242,245,247)] border border-border text-sm text-[rgb(15,23,41)]">
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
                        className="lucide lucide-shield h-4 w-4 text-[rgb(14,168,230)]"
                      >
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                      </svg>{" "}
                      Travel Insurance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="opacity-100 transform-none">
                <div className="bg-[rgb(248,250,252)] border border-border rounded-3xl p-6 shadow-xl shadow-[rgb(14,168,230)]/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgb(14,168,230)]/5 via-transparent to-transparent pointer-events-none rounded-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-3xl font-bold text-[rgb(14,168,230)]">
                        $499
                      </span>
                      <span className="text-[rgb(99,111,129)] text-sm mb-1">
                        / person
                      </span>
                    </div>
                    <p className="text-xs text-[rgb(99,111,129)] mb-5">
                      All taxes &amp; fees included
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 hover:border-[rgb(14,168,230)]/40 transition-colors cursor-pointer">
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
                          className="lucide lucide-calendar h-4 w-4 text-[rgb(14,168,230)] shrink-0"
                        >
                          <path d="M8 2v4"></path>
                          <path d="M16 2v4"></path>
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                          ></rect>
                          <path d="M3 10h18"></path>
                        </svg>
                        <div>
                          <p className="text-[10px] text-[rgb(99,111,129)] uppercase tracking-wide">
                            Travel Date
                          </p>
                          <p className="text-sm text-[rgb(99,111,129)]">
                            Select a date
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border border-border rounded-xl px-4 py-3">
                        <div className="flex items-center gap-2">
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
                            className="lucide lucide-users h-4 w-4 text-[rgb(14,168,230)]"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <div>
                            <p className="text-[10px] text-[rgb(99,111,129)] uppercase tracking-wide">
                              Guests
                            </p>
                            <p className="text-sm font-medium text-[rgb(15,23,41)]">
                              2 people
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-[rgb(242,245,247)] text-[rgb(15,23,41)] font-bold transition-colors">
                            −
                          </button>
                          <span className="w-4 text-center text-sm font-semibold">
                            2
                          </span>
                          <button className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-[rgb(242,245,247)] text-[rgb(15,23,41)] font-bold transition-colors">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgb(242,245,247)]/50 rounded-xl p-4 mb-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[rgb(99,111,129)]">
                          $499 × 2 people
                        </span>
                        <span className="font-medium text-[rgb(15,23,41)]">
                          $998
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[rgb(99,111,129)]">
                          Service fee
                        </span>
                        <span className="font-medium text-[rgb(15,23,41)]">
                          $50
                        </span>
                      </div>
                      <div className="h-px bg-[rgb(225,231,239)]"></div>
                      <div className="flex justify-between font-bold">
                        <span className="text-[rgb(15,23,41)]">Total</span>
                        <span className="text-[rgb(14,168,230)]">$1,048</span>
                      </div>
                    </div>
                    <a
                      href="/BookTripPage"
                      className="btn-gradient w-full flex items-center justify-center gap-2 group mb-3"
                    >
                      Book This Trip
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
                        className="lucide lucide-arrow-right h-4 w-4 group-hover:translate-x-0.5 transition-transform"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </a>
                    <p className="text-center text-xs text-[rgb(99,111,129)]">
                      Free cancellation up to 30 days before
                    </p>
                  </div>
                </div>
              </div>
              <div className="opacity-100 transform-none">
                <div className="bg-[rgb(248,250,252)] border border-border rounded-2xl p-5">
                  <p className="font-semibold text-sm text-[rgb(15,23,41)] mb-3">
                    Need help planning?
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:+15551234567"
                      className="flex items-center gap-3 text-sm text-[rgb(99,111,129)] hover:text-[rgb(14,168,230)] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[rgb(14,168,230)]/10 flex items-center justify-center">
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
                          className="lucide lucide-phone h-3.5 w-3.5 text-[rgb(14,168,230)]"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      +1 (555) 123-4567
                    </a>
                    <a
                      href="mailto:hello@travelix.com"
                      className="flex items-center gap-3 text-sm text-[rgb(99,111,129)] hover:text-[rgb(14,168,230)] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[rgb(14,168,230)]/10 flex items-center justify-center">
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
                          className="lucide lucide-mail h-3.5 w-3.5 text-[rgb(14,168,230)]"
                        >
                          <rect
                            width="20"
                            height="16"
                            x="2"
                            y="4"
                            rx="2"
                          ></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                      </div>
                      hello@govolo.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="opacity-100 transform-none">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[rgb(242,245,247)]/50 border border-border rounded-xl p-3 text-center">
                    <p className="text-xs font-bold text-[rgb(14,168,230)]">
                      Verified
                    </p>
                    <p className="text-[10px] text-[rgb(99,111,129)]">
                      Operator
                    </p>
                  </div>
                  <div className="bg-[rgb(242,245,247)]/50 border border-border rounded-xl p-3 text-center">
                    <p className="text-xs font-bold text-[rgb(14,168,230)]">
                      Instant
                    </p>
                    <p className="text-[10px] text-[rgb(99,111,129)]">
                      Booking
                    </p>
                  </div>
                  <div className="bg-[rgb(242,245,247)]/50 border border-border rounded-xl p-3 text-center">
                    <p className="text-xs font-bold text-[rgb(14,168,230)]">
                      Free
                    </p>
                    <p className="text-[10px] text-[rgb(99,111,129)]">Cancel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsCard;
