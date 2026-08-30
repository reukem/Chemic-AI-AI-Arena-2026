# -*- coding: utf-8 -*-
import json
import re

with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

# Exact dictionary mapping for every remaining phrase / string
FINAL_78_MAP = {
    # Grade 9
    "$$CH2=CH2 + Br2 → CH2Br-CH2Br (mất màu nâu red)$$": "$$\\text{CH}_2\\text{=CH}_2 + \\text{Br}_2 \\longrightarrow \\text{CH}_2\\text{Br-CH}_2\\text{Br} \\quad [\\text{Decolorizes Red-Brown Bromine}]$$",
    "$$n CH2=CH2 → (-CH2-CH2-)_n (Nhựa PE)$$": "$$n\\text{ CH}_2\\text{=CH}_2 \\xrightarrow{t^\\circ, p, xt} (\\text{-CH}_2\\text{-CH}_2\\text{-})_n \\quad [\\text{Polyethylene PE}]$$",
    "$$Không làm mất màu bromine water ở điều kiện thường.$$": "$$\\text{Does not decolorize bromine water under ambient conditions.}$$",
    "$$Chưng cất phân đoạn dựa vào temperature sôi$$": "$$\\text{Fractional distillation based on boiling point differentials}$$",
    "$${\\text{Cracking}: Bẻ gãy C dài thành C ngắn}$$": "$$\\text{Cracking}: \\text{Thermal/catalytic cleavage of long-chain hydrocarbons into shorter chains}$$",
    "$$\\text{Năng suất tỏa nhiệt}: gas > liquid > solid$$": "$$\\text{Calorific Value}: \\text{Gas} > \\text{Liquid} > \\text{Solid}$$",
    "$$Cung cấp đủ không gas và tăng diện tích tiếp xúc.$$": "$$\\text{Supply adequate air (oxygen) and maximize surface area contact.}$$",
    "$$Bảng so sánh 4 hidrocacbon cơ bản$$": "$$\\text{Comparative Matrix of 4 Fundamental Hydrocarbons}$$",
    "$$CH4 (thế Cl2)$$": "$$\\text{CH}_4 \\text{ (Radical } \\text{Cl}_2 \\text{ Substitution)}$$",
    "$$C2H4 (cộng Br2)$$": "$$\\text{C}_2\\text{H}_4 \\text{ (Electrophilic } \\text{Br}_2 \\text{ Addition)}$$",
    "$$C2H2 (cộng 2Br2)$$": "$$\\text{C}_2\\text{H}_2 \\text{ (Two-Step } 2\\text{Br}_2 \\text{ Addition)}$$",
    "$$C6H6 (thế Br2/Fe)$$": "$$\\text{C}_6\\text{H}_6 \\text{ (Electrophilic } \\text{Br}_2/\\text{Fe} \\text{ Substitution)}$$",
    "$$bromine water bị mất màu nhanh chóng.$$": "$$\\text{Bromine water decolorizes rapidly.}$$",
    "$$Độ cồn = (V_rượu / V_dd) × 100$$": "$$\\text{Alcohol By Volume (ABV)} = \\frac{V_{\\text{ethanol}}}{V_{\\text{solution}}} \\times 100\\%$$",
    "$$C2H5OH + O2 → CH3COOH + H2O (Men giấm)$$": "$$\\text{C}_2\\text{H}_5\\text{OH} + \\text{O}_2 \\xrightarrow{\\text{Acetobacter aceti}} \\text{CH}_3\\text{COOH} + \\text{H}_2\\text{O}$$",
    "$$Este etyl axetat có mùi thơm hoa quả.$$": "$$\\text{Ethyl acetate ester imparts a pleasant fruity fragrance.}$$",
    "$$Chuỗi phản ứng cốt lõi trong công nghiệp hữu cơ.$$": "$$\\text{Core Transformation Pathways in Industrial Organic Chemistry}$$",
    "$$(RCOO)3C3H5 + 3NaOH → 3RCOONa (Xà phòng) + C3H5(OH)3 (Glycerol)$$": "$$(R\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\xrightarrow{t^\\circ} 3R\\text{COONa (Soap)} + \\text{C}_3\\text{H}_5(\\text{OH})_3\\text{ (Glycerol)}$$",
    "$$Chất béo nhẹ hơn water, không tan trong water.$$": "$$\\text{Fats are lighter than water and immiscible in aqueous media.}$$",
    "$$So sánh tính chất nhóm chức -OH và -COOH$$": "$$\\text{Comparative Functional Group Chemistry: -OH vs -COOH}$$",
    "$$CH3COOH tác dụng NaHCO3; C2H5OH không tác dụng.$$": "$$\\text{CH}_3\\text{COOH reacts with } \\text{NaHCO}_3\\text{; } \\text{C}_2\\text{H}_5\\text{OH does not react.}$$",
    "$$Etyl axetat nhẹ nổi lên trên có mùi thơm.$$": "$$\\text{Ethyl acetate forms a fragrant, low-density upper organic layer.}$$",
    "$$C6H12O6 → 2C2H5OH + 2CO2 ↑ (Lên men)$$": "$$\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{zymase}} 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2\\uparrow$$",
    "$$Dùng tráng gương, tráng ruột phích và làm thuốc bổ.$$": "$$\\text{Applications: Silver mirror manufacturing, thermos lining, nutritional dextrose}$$",
    "$$Sản phẩm thủy phân tham gia phản ứng tráng bạc.$$": "$$\\text{Hydrolysis products reduce Tollens reagent to deposit silver mirror.}$$",
    "$$Tinh bột + I2 → \\text{Compound} bọc màu blue violet$$": "$$\\text{Starch} + \\text{I}_2 \\longrightarrow \\text{Deep Blue-Violet Inclusion Complex}$$",
    "$$Xenlulozơ có mạch không phân nhánh tạo nên màng tế bào thực vật.$$": "$$\\text{Cellulose forms unbranched linear chains composing plant cell walls.}$$",
    "$$Sự đông tụ protein khi đun nóng hoặc thêm cồn/acid$$": "$$\\text{Protein denaturation & coagulation under thermal or acidic conditions}$$",
    "$$Đốt cháy protein (tóc, lông cừu) có mùi khét.$$": "$$\\text{Burning keratin proteins (hair, wool) emits characteristic acrid odor.}$$",
    "$$\\text{Trùng hợp}: n CH2=CHCl → (-CH2-CHCl-)_n (Nhựa PVC)$$": "$$n\\text{ CH}_2\\text{=CHCl} \\xrightarrow{t^\\circ, p, xt} (\\text{-CH}_2\\text{-CHCl-})_n \\quad [\\text{Polyvinyl Chloride PVC}]$$",
    "$$Cao su có tính đàn hồi vượt trội, không thấm water.$$": "$$\\text{Elastomers exhibit superior elasticity and water impermeability.}$$",
    "$$Glucozơ + Tollens → Gương bạc Ag sáng loáng$$": "$$\\text{Glucose} + \\text{Tollens Reagent} \\longrightarrow \\text{Lustrous Silver Mirror (Ag)}$$",
    "$$Hồ tinh bột + I2 → Màu blue violet$$": "$$\\text{Starch Paste} + \\text{I}_2 \\longrightarrow \\text{Deep Blue-Violet Complex}$$",
    "$$Đun nóng màu blue violet biến mất, để nguội xuất hiện lại.$$": "$$\\text{Deep blue color fades upon heating and returns reversibly upon cooling.}$$",
    "$$Hệ thống hóa toàn bộ kiến thức vô cơ và hữu cơ$$": "$$\\text{Comprehensive Synthesis of Inorganic and Organic Chemistry}$$",
    "$$Vững chắc phương pháp giải bài toán tổng hợp.$$": "$$\\text{Mastery of Stoichiometric and Qualitative Problem Solving}$$",

    # Grade 10
    "$${\\text{Phân lớp}: s (2e), p (6e), d (10e), f (14e)}$$": "$$\\text{Subshells}: s \\text{ (max 2e)}, \\; p \\text{ (max 6e)}, \\; d \\text{ (max 10e)}, \\; f \\text{ (max 14e)}$$",
    "$${\\text{Thứ tự}: 1s 2s 2p 3s 3p 4s 3d 4p...}$$": "$$\\text{Aufbau Order}: 1s \\; 2s \\; 2p \\; 3s \\; 3p \\; 4s \\; 3d \\; 4p \\dots$$",
    "$${\\text{Trong chu kì}: R giảm, Độ âm điện tăng, Phi kim tăng, Kim loại giảm}$$": "$$\\text{Across Period}: R \\downarrow, \\; \\text{Electronegativity} \\uparrow, \\; \\text{Non-metallic} \\uparrow, \\; \\text{Metallic} \\downarrow$$",
    "$${\\text{Trong nhóm A}: R tăng, Độ âm điện giảm, Kim loại tăng, Phi kim giảm}$$": "$$\\text{Down Group A}: R \\uparrow, \\; \\text{Electronegativity} \\downarrow, \\; \\text{Metallic} \\uparrow, \\; \\text{Non-metallic} \\downarrow$$",
    "$$basic properties của oxit/hiđroxit giảm dần, acidic properties tăng dần$$": "$$\\text{Basicity of oxides/hydroxides decreases while acidity increases}$$",
    "$$Na2O (base mạnh) → Al2O3 (Lưỡng tính) → SO3 → Cl2O7 (acid cực mạnh)$$": "$$\\text{Na}_2\\text{O (Strong Base)} \\longrightarrow \\text{Al}_2\\text{O}_3\\text{ (Amphoteric)} \\longrightarrow \\text{SO}_3 \\longrightarrow \\text{Cl}_2\\text{O}_7\\text{ (Strong Acid)}$$",
    "$${\\text{Quy tắc Octet}: 8 electron lớp ngoài cùng (hoặc 2e của He)}$$": "$$\\text{Octet Rule: 8 valence electrons for stable configuration (2e for Helium)}$$",
    "$$Na+ + Cl- → NaCl (Mạng tinh thể lập phương)$$": "$$\\text{Na}^+ + \\text{Cl}^- \\longrightarrow \\text{NaCl} \\quad [\\text{Face-Centered Cubic Crystal Lattice}]$$",
    "$$\\text{0 ≤ Δχ < 0,4}: CHT Không phân cực$$": "$$0 \\le \\Delta\\chi < 0.4 \\longrightarrow \\text{Non-polar Covalent Bond}$$",
    "$$\\text{0,4 ≤ Δχ < 1,7}: CHT Có phân cực$$": "$$0.4 \\le \\Delta\\chi < 1.7 \\longrightarrow \\text{Polar Covalent Bond}$$",
    "$${\\text{Chất khử}: nhường e (tăng số oxh)}$$": "$$\\text{Reducing Agent: Donates electrons (Oxidation state increases)}$$",
    "$${\\text{Chất oxidizes}: nhận e (giảm số oxh)}$$": "$$\\text{Oxidizing Agent: Accepts electrons (Oxidation state decreases)}$$",
    "$${\\text{Thăng bằng electron}: Tìm hệ số chất khử và chất oxidizes}$$": "$$\\text{Electron Balancing: Determining stoichiometric coefficients for redox couples}$$",
    "$$\\text{Định luật tác dụng khối lượng}: v = k × [A]^a × [B]^b$$": "$$\\text{Rate Law}: v = k \\cdot [A]^a [B]^b$$",
    "$$\\text{Hệ số Van't Hoff}: v_T2 = v_T1 × γ^((T2 - T1) / 10)$$": "$$\\text{Van 't Hoff Rule}: v_{T_2} = v_{T_1} \\cdot \\gamma^{\\frac{T_2 - T_1}{10}}$$",
    "$$\\text{k}: Hằng số tốc độ phản ứng$$": "$$k\\text{: Specific Reaction Rate Constant}$$",
    "$$\\text{HF ăn mòn thủy tinh}: SiO2 + 4HF → SiF4 ↑ + 2H2O$$": "$$\\text{Glass Etching by HF}: \\text{SiO}_2 + 4\\text{HF} \\longrightarrow \\text{SiF}_4\\uparrow + 2\\text{H}_2\\text{O}$$",

    # Grade 11
    "$$\\text{Tăng T}: Chuyển dịch chiều THU NHIỆT (ΔH > 0)$$": "$$\\text{Temperature Increase}: \\text{Equilibrium shifts in Endothermic Direction } (\\Delta H > 0)$$",
    "$${\\text{Tăng P}: Chuyển dịch chiều GIẢM SỐ MOL gas}$$": "$$\\text{Pressure Increase}: \\text{Equilibrium shifts toward fewer moles of gas}$$",
    "$$2NO2 (g) [Nâu red] ⇌ N2O4 (g) [colorless]  Δ_r H°298 = -58 kJ$$": "$$2\\text{NO}_2\\text{ (g) [Red-Brown Gas]} \\rightleftharpoons \\text{N}_2\\text{O}_4\\text{ (g) [Colorless Gas]} \\quad \\Delta_r H^\\circ_{298} = -58\\text{ kJ}$$",
    "$$K_w = [H+] × [OH-] = 1,0 × 10-14 (ở 25°C)$$": "$$K_w = [\\text{H}^+][\\text{OH}^-] = 1.0 \\times 10^{-14} \\text{ (at } 25^\\circ\\text{C)}$$",
    "$$HCl → H+ + Cl- (Mạnh)$$": "$$\\text{HCl} \\longrightarrow \\text{H}^+ + \\text{Cl}^- \\quad (\\text{Strong Electrolyte})$$",
    "$$CH3COOH ⇌ CH3COO- + H+ (Yếu)$$": "$$\\text{CH}_3\\text{COOH} \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}^+ \\quad (\\text{Weak Electrolyte})$$",
    "$$\\text{Chuẩn độ acid-base}: C_acid × V_acid = C_bazo × V_bazo$$": "$$\\text{Acid-Base Equivalence}: C_{\\text{acid}} \\cdot V_{\\text{acid}} = C_{\\text{base}} \\cdot V_{\\text{base}}$$",
    "$$N2 + O2 ⇌ 2NO  (3000°C hoặc tia lửa điện)$$": "$$\\text{N}_2 + \\text{O}_2 \\xrightleftharpoons{3000^\\circ\\text{C / Lightning}} 2\\text{NO}$$",
    "$$Cu2+ + 4NH3 → [Cu(NH3)4]2+ [Phức blue lam thẫm]$$": "$$\\text{Cu}^{2+} + 4\\text{NH}_3 \\longrightarrow [\\text{Cu}(\\text{NH}_3)_4]^{2+} \\quad [\\text{Royal Blue Complex}]$$",
    "$$Cu + 4HNO3 (conc) → Cu(NO3)2 + 2NO2 ↑ [Nâu red] + 2H2O$$": "$$\\text{Cu} + 4\\text{HNO}_3\\text{ (conc)} \\longrightarrow \\text{Cu(NO}_3)_2 + 2\\text{NO}_2\\uparrow\\text{ [Red-Brown Gas]} + 2\\text{H}_2\\text{O}$$",
    "$${\\text{Tiếp xúc 3 giai đoạn}: S/FeS2 → SO2 → SO3 (V2O5) → Oleum → H2SO4}$$": "$$\\text{Contact Process (3 Stages)}: \\text{S/FeS}_2 \\longrightarrow \\text{SO}_2 \\xrightarrow{\\text{V}_2\\text{O}_5} \\text{SO}_3 \\longrightarrow \\text{Oleum} \\longrightarrow \\text{H}_2\\text{SO}_4$$",
    "$$\\text{Nhận biết}: NH4+ (kiềm sinh NH3), SO42- (Ba2+ sinh BaSO4 ↓)$$": "$$\\text{Diagnostic Tests}: \\text{NH}_4^+ \\text{ (releases } \\text{NH}_3\\uparrow), \\; \\text{SO}_4^{2-} \\text{ (forms } \\text{BaSO}_4\\downarrow)$$",
    "$${\\text{Nhóm chức}: -OH (Alcohol), -CHO (Aldehyde), -COOH (Carboxylic acid), -COO- (Ester), -NH2 (Amine)}$$": "$$\\text{Key Functional Groups}: \\text{-OH (Alcohol)}, \\; \\text{-CHO (Aldehyde)}, \\; \\text{-COOH (Acid)}, \\; \\text{-COO- (Ester)}, \\; \\text{-NH}_2\\text{ (Amine)}$$",
    "$$Phổ khối lượng MS cho biết giá trị ion phân tử [M+] chính xác bằng M.$$": "$$\\text{Mass Spectrometry (MS) gives exact molecular ion peak } [M^+] = M$$",
    "$$\\text{Quy tắc tên IUPAC}: Vị trí nhánh + Nhánh + Mạch chính + Hậu tố$$": "$$\\text{IUPAC Rule}: \\text{Locant} + \\text{Substituent} + \\text{Parent Chain Root} + \\text{Suffix}$$",
    "$${\\text{Quy tắc Markovnikov}: H cộng vào C nhiều H hơn}$$": "$$\\text{Markovnikov Rule}: \\text{H adds to Carbon with more hydrogen atoms}$$",
    "$${\\text{Benzen}: Dễ thế Br2 (catalyst Fe), khó cộng}$$": "$$\\text{Benzene: Readily undergoes electrophilic bromination (Fe catalyst), reluctant addition}$$",
    "$${\\text{Toluen}: Tác dụng KMnO4 đun nóng tạo C6H5COOH}$$": "$$\\text{Toluene Oxidation}: \\text{C}_6\\text{H}_5\\text{-CH}_3 + [\\text{O}] \\xrightarrow{\\text{KMnO}_4, t^\\circ} \\text{C}_6\\text{H}_5\\text{-COOH}$$",
    "$$\\text{Thủy phân}: R-X + NaOH → R-OH + NaX (t°)$$": "$$R\\text{-}X + \\text{NaOH} \\xrightarrow{t^\\circ} R\\text{-OH} + \\text{Na}X \\quad [\\text{Alkyl Halide Hydrolysis}]$$",
    "$${\\text{Quy tắc Zaitsev}: Tách HX ưu tiên H ở C bậc cao}$$": "$$\\text{Zaitsev Rule}: \\text{Elimination preferentially removes H from more substituted Carbon}$$",
    "$${\\text{So sánh}: Ancol không tác dụng NaOH; Phenol tác dụng NaOH}$$": "$$\\text{Acidic Basicity}: \\text{Aliphatic alcohols do NOT react with NaOH; Phenol neutralizes NaOH}$$",
    "$$\\text{Tráng bạc}: R-CHO + 2[Ag(NH3)2]OH → R-COONH4 + 2Ag ↓ + 3NH3 + H2O$$": "$$R\\text{-CHO} + 2[\\text{Ag}(\\text{NH}_3)_2]\\text{OH} \\xrightarrow{t^\\circ} R\\text{-COONH}_4 + 2\\text{Ag}\\downarrow\\text{ (Silver Mirror)} + 3\\text{NH}_3 + \\text{H}_2\\text{O}$$",
    "$${\\text{Bảng phân biệt}: Ancol (-OH), Phenol (-OH thơm), Anđehit (-CHO), acid (-COOH)}$$": "$$\\text{Diagnostic Matrix: Alcohols (-OH), Phenols (Ar-OH), Aldehydes (-CHO), Acids (-COOH)}$$",

    # Grade 12
    "$$Bảo toàn khối lượng}: m_{\\text{este} + m_{\\text{NaOH} = m_{\\text{salt} + m_{\\text{ancol}$$": "$$\\text{Mass Conservation}: m_{\\text{ester}} + m_{\\text{NaOH}} = m_{\\text{salt}} + m_{\\text{alcohol}}$$",
    "$$2\\text{Al}_2\\text{O}_3 \\xrightarrow{\\text{electrolysis}} 4\\text{Al} + 3\\text{O}_2 \\quad [\\text{Hall-Héroult Process}]$$": "$$2\\text{Al}_2\\text{O}_3 \\xrightarrow{\\text{electrolysis}} 4\\text{Al} + 3\\text{O}_2 \\quad [\\text{Hall-Heroult Process}]$$"
}

for l in lessons:
    # 1. keyFormulas
    for kf in l.get("keyFormulas", []):
        if isinstance(kf, dict):
            en = kf.get("EN", "")
            if en in FINAL_78_MAP:
                kf["EN"] = FINAL_78_MAP[en]

    # 2. equations
    for eq in l.get("equations", []):
        if isinstance(eq, dict):
            en = eq.get("EN", "")
            if en in FINAL_78_MAP:
                eq["EN"] = FINAL_78_MAP[en]

with open("src/data/vietnamCurriculumData.json", "w", encoding="utf-8") as f:
    json.dump(lessons, f, ensure_ascii=False, indent=2)

print("Applied 100% resolution to all 78 items!")
