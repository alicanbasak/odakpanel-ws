const handleAsync = require("../handlers/asyncHandler");
const ShipmentTypes = require("../models/ShipmentTypes.model");

class ShipmentTypesService {
  async getAllShipmentTypes() {
    return await handleAsync(async () => {
      const result = await ShipmentTypes.findAll();
      return result;
    });
  }
}

module.exports = new ShipmentTypesService();
