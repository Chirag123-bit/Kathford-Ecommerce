const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/.env" });

app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const morgan = require("morgan");
app.use(morgan("dev"));
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoutes");
const paymentRoute = require("./routes/paymentRoute");

app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", paymentRoute);

module.exports = app;
