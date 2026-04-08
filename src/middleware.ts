import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const ADMIN_PATHS = /^\/admin(\/|$)/;
const PUBLIC_ADMIN = /^\/admin\/login/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!ADMIN_PATHS.test(pathname)) return NextResponse.next();
  if (PUBLIC_ADMIN.test(pathname)) {
    const res = NextResponse.next();
    res.headers.set("x-pathname", pathname);
    return res;
  }

  const token = req.cookies.get("esamir_session")?.value;
  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const session = await verifyToken(token);
  if (!session) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("esamir_session");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
