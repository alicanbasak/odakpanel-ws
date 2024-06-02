class Customers {
  constructor(id, name, createdAt) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt || new Date();
  }

}

module.exports = Customers;