const cloudinary = require("cloudinary").v2;

// Configure Cloudinary ONCE at startup with validation
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing required Cloudinary environment variables");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
  api_key: process.env.CLOUDINARY_API_KEY.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET.trim(),
});

console.log("✅ Cloudinary configured for:", process.env.CLOUDINARY_CLOUD_NAME);

module.exports = cloudinary;
