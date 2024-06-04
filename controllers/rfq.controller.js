const rfqService = require("../services/rfq.service");

async function getRfqList(req, res) {
  try {
    let { page, pageSize, search } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    const rfqList = await rfqService.getRfqList(page, pageSize, search);
    res.json(rfqList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getRfqById(req, res) {
  try {
    const { id } = req.params;
    const rfq = await rfqService.getRfqById(id);
    res.json(rfq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getRfqList,
  getRfqById,
};
