import os
import numpy as np
from PIL import Image, ImageDraw

os.environ["NUMBA_CACHE_DIR"] = os.path.abspath(".numba_cache")
base_img_path = 'public/lucy_isolated.png'

if not os.path.exists(base_img_path):
    print("Error: base image not found.")
    exit(1)

# Open original image and get dimensions
img = Image.open(base_img_path).convert("RGBA")
w, h = img.size
np_img = np.array(img)

out_dir = "src/assets/lucy_live2d"
os.makedirs(out_dir, exist_ok=True)

# Helper function to extract a region into a full-sized transparent canvas
def extract_layer(np_source, box):
    # box is (left, upper, right, lower)
    layer = np.zeros_like(np_source)
    left, upper, right, lower = box
    layer[upper:lower, left:right] = np_source[upper:lower, left:right]
    return layer

# 1. Torso Layer
# (Everything below y=240, except the tail on the far left)
torso_np = extract_layer(np_img, (180, 240, 440, 1024))
Image.fromarray(torso_np, "RGBA").save(os.path.join(out_dir, 'lucy_torso.png'))

# 2. Head Layer
# (Everything above y=260)
head_np = extract_layer(np_img, (150, 0, 450, 260))
Image.fromarray(head_np, "RGBA").save(os.path.join(out_dir, 'lucy_head.png'))

# 3. Tail Layer
# (The tail is mostly left side: x from 80 to 260, y from 300 to 620)
tail_box = (80, 300, 260, 620)
tail_np = extract_layer(np_img, tail_box)

# Alpha mask blending for tail where it connects to the body (right edge of tail)
fade_width = 50
tail_w = tail_box[2]
for x in range(tail_w - fade_width, tail_w):
    ratio = (tail_w - x) / fade_width
    tail_np[:, x, 3] = (tail_np[:, x, 3].astype(float) * ratio).astype(np.uint8)

Image.fromarray(tail_np, "RGBA").save(os.path.join(out_dir, 'lucy_tail.png'))

# 4. Synthetic Mouth (Full canvas size for perfect alignment)
mouth_layer = np.zeros_like(np_img)
mouth_img = Image.fromarray(mouth_layer, "RGBA")
draw = ImageDraw.Draw(mouth_img)
# Her mouth is around x=298, y=198 (based on previous RGB tests)
mouth_x, mouth_y = 298, 198
mouth_w, mouth_h = 24, 12
# Draw a soft pink oval
draw.ellipse((mouth_x - mouth_w//2, mouth_y - mouth_h//2, mouth_x + mouth_w//2, mouth_y + mouth_h//2), fill=(255, 140, 160, 255))
mouth_img.save(os.path.join(out_dir, 'lucy_mouth.png'))

print("Fixed dissection completed! All layers have identical 571x1024 canvas size.")
