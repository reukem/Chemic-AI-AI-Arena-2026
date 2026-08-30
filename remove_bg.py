import os
os.environ["NUMBA_CACHE_DIR"] = os.path.join(os.getcwd(), "numba_cache")

from rembg import remove
from PIL import Image

assets_dir = "src/assets"
# Mapping the exact user filenames to code-safe transparent PNGs
files_to_process = {
    "Lucy sprite in the menu.jpg": "lucy_menu_clean.png",
    "Lucy pfp menu profile picture.jpg": "lucy_pfp_clean.png"
}

for input_name, output_name in files_to_process.items():
    input_path = os.path.join(assets_dir, input_name)
    output_path = os.path.join(assets_dir, output_name)
    
    if os.path.exists(input_path):
        print(f"Nuking background for: {input_name}")
        img = Image.open(input_path)
        output = remove(img)
        output.save(output_path, "PNG")
        print(f"Saved clean transparent asset to: {output_name}")
    else:
        print(f"ERROR: Could not find {input_name} in src/assets! Please check the filename.")
