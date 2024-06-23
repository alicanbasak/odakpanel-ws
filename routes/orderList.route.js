const router = require("express").Router();
const controller = require("../controllers/orderList.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
router
  .route("/")
  .get(controller.getAllOrders)
  .post(upload.single("file"), controller.createOrder);

router
  .route("/:id")
  .get(controller.getOrderById)
  .put(controller.updateOrder)
  .delete(controller.deleteOrder);

module.exports = router;
