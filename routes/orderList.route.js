const router = require("express").Router();
const controller = require("../controllers/orderList.controller");

router.route("/").get(controller.getAllOrders);
// .post(controller.createOrder);

router.route("/:id").get(controller.getOrderById);
// .put(controller.updateOrder)
// .delete(controller.deleteOrder);

module.exports = router;
