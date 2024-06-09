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

async function deleteRfq(req, res) {
  try {
    const { id } = req.params;
    await rfqService.deleteRfq(id);
    res.json({ message: "RFQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteMultipleRfqs(req, res) {
  try {
    const { ids } = req.body; // Birden fazla ID'yi içeren bir dizi bekliyoruz

    console.log("Received IDs for deletion:", ids);

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
          console.error("Error deleting RFQ with ID:", id, error.message);
          return { id, message: "Error deleting RFQ" };
        }
      })
    );

    res.json({
      statusCode: 200,
      message: "Multiple RFQs deleted successfully",
      results,
    });
  } catch (error) {
    console.error("Error in deleteMultipleRfqs:", error.message);
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  getRfqList,
  getRfqById,
  deleteRfq,
  deleteMultipleRfqs,
};
