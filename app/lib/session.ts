// app/lib/session.ts
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "session";

// Turns our secret text into the form that jose needs
function getKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is missing from .env");
  return new TextEncoder().encode(secret);
}

// Called after a correct login: makes a signed token and puts it in a cookie
export async function createSession(userId: string) {
  const token = await new SignJWT({ userId }) // the data inside the token
    .setProtectedHeader({ alg: "HS256" })     // the signing method
    .setIssuedAt()
    .setExpirationTime("7d")                  // the token stops working after 7 days
    .sign(getKey());                          // stamp it with our secret

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,                                 // JavaScript on the page can't read it
    secure: process.env.NODE_ENV === "production",  // https only once we are live
    sameSite: "lax",                                // blocks most cross-site abuse
    maxAge: 60 * 60 * 24 * 7,                       // the cookie lasts 7 days (in seconds)
    path: "/",                                      // sent with every page request
  });
}

// Returns the logged-in user's id, or null if nobody is logged in
export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null; // no cookie, so not logged in

  try {
    // Checks the stamp and the expiry date. Throws if the token was edited or is old
    const { payload } = await jwtVerify(token, getKey(), {
      algorithms: ["HS256"],
    });
    return typeof payload.userId === "string" ? payload.userId : null;
  } catch {
    return null; // invalid or expired token counts as logged out
  }
}

// Used for logout: removes the cookie
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}