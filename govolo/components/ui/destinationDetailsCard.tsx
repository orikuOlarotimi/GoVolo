"use client";

import { useState } from "react";
import ItineraryTab from "../../components/ui/ItineraryTab";
import ReviewsTab from "../../components/ui/ReviewsTab";
import type { Destination, Review } from "@/types/destination";

type DestinationDetailsCardProps = {
  data: Destination;
  reviews: Review[];
  isPreview?: boolean;
};

type Tab = "overview" | "itinerary" | "reviews";

const SERVICE_FEE = 0;

const DestinationDetailsCard = ({
  data,
  reviews,
  isPreview = false,
}: DestinationDetailsCardProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const standardRoom = data.roomTypes?.[0];
  const pricePerPerson = standardRoom?.price ?? data.price;
  const total = pricePerPerson * 2 + SERVICE_FEE; // matches the existing "2 people" static default below

  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div
            className={`space-y-10 ${isPreview ? "lg:col-span-3" : "lg:col-span-2"}`}
          >
            {/* Stat cards */}

            <div
              className={`grid gap-4 ${isPreview ? "grid-cols-2" : "grid-cols-3"}`}
            >
              {!isPreview && (
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
                    {data.duration || "Not specified"}
                  </p>
                </div>
              )}
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
                  {data.groupSize
                    ? `${data.groupSize.min} – ${data.groupSize.max} People`
                    : "Not specified"}
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
                  {data.rating.average} / 5.0
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-border">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-5 py-2.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${
                  activeTab === "overview"
                    ? "border-[rgb(14,168,230)] text-[rgb(14,168,230)]"
                    : "border-transparent text-[rgb(99,111,129)] hover:text-[rgb(15,23,41)]"
                }`}
              >
                overview
              </button>
              <button
                onClick={() => setActiveTab("itinerary")}
                className={`px-5 py-2.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${
                  activeTab === "itinerary"
                    ? "border-[rgb(14,168,230)] text-[rgb(14,168,230)]"
                    : "border-transparent text-[rgb(99,111,129)] hover:text-[rgb(15,23,41)]"
                }`}
              >
                itinerary
              </button>
              {!isPreview && (
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-5 py-2.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${
                    activeTab === "reviews"
                      ? "border-[rgb(14,168,230)] text-[rgb(14,168,230)]"
                      : "border-transparent text-[rgb(99,111,129)] hover:text-[rgb(15,23,41)]"
                  }`}
                >
                  reviews
                </button>
              )}
            </div>

            {/* Tab content */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* About This Trip */}
                <div>
                  <h2 className="font-heading font-bold text-xl text-[rgb(15,23,41)] mb-3">
                    About This Trip
                  </h2>
                  <p className="text-[rgb(99,111,129)] leading-relaxed whitespace-pre-line">
                    {data.description}
                  </p>
                </div>

                {/* Trip Highlights */}
                <div>
                  <h2 className="font-heading font-bold text-xl text-[rgb(15,23,41)] mb-4">
                    Trip Highlights
                  </h2>
                  {data.tripHighlights.length === 0 ? (
                    <p className="text-left text-sm text-[rgb(99,111,129)] py-6">
                      Trip highlights unavailable for this trip.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {data.tripHighlights.map((h, i) => (
                        <div
                          key={i}
                          className="group flex items-start gap-3 border border-border rounded-2xl p-4 hover:border-[rgb(14,168,230)]/30 hover:shadow-md transition-all"
                        >
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
                              className="lucide lucide-sparkles h-5 w-5 text-[rgb(14,168,230)] group-hover:text-white transition-colors"
                            >
                              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-[rgb(15,23,41)]">
                              {h.title}
                            </p>
                            <p className="text-xs text-[rgb(99,111,129)] mt-0.5">
                              {h.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Included / Not Included */}
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
                    {data.included.length === 0 ? (
                      <p className="text-left text-sm text-[rgb(99,111,129)] py-4">
                        No included items listed for this trip.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {data.included.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-[rgb(15,23,41)]"
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
                              className="lucide lucide-check h-4 w-4 text-emerald-500 shrink-0 mt-0.5"
                            >
                              <path d="M20 6 9 17l-5-5"></path>
                            </svg>{" "}
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
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
                    {data.notIncluded.length === 0 ? (
                      <p className="text-left text-sm text-[rgb(99,111,129)] py-4">
                        No excluded items listed for this trip.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {data.notIncluded.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-[rgb(99,111,129)]"
                          >
                            <span className="text-rose-400 shrink-0 mt-0.5 text-xs font-bold">
                              ✕
                            </span>{" "}
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="font-heading font-bold text-xl text-[rgb(15,23,41)] mb-4">
                    Amenities
                  </h2>
                  {data.amenities.length === 0 ? (
                    <p className="text-center text-sm text-[rgb(99,111,129)] py-6">
                      Amenities unavailable for this trip.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {data.amenities.map((amenity, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(242,245,247)] border border-border text-sm text-[rgb(15,23,41)]"
                        >
                          {amenity}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "itinerary" && (
              <ItineraryTab itinerary={data.itinerary} />
            )}

            {!isPreview && activeTab === "reviews" && (
              <ReviewsTab reviews={reviews} rating={data.rating} />
            )}
          </div>

          {/* Sidebar — unchanged structurally, now data-driven on price */}
          {!isPreview && (
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                <div className="bg-[rgb(248,250,252)] border border-border rounded-3xl p-6 shadow-xl shadow-[rgb(14,168,230)]/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgb(14,168,230)]/5 via-transparent to-transparent pointer-events-none rounded-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-3xl font-bold text-[rgb(14,168,230)]">
                        ${pricePerPerson}
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
                          ${pricePerPerson} × 2 people
                        </span>
                        <span className="font-medium text-[rgb(15,23,41)]">
                          ${pricePerPerson * 2}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[rgb(99,111,129)]">
                          Service fee
                        </span>
                        <span className="font-medium text-[rgb(15,23,41)]">
                          ${SERVICE_FEE}
                        </span>
                      </div>
                      <div className="h-px bg-[rgb(225,231,239)]"></div>
                      <div className="flex justify-between font-bold">
                        <span className="text-[rgb(15,23,41)]">Total</span>
                        <span className="text-[rgb(14,168,230)]">${total}</span>
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
                      href="mailto:hello@govolo.com"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsCard;
