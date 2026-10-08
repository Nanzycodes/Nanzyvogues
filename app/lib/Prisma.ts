// lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg"; // the piece that talks to Postgres
import { PrismaClient } from "@/generated/prisma/client";


const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  // The adapter gets the address of database from DATABASE_URL in .env
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

// Reuse the saved client if it exists, otherwise create a new one
export const prisma = globalForPrisma.prisma ?? createClient();

// Remember it for next time (only while developing)
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;