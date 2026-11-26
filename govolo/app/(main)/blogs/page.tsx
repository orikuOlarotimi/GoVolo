import Link from "next/link";
import { ArrowLeft, BookOpen, PenLine } from "lucide-react";

const page = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 bg-gradient-to-br from-[rgb(5,15,25)] via-[rgb(8,30,45)] to-[rgb(10,65,90)]">
      <style>{`
        @keyframes blog-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes blog-ring {
          0% { transform: scale(0.6); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes blog-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes blog-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .blog-float { animation: blog-float 4s ease-in-out infinite; }
        .blog-ring { animation: blog-ring 3s ease-out infinite; }
        .blog-dot { animation: blog-dot 1.4s ease-in-out infinite; }
        .blog-fade-up { animation: blog-fade-up 0.8s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .blog-float, .blog-ring, .blog-dot, .blog-fade-up { animation: none; }
        }
      `}</style>

      {/* soft background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[rgb(14,168,230)]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[rgb(33,196,93)]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        {/* animated icon */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-10">
          <span className="blog-ring absolute inset-0 rounded-full border border-[rgb(14,168,230)]/50" />
          <span
            className="blog-ring absolute inset-0 rounded-full border border-[rgb(14,168,230)]/50"
            style={{ animationDelay: "1s" }}
          />
          <span
            className="blog-ring absolute inset-0 rounded-full border border-[rgb(14,168,230)]/50"
            style={{ animationDelay: "2s" }}
          />
          <div className="blog-float relative w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
            <BookOpen className="h-11 w-11 text-white" />
            <PenLine className="absolute -bottom-2 -right-2 h-8 w-8 p-1.5 rounded-full bg-[rgb(14,168,230)] text-white shadow-lg" />
          </div>
        </div>

        <span
          className="blog-fade-up inline-block mb-4 px-4 py-1.5 bg-[rgb(14,168,230)]/10 border border-[rgb(14,168,230)]/30 rounded-full font-semibold text-xs tracking-[0.25em] text-[rgb(14,168,230)]"
          style={{ animationDelay: "0.1s" }}
        >
          OUR BLOG
        </span>

        <h1
          className="blog-fade-up text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-[linear-gradient(135deg,rgb(13,165,231),rgb(33,196,93))]"
          style={{ animationDelay: "0.25s" }}
        >
          Coming Soon!!
        </h1>

        <p
          className="blog-fade-up text-white/70 text-base md:text-lg mb-8"
          style={{ animationDelay: "0.4s" }}
        >
          We&apos;re busy writing travel stories, tips and guides for you. Check
          back shortly.
        </p>

        {/* bouncing dots */}
        <div className="flex items-center gap-2 mb-10" aria-hidden="true">
          {[0, 0.2, 0.4].map((delay) => (
            <span
              key={delay}
              className="blog-dot w-2.5 h-2.5 rounded-full bg-[rgb(14,168,230)]"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>

        <Link
          href="/"
          className="blog-fade-up inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-colors"
          style={{ animationDelay: "0.55s" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default page;
