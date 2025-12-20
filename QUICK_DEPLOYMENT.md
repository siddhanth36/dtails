# Quick Deployment Guide - Environment Variables

## Status: ✅ PRODUCTION READY

This backend is configured for production deployment on Render with fail-fast environment validation.

---

## REQUIRED ENVIRONMENT VARIABLES (4)

These MUST be set or the server will not start.

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DATABASE_URL=postgresql://user:password@host:port/dbname
```

---

## OPTIONAL ENVIRONMENT VARIABLES (3)

These have sensible defaults if not provided.

```env
NODE_ENV=production              # Enables SSL for database
FRONTEND_URL=https://your-frontend.com  # CORS whitelist (defaults to *)
PORT=10000                       # Server port (defaults to 10000)
```

---

## HOW TO DEPLOY ON RENDER

### Step 1: Set Environment Variables

In Render Dashboard → Your Service → Environment:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your PostgreSQL connection string from Render |
| `CLOUDINARY_CLOUD_NAME` | From https://cloudinary.com/console |
| `CLOUDINARY_API_KEY` | From https://cloudinary.com/console |
| `CLOUDINARY_API_SECRET` | From https://cloudinary.com/console |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Your frontend URL (e.g., https://dtales.vercel.app) |

### Step 2: Deploy

Push to git and deploy. The server will:
1. Validate all 4 required environment variables
2. Configure Cloudinary
3. Start listening on the specified PORT

### Step 3: Verify

Check the deployment logs for:
```
✅ Environment variables validated
✅ Cloudinary configured successfully
Backend running on port 10000
```

If you see this, you're ready to use the API.

---

## HOW TO TEST LOCALLY

### Step 1: Configure Environment

```bash
cd server
cp .env.example .env
```

Edit `.env` and fill in:
- `DATABASE_URL` - your local PostgreSQL
- `CLOUDINARY_CLOUD_NAME` - your Cloudinary credentials
- `CLOUDINARY_API_KEY` - your Cloudinary credentials
- `CLOUDINARY_API_SECRET` - your Cloudinary credentials

### Step 2: Start Server

```bash
npm install
npm start
```

Should see:
```
✅ Environment variables validated
✅ Cloudinary configured successfully
Backend running on port 10000
```

### Step 3: Test Uploads

Try uploading an image via the admin panel. It should succeed if credentials are valid.

---

## TROUBLESHOOTING

### Server won't start - "Missing required environment variables"

**Cause:** One or more required variables are not set.

**Fix:** 
- Check your `.env` file (local) or Render dashboard (production)
- Ensure these 4 are present: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, DATABASE_URL
- Server will list which ones are missing in the error message

### Uploads fail - "Cloudinary upload failed"

**Cause:** Cloudinary credentials are invalid or not configured.

**Fix:**
- Verify CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET are correct
- Get credentials from https://cloudinary.com/console
- Restart server after updating

### Database connection fails

**Cause:** DATABASE_URL is invalid or database is down.

**Fix:**
- Check DATABASE_URL format: `postgresql://user:password@host:port/dbname`
- Verify database is running
- Restart server after fixing

---

## SECURITY NOTES

- ✅ Never commit `.env` to git (use `.env.example` as template)
- ✅ Environment variables are NOT logged in console
- ✅ Cloudinary credentials are validated at startup only
- ✅ Database connections use SSL in production (`NODE_ENV=production`)
- ✅ No hardcoded secrets in source code

---

## REFERENCE

For complete details, see [ENVIRONMENT_CONFIGURATION.md](./ENVIRONMENT_CONFIGURATION.md)

---

**Last Updated:** 2025-12-20  
**Version:** 1.0  
**Status:** Production-Ready
