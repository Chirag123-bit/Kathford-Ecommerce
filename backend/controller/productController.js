const Product = require("../models/productModel");
const SearchSort = require("../utils/SearchSort");

//Add a prooduct

exports.addProduct = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    return res.status(200).json({
      success: true,
      product: product,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllProductAdmin = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    products,
  });
};

exports.getProducts = async (req, res, next) => {
  try {
    // console.log(req.query);
    const searchSort = new SearchSort(Product.find(), req.query);
    const count = await Product.count();
    const products = await searchSort.search().filter().pagination(8).query;
    console.log(products);
    return res.status(200).json({
      message: "Success",
      products,
      count,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getProductDetails = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      status: "fail",
      message: "Product not found",
    });
  }
  res.status(200).json({
    status: "success",
    product,
  });
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({
        success: false,
      });
    }
    let updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const product = Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        success: false,
      });
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "The Product is removed",
    });
  } catch (e) {
    console.log(e);
  }
};

//write a function to add prodcut review
exports.addProductReview = async (req, res) => {
  console.log("dsadsadsad");
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };
  console.log(productId);
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((review) => {
    avg += review.rating;
  });
  product.rating = avg / product.reviews.length;
  console.log(product.rating);
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "Review added",
  });
};

exports.getReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Write a function to delete a review

exports.deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const reviews = await product.reviews.filter(
      (rev) => rev.user.toString() != req.user._id.toString()
    );
    if (reviews.length == product.reviews.length) {
      return res.status(200).json({
        success: false,
        message: "Review Already Deleted",
      });
    }
    product.reviews = reviews;
    product.noOfReviews -= 1;

    let totalRating = 0;
    product.reviews.forEach((review) => {
      totalRating += review.rating;
    });
    const leng = product.reviews.length == 0 ?? 1;
    product.rating = totalRating / leng;
    await product.save();

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
