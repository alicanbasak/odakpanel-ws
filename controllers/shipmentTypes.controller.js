const handleAsync = require("../handlers/asyncHandler");
const shipmentTypesService = require("../services/shipmentTypes.service");

const getAllShipmentTypes = handleAsync(async () => {
  return await shipmentTypesService.getAllShipmentTypes();
});

const getShipmentTypeById = handleAsync(async (req, res) => {
  const { id } = req.params;
  return await shipmentTypesService.getShipmentTypeById(id);
});

const createShipmentType = handleAsync(async (req, res) => {
  const shipmentType = req.body;
  return await shipmentTypesService.createShipmentType(
      shipmentType
  );
});

const updateShipmentType = handleAsync(async (req, res) => {
  const { id } = req.params;
  const updatedShipmentType = req.body;
  return await shipmentTypesService.updateShipmentType(
      id,
      updatedShipmentType
  );
});

const deleteShipmentType = handleAsync(async (req, res) => {
  const { id } = req.params;
  await shipmentTypesService.deleteShipmentType(id);
  return { message: "Shipment Type deleted successfully" };
});

module.exports = {
  getAllShipmentTypes,
  getShipmentTypeById,
  createShipmentType,
  updateShipmentType,
  deleteShipmentType,
};
