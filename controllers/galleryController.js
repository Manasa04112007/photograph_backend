import cloudinary from "../config/cloudinary.js";
import Gallery from "../models/Gallery.js";

// ===============================
// ✅ UPLOAD GALLERY IMAGE
// ===============================
export const uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "gallery" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const image = await Gallery.create({
      
      category: req.body.category || "",
      imageUrl: uploaded.secure_url,
    });

    res.status(201).json({ message: "Image uploaded", data: image });
  } catch (error) {
    console.error("Upload gallery error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// ✅ GET ALL GALLERY IMAGES
// ===============================
export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    console.error("Get gallery error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// ✅ UPDATE GALLERY IMAGE (SAME AS EVENT)
// ===============================
export const updateGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Update text fields
    
    image.category = req.body.category || image.category;

    // If new image uploaded → upload to Cloudinary
    if (req.file) {
      const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "gallery" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      image.imageUrl = uploaded.secure_url;
    }

    await image.save();

    res.status(200).json({ message: "Gallery image updated", data: image });
  } catch (error) {
    console.error("Update gallery error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// ✅ DELETE GALLERY IMAGE
// ===============================
export const deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await image.deleteOne();
    res.status(200).json({ message: "Image deleted" });
  } catch (error) {
    console.error("Delete gallery error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
