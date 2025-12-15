import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "dtales_db",
  user: "dtales_admin",
  password: "StrongPassword123",
});

pool.on("connect", () => {
  console.log("🐘 PostgreSQL connected");
});

export default pool;

