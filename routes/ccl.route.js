const router = require("express").Router();
const controller = require("../controllers/ccl.controller");

router.get("/", controller.getCcl);

module.exports = router;
