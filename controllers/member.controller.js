const memberService = require("../services/member.service");
const handleAsync = require("../handlers/asyncHandler");

const getAllMembers = handleAsync(async function (req, res) {
  const members = await memberService.getAllMembers();
  res.json(members);
});

const getMemberById = handleAsync(async function (req, res) {
  const { id } = req.params;
  const member = await memberService.getMemberById(id);
  res.json(member);
});

const createMember = handleAsync(async function (req, res) {
  const newMember = req.body;
  const member = await memberService.createMember(newMember);
  res.json(member);
});

const updateMember = handleAsync(async function (req, res) {
  const { id } = req.params;
  const updatedMember = req.body;
  const member = await memberService.updateMember(id, updatedMember);
  res.json(member);
});

const deleteMember = handleAsync(async function (req, res) {
  const { id } = req.params;
  const member = await memberService.deleteMember(id);
  res.json(member);
});

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
