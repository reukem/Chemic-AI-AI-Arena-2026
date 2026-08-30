import json
import time
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Patch cgi for older httpx versions in Python 3.13
import types
if 'cgi' not in sys.modules:
    import email.message
    cgi = types.ModuleType('cgi')
    def parse_header(line):
        m = email.message.Message()
        m['content-type'] = line
        return m.get_content_type(), m.get_params() or {}
    cgi.parse_header = parse_header
    sys.modules['cgi'] = cgi

from googletrans import Translator

def has_vietnamese(text):
    if not isinstance(text, str): return False
    vn_chars = set('àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ')
    return any(c in vn_chars for c in text)

translator = Translator()

cache_file = "translation_cache.json"
if os.path.exists(cache_file):
    with open(cache_file, "r", encoding="utf-8") as f:
        cache = json.load(f)
else:
    cache = {}

def get_translation(text):
    if not text or not has_vietnamese(text):
        return text
    if text in cache:
        return cache[text]
    
    retries = 3
    for attempt in range(retries):
        try:
            translated = translator.translate(text, src='vi', dest='en').text
            time.sleep(0.05) # short sleep
            cache[text] = translated
            return translated
        except Exception as e:
            print(f"Error on attempt {attempt+1} for '{text[:20]}': {e}")
            if attempt == retries - 1:
                return text # Return original if all retries fail
            time.sleep(1.0)

def main():
    file_path = "src/data/vietnamCurriculumData.json"
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    print("Translating missing/imperfect EN fields...")
    
    nodes_to_process = []
    
    def collect_nodes(node):
        if isinstance(node, dict):
            if 'VN' in node and 'EN' in node:
                vn_text = node['VN']
                en_text = node['EN']
                if isinstance(vn_text, str) and has_vietnamese(vn_text):
                    if not en_text or en_text == vn_text or has_vietnamese(en_text):
                        nodes_to_process.append(node)
            for v in node.values():
                collect_nodes(v)
        elif isinstance(node, list):
            for item in node:
                collect_nodes(item)
                
    collect_nodes(data)
    total_nodes = len(nodes_to_process)
    print(f"Total nodes to translate: {total_nodes}")
    
    count = 0
    save_interval = 20
    
    for i, node in enumerate(nodes_to_process):
        vn_text = node['VN']
        node['EN'] = get_translation(vn_text)
        count += 1
        
        if count % save_interval == 0 or i == total_nodes - 1:
            print(f"Processed {i+1}/{total_nodes} nodes. Saving progress...")
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            with open(cache_file, "w", encoding="utf-8") as f:
                json.dump(cache, f, ensure_ascii=False, indent=2)
                
    print("Translation complete.")

if __name__ == "__main__":
    main()
