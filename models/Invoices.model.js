const { DataTypes } = require("sequelize");
const { sequelize } = require("../initializers/db");
const OrderList = require("./OrderList.model");
const Factories = require("./Factories.model");
const Member = require("./Member.model");

const Invoices = sequelize.define(
  "Invoices",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FactoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Factories,
        key: "Id",
      },
    },
    InvoiceDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    InvoiceNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ShipmentType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TrackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EstimatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ArrivalDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    PaidPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    IsPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    DatePaid: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Masraf: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    OrderListId: {
      type: DataTypes.INTEGER,
      references: {
        model: OrderList,
        key: "Id",
      },
      allowNull: true,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    CreatedById: {
      type: DataTypes.INTEGER,
      references: {
        model: Member,
        key: "Id",
      },
      allowNull: true,
    },
    DeleteDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    DeletedById: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Factories.hasMany(Invoices, { foreignKey: "Id" });
Invoices.belongsTo(Factories, { foreignKey: "FactoryId" });

OrderList.hasMany(Invoices, { foreignKey: "Id" });
Invoices.belongsTo(OrderList, { foreignKey: "OrderListId" });

Member.hasMany(Invoices, { foreignKey: "Id" });
Invoices.belongsTo(Member, { foreignKey: "CreatedById" });

module.exports = Invoices;
