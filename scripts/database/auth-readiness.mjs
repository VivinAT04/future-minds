import dotenv from "dotenv";
dotenv.config({ path: ".env.local", quiet: true });

const required = {
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
};

console.log("FUTURE MINDS — AUTHENTICATION READINESS");

let ready = true;

for (const [name, value] of Object.entries(required)) {
  const configured = Boolean(value?.trim());

  console.log(
    `${name}: ${configured ? "CONFIGURED" : "MISSING"}`
  );

  if (!configured) ready = false;
}

if (ready) {
  console.log(
    "Configuration present. Database migrations, account provisioning and access tests are still required."
  );
} else {
  console.log(
    "Live authentication is not ready. Login must remain disabled."
  );
}
