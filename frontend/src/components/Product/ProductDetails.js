import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetail,
  newReview,
} from "../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import Loading from "react-loading";
// import { addItemsToCard } from "../../Actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@mui/material";
import { addItemsToCard } from "../actions/cartActions";

const ProductDetails = () => {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error, success, reviewError } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetail(id));
  }, [dispatch, id, error, success, reviewError]);
  const options = {
    edit: false,
    color: "rgba(255, 255, 255, 0.4)",
    activeColor: "#ffd700",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    const qty = product.stock > quantity ? quantity + 1 : quantity;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    const qty = quantity > 2 ? quantity - 1 : 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCard(product._id, quantity));
    alert.success("Item Added To Cart");
  };

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    console.log(id);

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="productDetails">
            <div style={{ flex: "1" }}>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => {
                    return (
                      <img
                        className="carouselImage"
                        key={item.url}
                        src={item.url}
                        alt={`${i} slide`}
                      />
                    );
                  })}
              </Carousel>
            </div>
            <div style={{ flex: "1" }}>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} value={product.rating} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>Rs. {product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input defaultValue={1} type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description:
                <p>{product.description}</p>
              </div>
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>
          <div className="revSec">
            <h3 className="reviewHeading">Reviews</h3>
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />

                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product.reviews &&
                  product.reviews.map((review) => ReviewCard({ review }))}
              </div>
            ) : (
              <p className="noReviews"> No Reviews Yet</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
