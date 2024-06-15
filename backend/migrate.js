const fs = require("fs");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

// Set proper environment variables for all backend files.
dotenv.config({ path: `.env.${process.env.NODE_ENV ?? "development"}` });

const isProduction = process.env.NODE_ENV === "production";
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const DB_URL = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const connectionConfig = isProduction
  ? DB_URL
  : {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    };

const migrate = async () => {
  const connection = await mysql.createConnection(connectionConfig);

  await connection.query(
    `drop database if exists ${
      isProduction ? process.env.MYSQLDATABASE : DB_NAME
    }`
  );
  await connection.query(
    `create database ${isProduction ? process.env.MYSQLDATABASE : DB_NAME}`
  );
  await connection.query(
    `use ${isProduction ? process.env.MYSQLDATABASE : DB_NAME}`
  );

  const sql = fs.readFileSync("./database.sql", "utf8");

  await connection.query(sql);

  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
