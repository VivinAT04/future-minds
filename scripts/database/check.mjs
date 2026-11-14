import dotenv from "dotenv";
dotenv.config({ path: ".env.local", quiet: true });
import pg from "pg";

const { Client } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.log("DATABASE: NOT CONFIGURED");
  console.log("Configure DATABASE_URL in .env.local.");
  console.log("No connection was attempted.");
  process.exit(0);
}

const client = new Client({
  connectionString,
  connectionTimeoutMillis: 10000,
  application_name: "future-minds-health-check",
});

try {
  await client.connect();

  const connection = await client.query(
    "SELECT current_database() AS database_name"
  );

  const migrationTable = await client.query(`
    SELECT to_regclass('public.schema_migrations') IS NOT NULL AS exists
  `);

  console.log("DATABASE: CONNECTED");
  console.log("Database:", connection.rows[0].database_name);

  if (!migrationTable.rows[0].exists) {
    console.log("MIGRATIONS: NOT APPLIED");
  } else {
    const result = await client.query(`
      SELECT filename, applied_at
      FROM schema_migrations
      ORDER BY filename
    `);

    console.log("MIGRATIONS:", result.rowCount);

    for (const row of result.rows) {
      console.log(` - ${row.filename}`);
    }
  }
} catch (error) {
  console.error("DATABASE CHECK FAILED:", error.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
