const fs = require("fs");
const mysql = require("mysql2/promise");
const { DB_CONNECTION_CONFIG, DB_NAME } = require("./src/database/config");

const migrate = async () => {
  const connection = await mysql.createConnection({
    ...DB_CONNECTION_CONFIG,
    multipleStatements: true,
  });

  await connection.query(`drop database if exists ${DB_NAME}`);
  await connection.query(`create database ${DB_NAME}`);
  await connection.query(`use ${DB_NAME}`);

  const sql = fs.readFileSync("./database.sql", "utf8");

  await connection.query(sql);

  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
