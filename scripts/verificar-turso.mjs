/**
 * Verificação rápida do banco (local ou Turso).
 * Com TURSO_DATABASE_URL + TURSO_AUTH_TOKEN definidos, verifica o banco remoto.
 * Uso: node scripts/verificar-turso.mjs
 */
import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL ?? (process.env.DATABASE_URL ?? "file:./prisma/dev.db");
const token = process.env.TURSO_AUTH_TOKEN;

const db = createClient({ url, authToken: token });

const tabelas = ["User", "Category", "Product", "GalleryImage", "Order", "Setting"];

for (const tabela of tabelas) {
  const r = await db.execute(`SELECT COUNT(*) AS n FROM "${tabela}"`);
  console.log(`${tabela}: ${r.rows[0].n} registro(s)`);
}

const cfg = await db.execute('SELECT key, value FROM "Setting" ORDER BY key');
for (const row of cfg.rows) {
  console.log(`config ${row.key} = ${String(row.value).slice(0, 50)}`);
}

await db.close();
console.log("✅ Verificação concluída");
