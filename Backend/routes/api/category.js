const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(categoryController.createNewCategory)
  .put(categoryController.updateCategory);

router.route("/:id").get(categoryController.getCategory);
router.route("/paginated").post(categoryController.getCategoryPaginated);
router.route("/delete-category").delete(categoryController.deleteCategory);

module.exports = router;
