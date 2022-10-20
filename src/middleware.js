import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token");

  const publicUrls = [
    "",
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/resetPassword",
  ];

  if (!token) {
    if (publicUrls.includes(request.nextUrl.pathname))
      return NextResponse.next();
    return NextResponse.redirect(new URL("/", request.url));
  }

  // // this condition avoid to show the login page if the user is logged in
  if (token) {
    if (publicUrls.includes(request.nextUrl.pathname)) {
      try {
        await jwtVerify(
          token,
          new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
        );
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
  }

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

// export default async function middleware(req, res) {
//   let token;
//   if (
//     req.headers.get("authorization") &&
//     req.headers.get("authorization").startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.get("authorization").split(" ")[1];
//       const { payload } = await jwtVerify(
//         token,
//         new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
//       );
//       const id = payload.id;
//       return NextResponse.next();
//     } catch (e) {
//       return res.status(400).json({ msg: e.message });
//     }
//   }
//   if (token) {
//     const error = new Error("Invalid token");
//     return res.status(400).json({ msg: error.message });
//   }
// }

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*", "/admin/:path*"],
};
