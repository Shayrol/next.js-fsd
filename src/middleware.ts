import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware is running!");
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken");

  // 보호할 경로들
  const protectedPaths = ["/travel", "/mypage"];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/travel", "/mypage"],
};
