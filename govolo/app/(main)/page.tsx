import MainHero from "@/components/homepages/MainHero";
import Destinations from "@/components/homepages/Destinations";
import AdventureCard from "@/components/homepages/AdventureCard";
import Features from "@/components/homepages/Features";
import Testimonials from "@/components/homepages/Testimonials";
import Blog from "@/components/homepages/Blog";
import CTA from "@/components/homepages/CTA";
import Contact from "@/components/homepages/Contact";
import Newsletter from "@/components/homepages/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHero />
      <Destinations />
      <AdventureCard />
      <Features />
      <Testimonials />
      <Blog />
      <CTA />
      <Contact />
      <Newsletter />
    </div>
  );
}
