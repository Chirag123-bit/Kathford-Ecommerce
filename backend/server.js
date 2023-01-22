const app = require("./app");
const connectDB = require("./config/databaseConfig");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/.env" });
const cloudinary = require("cloudinary");

connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started in port ${process.env.PORT}`);
});
