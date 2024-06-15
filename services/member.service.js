const Member = require("../models/Member.model");
const {
  findAllRecords,
  findRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
} = require("../utils/crudHelper");
class MemberService {
  async getAllMembers() {
    return await findAllRecords(Member);
  }

  async getMemberById(id) {
    return await findRecordById(Member, id);
  }

  async createMember(member) {
    return await createRecord(Member, member);
  }

  async updateMember(id, updatedMember) {
    return await updateRecord(Member, id, updatedMember);
  }
  async deleteMember(id) {
    return await deleteRecord(Member, id);
  }
}

module.exports = new MemberService();
