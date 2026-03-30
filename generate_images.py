#!/usr/bin/env python3
"""
Image Generation Script for Performance Testing
This script generates large, unoptimized placeholder images for the website.

The images are intentionally:
- Large file sizes (3000x2000+ pixels)
- Wrong formats (PNG for photos, JPG for graphics)
- Uncompressed
- Not optimized

Usage: python3 generate_images.py
"""

from PIL import Image, ImageDraw, ImageFont
import random
import os

# Configuration
IMAGE_WIDTH = 3000
IMAGE_HEIGHT = 2000
HERO_WIDTH = 3200
HERO_HEIGHT = 1800
OUTPUT_DIR = 'images'

def ensure_output_directory():
    """Create the output directory if it doesn't exist"""
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        print(f"Created directory: {OUTPUT_DIR}")
    else:
        print(f"Directory already exists: {OUTPUT_DIR}")

def generate_random_color():
    """Generate a random RGB color"""
    return (
        random.randint(50, 255),
        random.randint(50, 255),
        random.randint(50, 255)
    )

def generate_gradient_image(width, height, color1, color2):
    """Generate an image with a gradient"""
    print(f"Generating gradient image {width}x{height}...")
    
    image = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(image)
    
    for y in range(height):
        # Calculate blended color for this row
        ratio = y / height
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        
        draw.rectangle([(0, y), (width, y + 1)], fill=(r, g, b))
    
    return image

def add_text_to_image(image, text, position='center'):
    """Add text overlay to an image"""
    draw = ImageDraw.Draw(image)
    width, height = image.size
    
    # Try to use a default font, fall back to basic if not available
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 
120)
    except:
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 120)
        except:
            font = ImageFont.load_default()
    
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Calculate position
    if position == 'center':
        x = (width - text_width) // 2
        y = (height - text_height) // 2
    else:
        x, y = position
    
    # Draw text with shadow for better visibility
    shadow_offset = 5
    draw.text((x + shadow_offset, y + shadow_offset), text, font=font, fill=(0, 0, 0, 128))
    draw.text((x, y), text, font=font, fill=(255, 255, 255))
    
    return image

def generate_hero_image():
    """Generate the hero image (saved as JPG - correct format)"""
    print("\nGenerating hero image...")
    
    color1 = (30, 60, 114)  # Dark blue
    color2 = (42, 82, 152)  # Lighter blue
    
    image = generate_gradient_image(HERO_WIDTH, HERO_HEIGHT, color1, color2)
    image = add_text_to_image(image, "HERO IMAGE")
    
    # Add some visual elements
    draw = ImageDraw.Draw(image)
    for _ in range(50):
        x = random.randint(0, HERO_WIDTH)
        y = random.randint(0, HERO_HEIGHT)
        size = random.randint(20, 100)
        color = (255, 255, 255, random.randint(10, 50))
        draw.ellipse([x, y, x + size, y + size], fill=color)
    
    # Save as JPG with low quality (but still large file due to dimensions)
    output_path = os.path.join(OUTPUT_DIR, 'hero.jpg')
    image.save(output_path, 'JPEG', quality=85, optimize=False)
    file_size = os.path.getsize(output_path) / 1024 / 1024
    print(f"Saved: {output_path} ({file_size:.2f} MB)")

def generate_gallery_images():
    """Generate gallery images (saved as PNG - WRONG format for photos!)"""
    print("\nGenerating gallery images...")
    
    colors = [
        ((220, 53, 69), (255, 107, 129)),    # Red gradient
        ((0, 123, 255), (102, 178, 255)),    # Blue gradient
        ((40, 167, 69), (104, 211, 131)),    # Green gradient
        ((255, 193, 7), (255, 220, 93)),     # Yellow gradient
        ((111, 66, 193), (165, 132, 227)),   # Purple gradient
        ((220, 53, 126), (255, 107, 172)),   # Pink gradient
    ]
    
    for i, (color1, color2) in enumerate(colors, 1):
        print(f"  Generating gallery image {i}/6...")
        
        image = generate_gradient_image(IMAGE_WIDTH, IMAGE_HEIGHT, color1, color2)
        image = add_text_to_image(image, f"IMAGE {i}")
        
        # Add some decorative elements
        draw = ImageDraw.Draw(image)
        for _ in range(30):
            x = random.randint(0, IMAGE_WIDTH)
            y = random.randint(0, IMAGE_HEIGHT)
            size = random.randint(50, 200)
            draw.ellipse([x, y, x + size, y + size], 
                        fill=(255, 255, 255, random.randint(10, 40)),
                        outline=(255, 255, 255, 60))
        
        # Save as PNG (WRONG! Should be JPG for photos)
        # PNG will be much larger and slower to load
        output_path = os.path.join(OUTPUT_DIR, f'gallery-{i}.png')
        image.save(output_path, 'PNG', optimize=False)
        file_size = os.path.getsize(output_path) / 1024 / 1024
        print(f"  Saved: {output_path} ({file_size:.2f} MB)")

def main():
    """Main function to generate all images"""
    print("=" * 60)
    print("Performance Test Website - Image Generator")
    print("=" * 60)
    print("\nThis script generates intentionally large, unoptimized images")
    print("for web performance testing purposes.\n")
    
    ensure_output_directory()
    
    # Generate all images
    generate_hero_image()
    generate_gallery_images()
    
    print("\n" + "=" * 60)
    print("Image generation complete!")
    print("=" * 60)
    print("\nGenerated files:")
    print(f"  - {OUTPUT_DIR}/hero.jpg (oversized hero image)")
    print(f"  - {OUTPUT_DIR}/gallery-1.png through gallery-6.png (oversized gallery images)")
    print("\nThese images are intentionally:")
    print("  ✗ Too large (3000x2000+ pixels)")
    print("  ✗ Wrong format (PNG instead of JPG for photos)")
    print("  ✗ Unoptimized (no compression)")
    print("  ✗ Not in modern formats (no WebP/AVIF)")
    print("\nPerfect for demonstrating poor web performance!\n")

if __name__ == '__main__':
    main()
