const router = require("express").Router();
const factoriesController = require("../controllers/factories.controller");

router.get("/", factoriesController.getAllFactories);

module.exports = router;
