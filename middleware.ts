import { verifyToken } from "@/lib/utils/verifiyToken";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const token = req ? req.cookies.get("token")?.value || null : null;

  const { pathname } = req.nextUrl;
  // console.log({ token, pathname, req });

  // if (!token && pathname !== "/login") {
  //   console.log("urllll", req.nextUrl.host + "/login");

  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  // const userId = await verifyToken(token);

  // if ((token && userId) || pathname.includes("/api/login"))
  //   return NextResponse.next();

  // return NextResponse.next();
};
