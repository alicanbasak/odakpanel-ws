const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    dialect: "mssql",
    dialectOptions: {
      options: {
        trustServerCertificate: true,
        dateStrings: true,
        typeCast: true,
      },
    },
  }
);

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to MSSQL database");
  } catch (error) {
    console.error("MSSQL connection error:", error);
  }
}

async function disconnectDatabase() {
  try {
    await sequelize.close();
    console.log("Disconnected from MSSQL database");
  } catch (error) {
    console.error("Error closing MSSQL connection:", error);
  }
}

module.exports = { sequelize, connectDatabase, disconnectDatabase };
