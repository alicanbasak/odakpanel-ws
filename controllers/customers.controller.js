const handleAsync = require("../handlers/asyncHandler");
const customersService = require("../services/customers.service");

const getCustomersByFilters = handleAsync(async (req, res) => {
  const customers = await customersService.getCustomersByFilters();
  return customers;
});

const getAllCustomers = handleAsync(async (req, res) => {
  let { page, pageSize, search } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;
  const customers = await customersService.getAllCustomers(
    page,
    pageSize,
    search
  );
  return customers;
});

const getCustomerById = handleAsync(async req => {
  const { id } = req.params;
  const customer = await customersService.getCustomerById(id);
  return customer;
});

const createCustomer = handleAsync(async req => {
  const customer = req.body;
  const newCustomer = await customersService.createCustomer(customer);
  return newCustomer;
});

const updateCustomer = handleAsync(async req => {
  const { id } = req.params;
  const updatedCustomer = req.body;
  const customer = await customersService.updateCustomer(id, updatedCustomer);
  return customer;
});

const deleteCustomer = handleAsync(async req => {
  const { id } = req.params;
  const customer = await customersService.deleteCustomer(id);
  return customer;
});

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomersByFilters,
};
