const handleAsync = require("../handlers/asyncHandler");
const OrderList = require("../models/OrderList.model");
const Factories = require("../models/Factories.model");
const Customers = require("../models/Customers.model");
const { literal, Op } = require("sequelize");

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
    const whereClauses = {};

    const addWhereClause = (
      field,
      value,
      isString = false,
      exclude = false
    ) => {
      if (value && value.length > 0) {
        const valueList = isString ? value.split(",") : value;
        whereClauses[field] = exclude
          ? { [Op.notIn]: valueList }
          : { [Op.in]: valueList };
      }
    };

    addWhereClause("FactoryId", factoryId);
    addWhereClause("CustomerId", customerId);
    addWhereClause("ShipmentType", shipmentType, true);
    addWhereClause("Layers", layers, true);
    addWhereClause("Ccl", ccl, true);
    addWhereClause("Status", status, true);

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

    if (search) {
      whereClauses[Op.or] = [
        { Id: { [Op.like]: `%${search}%` } },
        { Gerber: { [Op.like]: `%${search}%` } },
        { OdakCode: { [Op.like]: `%${search}%` } },
        { OrderNumber: { [Op.like]: `%${search}%` } },
        { CustomerCode: { [Op.like]: `%${search}%` } },
        { OdakOrderNumber: { [Op.like]: `%${search}%` } },
      ];
    }

    try {
      const totalCount = await OrderList.count({ where: whereClauses });

      const orders = await OrderList.findAll({
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
    } catch (error) {
      throw new Error("Failed to fetch orders");
    }
  }

  async getOrderById(id) {
    return await handleAsync(async () => {
      const result = await OrderList.findByPk(id, {
        include: [Factories, Customers],
      });
      return result;
    });
  }

  async createOrder(order) {
    return await handleAsync(async () => {
      const result = await OrderList.create(order);
      return result;
    });
  }

  async updateOrder(id, updatedOrder) {
    return await handleAsync(async () => {
      const result = await OrderList.update(updatedOrder, {
        where: { Id: id },
      });
      return result;
    });
  }

  async deleteOrder(id) {
    return await handleAsync(async () => {
      const result = await OrderList.destroy({ where: { Id: id } });
      return result;
    });
  }
}

module.exports = new OrderService();
