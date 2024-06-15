const handleAsync = require("../handlers/asyncHandler");
const distinctService = require("../services/distinct.service");

const getLayers = handleAsync(async () => {
  const result = await distinctService.getDistinct("OrderList", "Layers");
  return result;
});

module.exports = {
  getLayers,
};
