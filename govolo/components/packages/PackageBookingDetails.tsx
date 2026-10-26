"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import LoadingBar from "@/components/ui/loadingBar";
import PackageBookingFlow from "./PackageBookingFlow";
import type { PackageData } from "./PackageBookingFlow";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CONTAINER = "container mx-auto px-4 py-16 max-w-6xl relative z-10";

export type PackageApiResponse = {
  success: boolean;
  package?: PackageData;
};

export default function PackageBookingDetails({
  initialData,
}: {
  initialData: PackageApiResponse;
}) {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PackageApiResponse>(initialData);
  const [loading, setLoading] = useState(false);

  const retry = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/packages/${encodeURIComponent(id)}`,
        { cache: "no-store" },
      );
      const json: PackageApiResponse = await res.json();

      if (!res.ok || !json.success || !json.package) {
        throw new Error("Unsuccessful response");
      }
      setData(json);
    } catch {
      setData({ success: false });
      toast.error("We couldn't load this package.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={CONTAINER}>
        <LoadingBar />
        <p className="text-center text-sm text-[rgb(99,111,129)] py-24">
          Loading booking details…
        </p>
      </div>
    );
  }

  if (!data.success || !data.package) {
    return (
      <div className={CONTAINER}>
        <div className="flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl text-center px-6">
          <p className="text-gray-500">We couldn&apos;t load this package.</p>
          <div className="flex items-center gap-3">
            <button
              onClick={retry}
              className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
            >
              Retry
            </button>
            <Link
              href="/packages"
              className="px-6 py-2.5 rounded-xl border border-border text-[rgb(15,23,42)] font-semibold hover:bg-white transition-all"
            >
              Back to packages
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <PackageBookingFlow key={data.package._id} pkg={data.package} />;
}
