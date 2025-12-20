# 📋 DTales Tech Cloudinary Setup Checklist

## Pre-Deployment Checklist

### ✅ Code Implementation
- [x] Remove local file storage (diskStorage, /uploads, fs operations)
- [x] Install Cloudinary dependencies (cloudinary, multer, mammoth)
- [x] Implement POST /api/uploads/image endpoint
- [x] Implement POST /api/uploads/docx endpoint
- [x] Update frontend to use Cloudinary endpoints
- [x] Update package.json with dependencies
- [x] Create .env.example file
- [x] Create deployment documentation

### ⏳ Cloudinary Setup (DO THIS NOW)

1. **Sign up for Cloudinary:**
   - Go to https://cloudinary.com
   - Create free account (or use existing)
   - Navigate to Dashboard

2. **Copy credentials:**
   - [ ] Cloud Name: `_________________`
   - [ ] API Key: `_________________`
   - [ ] API Secret: `_________________`

### ⏳ Render Configuration (DO THIS NOW)

Go to Render Dashboard → Your Service → Environment:

- [ ] `CLOUDINARY_CLOUD_NAME` = (paste from above)
- [ ] `CLOUDINARY_API_KEY` = (paste from above)
- [ ] `CLOUDINARY_API_SECRET` = (paste from above)
- [ ] `DATABASE_URL` = (your PostgreSQL URL)
- [ ] `NODE_ENV` = `production`
- [ ] `FRONTEND_URL` = (your frontend URL)

### ⏳ Deployment

- [ ] Push code to git repository
- [ ] Trigger Render deploy (or wait for auto-deploy)
- [ ] Check Render logs for errors
- [ ] Verify service is running

### ⏳ Testing

#### Test 1: Blog Cover Image Upload
- [ ] Go to `/admin` and login
- [ ] Click "New Blog"
- [ ] Click "Choose Image"
- [ ] Select an image file
- [ ] Verify: Image uploads without error
- [ ] Verify: Preview shows immediately
- [ ] Verify: URL starts with `https://res.cloudinary.com/`

#### Test 2: Case Study Cover Image Upload
- [ ] Go to "New Case Study"
- [ ] Click "Choose Image"
- [ ] Select an image file
- [ ] Verify: Image uploads without error
- [ ] Verify: Preview shows immediately
- [ ] Verify: URL starts with `https://res.cloudinary.com/`

#### Test 3: DOCX Upload (Blog)
- [ ] Create a Google Doc with text and at least 1 image
- [ ] Download as .docx
- [ ] In "New Blog", click "Choose .docx File"
- [ ] Select the downloaded file
- [ ] Verify: Upload succeeds without error
- [ ] Fill title, add cover image
- [ ] Click "Publish"
- [ ] Verify: Redirects to dashboard

#### Test 4: DOCX Upload (Case Study)
- [ ] Repeat Test 3 for Case Study
- [ ] Verify: No errors

#### Test 5: Public Rendering (Blog)
- [ ] Go to public blogs page
- [ ] Click on published blog
- [ ] Verify: Cover image displays
- [ ] Verify: Content images display
- [ ] Verify: No broken image links
- [ ] Open browser DevTools → Network
- [ ] Verify: No 404 errors
- [ ] Verify: All images load from Cloudinary

#### Test 6: Public Rendering (Case Study)
- [ ] Repeat Test 5 for Case Studies
- [ ] Verify: All images work

#### Test 7: After Restart
- [ ] In Render dashboard, restart service
- [ ] Wait for service to come back online
- [ ] Repeat Test 5 and Test 6
- [ ] Verify: Images still display correctly

### ✅ Success Criteria

All tests passed:
- [x] Code implemented correctly
- [ ] Cloudinary credentials set
- [ ] Environment variables configured
- [ ] Service deployed successfully
- [ ] Uploads work without errors
- [ ] Images persist after restart
- [ ] Public pages render correctly
- [ ] No 404 or 500 errors

---

## Quick Reference

**Verification Script:**
```bash
./verify-cloudinary-setup.sh
```

**View Logs (if errors):**
- Render Dashboard → Logs tab
- Look for "CLOUDINARY" or "UPLOAD" errors

**Common Issues:**

| Error | Cause | Fix |
|-------|-------|-----|
| "Failed to upload image" | Missing env vars | Set CLOUDINARY_* in Render |
| "Invalid API key" | Wrong credentials | Double-check values |
| "Failed to parse .docx" | Invalid file | Re-download as .docx |
| Images don't load | Old DB data | See CLOUDINARY_DEPLOYMENT_GUIDE.md |

---

## Documentation Files

- `UPLOADS_FIXED_SUMMARY.md` - Overview of what was fixed
- `CLOUDINARY_DEPLOYMENT_GUIDE.md` - Comprehensive guide
- `server/.env.example` - Environment variable template
- `verify-cloudinary-setup.sh` - Automated verification
- `DEPLOYMENT_CHECKLIST.md` - This file

---

## Status Tracking

- [x] Development: COMPLETE
- [ ] Cloudinary Setup: **WAITING FOR YOU**
- [ ] Render Config: **WAITING FOR YOU**
- [ ] Deployment: **WAITING FOR DEPLOY**
- [ ] Testing: **WAITING FOR TESTS**

---

## Support

If anything fails:

1. Check Render logs
2. Verify environment variables
3. Run `./verify-cloudinary-setup.sh`
4. Read troubleshooting in `CLOUDINARY_DEPLOYMENT_GUIDE.md`

---

**Next Action:** Go to https://cloudinary.com and get your credentials!
