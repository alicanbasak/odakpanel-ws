const sql = require("mssql");
const handleAsync = require("../handlers/asyncHandler");
const ShipmentTypes = require("../models/ShipmentTypes.model");

class ShipmentTypesService {
  async getAllShipmentTypes() {
    return await handleAsync(async () => {
      const pool = await sql.connect();
      const result = await pool.request().query("SELECT * FROM ShipmentTypes");
      return result.recordset.map(record => new ShipmentTypes(record));
    });
  }
}

module.exports = new ShipmentTypesService();
