class ShipmentTypes {
  // id, ShipmentType, ShipmentRate, UpdatedAt,
  constructor(id, shipmentType, shipmentRate, updatedAt) {
    this.id = id;
    this.shipmentType = shipmentType;
    this.shipmentRate = shipmentRate;
    this.updatedAt = updatedAt;

  }
}

module.exports = ShipmentTypes;