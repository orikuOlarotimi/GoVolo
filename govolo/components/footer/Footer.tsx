"use client";

import Link from "next/link";
// Utility icons from lucide-react
import {
  Plane,
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
  ArrowUp,
} from "lucide-react";
// Brand icons from react-icons (FontAwesome 6)
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-[#0b1325] text-slate-300 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Newsletter Section */}
        <div className="bg-[#121f3d] rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="bg-[#0b1325] p-3 rounded-lg">
              <Mail className="h-6 w-6 text-teal-500" />
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold">Stay Updated</h3>
              <p className="text-slate-400 text-sm mt-1">
                Get exclusive deals & travel inspiration
              </p>
            </div>
          </div>
          <div className="flex w-full md:w-auto max-w-md items-center gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-[#0b1325] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-teal-500 h-12"
            />
            <Button className="bg-[#20c997] hover:bg-[#1ba87e] text-white h-12 px-6">
              Subscribe <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <Plane className="h-6 w-6 text-teal-500" />
              <span className="text-white text-2xl font-bold tracking-tight">
                Travelix
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your trusted travel partner for unforgettable adventures. We craft
              journeys that create lasting memories.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="bg-[#121f3d] p-3 rounded-md hover:bg-teal-500 hover:text-white transition-all flex items-center justify-center"
              >
                <FaFacebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="bg-[#121f3d] p-3 rounded-md hover:bg-teal-500 hover:text-white transition-all flex items-center justify-center"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="bg-[#121f3d] p-3 rounded-md hover:bg-teal-500 hover:text-white transition-all flex items-center justify-center"
              >
                <FaYoutube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Destinations
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-400 transition-colors"
                >
                  Bali
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-400 transition-colors"
                >
                  Paris
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-400 transition-colors"
                >
                  Santorini
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-400 transition-colors"
                >
                  Tokyo
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-400 transition-colors"
                >
                  Maldives
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-400 transition-colors"
                >
                  Swiss Alps
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-400 transition-colors"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-400 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-teal-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Get in Touch
            </h4>
            <ul className="space-y-6 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-teal-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a
                    href="mailto:hello@travelix.com"
                    className="hover:text-teal-400 transition-colors"
                  >
                    hello@travelix.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-teal-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <a
                    href="tel:+15551234567"
                    className="hover:text-teal-400 transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-teal-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white">Office</p>
                  <p>123 Travel Street, Adventure City, AC 10001</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-teal-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white">Working Hours</p>
                  <p>Mon-Fri: 9AM - 6PM EST</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            © 2026 Travelix. Made with <span className="text-red-500">❤</span>{" "}
            for travelers
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              FAQs
            </Link>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute bottom-8 right-6 bg-[#20c997] hover:bg-[#1ba87e] text-white p-3 rounded-full shadow-lg transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </footer>
  );
}
