const handleAsync = require("../handlers/asyncHandler");
const distinctService = require("../services/distinct.service");

const getStatus = handleAsync(async () => {
  return await distinctService.getDistinct("OrderList", "Status");
});

module.exports = {
  getStatus,
};
