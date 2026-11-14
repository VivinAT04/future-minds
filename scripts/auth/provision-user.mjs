import dotenv from "dotenv";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { createClient } from "@supabase/supabase-js";
import pg from "pg";

dotenv.config({
  path: ".env.local",
  quiet: true,
});

const { Client } = pg;

const ROLES = [
  "owner",
  "technical_admin",
  "teacher",
  "student",
];

const args = process.argv.slice(2);

function argument(name) {
  const index = args.indexOf(`--${name}`);

  return index >= 0 ? args[index + 1] : undefined;
}

const authId = argument("auth-id");
const role = argument("role");

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

if (!authId || !uuidPattern.test(authId)) {
  console.error(
    "Usage: npm run auth:provision -- --auth-id UUID --role ROLE"
  );
  process.exit(1);
}

if (!ROLES.includes(role)) {
  console.error(
    `Invalid role. Allowed: ${ROLES.join(", ")}`
  );
  process.exit(1);
}

if (!stdin.isTTY || !stdout.isTTY) {
  console.error(
    "Account provisioning requires an interactive terminal."
  );
  process.exit(1);
}

const databaseUrl = process.env.DATABASE_URL;

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const serviceKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!databaseUrl || !supabaseUrl || !serviceKey) {
  console.error(
    "Database or Supabase administrator credentials are missing."
  );

  console.error(
    "Configure the services before provisioning accounts."
  );

  process.exit(1);
}

const supabase = createClient(
  supabaseUrl,
  serviceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

console.log("\nFUTURE MINDS — ACCOUNT PROVISIONING\n");

const { data, error } =
  await supabase.auth.admin.getUserById(authId);

if (error || !data.user) {
  console.error(
    "The Supabase authentication account could not be verified."
  );

  process.exit(1);
}

const authUser = data.user;

if (
  !authUser.email ||
  !authUser.email_confirmed_at
) {
  console.error(
    "Account must have a verified email before provisioning."
  );

  process.exit(1);
}

const email = authUser.email.trim().toLowerCase();

if (email.length > 254) {
  console.error("Invalid email address.");
  process.exit(1);
}

const terminal = readline.createInterface({
  input: stdin,
  output: stdout,
});

let fullName = "";

try {
  console.log("Verified Supabase identity found.");
  console.log("Requested role:", role);
  console.log("Account:", email);

  const enteredName = await terminal.question(
    "\nEnter the account holder's full name: "
  );

  fullName = enteredName.trim();

  if (
    fullName.length < 2 ||
    fullName.length > 150
  ) {
    throw new Error(
      "Full name must contain between 2 and 150 characters."
    );
  }

  console.log("\nACCOUNT PROVISIONING SUMMARY");
  console.log("Name:", fullName);
  console.log("Email:", email);
  console.log("Role:", role);

  if (
    role === "owner" ||
    role === "technical_admin"
  ) {
    console.log(
      "\nWARNING: This is a privileged administrative role."
    );
  }

  const expected = `ACTIVATE ${role}`;

  const confirmation = await terminal.question(
    `\nType "${expected}" to approve: `
  );

  if (confirmation.trim() !== expected) {
    console.log("Cancelled. No database changes made.");
    process.exit(0);
  }
} finally {
  terminal.close();
}

const client = new Client({
  connectionString: databaseUrl,
  connectionTimeoutMillis: 10000,
  application_name: "future-minds-provisioning",
});

await client.connect();

let transactionStarted = false;

try {
  await client.query("BEGIN");
  transactionStarted = true;

  await client.query(
    "SELECT pg_advisory_xact_lock(714299, 2027)"
  );

  const existing = await client.query(
    `
      SELECT id, auth_provider_id, email
      FROM app_users
      WHERE auth_provider_id = $1
         OR lower(email) = $2
      FOR UPDATE
    `,
    [authId, email]
  );

  if (
    existing.rows.some(
      (row) =>
        row.auth_provider_id &&
        row.auth_provider_id !== authId
    )
  ) {
    throw new Error(
      "This email is linked to a different authentication identity."
    );
  }

  if (existing.rows.length > 1) {
    throw new Error(
      "Conflicting user records detected. Manual review required."
    );
  }

  let appUserId;

  if (existing.rows.length === 1) {
    const row = existing.rows[0];

    const updated = await client.query(
      `
        UPDATE app_users
        SET
          auth_provider_id = $1,
          email = $2,
          full_name = $3,
          status = 'active',
          updated_at = now()
        WHERE id = $4
        RETURNING id
      `,
      [authId, email, fullName, row.id]
    );

    appUserId = updated.rows[0].id;
  } else {
    const inserted = await client.query(
      `
        INSERT INTO app_users (
          auth_provider_id,
          email,
          full_name,
          status
        )
        VALUES ($1, $2, $3, 'active')
        RETURNING id
      `,
      [authId, email, fullName]
    );

    appUserId = inserted.rows[0].id;
  }

  await client.query(
    `
      INSERT INTO user_role_assignments (
        user_id,
        role
      )
      VALUES ($1, $2::user_role)
      ON CONFLICT (user_id, role) DO NOTHING
    `,
    [appUserId, role]
  );

  if (role === "student") {
    await client.query(
      `
        INSERT INTO student_profiles (user_id)
        VALUES ($1)
        ON CONFLICT (user_id) DO NOTHING
      `,
      [appUserId]
    );
  }

  if (role === "teacher") {
    await client.query(
      `
        INSERT INTO teacher_profiles (user_id)
        VALUES ($1)
        ON CONFLICT (user_id) DO NOTHING
      `,
      [appUserId]
    );
  }

  await client.query(
    `
      INSERT INTO audit_logs (
        actor_id,
        action,
        entity_type,
        entity_id
      )
      VALUES (
        NULL,
        'account.provisioned.by_cli',
        'app_users',
        $1
      )
    `,
    [appUserId]
  );

  await client.query("COMMIT");
  transactionStarted = false;

  console.log("\nACCOUNT PROVISIONED SUCCESSFULLY");
  console.log("Role:", role);
  console.log("Status: active");
  console.log("Application user ID:", appUserId);
} catch (error) {
  if (transactionStarted) {
    await client.query("ROLLBACK");
  }

  console.error(
    "\nACCOUNT PROVISIONING FAILED:",
    error.message
  );

  process.exitCode = 1;
} finally {
  await client.end();
}
