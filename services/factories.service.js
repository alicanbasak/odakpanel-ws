const sql = require("mssql");
const handleAsync = require("../handlers/asyncHandler");
const Factories = require("../models/Factories.model");

class FactoryService {
  async getAllFactories() {
    return await handleAsync(async () => {
      const pool = await sql.connect();
      const result = await pool.request().query("SELECT * FROM Factories");
      return result.recordset.map(record => new Factories(record));
    });
  }
}

module.exports = new FactoryService();
