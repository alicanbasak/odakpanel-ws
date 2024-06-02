const express = require('express');
const router = express.Router();
const layersController = require('../controllers/layers.controller');


router.get('/', layersController.getLayers);

module.exports = router;