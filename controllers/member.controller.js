const memberService = require("../services/member.service");
const handleAsync = require("../handlers/asyncHandler");

const getAllMembers = handleAsync(async (req, res) => {
  let { page, pageSize, search } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;

  return await memberService.getAllMembers(page, pageSize, search);
});

const getMemberById = handleAsync(async function (req, res) {
  const { id } = req.params;
  return await memberService.getMemberById(id);
});

const createMember = handleAsync(async function (req, res) {
  const newMember = req.body;
  return await memberService.createMember(newMember);
});

const updateMember = handleAsync(async function (req, res) {
  const { id } = req.params;
  const updatedMember = req.body;
  return await memberService.updateMember(id, updatedMember);
});

const deleteMember = handleAsync(async function (req, res) {
  const { id } = req.params;
  return await memberService.deleteMember(id);
});

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
