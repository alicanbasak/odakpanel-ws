const sql = require("mssql");
const handleAsync = require("../handlers/asyncHandler");
const Factories = require("../models/Factories.model");

class FactoryService {
  async getAllFactories() {
    return await handleAsync(async () => {
      const factories = await Factories.findAll();
      return factories;
    });
  }
}

module.exports = new FactoryService();
