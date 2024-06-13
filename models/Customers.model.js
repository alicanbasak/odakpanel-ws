const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db/connect");

const Customers = sequelize.define(
  "Customers",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    tableName: "Customers",
    timestamps: false,
  }
);

module.exports = Customers;
