import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const body = await request.json();
  const { id, name } = body;
  console.log("dddd::", request);

  (await cookieStore).set(name, id, {
    httpOnly: true,
    // path: "/dev-3d.polyuse.xyz",
    path: "/",
  });

  return NextResponse.json({ message: "Cookie set" });
}
