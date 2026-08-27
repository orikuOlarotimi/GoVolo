"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import { ReactNode } from "react";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/**
 * AuthShell
 * Shared two-column frame for every auth-related page (login, signup,
 * verify-otp, forgot-password, reset-password). Left panel is the fixed
 * GoVolo brand/illustration/testimonial block; right panel is passed in
 * as children so each page controls its own form content.
 */
export default function AuthShell({
  children,
  topRight,
}: {
  children: ReactNode;
  topRight?: ReactNode;
}) {
  return (
    <div
      className={`${plusJakarta.className} min-h-screen w-full bg-white flex flex-col lg:flex-row`}
    >
      {/* LEFT PANEL */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden  px-14 py-12 text-white group">
        {/* background world-map + gradient glow */}
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(7,21,38,0.88)_0%,rgba(7,21,38,0.62)_35%,rgba(7,21,38,0.15)_65%,transparent_100%)]" />

        {/* Grey overlay - RIGHT → LEFT */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-l from-gray-500/70 to-transparent" />

        <img
          src={"/images/authshell.jpg"}
          alt={"hello world"}
          className="object-cover inset-0 z-0 w-full h-full group-hover:scale-107 transition duration-500 absolute"
        />
        {/* header */}
        <div className="relative z-10 flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5eead4"
            strokeWidth={1.8}
            className="h-6 w-6"
          >
            <path d="M3 12l18-8-6 18-3-7-7-3Z" strokeLinejoin="round" />
          </svg>
          <span className="text-[19px] font-bold tracking-tight">GoVolo</span>
        </div>

        {/* hero copy */}
        <div className="relative z-10 max-w-[500px]">
          <h1 className="text-[40px] font-extrabold leading-[1.15] tracking-tight">
            Your next trip is{" "}
            <span className="bg-gradient-to-r from-[#5eead4] to-[#1aa6e0] bg-clip-text text-transparent">
              one login away
            </span>
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-white">
            Discover new places, experience amazing adventures, create
            unforgettable memories, and let every journey take you somewhere
            new, because the best stories are the ones you live, explore, and
            share along the way.
          </p>

          <div className="mt-9 flex items-center gap-8">
            <div>
              <p className="text-[22px] font-extrabold">50K+</p>
              <p className="text-[14px] text-white font-bold">
                Happy travelers
              </p>
            </div>
            <div>
              <p className="text-[22px] font-extrabold">120+</p>
              <p className="text-[14px] text-white font-bold">Countries</p>
            </div>
            <div>
              <p className="text-[22px] font-extrabold">4.9★</p>
              <p className="text-[14px] text-white font-bold">Avg. rating</p>
            </div>
          </div>
        </div>

        {/* testimonial + footer */}
        <div className="relative z-10 ">
          <div className="max-w-md  p-5">
            <p className="text-[14.5px] italic leading-relaxed text-[#d6dee8]">
              "Booked Santorini in under five minutes. Travelix remembered my
              preferences from the last trip, genuinely felt effortless."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f97066] to-[#f0b429] text-[13px] font-bold">
                AC
              </div>
              <div>
                <p className="text-[13.5px] font-semibold">Amara Chukwu</p>
                <p className="text-[12px] text-[#8b98ac]">Lagos, Nigeria</p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-[12px] text-white">
            © 2026 GoVolo. Wander further.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full flex-1 flex-col px-6 py-8 sm:px-12 lg:w-1/2 lg:px-16 lg:py-12">
        <div className="flex items-center justify-between">
          {/* GoVolo logo visible on mobile only, since left panel is hidden */}
          <div className="flex items-center gap-2 lg:hidden">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1aa6e0"
              strokeWidth={1.8}
              className="h-5 w-5"
            >
              <path d="M3 12l18-8-6 18-3-7-7-3Z" strokeLinejoin="round" />
            </svg>
            <span className="text-[16px] font-bold tracking-tight text-white">
              GoVolo
            </span>
          </div>
          <div className="ml-auto text-[13.5px] text-[#5b6779]">{topRight}</div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[420px] py-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
