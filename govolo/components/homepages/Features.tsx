import React from "react";
import {
  DollarSign,
  Headphones,
  MapPin,
  MousePointerClick,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Section from "../animationComponents/Section";

export default function Features() {
  const features = [
    {
      id: 1,
      title: "Best Price Guarantee",
      description: "We match or beat any competitor's price for the same trip.",
      icon: (
        <DollarSign className="h-5 w-5 text-blue-500 transition-colors duration-300 group-hover/card:text-blue-800" />
      ),
      stats: "100%",
      statsLabel: "Price Match",
      active: false,
    },
    {
      id: 2,
      title: "24/7 Customer Support",
      description: "Our travel experts are available around the clock for you.",
      icon: (
        <Headphones className="h-5 w-5 text-blue-500 transition-colors duration-300 group-hover/card:text-blue-800" />
      ),
      stats: "24/7",
      statsLabel: "Always Online",
      active: false,
    },
    {
      id: 3,
      title: "Handpicked Destinations",
      description:
        "Every destination is vetted by our experienced travel team.",
      icon: (
        <MapPin className="h-5 w-5 text-blue-500 transition-colors duration-300 group-hover/card:text-blue-800" />
      ),
      stats: "500+",
      statsLabel: "Destinations",
      active: false,
    },
    {
      id: 4,
      title: "Easy Booking Process",
      description: "Book your dream trip in just a few clicks, stress-free.",
      icon: (
        <MousePointerClick className="h-5 w-5 text-blue-500 transition-colors duration-300 group-hover/card:text-blue-800" />
      ),
      stats: "3min",
      statsLabel: "Avg. Booking",
      active: false, // Highlight this feature as active or not
    },
  ];

  return (
    <Section>
      <section className="py-24 bg-linear-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">
                Why GoVolo
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Travel with{" "}
              <span className="relative inline-block">
                Confidence
                {/* Hand-drawn underline SVG */}
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
            <p className="text-slate-500 text-lg">
              Knowing you&apos;re in the best hands every step of the journey
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className={`border-2 transition-all duration-300 group/card hover:shadow-lg hover:shadow-blue-200/40 ${
                  feature.active
                    ? "border-blue-200 bg-blue-50/30 shadow-sm"
                    : "border-slate-100 bg-white"
                }`}
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Top Row: Icon & Stats */}
                  <div className="flex justify-between items-start mb-8">
                    <div
                      className={`relative p-4 rounded-2xl transition-colors duration-300 ${feature.active ? "bg-blue-500 shadow-md group-hover/card:bg-blue-600" : "bg-blue-50 group-hover/card:bg-blue-100"}`}
                    >
                      {feature.icon}
                      {/* Little decorative dot */}
                      <div
                        className={`absolute -top-1 -right-1 h-3 w-3 rounded-full border border-white ${feature.active ? "bg-blue-300" : "bg-blue-200"}`}
                      ></div>
                    </div>
                    <div className="text-right">
                      <h4 className="text-2xl font-bold text-slate-900 ">
                        {feature.stats}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {feature.statsLabel}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row: Text content */}
                  <div className="mt-auto">
                    <div className="h-px w-full bg-slate-100 mb-6"></div>
                    <h3
                      className={`text-xl font-bold mb-3 transition-colors duration-300 ${feature.active ? "text-blue-500" : "text-slate-900 group-hover/card:text-blue-700"}`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {feature.description}
                    </p>

                    <button className="mt-6 flex items-center text-blue-500 text-sm font-semibold transition-all duration-300 opacity-0 invisible pointer-events-none group-hover/card:opacity-100 group-hover/card:visible group-hover/card:pointer-events-auto hover:text-blue-800">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Stats Banner */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-bold text-xl">50,000+</span>
              <span className="text-slate-500 text-sm">Happy Travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-bold text-xl">120+</span>
              <span className="text-slate-500 text-sm">Countries Covered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-bold text-xl">12,000+</span>
              <span className="text-slate-500 text-sm">5-Star Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-bold text-xl">15+</span>
              <span className="text-slate-500 text-sm">
                Years of Experience
              </span>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}
