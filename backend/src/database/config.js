const dotenv = require("dotenv");

// Set proper environment variables for all backend files.
dotenv.config({ path: `.env.${process.env.NODE_ENV ?? "development"}` });

const isProduction = process.env.NODE_ENV === "production";

// Database connection configuration for development.
const DEV_DB_CONFIG = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Database connection string for production (Railway env. variables).
const PROD_DB_URL = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const DB_CONNECTION_CONFIG = isProduction ? PROD_DB_URL : DEV_DB_CONFIG;

const DB_NAME = isProduction ? process.env.MYSQLDATABASE : process.env.DB_NAME;

module.exports = { isProduction, DB_CONNECTION_CONFIG, DB_NAME };
