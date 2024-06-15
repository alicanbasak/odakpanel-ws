const handleAsync = require("../handlers/asyncHandler");
const invoicesService = require("../services/invoices.service");

const getInvoices = handleAsync(async (req, res) => {
  let { page, pagesize, search } = req.query;
  page = parseInt(page) || 1;
  pagesize = parseInt(pagesize) || 10;

  const invoices = await invoicesService.getInvoices(page, pagesize, search);
  return invoices;
});

module.exports = {
  getInvoices,
};
