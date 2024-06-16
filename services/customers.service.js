const Customers = require("../models/Customers.model");
const {
  findAllRecords,
  createRecord,
  findRecordById,
  updateRecord,
  deleteRecord,
  countRecords,
} = require("../utils/crudHelper");
const buildWhereClauses = require("../utils/whereClausesBuilder");
class CustomerService {
  async getAllCustomers(page = 1, pageSize = 10, search) {
    const offset = (page - 1) * pageSize;

    const searchFields = ["Name"];

    const whereClauses = buildWhereClauses(search, searchFields);

    const totalCount = await countRecords(Customers, whereClauses);

    const customers = await findAllRecords(Customers, {
      where: whereClauses,
      offset: offset,
      limit: pageSize,
      order: [["Name", "ASC"]],
    });

    return {
      totalCount: totalCount,
      items: customers,
    };
  }

  async getCustomerById(id) {
    return await findRecordById(Customers, id);
  }

  async createCustomer(customer) {
    return await createRecord(Customers, customer);
  }

  async updateCustomer(id, updatedCustomer) {
    return await updateRecord(Customers, id, updatedCustomer);
  }

  async deleteCustomer(id) {
    return await deleteRecord(Customers, id);
  }

  async getCustomersByFilters() {
    return await findAllRecords(Customers, {
      order: [["Name", "ASC"]],
    });
  }
}

module.exports = new CustomerService();
