const handleAsync = require("../handlers/asyncHandler");
const Customers = require("../models/Customers.model");

class CustomerService {
  async getAllCustomers() {
    return await handleAsync(async () => {
      const customers = await Customers.findAll();
      return customers;
    });
  }
}

module.exports = new CustomerService();
