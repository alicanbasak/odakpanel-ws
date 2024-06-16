const ShipmentTypes = require("../models/ShipmentTypes.model");
const {
  findAllRecords,
  createRecord,
  findRecordById,
  updateRecord,
  deleteRecord,
} = require("../utils/crudHelper");

class ShipmentTypesService {
  async getAllShipmentTypes() {
    return await findAllRecords(ShipmentTypes);
  }

  async createShipmentType(data) {
    return await createRecord(ShipmentTypes, data);
  }

  async getShipmentTypeById(id) {
    return await findRecordById(ShipmentTypes, id);
  }

  async updateShipmentType(id, data) {
    return await updateRecord(ShipmentTypes, id, data);
  }

  async deleteShipmentType(id) {
    return await deleteRecord(ShipmentTypes, id);
  }
}

module.exports = new ShipmentTypesService();
