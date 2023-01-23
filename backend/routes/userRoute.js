const express = require("express");
const {
  registerUser,
  login,
  logout,
  getUserDetails,
  getAllUsers,
  updateUserRole,
  deleteUser,
  updateProfile,
  getUser,
} = require("../controller/userControler");
const { isAuthenticated, authorizedRole } = require("../middleware/auth");
// const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/login").post(login);
router.route("/logout").post(logout);
router
  .route("/getUsers")
  .get(isAuthenticated, authorizedRole("admin"), getAllUsers);
router
  .route("/getUser/:id")
  .get(isAuthenticated, authorizedRole("admin"), getUser);
router
  .route("/updateUserRole/:id")
  .put(isAuthenticated, authorizedRole("admin"), updateUserRole);
router
  .route("/deleteUser/:id")
  .delete(isAuthenticated, authorizedRole("admin"), deleteUser);

module.exports = router;
