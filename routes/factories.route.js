const express = require("express");
const router = express.Router();
const factoriesController = require("../controllers/factories.controller");

router.get("/", factoriesController.getAllFactories);


module.exports = router;