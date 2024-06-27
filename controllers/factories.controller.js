const handleAsync = require("../handlers/asyncHandler");
const factoriesService = require("../services/factories.service");

const getAllFactories = handleAsync(async (req, res) => {
  let { page, pageSize, search } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;
  return await factoriesService.getAllFactories(
      page,
      pageSize,
      search
  );
});

const getFactoryById = handleAsync(async (req, res) => {
  const { id } = req.params;
  return await factoriesService.getFactoryById(id);
});

const createFactory = handleAsync(async (req, res) => {
  const factory = req.body;
  return await factoriesService.createFactory(factory);
});

const updateFactory = handleAsync(async (req, res) => {
  const { id } = req.params;
  const updatedFactory = req.body;
  return await factoriesService.updateFactory(id, updatedFactory);
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
