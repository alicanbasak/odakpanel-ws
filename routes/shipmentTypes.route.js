const express = require('express');
const router = express.Router();
const shipmentTypesController = require('../controllers/shipmentTypes.controller');

router.get('/', shipmentTypesController.getAllShipmentTypes);

module.exports = router;