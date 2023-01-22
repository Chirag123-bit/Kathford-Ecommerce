import React, { useEffect, useState } from "react";
import { clearErrors, getProducts } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import "./products.css";
import Loading from "react-loading";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";

const Products = () => {
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];
  const alert = useAlert();
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const { keywords } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const priceHandler = (e, newValue) => {
    setPrice(newValue);
  };

  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );

  const [rating, setRating] = useState(0);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keywords, currentPage, price, category, rating));
    console.log(products);
  }, [dispatch, keywords, alert, currentPage, price, category, rating, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={10000}
              style={{ marginBottom: "2rem" }}
            />

            <Typography>Category</Typography>
            <ul className="categoryBox" style={{ marginBottom: "2rem" }}>
              {categories.map((category) => {
                return (
                  <li
                    className="category-link"
                    key="category"
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                );
              })}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
                aria-labelledby="continous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemCountPerPage="8"
              totalItemsCount={productsCount}
              onChange={setCurrentPage}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default Products;
