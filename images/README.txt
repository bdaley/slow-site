IMAGES DIRECTORY
================

This directory should contain large, unoptimized images for performance testing.

Required files:
- hero.jpg: 3200x1800 pixels, JPG format, at least 500KB
- gallery-1.png through gallery-6.png: 3000x2000 pixels, PNG format, at least 1MB each

The images should be:
✗ Oversized (much larger than they'll be displayed)
✗ Unoptimized (no compression)
✗ Wrong format where possible (PNG for photos)
✗ Not in modern formats (no WebP/AVIF)

You can use any large images from:
- https://unsplash.com (download "Original" size)
- https://pixabay.com (download largest size)
- Or generate them using: python3 ../generate_images.py (requires Pillow)

For now, you can test the HTML without images - they will show as broken images,
which actually demonstrates another performance issue!
