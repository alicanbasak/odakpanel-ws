const { Op } = require("sequelize");

const buildWhereClauses = search => {
  if (!search) return {};

  return {
    [Op.or]: [
      { Id: { [Op.like]: `%${search}%` } },
      { Gerber: { [Op.like]: `%${search}%` } },
      { OdakCode: { [Op.like]: `%${search}%` } },
      { OrderNumber: { [Op.like]: `%{search}%` } },
      { CustomerCode: { [Op.like]: `%{search}%` } },
      { OdakOrderNumber: { [Op.like]: `%{search}%` } },
    ],
  };
};

module.exports = buildWhereClauses;
