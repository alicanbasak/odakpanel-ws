const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connect");

const RfqStatus = sequelize.define(
  "RfqStatus",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "RfqStatus",
    timestamps: false,
  }
);

module.exports = RfqStatus;
