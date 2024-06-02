const sql = require("mssql");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class AuthService {
  async loginUser(username, password) {
    try {
      const result = await sql.query`SELECT * FROM Member WHERE Username = ${username}`;
      const user = result.recordset[0];
      if (!user || !this.validatePassword(password, user.Password)) {
        throw new Error("Invalid username or password");
      }

      const token = this.generateToken(user);
      return {user, token};
    } catch (error) {
      throw new Error("Authentication failed");
    } finally {
      console.log("Authentication attempt completed");
    }
  }

  validatePassword(password, hashedPassword) {
    return crypto.createHash("sha1").update(password).digest("hex") === hashedPassword;
  }

  generateToken(user) {
    return jwt.sign(
      {username: user.Username, userId: user.Id},
      "jwtSecretKey",
      {expiresIn: "24h"}
    );
  }
}

module.exports = new AuthService();
