import os
import numpy as np
from PIL import Image, ImageDraw

# Step 1/Setup
os.environ["NUMBA_CACHE_DIR"] = os.path.abspath(".numba_cache")
base_img_path = 'public/lucy_isolated.png'

if not os.path.exists(base_img_path):
    print("Error: base image not found.")
    exit(1)

img = Image.open(base_img_path).convert("RGBA")
w, h = img.size

out_dir = "src/assets/lucy_live2d"
os.makedirs(out_dir, exist_ok=True)

# Step 2: Coordinate Bounding Boxes
head = img.crop((180, 0, 430, 260))
head.save(os.path.join(out_dir, 'lucy_head.png'))

torso = img.crop((180, 240, 430, 1024))
torso.save(os.path.join(out_dir, 'lucy_torso.png'))

# Step 3: Alpha-Mask Blending for the Tail
tail_box = (80, 300, 260, 620)
tail = img.crop(tail_box)
tail_np = np.array(tail).astype(float)

fade_width = 40
tail_w = tail_box[2] - tail_box[0]
tail_h = tail_box[3] - tail_box[1]

for x in range(tail_w - fade_width, tail_w):
    ratio = (tail_w - x) / fade_width
    tail_np[:, x, 3] = tail_np[:, x, 3] * ratio

tail_blended = Image.fromarray(tail_np.astype(np.uint8), "RGBA")
tail_blended.save(os.path.join(out_dir, 'lucy_tail.png'))

# Step 4: Synthetic Mouth Generation
mouth_w, mouth_h = 30, 15
mouth_img = Image.new("RGBA", (mouth_w, mouth_h), (0, 0, 0, 0))
draw = ImageDraw.Draw(mouth_img)
draw.ellipse((0, 0, mouth_w-1, mouth_h-1), fill=(255, 140, 160, 255))
mouth_img.save(os.path.join(out_dir, 'lucy_mouth.png'))

print("Dissection completed! Assets saved to src/assets/lucy_live2d/")
