# Performance Test Website

A deliberately poor-performing single-page website designed for web performance testing, education, and optimization practice.

## Purpose

This website is **intentionally built with multiple performance anti-patterns** to serve as:
- A learning resource for web performance optimization
- A test bed for performance analysis tools
- An example of what NOT to do in production websites
- A benchmark for testing performance monitoring solutions

## Performance Problems Included

### 1. Render-Blocking Resources ⛔
- **7 separate CSS files** loaded synchronously in `<head>`
- **6 separate JavaScript files** loaded in `<head>` without `async` or `defer`
- Inline CSS and JavaScript in `<head>` adding more blocking content
- Total blocking resources: 13+ files

**Impact**: Delays First Contentful Paint (FCP) and blocks page rendering

### 2. Unoptimized Images 🖼️
- Hero image: 3200x1800 pixels (~500KB+) displayed much smaller
- Gallery images: 6 images at 3000x2000 pixels each (~1MB+ each)
- All images use **`loading="eager"`** (forces immediate loading)
- Images scaled by browser instead of pre-sized
- PNG format used for photos (should be JPG)
- No modern formats (WebP, AVIF)
- No responsive images (`srcset`)

**Impact**: Slow Largest Contentful Paint (LCP), wasted bandwidth, slow initial load

### 3. Unused Code 🗑️
- `css/unused-styles.css`: Entire CSS file (blog, e-commerce, modal styles) never used
- `js/unused-script.js`: Entire JavaScript file (shopping cart, video player, chat) never used
- Large portions of vendor libraries unused

**Impact**: Wasted bandwidth, increased parse time, slower page load

### 4. Excessive HTTP Requests 🌐
- 13+ separate resource requests instead of bundling
- CSS files not concatenated
- JavaScript files not concatenated
- No CDN usage (third-party libraries served locally)

**Impact**: Increased latency, more round trips, slower load on high-latency connections

### 5. Unminified Resources 📝
- All custom CSS files are verbose with comments and whitespace
- All custom JavaScript files are verbose with extensive logging
- Variable names are overly descriptive
- jQuery: 278KB unminified (vs ~30KB minified gzipped)
- Bootstrap: 274KB unminified CSS

**Impact**: Larger file sizes, slower download times, increased parse time

### 6. No Asset Optimization 🚫
- No compression (Gzip/Brotli)
- No code splitting
- No tree shaking
- No lazy loading (all resources loaded eagerly)
- No resource hints (`preload`, `prefetch`, `dns-prefetch`)

**Impact**: Poor performance scores across all metrics

## Project Structure

```
web-performance/
├── index.html              # Main HTML file with all performance issues
├── css/
│   ├── styles.css          # Main styles (unminified)
│   ├── header.css          # Header-specific styles (unminified)
│   ├── footer.css          # Footer-specific styles (unminified)
│   ├── animations.css      # Animation styles (unminified)
│   └── unused-styles.css   # UNUSED CSS (complete waste)
├── js/
│   ├── main.js             # Main JavaScript (unminified)
│   ├── utils.js            # Utility functions (unminified, many unused)
│   ├── carousel.js         # Carousel code (UNUSED on this page!)
│   ├── analytics.js        # Fake analytics (unminified)
│   └── unused-script.js    # UNUSED JavaScript (complete waste)
├── vendor/
│   ├── jquery.js           # jQuery 3.7.1 unminified (278KB)
│   ├── bootstrap.css       # Bootstrap 5.3.0 unminified (274KB)
│   └── font-awesome.css    # Font Awesome 6.4.0 (136KB)
├── images/
│   ├── hero.jpg            # Oversized hero image (3200x1800)
│   ├── gallery-1.png       # Oversized gallery image (3000x2000)
│   ├── gallery-2.png       # Oversized gallery image (3000x2000)
│   ├── gallery-3.png       # Oversized gallery image (3000x2000)
│   ├── gallery-4.png       # Oversized gallery image (3000x2000)
│   ├── gallery-5.png       # Oversized gallery image (3000x2000)
│   ├── gallery-6.png       # Oversized gallery image (3000x2000)
│   └── README.txt          # Instructions for generating images
├── generate_images.py      # Python script to generate test images (requires Pillow)
├── create_images.sh        # Shell script to create images using ffmpeg
└── README.md               # This file
```

## Setup and Usage

### Option 1: Use as-is (without real images)
The website will work immediately but images will be broken/placeholder files. This still demonstrates most performance issues.

```bash
# Clone or navigate to the directory
cd web-performance

# Open in a browser
python3 -m http.server 8000
# or
npx serve

# Visit http://localhost:8000
```

### Option 2: Generate images with Python (recommended)
Requires Python 3 and Pillow library.

```bash
# Install Pillow (in a virtual environment)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install Pillow

# Generate images
python3 generate_images.py

# Start server and open in browser
python3 -m http.server 8000
```

### Option 3: Generate images with ffmpeg
Requires ffmpeg to be installed.

```bash
# Install ffmpeg (Ubuntu/Debian)
sudo apt install ffmpeg

# Run the generation script
bash create_images.sh

# Start server
python3 -m http.server 8000
```

### Option 4: Use real images
Download large images (3000x2000+) from stock photo sites and place them in the `images/` directory:
- `hero.jpg` (3200x1800 recommended)
- `gallery-1.png` through `gallery-6.png` (3000x2000 recommended)

Save photos as PNG instead of JPG to worsen performance.

## Testing Performance

### Browser DevTools

1. **Network Tab**
   - See 20+ resources loading
   - Observe large file sizes
   - Note blocking resources

2. **Performance Tab**
   - Record a page load
   - See render-blocking in the timeline
   - Observe long tasks

3. **Coverage Tab** (Chrome)
   - Shows unused CSS and JavaScript
   - Should find 50%+ unused code

4. **Lighthouse**
   - Run an audit
   - Performance score should be < 50
   - See specific recommendations

### Expected Lighthouse Issues

- ❌ Eliminate render-blocking resources
- ❌ Properly size images
- ❌ Serve images in next-gen formats
- ❌ Remove unused CSS
- ❌ Remove unused JavaScript
- ❌ Minify CSS
- ❌ Minify JavaScript
- ❌ Reduce initial server response time
- ❌ Avoid enormous network payloads
- ❌ Serve static assets with an efficient cache policy

### Performance Metrics (Expected Poor)

- **FCP (First Contentful Paint)**: > 3s
- **LCP (Largest Contentful Paint)**: > 4s
- **TBT (Total Blocking Time)**: > 600ms
- **CLS (Cumulative Layout Shift)**: Variable
- **SI (Speed Index)**: > 5s
- **TTI (Time to Interactive)**: > 5s

## How to Fix (Learning Exercise)

Try optimizing this website step by step:

1. **Images**
   - Resize to actual display size
   - Convert to appropriate formats (JPG for photos)
   - Add WebP/AVIF versions
   - Implement `loading="lazy"` for below-fold images
   - Add `srcset` for responsive images

2. **CSS**
   - Remove unused CSS files
   - Concatenate CSS into one file
   - Minify CSS
   - Consider critical CSS inline, defer non-critical

3. **JavaScript**
   - Remove unused JavaScript files
   - Concatenate JavaScript
   - Minify JavaScript
   - Add `async` or `defer` attributes
   - Consider code splitting

4. **HTTP Requests**
   - Bundle resources
   - Use CDN for third-party libraries
   - Enable HTTP/2
   - Add resource hints

5. **Compression**
   - Enable Gzip/Brotli compression
   - Optimize asset delivery

## Educational Use

This project is perfect for:
- **Training workshops** on web performance
- **Before/after demonstrations** of optimization techniques
- **Testing performance tools** and monitoring services
- **Learning browser DevTools** and performance analysis
- **Practicing optimization** skills

## Contributing

This is an educational resource. If you have ideas for additional performance anti-patterns to include, feel free to suggest them!

## License

This project is released into the public domain for educational purposes. Use it however you like!

## Credits

Created as a teaching resource for web performance optimization.

---

**Remember**: This website demonstrates what NOT to do. Never build a production website like this! 🐌
