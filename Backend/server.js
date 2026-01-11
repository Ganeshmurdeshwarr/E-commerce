const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRouter");
const checkoutRouter = require("./routes/checkoutRouter");
const orderRouter = require("./routes/orderRouter");
const uploadRouter = require("./routes/uploadRoutes");
const subscriberRouter = require("./routes/SubscribeRouter");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");



const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://e-commerce-p1y6.vercel.app"],
    credentials: true,
  })
);
app.options("*", cors());


const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

//Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

//API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api", subscriberRouter);

app.listen(PORT, () => {
  console.log(`Server  running on post: ${PORT} `);
});
