const express = require("express");
const router = express.Router();
const memberController = require("../../controllers/memberController");

router
  .route("/")
  .get(memberController.getAllMember)
  .post(memberController.createNewMember)
  .put(memberController.updateMember);

router.route("/:id").get(memberController.getMember);
router.route("/paginated").post(memberController.getMemberPaginated);
router.route("/delete-author").delete(memberController.deleteMember);

module.exports = router;
