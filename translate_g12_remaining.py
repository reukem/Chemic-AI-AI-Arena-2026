# -*- coding: utf-8 -*-
import json

with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

G12_REMAINING = {
    "1️⃣ **Sản xuất Xà phòng**:": "1️⃣ **Soap Manufacturing**:",
    "  • Cách 1: $\\text{Chất béo} + \\text{NaOH/KOH} \\xrightarrow{t^\\circ} \\text{RCOONa(K) (Xà phòng)} + \\text{Glycerol}$.": "  • Method 1: $\\text{Fats/Lipids} + \\text{NaOH/KOH} \\xrightarrow{t^\\circ} \\text{RCOONa(K) (Soap)} + \\text{Glycerol}$.",
    "  • Cách 2: $\\text{Alkane (Dầu mỏ)} \\xrightarrow{Oxi\\,h\\acute{o}a} \\text{RCOOH (Acid béo)} \\xrightarrow{+NaOH} \\text{RCOONa (Xà phòng)}$.": "  • Method 2: $\\text{Petroleum Alkanes} \\xrightarrow{\\text{Oxidation}} \\text{Fatty Acids} \\xrightarrow{+\\text{NaOH}} \\text{Soap}$.",
    "2️⃣ **Sản xuất Chất giặt rửa tổng hợp**:": "2️⃣ **Synthetic Detergent Production**:",
    "  • $\\text{Dầu mỏ} \\longrightarrow \\text{R-SO}_3\\text{H / R-OSO}_3\\text{H} \\xrightarrow{+NaOH} \\text{R-SO}_3\\text{Na / R-OSO}_3\\text{Na}$.": "  • $\\text{Petroleum Feedstocks} \\longrightarrow \\text{R-SO}_3\\text{H / R-OSO}_3\\text{H} \\xrightarrow{+\\text{NaOH}} \\text{R-SO}_3\\text{Na / R-OSO}_3\\text{Na}$.",
    "🧼 **1. Xà phòng**:": "🧼 **1. Traditional Soap**:",
    "  • *Ưu điểm*: Có thể bị phân hủy bởi các vi sinh vật trong tự nhiên $\\to$ Ít gây ô nhiễm môi trường nguồn nước.": "  • *Advantage*: Readily biodegradable by microorganisms $\\to$ Minimal environmental water pollution.",
    "  • *Nhược điểm*: Khi dùng trong **Nước cứng** (chứa ion $\\text{Ca}^{2+}, \\text{Mg}^{2+}$), xà phòng phản ứng tạo kết tủa cặn không tan: $2\\text{RCOO}^- + \\text{Ca}^{2+} \\to (\\text{RCOO})_2\\text{Ca} \\downarrow$ làm mất bọt giặt, tốn xà phòng và ố vàng quần áo!": "  • *Disadvantage*: In **Hard Water** ($Ca^{2+}, Mg^{2+}$), soap forms insoluble scum: $2\\text{RCOO}^- + \\text{Ca}^{2+} \\to (\\text{RCOO})_2\\text{Ca}\\downarrow$, depleting lather and staining fabrics!",
    "🧴 **2. Chất giặt rửa tổng hợp**:": "🧴 **2. Synthetic Detergents**:",
    "  • *Ưu điểm*: Dùng tốt và giặt sạch trong cả **Nước cứng** vì muối của $\\text{Ca}^{2+}, \\text{Mg}^{2+}$ với gốc sulfonate $\\text{R-SO}_3^-$ tan tốt trong nước.": "  • *Advantage*: Cleans effectively in **Hard Water** because calcium and magnesium sulfonate salts are completely water-soluble.",
    "  • *Nhược điểm*: Khó bị vi sinh vật phân hủy sinh học $\\to$ Tích tụ gây bọt bẩn và ô nhiễm môi trường sông hồ.": "  • *Disadvantage*: Poor biodegradability in branched variants $\\to$ May accumulate causing water pollution.",
    "III. ỨNG DỤNG THỰC TẾ & LÊN MEN RƯỢU": "III. PRACTICAL APPLICATIONS & ETHANOL FERMENTATION",
    "🍷 **Lên men rượu**: $\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{Men zima}} 2\\text{C}_2\\text{H}_5\\text{OH (Rượu)} + 2\\text{CO}_2 \\uparrow$.": "🍷 **Ethanol Fermentation**: $\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{Yeast Zymase}} 2\\text{C}_2\\text{H}_5\\text{OH (Ethanol)} + 2\\text{CO}_2\\uparrow$.",
    "💉 **Y học**: Dùng làm dịch truyền huyết thanh ngọt (glucose 5%) tiếp sức cấp tốc cho người ốm mệt.": "💉 **Medicine**: Formulated as 5% intravenous glucose drips for rapid bioenergetic resuscitation of depleted patients.",
    "  • **Bậc 3**: Thay cả 3 H $\\to \\text{R-N(R')-R}''$ (Ví dụ: Trimetylamin $(\\text{CH}_3)_3\\text{N}$).": "  • **Tertiary 3°**: All 3 H atoms replaced $\\to \\text{R-N(R')-R}''$ (Example: Trimethylamine $(\\text{CH}_3)_3\\text{N}$).",
    "⚠️ Lưu ý: Bậc amin tính theo số gốc gắn vào N, KHÁC HOÀN TOÀN bậc ancol (tính theo bậc carbon mang nhóm -OH)!": "⚠️ Important: Amine degree is defined by the number of hydrocarbon radicals attached to Nitrogen, fundamentally DIFFERENT from alcohol degrees (which depend on the degree of the carbon bearing the -OH group)!",
    "[III. ANILINE VỚI NƯỚC BROM (PHẢN ỨNG TẠO KẾT TỦA TRẮNG)] Nhỏ nước Brom vào dung dịch Anilin $\\to$ Xuất hiện ngay lập tức **kết tủa TRẮNG** của 2,4,6-tribromanilin (dùng để nhận biết Anilin!):": "[III. ANILINE TRIBROMINATION] Adding aqueous bromine to aniline solution $\\to$ Instantly precipitates **WHITE precipitate** of 2,4,6-tribromoaniline (diagnostic test for aniline!):",
    "[III. ANILINE VỚI NƯỚC BROM (PHẢN ỨNG TẠO KẾT TỦA TRẮNG)] $$\\text{C}_6\\text{H}_5\\text{NH}_2 + 3\\text{Br}_2 \\to \\text{C}_6\\text{H}_2\\text{Br}_3\\text{NH}_2 \\downarrow (\\text{Trắng}) + 3\\text{HBr}$$": "[III. ANILINE TRIBROMINATION] $$\\text{C}_6\\text{H}_5\\text{NH}_2 + 3\\text{Br}_2 \\longrightarrow \\text{C}_6\\text{H}_2\\text{Br}_3\\text{NH}_2\\downarrow\\text{ (White)} + 3\\text{HBr}$$",
    "🔋 **Công thức tính Suất điện động chuẩn $E^\\circ_{\\text{pin}}$**: $$E^\\circ_{\\text{pin}} = E^\\circ_{\\text{catot (dương)}} - E^\\circ_{\\text{anot (âm)}} = E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) - E^\\circ(\\text{Zn}^{2+}/\\text{Zn}) = 0.34 - (-0.76) = +1.10\\text{ V}$$": "🔋 **Standard Cell EMF Formula $E^\\circ_{\\text{cell}}$**: $$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode (+) }} - E^\\circ_{\\text{anode (-) }} = E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) - E^\\circ(\\text{Zn}^{2+}/\\text{Zn}) = 0.34 - (-0.76) = +1.10\\text{ V}$$",
    "Extraction of Highly Active Metals (Na, Mg, Al): Obligatory molten salt/oxide electrolysis (Downs cell for Na, Hall-Héroult for Al).": "Extraction of Highly Active Metals (Na, Mg, Al): Obligatory molten salt/oxide electrolysis (Downs cell for Na, Hall-Heroult for Al).",
    "[3. Industrial Applications: Metal Smelting, Refining & Electroplating] Extraction of Highly Active Metals (Na, Mg, Al): Obligatory molten salt/oxide electrolysis (Downs cell for Na, Hall-Héroult for Al).": "[3. Industrial Applications: Metal Smelting, Refining & Electroplating] Extraction of Highly Active Metals (Na, Mg, Al): Obligatory molten salt/oxide electrolysis (Downs cell for Na, Hall-Heroult for Al).",
    "$$2\\text{Al}_2\\text{O}_3 \\xrightarrow{\\text{electrolysis}} 4\\text{Al} + 3\\text{O}_2 \\quad [\\text{Hall-Héroult Process}]$$": "$$2\\text{Al}_2\\text{O}_3 \\xrightarrow{\\text{electrolysis}} 4\\text{Al} + 3\\text{O}_2 \\quad [\\text{Hall-Heroult Process}]$$",
    "$$2\\text{Al}_2\\text{O}_3 \\xrightarrow[\\text{Na}_3\\text{AlF}_6]{\\text{electrolysis}} 4\\text{Al} + 3\\text{O}_2\\uparrow \\quad (\\text{Hall-Héroult Process})$$": "$$2\\text{Al}_2\\text{O}_3 \\xrightarrow[\\text{Na}_3\\text{AlF}_6]{\\text{electrolysis}} 4\\text{Al} + 3\\text{O}_2\\uparrow \\quad (\\text{Hall-Heroult Process})$$"
}

for l in lessons:
    # Sections
    for sec in l.get("sections", []):
        if isinstance(sec.get("heading"), dict):
            h_vn = sec["heading"].get("VN", "")
            if h_vn in G12_REMAINING:
                sec["heading"]["EN"] = G12_REMAINING[h_vn]
            elif sec["heading"].get("EN") in G12_REMAINING:
                sec["heading"]["EN"] = G12_REMAINING[sec["heading"]["EN"]]
                
        for pt in sec.get("points", []):
            if isinstance(pt, dict):
                p_vn = pt.get("VN", "")
                if p_vn in G12_REMAINING:
                    pt["EN"] = G12_REMAINING[p_vn]
                elif pt.get("EN") in G12_REMAINING:
                    pt["EN"] = G12_REMAINING[pt["EN"]]

    # Theory points
    for tp in l.get("theoryPoints", []):
        if isinstance(tp, dict):
            tp_vn = tp.get("VN", "")
            if tp_vn in G12_REMAINING:
                tp["EN"] = G12_REMAINING[tp_vn]
            elif tp.get("EN") in G12_REMAINING:
                tp["EN"] = G12_REMAINING[tp["EN"]]

    # Equations
    new_eq = []
    for eq in l.get("equations", []):
        new_eq.append(G12_REMAINING.get(eq, eq))
    l["equations"] = new_eq

with open("src/data/vietnamCurriculumData.json", "w", encoding="utf-8") as f:
    json.dump(lessons, f, ensure_ascii=False, indent=2)

print("Applied final Grade 12 polish.")
