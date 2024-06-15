const router = require("express").Router();
const controller = require("../controllers/member.controller");

router.route("/").get(controller.getAllMembers).post(controller.createMember);

router
  .route("/:id")
  .get(controller.getMemberById)
  .put(controller.updateMember)
  .delete(controller.deleteMember);

module.exports = router;
