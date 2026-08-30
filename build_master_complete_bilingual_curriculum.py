# -*- coding: utf-8 -*-
import json
import re

# Load raw JSON curriculum
with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

# Import existing dictionaries for G8, G9, G10, G11
from apply_translations_g8_g10 import G8_G10_TRANSLATIONS
from translate_g11 import G11_TRANSLATIONS
from translate_g9 import G9_TRANSLATIONS

MASTER_DICT = {}
MASTER_DICT.update(G8_G10_TRANSLATIONS)
MASTER_DICT.update(G11_TRANSLATIONS)
MASTER_DICT.update(G9_TRANSLATIONS)

# Chapter titles in English
EN_CHAPTERS = {
    "Chương 1: Ester – Lipid": "Chapter 1: Esters – Lipids & Saponification",
    "Chương 2: Carbohydrate": "Chapter 2: Carbohydrates (Glucose, Sucrose, Starch, Cellulose)",
    "Chương 3: Hợp chất chứa Nitrogen": "Chapter 3: Nitrogen-Containing Compounds (Amines, Peptides, Proteins)",
    "Chương 4: Polymer": "Chapter 4: Polymers & Advanced Materials",
    "Chương 5: Pin điện & Điện phân": "Chapter 5: Electrochemical Cells & Electrolysis",
    "Chương 6: Đại cương về kim loại": "Chapter 6: Principles of Metallurgy & Metal Crystals",
    "Chương 7: Nguyên tố nhóm IA và nhóm IIA": "Chapter 7: Group IA (Alkali) & Group IIA (Alkaline Earth) Metals",
    "Chương 8: Sơ lược về kim loại chuyển tiếp & phức chất": "Chapter 8: Transition Metals & Coordination Chemistry"
}

# English titles for all 30 lessons
G12_TITLES_EN = {
    1: "Lesson 1: Esters – Lipids (Structure, Nomenclature & Properties)",
    2: "Lesson 2: Soaps & Synthetic Detergents (Cleansing Action & Micelles)",
    3: "Lesson 3: Chapter 1 Review: Esters & Lipids Stoichiometry",
    4: "Lesson 4: Monosaccharides: Glucose & Fructose (Structures & Tollens Test)",
    5: "Lesson 5: Disaccharides: Sucrose & Maltose (Glycosidic Bonds & Hydrolysis)",
    6: "Lesson 6: Polysaccharides: Starch & Cellulose (Structure & Iodine Staining)",
    7: "Lesson 7: Chapter 2 Review: Carbohydrates Diagnostic Separation",
    8: "Lesson 8: Amines (Classification, Basicity & Aniline Bromination)",
    9: "Lesson 9: Amino Acids & Peptides (Zwitterions, Isoelectric Point & Biuret Test)",
    10: "Lesson 10: Proteins & Enzymes (Denaturation & Biological Catalysis)",
    11: "Lesson 11: Chapter 3 Review: Nitrogen Compounds & Peptide Hydrolysis",
    12: "Lesson 12: Fundamentals of Polymers (Polymerization vs Polycondensation)",
    13: "Lesson 13: Polymeric Materials: Plastics, Synthetic Fibers, Rubber & Adhesives",
    14: "Lesson 14: Chapter 4 Review: Polymers Industrial Stoichiometry",
    15: "Lesson 15: Standard Electrode Potentials & Galvanic Cells (Zn-Cu Daniell Cell)",
    16: "Lesson 16: Electrolysis: Molten Salts, Aqueous Solutions & Faraday's Laws",
    17: "Lesson 17: Chapter 5 Review: Electrochemistry & Quantitative Electrolysis",
    18: "Lesson 18: Metallic Bonding & Crystal Lattices (BCC, FCC & HCP)",
    19: "Lesson 19: Physical & Chemical Properties of Metals (Activity & Redox)",
    20: "Lesson 20: Industrial Metallurgy: Pyrometallurgy, Hydrometallurgy & Electrometallurgy",
    21: "Lesson 21: Alloys: Microstructures, Duralumin, Inox & High-Performance Materials",
    22: "Lesson 22: Corrosion of Metals: Chemical vs Electrochemical & Cathodic Protection",
    23: "Lesson 23: Chapter 6 Review: Metallurgy & Electrochemical Displacement",
    24: "Lesson 24: Group IA Elements: Alkali Metals (Li, Na, K, Rb, Cs)",
    25: "Lesson 25: Group IIA Elements: Alkaline Earth Metals & Hard Water Softening",
    26: "Lesson 26: Chapter 7 Review: Group IA & IIA Elements Stoichiometry",
    27: "Lesson 27: First-Row Transition Metals (3d Series & Electron Configurations)",
    28: "Lesson 28: Coordination Chemistry: Central Ions, Ligands & Coordination Numbers",
    29: "Lesson 29: Complex Stability Constants & Biological Coordination (Hemoglobin, Cisplatin)",
    30: "Lesson 30: Comprehensive Upper Secondary Chemistry Grand Review (GDPT 2018)"
}

# English summaries for all 30 lessons
G12_SUMMARIES_EN = {
    1: "Esters and lipids are vital organic families across biochemistry and industry. Esters provide pleasant fruity fragrances and perfumery essences, while lipids (fats and oils) serve as primary biological energy reserves and cell membrane matrices.",
    2: "Investigation of the physicochemical cleansing mechanisms of soaps and synthetic detergents, comparative surfactant analysis, and behavior in hard water environments.",
    3: "Comprehensive review of foundational calculations: ester combustion stoichiometry, multi-component saponification mass balance, lipid yield, and saponification number determinations.",
    4: "Carbohydrates (saccharides) are ubiquitous polyhydroxy carbonyl compounds. Glucose and fructose are the two essential monosaccharides providing immediate cellular bioenergetic fuel.",
    5: "Sucrose (cane sugar) and maltose (malt sugar) are paramount disaccharides (C12H22O11, M=342). Examination of glycosidic linkages, non-reducing character, and complete acid hydrolysis.",
    6: "Starch and cellulose are natural high-molecular biopolymers (C6H10O5)n. Exploration of helical amylose, branched amylopectin, crystalline cellulose microfibrils, and thermochromic iodine inclusion complexation.",
    7: "Comprehensive systematic review of carbohydrate structures, qualitative diagnostic separation matrix, and quantitative stoichiometric calculations.",
    8: "Amines are ammonia derivatives where hydrogen atoms are replaced by hydrocarbon groups. Exploration of basicity scales, alkyl vs aryl substituents, and the diagnostic tribromination of aniline.",
    9: "Amino acids are amphoteric bifunctional molecules containing both -NH2 and -COOH groups. Peptides are polymers of α-amino acids forming the foundational building blocks of biological life.",
    10: "Proteins are complex high-molecular polypeptides forming the material foundation of life. Exploration of higher-order spatial structures, denaturation phenomena, and enzyme biocatalytic kinetics.",
    11: "Comprehensive mastery of amine basicity, amino acid zwitterionic properties, peptide hydrolysis stoichiometry, and mass balance conservation laws.",
    12: "Polymers are high-molecular macromolecules constructed from repeating monomer units. Examination of addition polymerization, polycondensation mechanisms, and structural classification.",
    13: "Industrial polymeric materials: optical Plexiglas (PMMA), bulletproof/high-tenacity polyamides (Nylon-6,6), sulfur-vulcanized elastomer networks, and synthetic adhesives.",
    14: "Comprehensive review of polymer structures, monomer identification, reaction conditions, and industrial multi-step synthesis yield calculations.",
    15: "Galvanic cells convert spontaneous redox chemical energy into electrical energy. Examination of standard reduction potentials E°, standard hydrogen electrode, and cell EMF calculations.",
    16: "Electrolysis is non-spontaneous redox driven by external direct electric current. Mastery of cathode/anode discharge sequences, molten salt processing, and quantitative Faraday calculations.",
    17: "Comprehensive review of galvanic cell thermodynamics, electrolysis kinetics, mixed-salt discharge sequences, and electron conservation balances.",
    18: "Nature of metallic bonding: fixed lattice metal cations enveloped by a delocalized free electron gas. Examination of Body-Centered Cubic (BCC), Face-Centered Cubic (FCC), and Hexagonal Close-Packed (HCP) unit cells.",
    19: "Exploration of universal metallic physical properties (malleability, electrical conductivity, thermal conductivity, metallic luster) and foundational chemical reducing character.",
    20: "Foundational industrial metallurgical extraction routes: Pyrometallurgy (high-temperature blast furnace reduction), Hydrometallurgy (aqueous displacement), and Electrometallurgy (molten salt electrolysis).",
    21: "Alloys are engineered metallic materials combining base metals with alloying elements. Exploration of interstitial/substitutional solid solutions, cast iron, structural steel, stainless Inox, and aerospace Duralumin.",
    22: "Destructive deterioration of metals: direct chemical oxidation vs localized micro-galvanic electrochemical corrosion. Practical protective coatings and sacrificial cathodic anode protection.",
    23: "Comprehensive synthesis of general metallurgy, electrochemical series reactivity, and metal bar displacement stoichiometry.",
    24: "Group IA Alkali Metals (Li, Na, K, Rb, Cs): ns¹ valence configuration, extreme reducing vigor, characteristic flame emission colors, and safe storage under dry kerosene.",
    25: "Group IIA Alkaline Earth Metals (Be, Mg, Ca, Sr, Ba): ns² valence configuration, +2 oxidation state, calcium mineral chemistry, and chemical softening of temporary, permanent, and total hard water.",
    26: "Comprehensive review of alkali and alkaline earth reactions: metal-water vigor, CO2 bubbling through Ca(OH)2/Ba(OH)2, and precipitation stoichiometry.",
    27: "First-row 3d transition metals (Sc through Zn): partially filled d-orbitals, anomalous configurations (Cr, Cu), variable oxidation states, colorful d-d electronic transitions, and catalytic excellence.",
    28: "Coordination complexes: central transition metal ions bonded to surrounding electron-donating ligands via coordinate covalent bonds. Formulas [M(L)_n]^z, geometries, and diagnostic color tests.",
    29: "Complex thermodynamic stability constants (K_stab), chelate effect, and vital biological metalloproteins: oxygen-carrying Hemoglobin, photosynthetic Chlorophyll, Vitamin B12, and anticancer Cisplatin.",
    30: "Comprehensive grand review of Upper Secondary Chemistry across Grades 8--12: atomic structure, periodicity, chemical bonding, thermodynamics, kinetics, organic synthesis, and coordination electrochemistry."
}

# Section translation dictionary for Grade 12
G12_SECTIONS_EN = {
    # Headings
    "1. Khái niệm & Cấu trúc phân tử Ester": "1. Definition & Molecular Structure of Esters",
    "2. Tính chất vật lí của Ester": "2. Physical Properties & Characteristic Aromas of Esters",
    "3. Tính chất hóa học & Cơ chế phản ứng của Ester": "3. Chemical Reactions & Hydrolysis Mechanisms of Esters",
    "4. Khái niệm & Phân loại Lipid - Chất béo (Triglyceride)": "4. Classification of Lipids & Triglyceride Fats",
    "1. Khái niệm & Thành phần Xà phòng": "1. Definition & Composition of Traditional Soaps",
    "2. Cấu trúc phân tử & Cơ chế giặt rửa": "2. Molecular Structure & Micellar Cleansing Action",
    "3. So sánh Xà phòng và Chất giặt rửa tổng hợp trong Nước cứng": "3. Soaps vs Synthetic Detergents in Hard Water",
    "1. Các phương pháp giải toán Ester – Lipid": "1. Stoichiometric Calculations for Esters & Lipids",
    "1. Cấu trúc phân tử Glucose & Fructose": "1. Molecular Architecture of Glucose & Fructose",
    "2. Tính chất hóa học của Glucose": "2. Characteristic Chemical Reactions of Glucose",
    "1. Cấu trúc phân tử Saccharose": "1. Molecular Structure of Sucrose (Non-reducing Sugar)",
    "2. Tính chất hóa học của Saccharose": "2. Chemical Properties & Acid Hydrolysis of Sucrose",
    "1. Tinh bột (Starch)": "1. Starch Architecture & Iodine Inclusion Reaction",
    "2. Cellulose (Xenlulozơ)": "2. Cellulose Structure, Trinitrate & Industrial Uses",
    "1. Bảng nhận diện Carbohydrate cốt lõi": "1. Diagnostic Separation Matrix for Carbohydrates",
    "1. Khái niệm, Phân loại & Bậc của Amine": "1. Definition, Classification & Amine Degrees (1°, 2°, 3°)",
    "2. Tính chất vật lí & Tính bazơ của Amine": "2. Physical Properties & Basicity Ranking of Amines",
    "3. Phản ứng đặc trưng của Aniline (C6H5NH2)": "3. Characteristic Reactions & Tribromination of Aniline",
    "1. Cấu trúc lưỡng cực & Tính chất của Amino Acid": "1. Zwitterionic Structure & Amphoteric Properties of Amino Acids",
    "2. Khái niệm Peptide & Liên kết Peptit": "2. Peptide Concepts, Peptide Bonds & Biuret Reaction",
    "1. Cấu tạo & Tính chất của Protein": "1. Higher-Order Protein Structures, Denaturation & Staining",
    "2. Enzyme (Chất xúc tác sinh học)": "2. Enzymes: Biocatalytic Specificity & High Efficiency",
    "1. Phương pháp giải bài toán Peptide": "1. Quantitative Peptide Hydrolysis & Conservation Laws",
    "1. Khái niệm & Phân loại Polymer": "1. Definition, Classification & Polymer Chain Architectures",
    "2. Phương pháp tổng hợp: Trùng hợp vs Trùng ngưng": "2. Synthesis Routes: Addition Polymerization vs Polycondensation",
    "1. Chất dẻo (Plastics)": "1. Plastics & Advanced Thermoplastics (PE, PVC, PMMA, Teflon)",
    "2. Tơ (Fibers)": "2. Synthetic & Semi-Synthetic Fibers (Polyamides, Acrylics)",
    "3. Cao su & Kỹ thuật Lưu hóa cao su": "3. Elastomers & Sulfur Vulcanization Chemistry",
    "1. Tổng kết phân loại Polymer": "1. Comprehensive Polymer Classification & Yield Calculations",
    "1. Cặp oxi hóa - khử & Thế điện cực chuẩn E°": "1. Redox Couples & Standard Reduction Potentials E°",
    "2. Cấu tạo & Cơ chế hoạt động của Pin Galvani (Zn – Cu)": "2. Architecture & Operating Principle of the Zn-Cu Daniell Cell",
    "3. Quy tắc Alpha (α) xác định chiều phản ứng": "3. The Alpha (α) Rule for Predicting Spontaneous Redox Directions",
    "1. Nguyên tắc & Quy luật Điện phân": "1. Principles of Electrolysis & Electrode Discharge Sequences",
    "2. Định luật định lượng Faraday": "2. Quantitative Faraday Laws of Electrolysis",
    "3. Ứng dụng công nghiệp của Điện phân": "3. Industrial Applications: Metal Smelting, Refining & Electroplating",
    "1. Phương pháp bảo toàn electron trong điện phân": "1. Electron Conservation & Mixed Electrolyte Stoichiometry",
    "1. Bản chất Liên kết Kim loại": "1. The Nature of Metallic Bonding & Electron Sea Model",
    "2. 3 Kiểu Mạng Tinh thể Kim loại Cơ bản": "2. Three Foundational Metallic Crystal Lattices (BCC, FCC, HCP)",
    "1. 4 Tính chất Vật lí Chung & Kỉ lục Kim loại": "1. Four Universal Metallic Physical Properties & Element Extremes",
    "2. Tính chất Hóa học Đặc trưng: Tính Khử": "2. Characteristic Chemical Property: Strong Reducing Character",
    "1. 3 Phương pháp Tách Kim loại": "1. Three Industrial Metallurgy Methods (Thermal, Hydro, Electro)",
    "1. Khái niệm & Cấu trúc Hợp kim": "1. Concepts, Interstitial/Substitutional Solid Solutions in Alloys",
    "2. Một số Hợp kim Tiêu biểu": "2. Representative Industrial Alloys (Cast Iron, Steel, Inox, Duralumin)",
    "1. 2 Loại Ăn mòn Kim loại": "1. Chemical Corrosion vs Electrochemical Corrosion",
    "2. 3 Điều kiện để xảy ra Ăn mòn Điện hóa học": "2. Three Essential Conditions for Electrochemical Corrosion",
    "3. Biện pháp Bảo vệ Kim loại": "3. Protective Surface Coatings & Sacrificial Anodic Protection",
    "1. Tổng kết kiến thức Chương Kim loại": "1. Summary of Metallic Properties, Activity Series & Displacement",
    "1. Vị trí, Cấu tạo & Tính chất Vật lí": "1. Group IA Coordinates, ns¹ Electronic Structure & Physical Trends",
    "2. Tính chất Hóa học: Tính khử cực kỳ mãnh liệt": "2. Extreme Reducing Reactivity, Flame Emission Colors & Kerosene Storage",
    "1. Tính chất Kim loại Kiềm thổ": "1. Group IIA ns² Electronic Trends & Chemical Reactivity",
    "2. Hợp chất quan trọng của Canxi": "2. Calcium Compounds: Quicklime, Slaked Lime, Limestone & Gypsum",
    "3. Nước cứng & Phương pháp làm mềm nước cứng": "3. Classification of Hard Water & Chemical Softening Techniques",
    "1. Dạng toán CO2 sục vào dung dịch Ca(OH)2 / Ba(OH)2": "1. Quantitative Analysis of CO2 Absorption in Alkaline Hydroxides",
    "1. Đặc điểm Cấu hình Electron & Trạng thái Oxi hóa": "1. 3d Electronic Configurations, Anomalies (Cr, Cu) & Oxidation States",
    "2. Tính chất Từ & Màu sắc Hợp chất": "2. Paramagnetism, Colorful d-d Transitions & Industrial Catalysis",
    "1. Khái niệm & Cấu tạo Phức chất": "1. Concepts, Central Cations, Ligands & Coordination Numbers",
    "2. Một số Phức chất Kinh điển trong Thực hành": "2. Classic Laboratory Complexes: [Cu(NH3)4]²⁺, Tollens, Iron-Phenol",
    "1. Độ bền của Phức chất & Hằng số Bền Kbền": "1. Complex Stability Constants (K_stab) & The Chelate Effect",
    "2. Vai trò Sống còn của Phức chất trong Y Sinh học": "2. Vital Biological Coordination: Hemoglobin, Chlorophyll, Vitamin B12, Cisplatin",
    "1. 5 Trụ cột Hóa học Cốt lõi": "1. Five Foundational Pillars of Modern Chemistry (GDPT 2018)"
}

# Apply all translations across all 179 lessons
total_updated = 0

for l in lessons:
    grade = l["grade"]
    num = l["lessonNumber"]
    
    # 1. Chapter Title
    if isinstance(l.get("chapterTitle"), dict):
        ch_vn = l["chapterTitle"].get("VN", "")
        if ch_vn in EN_CHAPTERS:
            l["chapterTitle"]["EN"] = EN_CHAPTERS[ch_vn]
            total_updated += 1
            
    # 2. Lesson Title
    if grade == 12 and num in G12_TITLES_EN:
        l["title"] = {"VN": l["title"]["VN"] if isinstance(l["title"], dict) else str(l["title"]), "EN": G12_TITLES_EN[num]}
        total_updated += 1
    elif isinstance(l.get("title"), dict):
        t_vn = l["title"].get("VN", "")
        if t_vn in MASTER_DICT:
            l["title"]["EN"] = MASTER_DICT[t_vn]
            total_updated += 1

    # 3. Summary
    if grade == 12 and num in G12_SUMMARIES_EN:
        s_vn = l["summary"]["VN"] if isinstance(l["summary"], dict) else str(l["summary"])
        l["summary"] = {"VN": s_vn, "EN": G12_SUMMARIES_EN[num]}
        total_updated += 1
    elif isinstance(l.get("summary"), dict):
        s_vn = l["summary"].get("VN", "")
        if s_vn in MASTER_DICT:
            l["summary"]["EN"] = MASTER_DICT[s_vn]
            total_updated += 1

    # 4. Sections
    for sec in l.get("sections", []):
        if isinstance(sec.get("heading"), dict):
            h_vn = sec["heading"].get("VN", "")
            if h_vn in G12_SECTIONS_EN:
                sec["heading"]["EN"] = G12_SECTIONS_EN[h_vn]
                total_updated += 1
            elif h_vn in MASTER_DICT:
                sec["heading"]["EN"] = MASTER_DICT[h_vn]
                total_updated += 1
                
        for pt in sec.get("points", []):
            if isinstance(pt, dict):
                p_vn = pt.get("VN", "")
                if p_vn in MASTER_DICT:
                    pt["EN"] = MASTER_DICT[p_vn]
                    total_updated += 1
                elif p_vn in G12_SECTIONS_EN:
                    pt["EN"] = G12_SECTIONS_EN[p_vn]
                    total_updated += 1

    # 5. Theory Points
    for tp in l.get("theoryPoints", []):
        if isinstance(tp, dict):
            tp_vn = tp.get("VN", "")
            if tp_vn in MASTER_DICT:
                tp["EN"] = MASTER_DICT[tp_vn]
                total_updated += 1
            elif tp_vn.startswith("[") and "]" in tp_vn:
                head, body = tp_vn.split("]", 1)
                head_clean = head[1:].strip()
                body_clean = body.strip()
                en_head = G12_SECTIONS_EN.get(head_clean, head_clean)
                en_body = MASTER_DICT.get(body_clean, G12_SECTIONS_EN.get(body_clean, body_clean))
                tp["EN"] = f"[{en_head}] {en_body}"
                total_updated += 1

    # 6. Sample Questions
    sq = l.get("sampleQuestion", {})
    if isinstance(sq, dict):
        if isinstance(sq.get("question"), dict):
            q_vn = sq["question"].get("VN", "")
            if isinstance(q_vn, list): q_vn = " ".join(str(x) for x in q_vn)
            if q_vn in MASTER_DICT:
                sq["question"]["EN"] = MASTER_DICT[q_vn]
                total_updated += 1
        if isinstance(sq.get("answer"), dict):
            a_vn = sq["answer"].get("VN", "")
            if isinstance(a_vn, list): a_vn = " ".join(str(x) for x in a_vn)
            if a_vn in MASTER_DICT:
                sq["answer"]["EN"] = MASTER_DICT[a_vn]
                total_updated += 1

    # 7. Key Formulas
    new_kf = []
    for kf in l.get("keyFormulas", []):
        if kf in MASTER_DICT:
            new_kf.append(MASTER_DICT[kf])
            total_updated += 1
        else:
            new_kf.append(kf)
    l["keyFormulas"] = new_kf

    # 8. Equations
    new_eq = []
    for eq in l.get("equations", []):
        if eq in MASTER_DICT:
            new_eq.append(MASTER_DICT[eq])
            total_updated += 1
        else:
            new_eq.append(eq)
    l["equations"] = new_eq

# Write final bilingual data
with open("src/data/vietnamCurriculumData.json", "w", encoding="utf-8") as f:
    json.dump(lessons, f, ensure_ascii=False, indent=2)

print(f"Grand Master Translation complete! Applied {total_updated} fields across all 179 lessons!")
