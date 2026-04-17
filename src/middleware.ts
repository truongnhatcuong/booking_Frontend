import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export type Role =
  | "ADMIN"
  | "MANAGER"
  | "FRONT_DESK"
  | "MAINTENANCE"
  | "MARKETING";

export const DEFAULT_REDIRECT: Record<Role, string> = {
  ADMIN: "/admin",
  MANAGER: "/admin",
  FRONT_DESK: "/admin/bookings/listbooking",
  MAINTENANCE: "/admin/rooms/maintenance",
  MARKETING: "/admin/blog",
};

const routePermissions: Record<string, Role[]> = {
  // Users
  "/admin": ["ADMIN", "MANAGER"],
  "/admin/users/roles": ["ADMIN", "MANAGER"],
  "/admin/users/customers": ["ADMIN", "MANAGER", "FRONT_DESK"],
  "/admin/users/employees": ["ADMIN", "MANAGER"],
  "/admin/users": ["ADMIN", "MANAGER"],

  // Audit & Reviews
  "/admin/reviews/audit-logs": ["ADMIN"],
  "/admin/reviews": ["ADMIN", "MANAGER", "MARKETING"],

  // Discounts
  "/admin/discounts": ["ADMIN", "MANAGER"],

  // Seasonal Rates
  "/admin/seasonal-rates/add": ["ADMIN", "MANAGER"],
  "/admin/seasonal-rates": ["ADMIN", "MANAGER"],

  // Blog
  "/admin/blog/add": ["ADMIN", "MANAGER", "MARKETING"],
  "/admin/blog": ["ADMIN", "MANAGER", "MARKETING"],

  // Statistical
  "/admin/statiscal": ["ADMIN", "MANAGER"],

  // Rooms
  "/admin/rooms/maintenance": ["ADMIN", "MANAGER", "MAINTENANCE"],
  "/admin/rooms": ["ADMIN", "MANAGER", "FRONT_DESK", "MAINTENANCE"],

  // Bookings
  "/admin/bookings/add-booking": ["ADMIN", "MANAGER", "FRONT_DESK"],
  "/admin/bookings/listbooking": ["ADMIN", "MANAGER", "FRONT_DESK"],
  "/admin/bookings": ["ADMIN", "MANAGER", "FRONT_DESK"],
};

export const ROLE_LABEL: Record<Role, string> = {
  ADMIN: "Admin",
  MANAGER: "Quản lý",
  FRONT_DESK: "Lễ tân",
  MAINTENANCE: "Bảo trì",
  MARKETING: "Marketing",
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Bỏ qua các route không phải /admin
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/unauthorized") return NextResponse.next();
  if (pathname === "/admin/profile") return NextResponse.next();

  const token =
    req.cookies.get("token")?.value ??
    req.headers.get("authorization")?.split(" ")[1];

  // Chưa có token → về login
  if (!token) {
    return NextResponse.redirect(new URL("/signIn", req.url));
  }

  try {
    const decoded = jwtDecode<{ role: Role }>(token);
    const userRole = decoded.role;

    // Role không hợp lệ → về login
    if (!userRole || !(userRole in DEFAULT_REDIRECT)) {
      return NextResponse.redirect(new URL("/admin/unauthorized", req.url));
    }

    const homePage = DEFAULT_REDIRECT[userRole];

    const matchedRoute = Object.keys(routePermissions)
      .filter((route) => pathname.startsWith(route))
      .sort((a, b) => b.length - a.length)[0];

    if (matchedRoute) {
      const allowedRoles = routePermissions[matchedRoute];
      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL(homePage, req.url));
      }
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/signIn", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
