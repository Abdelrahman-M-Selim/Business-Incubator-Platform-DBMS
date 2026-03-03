import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || "incubator_user",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "incubator_db",
  password: process.env.DB_PASS || "strongpassword",
  port: process.env.DB_PORT || 5432,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export default pool;
