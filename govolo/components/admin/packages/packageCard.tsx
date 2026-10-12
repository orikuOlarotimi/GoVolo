import Link from "next/link";
import { ArrowRight, Check, Clock, Star, Users } from "lucide-react";
import type { Package } from "@/types/package";

const MAX_INCLUDED_SHOWN = 3;

type PackageCardProps = {
  pkg: Package;
  href: string;
};

export default function PackageCard({ pkg, href }: PackageCardProps) {
  const destination = pkg.destination;
  const shown = pkg.included.slice(0, MAX_INCLUDED_SHOWN);
  const extra = pkg.included.length - shown.length;

  const { min, max } = pkg.groupSize;
  const groupLabel = min === max ? `${min}` : `${min}–${max}`;

  return (
    <Link
      href={href}
      className="block bg-white rounded-3xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl transition-shadow"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-[rgb(0,184,255)] to-[rgb(21,101,255)] px-6 pt-6 pb-10 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/80 truncate">
          {destination?.location ?? "Destination unavailable"}
        </p>
        <h3 className="mt-1 text-2xl font-bold truncate">
          {destination?.title ?? "Untitled package"}
        </h3>
        <p className="mt-3 flex items-end gap-1">
          <span className="text-4xl font-bold">${pkg.price}</span>
          <span className="text-sm text-white/80 mb-1">/ person</span>
        </p>
      </div>

      {/* Body */}
      <div className="relative -mt-5 rounded-t-3xl bg-white">
        <div className="flex items-center justify-between px-6 py-4 text-sm text-[rgb(15,23,42)] border-b border-border">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-[rgb(101,117,139)]" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="font-semibold">
              {(destination?.rating?.average ?? 0).toFixed(1)}
            </span>
            <span className="text-[rgb(101,117,139)]">
              ({destination?.rating?.count ?? 0})
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-[rgb(101,117,139)]" />
            {groupLabel}
          </span>
        </div>

        <div className="px-6 py-4 space-y-3">
          {shown.length === 0 ? (
            <p className="text-sm text-[rgb(101,117,139)]">
              No inclusions listed.
            </p>
          ) : (
            shown.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-[rgb(15,23,42)]">
                <span className="w-6 h-6 shrink-0 rounded-full bg-[rgb(242,245,247)] flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-[rgb(101,117,139)]" />
                </span>
                <span className="truncate">{item}</span>
              </div>
            ))
          )}
          {extra > 0 && (
            <p className="text-xs text-[rgb(101,117,139)] pl-9">
              +{extra} more
            </p>
          )}
        </div>

        <div className="px-6 pb-6">
          <span className="flex items-center justify-center gap-2 w-full rounded-xl border-2 border-border py-3 font-semibold text-[rgb(15,23,42)]">
            View details <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
