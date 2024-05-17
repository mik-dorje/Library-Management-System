const express = require("express");
const router = express.Router();
const transactionController = require("../../controllers/transactionController");
router
  .route("/")
  .get(transactionController.getAllTransaction)
  .post(transactionController.createNewTransaction)
  .put(transactionController.updateTransaction);

router.route("/:id").get(transactionController.getTransaction);
router.route("/paginated").post(transactionController.getTransactionPaginated);
router
  .route("/delete-category")
  .delete(transactionController.deleteTransaction);

module.exports = router;
