const handleAsync = require("../handlers/asyncHandler");
const factoriesService = require("../services/factories.service");

const getAllFactories = handleAsync(async () => {
  const factories = await factoriesService.getAllFactories();
  return factories;
});

module.exports = {
  getAllFactories,
};
