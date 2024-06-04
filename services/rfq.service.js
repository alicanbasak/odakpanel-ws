const sql = require("mssql");
const handleAsync = require("../handlers/asyncHandler");

class RfqService {
  async getRfqList(page = 1, pageSize = 10, search) {
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

    addWhereClause("Search", search, true);

    if (search) {
      whereClauses.push(`Search LIKE '%${search}%'`);
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

      return {
        totalCount,
        items: rfqList,
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
}

module.exports = new RfqService();
