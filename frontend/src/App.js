import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import LoginRegister from "./components/User/loginRegister";
import Profile from "./components/User/Profile";
import store from "./store";
import React, { useState } from "react";
import { loadUser } from "./components/actions/userAction";
import { useSelector } from "react-redux";
import UpdateProfile from "./components/User/updateProfile";
import UserOptions from "./components/Navbar/userOptions";
import WebFont from "webfontloader";
import Search from "./components/Product/Search";
import Products from "./components/Product/Products";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderSuccess from "./components/cart/OrderSuccess";
import Cart from "./components/cart/Cart";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./components/cart/Payment";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./components/Order/myOrder";
import OrderDetails from "./components/Order/orderDetails";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState(
    "pk_test_51MIaOSSGpLd70Ol3BTaOQ6lrTTsx4IYlEenUlJkgYG6oLGlfeAoerMTauCXeJinMkle4bUs5JExFeDdyaFzr4C8y00UKleJPzI"
  );
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,700", "sans-serif"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Navbar />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keywords" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/profile"
          element={
            isAuthenticated ? <Profile user={user} /> : <LoginRegister />
          }
        />
        <Route
          path="/me/update"
          element={isAuthenticated ? <UpdateProfile /> : <LoginRegister />}
        />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/shipping"
          element={
            isAuthenticated ? <Shipping user={user} /> : <LoginRegister />
          }
        />
        <Route
          path="/me/update"
          element={isAuthenticated ? <UpdateProfile /> : <LoginRegister />}
        />
        <Route
          path="/order/confirm"
          element={isAuthenticated ? <ConfirmOrder /> : <LoginRegister />}
        />
        <Route
          path="/success"
          element={isAuthenticated ? <OrderSuccess /> : <LoginRegister />}
        />
        <Route
          path="/orders"
          element={isAuthenticated ? <MyOrders /> : <LoginRegister />}
        />
        <Route
          path="/order/:id"
          element={isAuthenticated ? <OrderDetails /> : <LoginRegister />}
        />
        <Route
          path="/process/payment"
          element={
            isAuthenticated ? (
              <Elements stripe={loadStripe(stripeApiKey)}>
                {" "}
                <Payment />
              </Elements>
            ) : (
              <LoginRegister />
            )
          }
        />
        <Route path="*" element={<h1>404 URL not found</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
