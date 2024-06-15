const { Op } = require("sequelize");

const addWhereClause = (
  whereClauses,
  field,
  value,
  isString = false,
  exclude = false
) => {
  if (value && value.length > 0) {
    const valueList = isString ? value.split(",") : value;
    whereClauses[field] = exclude
      ? { [Op.notIn]: valueList }
      : { [Op.in]: valueList };
  }
};

module.exports = addWhereClause;
