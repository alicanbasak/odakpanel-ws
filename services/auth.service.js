const Member = require("../models/member.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { findRecordByField } = require("../utils/crudHelper");

class AuthService {
  async loginUser(username, password) {
    const user = await findRecordByField(Member, "Username", username);
    if (!user) {
      throw new Error("User not found");
    }
    if (!this.validatePassword(password, user.Password)) {
      throw new Error("Invalid password");
    }
    const token = this.generateToken(user);
    return { user, token };
  }

  validatePassword(password, hashedPassword) {
    return (
      crypto.createHash("sha1").update(password).digest("hex") ===
      hashedPassword
    );
  }

  generateToken(user) {
    return jwt.sign(
      { username: user.Username, userId: user.Id },
      "jwtSecretKey",
      { expiresIn: "24h" }
    );
  }
}

module.exports = new AuthService();
