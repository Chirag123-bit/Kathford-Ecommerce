import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/user.png";

const ReviewCard = ({ review }) => {
  console.log(review);
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "#ffd700",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
  };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="user" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
