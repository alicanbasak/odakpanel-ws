const handleAsync = require("../handlers/asyncHandler");
const distinctService = require("../services/distinct.service");

const getLayers = handleAsync(async () => {
  return await distinctService.getDistinct("OrderList", "Layers");
});

module.exports = {
  getLayers,
};
