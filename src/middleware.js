import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

export default async function middleware(req, res) {
  let token
  if (
    req.headers.get("authorization") &&
    req.headers.get("authorization").startsWith("Bearer")
  ) {
    try {
      token = req.headers.get("authorization").split(" ")[1]
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
      )
      const id = payload.id
      return NextResponse.next()
    } catch (e) {
      return res.status(400).json({ msg: e.message })
    }
  }
  if (token) {
    const error = new Error("Invalid token")
    return res.status(400).json({ msg: error.message })
  }
}

export const config = {
  // matcher: ["/api/users/:path*", "/api/admin/:path*", "/api/appointments/:path*", "/api/notifications/:path*"],
}
