const handleAsync = require("../handlers/asyncHandler");
const distinctService = require("../services/distinct.service");

const getCcl = handleAsync(async () => {
  return await distinctService.getDistinct("OrderList", "Ccl");
});

module.exports = {
  getCcl,
};
