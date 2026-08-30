# -*- coding: utf-8 -*-
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

vn_chars = set("àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ")
def has_vn(s): return any(c in vn_chars for c in s) if isinstance(s, str) else False

grade = int(sys.argv[1]) if len(sys.argv) > 1 else 8
with open(f"missing_translations/grade_{grade}.json", "r", encoding="utf-8") as f:
    items = json.load(f)

actual_vn = [it for it in items if has_vn(it["VN"]) or has_vn(it.get("current_EN", ""))]
print(f"--- GRADE {grade}: {len(actual_vn)} real Vietnamese fields ---")
for it in actual_vn:
    print(f"L{it['lessonNumber']} ({it['field']}):")
    print(f"  VN: {it['VN']}")
    print(f"  CUR_EN: {it.get('current_EN', '')}")
