import express from "express";
import upload from "../middleware/upload.js";
import {
  uploadGalleryImage,
  getGalleryImages,
} from "../controllers/galleryController.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadGalleryImage);
router.get("/", getGalleryImages);

export default router;
