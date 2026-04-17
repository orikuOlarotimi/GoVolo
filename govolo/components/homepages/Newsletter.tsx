import React from "react";

const Newsletter = () => {
  return (
    <div className="px-6 py-[96px] flex items-center justify-center ">
      <div className="container flex items-center justify-center">
        <div className="border border-border rounded-3xl  flex flex-col items-center p-10 shadow-xl max-w-[770px] w-full  shadow-[rgb(13,162,231)]/5 text-center">
          <div className="gap-2 border border-[rgb(13,162,231)]/20 bg-[rgb(13,162,231)]/10 rounded-full inline-flex items-center mb-6 px-4 py-1.5">
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
              className="lucide lucide-sparkles h-3.5 w-3.5 text-[rgb(13,162,231)]"
            >
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
              <path d="M20 3v4"></path>
              <path d="M22 5h-4"></path>
              <path d="M4 17v2"></path>
              <path d="M5 18H3"></path>
            </svg>
            <h1 className="text-[rgb(13,162,231)]  text-xs font-semibold uppercase tracking-widest">
              {" "}
              NewsLetter
            </h1>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold  mb-3 leading-tight ">
            Travel Smarter,{" "}
            <span className="relative inline-block">
              Not Harder
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M1 5.5 Q50 1 100 5.5 Q150 10 199 5.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-[rgb(13,162,231)] "
                ></path>
              </svg>
            </span>
          </h2>

          <p className="text-sm md:text-base mb-8 max-w-md mx-auto text-center text-[rgb(101,117,139)]">
            Join <span className="text-foreground font-semibold">12,000+</span>{" "}
            travelers who get exclusive deals, hidden gems, and insider tips —
            straight to their inbox.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-sm text-muted-foreground">
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
                className="lucide lucide-tag h-3.5 w-3.5 text-[rgb(13,162,231)]"
              >
                <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </svg>
              Exclusive Deals
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-sm text-muted-foreground">
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
                className="lucide lucide-globe h-3.5 w-3.5 text-[rgb(13,162,231)]"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                <path d="M2 12h20"></path>
              </svg>
              New Destinations
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted text-sm text-muted-foreground">
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
                className="lucide lucide-sparkles h-3.5 w-3.5 text-[rgb(13,162,231)]"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                <path d="M20 3v4"></path>
                <path d="M22 5h-4"></path>
                <path d="M4 17v2"></path>
                <path d="M5 18H3"></path>
              </svg>
              Travel Inspiration
            </div>
          </div>
          <form className=" max-w-[450px] w-full">
            <div className="flex items-center gap-2 rounded-2xl border-2 bg-muted/60 px-4 py-2 transition-all duration-200 border-border">
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
                className="lucide lucide-mail h-4 w-4 shrink-0 transition-colors text-muted-foreground"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>

              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1  min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-1.5"
                required
              />
              <button className="bg-[#20c997] text-white text-semibold hover:scale-105 transition-all hover:shadow-lg cursor-pointer duration-300 flex items-center gap-2 px-5 py-2 text-sm rounded-xl group/btn">
                <p className="hidden sm:inline">Subscribe</p>
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
                  className="lucide lucide-send h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                  <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              No spam, ever. Unsubscribe anytime.{" "}
              <span className="text-[rgb(13,162,231)] underline underline-offset-2 cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </form>

          <div className="flex items-center justify-center gap-3 mt-8 pt-8 border-t border-border w-full ">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 border-2 border-background flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">SJ</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 border-2 border-background flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">MC</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 border-2 border-background flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">EW</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 border-2 border-background flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">DM</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">12,000+</span>{" "}
              travelers already subscribed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
