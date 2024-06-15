const handleAsync = require("../handlers/asyncHandler");
const distinctService = require("../services/distinct.service");

const getCcl = handleAsync(async () => {
  const result = await distinctService.getDistinct("OrderList", "Ccl");
  return result;
});

module.exports = {
  getCcl,
};
