import "server-only";

import { Pool } from "pg";

const globalForDatabase = globalThis as typeof globalThis & {
  futureMindsPool?: Pool;
};

export function getDatabasePool(): Pool {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Future Minds database has not been configured."
    );
  }

  if (!globalForDatabase.futureMindsPool) {
    globalForDatabase.futureMindsPool = new Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      application_name: "future-minds",
    });
  }

  return globalForDatabase.futureMindsPool;
}
