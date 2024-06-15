const ShipmentTypes = require("../models/ShipmentTypes.model");
const { findAllRecords } = require("../utils/crudHelper");

class ShipmentTypesService {
  async getAllShipmentTypes() {
    return await findAllRecords(ShipmentTypes);
  }
}

module.exports = new ShipmentTypesService();
