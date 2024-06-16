const router = require("express").Router();

const controller = require("../controllers/invoices.controller");

router.route("/").get(controller.getInvoices).post(controller.createInvoice);

router
  .route("/:id")
  .get(controller.getInvoiceById)
  .put(controller.updateInvoice)
  .delete(controller.deleteInvoice);

module.exports = router;
