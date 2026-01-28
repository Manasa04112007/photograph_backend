import express from "express";
import upload from "../middleware/upload.js";
import {
  uploadGalleryImage,
  getGalleryImages,
  updateGalleryImage,
  deleteGalleryImage,
} from "../controllers/galleryController.js";

const router = express.Router();

// GET all images
router.get("/", getGalleryImages);


// UPLOAD image
router.post("/upload", upload.single("image"), uploadGalleryImage);

// UPDATE image (same as event update)
router.put("/:id", upload.single("image"), updateGalleryImage);

// DELETE image
router.delete("/:id", deleteGalleryImage);

export default router;
