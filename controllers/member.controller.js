const memberService = require("../services/member.service");
const handleAsync = require("../handlers/asyncHandler");

async function getAllMembers(req, res) {
  const members = await handleAsync(memberService.getAllMembers);
  res.json(members);
}

async function getMemberById(req, res) {
  const { id } = req.params;
  const member = await handleAsync(() => memberService.getMemberById(id));
  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }
  res.json(member);
}

async function createMember(req, res) {
  const member = req.body;
  const result = await handleAsync(() => memberService.createMember(member));
  res.json(result);
}

async function updateMember(req, res) {
  const { id } = req.params;
  const updatedMember = req.body;
  const updatedCount = await handleAsync(() =>
    memberService.updateMember(id, updatedMember)
  );
  res.json({ updatedCount });
}

async function deleteMember(req, res) {
  const { id } = req.params;
  const deletedCount = await handleAsync(() => memberService.deleteMember(id));
  res.json({ deletedCount });
}

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
