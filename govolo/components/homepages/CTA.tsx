import React from "react";
import { Star, MapPin, Users, Award, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Section from "../animationComponents/Section";
export default function CTA() {
  return (
    <Section>
      <section className="bg-white">
        <div className="max-w-full mx-auto relative overflow-hidden bg-linear-to-br from-[#15b7cd] to-[#288dda] shadow-2xl py-20 px-6 md:px-16 flex flex-col items-center justify-center text-center">
          {/* Abstract Background Patterns (Optional SVG Overlays could go here) */}
          <div
            className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          {/* Floating Badges (Hidden on very small screens for cleanliness) */}
          <div className="hidden lg:flex absolute top-12 left-16 items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg">
            <div className="bg-yellow-400 p-1 rounded-full">
              <Star className="h-3 w-3 fill-white text-white" />
            </div>
            Top Rated 2026
          </div>

          <div className="hidden lg:flex absolute top-16 right-16 items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg">
            <div className="bg-blue-400 p-1 rounded-full">
              <MapPin className="h-3 w-3 text-white" />
            </div>
            500+ Destinations
          </div>

          <div className="hidden lg:flex absolute bottom-12 left-16 items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg">
            <div className="bg-green-400 p-1 rounded-full">
              <Users className="h-3 w-3 text-white" />
            </div>
            50K+ Travelers
          </div>

          <div className="hidden lg:flex absolute bottom-12 right-16 items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg">
            <div className="bg-purple-400 p-1 rounded-full">
              <Award className="h-3 w-3 text-white" />
            </div>
            Award Winning
          </div>

          {/* Main Content */}
          <div className="relative z-10 max-w-3xl flex flex-col items-center">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full mb-8">
              <Tag className="h-4 w-4 text-white" />
              <span className="text-white text-xs font-bold tracking-widest uppercase">
                Limited Time Offer
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Ready for Your <br className="hidden md:block" />
              <span className="relative inline-block ">
                Next Adventure?
                <svg
                  className="absolute -bottom-1 left-0 w-full text-[rgb(248, 253, 255)]"
                  viewBox="0 0 300 8"
                  fill="none"
                >
                  <path
                    d="M1 5.5 Q75 1 150 5.5 Q225 10 299 5.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-white/90 text-x1 md:text-xl mb-10 font-light max-w-xl">
              Let us craft memories that last a lifetime. Your dream trip is
              just one click away.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <Button className="bg-white hover:bg-slate-50 text-[#288dda] font-bold px-8 py-6 rounded-full text-base transition-all shadow-xl">
                Book Your Trip Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white border-white/50 hover:border-white font-bold px-8 py-6 rounded-full text-base transition-all"
              >
                Explore Packages <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Glassmorphism Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-4 md:p-4 w-full max-w-4xl shadow-xl mb-4">
              <div className="flex flex-col items-center border-r px-2 border-white/20 last:border-0 ">
                <span className="text-xl font-bold text-white mb-1">50K+</span>
                <span className="text-sm text-white/80 tracking-wider">
                  Happy Travelers
                </span>
              </div>
              <div className="flex flex-col items-center border-r border-white/20 md:border-r-white/20 max-md:border-r-0">
                <span className="text-xl font-bold text-white mb-1">120+</span>
                <span className="text-sm text-white/80 tracking-wider">
                  Destinations
                </span>
              </div>
              <div className="flex flex-col items-center border-r border-white/20 last:border-0">
                <span className="text-xl font-bold text-white mb-1">4.9</span>
                <span className="text-sm text-white/80 tracking-wider">
                  Avg. Rating
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-white mb-1">15yr</span>
                <span className="text-sm text-white/80 tracking-wider">
                  Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}
