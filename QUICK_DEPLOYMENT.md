# Quick Deployment Guide - Environment Variables

## Status: ✅ PRODUCTION READY

This backend is configured for production deployment on Render with fail-fast environment validation.

---

## REQUIRED ENVIRONMENT VARIABLES (4)

These MUST be set or the server will not start.

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_BUCKET=your_bucket_name
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

### Step 1: Prepare Supabase

1. Create a Supabase project (or use existing)
2. Create a storage bucket (must be PUBLIC)
3. Get credentials from Supabase dashboard:
   - Project URL (Settings → General → Project URL)
   - Service Role Key (Settings → API → Service Role secret)
   - Bucket name (Storage → Buckets)

### Step 2: Set Environment Variables

In Render Dashboard → Your Service → Environment:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your PostgreSQL connection string from Render |
| `SUPABASE_URL` | From Supabase project settings |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase API settings |
| `SUPABASE_BUCKET` | Your public storage bucket name |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Your frontend URL (e.g., https://dtales.vercel.app) |

### Step 3: Deploy

Push to git and deploy. The server will:
1. Validate all 4 required environment variables
2. Configure Supabase Storage
3. Start listening on the specified PORT

### Step 4: Verify

Check the deployment logs for:
```
✅ Environment variables validated
✅ Supabase configured successfully
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
- `SUPABASE_URL` - your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - your Supabase service role key
- `SUPABASE_BUCKET` - your public bucket name

### Step 2: Start Server

```bash
npm install
npm start
```

Should see:
```
✅ Environment variables validated
✅ Supabase configured successfully
Backend running on port 10000
```

### Step 3: Test Uploads

Try uploading an image via the admin panel. It should upload to Supabase Storage and return a public URL.

---

## TROUBLESHOOTING

### Server won't start - "Missing required environment variables"

**Cause:** One or more required variables are not set.

**Fix:** 
- Check your `.env` file (local) or Render dashboard (production)
- Ensure these 4 are present: DATABASE_URL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_BUCKET
- Server will list which ones are missing in the error message

### Uploads fail - "Supabase upload failed"

**Cause:** Supabase credentials are invalid, bucket doesn't exist, or bucket is not PUBLIC.

**Fix:**
- Verify SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are correct
- Ensure the bucket exists in Supabase Storage
- Ensure the bucket has PUBLIC access (not private)
- Check Supabase logs for detailed errors
- Restart server after fixing

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
- ✅ Supabase credentials are validated at startup only
- ✅ Database connections use SSL in production (`NODE_ENV=production`)
- ✅ No hardcoded secrets in source code
- ✅ All images stored in Supabase Storage (no local files)

---

## SUPABASE STORAGE SETUP

### Create a Public Bucket

1. Go to Supabase dashboard → Storage
2. Click "Create a new bucket"
3. Name: `uploads` (or your chosen name)
4. Make it PUBLIC (allow public access to files)
5. Click Create

### Configure File Paths

Images are stored with deterministic paths:
```
uploads/{timestamp}-{random}.{extension}
```

Example: `uploads/1703030400000-a1b2c3.png`

Embedded images from DOCX files are also stored in the same bucket and have public URLs.

---

## REFERENCE

For complete details, see [ENVIRONMENT_CONFIGURATION.md](./ENVIRONMENT_CONFIGURATION.md)

---


**Last Updated:** 2025-12-20  
**Version:** 1.0  
**Status:** Production-Ready
