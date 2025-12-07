from PIL import Image
import os

src = r"c:\Users\manager\OneDrive\rabaislocal\SITE_RABAISLOCAL\pwa-affilie-rabaislocal\icon-512.png"
dst = r"c:\Users\manager\OneDrive\rabaislocal\SITE_RABAISLOCAL\pwa-affilie-rabaislocal\icon-192.png"

try:
    with Image.open(src) as img:
        img_resized = img.resize((192, 192), Image.Resampling.LANCZOS)
        img_resized.save(dst)
        print(f"Resized {src} to {dst}")
except Exception as e:
    print(f"Error: {e}")
