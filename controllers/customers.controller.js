const handleAsync = require("../handlers/asyncHandler");
const customersService = require("../services/customers.service");

const getAllCustomers = handleAsync(async () => {
  const customers = await customersService.getAllCustomers();
  return customers;
});

module.exports = {
  getAllCustomers,
};
