import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailReducer,
  productReducer,
  productsReducer,
} from "./components/reducer/productReducer";
import {
  allUsersReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./components/reducer/userReducer";
import { cartReducer } from "./components/reducer/cartReducer";
import {
  allOrderReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./components/reducer/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  newReview: newReviewReducer,
  user: userReducer,
  profile: profileReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newProduct: newProductReducer,
  product: productsReducer,
  allOrders: allOrderReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
