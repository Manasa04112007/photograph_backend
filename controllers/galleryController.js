import cloudinary from "../config/cloudinary.js";
import Gallery from "../models/Gallery.js";

// ✅ Upload Image
// filepath: backend/controllers/galleryController.js
// ...existing code...
// ✅ Upload Image
// ...existing code...
// ✅ Upload Image
export const uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary using buffer (for memoryStorage)
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "gallery" },  // Optional: specify folder
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const image = await Gallery.create({
      title: req.body.title,
      category: req.body.category,
      imageUrl: result.secure_url,
    });

    res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
// ...existing code...
// ...existing code...


// ✅ Get All Images
export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Image
export const deleteGalleryImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
