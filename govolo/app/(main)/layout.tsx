import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { BookingNotificationProvider } from "@/context/bookingNotificationContext";

export const metadata: Metadata = {
  title: "GoVolo - Travel Booking Platform",
  description: "Explore the world with ease.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BookingNotificationProvider>
      <div className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </div>
    </BookingNotificationProvider>
  );
}
