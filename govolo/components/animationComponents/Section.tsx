"use client";

import { useEffect, useId, useRef, useState } from "react";

const Section = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const id = useId();

  const storageKey = `section-animated-${id}`;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    // Check whether this page load is a browser refresh
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;

    if (navigation?.type === "reload") {
      sessionStorage.removeItem(storageKey);
    }

    // If animation has already played, show immediately
    if (sessionStorage.getItem(storageKey) === "true") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          // Remember that this section has animated
          sessionStorage.setItem(storageKey, "true");

          observer.unobserve(element);
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [storageKey]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-in-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

export default Section;
