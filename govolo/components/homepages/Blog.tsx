"use client";

import React, { useState } from "react";
import Section from "../animationComponents/Section";
import PostCard from "../card/PostCard";

type BlogAuthor = {
  name?: string;
};

type Blog = {
  _id: string;
  title: string;
  image: string;
  tag: string;
  details: string;
  author?: BlogAuthor;
  visits?: number;
  createdAt: string;
  isTrending?: boolean;
};

type BlogsApiResponse = {
  success: boolean;
  page?: number;
  totalPages?: number;
  total?: number;
  count?: number;
  blogs?: Blog[];
};

type BlogProps = {
  data: BlogsApiResponse;
};

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const FIXED_READ_TIME = "10 min read";

function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function truncateDetails(details: string) {
  if (!details) return "";
  const words = details.trim().split(/\s+/);
  if (words.length <= 18) return details;
  return words.slice(0, 18).join(" ") + "...";
}

const Blog = ({ data: initialData }: BlogProps) => {
  const initialSuccess = initialData?.success ?? false;
  const initialItems =
    initialSuccess && Array.isArray(initialData?.blogs)
      ? initialData.blogs.slice(0, 3)
      : [];

  const [items, setItems] = useState<Blog[]>(initialItems);
  const [total, setTotal] = useState<number>(initialData?.total ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(!initialSuccess);

  const retry = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${API_URL}/api/blogs?limit=3`);
      if (!res.ok) throw new Error("Request failed");
      const json: BlogsApiResponse = await res.json();

      if (!json.success || !Array.isArray(json.blogs)) {
        throw new Error("Unsuccessful response");
      }

      setItems(json.blogs.slice(0, 3));
      setTotal(json.total ?? 0);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const trendingIndex = items.findIndex((b) => b.isTrending);
  const featuredIndex = trendingIndex !== -1 ? trendingIndex : 0;
  const featured = items[featuredIndex];
  const rest = items.filter((_, i) => i !== featuredIndex);

  const renderFeaturedCard = (blog: Blog, heightClass: string) => (
    <div
      className={`group relative w-full ${heightClass} rounded-2xl overflow-hidden shadow-lg cursor-pointer`}
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="object-cover w-full h-full group-hover:scale-107 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(13,162,231)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute w-full top-5 px-6 flex items-center justify-between">
        {blog.isTrending && (
          <span className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-400 to-rose-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">
            Trending
          </span>
        )}
        <span className="bg-black/30 backdrop-blur-sm border border-white/20 text-white text-[11px] font-medium px-3 py-1 rounded-full ml-auto">
          {blog.tag}
        </span>
      </div>

      <div className="absolute bottom-5 md:bottom-2 lg:bottom-5 w-full px-6">
        <div className="w-full mb-3 md:mb-1 lg:mb-3 flex items-center gap-4">
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
            {formatDate(blog.createdAt)}
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
            {FIXED_READ_TIME}
          </span>
        </div>
        <h1 className="font-heading font-bold text-white text-2xl md:text-[17px] lg:text-3xl leading-tight mb-3 md:mb-1 lg:mb-3 group-hover:text-[rgb(13,162,231)]/90 transition-colors duration-300 line-clamp-2">
          {blog.title}
        </h1>
        <p className="mb-5 md:mb-1 lg:mb-5 max-w-lg text-white/65 text-sm leading-relaxed md:leading-[1.2] lg:leading-relaxed line-clamp-2">
          {truncateDetails(blog.details)}
        </p>

        <button className="flex items-center gap-2 text-[rgb(13,162,231)] font-semibold text-sm group-hover:gap-3 transition-all">
          Read Article{" "}
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
  );

  const renderGrid = () => {
    if (items.length === 1) {
      return renderFeaturedCard(featured, "h-[420px]");
    }

    if (items.length === 2) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          {renderFeaturedCard(featured, "h-[340px]")}
          {rest.map((blog) => (
            <PostCard
              key={blog._id}
              id={blog._id}
              img={blog.image}
              tag={blog.tag}
              title={blog.title}
              para={truncateDetails(blog.details)}
              date={formatDate(blog.createdAt)}
              time={FIXED_READ_TIME}
            />
          ))}
        </div>
      );
    }

    // 3 items — original asymmetric layout
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full lg:auto-rows-[225px] sm:auto-rows-[340px] md:auto-rows-[225px] gap-6">
        <div className="lg:row-span-2">
          {renderFeaturedCard(featured, "h-full")}
        </div>
        {rest.map((blog) => (
          <PostCard
            key={blog._id}
            id={blog._id}
            img={blog.image}
            tag={blog.tag}
            title={blog.title}
            para={truncateDetails(blog.details)}
            date={formatDate(blog.createdAt)}
            time={FIXED_READ_TIME}
          />
        ))}
      </div>
    );
  };

  return (
    <Section>
      <div className="px-6 py-[96px] flex items-center justify-center">
        <div className="container max-w-7xl">
          <div className="w-full flex justify-between items-center mb-16 flex-col sm:flex-row">
            <div className="">
              <span className="inline-block mb-3 px-4 py-1.5 bg-[rgb(13,162,231)]/10 border border-[rgb(13,162,231)]/20 rounded-full font-semibold text-xs tracking-[0.25em] text-[rgb(13,162,231)]">
                OUR BLOG
              </span>
              <h2 className="mt-2 text-left text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-[700] mb-[16px]">
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

          <div>
            {loading ? (
              <div className="w-full flex items-center justify-center py-24 bg-gray-100 rounded-2xl">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-[rgb(13,162,231)] rounded-full animate-spin" />
              </div>
            ) : error ? (
              <div className="w-full flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl">
                <p className="text-gray-500">An error has occurred.</p>
                <button
                  onClick={retry}
                  className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
                >
                  Retry
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="w-full flex items-center justify-center py-24 bg-gray-100 rounded-2xl">
                <p className="text-gray-500">No blogs available currently.</p>
              </div>
            ) : (
              renderGrid()
            )}

            {!error && (
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
                  {total}+ Articles Published
                </p>
                <p className="text-white/70 text-xs relative z-10 mb-4">
                  Tips, guides &amp; inspiration for every kind of traveler.
                </p>
                {/*  */}
                {items.length > 0 && (
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
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Blog;
