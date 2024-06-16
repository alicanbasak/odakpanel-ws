const handleAsync = require("../handlers/asyncHandler");
const factoriesService = require("../services/factories.service");

const getAllFactories = handleAsync(async (req, res) => {
  let { page, pageSize, search } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;
  const factories = await factoriesService.getAllFactories(
    page,
    pageSize,
    search
  );
  return factories;
});

const getFactoryById = handleAsync(async (req, res) => {
  const { id } = req.params;
  const factory = await factoriesService.getFactoryById(id);
  return factory;
});

const createFactory = handleAsync(async (req, res) => {
  const factory = req.body;
  const newFactory = await factoriesService.createFactory(factory);
  return newFactory;
});

const updateFactory = handleAsync(async (req, res) => {
  const { id } = req.params;
  const updatedFactory = req.body;
  const factory = await factoriesService.updateFactory(id, updatedFactory);
  return factory;
});

const deleteFactory = handleAsync(async (req, res) => {
  const { id } = req.params;
  await factoriesService.deleteFactory(id);
  return { message: "Factory deleted successfully" };
});

module.exports = {
  getAllFactories,
  getFactoryById,
  createFactory,
  updateFactory,
  deleteFactory,
};
