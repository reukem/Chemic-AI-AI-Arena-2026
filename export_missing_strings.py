# -*- coding: utf-8 -*-
import json
import os

with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    data = json.load(f)

vn_chars = set("àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ")

def has_vn(s):
    return any(c in vn_chars for c in s) if isinstance(s, str) else False

os.makedirs("missing_translations", exist_ok=True)

all_missing = {}

for grade in [8, 9, 10, 11, 12]:
    g_lessons = [l for l in data if l.get("grade") == grade]
    grade_items = []
    
    for l in g_lessons:
        les_num = l.get("lessonNumber")
        les_id = l.get("id")
        
        def collect(node, field_name):
            if isinstance(node, dict):
                if "VN" in node and "EN" in node:
                    vn = node["VN"]
                    en = node.get("EN", "")
                    if isinstance(vn, str) and (has_vn(en) or en == vn or not en or "Solution Salt" in en or "Water khi" in en):
                        item = {
                            "grade": grade,
                            "lessonNumber": les_num,
                            "lessonId": les_id,
                            "field": field_name,
                            "VN": vn,
                            "current_EN": en
                        }
                        grade_items.append(item)
                        all_missing[vn] = ""
                for k, v in node.items():
                    collect(v, f"{field_name}.{k}" if field_name else k)
            elif isinstance(node, list):
                for i, elem in enumerate(node):
                    collect(elem, f"{field_name}[{i}]")
                    
        collect(l, "")
    
    with open(f"missing_translations/grade_{grade}.json", "w", encoding="utf-8") as f:
        json.dump(grade_items, f, ensure_ascii=False, indent=2)
    print(f"Grade {grade}: exported {len(grade_items)} items")

with open("missing_translations/unique_all.json", "w", encoding="utf-8") as f:
    json.dump(list(all_missing.keys()), f, ensure_ascii=False, indent=2)

print(f"Total unique strings across all grades: {len(all_missing)}")
