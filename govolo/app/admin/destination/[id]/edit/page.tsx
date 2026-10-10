"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";
import { useApiFetch } from "@/utils/useApiFetch";
import DestinationForm, {
  destinationToFormData,
  type DestinationFormData,
} from "../../../../../components/admin/destinations/newAdminDestination";
import type { Destination } from "@/types/destination";

export default function EditDestinationPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const apiFetch = useApiFetch();

  const [initialValues, setInitialValues] =
    useState<DestinationFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchedFor = useRef<string | null>(null);

  const loadDestination = async () => {
    setLoading(true);
    try {
      const res = await apiFetch<{
        success: boolean;
        message?: string;
        destination?: Destination;
      }>(`/api/destinations/mine/${id}`, {
        method: "GET",
        requiresAuth: true,
      });

      if (!res.success || !res.destination) {
        toast.error(res.message || "Destination could not be loaded");
        return;
      }

      setInitialValues(destinationToFormData(res.destination));
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading this destination",
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

  if (!initialValues) {
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
    <DestinationForm
      key={id}
      mode="edit"
      destinationId={id}
      initialValues={initialValues}
    />
  );
}
