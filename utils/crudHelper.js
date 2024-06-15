const { QueryTypes } = require("sequelize");
const { sequelize } = require("../initializers/db");
const createRecord = async (model, data) => {
  return await model.create(data);
};

const findRecordById = async (model, id) => {
  return await model.findByPk(id);
};

const updateRecord = async (model, id, data) => {
  return await model.update(data, {
    where: { Id: id },
  });
};

const deleteRecord = async (model, id) => {
  return await model.destroy({
    where: { Id: id },
  });
};
const countRecords = async (model, whereClauses) => {
  return await model.count({ where: whereClauses });
};

const findAllRecords = async (model, options) => {
  return await model.findAll(options);
};

const distinctRecords = async (columnName, tableName) => {
  const query = `SELECT DISTINCT ${columnName} FROM ${tableName}`;
  const result = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return result;
};

const findRecordByField = async (model, field, value) => {
  return await model.findOne({
    where: { [field]: value },
  });
};

module.exports = {
  createRecord,
  findRecordById,
  updateRecord,
  deleteRecord,
  countRecords,
  findAllRecords,
  distinctRecords,
  findRecordByField,
};
