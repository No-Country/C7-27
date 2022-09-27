import { NextResponse } from "next/server";

export default function middleware(req) {
  console.log("aaaa");
  let url = req.url;
  console.log(url);
  console.log(req.headers.get("authorization"));
  return NextResponse.next();
}

export const config = {
  matcher: "/api/users/:path*",
};
