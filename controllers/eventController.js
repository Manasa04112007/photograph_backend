import Event from "../models/Event.js";
import cloudinary from "../config/cloudinary.js";


// ============================
// GET ALL EVENTS
// ============================
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    console.error("Get events error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ============================
// UPLOAD EVENT
// ============================
export const uploadEvent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "events" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Save event in DB
    const newEvent = await Event.create({
      eventName: req.body.eventName,
      description: req.body.description || "",
      imageUrl: uploaded.secure_url,
    });

    res.status(201).json({
      message: "Event uploaded successfully",
      data: newEvent,
    });
  } catch (err) {
    console.error("Upload event error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ============================
// UPDATE EVENT
// ============================
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update text fields
    event.eventName = req.body.eventName || event.eventName;
    event.description = req.body.description || event.description;

    // If new image uploaded → replace image
    if (req.file) {
      const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "events" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      event.imageUrl = uploaded.secure_url;
    }

    await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      data: event,
    });
  } catch (err) {
    console.error("Update event error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ============================
// DELETE EVENT
// ============================
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.deleteOne();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete event error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
