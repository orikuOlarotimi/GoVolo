import React from "react";
type post = {
  id: number;
  img: string;
  tag: string;
  title: string;
  para: string;
  date: string;
  time: string;
};
const PostCard = ({ img, tag, title, para, date, time }: post) => {
  return (
    <div className="w-full flex items-center justify-between rounded-3xl hover:[rgb(13,162,231)]/30 hover:shadow-xl hover:shadow-[rgb(13,162,231)]/5 transition-all duration-300 hover:-translate-y-0.5 h-full group overflow-hidden border border-border cursor-pointer">
      <div className="relative w-2/5 h-full overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 "
        />
        <span className="absolute bottom-3 left-3 px-2.5 py-0.5 gap-1 inline-flex font-bold text-white text-[10px] rounded-full bg-gradient-to-r from-pink-400 to-rose-600">
          {tag}
        </span>
      </div>

      <div className="flex flex-col items-center justify-between w-full h-full p-5">
        <div className="flex items-center justify-between mb-2.5 w-full">
          <span className="flex items-center gap-1 text-[rgb(101,117,139)] text-xs">
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
              className="lucide lucide-calendar h-3 w-3"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            {date}
          </span>
          <span className="flex items-center gap-1 text-[rgb(101,117,139)] text-xs">
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
              className="lucide lucide-clock h-3 w-3"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {time}
          </span>
        </div>
        <h1 className="w-full text-[16px] font-bold leading-snug mb-2 group-hover:text-[rgb(13,162,231)] transition-colors duration-200 line-clamp-2">
          {title}
        </h1>
        <p className="text-xs leading-relaxed line-clamp-2 text-[rgb(101,117,139)]">
          {para}
        </p>
        <div className="flex items-center gap-1.5 text-[rgb(13,162,231)] text-xs font-semibold  mt-3 opacity-0 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100  transition-all duration-200">
          Read More{" "}
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
            className="lucide lucide-arrow-right h-3.5 w-3.5"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
