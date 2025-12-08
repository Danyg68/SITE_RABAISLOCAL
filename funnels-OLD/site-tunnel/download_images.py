import os
import re
import urllib.request
import urllib.parse
import hashlib

# Configuration
TARGET_DIR = "assets/images"
HTML_DIR = "."

# Ensure target directory exists
os.makedirs(TARGET_DIR, exist_ok=True)

# Regex to find src attributes with http/https URLs in img tags
# This is a simplified regex, assuming standard double quotes and src attribute presence
# It matches src="http..." inside any tag, but we primarily care about images.
# To be safer, we could look for <img ... src="..."> but regex for HTML is fragile.
# Given the user request "copier les images", I will focus on image extensions or <img tags.
# Let's try to match src="http..." and check if it looks like an image or is inside an img tag.
# Actually, the user specifically said "images contained in all pages".
# I will search for `src=["'](http[^"']+)["']` and filter by common image extensions OR check if it's in an img tag.
# For simplicity and effectiveness in this context (ClickFunnels export), looking for image extensions in http links is a good heuristic.
# Extensions: .png, .jpg, .jpeg, .gif, .svg, .webp

IMAGE_EXTENSIONS = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp')

def download_file(url, dest_folder):
    try:
        parsed_url = urllib.parse.urlparse(url)
        filename = os.path.basename(parsed_url.path)
        
        # If no filename or weird, use hash
        if not filename or '.' not in filename:
            ext = '.jpg' # Default
            if 'png' in url: ext = '.png'
            elif 'gif' in url: ext = '.gif'
            elif 'webp' in url: ext = '.webp'
            filename = hashlib.md5(url.encode()).hexdigest() + ext
            
        # Handle query parameters in filename if any (though basename usually strips them, sometimes they are part of path)
        filename = urllib.parse.unquote(filename)
        
        # Avoid overwriting different images with same name
        # We can prepend a short hash of the full URL
        url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
        name, ext = os.path.splitext(filename)
        final_filename = f"{name}_{url_hash}{ext}"
        
        dest_path = os.path.join(dest_folder, final_filename)
        
        if not os.path.exists(dest_path):
            print(f"Downloading {url} to {dest_path}...")
            # Add headers to mimic browser to avoid 403
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(dest_path, 'wb') as out_file:
                out_file.write(response.read())
        else:
            print(f"File {dest_path} already exists. Skipping download.")
            
        return final_filename
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return None

def process_html_files():
    files = [f for f in os.listdir(HTML_DIR) if f.endswith('.html')]
    
    for file in files:
        print(f"Processing {file}...")
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Find all http(s) links that look like images
        # Regex: src=["'](http[^"']+)["']
        # We use a set to avoid processing same URL multiple times per file
        matches = set(re.findall(r'src=["\'](https?://[^"\']+)["\']', content))
        
        modified_content = content
        changes_made = False
        
        for url in matches:
            # Check if it is an image
            if any(url.lower().endswith(ext) for ext in IMAGE_EXTENSIONS) or '/image/' in url:
                local_filename = download_file(url, TARGET_DIR)
                if local_filename:
                    # Replace in content
                    # We need to be careful to replace only the exact match
                    # and handle both single and double quotes if regex didn't capture them
                    # The regex captured the URL inside quotes.
                    
                    # We replace the URL with the relative path
                    relative_path = f"assets/images/{local_filename}"
                    modified_content = modified_content.replace(url, relative_path)
                    changes_made = True
        
        if changes_made:
            print(f"Updating {file}...")
            with open(file, 'w', encoding='utf-8') as f:
                f.write(modified_content)

if __name__ == "__main__":
    process_html_files()
