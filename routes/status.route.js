const router = require("express").Router();

const statusController = require("../controllers/status.controller");

router.get("/", statusController.getStatus);

module.exports = router;
