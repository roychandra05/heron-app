import {  NextResponse } from "next/server";
import { decrypt, verifySession } from "@/lib/session";
import { cookies } from "next/headers";

// 1. protected routes and public routes
const protectedRoutes = ["/dashboard", "/users", "/users/chat-room/:id"];
const publicRoutes = ["/", "/signin", "/signup", "/bmi"];
const resetPasswordRoutes = ["/reset-password"];
const allRoutes = protectedRoutes.concat(publicRoutes);

const authRoutes = ["/signin", "/signup"];

export default async function middleware(req) {
  // 2. check if current page is protected routes or public
  const path = req.nextUrl.pathname;
  const isProtectedRoutes = protectedRoutes.includes(path);
  const isPublicRoutes = publicRoutes.includes(path);
  const dynamicPath = path.match(/^\/users\/chat-room\/(?<id>[^\/]+)/);

  // 3. decrypt the session from cookie
  const accessTokenCookie = (await cookies()).get("accessToken")?.value;
  const refreshTokenCookie = (await cookies()).get("refreshToken")?.value;

  const accessToken = await decrypt(accessTokenCookie);
  const refreshToken = await decrypt(refreshTokenCookie);

  //token validation and refresh token
  if (allRoutes.includes(path) || dynamicPath) {
    await verifySession();
  }

  // 5. redirect to signin/signup page if the user is not authenticated
  if (
    (!accessToken && !refreshToken && isProtectedRoutes) ||
    (!accessToken && !refreshToken && dynamicPath)
  ) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }
  if (accessToken && authRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!refreshToken && accessToken) {
  }

  // 6. redirect to /dashboard if user is authenticated
  // if (
  //   isPublicRoutes &&
  //   session?.userId &&
  //   !req.nextUrl.pathname.startsWith("/dashboard")
  // ) {
  //   return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  // }
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
