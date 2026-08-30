# -*- coding: utf-8 -*-
import json
import re

# 1. Load fresh curriculum
with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

# 2. Load Grade 8 & 10
from apply_translations_g8_g10 import G8_G10_TRANSLATIONS
# 3. Load Grade 9
from translate_g9 import G9_TRANSLATIONS
# 4. Load Grade 11
from translate_g11 import G11_TRANSLATIONS
# 5. Load Grade 12
from build_complete_bilingual_g12_all_30 import G12_COMPLETE_EN

# Combine translation dictionary
TRANS_DICT = {}
TRANS_DICT.update(G8_G10_TRANSLATIONS)
TRANS_DICT.update(G9_TRANSLATIONS)
TRANS_DICT.update(G11_TRANSLATIONS)

# Apply Grades 8, 9, 10, 11
for l in lessons:
    grade = l["grade"]
    num = l["lessonNumber"]
    
    if grade in [8, 9, 10, 11]:
        # Chapter Title
        if isinstance(l.get("chapterTitle"), dict):
            ch_vn = l["chapterTitle"].get("VN", "")
            if ch_vn in TRANS_DICT:
                l["chapterTitle"]["EN"] = TRANS_DICT[ch_vn]
                
        # Lesson Title
        if isinstance(l.get("title"), dict):
            t_vn = l["title"].get("VN", "")
            if t_vn in TRANS_DICT:
                l["title"]["EN"] = TRANS_DICT[t_vn]
                
        # Summary
        if isinstance(l.get("summary"), dict):
            s_vn = l["summary"].get("VN", "")
            if s_vn in TRANS_DICT:
                l["summary"]["EN"] = TRANS_DICT[s_vn]
                
        # Sections
        for sec in l.get("sections", []):
            if isinstance(sec.get("heading"), dict):
                h_vn = sec["heading"].get("VN", "")
                if h_vn in TRANS_DICT:
                    sec["heading"]["EN"] = TRANS_DICT[h_vn]
            for pt in sec.get("points", []):
                if isinstance(pt, dict):
                    p_vn = pt.get("VN", "")
                    if p_vn in TRANS_DICT:
                        pt["EN"] = TRANS_DICT[p_vn]
                        
        # Theory Points
        for tp in l.get("theoryPoints", []):
            if isinstance(tp, dict):
                tp_vn = tp.get("VN", "")
                if tp_vn in TRANS_DICT:
                    tp["EN"] = TRANS_DICT[tp_vn]
                elif tp_vn.startswith("[") and "]" in tp_vn:
                    head, body = tp_vn.split("]", 1)
                    head_clean = head[1:].strip()
                    body_clean = body.strip()
                    en_head = TRANS_DICT.get(head_clean, head_clean)
                    en_body = TRANS_DICT.get(body_clean, body_clean)
                    tp["EN"] = f"[{en_head}] {en_body}"

        # Sample Questions
        sq = l.get("sampleQuestion", {})
        if isinstance(sq, dict):
            if isinstance(sq.get("question"), dict):
                q_vn = sq["question"].get("VN", "")
                if isinstance(q_vn, list): q_vn = " ".join(str(x) for x in q_vn)
                if q_vn in TRANS_DICT:
                    sq["question"]["EN"] = TRANS_DICT[q_vn]
            if isinstance(sq.get("answer"), dict):
                a_vn = sq["answer"].get("VN", "")
                if isinstance(a_vn, list): a_vn = " ".join(str(x) for x in a_vn)
                if a_vn in TRANS_DICT:
                    sq["answer"]["EN"] = TRANS_DICT[a_vn]

        # Key Formulas
        new_kf = []
        for kf in l.get("keyFormulas", []):
            new_kf.append(TRANS_DICT.get(kf, kf))
        l["keyFormulas"] = new_kf

        # Equations
        new_eq = []
        for eq in l.get("equations", []):
            new_eq.append(TRANS_DICT.get(eq, eq))
        l["equations"] = new_eq

    elif grade == 12:
        if num in G12_COMPLETE_EN:
            en_data = G12_COMPLETE_EN[num]
            
            # Title
            l["title"]["EN"] = en_data["title"]
            
            # Summary
            l["summary"]["EN"] = en_data["summary"]
            
            # Sections
            for s_idx, sec in enumerate(l.get("sections", [])):
                if s_idx < len(en_data["sections"]):
                    sec["heading"]["EN"] = en_data["sections"][s_idx]["heading"]
                    for p_idx, pt in enumerate(sec.get("points", [])):
                        if p_idx < len(en_data["sections"][s_idx]["points"]):
                            pt["EN"] = en_data["sections"][s_idx]["points"][p_idx]
                            
            # Theory points (flattened)
            flat_tp = []
            for s_en in en_data["sections"]:
                for p_en in s_en["points"]:
                    flat_tp.append(f"[{s_en['heading']}] {p_en}")
            for tp_idx, tp in enumerate(l.get("theoryPoints", [])):
                if tp_idx < len(flat_tp):
                    tp["EN"] = flat_tp[tp_idx]
                    
            # Formulas
            l["keyFormulas"] = en_data["formulas"]
            
            # Equations
            l["equations"] = en_data["equations"]
            
            # Sample Question
            l["sampleQuestion"] = {
                "question": {
                    "VN": l["sampleQuestion"]["question"]["VN"] if isinstance(l["sampleQuestion"]["question"], dict) else str(l["sampleQuestion"]["question"]),
                    "EN": en_data["q"]
                },
                "answer": {
                    "VN": l["sampleQuestion"]["answer"]["VN"] if isinstance(l["sampleQuestion"]["answer"], dict) else str(l["sampleQuestion"]["answer"]),
                    "EN": en_data["a"]
                }
            }

with open("src/data/vietnamCurriculumData.json", "w", encoding="utf-8") as f:
    json.dump(lessons, f, ensure_ascii=False, indent=2)

print("Unified build complete for ALL grades 8-12!")
