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

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter, log:["error", "query", "warn"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// function createPrismaClient() {
//   const url = process.env.DATABASE_URL;

//   if (!url) {
//     // Esto detendrá el proceso con un mensaje claro en los logs de Vercel
//     throw new Error("❌ ERROR: DATABASE_URL no detectada en el entorno.");
//   }

//   // Si la URL existe, configuramos el adaptador
//   const pool = new Pool({ connectionString: url });
//   const adapter = new PrismaNeon(pool as any);

//   return new PrismaClient({ 
//     adapter,
//     log: ['error', 'warn'] 
//   });
// }

// export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// export const prisma =
//   globalForPrisma.prisma ?? new PrismaClient({ adapter, log: ["error", "query", "warn"] });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };