const handleAsync = require('../handlers/asyncHandler');
const shipmentTypesService = require('../services/shipmentTypes.service');

async function getAllShipmentTypes(req, res) {
  const shipmentTypes = await handleAsync(() => shipmentTypesService.getAllShipmentTypes());
  res.json(shipmentTypes);
}

module.exports = {
  getAllShipmentTypes,
}