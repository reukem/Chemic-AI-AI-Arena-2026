# -*- coding: utf-8 -*-
import json
import re

# Load base curriculum
with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

# Collect all translations without importing side-effect modules
def load_all_dicts():
    master = {}
    
    # 1. G8 & G10
    from apply_translations_g8_g10 import G8_G10_TRANSLATIONS
    master.update(G8_G10_TRANSLATIONS)
    
    # 2. G9
    from translate_g9 import G9_TRANSLATIONS
    master.update(G9_TRANSLATIONS)
    
    # 3. G11
    from translate_g11 import G11_TRANSLATIONS
    master.update(G11_TRANSLATIONS)
    
    # 4. G12 polish
    from translate_g12_remaining import G12_REMAINING
    master.update(G12_REMAINING)
    
    return master

MASTER_DICT = load_all_dicts()

# Now re-read fresh lessons AFTER imports are completely finished!
with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

from build_complete_bilingual_g12_all_30 import G12_COMPLETE_EN

# English Chapter Titles
CHAPTER_TITLES = {
    # Grade 8
    "Chương 1: Chất – Nguyên tử – Phân tử": "Chapter 1: Matter – Atoms – Molecules",
    "Chương 2: Phản ứng hóa học": "Chapter 2: Chemical Reactions & Mass Conservation",
    "Chương 3: Mol và Tính toán hóa học": "Chapter 3: Mole & Stoichiometric Calculations",
    "Chương 4: Oxygen – Không khí": "Chapter 4: Oxygen & Atmospheric Chemistry",
    "Chương 5: Hydrogen – Nước": "Chapter 5: Hydrogen & Water Chemistry",
    "Chương 6: Dung dịch": "Chapter 6: Solutions & Concentrations",
    # Grade 9
    "Chương 1: Các loại hợp chất vô cơ": "Chapter 1: Classes of Inorganic Compounds",
    "Chương 2: Kim loại": "Chapter 2: Metals & Reactivity Series",
    "Chương 3: Phi kim – Sơ lược về Bảng tuần hoàn": "Chapter 3: Non-metals & Periodic Table Foundations",
    "Chương 4: Hydrocarbon – Nhiên liệu": "Chapter 4: Hydrocarbons & Fossil Fuels",
    "Chương 5: Dẫn xuất của Hydrocarbon – Polymer": "Chapter 5: Hydrocarbon Derivatives & Polymers",
    # Grade 10
    "Chương 1: Cấu tạo nguyên tử": "Chapter 1: Atomic Structure & Quantum Shells",
    "Chương 2: Bảng tuần hoàn các nguyên tố hóa học": "Chapter 2: The Periodic Table & Periodic Trends",
    "Chương 3: Liên kết hóa học": "Chapter 3: Chemical Bonding & Molecular Geometry",
    "Chương 4: Phản ứng Oxi hóa – Khử": "Chapter 4: Oxidation-Reduction Reactions",
    "Chương 5: Năng lượng hóa học (Nhiệt hóa học)": "Chapter 5: Chemical Energetics & Thermochemistry",
    "Chương 6: Tốc độ phản ứng hóa học": "Chapter 6: Chemical Kinetics & Reaction Rates",
    "Chương 7: Nguyên tố nhóm VIIA (Halogen)": "Chapter 7: Group VIIA Elements (Halogens)",
    # Grade 11
    "Chương 1: Cân bằng hóa học": "Chapter 1: Chemical Equilibrium & Le Chatelier Principle",
    "Chương 2: Nitrogen – Sulfur": "Chapter 2: Nitrogen – Sulfur & Acid Rain Chemistry",
    "Chương 3: Đại cương hóa học hữu cơ": "Chapter 3: Fundamentals of Organic Chemistry",
    "Chương 4: Hydrocarbon": "Chapter 4: Hydrocarbons (Alkanes, Alkenes, Alkynes, Arenes)",
    "Chương 5: Dẫn xuất Halogen – Alcohol – Phenol": "Chapter 5: Halogen Derivatives – Alcohols – Phenols",
    "Chương 6: Hợp chất Carbonyl – Carboxylic Acid": "Chapter 6: Carbonyl Compounds & Carboxylic Acids",
    # Grade 12
    "Chương 1: Ester – Lipid": "Chapter 1: Esters – Lipids & Saponification",
    "Chương 2: Carbohydrate": "Chapter 2: Carbohydrates (Monosaccharides, Polysaccharides)",
    "Chương 3: Hợp chất chứa Nitrogen": "Chapter 3: Nitrogen-Containing Organic Compounds",
    "Chương 4: Polymer": "Chapter 4: Polymers & Advanced Materials",
    "Chương 5: Pin điện & Điện phân": "Chapter 5: Electrochemical Cells & Electrolysis",
    "Chương 6: Đại cương về kim loại": "Chapter 6: Principles of Metallurgy & Metal Crystals",
    "Chương 7: Nguyên tố nhóm IA và nhóm IIA": "Chapter 7: Group IA & Group IIA Elements",
    "Chương 8: Sơ lược về kim loại chuyển tiếp & phức chất": "Chapter 8: Transition Metals & Coordination Chemistry"
}

for l in lessons:
    grade = l["grade"]
    num = l["lessonNumber"]
    
    # 1. Chapter Title
    if isinstance(l.get("chapterTitle"), dict):
        ch_vn = l["chapterTitle"].get("VN", "")
        if ch_vn in CHAPTER_TITLES:
            l["chapterTitle"]["EN"] = CHAPTER_TITLES[ch_vn]
        elif ch_vn in MASTER_DICT:
            l["chapterTitle"]["EN"] = MASTER_DICT[ch_vn]

    # Process Grades 8, 9, 10, 11
    if grade in [8, 9, 10, 11]:
        # Title
        if isinstance(l.get("title"), dict):
            t_vn = l["title"].get("VN", "")
            if t_vn in MASTER_DICT:
                l["title"]["EN"] = MASTER_DICT[t_vn]
                
        # Summary
        if isinstance(l.get("summary"), dict):
            s_vn = l["summary"].get("VN", "")
            if s_vn in MASTER_DICT:
                l["summary"]["EN"] = MASTER_DICT[s_vn]
                
        # Sections
        for sec in l.get("sections", []):
            if isinstance(sec.get("heading"), dict):
                h_vn = sec["heading"].get("VN", "")
                if h_vn in MASTER_DICT:
                    sec["heading"]["EN"] = MASTER_DICT[h_vn]
            for pt in sec.get("points", []):
                if isinstance(pt, dict):
                    p_vn = pt.get("VN", "")
                    if p_vn in MASTER_DICT:
                        pt["EN"] = MASTER_DICT[p_vn]
                        
        # Theory Points
        for tp in l.get("theoryPoints", []):
            if isinstance(tp, dict):
                tp_vn = tp.get("VN", "")
                if tp_vn in MASTER_DICT:
                    tp["EN"] = MASTER_DICT[tp_vn]
                elif tp_vn.startswith("[") and "]" in tp_vn:
                    head, body = tp_vn.split("]", 1)
                    head_clean = head[1:].strip()
                    body_clean = body.strip()
                    en_head = MASTER_DICT.get(head_clean, head_clean)
                    en_body = MASTER_DICT.get(body_clean, body_clean)
                    tp["EN"] = f"[{en_head}] {en_body}"

        # Sample Questions
        sq = l.get("sampleQuestion", {})
        if isinstance(sq, dict):
            if isinstance(sq.get("question"), dict):
                q_vn = sq["question"].get("VN", "")
                if isinstance(q_vn, list): q_vn = " ".join(str(x) for x in q_vn)
                if q_vn in MASTER_DICT:
                    sq["question"]["EN"] = MASTER_DICT[q_vn]
            if isinstance(sq.get("answer"), dict):
                a_vn = sq["answer"].get("VN", "")
                if isinstance(a_vn, list): a_vn = " ".join(str(x) for x in a_vn)
                if a_vn in MASTER_DICT:
                    sq["answer"]["EN"] = MASTER_DICT[a_vn]

        # Key Formulas
        new_kf = []
        for kf in l.get("keyFormulas", []):
            new_kf.append(MASTER_DICT.get(kf, kf))
        l["keyFormulas"] = new_kf

        # Equations
        new_eq = []
        for eq in l.get("equations", []):
            new_eq.append(MASTER_DICT.get(eq, eq))
        l["equations"] = new_eq

    # Process Grade 12
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
                        else:
                            p_vn = pt.get("VN", "") if isinstance(pt, dict) else str(pt)
                            if p_vn in MASTER_DICT:
                                pt["EN"] = MASTER_DICT[p_vn]
                else:
                    h_vn = sec["heading"].get("VN", "") if isinstance(sec.get("heading"), dict) else ""
                    if h_vn in MASTER_DICT:
                        sec["heading"]["EN"] = MASTER_DICT[h_vn]
                    for pt in sec.get("points", []):
                        p_vn = pt.get("VN", "") if isinstance(pt, dict) else str(pt)
                        if p_vn in MASTER_DICT:
                            pt["EN"] = MASTER_DICT[p_vn]
                            
            # Theory points (flattened)
            flat_tp = []
            for s_en in en_data["sections"]:
                for p_en in s_en["points"]:
                    flat_tp.append(f"[{s_en['heading']}] {p_en}")
            for tp_idx, tp in enumerate(l.get("theoryPoints", [])):
                if tp_idx < len(flat_tp):
                    tp["EN"] = flat_tp[tp_idx]
                else:
                    tp_vn = tp.get("VN", "") if isinstance(tp, dict) else str(tp)
                    if tp_vn in MASTER_DICT:
                        tp["EN"] = MASTER_DICT[tp_vn]
                    
            # Formulas
            l["keyFormulas"] = en_data["formulas"]
            
            # Equations
            l["equations"] = [MASTER_DICT.get(eq, eq) for eq in en_data["equations"]]
            
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

print("Saved clean, atomic translated curriculum!")
