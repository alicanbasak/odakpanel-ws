const handleAsync = require('../handlers/asyncHandler')
const distinctService = require('../services/distinct.service')

const getCcl = async (req, res) => {
  const ccl = await handleAsync(() => distinctService.getDistinct('OrderList', 'Ccl'))
  res.json(ccl)
}

module.exports = {
  getCcl,
  
}