const handleAsync = require("../handlers/asyncHandler");
const invoicesService = require("../services/invoices.service");

const getInvoices = handleAsync(async (req, res) => {
  let { page, pageSize, search } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;

  return await invoicesService.getInvoices(page, pageSize, search);
});

const getInvoiceById = handleAsync(async (req, res) => {
  const { id } = req.params;
  return await invoicesService.getInvoiceById(id);
});

const createInvoice = handleAsync(async (req, res) => {
  const data = req.body;
  return await invoicesService.createInvoice(data);
});

const updateInvoice = handleAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  return await invoicesService.updateInvoice(id, data);
});

const deleteInvoice = handleAsync(async (req, res) => {
  const { id } = req.params;
  await invoicesService.deleteInvoice(id);
  return res.status(204).send();
});

module.exports = {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
