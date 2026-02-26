import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const jwt = await getToken({ req });
  if (jwt) {
    return NextResponse.next();
  }
  const loginUrl = new URL("/login", req.url);
  return NextResponse.redirect(loginUrl);
}
export const config = {
  matcher: ["/cart"],
};