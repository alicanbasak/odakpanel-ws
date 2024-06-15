const Factories = require("../models/Factories.model");
const Invoices = require("../models/Invoices.model");
const Member = require("../models/Member.model");
const { countRecords, findAllRecords } = require("../utils/crudHelper");
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
}

module.exports = new InvoicesService();
