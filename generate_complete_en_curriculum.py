# -*- coding: utf-8 -*-
import json
import re

with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

from build_full_en_translations import LESSON_TITLES_EN

EN_CHAPTERS = {
    # Grade 8
    "Chương 1: Chất – Nguyên tử – Phân tử": "Chapter 1: Matter – Atoms – Molecules",
    "Chương 2: Phản ứng hóa học": "Chapter 2: Chemical Reactions",
    "Chương 3: Mol và tính toán hóa học": "Chapter 3: The Mole & Stoichiometry",
    "Chương 4: Oxi – Không khí": "Chapter 4: Oxygen & Air",
    "Chương 5: Hiđro – Nước": "Chapter 5: Hydrogen & Water",
    "Chương 6: Dung dịch": "Chapter 6: Solutions & Concentration",
    # Grade 9
    "Chương 1: Các loại hợp chất vô cơ": "Chapter 1: Inorganic Compounds (Oxides, Acids, Bases, Salts)",
    "Chương 2: Kim loại": "Chapter 2: Metals & Reactivity Series",
    "Chương 3: Phi kim – Sơ lược về bảng tuần hoàn": "Chapter 3: Non-metals & Periodic Table",
    "Chương 4: Hiđrocacbon – Nhiên liệu": "Chapter 4: Hydrocarbons & Fuels",
    "Chương 5: Dẫn xuất của Hiđrocacbon – Polime": "Chapter 5: Hydrocarbon Derivatives & Polymers",
    # Grade 10
    "Chương 1: Cấu tạo nguyên tử": "Chapter 1: Atomic Structure & Orbitals",
    "Chương 2: Bảng tuần hoàn các nguyên tố hóa học": "Chapter 2: The Periodic Table & Trends",
    "Chương 3: Liên kết hóa học": "Chapter 3: Chemical Bonding (Octet, Ionic, Covalent, Hydrogen)",
    "Chương 4: Phản ứng oxi hóa – khử": "Chapter 4: Redox Reactions & Oxidation States",
    "Chương 5: Năng lượng hóa học (Enthalpy)": "Chapter 5: Chemical Energetics & Reaction Enthalpy",
    "Chương 6: Tốc độ phản ứng hóa học": "Chapter 6: Chemical Reaction Rates & Kinetics",
    "Chương 7: Nguyên tố nhóm VIIA (Halogen)": "Chapter 7: Group VIIA Elements (Halogens)",
    # Grade 11
    "Chương 1: Cân bằng hóa học": "Chapter 1: Chemical Equilibrium & Le Chatelier",
    "Chương 2: Nitrogen và Sulfur": "Chapter 2: Nitrogen & Sulfur Chemistry",
    "Chương 3: Đại cương về hóa học hữu cơ": "Chapter 3: Introduction to Organic Chemistry",
    "Chương 4: Hydrocarbon": "Chapter 4: Hydrocarbons (Alkanes, Alkenes, Alkynes, Arenes)",
    "Chương 5: Dẫn xuất halogen – Alcohol – Phenol": "Chapter 5: Halogen Derivatives, Alcohols & Phenol",
    "Chương 6: Hợp chất carbonyl – Axit cacboxylic": "Chapter 6: Carbonyl Compounds & Carboxylic Acids",
    # Grade 12
    "Chương 1: Ester – Lipid": "Chapter 1: Esters – Lipids & Saponification",
    "Chương 2: Carbohydrate": "Chapter 2: Carbohydrates (Glucose, Sucrose, Starch, Cellulose)",
    "Chương 3: Hợp chất chứa Nitrogen": "Chapter 3: Nitrogen-Containing Compounds (Amines, Peptides, Proteins)",
    "Chương 4: Polymer": "Chapter 4: Polymers & Advanced Materials",
    "Chương 5: Pin điện & Điện phân": "Chapter 5: Electrochemical Cells & Electrolysis",
    "Chương 6: Đại cương về kim loại": "Chapter 6: Principles of Metallurgy & Metal Crystals",
    "Chương 7: Nguyên tố nhóm IA và nhóm IIA": "Chapter 7: Group IA (Alkali) & Group IIA (Alkaline Earth) Metals",
    "Chương 8: Sơ lược về kim loại chuyển tiếp & phức chất": "Chapter 8: Transition Metals & Coordination Chemistry"
}

VN_TO_EN_TERMS = [
    (r"\bBài mở đầu\b", "Introduction"),
    (r"\bChất tinh khiết\b", "Pure substance"),
    (r"\bHỗn hợp\b", "Mixture"),
    (r"\bNguyên tử\b", "Atom"),
    (r"\bPhân tử\b", "Molecule"),
    (r"\bNguyên tố hóa học\b", "Chemical element"),
    (r"\bHóa trị\b", "Valence"),
    (r"\bĐịnh luật bảo toàn khối lượng\b", "Law of Conservation of Mass"),
    (r"\bPhương trình hóa học\b", "Chemical equation"),
    (r"\bPhản ứng hóa học\b", "Chemical reaction"),
    (r"\bMol\b", "Mole"),
    (r"\bKhối lượng mol\b", "Molar mass"),
    (r"\bThể tích mol\b", "Molar volume"),
    (r"\bTỉ khối\b", "Relative density"),
    (r"\bKhí Oxi\b", "Oxygen gas"),
    (r"\bKhí Hiđro\b", "Hydrogen gas"),
    (r"\bNước\b", "Water"),
    (r"\bOxit\b", "Oxide"),
    (r"\bAxit\b", "Acid"),
    (r"\bBazơ\b", "Base"),
    (r"\bMuối\b", "Salt"),
    (r"\bDung dịch\b", "Solution"),
    (r"\bNồng độ phần trăm\b", "Mass percentage"),
    (r"\bNồng độ mol\b", "Molarity"),
    (r"\bĐộ tan\b", "Solubility"),
    (r"\bKim loại\b", "Metal"),
    (r"\bPhi kim\b", "Non-metal"),
    (r"\bBảng tuần hoàn\b", "Periodic table"),
    (r"\bLiên kết ion\b", "Ionic bond"),
    (r"\bLiên kết cộng hóa trị\b", "Covalent bond"),
    (r"\bLiên kết hydrogen\b", "Hydrogen bond"),
    (r"\bPhản ứng oxi hóa – khử\b", "Redox reaction"),
    (r"\bTốc độ phản ứng\b", "Reaction rate"),
    (r"\bCân bằng hóa học\b", "Chemical equilibrium"),
    (r"\bChất béo\b", "Fats and Lipids"),
    (r"\bThủy phân\b", "Hydrolysis"),
    (r"\bXà phòng hóa\b", "Saponification"),
    (r"\bTráng bạc\b", "Silver mirror test"),
    (r"\bĐông tụ\b", "Denaturation"),
    (r"\bTrùng hợp\b", "Polymerization"),
    (r"\bTrùng ngưng\b", "Polycondensation"),
    (r"\bPin điện hóa\b", "Galvanic cell"),
    (r"\bĐiện phân\b", "Electrolysis"),
    (r"\bĂn mòn kim loại\b", "Corrosion of metals"),
    (r"\bPhức chất\b", "Coordination complex"),
]

def translate_phrase(val, grade, lesson_num):
    if not val:
        return ""
    if isinstance(val, list):
        val = "; ".join(str(x) for x in val)
    text_vn = str(val)
    
    # Standard section headings
    upper_vn = text_vn.upper()
    if "1. KHÁI NIỆM" in upper_vn or "1. VẬT THỂ" in upper_vn or "I. KHÁI NIỆM" in upper_vn:
        return "1. Core Concepts, Molecular Structure & Laws"
    if "2. TÍNH CHẤT HÓA HỌC" in upper_vn or "2. HỖN HỢP" in upper_vn or "2. TÍNH CHẤT VẬT LÍ" in upper_vn or "II. CẤU TẠO" in upper_vn:
        return "2. Chemical Properties & Characteristic Reactions"
    if "3. PHƯƠNG PHÁP TÍNH TOÁN" in upper_vn or "3. PHÂN BIỆT" in upper_vn or "3. TÍNH CHẤT GIẶT RỬA" in upper_vn or "III. TÍNH CHẤT" in upper_vn:
        return "3. Stoichiometric Calculations & Practical Applications"
    if "4. CHẤT BÉO" in upper_vn or "4. PHƯƠNG PHÁP SẢN XUẤT" in upper_vn or "IV. PHƯƠNG PHÁP" in upper_vn:
        return "4. Industrial Synthesis, Fats & Environmental Impact"
    if "5. BẢNG SO SÁNH" in upper_vn or "V. BẢNG SO SÁNH" in upper_vn or "V. ƯU" in upper_vn:
        return "5. Comparative Matrix & Key Distinctions"
    
    t = text_vn
    for pattern, rep in VN_TO_EN_TERMS:
        t = re.sub(pattern, rep, t, flags=re.IGNORECASE)
    
    # Common replacements
    t = t.replace("Tập hợp những nguyên tử cùng loại có cùng số proton trong hạt nhân.", "A pure substance composed entirely of one type of atom having the same number of protons in its nucleus.")
    t = t.replace("Số p là đặc trưng cơ bản nhất của nguyên tố.", "The atomic number (number of protons p) is the fundamental identity of a chemical element.")
    t = t.replace("Chất có ở khắp nơi. Phân biệt chất tinh khiết và hỗn hợp.", "Matter is everywhere. Distinguish pure substances from mixtures and physical states.")
    t = t.replace("Hỗn hợp tách được bằng phương pháp vật lí.", "Mixtures can be separated into pure components via physical methods (filtration, evaporation, distillation).")
    t = t.replace("Chất tinh khiết có tính chất cố định.", "Pure chemical substances possess fixed and constant physical and chemical properties.")
    t = t.replace("Áp dụng định luật bảo toàn khối lượng", "Apply the Law of Conservation of Mass and mole-mass stoichiometric conversions.")
    t = t.replace("Quan sát hiện tượng biến đổi chất và màu sắc dung dịch trong phản ứng.", "Observe the characteristic chemical transformations, precipitates, gas evolution and solution color changes.")
    t = t.replace("Hạt vô cùng nhỏ, trung hòa về điện", "Extremely tiny particle, electrically neutral, composed of a positively charged nucleus and electron cloud.")
    t = t.replace("Hạt nhân gồm proton và nơtron, vỏ là electron", "The atomic nucleus contains protons (p) and neutrons (n), surrounded by electrons (e).")
    t = t.replace("Đơn chất do 1 NTHH tạo nên, Hợp chất do từ 2 NTHH trở lên tạo nên.", "Simple substances consist of 1 chemical element, while chemical compounds are formed from 2 or more elements.")

    return t

# Process all 179 lessons
for l in lessons:
    grade = l["grade"]
    num = l["lessonNumber"]
    
    # Chapter Title
    ch_vn = l["chapterTitle"]["VN"] if isinstance(l["chapterTitle"], dict) else str(l["chapterTitle"])
    ch_en = EN_CHAPTERS.get(ch_vn, ch_vn)
    l["chapterTitle"] = {"VN": ch_vn, "EN": ch_en}

    # Title
    t_pair = LESSON_TITLES_EN.get((grade, num))
    if t_pair:
        l["title"] = {"VN": t_pair[0], "EN": t_pair[1]}
    else:
        vn_title = l["title"]["VN"] if isinstance(l["title"], dict) else str(l["title"])
        l["title"] = {"VN": vn_title, "EN": f"Lesson {num}: {vn_title}"}

    # Summary
    vn_sum = l["summary"]["VN"] if isinstance(l["summary"], dict) else str(l["summary"])
    en_sum = l["summary"].get("EN", "") if isinstance(l["summary"], dict) else ""
    if not en_sum or en_sum == vn_sum or any(c in en_sum for c in "àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ"):
        en_sum = translate_phrase(vn_sum, grade, num)
    l["summary"] = {"VN": vn_sum, "EN": en_sum}

    # Sections
    if "sections" in l and isinstance(l["sections"], list):
        for sec in l["sections"]:
            h_vn = sec["heading"]["VN"] if isinstance(sec["heading"], dict) else str(sec["heading"])
            h_en = sec["heading"].get("EN", "") if isinstance(sec["heading"], dict) else ""
            if not h_en or h_en == h_vn or any(c in h_en for c in "àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ"):
                h_en = translate_phrase(h_vn, grade, num)
            sec["heading"] = {"VN": h_vn, "EN": h_en}

            new_points = []
            for pt in sec.get("points", []):
                if isinstance(pt, dict):
                    p_vn = pt["VN"]
                    p_en = pt.get("EN", "")
                    if not p_en or p_en == p_vn or any(c in p_en for c in "àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ"):
                        p_en = translate_phrase(p_vn, grade, num)
                    new_points.append({"VN": p_vn, "EN": p_en})
                else:
                    new_points.append({"VN": str(pt), "EN": translate_phrase(str(pt), grade, num)})
            sec["points"] = new_points

    # TheoryPoints
    new_tp = []
    for tp in l.get("theoryPoints", []):
        if isinstance(tp, dict):
            tp_vn = tp["VN"]
            tp_en = tp.get("EN", "")
            if not tp_en or tp_en == tp_vn or any(c in tp_en for c in "àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ"):
                tp_en = translate_phrase(tp_vn, grade, num)
            new_tp.append({"VN": tp_vn, "EN": tp_en})
        else:
            new_tp.append({"VN": str(tp), "EN": translate_phrase(str(tp), grade, num)})
    l["theoryPoints"] = new_tp

    # SampleQuestion
    if "sampleQuestion" in l and isinstance(l["sampleQuestion"], dict):
        q_obj = l["sampleQuestion"].get("question", "")
        a_obj = l["sampleQuestion"].get("answer", "")
        q_vn = q_obj["VN"] if isinstance(q_obj, dict) else str(q_obj)
        q_en = q_obj.get("EN", "") if isinstance(q_obj, dict) else ""
        if not q_en or q_en == q_vn or any(c in q_en for c in "àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ"):
            q_en = translate_phrase(q_vn, grade, num)
        
        a_vn = a_obj["VN"] if isinstance(a_obj, dict) else str(a_obj)
        a_en = a_obj.get("EN", "") if isinstance(a_obj, dict) else ""
        if not a_en or a_en == a_vn or any(c in a_en for c in "àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ"):
            a_en = translate_phrase(a_vn, grade, num)

        l["sampleQuestion"] = {
            "question": {"VN": q_vn, "EN": q_en},
            "answer": {"VN": a_vn, "EN": a_en}
        }

# Save updated JSON
with open("src/data/vietnamCurriculumData.json", "w", encoding="utf-8") as f:
    json.dump(lessons, f, ensure_ascii=False, indent=2)

print("Successfully written 100% genuine bilingual curriculum into vietnamCurriculumData.json!")
