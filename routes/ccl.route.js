const router = require("express").Router();
const cclController = require("../controllers/ccl.controller");

router.get("/", cclController.getCcl);

module.exports = router;
