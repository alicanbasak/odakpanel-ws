const handleAsync = require("../handlers/asyncHandler");
const Factories = require("../models/Factories.model");
const Customers = require("../models/Customers.model");
const Rfqs = require("../models/Rfqs.model");
const RfqFactories = require("../models/RfqFactories.model");
const RfqFactoryPrices = require("../models/RfqFactoryPrices.model");
const { literal, Op } = require("sequelize");

class RfqService {
  async getRfqList(page = 1, pageSize = 10, search) {
    const offset = (page - 1) * pageSize;
    const whereClauses = {};

    if (search) {
      whereClauses[Op.or] = [
        { Id: { [Op.like]: `%${search}%` } },
        { Gerber: { [Op.like]: `%${search}%` } },
        { OdakCode: { [Op.like]: `%${search}%` } },
        { OrderNumber: { [Op.like]: `%${search}%` } },
        { CustomerCode: { [Op.like]: `%${search}%` } },
        { OdakOrderNumber: { [Op.like]: `%${search}%` } },
      ];
    }

    try {
      const totalCount = await Rfqs.count({ where: whereClauses });

      const rfqs = await Rfqs.findAll({
        where: whereClauses,
        include: [
          { model: Factories, attributes: ["Name"] },
          { model: Customers, attributes: ["Name"] },
        ],
        offset: offset,
        limit: pageSize,
        order: [["Id", "DESC"]],
      });

      return {
        totalCount: totalCount,
        items: rfqs,
      };
    } catch (error) {
      console.error("Error fetching RFQ list:", error.message);
      throw new Error("Failed to fetch RFQ list");
    }
  }

  async getRfqById(id) {
    return await handleAsync(async () => {
      const result = await Rfqs.findByPk(id, {});
      return result;
    });
  }

  async createRfq(rfq) {
    return await handleAsync(async () => {
      const result = await Rfqs.create(rfq);
      return result;
    });
  }

  async updateRfq(id, updatedRfq) {
    return await handleAsync(async () => {
      const result = await Rfqs.update(updatedRfq, {
        where: { Id: id },
      });
      return result;
    });
  }

  async deleteRfq(id) {
    const transaction = await sequelize.transaction();
    try {
      await RfqFactoryPrices.destroy({
        where: {
          RfqFactoryId: {
            [Sequelize.Op.in]: sequelize.literal(
              `(SELECT id FROM "RfqFactories" WHERE "RfqId" = ${id})`
            ),
          },
        },
        transaction,
      });
      await RfqFactories.destroy({
        where: {
          RfqId: id,
        },
        transaction,
      });

      await Rfqs.destroy({
        where: {
          id: id,
        },
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      console.error("Error deleting RFQ with ID: ", id, error.message);
      await transaction.rollback();
      throw new Error(error.message);
    }
  }
}

module.exports = new RfqService();
