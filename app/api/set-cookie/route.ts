import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const body = await request.json();
  const { id } = body;
  console.log("dddd::", request);

  (await cookieStore).set("next_org_id", id, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1日
  });

  return NextResponse.json({ message: "Cookie set" });
}
