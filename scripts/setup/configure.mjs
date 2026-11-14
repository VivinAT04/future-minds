import fs from "node:fs";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const filename = ".env.local";

const required = [
  {
    name: "DATABASE_URL",
    label: "PostgreSQL connection URL",
    prefix: ["postgresql:", "postgres:"],
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    label: "Supabase project URL",
    prefix: ["https:"],
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    label: "Supabase publishable key",
  },
];

if (!stdin.isTTY || !stdout.isTTY) {
  console.error("Run this command in an interactive terminal.");
  process.exit(1);
}

if (fs.existsSync(filename)) {
  const stat = fs.lstatSync(filename);

  if (!stat.isFile() || stat.isSymbolicLink()) {
    throw new Error(
      ".env.local must be a regular file, not a symbolic link."
    );
  }
}

function parseExisting(content) {
  const result = new Map();

  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);

    if (match) {
      result.set(match[1], match[2]);
    }
  }

  return result;
}

function valid(name, value, prefixes) {
  if (!value || /[\r\n]/.test(value)) {
    return false;
  }

  if (name === "DATABASE_URL") {
    try {
      const url = new URL(value);

      return (
        prefixes.includes(url.protocol) &&
        Boolean(url.hostname) &&
        Boolean(url.username) &&
        Boolean(url.password)
      );
    } catch {
      return false;
    }
  }

  if (name === "NEXT_PUBLIC_SUPABASE_URL") {
    try {
      const url = new URL(value);

      return (
        url.protocol === "https:" &&
        Boolean(url.hostname) &&
        !url.username &&
        !url.password &&
        !url.search &&
        !url.hash
      );
    } catch {
      return false;
    }
  }

  return (
    value.length >= 15 &&
    !/[\s"'`]/.test(value)
  );
}

const original = fs.existsSync(filename)
  ? fs.readFileSync(filename, "utf8")
  : "";

const existing = parseExisting(original);
const values = new Map(existing);

const terminal = readline.createInterface({
  input: stdin,
  output: stdout,
});

console.log("\nFuture Minds — Secure Local Configuration");
console.log("No credentials are sent to GitHub.");
console.log("Input is local to this terminal.");
console.log("Use trusted provider-issued values only.\n");

try {
  for (const item of required) {
    const current = existing.get(item.name);

    if (current) {
      const answer = (
        await terminal.question(
          `${item.label}: already configured. Keep it? [Y/n] `
        )
      ).trim().toLowerCase();

      if (answer !== "n") {
        continue;
      }
    }

    console.log(
      `Enter ${item.label} (input is visible in the terminal):`
    );

    const answer = (
      await terminal.question("> ")
    ).trim();

    if (!valid(item.name, answer, item.prefix || [])) {
      throw new Error(
        `Invalid configuration format: ${item.name}`
      );
    }

    values.set(item.name, answer);
  }
} finally {
  terminal.close();
}

for (const item of required) {
  const value = values.get(item.name);

  if (!valid(item.name, value, item.prefix || [])) {
    throw new Error(
      `Missing or invalid configuration: ${item.name}`
    );
  }
}

const names = new Set(required.map((item) => item.name));

const retained = original
  .split(/\r?\n/)
  .filter((line) => {
    const match = line.match(/^([A-Z][A-Z0-9_]*)=/);

    return !match || !names.has(match[1]);
  })
  .join("\n")
  .trimEnd();

const additions = required
  .map(({ name }) => {
    const value = values.get(name);

    return `${name}=${JSON.stringify(value)}`;
  })
  .join("\n");

const output = [retained, additions]
  .filter(Boolean)
  .join("\n\n") + "\n";

const temporary = `${filename}.tmp`;

try {
  fs.writeFileSync(temporary, output, {
    mode: 0o600,
    flag: "wx",
  });

  fs.renameSync(temporary, filename);
  fs.chmodSync(filename, 0o600);
} catch (error) {
  if (fs.existsSync(temporary)) {
    fs.unlinkSync(temporary);
  }

  throw error;
}

console.log("\nConfiguration saved securely.");
console.log("File: .env.local");
console.log("Permissions: owner read/write only");
console.log("No database changes executed.");
console.log("No accounts created.");
