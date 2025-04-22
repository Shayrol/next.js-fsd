import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware is running!");
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken");

  // 보호할 경로들
  const protectedPaths = ["/travel", "/mypage"];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // 로그인 하지 않은 상태에서 보호된 경로 접근할 때 접근할 경로 쿼리스트링으로 저장
  // 이후 로그인 페이지에서 리다이렉트로 이동할 때 사용
  if (isProtected && !accessToken) {
    const callbackUrl = request.nextUrl.pathname;
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/travel/:path*", "/mypage/:path*"],
};
