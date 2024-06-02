// controllers/order.controller.js
const orderService = require("../services/orderList.service");

async function getAllOrders(req, res) {
  try {
    let {
      page,
      pageSize,
      factoryId,
      customerId,
      shipmentType,
      status,
      ccl,
      layers,
      search,
      excludeFactoryId,
      orderToBeSent,
      delay,
      dataWillBeSend, // Yeni parametre eklendi
    } = req.query;

    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    factoryId = factoryId ? factoryId.split(",") : [];
    customerId = customerId ? customerId.split(",") : [];

    const orders = await orderService.getAllOrders(
      page,
      pageSize,
      factoryId,
      customerId,
      shipmentType,
      status,
      ccl,
      layers,
      search,
      excludeFactoryId,
      orderToBeSent,
      delay,
      dataWillBeSend
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getOrderById(req, res) {
  const { id } = req.params;
  const order = await orderService.getOrderById(id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(order);
}

async function createOrder(req, res) {
  const order = req.body;
  const result = await orderService.createOrder(order);
  res.json(result);
}

async function updateOrder(req, res) {
  const { id } = req.params;
  const updatedOrder = req.body;
  const updatedCount = await orderService.updateOrder(id, updatedOrder);
  res.json({ updatedCount });
}

async function deleteOrder(req, res) {
  const { id } = req.params;
  const deletedCount = await orderService.deleteOrder(id);
  res.json({ deletedCount });
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
