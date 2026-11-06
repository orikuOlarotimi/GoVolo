"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Calendar, Mail, MapPin, Phone, Ticket, Users } from "lucide-react";
import { useApiFetch } from "@/utils/useApiFetch";
import { money, plural } from "@/lib/bookingHelpers";
import { STATUS_STYLES, formatCreated, formatTripDate } from "@/lib/bookingUi";
import type { AdminBookingsResponse, BookingStatus } from "@/types/booking";
import type { AdminBooking } from "@/types/booking";

const LIMIT = 10;

type Filter = "all" | BookingStatus;
const FILTERS: Filter[] = [
  "all",
  "pending",
  "confirmed",
  "cancelled",
  "expired",
];

export default function AdminBookingsPage() {
  const apiFetch = useApiFetch();
  const apiFetchRef = useRef(apiFetch);
  apiFetchRef.current = apiFetch;

  // Bumped on every filter change so a slow, outdated response is ignored
  const requestRef = useRef(0);

  const [filter, setFilter] = useState<Filter>("all");
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [moreError, setMoreError] = useState<string | null>(null);

  const fetchPage = (p: number, f: Filter) =>
    apiFetchRef.current<AdminBookingsResponse>(
      `/api/booking/admin?page=${p}&limit=${LIMIT}${
        f === "all" ? "" : `&status=${f}`
      }`,
      { method: "GET", requiresAuth: true },
    );

  const loadFirstPage = useCallback(async () => {
    const requestId = ++requestRef.current;
    setLoading(true);
    setError(null);
    setMoreError(null);
    try {
      const res = await fetchPage(1, filter);
      if (requestId !== requestRef.current) return;
      setBookings(res.bookings);
      setPage(res.page);
      setTotalPages(res.totalPages);
      setTotal(res.total);
    } catch (e) {
      if (requestId !== requestRef.current) return;
      setError(
        e instanceof Error ? e.message : "We couldn't load the bookings.",
      );
    } finally {
      if (requestId === requestRef.current) setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  const loadMore = async () => {
    if (loadingMore) return;
    const requestId = requestRef.current;
    setLoadingMore(true);
    setMoreError(null);
    try {
      const res = await fetchPage(page + 1, filter);
      if (requestId !== requestRef.current) return;
      setBookings((cur) => {
        const seen = new Set(cur.map((b) => b._id));
        return [...cur, ...res.bookings.filter((b) => !seen.has(b._id))];
      });
      setPage(res.page);
      setTotalPages(res.totalPages);
      setTotal(res.total);
    } catch (e) {
      if (requestId !== requestRef.current) return;
      setMoreError(
        e instanceof Error ? e.message : "Couldn't load more bookings.",
      );
    } finally {
      setLoadingMore(false);
    }
  };

  const hasMore = page < totalPages;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-[rgb(15,23,41)]">Bookings</h1>
        <p className="text-sm text-[rgb(99,111,129)] mt-1">
          People who have booked your destinations and packages.
          {!loading && !error && total > 0 && (
            <>
              {" "}
              Showing {bookings.length} of{" "}
              {plural(total, "booking", "bookings")}.
            </>
          )}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === f
                ? "border-[rgb(14,168,230)] bg-[rgb(14,168,230)] text-white"
                : "border-[rgb(225,231,239)] bg-white text-[rgb(99,111,129)] hover:bg-[rgb(242,245,247)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <ul className="space-y-4">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className="h-44 animate-pulse rounded-2xl border border-[rgb(225,231,239)] bg-white"
            />
          ))}
        </ul>
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
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-[rgb(225,231,239)] bg-white px-6 py-16 text-center">
          <Ticket className="h-10 w-10 text-[rgb(99,111,129)]" />
          <p className="text-[rgb(99,111,129)]">
            {filter === "all"
              ? "No one has booked your destinations yet."
              : `No ${filter} bookings.`}
          </p>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {bookings.map((b) => {
              const d = b.destinationSnapshot;
              return (
                <li
                  key={b._id}
                  className="flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-[rgb(225,231,239)] bg-white shadow-sm"
                >
                  <img
                    src={d.image}
                    alt={d.title}
                    className="h-40 w-full sm:h-auto sm:w-44 shrink-0 object-cover"
                  />

                  <div className="flex-1 min-w-0 p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wide text-[rgb(99,111,129)]">
                          {b.bookingType === "package"
                            ? "Package"
                            : "Destination"}
                        </p>
                        <h2 className="font-semibold text-[rgb(15,23,41)] truncate">
                          {d.title}
                        </h2>
                        <p className="flex items-center gap-1 text-sm text-[rgb(99,111,129)]">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{d.location}</span>
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[b.status]}`}
                        >
                          {b.status}
                        </span>
                        <span className="text-xs capitalize text-[rgb(99,111,129)]">
                          {b.paymentStatus}
                        </span>
                      </div>
                    </div>

                    {/* Who booked */}
                    <div className="rounded-xl bg-[rgb(248,250,252)] p-3 text-sm space-y-1">
                      <p className="font-medium text-[rgb(15,23,41)]">
                        {b.guestDetails.fullName}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[rgb(99,111,129)]">
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-[rgb(14,168,230)]" />
                          {b.guestDetails.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-[rgb(14,168,230)]" />
                          {b.guestDetails.phone}
                        </span>
                      </div>
                      {b.guestDetails.specialRequests && (
                        <p className="text-[rgb(99,111,129)]">
                          <span className="font-medium text-[rgb(15,23,41)]">
                            Requests:
                          </span>{" "}
                          {b.guestDetails.specialRequests}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-[rgb(99,111,129)]">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-[rgb(14,168,230)]" />
                        {formatTripDate(b.checkIn)} –{" "}
                        {formatTripDate(b.checkOut)} ·{" "}
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
            })}
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
