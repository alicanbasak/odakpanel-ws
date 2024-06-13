const { QueryTypes } = require("sequelize");
const handleAsync = require("../handlers/asyncHandler");
const { sequelize } = require("../db/connect");

class DistinctService {
  async getDistinct(tableName, columnName) {
    return await handleAsync(async () => {
      const query = `SELECT DISTINCT ${columnName} FROM ${tableName}`;
      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return result;
    });
  }
}

module.exports = new DistinctService();
