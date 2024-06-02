const express = require("express");
const router = express.Router();

const cclController = require("../controllers/ccl.controller");

router.get("/", cclController.getCcl);

module.exports = router;