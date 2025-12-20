# DTales Tech - Cloudinary Deployment Guide

## ✅ IMPLEMENTATION COMPLETE

All uploads now use **Cloudinary** - NO local file storage.

---

## 🚀 ENVIRONMENT VARIABLES (REQUIRED)

### Backend (Render/Production)

Set these in your Render dashboard under Environment Variables:

```
DATABASE_URL=<your_postgres_connection_string>
FRONTEND_URL=<your_frontend_url>
NODE_ENV=production

# CLOUDINARY CREDENTIALS (REQUIRED)
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

### Frontend

```
VITE_API_BASE_URL=https://dtales-backend.onrender.com
```

---

## 📦 WHAT'S IMPLEMENTED

### ✅ Backend (`server/routes/uploads.js`)

1. **POST /api/uploads/image**
   - Accepts: `multipart/form-data` with `image` field
   - Uploads to: Cloudinary folder `dtales/images`
   - Returns: `{ url: "https://res.cloudinary.com/..." }`
   - No local storage used

2. **POST /api/uploads/docx**
   - Accepts: `multipart/form-data` with `contentFile` field
   - Process:
     - Uploads DOCX to Cloudinary (`dtales/docs`)
     - Parses with mammoth
     - Extracts images from DOCX
     - Uploads images to Cloudinary (`dtales/docs/images`)
     - Replaces all image sources with Cloudinary URLs
   - Returns: `{ html: "<html>...", images: [...] }`
   - No local storage used

### ✅ Frontend

1. **useImageUpload hook** (`src/hooks/useImageUpload.ts`)
   - Uses `/api/uploads/image` endpoint
   - Returns full Cloudinary URL
   - Proper error handling

2. **AdminBlogEditor & AdminCaseStudyEditor**
   - Cover image: Uses `useImageUpload` hook
   - DOCX upload: Calls `/api/uploads/docx` endpoint
   - Saves only Cloudinary URLs to database
   - No local paths stored

### ✅ Database

Tables store only:
- `title` (string)
- `slug` (string)
- `cover_image` / `cover_image_url` (Cloudinary HTTPS URL)
- `content` (HTML string with Cloudinary URLs)
- `published` (boolean)
- `created_at`, `updated_at` (timestamps)

---

## 🔍 VERIFICATION CHECKLIST

✔ No `/uploads` directories exist
✔ No `multer.diskStorage` in code
✔ No `express.static("/uploads")` in server
✔ No `fs.writeFile` for uploads
✔ All dependencies installed: `cloudinary`, `multer`, `mammoth`
✔ Frontend uses API endpoints correctly
✔ Database stores only Cloudinary URLs

---

## 🧪 TESTING

### Test Image Upload

1. Go to Admin Blog Editor or Case Study Editor
2. Click "Choose Image" for cover
3. Select an image
4. Verify:
   - Image uploads without errors
   - Preview shows immediately
   - URL starts with `https://res.cloudinary.com/`

### Test DOCX Upload

1. Create a .docx in Google Docs with:
   - Text content
   - At least 1 image
2. Download as .docx
3. In editor, click "Choose .docx File"
4. Verify:
   - Upload succeeds
   - No errors in console
   - Content saves correctly

### Test Publishing

1. Fill title, upload cover, upload content
2. Click "Publish"
3. Go to public blog/case study page
4. Verify:
   - Cover image displays correctly
   - Content images display correctly
   - No broken image links
   - No 404 errors

---

## 🐛 TROUBLESHOOTING

### Issue: "Failed to upload image"

**Cause:** Missing Cloudinary credentials

**Fix:**
1. Check Render environment variables
2. Ensure all 3 are set:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
3. Restart the Render service

### Issue: "Failed to parse .docx file"

**Cause:** DOCX file is corrupted or not a valid .docx

**Fix:**
1. Re-download from Google Docs as .docx (not .doc)
2. Ensure file is under 50MB
3. Check file is actually a .docx (not renamed .doc)

### Issue: Images render as broken links

**Cause:** Database contains old `/uploads/...` paths

**Fix:**
Run this SQL on your database:
```sql
-- Check for old paths
SELECT id, title, cover_image FROM blogs WHERE cover_image LIKE '/uploads/%';
SELECT id, title, cover_image_url FROM case_studies WHERE cover_image_url LIKE '/uploads/%';

-- Clean them (sets to NULL - re-upload needed)
UPDATE blogs SET cover_image = NULL WHERE cover_image LIKE '/uploads/%';
UPDATE case_studies SET cover_image_url = NULL WHERE cover_image_url LIKE '/uploads/%';
```

Then re-upload cover images for affected items.

---

## 📁 FILE STRUCTURE

```
server/
├── index.js                 # Mounts /api/uploads router
├── routes/
│   ├── uploads.js          # ✅ Cloudinary upload endpoints
│   ├── blogs.js            # Stores content as plain HTML string
│   └── case-studies.js     # Stores content as plain HTML string
└── package.json            # ✅ Has cloudinary, multer, mammoth

src/
├── hooks/
│   └── useImageUpload.ts   # ✅ Uses /api/uploads/image
└── lib/
    └── api.ts              # API helpers

pages/
├── AdminBlogEditor.tsx      # ✅ Uses Cloudinary endpoints
└── AdminCaseStudyEditor.tsx # ✅ Uses Cloudinary endpoints
```

---

## 🎯 EXPECTED RESULTS

After deployment with proper environment variables:

✅ Blog cover images upload successfully
✅ Case study cover images upload successfully
✅ DOCX files upload and parse correctly
✅ Images inside DOCX upload to Cloudinary
✅ All images render on public pages
✅ No 404 errors
✅ No 500 errors
✅ Works after redeploy
✅ Works after restart

---

## 🔐 SECURITY NOTES

1. **Cloudinary credentials** are backend-only (never exposed to frontend)
2. **No file system access** - all files stored on Cloudinary
3. **CORS** configured in `server/index.js` - adjust `FRONTEND_URL` as needed
4. **File size limits**:
   - Images: 10MB max
   - DOCX: 50MB max

---

## 📝 MAINTENANCE

### To get Cloudinary credentials:

1. Sign up at https://cloudinary.com (free tier available)
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Set as environment variables in Render

### To change upload limits:

Edit `server/routes/uploads.js`:
```javascript
limits: {
  fileSize: 10 * 1024 * 1024, // Change this
}
```

### To change folder structure:

Edit `server/routes/uploads.js`:
```javascript
{ folder: "dtales/images", ... }  // Change folder path
```

---

## ✅ DEPLOYMENT CHECKLIST

Before deploying to production:

- [ ] Set `CLOUDINARY_CLOUD_NAME` in Render
- [ ] Set `CLOUDINARY_API_KEY` in Render
- [ ] Set `CLOUDINARY_API_SECRET` in Render
- [ ] Set `DATABASE_URL` in Render
- [ ] Set `NODE_ENV=production` in Render
- [ ] Set `FRONTEND_URL` in Render
- [ ] Verify `npm install` runs successfully
- [ ] Test image upload after deploy
- [ ] Test DOCX upload after deploy
- [ ] Test public page rendering

---

## 🎉 DONE!

Your DTales Tech CMS now uses Cloudinary for all uploads. No more 404/500 errors from local file storage!
