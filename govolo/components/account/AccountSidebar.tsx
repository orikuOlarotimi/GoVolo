"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Ticket,
  User,
} from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useBookingNotification } from "@/context/bookingNotificationContext";

const items = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Bookings", href: "/bookings", icon: Ticket },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { hasNewBooking, clearNewBooking } = useBookingNotification();
  const [collapsed, setCollapsed] = useState(false);

  // Start icon-only on small screens so the content has room
  useEffect(() => {
    if (window.innerWidth < 1024) setCollapsed(true);
  }, []);

  const itemClass = (active: boolean) =>
    `flex items-center gap-3 rounded-xl p-3 text-sm font-medium transition-colors ${
      collapsed ? "justify-center" : ""
    } ${
      active
        ? "bg-[rgb(14,168,230)]/10 text-[rgb(14,168,230)]"
        : "text-[rgb(99,111,129)] hover:bg-[rgb(242,245,247)] hover:text-[rgb(15,23,41)]"
    }`;

  return (
    <aside
      className={`sticky top-24 shrink-0 self-start border border-[rgb(225,231,239)] bg-white p-3 shadow-sm transition-[width] duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div
        className={`mb-3 flex items-center ${
          collapsed ? "justify-center" : "justify-between pl-2"
        }`}
      >
        {!collapsed && (
          <span className="text-xs font-semibold uppercase tracking-wide text-[rgb(99,111,129)]">
            My Account
          </span>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-lg p-2 text-[rgb(99,111,129)] hover:bg-[rgb(242,245,247)]"
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="space-y-1">
        {items.map(({ name, href, icon: Icon }) => {
          const showDot = name === "Bookings" && hasNewBooking;
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? name : undefined}
              onClick={() => name === "Bookings" && clearNewBooking()}
              className={itemClass(pathname === href)}
            >
              <span className="relative">
                <Icon className="h-5 w-5" />
                {showDot && (
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
                )}
              </span>
              {!collapsed && name}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={logout}
          title={collapsed ? "Logout" : undefined}
          className={`w-full ${itemClass(false)} hover:!bg-red-50 hover:!text-red-600`}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && "Logout"}
        </button>
      </nav>
    </aside>
  );
}
