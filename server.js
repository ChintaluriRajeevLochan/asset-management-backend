require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* ================= CORS FIX ================= */
app.use(
  cors({
    origin: "*", // TEMP FIX (you can restrict later)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: handle preflight requests
app.options("*", cors());

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= ROUTES ================= */
const authRoutes = require("./routes/authroutes");
const assetRoutes = require("./routes/assetRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);

/* ================= TEST ROUTES ================= */
app.get("/", (req, res) => {
  res.send("Asset Management Backend Running");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Hello from Backend!",
  });
});

/* ================= DB CONNECTION ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});