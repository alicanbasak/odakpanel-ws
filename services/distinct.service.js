const { distinctRecords } = require("../utils/crudHelper");

class DistinctService {
  async getDistinct(tableName, columnName) {
    const result = await distinctRecords(columnName, tableName);
    return result;
  }
}

module.exports = new DistinctService();
