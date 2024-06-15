const buildWhereClauses = require("../utils/whereClausesBuilder");
const Factories = require("../models/Factories.model");
const Customers = require("../models/Customers.model");
const Rfqs = require("../models/Rfqs.model");
const {
  createRecord,
  findRecordById,
  updateRecord,
  deleteRecord,
  countRecords,
  findAllRecords,
} = require("../utils/crudHelper");

class RfqService {
  async getRfqList(page = 1, pageSize = 10, search) {
    const offset = (page - 1) * pageSize;
    const whereClauses = buildWhereClauses(search);

    const totalCount = await countRecords(Rfqs, whereClauses);

    const rfqs = await findAllRecords(Rfqs, {
      where: whereClauses,
      include: [
        { model: Factories, attributes: ["Name"] },
        { model: Customers, attributes: ["Name"] },
      ],
      offset: offset,
      limit: pageSize,
      order: [["Id", "DESC"]],
    });

    return {
      totalCount: totalCount,
      items: rfqs,
    };
  }

  async getRfqById(id) {
    return await findRecordById(Rfqs, id);
  }

  async createRfq(rfq) {
    return await createRecord(Rfqs, rfq);
  }

  async updateRfq(id, updatedRfq) {
    return await updateRecord(Rfqs, id, updatedRfq);
  }
  async deleteRfq(id) {
    return await deleteRecord(Rfqs, id);
  }
}

module.exports = new RfqService();
