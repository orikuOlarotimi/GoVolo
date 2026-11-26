"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { useApiFetch } from "@/utils/useApiFetch";
import { money, plural } from "@/lib/bookingHelpers";
import { STATUS_STYLES, formatCreated, formatTripDate } from "@/lib/bookingUi";
import type { BookingDetail } from "@/types/booking";

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const apiFetch = useApiFetch();
  const apiFetchRef = useRef(apiFetch);
  apiFetchRef.current = apiFetch;

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetchRef.current<{
        success: boolean;
        booking: BookingDetail;
      }>(`/api/booking/${id}`, { method: "GET", requiresAuth: true });
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

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiFetch<{ success: boolean }>(`/api/booking/${id}`, {
        method: "DELETE",
        requiresAuth: true,
      });
      toast.success("Booking deleted.");
      router.replace("/bookings");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
      setDeleting(false);
      setConfirmingDelete(false);
    }
  };

  const backLink = (
    <Link
      href="/bookings"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(99,111,129)] hover:text-[rgb(14,168,230)]"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to bookings
    </Link>
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {backLink}
        <div className="h-80 animate-pulse rounded-2xl bg-white border border-[rgb(225,231,239)]" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="space-y-4">
        {backLink}
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-gray-100 px-6 py-16 text-center">
          <p className="text-gray-500">{error ?? "Booking not found."}</p>
          <button
            onClick={load}
            className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const b = booking;
  const d = b.destinationSnapshot;

  // Main image first, then the destination's gallery, without duplicates.
  // Falls back to the snapshot image if the destination was deleted.
  const mainImage = b.destination?.mainImage ?? d.image;
  const images = Array.from(
    new Set([mainImage, ...(b.destination?.images ?? [])].filter(Boolean)),
  ) as string[];
  const shownImage = activeImage ?? mainImage;

  const canDelete = b.status !== "confirmed" && b.paymentStatus !== "paid";

  return (
    <div className="space-y-6 py-6 ">
      {backLink}

      <div className="overflow-hidden rounded-2xl border border-[rgb(225,231,239)] bg-white shadow-sm">
        <img
          src={shownImage}
          alt={d.title}
          className="h-64 w-full object-cover sm:h-80"
        />

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto p-3">
            {images.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(src)}
                aria-label="Show image"
                className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
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

        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-[rgb(99,111,129)]">
                {b.bookingType === "package" ? "Package" : "Destination"}
              </p>
              <h1 className="text-2xl font-bold text-[rgb(15,23,41)]">
                {d.title}
              </h1>
              <p className="flex items-center gap-1 text-sm text-[rgb(99,111,129)]">
                <MapPin className="h-4 w-4 shrink-0" />
                {d.location}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[b.status]}`}
            >
              {b.status}
            </span>
          </div>

          {b.status === "pending" && (
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              This booking is pending and unpaid.
            </p>
          )}

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[rgb(99,111,129)]">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[rgb(14,168,230)]" />
              {formatTripDate(b.checkIn)} – {formatTripDate(b.checkOut)} ·{" "}
              {plural(b.days, "night", "nights")}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-[rgb(14,168,230)]" />
              {plural(b.guests.adults, "adult", "adults")}
              {b.guests.children > 0 &&
                `, ${plural(b.guests.children, "child", "children")}`}
            </span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="rounded-2xl border border-[rgb(225,231,239)] bg-white p-6 space-y-3">
        <h2 className="font-semibold text-[rgb(15,23,41)]">Price</h2>

        {b.roomType?.name && b.roomType.price !== undefined && (
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-[rgb(99,111,129)]">
              {b.roomType.name} · {money(b.roomType.price)} ×{" "}
              {plural(b.days, "night", "nights")}
            </span>
            <span className="font-medium">
              {money(b.roomType.price * b.days)}
            </span>
          </div>
        )}

        {b.addOns.map((a, i) => (
          <div key={i} className="flex justify-between gap-4 text-sm">
            <span className="text-[rgb(99,111,129)]">
              {a.name} · {money(a.price)} × {plural(b.days, "night", "nights")}
            </span>
            <span className="font-medium">{money(a.price * b.days)}</span>
          </div>
        ))}

        <div className="h-px bg-[rgb(225,231,239)]" />
        <div className="flex justify-between font-bold text-[rgb(15,23,41)]">
          <span>Total</span>
          <span className="text-xl text-[rgb(14,168,230)]">
            {money(b.totalPrice)}
          </span>
        </div>
        <p className="text-xs text-[rgb(99,111,129)] capitalize">
          Payment: {b.paymentStatus}
        </p>
      </div>

      {/* Guest details */}
      <div className="rounded-2xl border border-[rgb(225,231,239)] bg-white p-3 md:p-6  space-y-2 text-sm ">
        <h2 className="font-semibold text-[rgb(15,23,41)]">Guest details</h2>
        <p className="text-[rgb(15,23,41)]">{b.guestDetails.fullName}</p>
        <p className="flex items-center gap-2 text-[rgb(99,111,129)] text-[11px] md:text-sm">
          <Mail className="h-4 w-4 text-[rgb(14,168,230)]" />
          {b.guestDetails.email}
        </p>
        <p className="flex items-center gap-2 text-[rgb(99,111,129)]">
          <Phone className="h-4 w-4 text-[rgb(14,168,230)]" />
          {b.guestDetails.phone}
        </p>
        {b.guestDetails.specialRequests && (
          <p className="pt-1 text-[rgb(99,111,129)]">
            <span className="font-medium text-[rgb(15,23,41)]">
              Special requests:
            </span>{" "}
            {b.guestDetails.specialRequests}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[rgb(99,111,129)]">
          Booked on {formatCreated(b.createdAt)}
        </p>

        {canDelete &&
          (confirmingDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[rgb(99,111,129)]">
                Delete this booking?
              </span>
              <button
                onClick={() => setConfirmingDelete(false)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl border border-[rgb(225,231,239)] text-sm font-semibold hover:bg-[rgb(242,245,247)] disabled:opacity-50"
              >
                Keep
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Yes, delete"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmingDelete(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete booking
            </button>
          ))}
      </div>
    </div>
  );
}
