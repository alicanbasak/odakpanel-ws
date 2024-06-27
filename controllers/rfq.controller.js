const rfqService = require("../services/rfq.service");
const handleAsync = require("../handlers/asyncHandler");

const getRfqList = handleAsync(async (req, res) => {
  let { page, pageSize, search } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;

  return await rfqService.getRfqList(page, pageSize, search);
});

const getRfqById = handleAsync(async (req, res) => {
  const { id } = req.params;
  return await rfqService.getRfqById(id);
});

const createRfq = handleAsync(async (req, res) => {
  const rfq = req.body;
  return await rfqService.createRfq(rfq);
});

const updateRfq = handleAsync(async (req, res) => {
  const { id } = req.params;
  const updatedRfq = req.body;
  return await rfqService.updateRfq(id, updatedRfq);
});

const deleteRfq = handleAsync(async (req, res) => {
  const { id } = req.params;
  await rfqService.deleteRfq(id);
  return { message: "RFQ deleted successfully" };
});

const deleteMultipleRfqs = handleAsync(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ message: "IDs must be provided as an array" });
  }

  const results = await Promise.all(
    ids.map(async id => {
      try {
        await rfqService.deleteRfq(id);
        return { id, message: "RFQ deleted successfully" };
      } catch (error) {
        console.error("Error deleting RFQ with ID:", id, error);
        return { id, message: "Error deleting RFQ" };
      }
    })
  );

  return {
    statusCode: 200,
    message: "Multiple RFQs deleted successfully",
    results,
  };
});

module.exports = {
  getRfqList,
  getRfqById,
  deleteRfq,
  createRfq,
  deleteMultipleRfqs,
  updateRfq,
};
