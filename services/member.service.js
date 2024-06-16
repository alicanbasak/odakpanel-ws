const Member = require("../models/Member.model");
const {
  findAllRecords,
  findRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
  countRecords,
} = require("../utils/crudHelper");
const buildWhereClauses = require("../utils/whereClausesBuilder");
class MemberService {
  async getAllMembers(page = 1, pageSize = 10, search) {
    const offset = (page - 1) * pageSize;
    const searchFields = ["Name"];
    const whereClauses = buildWhereClauses(search, searchFields);

    const members = await findAllRecords(Member, {
      where: whereClauses,
      offset,
      limit: pageSize,
      order: [["Id", "DESC"]],
    });

    const totalCount = await countRecords(Member, whereClauses);
    return { totalCount: totalCount, items: members };
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
