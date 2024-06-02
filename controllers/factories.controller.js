const handleAsync = require('../handlers/asyncHandler');
const factoriesService = require('../services/factories.service');

async function getAllFactories(req, res) {
  const factories = await handleAsync(() => factoriesService.getAllFactories());
  res.json(factories);
}

module.exports = {
  getAllFactories,
}