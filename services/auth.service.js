const Member = require("../models/member.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { findRecordByField, updateRecord } = require("../utils/crudHelper");

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

  isAccountOwner(userId, profileId) {
    if (userId !== profileId) {
      return false;
    }
    return true;
  }

  async getProfile(userId, profileId) {
    isAccountOwner(userId, profileId);
    return await findRecordByField(Member, "Id", profileId);
  }

  async updatePassword(userId, profileId, passwordData) {
    isAccountOwner(userId, profileId);
    const user = await findRecordByField(Member, "Id", profileId);
    if (!this.validatePassword(passwordData.OldPassword, user.Password)) {
      throw new Error("Invalid password");
    }
    user.Password = crypto
      .createHash("sha1")
      .update(passwordData.NewPassword)
      .digest("hex");

    return await updateRecord(Member, profileId, user);
  }

  async updateProfile(userId, profileId) {
    isAccountOwner(userId, profileId);
    const user = await findRecordByField(Member, "Id", profileId);
    return await updateRecord(Member, profileId, user);
  }
}

module.exports = new AuthService();
