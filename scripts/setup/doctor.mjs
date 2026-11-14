import dotenv from "dotenv";
import pg from "pg";

dotenv.config({
  path: ".env.local",
  quiet: true,
});

const { Client } = pg;

const required = [
  "DATABASE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
];

console.log("\nFUTURE MINDS — SYSTEM READINESS\n");

let configured = true;

for (const name of required) {
  const available = Boolean(process.env[name]?.trim());

  console.log(
    `${name}: ${available ? "CONFIGURED" : "MISSING"}`
  );

  if (!available) {
    configured = false;
  }
}

if (!configured) {
  console.log("\nExternal services are not fully configured.");
  console.log("Run: npm run setup:configure");
  process.exit(0);
}

let databaseReady = false;
let migrationsReady = false;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10000,
  application_name: "future-minds-doctor",
});

try {
  await client.connect();

  databaseReady = true;

  console.log("\nPOSTGRESQL CONNECTION: SUCCESS");

  const result = await client.query(`
    SELECT
      to_regclass('public.app_users') IS NOT NULL
        AS users_exist,
      to_regclass('public.user_role_assignments') IS NOT NULL
        AS roles_exist,
      to_regclass('public.schema_migrations') IS NOT NULL
        AS migrations_exist
  `);

  const state = result.rows[0];

  console.log(
    "Users table:",
    state.users_exist ? "PRESENT" : "MISSING"
  );

  console.log(
    "Role assignments table:",
    state.roles_exist ? "PRESENT" : "MISSING"
  );

  console.log(
    "Migration history:",
    state.migrations_exist ? "PRESENT" : "MISSING"
  );

  if (state.migrations_exist) {
    const migrations = await client.query(`
      SELECT filename
      FROM schema_migrations
      ORDER BY filename
    `);

    console.log(
      "Applied migrations:",
      migrations.rowCount
    );

    for (const row of migrations.rows) {
      console.log(`  ${row.filename}`);
    }

    migrationsReady =
      state.users_exist &&
      state.roles_exist &&
      migrations.rows.some(
        (row) =>
          row.filename === "001_initial_schema.sql"
      ) &&
      migrations.rows.some(
        (row) =>
          row.filename === "002_academic_reference_data.sql"
      );
  }
} catch (error) {
  console.error(
    "\nDATABASE CHECK FAILED:",
    error.message
  );

  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}

console.log("\nFINAL READINESS");

console.log(
  "Database:",
  databaseReady ? "CONNECTED" : "NOT READY"
);

console.log(
  "Schema:",
  migrationsReady ? "APPLIED" : "NOT COMPLETE"
);

console.log(
  "Supabase credentials:",
  "PRESENT — AUTHENTICATION NOT YET VERIFIED"
);

console.log(
  "Owner / technical administrator accounts:",
  "NOT VERIFIED"
);

console.log(
  "Role-based access tests:",
  "PENDING"
);

console.log(
  "\nCredential presence does not prove that live authentication is ready."
);
