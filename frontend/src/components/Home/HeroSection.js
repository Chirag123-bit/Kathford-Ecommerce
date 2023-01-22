import React from "react";
import "./hero.css";
import video from "../../videos/intro.mp4";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <video src={video} autoPlay loop muted />
      <h2>
        <span>Welcome To Eshop</span>
        <br />
        <span>Marketplace</span>
      </h2>
      <div className="hero-btns">
        <a href="#container">
          <button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            Get Started
          </button>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
