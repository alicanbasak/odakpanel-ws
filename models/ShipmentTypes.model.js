const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../initializers/db");
// id, ShipmentType, ShipmentRate, UpdatedAt,

const ShipmentTypes = sequelize.define(
  "ShipmentTypes",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ShipmentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ShipmentRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ShipmentTypes;
