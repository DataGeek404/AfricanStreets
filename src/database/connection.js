
const mysql = require('mysql2/promise');
const logger = require('../utils/logger');

// Connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST|| "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "astm_db",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectDB = async () => {
  try {
    await pool.getConnection();
    logger.info('MySQL database connected successfully');
  } catch (error) {
    logger.error(`Error connecting to MySQL: ${error.message}`);
    process.exit(1);
  }
};

const executeQuery = async (sql, params = []) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    logger.error(`Database query error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  connectDB,
  executeQuery,
  pool
};
