const router = require("express").Router();
const controller = require("../controllers/layers.controller");

router.get("/", controller.getLayers);

module.exports = router;
