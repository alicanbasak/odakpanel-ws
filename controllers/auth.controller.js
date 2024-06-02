const handleAsync = require("../handlers/asyncHandler");
const authService = require("../services/auth.service");

class AuthController {
  async loginUser(req, res) {
    const { Username, Password } = req.body;
    try {
      const { user, token } = await handleAsync(() =>
        authService.loginUser(Username, Password)
      );
      res.json({ user, token });
      return;
    } catch (error) {
      res.status(500).json({ error: "Authentication failed" });
      return;
    }
  }
}
module.exports = new AuthController();
