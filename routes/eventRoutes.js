import express from "express";
import upload from "../middleware/upload.js";

import {
  getEvents,
  uploadEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// ✅ GET all events
router.get("/", getEvents);

// ✅ CREATE event (upload image)
router.post("/upload", upload.single("image"), uploadEvent);

// ✅ UPDATE event (edit name / description / image)
router.put("/:id", upload.single("image"), updateEvent);

// ✅ DELETE event
router.delete("/:id", deleteEvent);

export default router;
