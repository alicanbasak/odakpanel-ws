const handleAsync = require('../handlers/asyncHandler')
const customersService = require('../services/customers.service')

async function getAllCustomers(req, res) {
  const customers = await handleAsync(() => customersService.getAllCustomers())
  res.json(customers)
}

module.exports = {
  getAllCustomers,
}