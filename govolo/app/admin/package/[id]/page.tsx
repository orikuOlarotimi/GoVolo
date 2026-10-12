"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Clock,
  MapPin,
  Pencil,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";
import { useApiFetch } from "@/utils/useApiFetch";
import type { Package } from "@/types/package";

export default function AdminPackageDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const apiFetch = useApiFetch();

  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fetchedFor = useRef<string | null>(null);

  const loadPackage = async () => {
    setLoading(true);
    try {
      const res = await apiFetch<{
        success: boolean;
        message?: string;
        package?: Package;
      }>(`/api/packages/mine/${id}`, {
        method: "GET",
        requiresAuth: true,
      });

      if (!res.success || !res.package) {
        toast.error(res.message || "Package could not be loaded");
        return;
      }

      setPkg(res.package);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading this package",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const key = `${user.email}:${id}`;
    if (fetchedFor.current === key) return;
    fetchedFor.current = key;

    loadPackage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.email, id]);

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/packages/mine/${id}`, {
        method: "DELETE",
        requiresAuth: true,
      });
      toast.success("Package deleted");
      router.push("/admin/package");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not delete this package",
      );
      setDeleting(false);
      setConfirmingDelete(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-24 bg-gray-100 rounded-2xl">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[rgb(13,162,231)] rounded-full animate-spin" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl text-center px-6">
        <AlertCircle className="h-8 w-8 text-gray-400" />
        <p className="text-gray-500">We couldn&apos;t load this package.</p>
        <div className="flex items-center gap-3">
          <button
            onClick={loadPackage}
            className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
          >
            Retry
          </button>
          <Link
            href="/admin/package"
            className="px-6 py-2.5 rounded-xl border border-border text-[rgb(15,23,42)] font-semibold hover:bg-white transition-all"
          >
            Back to packages
          </Link>
        </div>
      </div>
    );
  }

  const destination = pkg.destination;
  const { min, max } = pkg.groupSize;
  const groupLabel = min === max ? `${min} people` : `${min} – ${max} people`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/package"
          className="flex items-center gap-1.5 text-sm font-medium text-[rgb(101,117,139)] hover:text-[rgb(15,23,42)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to packages
        </Link>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
              pkg.isPublished ? "bg-emerald-500" : "bg-amber-500"
            }`}
          >
            {pkg.isPublished ? "Published" : "Draft"}
          </span>
          <Link
            href={`/admin/package/${pkg._id}/edit`}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[rgb(13,162,231)] text-white font-semibold text-sm hover:bg-[rgb(13,162,231)]/90 transition-all"
          >
            <Pencil className="h-4 w-4" /> Edit
          </Link>
          <button
            onClick={() => setConfirmingDelete(true)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 transition-all"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>

      {/* Destination header */}
      <div className="relative h-64 rounded-3xl overflow-hidden bg-gray-200">
        {destination?.mainImage && (
          <img
            src={destination.mainImage}
            alt={destination.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-3xl font-bold truncate">
            {destination?.title ?? "Destination unavailable"}
          </h1>
          {destination && (
            <p className="flex items-center gap-1.5 text-sm text-white/80 mt-1">
              <MapPin className="h-4 w-4" />
              {destination.location}
            </p>
          )}
        </div>
      </div>

      {/* Key facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-border rounded-2xl p-4 text-center">
          <p className="text-xs text-[rgb(101,117,139)] mb-1">Price</p>
          <p className="text-lg font-bold text-[rgb(13,162,231)]">
            ${pkg.price}
            <span className="text-xs font-normal text-[rgb(101,117,139)]">
              {" "}
              / person
            </span>
          </p>
        </div>
        <div className="border border-border rounded-2xl p-4 text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-[rgb(101,117,139)] mb-1">
            <Clock className="h-3.5 w-3.5" /> Duration
          </p>
          <p className="text-lg font-bold text-[rgb(15,23,42)]">
            {pkg.duration}
          </p>
        </div>
        <div className="border border-border rounded-2xl p-4 text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-[rgb(101,117,139)] mb-1">
            <Users className="h-3.5 w-3.5" /> Group size
          </p>
          <p className="text-lg font-bold text-[rgb(15,23,42)]">{groupLabel}</p>
        </div>
        <div className="border border-border rounded-2xl p-4 text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-[rgb(101,117,139)] mb-1">
            <Star className="h-3.5 w-3.5" /> Rating
          </p>
          <p className="text-lg font-bold text-[rgb(15,23,42)]">
            {(destination?.rating?.average ?? 0).toFixed(1)}
            <span className="text-xs font-normal text-[rgb(101,117,139)]">
              {" "}
              ({destination?.rating?.count ?? 0})
            </span>
          </p>
        </div>
      </div>

      {/* Included */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-[rgb(15,23,42)]">
          What&apos;s included
        </h2>
        {pkg.included.length === 0 ? (
          <p className="text-sm text-[rgb(101,117,139)]">
            No inclusions listed for this package.
          </p>
        ) : (
          <ul className="space-y-2">
            {pkg.included.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-[rgb(15,23,42)]"
              >
                <span className="w-6 h-6 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add-ons */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-[rgb(15,23,42)]">Add-ons</h2>
        {pkg.addOns.length === 0 ? (
          <p className="text-sm text-[rgb(101,117,139)]">
            No add-ons for this package.
          </p>
        ) : (
          <div className="border border-border rounded-2xl divide-y divide-border">
            {pkg.addOns.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-3"
              >
                <span className="text-[rgb(15,23,42)]">{a.name}</span>
                <span className="font-semibold text-[rgb(15,23,42)]">
                  ${a.price}
                  <span className="text-xs font-normal text-[rgb(101,117,139)]">
                    {" "}
                    {a.unit ?? "/night"}
                  </span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* About the destination */}
      {destination?.description && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-[rgb(15,23,42)]">
            About the destination
          </h2>
          <p className="text-[rgb(101,117,139)] leading-relaxed whitespace-pre-line">
            {destination.description}
          </p>
        </div>
      )}

      {/* Delete confirmation */}
      {confirmingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 space-y-4">
            <h2 className="text-lg font-bold text-[rgb(15,23,42)]">
              Delete this package?
            </h2>
            <p className="text-sm text-[rgb(101,117,139)]">
              This permanently removes the package. It can&apos;t be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmingDelete(false)}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl border border-border text-[rgb(15,23,42)] font-semibold text-sm hover:bg-[rgb(248,250,252)] disabled:opacity-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 disabled:opacity-50 transition-all"
              >
                {deleting ? "Deleting..." : "Delete package"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
