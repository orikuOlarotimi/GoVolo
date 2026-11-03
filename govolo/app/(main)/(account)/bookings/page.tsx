"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Ticket, Users } from "lucide-react";
import { useApiFetch } from "@/utils/useApiFetch";
import { useBookingNotification } from "@/context/bookingNotificationContext";
import { money, plural } from "@/lib/bookingHelpers";
import type { Booking, BookingsResponse, BookingStatus } from "@/types/booking";

const LIMIT = 10;

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  expired: "bg-slate-100 text-slate-600 border-slate-200",
};

// Dates are stored as UTC midnight, so format them in UTC to avoid a
// one-day shift in timezones behind UTC.
const formatTripDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const formatCreated = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function BookingsPage() {
  const apiFetch = useApiFetch();
  const { clearNewBooking } = useBookingNotification();

  // Keep the latest apiFetch in a ref so the loaders don't depend on its identity
  const apiFetchRef = useRef(apiFetch);
  apiFetchRef.current = apiFetch;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [moreError, setMoreError] = useState<string | null>(null);

  // Opening this page counts as "seen"
  useEffect(() => {
    clearNewBooking();
  }, [clearNewBooking]);

  const fetchPage = (p: number) =>
    apiFetchRef.current<BookingsResponse>(
      `/api/booking/mine?page=${p}&limit=${LIMIT}`,
      { method: "GET", requiresAuth: true },
    );

  const loadFirstPage = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPage(1);
      setBookings(res.bookings);
      setPage(res.page);
      setTotalPages(res.totalPages);
      setTotal(res.total);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "We couldn't load your bookings.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  const loadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    setMoreError(null);
    try {
      const res = await fetchPage(page + 1);
      // Skip anything already shown (a new booking shifts the pages)
      setBookings((cur) => {
        const seen = new Set(cur.map((b) => b._id));
        return [...cur, ...res.bookings.filter((b) => !seen.has(b._id))];
      });
      setPage(res.page);
      setTotalPages(res.totalPages);
      setTotal(res.total);
    } catch (e) {
      setMoreError(
        e instanceof Error ? e.message : "Couldn't load more bookings.",
      );
    } finally {
      setLoadingMore(false);
    }
  };

  const hasMore = page < totalPages;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[rgb(15,23,41)]">My Bookings</h1>
        {!loading && !error && total > 0 && (
          <p className="text-sm text-[rgb(99,111,129)] mt-1">
            Showing {bookings.length} of {plural(total, "booking", "bookings")}
          </p>
        )}
      </div>

      {loading ? (
        <BookingsSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-gray-100 px-6 py-16 text-center">
          <p className="text-gray-500">{error}</p>
          <button
            onClick={loadFirstPage}
            className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
          >
            Retry
          </button>
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-[rgb(225,231,239)] bg-white px-6 py-16 text-center">
          <Ticket className="h-10 w-10 text-[rgb(99,111,129)]" />
          <p className="text-[rgb(99,111,129)]">
            You haven&apos;t made any bookings yet.
          </p>
          <Link
            href="/destinations"
            className="px-6 py-2.5 rounded-xl bg-[linear-gradient(135deg,rgb(13,165,231),rgb(33,196,93))] text-white font-semibold"
          >
            Explore destinations
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {bookings.map((b) => (
              <BookingCard key={b._id} booking={b} />
            ))}
          </ul>

          {hasMore && (
            <div className="flex flex-col items-center gap-2 pt-2">
              {moreError && <p className="text-sm text-red-500">{moreError}</p>}
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-8 py-2.5 rounded-xl border border-[rgb(225,231,239)] bg-white font-semibold text-[rgb(15,23,41)] hover:bg-[rgb(242,245,247)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore
                  ? "Loading…"
                  : moreError
                    ? "Try again"
                    : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function BookingCard({ booking: b }: { booking: Booking }) {
  const { destinationSnapshot: d } = b;

  return (
    <li className="flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-[rgb(225,231,239)] bg-white shadow-sm">
      <img
        src={d.image}
        alt={d.title}
        className="h-44 w-full sm:h-auto sm:w-48 shrink-0 object-cover"
      />

      <div className="flex-1 min-w-0 p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-[rgb(99,111,129)]">
              {b.bookingType === "package" ? "Package" : "Destination"}
            </p>
            <h2 className="font-semibold text-[rgb(15,23,41)] truncate">
              {d.title}
            </h2>
            <p className="flex items-center gap-1 text-sm text-[rgb(99,111,129)]">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{d.location}</span>
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[b.status]}`}
          >
            {b.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[rgb(99,111,129)]">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-[rgb(14,168,230)]" />
            {formatTripDate(b.checkIn)} – {formatTripDate(b.checkOut)} ·{" "}
            {plural(b.days, "night", "nights")}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-[rgb(14,168,230)]" />
            {plural(b.guests.total, "guest", "guests")}
          </span>
        </div>

        <div className="flex items-end justify-between border-t border-[rgb(225,231,239)] pt-3">
          <p className="text-xs text-[rgb(99,111,129)]">
            Booked on {formatCreated(b.createdAt)}
          </p>
          <p className="text-lg font-bold text-[rgb(14,168,230)]">
            {money(b.totalPrice)}
          </p>
        </div>
      </div>
    </li>
  );
}

function BookingsSkeleton() {
  return (
    <ul className="space-y-4">
      {[0, 1, 2].map((i) => (
        <li
          key={i}
          className="h-44 animate-pulse rounded-2xl border border-[rgb(225,231,239)] bg-white"
        />
      ))}
    </ul>
  );
}
