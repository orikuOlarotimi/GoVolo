import MainHero from "@/components/homepages/MainHero";
import Destinations from "@/components/homepages/Destinations";
import AdventureCard from "@/components/homepages/AdventureCard";
import Features from "@/components/homepages/Features";
import Testimonials from "@/components/homepages/Testimonials";
import Blog from "@/components/homepages/Blog";
import CTA from "@/components/homepages/CTA";
import Contact from "@/components/homepages/Contact";
import Newsletter from "@/components/homepages/Newsletter";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function safeJson(res: PromiseSettledResult<Response>) {
  if (res.status === "fulfilled" && res.value.ok) {
    return await res.value.json();
  }
  return [];
}



export default async function Home() {
  
  const [destinationsRes, bookingsRes, testimonialsRes, blogsRes] =
    await Promise.allSettled([
      fetch(`${API_URL}/api/destinations/top-destinations`, {
        next: { revalidate: 60 },
      }),
      fetch(`${API_URL}/api/booking?limit=3`, {
        next: { revalidate: 60 },
      }),
      fetch(`${API_URL}/api/testimonial?limit=4`, {
        next: { revalidate: 60 },
      }),
      fetch(`${API_URL}/api/blogs?limit=3`, {
        next: { revalidate: 60 },
      }),
    ]);

  const [destinations, bookings, testimonials, blogs] = await Promise.all([
    safeJson(destinationsRes),
    safeJson(bookingsRes),
    safeJson(testimonialsRes),
    safeJson(blogsRes),
  ]);



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
