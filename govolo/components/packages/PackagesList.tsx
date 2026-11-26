"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import TravelCard from "@/components/card/TravelCard"; // adjust to your path
import { fetchPackages, PAGE_SIZE } from "@/lib/packages";
import type { PackageItem, PackagesResponse } from "@/lib/packages";

const formatGroup = (g?: { min?: number; max?: number }) => {
  if (g?.min && g?.max) return `${g.min}–${g.max}`;
  if (g?.max) return `Up to ${g.max}`;
  if (g?.min) return `${g.min}+`;
  return "—";
};

const outlineButton =
  "px-8 py-3 rounded-xl border-2 border-[rgb(13,162,231)] text-[rgb(13,162,231)] font-semibold hover:bg-[rgb(13,162,231)] hover:text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[rgb(13,162,231)]";

export default function PackagesList({
  initialData,
  initialPage,
}: {
  initialData: PackagesResponse | null;
  initialPage: number;
}) {
  const [packages, setPackages] = useState<PackageItem[]>(
    initialData?.packages ?? [],
  );
  const [total, setTotal] = useState(initialData?.total ?? 0);
  const [page, setPage] = useState(initialPage);
  const [failed, setFailed] = useState(initialData === null);
  const [loading, setLoading] = useState(false); // retry of the first load
  const [loadingMore, setLoadingMore] = useState(false);

  const hasMore = packages.length < total;

  const retry = async () => {
    setLoading(true);
    try {
      const json = await fetchPackages(1, page * PAGE_SIZE);
      setPackages(json.packages);
      setTotal(json.total);
      setFailed(false);
    } catch {
      setFailed(true);
      toast.error("We couldn't load the packages.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore) return;
    const next = page + 1;
    setLoadingMore(true);
    try {
      const json = await fetchPackages(next, PAGE_SIZE);
      setPackages((prev) => {
        const seen = new Set(prev.map((p) => p._id));
        return [...prev, ...json.packages.filter((p) => !seen.has(p._id))];
      });
      setTotal(json.total);
      setPage(next);
      // Updates the URL without asking the server to render the page again
      window.history.replaceState(null, "", `?page=${next}`);
    } catch {
      toast.error("Couldn't load more packages. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-24 text-[rgb(99,111,129)]">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm">Loading packages…</span>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 bg-gray-100 rounded-2xl text-center px-6">
        <p className="text-gray-500">
          We couldn&apos;t load the packages. An error occurred.
        </p>
        <button onClick={retry} className={outlineButton}>
          Retry
        </button>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="py-24 bg-gray-100 rounded-2xl text-center px-6">
        <p className="text-gray-500">No packages are available yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages
          .filter((pkg) => pkg.destination)
          .map((pkg) => (
            <TravelCard
              key={pkg._id}
              _id={pkg._id}
              label={pkg.destination!.location}
              title={pkg.destination!.title}
              price={pkg.price}
              duration={pkg.duration ?? ""}
              rating={pkg.rating?.average ?? 0}
              reviews={pkg.rating?.count ?? 0}
              people={formatGroup(pkg.groupSize)}
              features={(pkg.included ?? []).slice(0, 4)}
            />
          ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className={`${outlineButton} flex items-center gap-2`}
          >
            {loadingMore ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading…
              </>
            ) : (
              "Load more packages"
            )}
          </button>
        </div>
      )}
    </>
  );
}
