import type { BookingStatus } from "@/types/booking";

export const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  expired: "bg-slate-100 text-slate-600 border-slate-200",
};

// Stored as UTC midnight, so format in UTC to avoid a one-day shift
export const formatTripDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export const formatCreated = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
