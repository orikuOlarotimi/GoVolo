"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  CalendarCheck,
  Newspaper,
  MessageSquare,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Destinations", href: "/admin/destinations", icon: MapPin },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Blogs", href: "/admin/blogs", icon: Newspaper },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Users", href: "/admin/users", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-border flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <span className="font-bold text-lg text-[rgb(15,23,42)]">
          GoVolo <span className="text-[rgb(13,162,231)]">Admin</span>
        </span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/admin" ? pathname === href : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[rgb(13,162,231)]/10 text-[rgb(13,162,231)]"
                  : "text-[rgb(101,117,139)] hover:bg-[rgb(248,250,252)] hover:text-[rgb(15,23,42)]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
