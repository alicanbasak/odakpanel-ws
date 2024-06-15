const router = require("express").Router();

const rfqController = require("../controllers/rfq.controller");

router.get("/", rfqController.getRfqList);
router.get("/:id", rfqController.getRfqById);
router.delete("/:id", rfqController.deleteRfq);
router.post("/delete", rfqController.deleteMultipleRfqs);

module.exports = router;
