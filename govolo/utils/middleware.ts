// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hasRefreshCookie = request.cookies.has("refreshToken");
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isProtectedRoute = pathname.startsWith("/dashboard"); // adjust to your (main) routes

  if (isProtectedRoute && !hasRefreshCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && hasRefreshCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
