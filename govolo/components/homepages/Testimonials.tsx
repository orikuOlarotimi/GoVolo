"use client";

import React, { useEffect, useState } from "react";
import { MapPin, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: "sj",
    initials: "SJ",
    name: "Sarah Johnson",
    title: "Adventure Traveler",
    location: "New York, USA",
    rating: 5,
    tag: "Maldives Honeymoon",
    quote:
      "GoVolo made our honeymoon absolutely magical. Every detail was perfectly planned — from the flights to the hotel surprises. I couldn't have asked for more!",
  },
  {
    id: "mc",
    initials: "MC",
    name: "Micheal Akoh",
    title: "Business Executive",
    location: "Nigera, Lagos",
    rating: 5,
    tag: "Corporate Retreat",
    quote:
      "The efficiency and attention to detail from the team is unmatched. They handled a complex itinerary for 15 people flawlessly.",
  },
  {
    id: "ew",
    initials: "EW",
    name: "Emma Watson",
    title: "Solo Explorer",
    location: "Sydney, AUS",
    rating: 4,
    tag: "European Backpacking",
    quote:
      "Felt incredibly safe and well-guided throughout my solo trip across Europe. The 24/7 support line was a lifesaver when my train was delayed.",
  },
  {
    id: "dm",
    initials: "DM",
    name: "Rotimi Oriku",
    title: "Family Vacationer",
    location: "Nigeria, Akure",
    rating: 5,
    tag: "Nigerian Family Trip",
    quote:
      "Traveling with three kids is usually a nightmare, but the itinerary was paced perfectly for families. We actually got to relax!",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Helper to render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };
 
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
            <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            What Our{" "}
            <span className="relative inline-block">
              Travelers Say
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-blue-500"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 15 Q 50 0 100 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Main Testimonial Card */}
        <Card className="border-slate-100 shadow-xl shadow-blue-900/5 mb-8 overflow-hidden rounded-3xl">
          <CardContent className="p-0 flex flex-col md:flex-row">
            {/* Left Column: User Profile */}
            <div className="w-full md:w-1/3 bg-slate-50 p-8 md:p-10 border-r border-slate-100 flex flex-col items-start">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-md shadow-blue-500/20">
                {activeTestimonial.initials}
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {activeTestimonial.name}
              </h3>
              <p className="text-slate-500 text-sm mb-2">
                {activeTestimonial.title}
              </p>
              <div className="flex items-center text-slate-400 text-xs mb-6">
                <MapPin className="h-3 w-3 mr-1" />
                {activeTestimonial.location}
              </div>
              <div className="flex gap-1 mb-6">
                {renderStars(activeTestimonial.rating)}
              </div>
              <div className="mt-auto bg-blue-50 text-blue-500 text-xs font-semibold px-4 py-2 rounded-full border border-blue-100">
                {activeTestimonial.tag}
              </div>
            </div>

            {/* Right Column: Quote & Controls */}
            <div className="w-full md:w-2/3 p-8 md:p-12 relative flex flex-col justify-center">
              {/* Giant background quote mark */}
              <Quote className="absolute top-8 right-8 h-32 w-32 text-slate-50 rotate-180" />

              <div className="relative z-10">
                <Quote className="h-8 w-8 text-blue-300 mb-6" />
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium mb-12">
                  {activeTestimonial.quote}
                </p>

                {/* Pagination and Arrows */}
                <div className="flex items-center justify-between mt-auto">
                  {/* Dots */}
                  <div className="flex gap-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === activeIndex
                            ? "w-6 bg-blue-500"
                            : "w-2 bg-slate-200 hover:bg-slate-300"
                        }`}
                        aria-label={`Go to testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Arrows */}
                  <div className="flex gap-3">
                    <button
                      title="Left arrow"
                      onClick={prevTestimonial}
                      className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-500 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      title="Right arrow"
                      onClick={nextTestimonial}
                      className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-500 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thumbnail Selector */}
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
          {testimonials.map((test, idx) => (
            <button
              key={test.id}
              onClick={() => setActiveIndex(idx)}
              className={`shrink-0 flex items-center gap-3 p-3 rounded-2xl border-2 transition-all min-w-50 snap-start ${
                idx === activeIndex
                  ? "border-blue-300 bg-blue-50/50 shadow-sm"
                  : "border-slate-100 bg-white hover:border-blue-100 opacity-70 hover:opacity-100"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold ${
                  idx === activeIndex
                    ? "bg-blue-500"
                    : "bg-linear-to-br from-indigo-400 to-purple-400"
                }`}
              >
                {test.initials}
              </div>
              <div className="text-left flex-1">
                <p
                  className={`text-sm font-bold ${idx === activeIndex ? "text-blue-600" : "text-slate-700"}`}
                >
                  {test.name.split(" ")[0]}
                </p>
                <div className="flex gap-0.5 mt-0.5 scale-75 origin-left">
                  {renderStars(test.rating)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
