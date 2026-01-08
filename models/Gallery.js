import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String },
    imageUrl: { type: String, required: true },
    category: { type: String }, // wedding, portrait, etc
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
