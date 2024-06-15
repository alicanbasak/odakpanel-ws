const OrderList = require("../models/OrderList.model");
const Factories = require("../models/Factories.model");
const Customers = require("../models/Customers.model");
const { Op, literal } = require("sequelize");
const {
  createRecord,
  findRecordById,
  updateRecord,
  deleteRecord,
  countRecords,
  findAllRecords,
} = require("../utils/crudHelper");
const buildWhereClauses = require("../utils/whereClausesBuilder");
const addWhereClause = require("../utils/addWhereClause");

class OrderService {
  async getAllOrders(
    page = 1,
    pageSize = 10,
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
  ) {
    const offset = (page - 1) * pageSize;
    const whereClauses = buildWhereClauses(search);

    addWhereClause(whereClauses, "FactoryId", factoryId);
    addWhereClause(whereClauses, "CustomerId", customerId);
    addWhereClause(whereClauses, "ShipmentType", shipmentType, true);
    addWhereClause(whereClauses, "Layers", layers, true);
    addWhereClause(whereClauses, "Ccl", ccl, true);
    addWhereClause(whereClauses, "Status", status, true);

    if (excludeFactoryId) {
      whereClauses["FactoryId"] = { [Op.ne]: excludeFactoryId };
    }

    if (orderToBeSent) {
      whereClauses["FactoryId"] = orderToBeSent;
    }

    if (delay === "true") {
      whereClauses[Op.and] = [
        literal(
          "DATEDIFF(day, ShipmentDate, GETDATE()) > 0 AND Status = 'üretimde'"
        ),
      ];
    }

    if (dataWillBeSend === "true") {
      whereClauses[Op.and] = [
        literal(
          "DataStatus IN ('3', '5')  AND IsSend = 0 AND FilmDurumu = 'DÜZELTME'"
        ),
      ];
    }

    const totalCount = await countRecords(OrderList, whereClauses);
    const orders = await findAllRecords(OrderList, {
      where: whereClauses,
      include: [
        { model: Factories, attributes: ["Name"] },
        { model: Customers, attributes: ["Name"] },
      ],
      offset: offset,
      limit: pageSize,
      order: [["Id", "DESC"]],
    });

    const ordersWithCustomerNames = orders.map(order => ({
      ...order.toJSON(),
      CustomerName: order.Customer ? order.Customer.Name : null,
    }));

    return {
      totalCount: totalCount,
      items: ordersWithCustomerNames,
    };
  }

  async getOrderById(id) {
    return await findRecordById(OrderList, id);
  }

  async createOrder(order) {
    return await createRecord(OrderList, order);
  }

  async updateOrder(id, updatedOrder) {
    return await updateRecord(OrderList, id, updatedOrder);
  }

  async deleteOrder(id) {
    return await deleteRecord(OrderList, id);
  }
}

module.exports = new OrderService();
