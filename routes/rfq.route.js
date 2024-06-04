const express = require("express");
const router = express.Router();

const rfqController = require("../controllers/rfq.controller");

router.get("/", rfqController.getRfqList);
router.get("/:id", rfqController.getRfqById);

module.exports = router;
