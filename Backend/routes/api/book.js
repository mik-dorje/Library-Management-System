const express = require("express");
const router = express.Router();
const bookController = require("../../controllers/bookController");

router
  .route("/")
  .get(bookController.getAllBook)
  .post(bookController.createNewBook)
  .put(bookController.updateBook);

router.route("/:id").get(bookController.getBook);
router.route("/paginated").post(bookController.getBookPaginated);
router.route("/delete-book").delete(bookController.deleteBook);

module.exports = router;
