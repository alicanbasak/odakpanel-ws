const router = require("express").Router();
const controller = require("../controllers/customers.controller");

router
  .route("/")
  .get(controller.getAllCustomers)
  .post(controller.createCustomer);

router
  .route("/:id")
  .get(controller.getCustomerById)
  .put(controller.updateCustomer)
  .delete(controller.deleteCustomer);

router.route("/customerFilters").get(controller.getCustomersByFilters);

module.exports = router;
