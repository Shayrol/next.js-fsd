import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware is running!");
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken");

  if (pathname.startsWith("/testpage")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/testpage"],
};
