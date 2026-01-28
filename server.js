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

// ✅ FIXED CORS CONFIG
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://photography-revu.vercel.app",
      "https://photograph-backend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());

// Routes
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Photography Backend is running successfully!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("====================================");
  console.log("🚀 Photography Backend Started");
  console.log(`📡 Server running on port ${PORT}`);
  console.log("====================================");
});

export default app;
