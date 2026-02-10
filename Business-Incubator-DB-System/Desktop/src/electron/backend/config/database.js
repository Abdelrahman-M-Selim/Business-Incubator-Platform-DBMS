import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
  user: "incubator_user",
  host: "localhost",
  database: "incubator_db",
  password: "strongpassword",
  port: 5432,
});
console.log("Database connection pool created successfully");
export default pool;