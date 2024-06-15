const router = require("express").Router();
const customersController = require("../controllers/customers.controller");

router.get("/", customersController.getAllCustomers);
module.exports = router;
