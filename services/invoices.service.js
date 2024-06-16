const Factories = require("../models/Factories.model");
const Invoices = require("../models/Invoices.model");
const Member = require("../models/Member.model");
const {
  countRecords,
  findAllRecords,
  findRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
} = require("../utils/crudHelper");
const buildWhereClauses = require("../utils/whereClausesBuilder");
const OrderList = require("../models/OrderList.model");

class InvoicesService {
  async getInvoices(page = 1, pagesize = 10, search) {
    const offset = (page - 1) * pagesize;
    const searchFields = [
      "InvoiceNumber",
      "ShipmentType",
      "TrackingNumber",
      "Note",
    ];
    const whereClauses = buildWhereClauses(search, searchFields);

    const invoices = await findAllRecords(Invoices, {
      where: whereClauses,
      include: [
        { model: Factories, attributes: ["Name"] },
        { model: OrderList, attributes: ["OrderNumber"] },
        { model: Member, attributes: ["Username"] },
      ],
      offset,
      limit: pagesize,
      order: [["Id", "DESC"]],
    });

    const totalCount = await countRecords(Invoices, whereClauses);
    return { totalCount: totalCount, items: invoices };
  }

  async getInvoiceById(id) {
    return await findRecordById(Invoices, id, {
      include: [
        { model: Factories, attributes: ["Name"] },
        { model: OrderList, attributes: ["OrderNumber"] },
        { model: Member, attributes: ["Username"] },
      ],
    });
  }

  async createInvoice(data) {
    return await createRecord(Invoices, data);
  }

  async updateInvoice(id, data) {
    return await updateRecord(Invoices, id, data);
  }

  async deleteInvoice(id) {
    return await deleteRecord(Invoices, id);
  }
}

module.exports = new InvoicesService();
