import Features from "@/components/homepages/Features";
import MainHero from "@/components/homepages/MainHero";
import Testimonials from "@/components/homepages/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHero />
      <Features />
      <Testimonials />
    </div>
  );
}
