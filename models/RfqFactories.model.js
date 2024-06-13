const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connect");
const Factories = require("./Factories.model");
const Rfqs = require("./Rfqs.model");

const RfqFactories = sequelize.define(
  "RfqFactories",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    RfqId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Rfqs,
        key: "Id",
      },
    },
    FactoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Factories,
        key: "Id",
      },
    },
    CreateDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    RfqFactoryStatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Lt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Unit: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Tooling: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Etest: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RfqKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ExpressLt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    StandartLt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

RfqFactories.belongsTo(Rfqs, {
  foreignKey: "RfqId",
});
RfqFactories.belongsTo(Factories, {
  foreignKey: "FactoryId",
});

module.exports = RfqFactories;
