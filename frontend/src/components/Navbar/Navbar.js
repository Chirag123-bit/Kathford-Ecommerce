import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../images/logo.png";
import { ImCart } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
function Navbar() {
  return (
    <ReactNavbar
      ProfileIconElement={CgProfile}
      SearchIconElement={FaSearch}
      CartIconElement={ImCart}
      profileIcon={true}
      searchIcon={true}
      cartIcon={true}
      logo={logo}
      burgerColor="orange"
      navColor1="white"
      burgerColorHover="blue"
      link1Text="Home"
      link2Text="Products"
      link3Text="About"
      link4Text="Contact"
      linkSize="1.4rem"
      nav1justifyContent="space-around"
      nav2justifyContent="space-around"
      nav3justifyContent="space-around"
      nav4justifyContent="space-around"
      profileIconColor="black"
      searchIconColor="black"
      cartIconColor="black"
      link1ColorHover="blue"
      link2ColorHover="blue"
      link3ColorHover="blue"
      link4ColorHover="blue"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
    />
  );
}

export default Navbar;
