import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);

// Health check route (VERY IMPORTANT for Vercel)
app.get("/", (req, res) => {
  res.send("🚀 Photography Backend is running successfully!");
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("====================================");
  console.log("🚀 Photography Backend Started");
  console.log(`🌍 Environment : ${process.env.NODE_ENV || "development"}`);
  console.log(`📡 Server URL  : http://localhost:${PORT}`);
  console.log("====================================");
});

export default app;
