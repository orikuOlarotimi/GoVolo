"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Pencil } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useApiFetch } from "../../../../utils/useApiFetch";
import DestinationDetails from "@/components/ui/destinationDetails";
import type { Destination } from "@/types/destination";

export default function AdminDestinationPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const apiFetch = useApiFetch();

  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadDestination = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await apiFetch<{
        success: boolean;
        destination?: Destination;
      }>(`/api/destinations/mine/${id}`, {
        method: "GET",
        requiresAuth: true,
        timeoutMs: 12000,
      });

      if (!res.success || !res.destination) {
        throw new Error("Unsuccessful response");
      }

      setDestination(res.destination);
    } catch {
      setError(true);
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
    loadDestination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.email, id]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-24 bg-gray-100 rounded-2xl">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[rgb(13,162,231)] rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl text-center px-6">
        <AlertCircle className="h-8 w-8 text-gray-400" />
        <p className="text-gray-500">We couldn&apos;t load this destination.</p>
        <button
          onClick={loadDestination}
          className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[rgb(101,117,139)]">
          Preview of what travellers see
        </p>
        <Link
          href={`/admin/destination/${id}/edit`}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[rgb(13,162,231)] text-white font-semibold text-sm hover:bg-[rgb(13,162,231)]/90 transition-all"
        >
          <Pencil className="h-4 w-4" /> Edit destination
        </Link>
      </div>

      <DestinationDetails
        id={id}
        initialData={{ success: true, destination }}
        isPreview
      />
    </div>
  );
}
