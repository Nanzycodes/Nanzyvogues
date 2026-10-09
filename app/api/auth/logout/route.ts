// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { deleteSession } from "@/app/lib/session";

// Runs when the browser sends POST /api/auth/logout
export async function POST() {
  await deleteSession(); // removes the session cookie
  return NextResponse.json({ ok: true });
}