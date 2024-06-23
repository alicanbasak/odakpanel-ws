const Factories = require("../models/Factories.model");
const {
  findAllRecords,
  createRecord,
  findRecordById,
  deleteRecord,
  updateRecord,
  countRecords,
} = require("../utils/crudHelper");
const buildWhereClauses = require("../utils/whereClausesBuilder");

class FactoryService {
  async getAllFactories(page = 1, pageSize = 10, search) {
    const offset = (page - 1) * pageSize;
    const searchFields = ["Name"];
    const whereClauses = buildWhereClauses(search, searchFields);

    const factories = await findAllRecords(Factories, {
      where: whereClauses,
      offset,
      limit: pageSize,
      order: [["Id", "DESC"]],
    });

    const totalCount = await countRecords(Factories, whereClauses);
    return { totalCount: totalCount, items: factories };
  }

  async getFactoryById(id) {
    return await findRecordById(Factories, id);
  }

  async createFactory(factory) {
    return await createRecord(Factories, factory);
  }

  async updateFactory(id, updatedFactory) {
    return await updateRecord(Factories, id, updatedFactory);
  }

  async deleteFactory(id) {
    return await deleteRecord(Factories, id);
  }
}

module.exports = new FactoryService();
