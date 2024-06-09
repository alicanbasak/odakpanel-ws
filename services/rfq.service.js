const sql = require("mssql");
class RfqService {
  async getRfqList(page = 1, pageSize = 10, search) {
    const offset = (page - 1) * pageSize;
    const whereClauses = [];

    if (search) {
      whereClauses.push(
        `(Id LIKE '%${search}%' OR Gerber LIKE '%${search}%' OR OdakCode LIKE '%${search}%' OR CustomerCode LIKE '%${search}%' OR OdakOrderNumber LIKE '%${search}%')`
      );
    }

    const whereClause =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    try {
      const pool = await sql.connect();

      const totalCountQuery = `SELECT COUNT(*) AS TotalCount FROM Rfqs ${whereClause}`;

      const totalCountResult = await pool.request().query(totalCountQuery);
      const totalCount = totalCountResult.recordset[0].TotalCount;

      const rfqQuery = `SELECT * FROM Rfqs ${whereClause} ORDER BY Id OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;

      const rfqResult = await pool.request().query(rfqQuery);
      const rfqList = rfqResult.recordset;

      const customerIds = [...new Set(rfqList.map(rfq => rfq.CustomerId))];
      const rfqStatusIds = [...new Set(rfqList.map(rfq => rfq.RfqStatus))];
      let customers = {};
      let rfqStatuses = {};

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

      if (rfqStatusIds.length > 0) {
        const rfqStatusQuery = `SELECT Id AS RfqStatus, Name FROM RfqStatus WHERE Id IN (${rfqStatusIds
          .map(id => `'${id}'`)
          .join(",")})`;
        const rfqStatusResult = await pool.request().query(rfqStatusQuery);
        rfqStatuses = rfqStatusResult.recordset.reduce((acc, status) => {
          acc[status.RfqStatus] = status.Name;
          return acc;
        }, {});
      }

      const rfqsWithCustomerNamesAndSatatusName = rfqList.map(rfq => ({
        ...rfq,
        CustomerName: customers[rfq.CustomerId] || null,
        RfqStatusName: rfqStatuses[rfq.RfqStatus] || null,
      }));
      return {
        totalCount,
        items: rfqsWithCustomerNamesAndSatatusName,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getRfqById(id) {
    try {
      const pool = await sql.connect();
      const query = `SELECT * FROM Rfqs WHERE Id = ${id}`;
      const result = await pool.request().query(query);
      return result.recordset[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteRfq(id) {
    try {
      const pool = await sql.connect();
      console.log("Deleting RFQ with ID: ", id);

      // first delete related factory prices
      const deleteFactoryPricesQuery = `DELETE FROM RfqFactoryPrices WHERE RfqFactoryId IN (SELECT Id FROM RfqFactories WHERE RfqId = ${id})`;
      console.log(
        "Deleting related factory prices with query: ",
        deleteFactoryPricesQuery
      );
      await pool.request().query(deleteFactoryPricesQuery);

      // then delete related factories
      const deleteFactoriesQuery = `DELETE FROM RfqFactories WHERE RfqId = ${id}`;
      console.log(
        "Deleting related factories with query: ",
        deleteFactoriesQuery
      );
      await pool.request().query(deleteFactoriesQuery);

      // finally delete the RFQ
      const deleteRfqQuery = `DELETE FROM Rfqs WHERE Id = ${id}`;
      console.log("Query: ", deleteRfqQuery);
      await pool.request().query(deleteRfqQuery);
    } catch (error) {
      console.error("Error deleting RFQ with ID: ", id, error.message);
      throw new Error(error.message);
    }
  }
}

module.exports = new RfqService();
