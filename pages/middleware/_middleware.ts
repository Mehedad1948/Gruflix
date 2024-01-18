import { verifyToken } from '@/lib/utils/verifiyToken';
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const token = req ? req.cookies.get("token")?.value || null : null;

  const { pathname } = req.nextUrl;
  console.log({ token });

  if (!token) {
    return NextResponse.redirect("/login");
  }

  const userId = await verifyToken(token);

  if ((token && userId) || pathname.includes("/api/login"))
    return NextResponse.next();

  return NextResponse.next();
};
