const handleAsync = require("../handlers/asyncHandler");
const customersService = require("../services/customers.service");

const getCustomersByFilters = handleAsync(async (req, res) => {
  return await customersService.getCustomersByFilters();
});

const getAllCustomers = handleAsync(async (req, res) => {
  let { page, pageSize, search } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;
  return await customersService.getAllCustomers(
      page,
      pageSize,
      search
  );
});

const getCustomerById = handleAsync(async req => {
  const { id } = req.params;
  return await customersService.getCustomerById(id);
});

const createCustomer = handleAsync(async req => {
  const customer = req.body;
  return await customersService.createCustomer(customer);
});

const updateCustomer = handleAsync(async req => {
  const { id } = req.params;
  const updatedCustomer = req.body;
  return await customersService.updateCustomer(id, updatedCustomer);
});

const deleteCustomer = handleAsync(async req => {
  const { id } = req.params;
  return await customersService.deleteCustomer(id);
});

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomersByFilters,
};
