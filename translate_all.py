# -*- coding: utf-8 -*-
import json
import re
import time
from deep_translator import GoogleTranslator

def has_vietnamese(text):
    if not isinstance(text, str):
        return False
    vn_chars = set("àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ")
    return any(c in vn_chars for c in text)

translator = GoogleTranslator(source='vi', target='en')

def get_translation(text, cache):
    if not text or not has_vietnamese(text):
        return text
    
    # Simple formatting placeholders protection (like $$...$$)
    # Actually we can just let deep_translator handle it, but it might mess up LaTeX sometimes.
    # To be safe, we can protect math if needed, but Google Translator usually keeps $$ and numbers mostly intact.
    # We will translate it, then check.
    
    if text in cache:
        return cache[text]
    
    try:
        translated = translator.translate(text)
        time.sleep(0.05) # Rate limiting prevention
        cache[text] = translated
        return translated
    except Exception as e:
        print(f"Error translating: {text[:30]}... -> {e}")
        return text

def process_node(node, cache):
    if isinstance(node, dict):
        if 'VN' in node and 'EN' in node:
            vn_text = node['VN']
            en_text = node['EN']
            if isinstance(vn_text, str) and has_vietnamese(vn_text):
                # If EN doesn't exist, is same as VN, or has Vietnamese chars, we translate it
                if not en_text or en_text == vn_text or has_vietnamese(en_text):
                    node['EN'] = get_translation(vn_text, cache)
        
        for k, v in node.items():
            process_node(v, cache)
    
    elif isinstance(node, list):
        for item in node:
            process_node(item, cache)

def main():
    print("Loading JSON...")
    with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    
    print("Translating missing/imperfect EN fields...")
    cache = {}
    
    try:
        process_node(data, cache)
    except KeyboardInterrupt:
        pass
        
    print("Saving translated JSON...")
    with open("src/data/vietnamCurriculumData.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print("Translation complete.")

if __name__ == "__main__":
    main()
