import dotenv from "dotenv";
dotenv.config({ path: ".env.local", quiet: true });
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import pg from "pg";

const { Client } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error(
    "DATABASE_URL is not configured. No database changes were made."
  );
  process.exit(1);
}

const client = new Client({
  connectionString,
  connectionTimeoutMillis: 10000,
  application_name: "future-minds-migrations",
});

function checksum(content) {
  return crypto
    .createHash("sha256")
    .update(content)
    .digest("hex");
}

async function run() {
  const directory = path.resolve("database/migrations");

  const filenames = (await fs.readdir(directory))
    .filter((filename) => /^\d+_[a-z0-9_]+\.sql$/.test(filename))
    .sort();

  if (!filenames.length) {
    throw new Error("No database migrations were found.");
  }

  await client.connect();

  try {
    await client.query("BEGIN");

    // Prevent two migration processes running concurrently.
    await client.query(
      "SELECT pg_advisory_xact_lock(714299, 2026)"
    );

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename TEXT PRIMARY KEY,
        checksum TEXT NOT NULL,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    const existing = await client.query(
      "SELECT filename, checksum FROM schema_migrations"
    );

    const applied = new Map(
      existing.rows.map((row) => [
        row.filename,
        row.checksum,
      ])
    );

    for (const filename of filenames) {
      const filepath = path.join(directory, filename);
      const original = await fs.readFile(filepath, "utf8");
      const hash = checksum(original);

      if (applied.has(filename)) {
        if (applied.get(filename) !== hash) {
          throw new Error(
            `Previously applied migration was modified: ${filename}`
          );
        }

        console.log(`ALREADY APPLIED: ${filename}`);
        continue;
      }

      // Earlier project migrations include BEGIN/COMMIT.
      // The runner owns the transaction, so remove only
      // those exact outer transaction statements.
      const sql = original
        .replace(/^\s*BEGIN\s*;\s*/i, "")
        .replace(/\s*COMMIT\s*;\s*$/i, "");

      console.log(`APPLYING: ${filename}`);

      await client.query(sql);

      await client.query(
        `INSERT INTO schema_migrations
         (filename, checksum)
         VALUES ($1, $2)`,
        [filename, hash]
      );

      console.log(`APPLIED: ${filename}`);
    }

    await client.query("COMMIT");

    console.log("DATABASE MIGRATIONS COMPLETED SUCCESSFULLY");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

run().catch((error) => {
  console.error("MIGRATION FAILED:", error.message);
  process.exitCode = 1;
});
