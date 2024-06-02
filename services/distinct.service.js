const sql = require('mssql');
const handleAsync = require("../handlers/asyncHandler");

class DistinctService {
  async getDistinct(tableName, columnName) {
    return await handleAsync(async () => {
      const pool = await sql.connect();
      const result = await pool.request().query(`SELECT DISTINCT ${columnName} FROM ${tableName}`);
      return result.recordset.map(record => record[columnName]);
    });
  }
}


module.exports = new DistinctService();