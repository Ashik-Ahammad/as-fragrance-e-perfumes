const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load Environment Variables
dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const bannerRoutes = require("./routes/bannerRoutes");
const comboRoutes = require("./routes/comboRoutes");
const couponRoutes = require("./routes/couponRoutes");
const perfumeRoutes = require("./routes/perfumeRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");

// Mount Routes
app.use("/banners", bannerRoutes);
app.use("/combos", comboRoutes);
app.use("/coupons", couponRoutes);
app.use("/perfume", perfumeRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/user-role", require("./routes/userRoutes")); // Optional alias depending on existing structure
app.use("/reviews", reviewRoutes);
app.use("/newsletter", newsletterRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("AS Fragrance - Secured Server is running");
});

module.exports = app;
