const { QueryTypes } = require("sequelize");
const { sequelize } = require("../initializers/db");
const convertExcelDateAndFormat = require("../utils/convertExcelDateAndFormat");
const createRecord = async (model, data) => {
  return model.create(data);
};

const findRecordById = async (model, id) => {
  return await model.findByPk(id);
};

const updateRecord = async (model, id, data) => {
  return await model.update(data, {
    where: { Id: id },
  });
};

const deleteRecord = async (model, id) => {
  return await model.destroy({
    where: { Id: id },
  });
};
const countRecords = async (model, whereClauses) => {
  return await model.count({ where: whereClauses });
};

const findAllRecords = async (model, options) => {
  return await model.findAll(options);
};

const distinctRecords = async (columnName, tableName) => {
  const query = `SELECT DISTINCT ${columnName} FROM ${tableName}`;
  const result = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return result;
};

const findRecordByField = async (model, field, value) => {
  return await model.findOne({
    where: { [field]: value },
  });
};

// this only for orders and rfqs
const importRecordsWithExcel = async (model, data) => {
  for (const row of data) {
    await model.create({
      Factory: row["FACTORY"],
      Gerber: row["GERBER#"],
      OdakCode: row["ODAK CODE"],
      OrderNumber: row["ORDER#"],
      CustomerCode: row["CUSTOMER CODE"],
      OdakOrderNumber: row["ODAK ORDER NUMBER"],
      TeslimatTarihi: convertExcelDateAndFormat(row["TESLİM TARİHİ"]),
      ShipmentDate: null,
      ShipmentRate: null,
      ShipmentType: null,
      Layers: row["LAYER"],
      Ccl: row["CCL"],
      CclThickness: row["CCL THICKNESS"],
      CopperThickness: row["COPPER THICKNESS"],
      Finishing: row["FINISHING"],
      LpiColorTop: row["LPI COLOR (TOP LAYER)"],
      LpiColorBot: row["LPI COLOR (BOT LAYER)"],
      LegendPrintTop: row["LEGEND PRINT (TOP)"],
      LegendPrintBot: row["LEGEND PRINT (BOT)"],
      SpecialPrints1: row["SPECIAL PRINTS-1"],
      SpecialPrints2: row["SPECIAL PRINTS-2"],
      SpecialProcess1: row["SPECIAL PROCESS-1"],
      SpecialProcess2: row["SPECIAL PROCESS-2"],
      SpecialProcess3: row["SPECIAL PROCESS-3"],
      SpecialProcess4: row["SPECIAL PROCESS-4"],
      SpecialProcess5: row["SPECIAL PROCESS-5"],
      SpecialProcess6: row["SPECIAL PROCESS-6"],
      PanelSizeX: row["PANEL SIZE (X)"],
      PanelSizeY: row["PANEL SIZE (Y)"],
      PanelX: row["PANELIZATION (X)"],
      PanelY: row["PANELIZATION (Y)"],
      VCutRemainingThickness: row["VCUT REMAINING"],
      VCutTolerance: row["VCUT TOLERANCE"],
      Amount: row["AMOUNT"],
      OrderM2: row["ORDER M2"],
      OrderTotal: row["ORDER TOTAL"],
      IthalatMasraf: row["ITHALAT MASRAF"],
      TotalMaliyet: row["TOTAL MALIYET"],
      Fiyat: row["FİYAT"],
      ETest: row["E-TEST"],
      Tooling: row["TOOLING"],
      OnayTarihi: row["ONAY TARİHİ"],
      FilmDurumu: row["FİLM DURUMU"],
      Note: null,
      Status: row["STATUS"],
      Remark: row["ÖZEL AÇIKLAMA"],
      FabrikayaGiris: row["FABRIKAYA GİRİŞ"],
      TahminiVaris: row["ARRIVAL DATE"],
      Defect: null,
      RejectionRepair: null,
      DefectedQuantitiy: null,
      m2: null,
      CreatedAt: new Date(),
      CreatedBy: 1,
      RepeatOfGerber: null,
      Profit: null,
      DataStatus: 3, // not null
      IsSend: false,
      ToolingAlis: null,
      m2Birim: null,
      m2SatisFiyat: row["ORDER M2"],
      DuzeltmeNotu: null,
      DeletedAt: null,
      DeletedBy: null,
      PcbSizeX: row["PCB SIZE(X)"],
      PcbSizeY: row["PCB SIZE(Y)"],
      SatisElemani: row["SATIŞ ELEMANI KODU"],
      EkAdet1: row["EK ADET-1"],
      EkAdet2: row["EK ADET-2"],
      EkAdet3: row["EK ADET-3"],
      EkAdet4: row["EK ADET-4"],
      EkAdet5: row["EK ADET-5"],
      HasRfq: true,
      CustomerId: 3791,
      FactoryId: 82,
    });
  }

  return {
    message: "Data imported successfully",
  };
};

module.exports = {
  createRecord,
  findRecordById,
  updateRecord,
  deleteRecord,
  countRecords,
  findAllRecords,
  distinctRecords,
  findRecordByField,
  importRecordsWithExcel,
};
