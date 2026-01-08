import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    eventDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
