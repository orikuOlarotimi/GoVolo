import React from "react";
import Section from "../animationComponents/Section";

import PostCard from "../card/PostCard";
const first = {
  id: 1,
  img: "/images/dest-bali.jpg",
  tag: "trending",
  tagStatus: "Discovery",
  title: "10 Hidden Gems in Bali You Must Visit",
  para: "Discover secret temples, waterfalls and beaches that most tourists never find on their first visit.",
  date: "Mar 15, 2026",
  time: "6 min",
};

const cards = [
  {
    id: 1,
    img: "/images/dest-paris.jpg",
    tag: "Budget Travel",
    title: "A Complete Guide to Paris on a Budget",
    para: "Experience the City of Light without breaking the bank with these insider tips and local jddjiuc xjkw",
    date: "Mar 10, 2026",
    time: "8 min read",
  },
  {
    id: 2,
    img: "/images/dest-swiss.jpg",
    tag: "Adventure",
    title: "Best Hiking Trails in the Swiss Alps",
    para: "From easy walks to challenging peaks, explore the top trails for every level of hiker. jddjiuc xjkw",
    date: "Mar 5, 2026",
    time: "5 min read",
  },
];
const Blog = () => {
  return (
    <Section>
      <div className="px-6 py-[96px] flex items-center justify-center">
        <div className="container max-w-7xl">
          <div className="w-full flex justify-between items-center mb-16  flex-col sm:flex-row">
            <div className="">
              <span className="inline-block mb-3 px-4 py-1.5 bg-[rgb(13,162,231)]/10 border border-[rgb(13,162,231)]/20 rounded-full font-semibold text-xs tracking-[0.25em]  text-[rgb(13,162,231)]  ">
                OUR BLOG
              </span>
              <h2 className="mt-2 text-left text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-[700] mb-[16px] ">
                {" "}
                Travel Stories{" "}
                <span className="relative inline-block">
                  {" "}
                  & Tips{" "}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 100 8"
                    fill="none"
                  >
                    <path
                      d="M1 5.5 Q25 1 50 5.5 Q75 10 99 5.5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="text-[rgb(13,162,231)]"
                    ></path>
                  </svg>
                </span>
              </h2>
            </div>
            <button className="inline-flex items-center justify-center gap-2 group cursor-pointer px-6 py-2.5 text-[rgb(13,162,231)] rounded-2xl border-2 border-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300">
              View All Posts
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
            </button>
          </div>
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full lg:auto-rows-[225px] sm:auto-rows-[340px] md:auto-rows-[225px] gap-6 ">
              <div className="lg:row-span-2 group relative w-full h-full rounded-2xl overflow-hidden shadow-lg cursor-pointer">
                <img
                  src={first.img}
                  alt={first.title}
                  className="object-cover w-full h-full group-hover:scale-107 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(13,162,231)]/20 via-transparent to-transparent opacity-0  group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* start of main elements */}
                <div className="absolute w-full top-5 px-6 flex items-center justify-between">
                  <span className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-400 to-rose-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">
                    {first.tag}
                  </span>
                  <span className="bg-black/30 backdrop-blur-sm border border-white/20 text-white text-[11px] font-medium px-3 py-1 rounded-full">
                    {first.tagStatus}
                  </span>
                </div>

                <div className="absolute bottom-5 md:bottom-2 lg:bottom-5 w-full px-6">
                  <div className=" w-full mb-3  md:mb-1 lg:mb-3 flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-white/60 text-xs">
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
                        className="lucide lucide-calendar h-3.5 w-3.5"
                      >
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>{" "}
                      {first.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/60 text-xs">
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
                        className="lucide lucide-clock h-3.5 w-3.5"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {first.time} read
                    </span>
                  </div>
                  <h1 className="font-heading font-bold text-white text-2xl md:text-[17px] lg:text-3xl leading-tight mb-3 md:mb-1 lg:mb-3  group-hover:text-[rgb(13,162,231)]/90 transition-colors duration-300">
                    {first.title}
                  </h1>
                  <p className="mb-5 md:mb-1 lg:mb-5 max-w-lg  text-white/65 text-sm leading-relaxed md:leading-[1.2] lg:leading-relaxed">
                    {first.para}
                  </p>

                  <button className="flex items-center gap-2 text-[rgb(13,162,231)] font-semibold text-sm group-hover:gap-3 transition-all">
                    Read Articule{" "}
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
                      className="lucide lucide-arrow-right h-4 w-4"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {cards.map((card) => {
                return <PostCard key={card.id} {...card} />;
              })}
            </div>
            <div className="mt-[20px] rounded-3xl bg-gradient-to-br from-[rgb(13,162,231)] to-[rgb(13,162,231)]/80 relative overflow-hidden p-6">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10 pointer-events-none"></div>

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
                className="lucide lucide-book-open h-7 w-7 text-white/80 mb-3 relative z-10"
              >
                <path d="M12 7v14"></path>
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
              </svg>
              <p className="font-heading font-bold text-white text-lg leading-tight mb-1 relative z-10">
                48+ Articles Published
              </p>
              <p className="text-white/70 text-xs relative z-10 mb-4">
                Tips, guides &amp; inspiration for every kind of traveler.
              </p>

              <button className="relative inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-white/25 transition-colors group cursor-pointer">
                Explore All{" "}
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
                  className="lucide lucide-arrow-right h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </Section>
  );
};

export default Blog;
