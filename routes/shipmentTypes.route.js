const router = require("express").Router();

const controller = require("../controllers/shipmentTypes.controller");

router
  .route("/")
  .get(controller.getAllShipmentTypes)
  .post(controller.createShipmentType);

router
  .route("/:id")
  .get(controller.getShipmentTypeById)
  .put(controller.updateShipmentType)
  .delete(controller.deleteShipmentType);

module.exports = router;
