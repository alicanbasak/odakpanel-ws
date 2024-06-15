const router = require("express").Router();

const shipmentTypesController = require("../controllers/shipmentTypes.controller");

router.get("/", shipmentTypesController.getAllShipmentTypes);

module.exports = router;
