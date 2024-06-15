const handleAsync = require("../handlers/asyncHandler");
const distinctService = require("../services/distinct.service");

const getStatus = handleAsync(async () => {
  const result = await distinctService.getDistinct("OrderList", "Status");
  return result;
});

module.exports = {
  getStatus,
};
