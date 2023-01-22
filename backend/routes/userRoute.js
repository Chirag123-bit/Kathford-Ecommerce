const express = require("express");
const {
  registerUser,
  login,
  logout,
  getUserDetails,
} = require("../controller/userControler");
const { isAuthenticated } = require("../middleware/auth");
// const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
