import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const rolesSource = fs.readFileSync(
  "src/lib/auth/roles.ts",
  "utf8"
);

const sessionSource = fs.readFileSync(
  "src/lib/auth/session.ts",
  "utf8"
);

const guardsSource = fs.readFileSync(
  "src/lib/auth/guards.ts",
  "utf8"
);

const provisioningSource = fs.readFileSync(
  "scripts/auth/provision-user.mjs",
  "utf8"
);

test("all four application roles are defined", () => {
  for (const role of [
    "owner",
    "technical_admin",
    "teacher",
    "student",
  ]) {
    assert.ok(
      rolesSource.includes(`"${role}"`),
      `Missing role: ${role}`
    );
  }
});

test("authentication uses verified Supabase users", () => {
  assert.match(
    sessionSource,
    /auth\.getUser\(\)/
  );
});

test("application accounts must be active", () => {
  assert.match(
    sessionSource,
    /status = 'active'/
  );
});

test("application roles come from database assignments", () => {
  assert.match(
    sessionSource,
    /user_role_assignments/
  );
});

test("portal guards enforce exact roles", () => {
  assert.match(
    guardsSource,
    /hasRole\(user, role\)/
  );
});

test("account provisioning requires confirmation", () => {
  assert.match(
    provisioningSource,
    /ACTIVATE \$\{role\}/
  );
});

test("account provisioning verifies Supabase identity", () => {
  assert.match(
    provisioningSource,
    /auth\.admin\.getUserById/
  );
});

test("account provisioning requires verified email", () => {
  assert.match(
    provisioningSource,
    /email_confirmed_at/
  );
});

test("account provisioning is transactional", () => {
  assert.match(
    provisioningSource,
    /query\("BEGIN"\)/
  );

  assert.match(
    provisioningSource,
    /query\("COMMIT"\)/
  );

  assert.match(
    provisioningSource,
    /query\("ROLLBACK"\)/
  );
});
