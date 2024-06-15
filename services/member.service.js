const handleAsync = require("../handlers/asyncHandler");
const Member = require("../models/Member.model");

class MemberService {
  async getAllMembers() {
    return await handleAsync(async () => {
      const result = await Member.findAll();
      return result;
    });
  }

  async getMemberById(id) {
    return await handleAsync(async () => {
      const result = await Member.findById(id);
      return result ? new Member(result) : null;
    });
  }

  async createMember(member) {
    return await handleAsync(async () => {
      const result = await Member.create({
        Name: member.name,
        Surname: member.surname,
        Email: member.email,
        Username: member.username,
        Password: member.password,
        CreatedAt: member.createdAt,
        RoleId: member.roleId,
        IsActive: member.isActive,
        IsDeleted: member.isDeleted,
        SatisElemaniKodu: member.satisElemaniKodu,
        YoneticiId: member.yoneticiId,
      });
      return new Member(result);
    });
  }

  async updateMember(id, updatedMember) {
    const existingMember = await this.getMemberById(id);

    if (!existingMember) {
      return {
        code: 404,
        status: "error",
        message: "Member not found",
      };
    }

    const member = {
      Name: updatedMember.name || existingMember.name,
      Surname: updatedMember.surname || existingMember.surname,
      Email: updatedMember.email || existingMember.email,
      Username: updatedMember.username || existingMember.username,
      Password: updatedMember.password || existingMember.password,
      CreatedAt: updatedMember.createdAt || existingMember.createdAt,
      RoleId: updatedMember.roleId || existingMember.roleId,
      IsActive: updatedMember.isActive || existingMember.isActive,
      IsDeleted: updatedMember.isDeleted || existingMember.isDeleted,
      SatisElemaniKodu:
        updatedMember.satisElemaniKodu || existingMember.satisElemaniKodu,
      YoneticiId: updatedMember.yoneticiId || existingMember.yoneticiId,
    };

    return await handleAsync(async () => {
      const result = await Member.update(id, member);
      return {
        code: 200,
        status: "success",
        message: "Member updated",
        affectedRows: result,
      };
    });
  }

  async deleteMember(id) {
    return await handleAsync(async () => {
      const result = await Member.delete(id);
      return {
        code: 200,
        status: "success",
        message: "Member deleted",
        affectedRows: result,
      };
    });
  }
}

module.exports = new MemberService();
