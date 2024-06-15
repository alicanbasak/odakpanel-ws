const router = require("express").Router();
const layersController = require("../controllers/layers.controller");

router.get("/", layersController.getLayers);

module.exports = router;
