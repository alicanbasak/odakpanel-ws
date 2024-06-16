const memberService = require("../services/member.service");
const handleAsync = require("../handlers/asyncHandler");

const getAllMembers = handleAsync(async (req, res) => {
  let { page, pageSize, search } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;

  const members = await memberService.getAllMembers(page, pageSize, search);
  return members;
});

const getMemberById = handleAsync(async function (req, res) {
  const { id } = req.params;
  const member = await memberService.getMemberById(id);
  return member;
});

const createMember = handleAsync(async function (req, res) {
  const newMember = req.body;
  const member = await memberService.createMember(newMember);
  return member;
});

const updateMember = handleAsync(async function (req, res) {
  const { id } = req.params;
  const updatedMember = req.body;
  const member = await memberService.updateMember(id, updatedMember);
  return member;
});

const deleteMember = handleAsync(async function (req, res) {
  const { id } = req.params;
  const member = await memberService.deleteMember(id);
  return member;
});

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
