import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const userCookie = req.cookies.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : {};

  const { firstname, currentWeight, targetWeight, targetDate } = user;

  if (firstname && currentWeight && targetWeight && targetDate) {
    if (pathname.startsWith("/welcome")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (!pathname.startsWith("/welcome")) {
      return NextResponse.redirect(new URL("/welcome", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
