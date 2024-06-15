const orderService = require("../services/orderList.service");
const handleAsync = require("../handlers/asyncHandler");

const getAllOrders = handleAsync(async (req, res) => {
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
    dataWillBeSend,
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

  return orders;
});

const getOrderById = handleAsync(async (req, res) => {
  const { id } = req.params;
  const order = await orderService.getOrderById(id);
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
});

const createOrder = handleAsync(async (req, res) => {
  const order = req.body;
  const result = await orderService.createOrder(order);
  return result;
});

const updateOrder = handleAsync(async (req, res) => {
  const { id } = req.params;
  const updatedOrder = req.body;
  const updatedCount = await orderService.updateOrder(id, updatedOrder);
  return { updatedCount };
});

const deleteOrder = handleAsync(async (req, res) => {
  const { id } = req.params;
  const deletedCount = await orderService.deleteOrder(id);
  return { deletedCount };
});

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
