import os
os.environ["NUMBA_CACHE_DIR"] = os.path.join(os.getcwd(), "numba_cache")
from rembg import remove
from PIL import Image

brain_dir = r"C:\Users\THIS PC\.gemini\antigravity-ide\brain\77f55435-11ed-40ea-bf69-996335342e06"
assets_dir = "src/assets"

# 1st Image (The Standing Menu Sprite - 85kb)
standing_path = os.path.join(brain_dir, "media__1781292013190.jpg")
print("Nuking background for Standing Menu Sprite...")
output = remove(Image.open(standing_path))
output.save(os.path.join(assets_dir, "lucy_STANDING_MENU_clean.png"), "PNG")

# 2nd Image (The Face PFP - 230kb)
pfp_path = os.path.join(brain_dir, "media__1781292042420.jpg")
print("Nuking background for Face PFP...")
output = remove(Image.open(pfp_path))
output.save(os.path.join(assets_dir, "lucy_FACE_PFP_clean.png"), "PNG")
    
print("Background removal complete. Correct PNGs generated.")
