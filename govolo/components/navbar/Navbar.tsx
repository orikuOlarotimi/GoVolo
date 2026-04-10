"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plane, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Centralized navigation links for easy maintenance
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Packages", path: "/packages" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle background transparency
      if (currentScrollY < 50) {
        setIsScrolled(false);
        setIsVisible(true);
      } else {
        setIsScrolled(true);
        // Handle hide/show on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
          setIsMobileMenuOpen(false); // Close mobile menu if scrolling down
        } else {
          setIsVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out px-4 md:px-12 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-white text-slate-900 shadow-md py-4"
          : "bg-transparent text-white py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50">
          <Plane
            className={`h-6 w-6 ${isScrolled ? "text-teal-500" : "text-white"}`}
          />
          <span className="text-2xl font-bold tracking-tight">Travelix</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="hover:text-[#20c997] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Button (Desktop) */}
        <div className="hidden md:block">
          <Button className="bg-[#20c997] hover:bg-[#1ba87e] text-white border-none px-6 py-5 rounded-md font-semibold transition-colors">
            Book Now
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden p-2 z-50 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X
              className={`h-7 w-7 ${isScrolled ? "text-slate-900" : "text-white"}`}
            />
          ) : (
            <Menu
              className={`h-7 w-7 ${isScrolled ? "text-slate-900" : "text-white"}`}
            />
          )}
        </button>

        {/* Mobile Dropdown Menu Card */}
        {isMobileMenuOpen && (
          <div className="absolute top-[120%] left-0 right-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 flex flex-col p-6 gap-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-4 text-slate-800 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#20c997] transition-colors pb-3 border-b border-slate-100 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Button className="w-full h-12 bg-[#20c997] hover:bg-[#1ba87e] text-white rounded-xl font-semibold shadow-md transition-colors text-base">
              Book Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
