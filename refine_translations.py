import json
import time
import os
import sys
import types

sys.stdout.reconfigure(encoding='utf-8')

# Patch cgi for older httpx versions in Python 3.13
if 'cgi' not in sys.modules:
    import email.message
    cgi = types.ModuleType('cgi')
    def parse_header(line):
        m = email.message.Message()
        m['content-type'] = line
        return m.get_content_type(), m.get_params() or {}
    cgi.parse_header = parse_header
    sys.modules['cgi'] = cgi

from google import genai
from google.genai import types as genai_types

def main():
    # Ensure API key is set
    if "GEMINI_API_KEY" not in os.environ:
        print("Error: Please set the GEMINI_API_KEY environment variable before running this script.")
        print("Example: $env:GEMINI_API_KEY='your_api_key' in PowerShell")
        sys.exit(1)

    # Initialize Gemini client
    client = genai.Client()
    
    file_path = "src/data/vietnamCurriculumData.json"
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    cache_file = "refinement_cache.json"
    if os.path.exists(cache_file):
        with open(cache_file, "r", encoding="utf-8") as f:
            cache = json.load(f)
    else:
        cache = {}
        
    print("Finding translated nodes to refine...")
    nodes_to_process = []
    
    def collect_nodes(node):
        if isinstance(node, dict):
            if 'VN' in node and 'EN' in node:
                vn_text = node['VN']
                en_text = node['EN']
                # Only process if VN has text and EN exists and is not just empty
                if isinstance(vn_text, str) and vn_text.strip() and isinstance(en_text, str) and en_text.strip():
                     nodes_to_process.append(node)
            for v in node.values():
                collect_nodes(v)
        elif isinstance(node, list):
            for item in node:
                collect_nodes(item)
                
    collect_nodes(data)
    total_nodes = len(nodes_to_process)
    print(f"Total nodes to refine: {total_nodes}")
    
    system_instruction = (
        "You are an expert bilingual Chemistry teacher (Vietnamese/English). "
        "Review the provided English translation of the Vietnamese text. "
        "Ensure it is factually correct in chemistry contexts and phrased naturally as a native English speaker would say it. "
        "Do NOT add any extra conversational text. Return ONLY the refined English text."
    )
    
    count = 0
    save_interval = 20
    
    for i, node in enumerate(nodes_to_process):
        vn_text = node['VN']
        en_text = node['EN']
        
        # Skip if it's already refined in cache
        if vn_text in cache:
            node['EN'] = cache[vn_text]
            count += 1
            continue
            
        prompt = f"Vietnamese Source:\n{vn_text}\n\nCurrent Translation:\n{en_text}\n\nPlease refine the translation:"
        
        retries = 10
        refined = en_text
        for attempt in range(retries):
            try:
                response = client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=prompt,
                    config=genai_types.GenerateContentConfig(
                        system_instruction=system_instruction,
                        temperature=0.2,
                    ),
                )
                refined = response.text.strip()
                cache[vn_text] = refined
                # Small delay to respect rate limits
                time.sleep(1.0)
                break
            except Exception as e:
                print(f"Error on attempt {attempt+1} for '{vn_text[:30]}': {e}")
                time.sleep(60.0) # Google API blocks for ~47-60s on Free tier limit
        
        node['EN'] = refined
        count += 1
        
        if count % save_interval == 0 or i == total_nodes - 1:
            print(f"Processed {i+1}/{total_nodes} nodes. Saving progress...")
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            with open(cache_file, "w", encoding="utf-8") as f:
                json.dump(cache, f, ensure_ascii=False, indent=2)

    print("Refinement complete!")

if __name__ == "__main__":
    main()
