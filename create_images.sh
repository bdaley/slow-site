#!/bin/bash
# Simple script to generate placeholder images using available tools
# This creates simple colored rectangles which will still be large files

echo "============================================================"
echo "Performance Test Website - Image Generator (Simple Version)"
echo "============================================================"
echo ""
echo "Generating large placeholder images..."
echo ""

cd images

# Function to create a colored image using ffmpeg if available
create_image_ffmpeg() {
    local filename=$1
    local width=$2
    local height=$3
    local color=$4
    local text=$5
    
    echo "Creating $filename ($width x $height)..."
    
    # Create a simple colored image
    ffmpeg -f lavfi -i color=c=$color:s=${width}x${height}:d=1 -frames:v 1 "$filename" -y 2>/dev/null
    
    if [ $? -eq 0 ]; then
        size=$(du -h "$filename" | cut -f1)
        echo "  ✓ Created $filename ($size)"
    else
        echo "  ✗ ffmpeg not available"
        return 1
    fi
}

# Try with ffmpeg first
if command -v ffmpeg &> /dev/null; then
    echo "Using ffmpeg to generate images..."
    echo ""
    
    create_image_ffmpeg "hero.jpg" 3200 1800 "0x1e3c72" "HERO"
    create_image_ffmpeg "gallery-1.png" 3000 2000 "0xdc3545" "IMAGE 1"
    create_image_ffmpeg "gallery-2.png" 3000 2000 "0x007bff" "IMAGE 2"
    create_image_ffmpeg "gallery-3.png" 3000 2000 "0x28a745" "IMAGE 3"
    create_image_ffmpeg "gallery-4.png" 3000 2000 "0xffc107" "IMAGE 4"
    create_image_ffmpeg "gallery-5.png" 3000 2000 "0x6f42c1" "IMAGE 5"
    create_image_ffmpeg "gallery-6.png" 3000 2000 "0xdc357e" "IMAGE 6"
    
    echo ""
    echo "============================================================"
    echo "Image generation complete!"
    echo "============================================================"
else
    echo "ffmpeg not found. Creating simple placeholder instructions..."
    echo ""
    echo "Please either:"
    echo "1. Install ImageMagick: sudo apt install imagemagick"
    echo "2. Install ffmpeg: sudo apt install ffmpeg"
    echo "3. Install Python Pillow: pip install Pillow && python3 generate_images.py"
    echo "4. Or download large images manually and place them in the images/ directory"
    echo ""
    echo "Required files:"
    echo "  - images/hero.jpg (should be 3200x1800, at least 500KB)"
    echo "  - images/gallery-1.png through gallery-6.png (should be 3000x2000, at least 1MB each)"
    echo ""
    
    # Create a README as placeholder
    cat > README.txt << 'EOF'
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
EOF
    
    echo "Created images/README.txt with instructions."
fi

cd ..
echo ""
