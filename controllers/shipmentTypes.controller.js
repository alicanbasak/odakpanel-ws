const handleAsync = require("../handlers/asyncHandler");
const shipmentTypesService = require("../services/shipmentTypes.service");

const getAllShipmentTypes = handleAsync(async () => {
  const shipmentTypes = await shipmentTypesService.getAllShipmentTypes();
  return shipmentTypes;
});

const getShipmentTypeById = handleAsync(async (req, res) => {
  const { id } = req.params;
  const shipmentType = await shipmentTypesService.getShipmentTypeById(id);
  return shipmentType;
});

const createShipmentType = handleAsync(async (req, res) => {
  const shipmentType = req.body;
  const newShipmentType = await shipmentTypesService.createShipmentType(
    shipmentType
  );
  return newShipmentType;
});

const updateShipmentType = handleAsync(async (req, res) => {
  const { id } = req.params;
  const updatedShipmentType = req.body;
  const shipmentType = await shipmentTypesService.updateShipmentType(
    id,
    updatedShipmentType
  );
  return shipmentType;
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
