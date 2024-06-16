const router = require("express").Router();

const controller = require("../controllers/rfq.controller");

router.route("/").get(controller.getRfqList).post(controller.createRfq);

router
  .route("/:id")
  .get(controller.getRfqById)
  .put(controller.updateRfq)
  .delete(controller.deleteRfq);

module.exports = router;
