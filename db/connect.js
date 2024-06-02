const sql = require("mssql");

require("dotenv").config();
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true,
  },
};

async function connectDatabase() {
  try {
    await sql.connect(sqlConfig);
    console.log("Connected to MSSQL");
  } catch (error) {
    console.error("MSSQL connection error:", error);
  }
}

async function disconnectDatabase() {
  try {
    await sql.close();
    console.log("Disconnected from MSSQL");
  } catch (error) {
    console.error("Error closing MSSQL connection:", error);
  }
}

module.exports = { connectDatabase, disconnectDatabase };
