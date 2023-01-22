const express = require("express");
const {
  newOrder,
  myOrders,
  getSingleOrder,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");
const { isAuthenticated, authorizedRole } = require("../middleware/auth");
const router = express.Router();

router.route("/new").post(isAuthenticated, newOrder);
router.route("/:id").get(isAuthenticated, getSingleOrder);
router.route("/").get(isAuthenticated, myOrders);
router.route("/:id").delete(isAuthenticated, deleteOrder);
router.route("/:id").put(isAuthenticated, updateOrder);
router
  .route("/get/all")
  .get(isAuthenticated, authorizedRole("admin"), allOrders);

module.exports = router;
