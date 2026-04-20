"use client";
import React, { useEffect } from "react";
import { Plane } from "lucide-react";

const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-blue-500 pointer-events-auto  z-[9999]">
      <div className="flex flex-col items-center justify-between max-h-34 h-full max-w-[164px] w-full">
        <Plane className="text-white w-20 h-20  animate-[bounce_2s_infinite]" />
        <h2 className="text-center text-white font-bold text-[18px]">GoVolo</h2>
        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden animate-pulse">
          {/* Animated Bar */}
          <div className="h-full bg-white animate-loading w-[80%]"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
