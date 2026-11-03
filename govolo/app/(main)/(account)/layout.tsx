"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AccountSidebar from "@/components/account/AccountSidebar";
import { useAuth } from "@/context/authContext";

const BANNER =
  "h-24 bg-gradient-to-br from-[rgb(5,15,25)] via-[rgb(8,30,45)] to-[rgb(10,65,90)]";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=${pathname}`);
  }, [loading, user, router, pathname]);

  if (loading || !user) {
    return (
      <div className="flex-1 bg-[rgb(248,250,252)]">
        <div className={BANNER} />
        <p className="py-24 text-center text-sm text-[rgb(99,111,129)]">
          Loading…
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[rgb(248,250,252)]">
      <div className={BANNER} />
      <div className="container mx-auto flex max-w-7xl items-start gap-6 ">
        <AccountSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
