const { Router } = require("express");
const multer = require("multer");
const mammoth = require("mammoth");
const { cloudinary } = require("../config/cloudinary");

const router = Router();

// Multer in-memory storage (no local disk)
const memoryStorage = multer.memoryStorage();

// ============================================================================
// IMAGE UPLOAD HANDLER
// ============================================================================

const imageFileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and WebP images are allowed"), false);
  }
};

const uploadImage = multer({
  storage: memoryStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
});

/**
 * POST /api/uploads/image
 *
 * Upload a single image file to Cloudinary.
 * 
 * Request:
 *   - multipart/form-data with field "image"
 *
 * Response (201):
 *   { url: "https://res.cloudinary.com/..." }
 *
 * Error Response (400 or 500):
 *   { message: "error description", source: "image_upload" }
 */
router.post("/image", (req, res) => {
  const uploadHandler = uploadImage.single("image");

  uploadHandler(req, res, async (err) => {
    if (err) {
      console.error("❌ IMAGE UPLOAD ERROR:", err.message);
      return res.status(400).json({
        message: err.message || "Failed to upload image",
        source: "image_upload",
      });
    }

    if (!req.file) {
      console.error("❌ IMAGE UPLOAD ERROR: No file provided");
      return res.status(400).json({
        message: "No image file provided",
        source: "image_upload",
      });
    }

    try {
      if (!cloudinary.config().api_key) {
        throw new Error("Cloudinary is not configured");
      }

      const stream = cloudinary.uploader.upload_stream(
        { folder: "dtales/images", resource_type: "image" },
        (error, result) => {
          if (error) {
            console.error("❌ CLOUDINARY IMAGE ERROR:", error.message);
            return res.status(500).json({
              message: `Cloudinary upload failed: ${error.message}`,
              source: "image_upload",
            });
          }
          console.log("✅ Image uploaded successfully:", result.secure_url);
          return res.status(201).json({ url: result.secure_url });
        }
      );
      stream.end(req.file.buffer);
    } catch (e) {
      console.error("❌ IMAGE UPLOAD EXCEPTION:", e.message);
      return res.status(500).json({
        message: e.message || "Failed to upload image",
        source: "image_upload",
      });
    }
  });
});

// ============================================================================
// DOCX UPLOAD HANDLER
// ============================================================================

const docxFileFilter = (req, file, cb) => {
  const allowedMimes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];
  if (allowedMimes.includes(file.mimetype) || file.originalname.endsWith(".docx")) {
    cb(null, true);
  } else {
    cb(new Error("Only .docx files are allowed"), false);
  }
};

const uploadDocxMulter = multer({
  storage: memoryStorage,
  fileFilter: docxFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
  },
});

/**
 * POST /api/uploads/docx
 *
 * Upload and parse a .docx file.
 * 
 * Flow:
 *   1. Accept DOCX via multer memory storage
 *   2. Parse DOCX → HTML using Mammoth
 *   3. Upload images embedded in DOCX to Cloudinary
 *   4. Return clean HTML with Cloudinary image URLs
 *
 * Request:
 *   - multipart/form-data with field "contentFile"
 *
 * Response (200):
 *   { html: "<html content with Cloudinary image URLs>", images: ["url1", "url2"] }
 *
 * Error Response (400 or 500):
 *   { message: "error description", source: "docx_parse" }
 */
router.post("/docx", (req, res) => {
  const uploadHandler = uploadDocxMulter.single("contentFile");

  uploadHandler(req, res, async (err) => {
    if (err) {
      console.error("❌ DOCX UPLOAD ERROR:", err.message);
      return res.status(400).json({
        message: err.message || "Failed to upload .docx file",
        source: "docx_parse",
      });
    }

    if (!req.file) {
      console.error("❌ DOCX UPLOAD ERROR: No file provided");
      return res.status(400).json({
        message: "No .docx file provided",
        source: "docx_parse",
      });
    }

    try {
      if (!cloudinary.config().api_key) {
        throw new Error("Cloudinary is not configured");
      }

      const uploadedImages = [];

      // Parse .docx buffer to HTML with image handling
      // Images are uploaded to Cloudinary; non-image content is extracted
      const result = await mammoth.convertToHtml(
        { arrayBuffer: req.file.buffer },
        {
          convertImage: mammoth.images.imgElement(async (image) => {
            try {
              const buffer = await image.read();
              const url = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                  { folder: "dtales/docs/images", resource_type: "image" },
                  (error, res) => {
                    if (error) return reject(error);
                    resolve(res.secure_url);
                  }
                );
                stream.end(buffer);
              });
              uploadedImages.push(url);
              return { src: url };
            } catch (imgErr) {
              console.error("❌ Failed to upload embedded image:", imgErr.message);
              throw imgErr;
            }
          }),
        }
      );

      console.log(`✅ DOCX parsed successfully. Uploaded ${uploadedImages.length} embedded images`);
      return res.status(200).json({ html: result.value, images: uploadedImages });
    } catch (parseErr) {
      console.error("❌ DOCX PARSE ERROR:", parseErr.message);
      return res.status(500).json({
        message: `Failed to parse .docx file: ${parseErr.message}`,
        source: "docx_parse",
      });
    }
  });
});

module.exports = router;
