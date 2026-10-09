// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
// Same path your products file uses for the Prisma client
import { prisma } from "@/app/lib/Prisma";

// The rules the incoming data must follow. Anything else is rejected
const signupSchema = z.object({
  name: z.string().trim().min(2, "Name is too short"),
  // trim removes stray spaces; toLowerCase makes Ada@x.com and ada@x.com the same
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// This function runs when someone sends a POST request to /api/auth/signup
export async function POST(request: Request) {
  // 1. Read the data that was sent. If it isn't valid JSON, stop with 400 (bad request)
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // 2. Validate it against our rules
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    // Send back the first problem in plain words
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }
  const { name, email, password } = parsed.data;

  // 3. Is the email already taken? 409 means "conflict"
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 }
    );
  }

  // 4. Scramble the password. The 12 is how much work the scrambling takes:
  // higher is safer but slower
  const passwordHash = await bcrypt.hash(password, 12);

  // 5. Save the user. "select" picks which fields come back.
  // We leave passwordHash out on purpose
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
    select: { id: true, name: true, email: true },
  });

  // 201 means "created"
  return NextResponse.json({ user }, { status: 201 });
}