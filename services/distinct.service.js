const { distinctRecords } = require("../utils/crudHelper");

class DistinctService {
  async getDistinct(tableName, columnName) {
    return await distinctRecords(columnName, tableName);
  }
}

module.exports = new DistinctService();
