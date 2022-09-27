import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(req, res) {
  // const jwt = req.cookies.get("myTokenName");
  // console.log(jwt);

  try {
    const token = req.headers.get("authorization").split(" ")[1];
    console.log(token);
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    console.log({ payload });
    const id = payload.id;
    console.log(id);
    return NextResponse.next();
  } catch (e) {
    console.log(e.message);
  }
}

export const config = {
  matcher: ["/api/users/:path*", "/api/admin/:path*"],
};
