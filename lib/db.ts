// lib/prisma.ts
import { Pool, neonConfig } from '@neondatabase/serverless' 
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "./generated/prisma/client";
import ws from 'ws'
// import { PrismaClient } from '@prisma/client'

// Esto es necesario para que funcione en entornos de desarrollo/node
if (!globalThis.WebSocket) {
  neonConfig.webSocketConstructor = ws;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool as any);

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter, log: ["error", "query", "warn"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });

// export const prisma =
//   globalForPrisma.prisma ?? new PrismaClient({ adapter });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;