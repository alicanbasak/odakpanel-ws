const handleAsync = require("../handlers/asyncHandler");
const shipmentTypesService = require("../services/shipmentTypes.service");

const getAllShipmentTypes = handleAsync(async () => {
  const shipmentTypes = await shipmentTypesService.getAllShipmentTypes();
  return shipmentTypes;
});

module.exports = {
  getAllShipmentTypes,
};
