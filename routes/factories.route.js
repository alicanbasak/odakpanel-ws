const router = require("express").Router();
const controller = require("../controllers/factories.controller");

router
  .route("/")
  .get(controller.getAllFactories)
  .post(controller.createFactory);

router
  .route("/:id")
  .get(controller.getFactoryById)
  .put(controller.updateFactory)
  .delete(controller.deleteFactory);

module.exports = router;
