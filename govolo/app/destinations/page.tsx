"use client";

import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { useState } from "react";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black">
      {/* logo + nav links unchanged */}

      <div className="flex items-center gap-3">
        {loading ? (
          // brief skeleton while the silent-refresh bootstrap runs on page load
          <div className="h-9 w-24 animate-pulse rounded-full bg-white/20" />
        ) : user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-white"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-xs font-bold">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>
              )}
              <span className="text-sm font-medium">{user.firstName}</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white py-2 shadow-lg">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-[#10192b] hover:bg-gray-50"
                >
                  My Profile
                </Link>
                <Link
                  href="/bookings"
                  className="block px-4 py-2 text-sm text-[#10192b] hover:bg-gray-50"
                >
                  My Bookings
                </Link>
                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className="text-sm font-semibold text-white">
              Log in
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-white"
            >
              Book Now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
