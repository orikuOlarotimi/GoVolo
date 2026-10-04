"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Plus, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";
import { useApiFetch } from "../../../utils/useApiFetch";

type MyDestination = {
  _id: string;
  title: string;
  location: string;
  mainImage: string;
  price: number;
};

export default function DestinationsPage() {
  const { user, loading: authLoading } = useAuth();
  const apiFetch = useApiFetch();

  const [destinations, setDestinations] = useState<MyDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadDestinations = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await apiFetch<{
        success: boolean;
        count: number;
        destinations: MyDestination[];
      }>("/api/destinations/mine", {
        method: "GET",
        requiresAuth: true,
        timeoutMs: 12000,
      });

      if (!res.success || !Array.isArray(res.destinations)) {
        throw new Error("Unsuccessful response");
      }

      setDestinations(res.destinations);
      toast.success("Destinations successfully fetched");
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
    loadDestinations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.email]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(15,23,42)]">
            Destinations
          </h1>
          <p className="text-sm text-[rgb(101,117,139)] mt-1">
            Destinations you&apos;ve created.
          </p>
        </div>
        <Link
          href="/admin/destination/new-destination"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[rgb(13,162,231)] text-white font-semibold text-sm hover:bg-[rgb(13,162,231)]/90 transition-all"
        >
          <Plus className="h-4 w-4" /> Add new destination
        </Link>
      </div>

      {loading ? (
        <div className="w-full flex items-center justify-center py-24 bg-gray-100 rounded-2xl">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-[rgb(13,162,231)] rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="w-full flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl text-center px-6">
          <AlertCircle className="h-8 w-8 text-gray-400" />
          <p className="text-gray-500">
            Something went wrong while loading your destinations.
          </p>
          <button
            onClick={loadDestinations}
            className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
          >
            Retry
          </button>
        </div>
      ) : destinations.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl text-center px-6">
          <p className="text-gray-500">
            You haven&apos;t created any destinations yet.
          </p>
          <Link
            href="/admin/destination/new-destination"
            className="px-6 py-2.5 rounded-xl bg-[rgb(13,162,231)] text-white font-semibold hover:bg-[rgb(13,162,231)]/90 transition-all"
          >
            Add new destination
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((d) => (
            <div
              key={d._id}
              className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-[rgb(13,162,231)]/5 hover:border-[rgb(13,162,231)]/30 transition-all duration-300"
            >
              <img
                src={d.mainImage}
                alt={d.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col gap-1.5">
                <h3 className="font-bold text-[rgb(15,23,42)] truncate">
                  {d.title}
                </h3>
                <p className="flex items-center gap-1 text-sm text-[rgb(101,117,139)] truncate">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {d.location}
                </p>
                <p className="text-sm font-bold text-[rgb(13,162,231)] mt-1">
                  ${d.price}
                  <span className="text-xs font-normal text-[rgb(101,117,139)]">
                    {" "}
                    / person
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
