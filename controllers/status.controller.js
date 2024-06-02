const handleAsync = require('../handlers/asyncHandler')
const distinctService = require('../services/distinct.service')

const getStatus = async (req, res) => {
  const status = await handleAsync(() => distinctService.getDistinct('OrderList', 'Status'))
  res.json(status)

}

module.exports = {
  getStatus,
  
}