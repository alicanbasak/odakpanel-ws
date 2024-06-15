const Factories = require("../models/Factories.model");
const { findAllRecords } = require("../utils/crudHelper");

class FactoryService {
  async getAllFactories() {
    return await findAllRecords(Factories);
  }
}

module.exports = new FactoryService();
