import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const user = cookies().get("userToken");

  if (
    !user &&
    (url.pathname.startsWith("/login") || url.pathname.startsWith("/register"))
  ) {
    return NextResponse.next();
  }

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    url.pathname.startsWith("/login") ||
    url.pathname.startsWith("/register")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
