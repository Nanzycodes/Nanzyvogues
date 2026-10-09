// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
// Use the same Prisma import path your signup route uses
import { prisma } from "@/app/lib/Prisma";
import { createSession } from "@/app/lib/session";

// The rules the incoming data must follow
const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

// Runs when someone sends a POST request to /api/auth/login
export async function POST(request: Request) {
  // 1. Read and validate what was sent
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }
  const { email, password } = parsed.data;

  // 2. Find the user and compare the typed password with the stored hash
  const user = await prisma.user.findUnique({ where: { email } });
  const passwordOk = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  // 3. One message for BOTH "no such email" and "wrong password"
  if (!user || !passwordOk) {
    return NextResponse.json(
      { error: "Incorrect email or password" },
      { status: 401 } // 401 means "not allowed in"
    );
  }

  // 4. Correct login: put the signed cookie in the browser
  await createSession(user.id);

  return NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email },
  });
}