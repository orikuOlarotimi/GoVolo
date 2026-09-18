import Link from "next/link";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import DestinationPageCard from "@/components/ui/DestinationPageCard";

export default function Navbar() {
  return (
    <div className="bg-[rgb(248,250,252)]">
      <div className="relative">
        <div className="py-20 px-4 flex items-center justify-center  bg-gradient-to-br from-[rgb(5,15,25)] via-[rgb(8,30,45)] to-[rgb(10,65,90)]">
          <div className="container">
            <div className="flex flex-col items-center">
              <MdOutlineAddLocationAlt size={70} className="text-white mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-[rgb(255,255,255)] ">
                All Destinations
              </h1>
              <div className="h-1 w-20 bg-[rgb(14,164,230)]/50 mx-auto rounded-full mb-4"></div>
            </div>
            <p className="text-[rgb(255,255,255)]/70  text-base  mx-[20px] text-center">
              Explore our handpicked destinations around the world
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[rgb(248,250,252)] rounded-t-3xl"></div>
      </div>

      <div className="border border-black container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
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
              className="lucide lucide-search absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(101,109,120)]"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>{" "}
            <input
              type="text"
              placeholder="Search by destination, description, or location..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[rgb(248,250,252)] border border-border focus:border-[rgb(14,164,230)] focus:ring-2 focus:ring-[rgb(14,164,230)]/20 outline-none transition-all text-[rgb(15,23,42)] placeholder:text-[rgb(101,109,120)]"
            ></input>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border hover:border-[rgb(14,164,230)]/40 transition-all text-[rgb(15,23,42)] cursor-pointer">
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
              className="lucide lucide-sliders-horizontal h-4 w-4"
            >
              <line x1="21" x2="14" y1="4" y2="4"></line>
              <line x1="10" x2="3" y1="4" y2="4"></line>
              <line x1="21" x2="12" y1="12" y2="12"></line>
              <line x1="8" x2="3" y1="12" y2="12"></line>
              <line x1="21" x2="16" y1="20" y2="20"></line>
              <line x1="12" x2="3" y1="20" y2="20"></line>
              <line x1="14" x2="14" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="10" y2="14"></line>
              <line x1="16" x2="16" y1="18" y2="22"></line>
            </svg>
            Filters
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
              className="lucide lucide-chevron-down h-4 w-4 transition-transform"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DestinationPageCard/>
        </div>
      </div>
    </div>
  );
}
