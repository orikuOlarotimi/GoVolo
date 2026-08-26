import React from "react";
import { Mail, Phone, MapPin, Clock, ChevronRight, Send, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Section from "../animationComponents/Section";
export default function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-white" />,
      bg: "bg-blue-500",
      title: "Email Us",
      details: "hello@govolo.com",
      subtext: "We reply within 24 hours",
    },
    {
      icon: <Phone className="h-5 w-5 text-white" />,
      bg: "bg-teal-500",
      title: "Call Us",
      details: "+234 810-123-4567",
      subtext: "Mon-Fri, 9am - 6pm WAT",
    },
    {
      icon: <MapPin className="h-5 w-5 text-white" />,
      bg: "bg-purple-500",
      title: "Visit Us",
      details: "123 Travel Street",
      subtext: "Adventure City, AC 10001",
    },
    {
      icon: <Clock className="h-5 w-5 text-white" />,
      bg: "bg-orange-500",
      title: "Working Hours",
      details: "24/7 Support",
      subtext: "Always here for you",
    },
  ];

  return (
    <Section>
      <section className="py-20  bg-slate-50 relative ">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">
                Contact Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              Let&apos;s Plan Your{" "}
              <span className="relative inline-block">
                Next Trip
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-blue-500"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 15 Q 50 0 100 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-slate-500 text-x1">
              Have questions? Our travel experts are ready to craft your perfect
              journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${info.bg} shadow-sm`}>
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-0.5">
                        {info.title}
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        {info.details}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {info.subtext}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              ))}

              {/* Promo Box */}
              <div className="mt-8 bg-linear-to-br from-[#12b4d1] to-[#2b88da] p-8 rounded-3xl text-white shadow-lg">
                <h3 className="text-xl font-bold mb-2">Ready to explore?</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  Our team is ready to build your dream itinerary from scratch.
                </p>
                <button className="flex items-center text-sm font-bold hover:text-white/80 transition-colors">
                  Start Planning <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <Card className="lg:col-span-3 border-slate-100 shadow-xl shadow-blue-900/5 rounded-3xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Send us a message
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Fill in the form and we&apos;ll get back to you within 24
                    hours.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Input
                        placeholder="Your Name"
                        className="bg-slate-50 border-slate-200 h-14 rounded-xl focus-visible:ring-[#20c997]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder="Email Address"
                        className="bg-slate-50 border-slate-200 h-14 rounded-xl focus-visible:ring-[#20c997]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Input
                      placeholder="Subject"
                      className="bg-slate-50 border-slate-200 h-14 rounded-xl focus-visible:ring-[#20c997]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Your Message"
                      className="bg-slate-50 border-slate-200 min-h-40 rounded-xl resize-none focus-visible:ring-[#20c997] p-4"
                    />
                  </div>

                  <Button className="w-full h-14 bg-[#20c997] hover:bg-[#1ba87e] text-white rounded-xl text-base font-bold shadow-lg shadow-teal-500/30 transition-all flex items-center justify-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Message
                  </Button>

                  <p className="text-center text-xs text-slate-400 mt-4">
                    By sending, you agree to our{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Section>
  );
}
