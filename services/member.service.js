const sql = require("mssql");
const handleAsync = require("../handlers/asyncHandler");
const Member = require("../models/Member.model");

class MemberService {
  async getAllMembers() {
    return await handleAsync(async () => {
      const pool = await sql.connect();
      const result = await pool.request().query("SELECT * FROM Member");
      return result.recordset.map(record => new Member(record));
    });
  }

  async getMemberById(id) {
    return await handleAsync(async () => {
      const pool = await sql.connect();
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM Member WHERE Id = @id");
      const record = result.recordset[0];
      return record ? new Member(record) : null;
    });
  }

  async createMember(member) {
    const pool = await sql.connect();
    const result = await pool
      .request()
      .input("Name", sql.NVarChar, member.name)
      .input("Surname", sql.NVarChar, member.surname)
      .input("Email", sql.NVarChar, member.email)
      .input("Username", sql.NVarChar, member.username)
      .input("Password", sql.NVarChar, member.password)
      .input("CreatedAt", sql.DateTime, member.createdAt)
      .input("RoleId", sql.Int, member.roleId)
      .input("IsActive", sql.Bit, member.isActive)
      .input("IsDeleted", sql.Bit, member.isDeleted)
      .input("SatisElemaniKodu", sql.NVarChar, member.satisElemaniKodu)
      .input("YoneticiId", sql.Int, member.yoneticiId)
      .query(
        "INSERT INTO Member (Name, Surname, Email, Username, Password, CreatedAt, RoleId, IsActive, IsDeleted, SatisElemaniKodu, YoneticiId) OUTPUT INSERTED.Id VALUES (@Name, @Surname, @Email, @Username, @Password, @CreatedAt, @RoleId, @IsActive, @IsDeleted, @SatisElemaniKodu, @YoneticiId)"
      );
    return new Member(result.recordset[0]);
  }

  async updateMember(id, updatedMember) {
    const existingMember = await this.getMemberById(id);

    if (!existingMember) {
      throw new Error("User not found");
    }
    let query = "UPDATE Member SET ";
    const params = [];
    n;
    Object.keys(updatedMember).forEach(key => {
      if (key === "password") {
        return;
      }

      query += `${key} = @${key}, `;
      params.push({
        name: key,
        type: sql.NVarChar,
        value: updatedMember[key],
      });
    });

    query = query.slice(0, -2);
    query += ` WHERE Id = @Id`;

    // Güncelleme işlemini gerçekleştirin
    const result = await handleAsync(async () => {
      const pool = await sql.connect();
      const request = pool.request();

      params.forEach(param => {
        request.input(param.name, param.type, param.value);
      });

      request.input("Id", sql.Int, id);

      return await request.query(query);
    });

    return result.rowsAffected;
  }

  async deleteMember(id) {
    return await handleAsync(async () => {
      const pool = await sql.connect();
      const result = await pool
        .request()
        .input("Id", sql.Int, id)
        .query("DELETE FROM Member WHERE Id = @Id");
      return result.rowsAffected;
    });
  }
}

module.exports = new MemberService();
