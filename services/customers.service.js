const Customers = require("../models/Customers.model");
const { findAllRecords } = require("../utils/crudHelper");
class CustomerService {
  async getAllCustomers() {
    return await findAllRecords(Customers);
  }
}

module.exports = new CustomerService();
