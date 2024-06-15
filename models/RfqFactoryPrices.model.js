const { DataTypes } = require("sequelize");
const { sequelize } = require("../initializers/db");
const Factories = require("./Factories.model");

const RfqFactoryPrices = sequelize.define(
  "RfqFactoryPrices",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    RfqFactoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "RfqFactories",
        key: "Id",
      },
    },
    Tip: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Adet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ExpLt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Lt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ExpUnit: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Unit: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    ExpTooling: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Tooling: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    ExpTest: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

RfqFactoryPrices.belongsTo(Factories, {
  foreignKey: "RfqFactoryId",
});

module.exports = RfqFactoryPrices;
