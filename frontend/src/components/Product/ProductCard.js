import React from "react";
import { Link } from "react-router-dom";
import ReactStarts from "react-rating-stars-component";
import "./productCard.css";

const options = {
  edit: false,
  color: "rgba(255,255,255,0.5)",
  activeColor: "#495ceb",
  isHalf: true,
  size: window.innerWidth < 600 ? 20 : 25,
};
function ProductCard({ product }) {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <div className="productCard_image">
        <img
          src="https://media.wired.com/photos/5fb2cc575c9914713ead03de/1:1/w_1358,h_1358,c_limit/Gear-Apple-MacBook-Air-top-down-SOURCE-Apple.jpg"
          alt={product.name}
        />
      </div>
      <div className="productCard-body">
        <div className="productCard_name">
          <h2>{product.name}</h2>
        </div>
        <div className="productCard_price">
          <span>Rs. {product.price}</span>
        </div>
        <div className="productCard_rating">
          <ReactStarts {...options} value={product.rating} />
        </div>

        <div className="productCard_footer">
          <div className="productCard_btns">
            <a href="#" className="btn-custom btn-primary">
              View Product
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
