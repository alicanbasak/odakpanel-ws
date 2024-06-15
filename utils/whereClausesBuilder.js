const { Op } = require("sequelize");

const buildWhereClauses = (search, fields) => {
  if (!search || !Array.isArray(fields) || fields.length === 0) return {};

  const validFields = fields.filter(
    field => typeof field === "string" && field.trim() !== ""
  );

  if (validFields.length === 0) return {};

  const clauses = validFields.map(field => ({
    [field]: { [Op.like]: `%${search}%` },
  }));

  return {
    [Op.or]: clauses,
  };
};

module.exports = buildWhereClauses;
