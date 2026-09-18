import MainHero from "@/components/homepages/MainHero";
import Destinations from "@/components/homepages/Destinations";
import AdventureCard from "@/components/homepages/AdventureCard";
import Features from "@/components/homepages/Features";
import Testimonials from "@/components/homepages/Testimonials";
import Blog from "@/components/homepages/Blog";
import CTA from "@/components/homepages/CTA";
import Contact from "@/components/homepages/Contact";
import Newsletter from "@/components/homepages/Newsletter";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function safeJson<T = any>(
  result: PromiseSettledResult<Response>,
  fallback: T,
): Promise<T> {
  if (result.status !== "fulfilled") return fallback;

  const res = result.value;
  if (!res.ok) return fallback;

  try {
    return await res.json();
  } catch {
    return fallback;
  }
}

export default async function Home() {
  const results = await Promise.allSettled([
    fetch(`${API_URL}/api/destinations/top-destinations`, {
      cache: "no-store",
    }),
    fetch(`${API_URL}/api/booking?limit=3`, {
      cache: "no-store",
    }),
    fetch(`${API_URL}/api/testimonial?limit=4`, {
      cache: "no-store",
    }),
    fetch(`${API_URL}/api/blogs?limit=3`, {
      cache: "no-store",
    }),
  ]);

  const destinations = await safeJson(results[0], {
    success: false,
    destinations: [],
  });
  const bookings = await safeJson(results[1], { success: false, bookings: [] });
  const testimonials = await safeJson(results[2], {
    success: false,
    testimonials: [],
  });
  const blogs = await safeJson(results[3], { success: false, blogs: [] });

  return (
    <div className="flex flex-col min-h-screen">
      <MainHero />
      <Destinations data={destinations} />
      <AdventureCard data={bookings} />
      <Features />
      <Testimonials data={testimonials} />
      <Blog data={blogs} />
      <CTA />
      <Contact />
      <Newsletter />
    </div>
  );
}

// fix the destiunations as there are issues
// fix the layout of the blogs  as there are issues and then fix the label of the destinations as its not present in the backend 
