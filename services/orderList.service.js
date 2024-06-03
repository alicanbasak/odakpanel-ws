const sql = require("mssql");
const handleAsync = require("../handlers/asyncHandler");
const OrderList = require("../models/OrderList.model");

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

    const addWhereClause = (
      field,
      value,
      isString = false,
      exclude = false
    ) => {
      if (value && value.length > 0) {
        const valueList = Array.isArray(value) ? value : value.split(",");
        const formattedList = isString
          ? valueList.map(val => `'${val}'`).join(",")
          : valueList.join(",");
        if (exclude) {
          whereClauses.push(`${field} NOT IN (${formattedList})`);
        } else {
          whereClauses.push(`${field} IN (${formattedList})`);
        }
      }
    };

    const whereClauses = [];
    addWhereClause("FactoryId", factoryId);
    addWhereClause("CustomerId", customerId);
    addWhereClause("ShipmentType", shipmentType, true);
    addWhereClause("Layers", layers, true);
    addWhereClause("Ccl", ccl, true);
    addWhereClause("Status", status, true);

    if (excludeFactoryId) {
      whereClauses.push(`FactoryId <> ${excludeFactoryId}`);
    }

    if (orderToBeSent) {
      whereClauses.push(`FactoryId = ${orderToBeSent}`);
    }

    if (delay === "true") {
      const today = new Date().toISOString().split("T")[0];
      whereClauses.push(`ShipmentDate < '${today}' AND Status = 'üretimde'`);
    }

    if (dataWillBeSend === "true") {
      whereClauses.push(
        `(DataStatus = '3' OR DataStatus = '5') AND IsSend = 0 AND FilmDurumu = 'DÜZELTME'`
      );
    }

    if (search) {
      whereClauses.push(
        `(Id LIKE '%${search}%' OR Gerber LIKE '%${search}%' OR OdakCode LIKE '%${search}%' OR OrderNumber LIKE '%${search}%' OR CustomerCode LIKE '%${search}%' OR OdakOrderNumber LIKE '%${search}%')`
      );
    }

    const whereClause =
      whereClauses.length > 0 ? ` WHERE ${whereClauses.join(" AND ")}` : "";

    try {
      const pool = await sql.connect();

      const totalCountQuery = `SELECT COUNT(*) AS TotalCount FROM OrderList${whereClause}`;
      const totalCountResult = await pool.request().query(totalCountQuery);
      const totalCount = totalCountResult.recordset[0].TotalCount;

      const ordersQuery = `
      SELECT * FROM (
          SELECT *, ROW_NUMBER() OVER (ORDER BY Id DESC) AS RowNum
          FROM OrderList
          ${whereClause}
      ) AS OrdersWithRowNum
      WHERE RowNum > ${offset} AND RowNum <= ${offset + pageSize}
    `;
      const ordersResult = await pool.request().query(ordersQuery);
      const orders = ordersResult.recordset;

      const customerIds = [...new Set(orders.map(order => order.CustomerId))]; // Unique CustomerId values
      let customers = {};
      if (customerIds.length > 0) {
        const customerQuery = `SELECT Id AS CustomerId, Name FROM Customers WHERE Id IN (${customerIds
          .map(id => `'${id}'`)
          .join(",")})`;

        const customerResult = await pool.request().query(customerQuery);
        customers = customerResult.recordset.reduce((acc, customer) => {
          acc[customer.CustomerId] = customer.Name;
          return acc;
        }, {});
      }

      const ordersWithCustomerNames = orders.map(order => ({
        ...order,
        CustomerName: customers[order.CustomerId] || null,
      }));

      console.log("Orders with customer names:", ordersWithCustomerNames);
      return {
        totalCount: totalCount,
        items: ordersWithCustomerNames,
      };
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders");
    }
  }

  async getOrderById(id) {
    return await handleAsync(async () => {
      const pool = await sql.connect();
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM OrderList WHERE Id = @id");
      const record = result.recordset[0];
      return record ? new OrderList(...Object.values(record)) : null;
    });
  }

  async createOrder(order) {
    try {
      const pool = await sql.connect();
      const request = pool.request();
      for (const key in order) {
        if (order.hasOwnProperty(key)) {
          request.input(key, sql.NVarChar, order[key]);
        }
      }
      const result = await request.query(`
            INSERT INTO OrderList (${Object.keys(order).join(", ")})
            OUTPUT INSERTED.*
            VALUES (${Object.keys(order)
              .map(key => `@${key}`)
              .join(", ")})
        `);
      const insertedOrder = result.recordset[0];
      return new OrderList(
        insertedOrder.Id,
        insertedOrder.Gerber
        // Add other properties here
      );
    } catch (error) {
      // Log error
      console.error(error);
      throw error;
    }
  }

  async updateOrder(id, updatedOrder) {
    return await handleAsync(async () => {
      const pool = await sql.connect();
      const request = pool.request();

      // Functions
      const setInputParams = (request, updatedOrder) => {
        Object.entries(updatedOrder).forEach(([key, value]) => {
          request.input(key, sql.NVarChar, value);
        });
      };

      const generateUpdateQuery = (table, id, updatedOrder) => {
        const setValues = Object.keys(updatedOrder)
          .map(param => `${param} = @${param}`)
          .join(", ");
        return `UPDATE ${table} SET ${setValues} WHERE Id = @Id`;
      };

      // Set input parameters
      setInputParams(request, updatedOrder);
      request.input("Id", sql.Int, id);

      // Generate query
      const query = generateUpdateQuery("OrderList", id, updatedOrder);

      // Execute query
      const result = await request.query(query);
      return result.rowsAffected;
    });
  }

  async deleteOrder(id) {
    return await handleAsync(async () => {
      const pool = await sql.connect();
      const result = await pool
        .request()
        .input("Id", sql.Int, id)
        .query("DELETE FROM OrderList WHERE Id = @Id");
      return result.rowsAffected;
    });
  }
}

module.exports = new OrderService();
