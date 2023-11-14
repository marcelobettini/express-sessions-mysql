const mysql = require("mysql2/promise");
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_USERS,
};
const pool = mysql.createPool(dbConfig);

module.exports = pool;
