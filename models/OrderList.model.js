const { DataTypes } = require("sequelize");
const { sequelize } = require("../initializers/db");
const Factories = require("./Factories.model");
const Customers = require("./Customers.model");

const OrderList = sequelize.define(
  "OrderList",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Gerber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OdakCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OrderNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CustomerCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OdakOrderNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TeslimatTarihi: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ShipmentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ShipmentRate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ShipmentType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Layers: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Ccl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CclThickness: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CopperThickness: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Finishing: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LpiColorTop: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LpiColorBot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LegendPrintTop: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LegendPrintBot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SpecialPrints1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SpecialPrints2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SpecialProcess1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SpecialProcess2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SpecialProcess3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SpecialProcess4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SpecialProcess5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SpecialProcess6: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PanelSizeX: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PanelSizeY: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PanelX: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Panelization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PanelY: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    VCutRemainingThickness: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    VCutTolerance: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Amount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OrderM2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OrderTotal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IthalatMasraf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TotalMaliyet: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Fiyat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ETest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Tooling: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OnayTarihi: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    FilmDurumu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FabrikayaGiris: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TahminiVaris: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Defect: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RejectionRepair: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DefectedQuantitiy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    m2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Customers",
        key: "Id",
      },
    },
    FactoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Factories",
        key: "Id",
      },
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    CreatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RepeatOfGerber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Profit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DataStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IsSend: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ToolingAlis: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    m2Birim: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    m2SatisFiyat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DuzeltmeNotu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    DeletedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PcbSizeX: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PcbSizeY: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SatisElemani: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EkAdet1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EkAdet2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EkAdet3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EkAdet4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EkAdet5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Factories.hasMany(OrderList, { foreignKey: "FactoryId" });
OrderList.belongsTo(Factories, { foreignKey: "FactoryId" });

Customers.hasMany(OrderList, { foreignKey: "CustomerId" });
OrderList.belongsTo(Customers, { foreignKey: "CustomerId" });

module.exports = OrderList;
