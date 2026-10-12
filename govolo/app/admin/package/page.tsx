"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";
import { useApiFetch } from "@/utils/useApiFetch";
import PackageCard from "@/components/admin/packages/packageCard";
import type { Package } from "@/types/package";

export default function PackagesPage() {
  const { user, loading: authLoading } = useAuth();
  const apiFetch = useApiFetch();

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const loadPackages = async () => {
    setLoading(true);
    setFailed(false);
    try {
      const res = await apiFetch<{
        success: boolean;
        message?: string;
        count: number;
        packages: Package[];
      }>("/api/packages/mine", {
        method: "GET",
        requiresAuth: true,
      });

      if (!res.success || !Array.isArray(res.packages)) {
        toast.error(res.message || "Packages could not be loaded");
        setFailed(true);
        return;
      }

      setPackages(res.packages);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading your packages",
      );
      setFailed(true);
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
    loadPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.email]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(15,23,42)]">Packages</h1>
          <p className="text-sm text-[rgb(101,117,139)] mt-1">
            Packages you&apos;ve created.
          </p>
        </div>
        <Link
          href="/admin/package/new-package"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[rgb(13,162,231)] text-white font-semibold text-sm hover:bg-[rgb(13,162,231)]/90 transition-all"
        >
          <Plus className="h-4 w-4" /> Add new package
        </Link>
      </div>

      {loading ? (
        <div className="w-full flex items-center justify-center py-24 bg-gray-100 rounded-2xl">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-[rgb(13,162,231)] rounded-full animate-spin" />
        </div>
      ) : failed ? (
        <div className="w-full flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl text-center px-6">
          <AlertCircle className="h-8 w-8 text-gray-400" />
          <p className="text-gray-500">
            Something went wrong while loading your packages.
          </p>
          <button
            onClick={loadPackages}
            className="px-6 py-2.5 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300"
          >
            Retry
          </button>
        </div>
      ) : packages.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl text-center px-6">
          <p className="text-gray-500">
            You haven&apos;t created any packages yet.
          </p>
          <Link
            href="/admin/package/new-package"
            className="px-6 py-2.5 rounded-xl bg-[rgb(13,162,231)] text-white font-semibold hover:bg-[rgb(13,162,231)]/90 transition-all"
          >
            Add new package
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((p) => (
            <PackageCard key={p._id} pkg={p} href={`/admin/package/${p._id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
