const express = require("express");
const {
  addProduct,
  getProducts,
  updateProduct,
  removeProduct,
  addProductReview,
  getReviews,
  deleteReview,
  getProductDetails,
} = require("../controller/productController");
const router = express.Router();
const { isAuthenticated, authorizedRole } = require("../middleware/auth");

router.route("/review").put(isAuthenticated, addProductReview);
router.route("/").post(isAuthenticated, authorizedRole("admin"), addProduct);
router.route("/").get(getProducts);
router.route("/:id").put(updateProduct);
router.route("/:id").get(getProductDetails);
router.route("/:id").delete(removeProduct);
router.route("/review/get/:id").get(getReviews);
router.route("/review/remove/:id").delete(isAuthenticated, deleteReview);

module.exports = router;
