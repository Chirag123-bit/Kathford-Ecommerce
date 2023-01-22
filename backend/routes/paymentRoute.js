const express = require("express");
const { processPayment } = require("../controller/paymentController");

const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/process").post(processPayment);
module.exports = router;
