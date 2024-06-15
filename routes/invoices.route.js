const router = require("express").Router();

const { getInvoices } = require("../controllers/invoices.controller");

router.get("/", getInvoices);

module.exports = router;
