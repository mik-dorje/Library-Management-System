const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/dashboardController");

router.route("/all").get(dashboardController.getAllDashboardData);

module.exports = router;
