<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# DTales Tech - Professional CMS

A modern, production-ready Content Management System with blog and case study management.

## 🎉 Upload System - NOW FIXED!

All uploads now use **Cloudinary** for permanent, reliable storage.

### Quick Start for Deployment

1. **Read:** [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) - Step-by-step deployment guide
2. **Setup:** Get Cloudinary credentials from https://cloudinary.com
3. **Configure:** Set environment variables in Render
4. **Deploy:** Push and deploy!

### Documentation

- 📋 [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) - Complete deployment checklist
- 📖 [`CLOUDINARY_DEPLOYMENT_GUIDE.md`](CLOUDINARY_DEPLOYMENT_GUIDE.md) - Comprehensive guide
- ✅ [`UPLOADS_FIXED_SUMMARY.md`](UPLOADS_FIXED_SUMMARY.md) - What was fixed
- 🔍 [`verify-cloudinary-setup.sh`](verify-cloudinary-setup.sh) - Automated verification

## Run Locally

**Prerequisites:** Node.js, PostgreSQL


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
