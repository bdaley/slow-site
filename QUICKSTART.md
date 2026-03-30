# Quick Start Guide

## Instant Testing (No Image Generation Required)

The website is ready to test immediately without generating actual images:

```bash
cd /home/bdaley/Projects/web-performance

# Start a local server (choose one):
python3 -m http.server 8000
# OR
php -S localhost:8000
# OR  
npx serve -p 8000

# Open in browser:
# http://localhost:8000
```

The page will load with placeholder image files. This still demonstrates ALL the performance issues except visual image rendering.

## Testing Performance

### Chrome/Edge DevTools

1. **Open DevTools** (F12)
2. **Network Tab**: 
   - See 20+ requests
   - Total size: ~1MB+ (without real images)
   - Observe waterfall of blocking resources
3. **Performance Tab**:
   - Click Record, reload page, stop recording
   - See render-blocking resources in timeline
4. **Lighthouse Tab**:
   - Click "Generate report"
   - Expected Performance Score: < 50
5. **Coverage Tab** (More tools → Coverage):
   - Start coverage, reload page
   - See 50%+ unused CSS/JS

### Firefox Developer Tools

1. **Network Monitor**: See all requests and timing
2. **Performance**: Record page load
3. **Debugger → Coverage**: See unused code

## Expected Performance Issues

Lighthouse should flag:
- ❌ Eliminate render-blocking resources (CSS/JS in <head>)
- ❌ Remove unused CSS (~50KB+)
- ❌ Remove unused JavaScript (~200KB+)
- ❌ Minify CSS (could reduce by 50%)
- ❌ Minify JavaScript (could reduce by 60%)
- ❌ Properly size images
- ❌ Serve images in next-gen formats
- ❌ Avoid enormous network payloads

## File Breakdown

**Vendor libraries** (691KB uncompressed):
- jquery.js: 279KB
- bootstrap.css: 275KB
- font-awesome.css: 137KB

**Custom code** (4,128 lines):
- CSS files: 5 files, ~2,000 lines
- JS files: 5 files, ~2,100 lines

**HTML**:
- index.html: 450+ lines with inline CSS/JS

## Optional: Generate Real Images

If you want to see the full visual experience with large images:

```bash
# Option 1: Install Python dependencies and generate
python3 -m venv venv
source venv/bin/activate
pip install Pillow
python3 generate_images.py

# Option 2: Use ffmpeg (if installed)
bash create_images.sh

# Option 3: Download large stock photos
# Place in images/ directory:
# - hero.jpg (3200x1800)
# - gallery-1.png through gallery-6.png (3000x2000 each)
```

## What Makes It Slow?

1. **13+ render-blocking resources** in `<head>` delay First Contentful Paint
2. **691KB of vendor code** must be downloaded before rendering
3. **Unused CSS/JS** (~250KB) wastes bandwidth
4. **No minification** means files are 2-3x larger than needed
5. **No compression** (Gzip/Brotli) enabled
6. **No lazy loading** - everything loads immediately
7. **Oversized images** (when real images added) waste bandwidth

## Performance Before/After Potential

Current (bad):
- Performance Score: < 50
- FCP: > 3s
- LCP: > 4s
- Total Size: 1MB+ (5MB+ with images)

After optimization (good):
- Performance Score: > 90
- FCP: < 1s
- LCP: < 2.5s
- Total Size: < 200KB (< 500KB with optimized images)

**Potential improvement: 5-10x faster!**

## Learning Resources

- [web.dev/performance](https://web.dev/performance/)
- [MDN Web Performance](https://developer.mozilla.org/en-US/docs/Learn/Performance)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

---

Enjoy exploring this intentionally terrible website! 🐌
