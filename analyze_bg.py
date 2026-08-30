from PIL import Image
import os

def analyze_and_remove(img_path):
    print(f"Processing {img_path}")
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()
    
    # Analyze corners to find background colors
    width, height = img.size
    corners = [
        data[0], data[width-1], data[(height-1)*width], data[height*width-1]
    ]
    print(f"Corners: {corners}")
    
    # We will assume that any pixel that is EXACTLY one of the two checkerboard colors is transparent.
    # Fake checkerboards usually use (255, 255, 255) and (204, 204, 204).
    # Let's count the frequency of colors on the top border
    border_colors = {}
    for x in range(width):
        c = data[x]
        border_colors[c] = border_colors.get(c, 0) + 1
        
    sorted_colors = sorted(border_colors.items(), key=lambda x: x[1], reverse=True)
    print("Top border colors:", sorted_colors[:5])
    
    bg_colors = set()
    for c, count in sorted_colors[:2]:
        if count > width * 0.1: # Must be reasonably frequent
            bg_colors.add(c)
            
    print("Identified BG colors:", bg_colors)
    
    new_data = []
    # Simple replacement: if pixel in bg_colors, make transparent
    # A slightly better approach is floodfill, but exact color match on fake checkerboard is usually safe if the character doesn't have EXACTLY 255,255,255 and 204,204,204.
    # Let's see if we can do an exact match.
    for item in data:
        if item in bg_colors:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Since exact match might leave artifacts due to jpeg compression (user downloaded as .jpg initially!),
    # we might need a tolerance. 
    # Let's write the result to a test file to see if it works.
    out_path = img_path.replace('.png', '_clean.png')
    img.save(out_path)
    print(f"Saved {out_path}")

analyze_and_remove("C:/Users/THIS PC/.gemini/antigravity-ide/scratch/Chemic-AI-2.0-new-fix-ui-and-api-key-113512842679947699/src/assets/lucy_idle.png")
analyze_and_remove("C:/Users/THIS PC/.gemini/antigravity-ide/scratch/Chemic-AI-2.0-new-fix-ui-and-api-key-113512842679947699/src/assets/lucy_speak.png")
