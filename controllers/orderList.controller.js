const orderService = require("../services/orderList.service");
const handleAsync = require("../handlers/asyncHandler");
const getFileFromExcel = require("../utils/getFileFromExcel");

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
  const data = getFileFromExcel(req);

  const createdOrder = await orderService.createOrder(data);
  return { createdOrder };
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

// this function will convert to a service function
const deleteMultipleOrders = handleAsync(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ message: "IDs must be provided as an array" });
  }

  const results = await Promise.all(
    ids.map(async id => {
      try {
        await orderService.deleteOrder(id);
        return { id, message: "Order deleted successfully" };
      } catch (error) {
        console.error("Error deleting Order with ID:", id, error);
        return { id, message: "Error deleting Order" };
      }
    })
  );

  return {
    statusCode: 200,
    message: "Multiple Orders deleted successfully",
    results,
  };
});

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  deleteMultipleOrders,
};
