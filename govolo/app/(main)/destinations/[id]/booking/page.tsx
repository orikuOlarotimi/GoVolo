import React from 'react'
import { useState } from "react";
import { MdOutlineAddLocationAlt } from "react-icons/md";

const page = () => {
  return (
     <div className="bg-[rgb(248,250,252)]">
          <div className="relative">
            <div className="py-30 px-4 flex items-center justify-center bg-gradient-to-br from-[rgb(5,15,25)] via-[rgb(8,30,45)] to-[rgb(10,65,90)]">
              <div className="container">
                <div className="flex flex-col items-center">
                  <MdOutlineAddLocationAlt size={70} className="text-white mb-6" />
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-[rgb(255,255,255)]">
                    All Destinations
                  </h1>
                  <div className="h-1 w-20 bg-[rgb(14,164,230)]/50 mx-auto rounded-full mb-4"></div>
                </div>
                <p className="text-[rgb(255,255,255)]/70 text-base mx-[20px] text-center">
                  Explore our handpicked destinations around the world
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[rgb(248,250,252)] rounded-t-3xl"></div>
      </div>
      </div>
  )
}

export default page