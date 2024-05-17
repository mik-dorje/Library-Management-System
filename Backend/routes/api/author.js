const express = require("express");
const router = express.Router();
const authorController = require("../../controllers/authorController");

router
  .route("/")
  .get(authorController.getAllAuthor)
  .post(authorController.createNewAuthor)
  .put(authorController.updateAuthor);

router.route("/:id").get(authorController.getAuthor);
router.route("/paginated").post(authorController.getAuthorPaginated);
router.route("/delete-author").delete(authorController.deleteAuthor);

module.exports = router;
