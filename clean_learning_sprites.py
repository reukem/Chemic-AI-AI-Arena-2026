import os
os.environ["NUMBA_CACHE_DIR"] = os.path.join(os.getcwd(), ".numba_cache")
from rembg import remove
from PIL import Image
import glob

assets_dir = "src/assets"

# Target mapping
files_to_process = {
    "learning_idle*": "lucy_learning_idle_clean.png",
    "learning_speak*": "lucy_learning_speak_clean.png"
}

for pattern, output_name in files_to_process.items():
    matches = glob.glob(os.path.join(assets_dir, pattern))
    # filter out the _clean ones just in case the script runs twice
    raw_matches = [m for m in matches if "_clean" not in m]
    
    if raw_matches:
        input_path = raw_matches[0]
        output_path = os.path.join(assets_dir, output_name)
        
        print(f"Processing {input_path} -> {output_path}...")
        try:
            with open(input_path, 'rb') as i:
                with open(output_path, 'wb') as o:
                    input_data = i.read()
                    output_data = remove(input_data)
                    o.write(output_data)
            print(f"Success! Saved clean sprite: {output_name}")
        except Exception as e:
            print(f"Error processing {input_path}: {e}")
    else:
        print(f"Could not find raw sprite matching pattern: {pattern}")
