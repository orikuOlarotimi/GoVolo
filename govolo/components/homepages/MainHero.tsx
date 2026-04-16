import { Star, MapPin, Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop')",
        }}
      >
        {/* Dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 bg-linear-to-b from-black/60 via-transparent to-black/30" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center mt-12">
        {/* Top Badge */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-xs font-semibold tracking-wider uppercase">
            Rated #1 Travel Platform 2026
          </span>
        </div>

        {/* Headlines */}
        <h1 className="text-5xl md:text-7xl font-bold text-white text-center leading-tight mb-6 tracking-tight">
          Explore the World <br />
          <span className="text-[#ffb703] font-semibold relative inline-block">
            with Ease
            <svg
                className="absolute -bottom-1 left-0 w-full text-[#ffb703]"
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
        </h1>

        <p className="text-lg text-slate-200 text-center max-w-2xl mb-12 font-light">
          Find the best destinations, tours, and travel deals around the globe —
          tailored just for you.
        </p>

        {/* Floating Search Box */}
        <div className="w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-3xl p-4 shadow-2xl">
          {/* Tabs */}
          <div className="flex items-center gap-6 mb-4 px-4 pt-2">
            <button className="bg-[#20c997] text-white px-5 py-1.5 rounded-full text-sm font-medium transition-colors">
              Tours
            </button>
            <button className="text-slate-500 hover:text-[#20c997] text-sm font-medium transition-colors">
              Hotels
            </button>
            <button className="text-slate-500 hover:text-[#20c997] text-sm font-medium transition-colors">
              Flights
            </button>
            <button className="text-slate-500 hover:text-[#20c997] text-sm font-medium transition-colors">
              Activities
            </button>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 rounded-2xl p-2 border border-slate-100">
            {/* Location Input */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-[#20c997] transition-colors cursor-pointer">
              <MapPin className="h-5 w-5 text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Where
                </span>
                <input
                  type="text"
                  placeholder="Search destinations"
                  className="bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Check-in Input */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-[#20c997] transition-colors cursor-pointer">
              <Calendar className="h-5 w-5 text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Check-In
                </span>
                <span className="text-sm font-medium text-slate-400">
                  Add date
                </span>
              </div>
            </div>

            {/* Check-out Input */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-[#20c997] transition-colors cursor-pointer">
              <Calendar className="h-5 w-5 text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Check-Out
                </span>
                <span className="text-sm font-medium text-slate-400">
                  Add date
                </span>
              </div>
            </div>

            {/* Guests & Submit Button */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-[#20c997] transition-colors cursor-pointer">
                <Users className="h-5 w-5 text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Guests
                  </span>
                  <span className="text-sm font-medium text-slate-400">
                    Add guests
                  </span>
                </div>
              </div>

              <Button className="h-full px-6 bg-[#20c997] hover:bg-[#1ba87e] text-white rounded-xl shadow-lg transition-all flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-16 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">50K+</span>
            <span className="text-sm text-slate-300">Happy Travelers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">120+</span>
            <span className="text-sm text-slate-300">Countries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">4.9★</span>
            <span className="text-sm text-slate-300">Avg Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}
