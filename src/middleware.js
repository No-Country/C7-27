import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  // console.log(request.nextUrl.pathname);

  const token = request.cookies.get("token");

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  // this condition avoid to show the login page if the user is logged in
  // if (token) {
  //   if (request.nextUrl.pathname.includes("/login")) {
  //     try {
  //       await jwtVerify(token, new TextEncoder().encode("secret"));
  //       return NextResponse.redirect(new URL("/dashboard", request.url));
  //     } catch (error) {
  //       return NextResponse.next();
  //     }
  //   }
  // }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );
    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
