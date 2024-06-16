const handleAsync = require("../handlers/asyncHandler");
const invoicesService = require("../services/invoices.service");

const getInvoices = handleAsync(async (req, res) => {
  let { page, pageSize, search } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;

  const invoices = await invoicesService.getInvoices(page, pageSize, search);
  return invoices;
});

const getInvoiceById = handleAsync(async (req, res) => {
  const { id } = req.params;
  const invoice = await invoicesService.getInvoiceById(id);
  return invoice;
});

const createInvoice = handleAsync(async (req, res) => {
  const data = req.body;
  const invoice = await invoicesService.createInvoice(data);
  return invoice;
});

const updateInvoice = handleAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const invoice = await invoicesService.updateInvoice(id, data);
  return invoice;
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
