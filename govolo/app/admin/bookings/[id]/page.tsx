"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Mail, MapPin, Phone, Users } from "lucide-react";
import { toast } from "sonner";
import { useApiFetch } from "@/utils/useApiFetch";
import { money, plural } from "@/lib/bookingHelpers";
import { STATUS_STYLES, formatCreated, formatTripDate } from "@/lib/bookingUi";
import type { BookingDetail } from "@/types/booking";

export default function AdminBookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const apiFetch = useApiFetch();
  const apiFetchRef = useRef(apiFetch);
  apiFetchRef.current = apiFetch;

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [acting, setActing] = useState(false);
  const [confirmingReject, setConfirmingReject] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetchRef.current<{
        success: boolean;
        booking: BookingDetail;
      }>(`/api/booking/admin/${id}`, { method: "GET", requiresAuth: true });
      setBooking(res.booking);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "We couldn't load this booking.",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const respond = async (decision: "accept" | "reject") => {
    if (acting) return;
    setActing(true);
    try {
      const res = await apiFetch<{
        success: boolean;
        message: string;
        booking: { status: BookingDetail["status"] };
      }>(`/api/booking/admin/${id}/respond`, {
        method: "PATCH",
        body: { decision },
        requiresAuth: true,
      });
      toast.success(res.message);
      setConfirmingReject(false);
      setBooking((cur) => (cur ? { ...cur, status: res.booking.status } : cur));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setActing(false);
    }
  };

  const backLink = (
    <Link
      href="/admin/bookings"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(99,111,129)] hover:text-[rgb(14,168,230)]"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to bookings
    </Link>
  );

  if (loading) {
    return (
      <div className="min-w-0 space-y-4">
        {backLink}
        <div className="h-72 animate-pulse rounded-2xl border border-[rgb(225,231,239)] bg-white" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-w-0 space-y-4">
        {backLink}
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-gray-100 px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="break-words text-gray-500">
            {error ?? "Booking not found."}
          </p>
          <button
            onClick={load}
            className="rounded-xl border-2 border-[rgb(13,162,231)] px-6 py-2.5 font-semibold text-[rgb(13,162,231)] transition-all duration-300 hover:bg-[rgb(13,162,231)] hover:text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const b = booking;
  const d = b.destinationSnapshot;

  // Main image first, then the gallery, without duplicates. Falls back to the
  // snapshot image if the destination was deleted after booking.
  const mainImage = b.destination?.mainImage ?? d.image;
  const images = Array.from(
    new Set([mainImage, ...(b.destination?.images ?? [])].filter(Boolean)),
  ) as string[];
  const shownImage = activeImage ?? mainImage;

  // Price breakdown. Add-ons are stored per night. When there is no room
  // type (package bookings), the base line is whatever remains of the
  // server's total, so the lines always add up to it.
  const addOnsTotal = b.addOns.reduce((sum, a) => sum + a.price * b.days, 0);
  const hasRoomPrice = b.roomType?.price !== undefined;
  const baseTotal = hasRoomPrice
    ? (b.roomType!.price as number) * b.days
    : b.totalPrice - addOnsTotal;
  const baseLabel =
    b.roomType?.name ?? (b.bookingType === "package" ? "Package" : "Stay");
  const basePerNight = hasRoomPrice
    ? (b.roomType!.price as number)
    : baseTotal / b.days;

  const card =
    "min-w-0 rounded-2xl border border-[rgb(225,231,239)] bg-white p-4 sm:p-6";

  return (
    <div className="min-w-0 space-y-4 sm:space-y-6">
      {backLink}

      <div className="overflow-hidden rounded-2xl border border-[rgb(225,231,239)] bg-white shadow-sm">
        <img
          src={shownImage}
          alt={d.title}
          className="h-56 w-full object-cover sm:h-80"
        />

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto p-3">
            {images.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(src)}
                aria-label="Show image"
                className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 sm:h-16 sm:w-24 ${
                  src === shownImage
                    ? "border-[rgb(14,168,230)]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="min-w-0 space-y-4 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-[rgb(99,111,129)]">
                {b.bookingType === "package" ? "Package" : "Destination"}
              </p>
              <h1 className="break-words text-xl font-bold text-[rgb(15,23,41)] sm:text-2xl">
                {d.title}
              </h1>
              <p className="flex min-w-0 items-start gap-1 text-sm text-[rgb(99,111,129)]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="min-w-0 break-words">{d.location}</span>
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold capitalize sm:px-3 ${STATUS_STYLES[b.status]}`}
            >
              {b.status}
            </span>
          </div>

          <div className="flex flex-col gap-2 text-sm text-[rgb(99,111,129)] sm:flex-row sm:flex-wrap sm:gap-x-6">
            <span className="flex min-w-0 items-start gap-1.5">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(14,168,230)]" />
              <span className="min-w-0">
                {formatTripDate(b.checkIn)} – {formatTripDate(b.checkOut)} ·{" "}
                {plural(b.days, "night", "nights")}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 shrink-0 text-[rgb(14,168,230)]" />
              {plural(b.guests.adults, "adult", "adults")}
              {b.guests.children > 0 &&
                `, ${plural(b.guests.children, "child", "children")}`}
            </span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className={`${card} space-y-3`}>
        <h2 className="font-semibold text-[rgb(15,23,41)]">Price</h2>

        <div className="flex items-start justify-between gap-4 text-sm">
          <span className="min-w-0 break-words text-[rgb(99,111,129)]">
            {baseLabel} · {money(basePerNight)} ×{" "}
            {plural(b.days, "night", "nights")}
          </span>
          <span className="shrink-0 font-medium">{money(baseTotal)}</span>
        </div>

        {b.addOns.map((a, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-4 text-sm"
          >
            <span className="min-w-0 break-words text-[rgb(99,111,129)]">
              {a.name} · {money(a.price)} × {plural(b.days, "night", "nights")}
            </span>
            <span className="shrink-0 font-medium">
              {money(a.price * b.days)}
            </span>
          </div>
        ))}

        <div className="h-px bg-[rgb(225,231,239)]" />
        <div className="flex items-center justify-between gap-4 font-bold text-[rgb(15,23,41)]">
          <span>Total</span>
          <span className="text-xl text-[rgb(14,168,230)]">
            {money(b.totalPrice)}
          </span>
        </div>
        <p className="text-xs capitalize text-[rgb(99,111,129)]">
          Payment: {b.paymentStatus}
        </p>
      </div>

      {/* Add-ons the guest picked */}
      <div className={`${card} space-y-2 text-sm`}>
        <h2 className="font-semibold text-[rgb(15,23,41)]">Add-ons</h2>
        {b.addOns.length === 0 ? (
          <p className="text-[rgb(99,111,129)]">No add-ons selected.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {b.addOns.map((a, i) => (
              <li
                key={i}
                className="max-w-full break-words rounded-full border border-[rgb(225,231,239)] bg-[rgb(248,250,252)] px-3 py-1 text-[rgb(15,23,41)]"
              >
                {a.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Guest details */}
      <div className={`${card} space-y-2 text-sm`}>
        <h2 className="font-semibold text-[rgb(15,23,41)]">Guest details</h2>
        <p className="break-words text-[rgb(15,23,41)]">
          {b.guestDetails.fullName}
        </p>
        <a
          href={`mailto:${b.guestDetails.email}`}
          className="flex min-w-0 items-start gap-2 text-[rgb(99,111,129)] hover:text-[rgb(14,168,230)]"
        >
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(14,168,230)]" />
          <span className="min-w-0 break-all">{b.guestDetails.email}</span>
        </a>
        <a
          href={`tel:${b.guestDetails.phone}`}
          className="flex min-w-0 items-start gap-2 text-[rgb(99,111,129)] hover:text-[rgb(14,168,230)]"
        >
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(14,168,230)]" />
          <span className="min-w-0 break-all">{b.guestDetails.phone}</span>
        </a>
        {b.guestDetails.specialRequests && (
          <p className="break-words pt-1 text-[rgb(99,111,129)]">
            <span className="font-medium text-[rgb(15,23,41)]">
              Special requests:
            </span>{" "}
            {b.guestDetails.specialRequests}
          </p>
        )}
      </div>

      {/* Decision */}
      <div className={`${card} space-y-3`}>
        <p className="text-xs text-[rgb(99,111,129)]">
          Booked on {formatCreated(b.createdAt)}
        </p>

        {b.status === "pending" ? (
          confirmingReject ? (
            <div className="space-y-3">
              <p className="text-sm text-[rgb(99,111,129)]">
                Reject this booking? This can&apos;t be undone.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmingReject(false)}
                  disabled={acting}
                  className="rounded-xl border border-[rgb(225,231,239)] px-4 py-2.5 text-sm font-semibold hover:bg-[rgb(242,245,247)] disabled:opacity-50"
                >
                  Keep
                </button>
                <button
                  type="button"
                  onClick={() => respond("reject")}
                  disabled={acting}
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {acting ? "Rejecting…" : "Yes, reject"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => respond("accept")}
                disabled={acting}
                className="flex-1 rounded-xl bg-[linear-gradient(135deg,rgb(13,165,231),rgb(33,196,93))] px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {acting ? "Accepting…" : "Accept booking"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmingReject(true)}
                disabled={acting}
                className="flex-1 rounded-xl border border-red-200 px-6 py-3 font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reject booking
              </button>
            </div>
          )
        ) : (
          <p className="text-sm capitalize text-[rgb(99,111,129)]">
            This booking is {b.status}.
          </p>
        )}
      </div>
    </div>
  );
}
