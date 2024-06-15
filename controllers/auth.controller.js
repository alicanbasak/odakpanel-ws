const handleAsync = require("../handlers/asyncHandler");
const authService = require("../services/auth.service");

const loginUser = handleAsync(async function (req, res) {
  const { Username, Password } = req.body;
  const { user, token } = await authService.loginUser(Username, Password);
  res.json({ user, token });
});

module.exports = {
  loginUser,
};
