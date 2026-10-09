// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/Prisma";
import { getSessionUserId } from "@/app/lib/session";

// Runs when the browser asks GET /api/auth/me
export async function GET() {
  const userId = await getSessionUserId(); // reads and checks the cookie
  if (!userId) return NextResponse.json({ user: null }); // nobody logged in

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true }, // never send passwordHash
  });
  return NextResponse.json({ user });
}