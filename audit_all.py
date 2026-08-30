# -*- coding: utf-8 -*-
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

VN_REGEX = re.compile(r'[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]', re.IGNORECASE)

stats = {}
untranslated_items = []

for l in lessons:
    grade = l["grade"]
    num = l["lessonNumber"]
    lid = l.get("id", f"g{grade}_l{num}")
    
    if grade not in stats:
        stats[grade] = {"total_lessons": 0, "lessons_with_vn": 0, "vn_fields": 0}
    stats[grade]["total_lessons"] += 1
    
    lesson_has_vn = False
    
    # 1. Summary EN
    s_en = l.get("summary", {}).get("EN", "") if isinstance(l.get("summary"), dict) else ""
    s_vn = l.get("summary", {}).get("VN", "") if isinstance(l.get("summary"), dict) else ""
    if VN_REGEX.search(str(s_en)) or not s_en or str(s_en) == str(s_vn):
        stats[grade]["vn_fields"] += 1
        lesson_has_vn = True
        untranslated_items.append({"grade": grade, "lesson": num, "id": lid, "type": "summary", "VN": s_vn, "EN": s_en})
        
    # 2. Chapter & Title
    t_en = l.get("title", {}).get("EN", "") if isinstance(l.get("title"), dict) else ""
    if VN_REGEX.search(str(t_en)):
        stats[grade]["vn_fields"] += 1
        lesson_has_vn = True
        untranslated_items.append({"grade": grade, "lesson": num, "id": lid, "type": "title", "VN": l.get("title", {}).get("VN", ""), "EN": t_en})

    # 3. Sections
    for s_idx, sec in enumerate(l.get("sections", [])):
        h_en = sec.get("heading", {}).get("EN", "") if isinstance(sec.get("heading"), dict) else ""
        if VN_REGEX.search(str(h_en)):
            stats[grade]["vn_fields"] += 1
            lesson_has_vn = True
            untranslated_items.append({"grade": grade, "lesson": num, "id": lid, "type": f"sec_{s_idx}_heading", "VN": sec.get("heading", {}).get("VN", ""), "EN": h_en})
        
        for p_idx, pt in enumerate(sec.get("points", [])):
            p_en = pt.get("EN", "") if isinstance(pt, dict) else ""
            p_vn = pt.get("VN", "") if isinstance(pt, dict) else str(pt)
            if isinstance(p_en, list): p_en = " ".join(str(x) for x in p_en)
            if isinstance(p_vn, list): p_vn = " ".join(str(x) for x in p_vn)
            if VN_REGEX.search(str(p_en)) or not p_en or (VN_REGEX.search(str(p_vn)) and str(p_en) == str(p_vn)):
                stats[grade]["vn_fields"] += 1
                lesson_has_vn = True
                untranslated_items.append({"grade": grade, "lesson": num, "id": lid, "type": f"sec_{s_idx}_p_{p_idx}", "VN": p_vn, "EN": p_en})

    # 4. Theory Points
    for tp_idx, tp in enumerate(l.get("theoryPoints", [])):
        tp_en = tp.get("EN", "") if isinstance(tp, dict) else ""
        tp_vn = tp.get("VN", "") if isinstance(tp, dict) else str(tp)
        if isinstance(tp_en, list): tp_en = " ".join(str(x) for x in tp_en)
        if isinstance(tp_vn, list): tp_vn = " ".join(str(x) for x in tp_vn)
        if VN_REGEX.search(str(tp_en)) or not tp_en or (VN_REGEX.search(str(tp_vn)) and str(tp_en) == str(tp_vn)):
            stats[grade]["vn_fields"] += 1
            lesson_has_vn = True
            untranslated_items.append({"grade": grade, "lesson": num, "id": lid, "type": f"theory_{tp_idx}", "VN": tp_vn, "EN": tp_en})

    # 5. Sample Question
    sq = l.get("sampleQuestion", {})
    if isinstance(sq, dict):
        q = sq.get("question", {})
        q_en = q.get("EN", "") if isinstance(q, dict) else ""
        q_vn = q.get("VN", "") if isinstance(q, dict) else str(q)
        if isinstance(q_vn, list): q_vn = " ".join(str(x) for x in q_vn)
        if isinstance(q_en, list): q_en = " ".join(str(x) for x in q_en)
        if VN_REGEX.search(str(q_en)) or not q_en or (VN_REGEX.search(str(q_vn)) and str(q_en) == str(q_vn)):
            stats[grade]["vn_fields"] += 1
            lesson_has_vn = True
            untranslated_items.append({"grade": grade, "lesson": num, "id": lid, "type": "sample_q", "VN": q_vn, "EN": q_en})

        a = sq.get("answer", {})
        a_en = a.get("EN", "") if isinstance(a, dict) else ""
        a_vn = a.get("VN", "") if isinstance(a, dict) else str(a)
        if isinstance(a_vn, list): a_vn = " ".join(str(x) for x in a_vn)
        if isinstance(a_en, list): a_en = " ".join(str(x) for x in a_en)
        if VN_REGEX.search(str(a_en)) or not a_en or (VN_REGEX.search(str(a_vn)) and str(a_en) == str(a_vn)):
            stats[grade]["vn_fields"] += 1
            lesson_has_vn = True
            untranslated_items.append({"grade": grade, "lesson": num, "id": lid, "type": "sample_a", "VN": a_vn, "EN": a_en})

    # 6. Key Formulas and Equations with Vietnamese
    for kf_idx, kf in enumerate(l.get("keyFormulas", [])):
        if VN_REGEX.search(str(kf)):
            stats[grade]["vn_fields"] += 1
            lesson_has_vn = True
            untranslated_items.append({"grade": grade, "lesson": num, "id": lid, "type": f"keyFormula_{kf_idx}", "VN": kf, "EN": kf})

    for eq_idx, eq in enumerate(l.get("equations", [])):
        if VN_REGEX.search(str(eq)):
            stats[grade]["vn_fields"] += 1
            lesson_has_vn = True
            untranslated_items.append({"grade": grade, "lesson": num, "id": lid, "type": f"equation_{eq_idx}", "VN": eq, "EN": eq})

    if lesson_has_vn:
        stats[grade]["lessons_with_vn"] += 1

print("--- FULL AUDIT STATS ---")
for g, st in stats.items():
    print(f"Grade {g}: {st['lessons_with_vn']}/{st['total_lessons']} lessons have untranslated text ({st['vn_fields']} total fields)")

with open("untranslated_audit.json", "w", encoding="utf-8") as f:
    json.dump(untranslated_items, f, ensure_ascii=False, indent=2)

print(f"Total untranslated items across all grades: {len(untranslated_items)}")
