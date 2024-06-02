const sql = require("mssql");
const handleAsync = require("../handlers/asyncHandler");
const Customers = require("../models/Customers.model");

class CustomerService {
  async getAllCustomers() {
    return await handleAsync(async () => {
      const pool = await sql.connect();
      const result = await pool.request().query("SELECT * FROM Customers");
      return result.recordset.map(record => new Customers(record));
    });
  }
}

module.exports = new CustomerService();
