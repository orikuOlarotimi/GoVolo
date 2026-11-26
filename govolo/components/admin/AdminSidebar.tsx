"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  CalendarCheck,
  Newspaper,
  MessageSquare,
  Users,
  HandCoins,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Destinations", href: "/admin/destination", icon: MapPin },
  { label: "Packages", href: "/admin/package", icon: HandCoins },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Blogs", href: "/admin/blogs", icon: Newspaper },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Users", href: "/admin/users", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Start as an icon rail on small screens. Done after mount so the
  // server and the browser render the same thing first.
  useEffect(() => {
    if (window.innerWidth < 1024) setCollapsed(true);
  }, []);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } shrink-0 overflow-hidden bg-white border-r border-border flex flex-col transition-[width] duration-300`}
    >
      <div
        className={`h-16 flex items-center border-b border-border ${
          collapsed ? "justify-center" : "justify-between pl-6 pr-3"
        }`}
      >
        {!collapsed && (
          <span className="font-bold text-lg text-[rgb(15,23,42)] whitespace-nowrap">
            GoVolo <span className="text-[rgb(13,162,231)]">Admin</span>
          </span>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className="rounded-lg p-2 text-[rgb(101,117,139)] hover:bg-[rgb(248,250,252)] hover:text-[rgb(15,23,42)] transition-colors"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/admin" ? pathname === href : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                collapsed ? "justify-center px-0" : "px-3"
              } ${
                isActive
                  ? "bg-[rgb(13,162,231)]/10 text-[rgb(13,162,231)]"
                  : "text-[rgb(101,117,139)] hover:bg-[rgb(248,250,252)] hover:text-[rgb(15,23,42)]"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
