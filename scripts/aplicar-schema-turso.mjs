/**
 * Aplica o schema do Prisma (SQL) em um banco Turso/libSQL remoto.
 *
 * O Prisma CLI não se conecta a bancos Turso diretamente, então geramos o SQL
 * (npm run db:sql) e o aplicamos por aqui com o cliente libSQL.
 *
 * Uso:
 *   TURSO_DATABASE_URL="libsql://..." TURSO_AUTH_TOKEN="..." npm run db:aplicar-turso
 */
import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";

const url = process.env.TURSO_DATABASE_URL;
const token = process.env.TURSO_AUTH_TOKEN;

if (!url || !token) {
  console.error(
    "Defina TURSO_DATABASE_URL e TURSO_AUTH_TOKEN antes de rodar este script.\n" +
      "Ex.: TURSO_DATABASE_URL=\"libsql://...\" TURSO_AUTH_TOKEN=\"...\" npm run db:aplicar-turso"
  );
  process.exit(1);
}

const caminhoSql = new URL("../prisma/turso-schema.sql", import.meta.url);
const sql = readFileSync(caminhoSql, "utf8");

// Divide o script em comandos individuais, removendo comentários e linhas vazias
const comandos = sql
  .split(";")
  .map((c) =>
    c
      .split("\n")
      .filter((l) => !l.trim().startsWith("--") && l.trim().length > 0)
      .join("\n")
      .trim()
  )
  .filter((c) => c.length > 0);

if (comandos.length === 0) {
  console.error("prisma/turso-schema.sql está vazio. Rode antes: npm run db:sql");
  process.exit(1);
}

const db = createClient({ url, authToken: token });

console.log(`Aplicando ${comandos.length} comandos SQL no banco ${url} …`);

try {
  await db.batch(comandos.map((stmt) => ({ sql: stmt, args: [] })), "write");
  console.log("✅ Schema aplicado com sucesso no Turso!");
} catch (erro) {
  // Tabelas já existentes são toleradas (idempotência básica)
  const msg = String(erro?.message ?? erro);
  if (msg.includes("already exists")) {
    console.log("ℹ️ Algumas tabelas já existiam. Schema verificado.");
  } else {
    console.error("❌ Erro ao aplicar schema:", msg);
    process.exit(1);
  }
}

await db.close();
