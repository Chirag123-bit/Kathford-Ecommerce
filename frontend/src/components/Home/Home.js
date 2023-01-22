import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../actions/productAction.js";
import ProductCard from "../Product/ProductCard.js";
import HeroSection from "./HeroSection.js";
import "./home.css";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);
  return (
    <div className="homeSection">
      <HeroSection />
      <h2 className="homeHeading">
        <span className="highlight">Featured</span> Products
      </h2>

      <div className="container" id="container">
        {loading ? (
          <div> Loading</div>
        ) : (
          products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
