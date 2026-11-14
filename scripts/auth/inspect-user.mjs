import dotenv from "dotenv";
import pg from "pg";

dotenv.config({
  path: ".env.local",
  quiet: true,
});

const { Client } = pg;

const authId = process.argv[2];

if (
  !authId ||
  !/^[0-9a-f-]{36}$/i.test(authId)
) {
  console.error(
    "Usage: npm run auth:inspect -- AUTH_USER_UUID"
  );

  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing.");
  process.exit(1);
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  application_name: "future-minds-account-inspection",
});

try {
  await client.connect();

  const result = await client.query(
    `
      SELECT
        u.id,
        u.email,
        u.full_name,
        u.status,
        COALESCE(
          array_agg(r.role::text)
            FILTER (WHERE r.role IS NOT NULL),
          ARRAY[]::text[]
        ) AS roles
      FROM app_users u
      LEFT JOIN user_role_assignments r
        ON r.user_id = u.id
      WHERE u.auth_provider_id = $1
      GROUP BY
        u.id,
        u.email,
        u.full_name,
        u.status
    `,
    [authId]
  );

  if (!result.rowCount) {
    console.log("No application account found.");
  } else {
    const user = result.rows[0];

    console.log("\nFUTURE MINDS ACCOUNT");
    console.log("Name:", user.full_name);
    console.log("Email:", user.email);
    console.log("Status:", user.status);
    console.log("Roles:", user.roles.join(", "));
  }
} catch (error) {
  console.error(
    "Account inspection failed:",
    error.message
  );

  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
