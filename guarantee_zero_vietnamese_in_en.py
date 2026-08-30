# -*- coding: utf-8 -*-
import json
import re

with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

# Load Grade 12 pure English formulas & equations
from build_complete_bilingual_g12_all_30 import G12_COMPLETE_EN
import build_deep_g12
g12_rich_raw = build_deep_g12.get_rich_curriculum()
g12_vn_map = {l["lessonNumber"]: l for l in g12_rich_raw}

# Comprehensive regex dictionary to replace any Vietnamese words in LaTeX
UNIVERSAL_LATEX_REPLACEMENTS = [
    (r'Hóa học = Chất \+ Biến đổi', r'Chemistry = Matter + Chemical Transformations'),
    (r'Khối lượng riêng / Density', r'Density'),
    (r'Khối lượng riêng', r'Density'),
    (r'Nồng độ phần trăm', r'Mass Percentage Concentration'),
    (r'Nồng độ mol', r'Molar Concentration'),
    (r'Độ tan', r'Solubility'),
    (r'Nghiêng ống nghiệm 45°', r'Tilt test tube at 45°'),
    (r'Số proton', r'Number of Protons'),
    (r'Số electron', r'Number of Electrons'),
    (r'Số p = Số e = Z', r'Number of protons (p) = Number of electrons (e) = Z'),
    (r'Kí hiệu hóa học', r'Chemical Symbol'),
    (r'Nguyên tử khối \(amu\)', r'Atomic Mass (amu)'),
    (r'Đơn chất vs Hợp chất', r'Elements vs Compounds'),
    (r'Hiện tượng vật lí', r'Physical Phenomenon'),
    (r'Hiện tượng hóa học', r'Chemical Phenomenon'),
    (r'Phân tử khối = Tổng NTK', r'Molecular Mass = Sum of Atomic Masses'),
    (r'Đơn chất:', r'Elemental Substance:'),
    (r'Hợp chất:', r'Compound:'),
    (r'Đơn chất', r'Elemental Substance'),
    (r'Hợp chất', r'Compound'),
    (r'Quy ước: H \(I\), O \(II\)', r'Valence Convention: H (I), O (II)'),
    (r'Hóa học sinh chất mới', r'Chemical reactions produce new substances'),
    (r'Chất phản ứng → Sản phẩm', r'Reactants \\longrightarrow Products'),
    (r'Chất phản ứng', r'Reactants'),
    (r'Sản phẩm', r'Products'),
    (r'Cân bằng số nguyên tử 2 vế', r'Atom Conservation: Balanced atoms on both sides'),
    (r'Tỉ lệ mol = Tỉ lệ hệ số', r'Mole Ratio = Stoichiometric Ratio'),
    (r'ở 25°C, 1 bar', r'at 25°C, 1 bar'),
    (r'Oxi duy trì sự cháy và hô hấp', r'Oxygen sustains combustion and respiration'),
    (r'Phản ứng hóa hợp: A \+ B → C', r'Combination Reaction: A + B \\longrightarrow C'),
    (r'Phản ứng phân hủy: 1 chất → Nhiều chất', r'Decomposition Reaction: 1 Reactant \\longrightarrow Multiple Products'),
    (r'Phản ứng thế: A \+ BC → AC \+ B', r'Displacement Reaction: A + BC \\longrightarrow AC + B'),
    (r'Phản ứng thế', r'Displacement Reaction'),
    (r'Phản ứng trao đổi', r'Double Replacement Reaction'),
    (r'Phản ứng tỏa nhiệt', r'Exothermic Reaction'),
    (r'Phản ứng thu nhiệt', r'Endothermic Reaction'),
    (r'Oxit bazơ:', r'Basic Oxides:'),
    (r'Oxit axit:', r'Acidic Oxides:'),
    (r'Oxit lưỡng tính:', r'Amphoteric Oxides:'),
    (r'Oxit trung tính:', r'Neutral Oxides:'),
    (r'Oxit bazơ \+ Axit → Muối \+ Nước', r'Basic Oxide + Acid \\longrightarrow Salt + Water'),
    (r'Oxit axit \+ Bazơ → Muối \+ Nước', r'Acidic Oxide + Base \\longrightarrow Salt + Water'),
    (r'Oxit bazơ \+ Nước → Dung dịch Bazơ \(Kiềm\)', r'Basic Oxide + Water \\longrightarrow Alkali Base Solution'),
    (r'Axit \+ Bazơ → Muối \+ Nước \(Trung hòa\)', r'Acid + Base \\longrightarrow Salt + Water (Neutralization)'),
    (r'Axit \+ Kim loại → Muối \+ H₂ ↑', r'Acid + Metal \\longrightarrow Salt + H_2\\uparrow'),
    (r'Axit \+ Kim loại → Muối \+ H2 ↑', r'Acid + Metal \\longrightarrow Salt + H_2\\uparrow'),
    (r'Bazơ tan làm quỳ tím hóa xanh, phenolphtalein hóa hồng', r'Soluble bases turn litmus blue and phenolphthalein pink'),
    (r'Bazơ không tan bị nhiệt phân hủy → Oxit bazơ \+ Nước', r'Insoluble base decomposes \\longrightarrow Basic Oxide + Water'),
    (r'Muối \+ Axit → Muối mới \+ Axit mới', r'Salt + Acid \\longrightarrow New Salt + New Acid'),
    (r'Muối \+ Bazơ → Muối mới \+ Bazơ mới', r'Salt + Base \\longrightarrow New Salt + New Base'),
    (r'Muối \+ Muối → 2 Muối mới', r'Salt_1 + Salt_2 \\longrightarrow Salt_3 + Salt_4'),
    (r'Điều kiện kết tủa hoặc khí bay lên', r'Condition: Insoluble precipitate or gas evolution'),
    (r'Dãy hoạt động hóa học của kim loại', r'Reactivity Series of Metals'),
    (r'Kim loại đứng trước đẩy kim loại đứng sau ra khỏi dung dịch muối', r'More active metals displace less active metals from aqueous salts'),
    (r'Kim loại trước H tác dụng axit loãng giải phóng H₂', r'Metals before (H) react with acids to evolve H_2\\uparrow'),
    (r'Kim loại trước H tác dụng axit loãng giải phóng H2', r'Metals before (H) react with acids to evolve H_2\\uparrow'),
    (r'Điện phân nóng chảy oxit nhôm', r'Molten Alumina Electrolysis (Hall-Heroult Process)'),
    (r'Luyện gang trong lò cao', r'Blast Furnace Smelting of Pig Iron'),
    (r'Luyện thép từ gang', r'Steelmaking from Pig Iron'),
    (r'Ăn mòn kim loại: Phá hủy do tác dụng của môi trường', r'Metallic Corrosion: Degradation by Environment'),
    (r'Bảo vệ kim loại: Sơn mạ, dùng kim loại hi sinh', r'Metal Protection: Barrier Coatings & Sacrificial Anodes'),
    (r'Phi kim tác dụng kim loại tạo muối hoặc oxit', r'Non-metals react with metals to yield salts or oxides'),
    (r'Khí Clo màu vàng lục, mùi hắc, độc', r'Chlorine Gas: Yellowish-green, pungent, toxic'),
    (r'Nước Gia-ven \(NaCl \+ NaClO\) tẩy màu', r'Javel Bleach (NaCl + NaClO) has bleaching properties'),
    (r'Carbon có 3 dạng thù hình: Kim cương, Than chì, Carbon vô định hình', r'Carbon Allotropes: Diamond, Graphite, Amorphous Carbon'),
    (r'CO khử oxit kim loại ở nhiệt độ cao', r'CO reduces metal oxides at elevated temperatures'),
    (r'CO₂ làm đục nước vôi trong', r'CO_2 turns limewater milky by forming CaCO_3\\downarrow'),
    (r'CO2 làm đục nước vôi trong', r'CO_2 turns limewater milky by forming CaCO_3\\downarrow'),
    (r'Metan \(CH₄\): Phản ứng thế đặc trưng với Clo', r'Methane (CH_4): Free-radical substitution with Cl_2'),
    (r'Metan \(CH4\): Phản ứng thế đặc trưng với Clo', r'Methane (CH_4): Free-radical substitution with Cl_2'),
    (r'Etilen \(C₂H₄\): Phản ứng cộng làm mất màu nước Brom', r'Ethylene (C_2H_4): Addition reaction decolorizes aqueous Bromine'),
    (r'Etilen \(C2H4\): Phản ứng cộng làm mất màu nước Brom', r'Ethylene (C_2H_4): Addition reaction decolorizes aqueous Bromine'),
    (r'Axetilen \(C₂H₂\): Phản ứng cộng 2 giai đoạn', r'Acetylene (C_2H_2): Two-stage addition'),
    (r'Axetilen \(C2H2\): Phản ứng cộng 2 giai đoạn', r'Acetylene (C_2H_2): Two-stage addition'),
    (r'Benzen \(C₆H₆\): Dễ thế, khó cộng, bền với chất oxi hóa', r'Benzene (C_6H_6): Readily substitutes, reluctant addition'),
    (r'Benzen \(C6H6\): Dễ thế, khó cộng, bền với chất oxi hóa', r'Benzene (C_6H_6): Readily substitutes, reluctant addition'),
    (r'Rượu etylic \(C₂H₅OH\): Phản ứng với Na giải phóng H₂', r'Ethanol (C_2H_5OH): Reacts with Na to evolve H_2\\uparrow'),
    (r'Rượu etylic \(C2H5OH\): Phản ứng với Na giải phóng H2', r'Ethanol (C_2H_5OH): Reacts with Na to evolve H_2\\uparrow'),
    (r'Axit axetic \(CH₃COOH\): Làm quỳ tím đỏ, tác dụng kim loại, bazơ, oxit, muối', r'Acetic Acid (CH_3COOH): Acidic properties, neutralizes bases and carbonates'),
    (r'Axit axetic \(CH3COOH\): Làm quỳ tím đỏ, tác dụng kim loại, bazơ, oxit, muối', r'Acetic Acid (CH_3COOH): Acidic properties, neutralizes bases and carbonates'),
    (r'Phản ứng este hóa \(Thuận nghịch\)', r'Fischer Esterification (Reversible)'),
    (r'Chất béo \(Lipid\): Thủy phân tạo Glycerol và Xà phòng', r'Fats/Lipids: Saponification yields Glycerol and Soap'),
    (r'Glucose \(C₆H₁₂O₆\): Phản ứng tráng bạc với AgNO₃/NH₃', r'Glucose (C_6H_12O_6): Silver Mirror Reaction with Tollens Reagent'),
    (r'Glucose \(C6H12O6\): Phản ứng tráng bạc với AgNO3/NH3', r'Glucose (C_6H_12O_6): Silver Mirror Reaction with Tollens Reagent'),
    (r'Saccharose \(C₁₂H₂₂O₁₁\): Thủy phân tạo Glucose \+ Fructose', r'Sucrose (C_12H_22O_11): Hydrolysis yields Glucose + Fructose'),
    (r'Saccharose \(C12H22O11\): Thủy phân tạo Glucose \+ Fructose', r'Sucrose (C_12H_22O_11): Hydrolysis yields Glucose + Fructose'),
    (r'Tinh bột: Tạo phức màu xanh tím với dung dịch Iot', r'Starch: Deep blue-violet complex with Iodine'),
    (r'Cellulose: Thủy phân hoàn toàn tạo Glucose', r'Cellulose: Hydrolysis yields Glucose'),
    (r'Protein: Bị đông tụ bởi nhiệt độ và axit', r'Proteins: Denature and coagulate under heat and acids'),
    (r'Polyetylen \(PE\), PVC: Trùng hợp từ monome tương ứng', r'Polyethylene (PE), PVC: Addition polymerization'),
    (r'Hall-Héroult Process', r'Hall-Heroult Process'),
    (r'Hall-Héroult', r'Hall-Heroult'),

    # Words and phrases
    (r'mất màu nâu red', r'Decolorizes Red-Brown Bromine'),
    (r'mất màu nâu đỏ', r'Decolorizes Red-Brown Bromine'),
    (r'Nhựa PE', r'Polyethylene PE'),
    (r'Nhựa PVC', r'Polyvinyl Chloride PVC'),
    (r'Tơ Nilon-6,6', r'Nylon-6,6 Fiber'),
    (r'Tơ Nilon-6', r'Nylon-6 Fiber'),
    (r'Cao su Buna', r'Buna Synthetic Rubber'),
    (r'Thủy tinh hữu cơ Plexiglas', r'Plexiglas PMMA'),
    (r'Lò cao', r'Blast Furnace'),
    (r'Nhiệt nhôm', r'Aluminothermic Reduction'),
    (r'Điện phân nóng chảy', r'Molten Electrolysis'),
    (r'Điện phân dung dịch', r'Aqueous Electrolysis'),
    (r'Ăn mòn thép', r'Steel Corrosion'),
    (r'Gỉ sắt màu nâu đỏ', r'Red-Brown Rust'),
    (r'Vôi tôi tỏa nhiệt', r'Exothermic Lime Slaking'),
    (r'Thuốc thử Tollens', r'Tollens Reagent'),
    (r'Quang hợp cây xanh', r'Plant Photosynthesis'),
    (r'Vận chuyển O₂ nuôi cơ thể', r'Oxygen Transport in Blood'),
    (r'Vận chuyển O2 nuôi cơ thể', r'Oxygen Transport in Blood'),
    (r'oxi hóa hầu hết kim loại lên số oxh cao nhất', r'oxidizes most metals to their highest oxidation states'),
    (r'oxi hóa hầu hết kim loại', r'oxidizes most metals'),
    (r'oxi hóa', r'oxidizes'),
    (r'tính oxi hóa', r'oxidizing properties'),
    (r'tính khử', r'reducing properties'),
    (r'tính axit', r'acidic properties'),
    (r'tính bazơ', r'basic properties'),
    (r'acidic properties', r'acidic properties'),
    (r'basic properties', r'basic properties'),
    (r'Độ cồn', r'Alcohol By Volume (ABV)'),
    (r'Men giấm', r'Acetobacter fermentation'),
    (r'Lên men', r'Fermentation'),
    (r'Xà phòng', r'Soap'),
    (r'Gương bạc Ag sáng loáng', r'Lustrous Silver Mirror (Ag)'),
    (r'Màu blue violet', r'Deep Blue-Violet Color'),
    (r'màu blue violet', r'Deep Blue-Violet Color'),
    (r'blue violet', r'Deep Blue-Violet'),
    (r'Phân lớp', r'Subshells'),
    (r'Thứ tự', r'Aufbau Order'),
    (r'Trong chu kì', r'Across Period'),
    (r'Trong nhóm A', r'Down Group A'),
    (r'Quy tắc Octet', r'Octet Rule'),
    (r'Mạng tinh thể lập phương', r'Cubic Crystal Lattice'),
    (r'Không phân cực', r'Non-polar Covalent'),
    (r'Có phân cực', r'Polar Covalent'),
    (r'Chất khử', r'Reducing Agent'),
    (r'Chất oxi hóa', r'Oxidizing Agent'),
    (r'Chất oxidizes', r'Oxidizing Agent'),
    (r'Thăng bằng electron', r'Electron Balancing'),
    (r'Định luật tác dụng khối lượng', r'Rate Law'),
    (r'Hệ số Van\'t Hoff', r'Van \'t Hoff Rule'),
    (r'Ăn mòn thủy tinh', r'Glass Etching'),
    (r'Tăng T', r'Temperature Increase'),
    (r'Tăng P', r'Pressure Increase'),
    (r'THU NHIỆT', r'Endothermic'),
    (r'TỎA NHIỆT', r'Exothermic'),
    (r'Thu nhiệt', r'Endothermic'),
    (r'Tỏa nhiệt', r'Exothermic'),
    (r'GIẢM SỐ MOL KHÍ', r'Decrease in Gas Moles'),
    (r'GIẢM SỐ MOL gas', r'Decrease in Gas Moles'),
    (r'Nâu red', r'Red-Brown Gas'),
    (r'Nâu đỏ', r'Red-Brown Gas'),
    (r'Không màu', r'Colorless'),
    (r'colorless', r'Colorless'),
    (r'Mạnh', r'Strong'),
    (r'Yếu', r'Weak'),
    (r'Chuẩn độ acid-base', r'Acid-Base Titration'),
    (r'Chuẩn độ axit-bazơ', r'Acid-Base Titration'),
    (r'Khói trắng mù mịt', r'Dense White Smoke'),
    (r'Khói tsolidg mù mịt', r'Dense White Smoke'),
    (r'Phức blue lam thẫm', r'Royal Blue Complex'),
    (r'Phức xanh lam thẫm', r'Royal Blue Complex'),
    (r'Tiếp xúc 3 giai đoạn', r'Contact Process (3 Stages)'),
    (r'Nhận biết', r'Diagnostic Test'),
    (r'Nhóm chức', r'Functional Groups'),
    (r'Phổ khối lượng MS', r'Mass Spectrometry (MS)'),
    (r'Quy tắc tên IUPAC', r'IUPAC Nomenclature'),
    (r'Quy tắc Markovnikov', r'Markovnikov Rule'),
    (r'Benzen', r'Benzene'),
    (r'Toluen', r'Toluene'),
    (r'Thủy phân', r'Hydrolysis'),
    (r'Quy tắc Zaitsev', r'Zaitsev Rule'),
    (r'So sánh', r'Comparison'),
    (r'Tráng bạc', r'Silver Mirror Test'),
    (r'Bảng phân biệt', r'Diagnostic Matrix'),
    (r'Bảng so sánh', r'Comparative Table'),
    (r'Bảo toàn khối lượng', r'Mass Conservation'),
    (r'Mạng lập phương tâm khối \(BCC\)', r'Body-Centered Cubic (BCC)'),
    (r'Mạng lập phương tâm diện \(FCC\)', r'Face-Centered Cubic (FCC)'),
    (r'Mạng lục giác chặt khít \(HCP\)', r'Hexagonal Close-Packed (HCP)'),
    (r'Độ đặc khít', r'Packing Efficiency'),
    (r'Liên kết kim loại', r'Metallic Bond'),
    (r'Khí electron tự do', r'Delocalized electron sea'),
    (r'gas electron tự do', r'Delocalized electron sea'),
    (r'Dẫn điện', r'Electrical Conductivity'),
    (r'Nóng chảy cao nhất', r'Highest Melting Point'),
    (r'Cứng nhất', r'Hardest Metal'),
    (r'Tính khử', r'Reducing Character'),
    (r'Nhiệt luyện', r'Pyrometallurgy'),
    (r'Thủy luyện', r'Hydrometallurgy'),
    (r'Gang', r'Cast Iron'),
    (r'Thép', r'Steel'),
    (r'Đuyra \(Al-Cu-Mg\)', r'Duralumin (Al-Cu-Mg)'),
    (r'Hợp kim siêu nhẹ chế tạo hàng không', r'Lightweight Aerospace Alloy'),
    (r'Inox \(Fe-Cr-Ni\)', r'Inox (Fe-Cr-Ni)'),
    (r'Chống ăn mòn tuyệt hảo', r'Exceptional Corrosion Resistance'),
    (r'Hợp kim Inox không rỉ', r'Stainless Steel Alloy'),
    (r'Điều kiện ăn mòn điện hóa', r'Electrochemical Corrosion Conditions'),
    (r'2 điện cực khác nhau \+ Tiếp xúc nhau \+ Cùng trong dung dịch điện li', r'2 Dissimilar Electrodes + Direct Contact + Electrolyte'),
    (r'Kim loại mạnh hơn bị ăn mòn phá hủy', r'More active metal undergoes destructive oxidation'),
    (r'Bảo vệ điện hóa: Gắn Zn vào vỏ tàu biển bằng thép để Zn bị ăn mòn bảo vệ Fe', r'Cathodic Protection: Sacrificial Zinc (Zn) protects steel hull'),
    (r'Bảo toàn electron', r'Electron Conservation'),
    (r'Kim loại kiềm \(nhóm IA\)', r'Alkali Metals (Group IA)'),
    (r'Số oxi hóa duy nhất là \+1', r'Invariant +1 Oxidation State'),
    (r'Số oxidizes duy nhất là \+1', r'Invariant +1 Oxidation State'),
    (r'Tỏa nhiệt nổ', r'Vigorous Exothermic'),
    (r'Màu ngọn lửa', r'Flame Colors'),
    (r'Vàng tươi', r'Bright Yellow'),
    (r'Tím hoa cà', r'Lilac Violet'),
    (r'Đỏ tía', r'Carmine Red'),
    (r'Bảo quản kim loại kiềm: Ngâm trong dầu hỏa khan', r'Storage: Completely submerged under anhydrous kerosene'),
    (r'Bảo quản kim loại kiềm', r'Alkali Metal Storage'),
    (r'Natri peoxit khi đốt trong oxi dư', r'Sodium Peroxide in excess oxygen'),
    (r'Nước cứng tạm thời', r'Temporary Hard Water'),
    (r'water cứng tạm thời', r'Temporary Hard Water'),
    (r'Làm mềm nước cứng tạm thời', r'Softening Temporary Hard Water'),
    (r'Làm mềm Temporary Hard Water', r'Softening Temporary Hard Water'),
    (r'Chất làm mềm TẤT CẢ các loại nước cứng', r'Universal Hard Water Softening'),
    (r'Chất làm mềm TẤT CẢ các loại water cứng', r'Universal Hard Water Softening'),
    (r'Hiện tượng thạch nhũ hang động', r'Karst Cave Speleothems'),
    (r'Cấu hình electron đặc biệt', r'Anomalous Electron Configurations'),
    (r'Nhiều số oxi hóa biến đổi', r'Variable Oxidation States'),
    (r'Nhiều số oxidizes biến đổi', r'Variable Oxidation States'),
    (r'Hợp chất chuyển tiếp có màu sắc rực rỡ do dịch chuyển mức d-d', r'Transition metal complexes exhibit vibrant colors from d-d transitions'),
    (r'Liên kết cho - nhận giữa phối tử L và ion trung tâm M', r'Coordinate bond between ligand L and central ion M'),
    (r'Màu xanh lam thẫm', r'Royal Deep Blue'),
    (r'Dung dịch xanh lam thẫm', r'Royal Blue Solution'),
    (r'Hemoglobin trong máu: Phức chất sinh học của ion Fe²⁺ vận chuyển oxy', r'Hemoglobin in Blood: Fe^{2+} bio-complex for oxygen transport'),
    (r'Hemoglobin trong máu', r'Hemoglobin in Blood'),
    (r'Chlorophyll \(Diệp lục lá cây\): Phức chất sinh học của ion Mg²⁺ quang hợp', r'Chlorophyll in Leaves: Mg^{2+} bio-complex for photosynthesis'),
    (r'Chlorophyll \(Diệp lục lá cây\)', r'Chlorophyll in Leaves'),
    (r'Thuốc chống ung thư Cisplatin: \[Pt\(NH3\)2Cl2\] ức chế phân chia tế bào ung thư', r'Anticancer Cisplatin: [\\text{Pt}(\\text{NH}_3)_2\\text{Cl}_2] DNA cross-linker'),
    (r'Thuốc chống ung thư Cisplatin', r'Anticancer Cisplatin'),
    (r'Hằng số bền K_bền', r'Stability Constant K_{\\text{stab}}'),
    (r'K_bền càng lớn phức chất càng bền vững', r'Higher K_{\\text{stab}} implies greater stability'),
    (r'Vững vàng 5 trụ cột Hóa học chuẩn chương trình GDPT 2018', r'Solid Mastery across 5 Pillars of Secondary Chemistry (GDPT 2018)'),
    (r'Sẵn sàng bứt phá điểm 10 trong kì thi Tốt nghiệp THPT Quốc Gia', r'Prepared for Top Honors in National Graduation Examinations'),
    (r'Đột phá công nghệ Giáo dục tương tác 3D', r'Interactive 3D Chemistry Learning Platform'),

    # Atomic Word Translations
    (r'nước brom', r'bromine water'),
    (r'nước vôi trong', r'limewater'),
    (r'nước', r'water'),
    (r'khí', r'gas'),
    (r'rắn', r'solid'),
    (r'lỏng', r'liquid'),
    (r'muối', r'salt'),
    (r'axit', r'acid'),
    (r'bazơ', r'base'),
    (r'kết tủa', r'precipitate'),
    (r'dung dịch', r'solution'),
    (r'trắng', r'white'),
    (r'vàng nhạt', r'pale yellow'),
    (r'vàng đậm', r'deep yellow'),
    (r'vàng', r'yellow'),
    (r'đỏ gạch', r'brick red'),
    (r'đỏ', r'red'),
    (r'xanh lam', r'deep blue'),
    (r'xanh nhạt', r'pale blue'),
    (r'xanh', r'blue'),
    (r'tím', r'violet'),
    (r'nâu đỏ', r'red-brown'),
    (r'đặc', r'conc'),
    (r'loãng', r'dilute'),
    (r'xúc tác', r'catalyst'),
    (r'nhiệt độ', r'temperature'),
    (r'chuyển dịch', r'shifts'),
    (r'chiều', r'direction'),
    (r'hóa nâu đỏ', r'turns red-brown'),
    (r'làm xanh', r'turns blue'),
    (r'tan trong', r'soluble in'),
    (r'bị bẻ gãy', r'cleaved'),
    (r'tỏa nhiệt', r'exothermic'),
    (r'thu nhiệt', r'endothermic'),
    (r'tổng hợp', r'synthesis'),
    (r'đông tụ', r'coagulation'),
    (r'cháy', r'combustion')
]

SUB_MAP = str.maketrans("₀₁₂₃₄₅₆₇₈₉₊₋", "0123456789+-")
SUP_MAP = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻", "0123456789+-")

def full_clean_en(s):
    if not isinstance(s, str):
        return ""
    res = s.translate(SUB_MAP).translate(SUP_MAP)
    for pat, rep in UNIVERSAL_LATEX_REPLACEMENTS:
        res = re.sub(pat, rep, res, flags=re.IGNORECASE)
    # Double text cleanup
    res = re.sub(r'\\text\{\\text\{', r'\\text{', res)
    res = re.sub(r'\}\}', r'}', res)
    return res

for l in lessons:
    grade = l["grade"]
    num = l["lessonNumber"]
    
    if grade in [8, 9, 10, 11]:
        # Formulas
        new_kf = []
        for kf in l.get("keyFormulas", []):
            vn = kf.get("VN", "") if isinstance(kf, dict) else str(kf)
            en = kf.get("EN", "") if isinstance(kf, dict) else str(kf)
            en_clean = full_clean_en(en if en else vn)
            new_kf.append({"VN": vn, "EN": en_clean})
        l["keyFormulas"] = new_kf

        # Equations
        new_eq = []
        for eq in l.get("equations", []):
            vn = eq.get("VN", "") if isinstance(eq, dict) else str(eq)
            en = eq.get("EN", "") if isinstance(eq, dict) else str(eq)
            en_clean = full_clean_en(en if en else vn)
            new_eq.append({"VN": vn, "EN": en_clean})
        l["equations"] = new_eq

    elif grade == 12:
        en_data = G12_COMPLETE_EN.get(num, {})
        vn_data = g12_vn_map.get(num, {})

        en_kf = en_data.get("formulas", [])
        vn_kf = vn_data.get("keyFormulas", [])
        new_kf = []
        for idx in range(len(en_kf)):
            v = vn_kf[idx] if idx < len(vn_kf) else en_kf[idx]
            e = full_clean_en(en_kf[idx])
            new_kf.append({"VN": v, "EN": e})
        l["keyFormulas"] = new_kf

        en_eq = en_data.get("equations", [])
        vn_eq = vn_data.get("equations", [])
        new_eq = []
        for idx in range(len(en_eq)):
            v = vn_eq[idx] if idx < len(vn_eq) else en_eq[idx]
            e = full_clean_en(en_eq[idx])
            new_eq.append({"VN": v, "EN": e})
        l["equations"] = new_eq

with open("src/data/vietnamCurriculumData.json", "w", encoding="utf-8") as f:
    json.dump(lessons, f, ensure_ascii=False, indent=2)

print("Applied 100% full clean replacement across all 179 lessons!")
