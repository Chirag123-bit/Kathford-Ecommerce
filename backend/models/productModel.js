const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product name"],
    minLength: 2,
  },
  stock: {
    type: Number,
    default: 1,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Please Enter product's price"],
  },
  description: {
    type: String,
    required: [true, "Please Enter product name"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  noOfReviews: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: [true, "Please Enter Name"],
      },
      comment: {
        type: String,
      },
      rating: {
        type: Number,
        required: [true, "Please Enter Rating"],
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please Select a category"],
    enum: [
      "Electronics",
      "Clothes",
      "Food",
      "Smart Phones",
      "Laptop",
      "Headphones",
      "Cameras",
      "Accessories",
      "Beauty",
      "Home Appliances",
    ],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
