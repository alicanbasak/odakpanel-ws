const handleAsync = require('../handlers/asyncHandler')
const distinctService = require('../services/distinct.service')

const getLayers = async (req, res) => {
  const layers = await handleAsync(() => distinctService.getDistinct('OrderList', 'Layers'))
  res.json(layers)
}


module.exports = {
  getLayers,
}