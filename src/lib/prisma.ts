import { PrismaClient } from "@prisma/client";
import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Cliente Prisma em dois modos:
 *
 * 1. Desenvolvimento (padrão): SQLite local em arquivo (DATABASE_URL="file:./dev.db")
 * 2. Produção hospedada (Netlify + Turso): quando TURSO_DATABASE_URL e
 *    TURSO_AUTH_TOKEN estão definidos, conecta ao Turso via driver adapter libSQL.
 */
function criarCliente(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  if (tursoUrl && tursoToken) {
    const driver = createClient({ url: tursoUrl, authToken: tursoToken });
    const adapter = new PrismaLibSQL(driver);
    return new PrismaClient({ adapter, log: ["error"] });
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? criarCliente();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
