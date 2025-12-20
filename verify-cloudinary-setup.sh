#!/bin/bash
# DTales Tech Upload System Verification Script
# Run this to verify Cloudinary setup is correct

echo "🔍 DTales Tech Upload System Verification"
echo "=========================================="
echo ""

# Check 1: No local uploads directory
echo "✓ Checking for local uploads directories..."
if [ -d "server/uploads" ] || [ -d "uploads" ]; then
  echo "❌ FAIL: Local uploads directory exists - should be deleted"
  exit 1
else
  echo "✅ PASS: No local uploads directories found"
fi

# Check 2: Dependencies installed
echo ""
echo "✓ Checking backend dependencies..."
cd server 2>/dev/null || { echo "❌ server directory not found"; exit 1; }

if ! grep -q '"cloudinary"' package.json; then
  echo "❌ FAIL: cloudinary not in package.json"
  exit 1
fi

if ! grep -q '"multer"' package.json; then
  echo "❌ FAIL: multer not in package.json"
  exit 1
fi

if ! grep -q '"mammoth"' package.json; then
  echo "❌ FAIL: mammoth not in package.json"
  exit 1
fi

echo "✅ PASS: All required dependencies present"

# Check 3: No diskStorage in our code
echo ""
echo "✓ Checking for diskStorage usage..."
if grep -r "multer.diskStorage\|diskStorage()" routes/ index.js 2>/dev/null | grep -v node_modules; then
  echo "❌ FAIL: diskStorage found in code"
  exit 1
else
  echo "✅ PASS: No diskStorage in application code"
fi

# Check 4: No express.static for uploads
echo ""
echo "✓ Checking for express.static uploads..."
if grep -r "express.static.*uploads" index.js routes/ 2>/dev/null; then
  echo "❌ FAIL: express.static for uploads found"
  exit 1
else
  echo "✅ PASS: No express.static for uploads"
fi

# Check 5: Cloudinary config present
echo ""
echo "✓ Checking Cloudinary configuration..."
if ! grep -q "cloudinary.config" routes/uploads.js; then
  echo "❌ FAIL: Cloudinary config not found in uploads.js"
  exit 1
else
  echo "✅ PASS: Cloudinary config present"
fi

# Check 6: Environment variables documented
echo ""
echo "✓ Checking environment documentation..."
cd ..
if [ ! -f "server/.env.example" ]; then
  echo "⚠️  WARNING: .env.example not found"
else
  if grep -q "CLOUDINARY_CLOUD_NAME" server/.env.example; then
    echo "✅ PASS: Environment variables documented"
  else
    echo "❌ FAIL: CLOUDINARY variables not in .env.example"
    exit 1
  fi
fi

# Summary
echo ""
echo "=========================================="
echo "🎉 ALL CHECKS PASSED!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Set environment variables in Render:"
echo "   - CLOUDINARY_CLOUD_NAME"
echo "   - CLOUDINARY_API_KEY"
echo "   - CLOUDINARY_API_SECRET"
echo "   - DATABASE_URL"
echo "   - NODE_ENV=production"
echo ""
echo "2. Deploy to Render"
echo ""
echo "3. Test uploads:"
echo "   - Blog cover image"
echo "   - Case study cover image"
echo "   - DOCX upload with images"
echo ""
echo "📖 See CLOUDINARY_DEPLOYMENT_GUIDE.md for details"
echo ""
