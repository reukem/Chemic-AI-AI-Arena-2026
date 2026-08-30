# -*- coding: utf-8 -*-
import json
import re

with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

G8_G10_TRANSLATIONS = {
    # --- Grade 8 LaTeX & Formulas ---
    "$$Hóa học = Chất + Biến đổi$$": "$$\\text{Chemistry} = \\text{Matter} + \\text{Transformations}$$",
    "$$D = \\frac{m}{V} \\quad (\\text{Khối lượng riêng / Density})$$": "$$D = \\frac{m}{V} \\quad (\\text{Density})$$",
    "$$C\\% = \\frac{m_{\\text{ct}}}{m_{\\text{dd}}} \\times 100\\% \\quad (\\text{Nồng độ phần trăm / Mass \\%})$$": "$$C\\% = \\frac{m_{\\text{solute}}}{m_{\\text{solution}}} \\times 100\\% \\quad (\\text{Mass Percentage})$$",
    "$$4\\text{Al} + 3\\text{O}_2 \\xrightarrow{t^\\circ} 2\\text{Al}_2\\text{O}_3 \\quad (\\text{Biến đổi hóa học / Chemical Reaction})$$": "$$4\\text{Al} + 3\\text{O}_2 \\xrightarrow{t^\\circ} 2\\text{Al}_2\\text{O}_3 \\quad (\\text{Chemical Reaction})$$",
    "$$\\text{Fe} + \\text{S} \\xrightarrow{t^\\circ} \\text{FeS} \\quad (\\text{Biến đổi hóa học / Chemical Reaction})$$": "$$\\text{Fe} + \\text{S} \\xrightarrow{t^\\circ} \\text{FeS} \\quad (\\text{Chemical Reaction})$$",
    "$$\\text{NaCl (rắn)} + \\text{H}_2\\text{O (lỏng)} \\longrightarrow \\text{Nước muối} \\quad (\\text{Quá trình hòa tan vật lí / Physical})$$": "$$\\text{NaCl (s)} + \\text{H}_2\\text{O (l)} \\longrightarrow \\text{Saline Solution} \\quad (\\text{Physical Dissolution})$$",
    "$${\\text{Nghiêng ống nghiệm 45°}}$$": "$${\\text{Tilt the test tube at 45°}}$$",
    "$$CuSO₄ (aq) [Màu xanh lam]$$": "$$\\text{CuSO}_4\\text{ (aq) [Deep Blue Solution]}$$",
    "$$Số p = Số e = Z$$": "$$\\text{Number of protons } p = \\text{Number of electrons } e = Z$$",
    "$${\\text{Kí hiệu hóa học}}$$": "$${\\text{Chemical Symbols & Nomenclature}}$$",
    "$${\\text{Nguyên tử khối (amu)}}$$": "$${\\text{Atomic Mass (amu)}}$$",
    "$${\\text{Đơn chất vs Hợp chất}}$$": "$${\\text{Elements vs Chemical Compounds}}$$",
    "$${\\text{Hiện tượng vật lí}}$$": "$${\\text{Physical Phenomena & Phase Changes}}$$",
    "$$H₂O (rắn) \\rightleftharpoons H₂O (lỏng) \\rightleftharpoons H₂O (hơi)$$": "$$\\text{H}_2\\text{O (s)} \\rightleftharpoons \\text{H}_2\\text{O (l)} \\rightleftharpoons \\text{H}_2\\text{O (g)}$$",
    "$$Phân tử khối = Tổng NTK$$": "$$\\text{Molecular Mass} = \\sum \\text{Atomic Masses}$$",
    "$$\\text{Đơn chất}: A hoặc A_n$$": "$$\\text{Element}: A \\text{ or } A_n$$",
    "$$\\text{Hợp chất}: A_x B_y$$": "$$\\text{Compound}: A_x B_y$$",
    "$$\\text{Al₂O₃}: 2 Al liên kết với 3 O$$": "$$\\text{Al}_2\\text{O}_3: 2\\text{ Al atoms bonded to } 3\\text{ O atoms}$$",
    "$$\\text{{\\text{Quy ước}: H (I), O (II)}}$$": "$$\\text{Valence Convention: H (I), O (II)}$$",
    "$${\\text{Hóa học sinh chất mới}}$$": "$${\\text{Chemical change produces new substances}}$$",
    "$$C + O₂ → CO₂  (Hóa học)$$": "$$\\text{C} + \\text{O}_2 \\longrightarrow \\text{CO}_2 \\quad (\\text{Chemical})$$",
    "$${\\text{Chất phản ứng → Sản phẩm}}$$": "$${\\text{Reactants} \\longrightarrow \\text{Products}}$$",
    "$$BaSO₄ kết tủa trắng không tan trong axit$$": "$$\\text{BaSO}_4 \\downarrow \\text{ (White precipitate insoluble in acids)}$$",
    "$$m_trước = m_sau$$": "$$m_{\\text{reactants}} = m_{\\text{products}}$$",
    "$${\\text{Cân bằng số nguyên tử 2 vế}}$$": "$${\\text{Balance atoms on both sides of the equation}}$$",
    "$$Tỉ lệ mol = Tỉ lệ hệ số$$": "$$\\text{Mole Ratio} = \\text{Stoichiometric Coefficient Ratio}$$",
    "$$V = n × 24,79 (ở 25°C, 1 bar)$$": "$$V = n \\times 24.79 \\text{ L (at } 25^\\circ\\text{C, 1 bar)}$$",
    "$$1 mol khí = 24,79 Lít (đkc)$$": "$$1\\text{ mol gas} = 24.79\\text{ L (at standard ambient conditions)}$$",
    "$$n → PTHH → n_sp → m hoặc V$$": "$$n_{\\text{known}} \\xrightarrow{\\text{Equation}} n_{\\text{product}} \\longrightarrow m \\text{ or } V$$",
    "$$H% = (m_thực tế / m_lí thuyết) × 100%$$": "$$\\text{Yield } H\\% = \\left( \\frac{m_{\\text{actual}}}{m_{\\text{theoretical}}} \\right) \\times 100\\%$$",
    "$${\\text{Oxi duy trì sự cháy và hô hấp}}$$": "$${\\text{Oxygen supports combustion and respiration}}$$",
    "$$\\text{Phản ứng hóa hợp}: A + B → C$$": "$$\\text{Combination Reaction}: A + B \\longrightarrow C$$",
    "$$\\text{{\\text{Oxit bazơ}: Na₂O, CaO, CuO}}$$": "$$\\text{Basic Oxides}: \\text{Na}_2\\text{O, CaO, CuO}$$",
    "$$Tên = Tên nguyên tố + Oxit$$": "$$\\text{Name} = \\text{Element Name} + \\text{Oxide}$$",
    "$$\\text{{\\text{Phản ứng phân hủy}: 1 chất → Nhiều chất}}$$": "$$\\text{Decomposition Reaction}: 1 \\text{ reactant} \\longrightarrow \\text{Multiple products}$$",
    "$${\\text{78% N₂, 21% O₂, 1% khí khác}}$$": "$$78\\%\\text{ N}_2, 21\\%\\text{ O}_2, 1\\%\\text{ other gases (Air composition)}$$",
    "$${\\text{Hóa hợp vs Phân hủy}}$$": "$${\\text{Combination vs Decomposition Reactions}}$$",
    "$$2H₂ + O₂ → 2H₂O (Hóa hợp)$$": "$$2\\text{H}_2 + \\text{O}_2 \\longrightarrow 2\\text{H}_2\\text{O} \\quad (\\text{Combination})$$",
    "$$2H₂O → 2H₂ + O₂ (Phân hủy)$$": "$$2\\text{H}_2\\text{O} \\longrightarrow 2\\text{H}_2 + \\text{O}_2 \\quad (\\text{Decomposition})$$",
    "$${\\text{H₂ có tính khử}}$$": "$${\\text{Hydrogen acts as a reducing agent}}$$",
    "$$H₂ + CuO (đen) → Cu (đỏ) + H₂O$$": "$$\\text{H}_2 + \\text{CuO (black)} \\longrightarrow \\text{Cu (red)} + \\text{H}_2\\text{O}$$",
    "$${\\text{Khử chiếm oxi, Oxh nhường oxi}}$$": "$${\\text{Reducing agent gains oxygen, Oxidizing agent donates oxygen}}$$",
    "$$H₂ (Khử) + CuO (Oxh) → Cu + H₂O$$": "$$\\text{H}_2 \\text{ (Reducing Agent)} + \\text{CuO (Oxidizing Agent)} \\longrightarrow \\text{Cu} + \\text{H}_2\\text{O}$$",
    "$$\\text{{\\text{Phản ứng thế}: Đơn chất thay thế nguyên tử trong hợp chất}}$$": "$$\\text{Single Displacement}: \\text{Single element displaces an atom in a compound}$$",
    "$$\\text{{\\text{3 loại phản ứng}: Hóa hợp, Phân hủy, Thế}}$$": "$$\\text{Three Reaction Types: Combination, Decomposition, Single Displacement}$$",
    "$${\\text{Nước là dung môi phổ biến}}$$": "$${\\text{Water is the universal polar solvent}}$$",
    "$$\\text{{\\text{Bazơ}: NaOH, Cu(OH)₂}}$$": "$$\\text{Bases}: \\text{NaOH, Cu(OH)}_2$$",
    "$$\\text{{\\text{Muối}: NaCl, CuSO₄}}$$": "$$\\text{Salts}: \\text{NaCl, CuSO}_4$$",
    "$$Tên Muối = Tên kim loại + Gốc axit$$": "$$\\text{Salt Name} = \\text{Metal Cation Name} + \\text{Acid Radical Anion Name}$$",
    "$$Axit + Bazơ → Muối + H₂O$$": "$$\\text{Acid} + \\text{Base} \\longrightarrow \\text{Salt} + \\text{H}_2\\text{O} \\quad (\\text{Neutralization})$$",
    "$$Phenolphtalein chuyển sang màu hồng trong kiềm$$": "$$\\text{Phenolphthalein turns vivid magenta-pink in alkaline solutions}$$",
    "$$Dung dịch = Dung môi + Chất tan$$": "$$\\text{Solution} = \\text{Solvent} + \\text{Solute}$$",
    "$$Khuấy, đun nóng làm tăng độ tan$$": "$$\\text{Stirring, heating, and pulverizing accelerate dissolution}$$",
    "$$S = (m_{\\text{ct}} / m_nước) × 100$$": "$$S = \\left( \\frac{m_{\\text{solute}}}{m_{\\text{water}}} \\right) \\times 100\\text{ g}$$",
    "$$\\text{{\\text{Bước 1}: Tính toán lượng chất}}$$": "$$\\text{Step 1: Calculate stoichiometric quantities of solute and solvent}$$",
    "$$\\text{{\\text{Bước 2}: Cân đong}}$$": "$$\\text{Step 2: Weigh solute accurately on balance and measure solvent volume}$$",
    "$$\\text{{\\text{Bước 3}: Hòa tan định mức}}$$": "$$\\text{Step 3: Dissolve solute completely and adjust to final volume in flask}$$",
    "$$\\text{Pha loãng}: C₁V₁ = C₂V₂$$": "$$\\text{Dilution Formula}: C_1 V_1 = C_2 V_2$$",
    "$$\\text{Đường chéo}: (V₁/V₂) = |C₂ - C_tb| / |C₁ - C_tb|$$": "$$\\text{Diagonal Pearson Rule}: \\frac{V_1}{V_2} = \\frac{|C_2 - \\bar{C}|}{|C_1 - \\bar{C}|}$$",
    "$${\\text{Cân 5g NaCl hòa vào 45g nước}}$$": "$${\\text{Weigh 5.0g NaCl and dissolve in 45.0g distilled water to yield 10% solution}}$$",
    "$${\\text{Cân 8g CuSO4 định mức 100mL}}$$": "$${\\text{Weigh 8.0g CuSO}_4\\text{ and dilute with distilled water to 100 mL in a volumetric flask}}$$",
    "$$Dung dịch CuSO4 có màu xanh lam trong suốt.$$": "$$\\text{CuSO}_4\\text{ solution exhibits a characteristic transparent sky-blue color.}$$",

    # --- Grade 10 Theoretical Content & Translations ---
    "Hạt nhân gồm proton (p+), neutron (n0) và lớp vỏ electron (e-).": "The atomic nucleus comprises positively charged protons (p+) and neutral neutrons (n0), enveloped by a cloud of negatively charged electrons (e-).",
    "Khối lượng nguyên tử tập trung chủ yếu ở hạt nhân.": "The atomic mass is overwhelmingly concentrated in the nucleus, as electron mass is negligible (m_e ≈ 1/1836 m_p).",
    "Z = Số proton = Số electron": "Atomic number Z = Number of protons = Number of electrons",
    "Tại sao nguyên tử trung hòa về điện?": "Why is an atom electrically neutral as a whole?",
    "Vì số proton (+1) bằng số electron (-1).": "Because the total positive charge of protons (+1 each) exactly balances the total negative charge of electrons (-1 each).",
    "$$Z = Số proton = Số electron$$": "$$Z = \\text{Protons } (p) = \\text{Electrons } (e)$$",
    "Số hiệu nguyên tử Z, số khối A = Z + N. Đồng vị là các nguyên tử cùng Z khác A.": "Atomic number Z, Mass number A = Z + N. Isotopes are atoms of the same element possessing identical Z but differing neutron numbers N (different A).",
    "Kí hiệu nguyên tử: ᴬ_Z X.": "Nuclide notation: ^A_Z X (where A is mass number, Z is atomic number).",
    "¹H, ²H (Đơteri), ³H (Triti) là 3 đồng vị của Hydro": "Protium (^1H), Deuterium (^2H), and Tritium (^3H) are the three natural isotopes of hydrogen.",
    "Nguyên tử có 17p và 18n thì số khối A bằng mấy?": "For an atom containing 17 protons and 18 neutrons, what is its mass number A?",
    "A = 17 + 18 = 35 (Nguyên tử Clo-35).": "A = 17 + 18 = 35 (Chlorine-35 nuclide).",
    "$$¹H, ²H (Đơteri), ³H (Triti) là 3 đồng vị của Hydro$$": "$$^1\\text{H (Protium), } ^2\\text{H (Deuterium), } ^3\\text{H (Tritium) are the 3 hydrogen isotopes}$$",
    "Mô hình Rutherford-Bohr và orbital nguyên tử (AO). Cấu hình e theo mức năng lượng.": "Rutherford-Bohr model and quantum atomic orbitals (AO). Electron configuration fills energy levels via the Aufbau principle.",
    "Quy tắc Hund và nguyên lí Pauli xác định spin electron.": "Hund's rule of maximum multiplicity and Pauli exclusion principle govern electron spin distribution in degenerate orbitals.",
    "Phân lớp: s (2e), p (6e), d (10e), f (14e)": "Subshells: s (max 2e), p (max 6e), d (max 10e), f (max 14e)",
    "Thứ tự: 1s 2s 2p 3s 3p 4s 3d 4p...": "Aufbau energy sequence: 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s < 4d < 5p...",
    "Viết cấu hình e của Cl (Z = 17)?": "Write the complete electron configuration for Chlorine (Z = 17).",
    "1s² 2s² 2p⁶ 3s² 3p⁵ (Có 7 electron lớp ngoài cùng).": "1s² 2s² 2p⁶ 3s² 3p⁵ (contains 7 valence electrons in the n=3 outer shell).",
    "$$\\text{{\\text{Phân lớp}: s (2e), p (6e), d (10e), f (14e)}}$$": "$$\\text{Subshells}: s\\text{ (max 2e), } p\\text{ (max 6e), } d\\text{ (max 10e), } f\\text{ (max 14e)}$$",
    "$$\\text{{\\text{Thứ tự}: 1s 2s 2p 3s 3p 4s 3d 4p...}}$$": "$$\\text{Aufbau Energy Order}: 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s...$$",
    "Tổng kết thành phần nguyên tử, đồng vị, cấu hình electron và orbital AO.": "Comprehensive review of subatomic particles, isotopic abundance, electron configurations, and atomic orbital spatial geometries.",
    "Củng cố bài tập xác định vị trí nguyên tố theo cấu hình e.": "Mastery exercises: deducing periodic table location (period, group, block) from valence electron configurations.",
    "Ôn tập Z, A, Cấu hình e": "Review of Atomic Number Z, Mass Number A, and Electron Configurations",
    "Nguyên tố có cấu hình kết thúc ở 3d5 4s1 là gì?": "Which chemical element has an electron configuration ending in 3d⁵ 4s¹?",
    "Chromium (Cr, Z = 24) có cấu hình bán bão hòa bền.": "Chromium (Cr, Z = 24), exhibiting extra stability due to a half-filled 3d⁵ subshell.",
    "$${\\text{Ôn tập Z, A, Cấu hình e}}$$": "$${\\text{Review: Atomic Number } Z, \\text{ Mass Number } A, \\text{ Configurations}}$$",
    "Nguyên tắc sắp xếp theo Z tăng dần gồm Ô nguyên tố, Chu kì và Nhóm.": "Elements are arranged in order of increasing nuclear charge (atomic number Z), structured into Periods and Groups.",
    "Phân biệt nguyên tố s, p (nhóm A) và d, f (nhóm B).": "Distinguish main-group representative elements (s, p-blocks, Group A) from transition and inner-transition metals (d, f-blocks, Group B).",
    "Khối nguyên tố s, p, d, f": "Electronic blocks: s, p, d, and f elements",
    "STT ô = Z": "Element Cell Position = Atomic Number Z",
    "STT chu kì = Số lớp electron": "Period Number = Total Number of Occupied Electron Shells (n)",
    "STT nhóm A = Số e ngoài cùng": "Main Group Number (A) = Number of Outer Valence Electrons",
    "Nguyên tố có cấu hình [Ne] 3s2 3p4 ở chu kì mấy, nhóm mấy?": "In which period and group is the element with electron configuration [Ne] 3s² 3p⁴ located?",
    "Chu kì 3, nhóm VIA.": "Period 3 (3 occupied shells), Group VIA / Group 16 (6 valence electrons, p-block).",
    "$$STT ô = Z$$": "$$\\text{Cell Number} = Z$$",
    "$$STT chu kì = Số lớp electron$$": "$$\\text{Period Number} = \\text{Number of Electron Shells}$$",
    "$$STT nhóm A = Số e ngoài cùng$$": "$$\\text{Group A Number} = \\text{Number of Valence Electrons}$$",
    "$$Khối nguyên tố s, p, d, f$$": "$$\\text{Block Classification}: s, p, d, f$$",
    "Quy luật biến đổi bán kính, độ âm điện, tính kim loại và phi kim.": "Periodic trends in atomic radius, Pauling electronegativity, ionization energy, and metallic versus non-metallic character.",
    "Bán kính nguyên tử giảm do điện tích hạt nhân tăng.": "Across a period, atomic radius decreases because increasing nuclear charge Z_eff pulls valence shells tighter.",
    "F có độ âm điện lớn nhất (3,98); Cs có tính kim loại mạnh nhất": "Fluorine (F) exhibits the highest electronegativity (3.98); Cesium (Cs) is the most electropositive metallic element.",
    "Trong chu kì: R giảm, Độ âm điện tăng, Phi kim tăng, Kim loại giảm": "Across a period (left to right): Atomic radius R decreases, Electronegativity increases, Non-metallic character increases, Metallic character decreases.",
    "Trong nhóm A: R tăng, Độ âm điện giảm, Kim loại tăng, Phi kim giảm": "Down a main group A (top to bottom): Atomic radius R increases, Electronegativity decreases, Metallic character increases, Non-metallic character decreases.",
    "Trong nhóm IA, kim loại nào có tính khử mạnh nhất?": "Within Group IA (alkali metals), which element has the strongest reducing ability?",
    "Cesium (Cs) vì bán kính lớn nhất và năng lượng ion hóa thấp nhất.": "Cesium (Cs), possessing the largest atomic radius and lowest first ionization energy.",
    "$$\\text{{\\text{Trong chu kì}: R giảm, Độ âm điện tăng, Phi kim tăng, Kim loại giảm}}$$": "$$\\text{Across a Period}: R \\downarrow, \\chi \\uparrow, \\text{Non-metallic} \\uparrow, \\text{Metallic} \\downarrow$$",
    "$$\\text{{\\text{Trong nhóm A}: R tăng, Độ âm điện giảm, Kim loại tăng, Phi kim giảm}}$$": "$$\\text{Down a Group A}: R \\uparrow, \\chi \\downarrow, \\text{Metallic} \\uparrow, \\text{Non-metallic} \\downarrow$$",
    "$$F có độ âm điện lớn nhất (3,98); Cs có tính kim loại mạnh nhất$$": "$$\\text{F has highest electronegativity (3.98); Cs has strongest metallic character}$$",
    "Biến đổi hóa trị cao nhất với oxi và hiđroxit. Tính axit-bazơ của oxit và hiđroxit.": "Periodic variations in highest oxide valences, hydride formulas, and acid-base character of oxides and hydroxides.",
    "Hiđroxit cao nhất của Cl là HClO4 (axit cực mạnh).": "The highest oxoacid of Chlorine is Perchloric acid (HClO4), an exceptionally strong mineral acid.",
    "Na₂O (Bazơ mạnh) → Al₂O₃ (Lưỡng tính) → SO₃ → Cl₂O₇ (Axit cực mạnh)": "Na2O (Strongly Basic) → Al2O3 (Amphoteric) → SO3 (Acidic) → Cl2O7 (Extremely Acidic anhydride)",
    "Tính bazơ của oxit/hiđroxit giảm dần, tính axit tăng dần": "Across a period: Basic character of oxides/hydroxides decreases while acidic character steadily increases.",
    "Axit nào mạnh nhất trong dãy: H3PO4, H2SO4, HClO4?": "Which is the strongest acid among: H3PO4, H2SO4, and HClO4?",
    "HClO4 là axit mạnh nhất.": "HClO4 (Perchloric acid) is the strongest acid in the series (Cl has highest oxidation state +7 and highest electronegativity).",
    "$${\\text{Tính bazơ của oxit/hiđroxit giảm dần, tính axit tăng dần}}$$": "$${\\text{Basic character decreases} \\longrightarrow \\text{Acidic character increases across period}}$$",
    "$$Na₂O (Bazơ mạnh) → Al₂O₃ (Lưỡng tính) → SO₃ → Cl₂O₇ (Axit cực mạnh)$$": "$$\\text{Na}_2\\text{O (Basic)} \\rightarrow \\text{Al}_2\\text{O}_3\\text{ (Amphoteric)} \\rightarrow \\text{SO}_3\\text{ (Acidic)} \\rightarrow \\text{Cl}_2\\text{O}_7\\text{ (Strongly Acidic)}$$",
    "Tính chất của các đơn chất và hợp chất biến đổi tuần hoàn theo Z.": "The physical and chemical properties of elements and their compounds recur periodically with increasing nuclear charge Z.",
    "Định luật tuần hoàn là nền tảng hóa học.": "Mendeleev's Periodic Law serves as the bedrock foundation for predicting chemical reactivity and discovering novel materials.",
    "Từ vị trí suy ra oxit và hiđroxit cao nhất.": "From an element's periodic coordinates, predict highest oxidation states, oxide formulas, and chemical bonding modes.",
    "Vị trí ↔ Cấu tạo nguyên tử ↔ Tính chất hóa học": "Periodic Position ↔ Atomic Structure & Configuration ↔ Chemical Properties & Reactivity",
    "Biết S ở ô 16, chu kì 3, nhóm VIA. Viết oxit cao nhất?": "Given Sulfur (S, cell 16, Period 3, Group VIA), write its highest oxide formula.",
    "SO3 (tương ứng axit sunfuric H2SO4).": "SO3 (Sulfur trioxide, corresponding to sulfuric acid H2SO4).",
    "$${\\text{Vị trí ↔ Cấu tạo nguyên tử ↔ Tính chất hóa học}}$$": "$${\\text{Position in Periodic Table} \\longleftrightarrow \\text{Electronic Structure} \\longleftrightarrow \\text{Chemical Reactivity}}$$",
    "$$Từ vị trí suy ra oxit và hiđroxit cao nhất.$$": "$${\\text{Deduce highest oxide and hydroxide formulas from periodic coordinates}}$$",
    "Hệ thống hóa cấu tạo BTH và các quy luật biến đổi tuần hoàn.": "Synthesis of periodic table architecture, electron filling rules, and quantitative periodic trend calculations.",
    "Thành thạo bài toán 2 nguyên tố ở 2 chu kì liên tiếp.": "Solve multi-step stoichiometry and identification problems involving adjacent period and group elements.",
    "F > Cl > Br > I (Tính phi kim giảm dần)": "F > Cl > Br > I (Non-metallic oxidizing power decreases down group)",
    "So sánh tính kim loại, phi kim, bán kính và độ âm điện": "Comparative analysis of metallic luster, non-metallic character, covalent radii, and electronegativity scales.",
    "So sánh bán kính của Na (Z=11) và Mg (Z=12)?": "Compare the atomic radius of Sodium (Na, Z=11) with Magnesium (Mg, Z=12).",
    "R_Na > R_Mg (trong cùng chu kì bán kính giảm dần).": "R_Na > R_Mg (in the same period, effective nuclear charge increases, contracting the valence shell).",
    "$${\\text{So sánh tính kim loại, phi kim, bán kính và độ âm điện}}$$": "$${\\text{Comparative Matrix: Metallic, Non-metallic, Radii, and Electronegativity}}$$",
    "$$F > Cl > Br > I (Tính phi kim giảm dần)$$": "$$\\text{F} > \\text{Cl} > \\text{Br} > \\text{I} \\quad (\\text{Decreasing Non-metallic Character})$$",
    "Nguyên tử có xu hướng nhường, nhận hoặc góp chung e để đạt 8 electron bền vững.": "Atoms tend to lose, gain, or share valence electrons to achieve a stable octet (8 valence electrons) resembling noble gas configurations.",
    "Động lực cốt lõi hình thành liên kết hóa học.": "Achieving thermodynamic stability and minimal potential energy drives chemical bond formation.",
    "Quy tắc Octet: 8 electron lớp ngoài cùng (hoặc 2e của He)": "Octet Rule: 8 outer valence electrons (or a duet of 2 electrons for Helium).",
    "Nguyên tử O (Z=8) có xu hướng nhận mấy electron?": "How many electrons does an Oxygen atom (Z=8) tend to gain during chemical bonding?",
    "Nhận 2 electron để đạt cấu hình bát tử 8e giống Ne.": "It gains 2 electrons to form the oxide anion (O²⁻) with a stable Neon octet [Ne] 2s² 2p⁶.",
    "$$\\text{{\\text{Quy tắc Octet}: 8 electron lớp ngoài cùng (hoặc 2e của He)}}$$": "$$\\text{Octet Rule: Stable valence octet (8e) or noble Helium duet (2e)}$$",
    "Hình thành do lực hút tĩnh điện giữa các ion mang điện tích trái dấu (Cation và Anion).": "Ionic bonds form via electrostatic attraction between oppositely charged ions (cations and anions) in a rigid crystal lattice.",
    "Dẫn điện khi nóng chảy hoặc tan trong nước.": "Ionic compounds conduct electricity when molten or dissolved in water due to freely mobile hydrated ions.",
    "Na⁺ + Cl⁻ → NaCl (Mạng tinh thể lập phương)": "Na⁺ + Cl⁻ → NaCl (Face-centered cubic crystal lattice)",
    "Hiệu độ âm điện Δχ ≥ 1,7 → Liên kết Ion": "Electronegativity difference Δχ ≥ 1.7 → Predominantly Ionic Bond",
    "Mạng tinh thể ion bền vững, nhiệt độ nóng chảy cao": "High lattice energy imparts high melting points, brittleness, and non-volatility to ionic solids.",
    "Tại sao NaCl có nhiệt độ nóng chảy rất cao (801°C)?": "Why does table salt (NaCl) have a remarkably high melting point (801°C)?",
    "Vì lực hút tĩnh điện giữa ion Na+ và Cl- trong mạng tinh thể rất mạnh.": "Because the strong multidirectional electrostatic attraction among Na⁺ and Cl⁻ ions in the crystal lattice requires massive thermal energy to overcome.",
    "$${\\text{Hiệu độ âm điện Δχ ≥ 1,7 → Liên kết Ion}}$$": "$$\\Delta\\chi \\ge 1.7 \\longrightarrow \\text{Ionic Bond}$$",
    "$${\\text{Mạng tinh thể ion bền vững, nhiệt độ nóng chảy cao}}$$": "$${\\text{Stable ionic lattice energy results in high melting & boiling points}}$$",
    "$$Na⁺ + Cl⁻ → NaCl (Mạng tinh thể lập phương)$$": "$$\\text{Na}^+ + \\text{Cl}^- \\longrightarrow \\text{NaCl (Face-Centered Cubic Lattice)}$$",
    "Hình thành giữa các nguyên tử bằng một hay nhiều đôi electron dùng chung.": "Covalent bonds form when atoms achieve stability by sharing one or more pairs of valence electrons.",
    "Đôi electron dùng chung bị lệch về phía nguyên tử âm điện hơn.": "In polar covalent bonds, shared electron density is displaced toward the more electronegative atom, generating dipole moments.",
    "H-H (Liên kết đơn σ)": "H-H (Single covalent sigma σ-bond)",
    "O=O (Liên kết đôi)": "O=O (Double bond: 1 sigma σ-bond and 1 pi π-bond)",
    "N≡N (Liên kết ba rất bền)": "N≡N (Triple bond: 1 sigma σ-bond and 2 pi π-bonds, exceptionally inert)",
    "0 ≤ Δχ < 0,4 : CHT Không phân cực": "0 ≤ Δχ < 0.4 : Nonpolar Covalent Bond",
    "0,4 ≤ Δχ < 1,7 : CHT Có phân cực": "0.4 ≤ Δχ < 1.7 : Polar Covalent Bond",
    "Liên kết trong phân tử N2 (N≡N) là liên kết gì?": "What type of chemical bond exists in the diatomic nitrogen molecule (N≡N)?",
    "Liên kết cộng hóa trị không phân cực (liên kết ba rất bền).": "Nonpolar covalent triple bond (composed of one strong σ bond and two π bonds with bond energy of 945 kJ/mol).",
    "$$\\text{0 ≤ Δχ < 0,4}: CHT Không phân cực$$": "$$0 \\le \\Delta\\chi < 0.4 \\longrightarrow \\text{Nonpolar Covalent Bond}$$",
    "$$\\text{0,4 ≤ Δχ < 1,7}: CHT Có phân cực$$": "$$0.4 \\le \\Delta\\chi < 1.7 \\longrightarrow \\text{Polar Covalent Bond}$$",
    "$$H-H (Liên kết đơn σ)$$": "$$\\text{H}-\\text{H} \\quad (\\text{Single } \\sigma\\text{-bond})$$",
    "$$O=O (Liên kết đôi)$$": "$$\\text{O}=\\text{O} \\quad (\\text{Double bond: } 1\\sigma + 1\\pi)$$",
    "$$N≡N (Liên kết ba rất bền)$$": "$$\\text{N}\\equiv\\text{N} \\quad (\\text{Triple bond: } 1\\sigma + 2\\pi, \\text{ अत्यंत inert})$$",
    "Liên kết hydrogen hình thành giữa H liên kết F, O, N với nguyên tử âm điện khác.": "Hydrogen bonds form intermolecularly between a hydrogen atom covalently bonded to strongly electronegative F, O, or N and a lone pair on an adjacent electronegative atom.",
    "Nước có nhiệt độ sôi cao bất thường (100°C) nhờ liên kết hydrogen.": "Water possesses an anomalously high boiling point (100°C) and surface tension due to its extensive 3D hydrogen-bonding network.",
    "...H-O-H ... O(H)-H... (Mạng liên kết hydrogen trong nước)": "...H-O-H ··· O(H)-H... (Extensive intermolecular hydrogen-bonded network in liquid water)",
    "Liên kết Hydrogen làm tăng nhiệt độ sôi và độ tan": "Intermolecular hydrogen bonding substantially elevates boiling points, heats of vaporization, and aqueous solubility.",
    "Tương tác Van der Waals tăng theo phân tử khối": "London dispersion / Van der Waals forces intensify with increasing molecular size, electron count, and polarizability.",
    "Tại sao ethanol C2H5OH có nhiệt độ sôi cao hơn etan C2H6?": "Why does ethanol (C2H5OH, b.p. 78.3°C) boil at a vastly higher temperature than ethane (C2H6, b.p. -88.6°C)?",
    "Do ethanol tạo được liên kết hydrogen liên phân tử.": "Because ethanol molecules form robust intermolecular hydrogen bonds, whereas nonpolar ethane exhibits only weak London dispersion forces.",
    "$${\\text{Liên kết Hydrogen làm tăng nhiệt độ sôi và độ tan}}$$": "$${\\text{Hydrogen bonding enhances boiling points and aqueous solubility}}$$",
    "$${\\text{Tương tác Van der Waals tăng theo phân tử khối}}$$": "$${\\text{Van der Waals dispersion forces scale with molecular mass and polarizability}}$$",
    "$$...H-O-H ... O(H)-H... (Mạng liên kết hydrogen trong nước)$$": "$$\\cdots\\text{H}-\\text{O}-\\text{H} \\cdots \\text{O}(\\text{H})-\\text{H}\\cdots \\quad (\\text{Hydrogen-bonded water lattice})$$",
    "So sánh liên kết ion, liên kết cộng hóa trị, liên kết hydrogen và tinh thể.": "Comparative matrix: ionic bonding, polar/nonpolar covalent bonds, coordinate bonds, hydrogen bonds, and metallic crystal lattices.",
    "Củng cố vẽ công thức Lewis.": "Practice drawing valid Lewis dot structures, resonance forms, and VSEPR geometric molecular configurations.",
    "NaCl (Ion) vs HCl (CHT phân cực) vs Cl₂ (CHT không cực)": "NaCl (Ionic) vs HCl (Polar Covalent) vs Cl2 (Nonpolar Covalent)",
    "So sánh bản chất liên kết theo hiệu độ âm điện Δχ": "Bond character prediction based on Pauling electronegativity differences (Δχ spectrum).",
    "Xác định loại liên kết trong H2O (O=3,44; H=2,20)?": "Determine the bond classification in water H2O given electronegativities O = 3.44 and H = 2.20.",
    "Δχ = 1,24 ⇒ Liên kết cộng hóa trị có phân cực.": "Δχ = 3.44 - 2.20 = 1.24 (0.4 ≤ Δχ < 1.7) ⇒ Polar covalent bond (O-H dipoles).",
    "$${\\text{So sánh bản chất liên kết theo hiệu độ âm điện Δχ}}$$": "$${\\text{Bond Classification via Electronegativity Difference } \\Delta\\chi}$$",
    "$$NaCl (Ion) vs HCl (CHT phân cực) vs Cl₂ (CHT không cực)$$": "$$\\text{NaCl (Ionic)} \\longleftrightarrow \\text{HCl (Polar Covalent)} \\longleftrightarrow \\text{Cl}_2\\text{ (Nonpolar Covalent)}$$",
    "Phản ứng có sự chuyển dịch electron làm thay đổi số oxi hóa.": "Redox reactions involve electron transfer, resulting in changes in elemental oxidation states.",
    "Thành thạo phương pháp thăng bằng electron 4 bước.": "Master the 4-step ion-electron balancing method for complex oxidation-reduction equations.",
    "Chất khử: nhường e (tăng số oxh)": "Reducing agent: electron donor (oxidation state increases)",
    "Chất oxi hóa: nhận e (giảm số oxh)": "Oxidizing agent: electron acceptor (oxidation state decreases)",
    "Σ e_nhường = Σ e_nhận": "Total electrons lost (oxidation) = Total electrons gained (reduction)",
    "Trong phản ứng Zn + 2HCl → ZnCl2 + H2, chất nào là chất khử?": "In the reaction Zn + 2HCl → ZnCl2 + H2, which reactant acts as the reducing agent?",
    "Zn là chất khử vì số oxi hóa tăng từ 0 lên +2.": "Zinc (Zn) is the reducing agent because its oxidation state increases from 0 to +2 (Zn → Zn²⁺ + 2e⁻).",
    "$$\\text{{\\text{Chất khử}: nhường e (tăng số oxh)}}$$": "$$\\text{Reducing Agent: Donates } e^- \\text{ (Oxidation state increases)}$$",
    "$$\\text{{\\text{Chất oxi hóa}: nhận e (giảm số oxh)}}$$": "$$\\text{Oxidizing Agent: Accepts } e^- \\text{ (Oxidation state decreases)}$$",
    "$$Σ e_nhường = Σ e_nhận$$": "$$\\sum e^-_{\\text{lost}} = \\sum e^-_{\\text{gained}}$$",
    "Rèn luyện cân bằng các phản ứng oxi hóa - khử phức tạp.": "Advanced drills: balancing redox reactions in acidic, basic, and neutral media with spectator ions.",
    "Nắm vững vai trò chất oxi hóa, chất khử và môi trường.": "Identify dual roles of reagents acting simultaneously as oxidizing agents and acidic reaction media.",
    "3Cu + 8HNO₃ (loãng) → 3Cu(NO₃)₂ + 2NO ↑ + 4H₂O": "3Cu + 8HNO3 (dilute) → 3Cu(NO3)2 + 2NO ↑ + 4H2O",
    "Thăng bằng electron: Tìm hệ số chất khử và chất oxi hóa": "Ion-electron balancing: Determine stoichiometric coefficients for redox couples.",
    "Hệ số tối giản của HNO3 trong Cu + HNO3 loãng → Cu(NO3)2 + NO + H2O?": "What is the stoichiometric coefficient of HNO3 in the balanced reaction: 3Cu + 8HNO3 → 3Cu(NO3)2 + 2NO + 4H2O?",
    "Hệ số là 8 (3Cu + 8HNO3 → 3Cu(NO3)2 + 2NO + 4H2O).": "The coefficient is 8 (2 moles reduced to NO gas and 6 moles forming nitrate salt Cu(NO3)2).",
    "$$\\text{{\\text{Thăng bằng electron}: Tìm hệ số chất khử và chất oxi hóa}}$$": "$${\\text{Electron Balancing: Derive coefficients for oxidant & reductant couples}}$$",
    "$$3Cu + 8HNO₃ (loãng) → 3Cu(NO₃)₂ + 2NO \\uparrow + 4H₂O$$": "$$3\\text{Cu} + 8\\text{HNO}_3\\text{ (dilute)} \\longrightarrow 3\\text{Cu}(\\text{NO}_3)_2 + 2\\text{NO}\\uparrow + 4\\text{H}_2\\text{O}$$",
    "Phản ứng tỏa nhiệt (ΔrH°298 < 0) giải phóng nhiệt; phản ứng thu nhiệt (ΔrH°298 > 0) hấp thu nhiệt.": "Exothermic reactions (Δr H°298 < 0) release thermal energy into surroundings; endothermic reactions (Δr H°298 > 0) absorb heat.",
    "Nhiệt tạo thành chuẩn Δ_f H°298 của đơn chất bền nhất bằng 0.": "The standard molar enthalpy of formation (Δf H°298) of elements in their most stable allotropic state is defined as exactly 0 kJ/mol.",
    "CH₄ + 2O₂ → CO₂ + 2H₂O  Δ_r H°₂₉₈ = -890,3 kJ (Tỏa nhiệt)": "CH4 + 2O2 → CO2 + 2H2O  Δr H°298 = -890.3 kJ (Exothermic combustion)",
    "CaCO₃ → CaO + CO₂  Δ_r H°₂₉₈ = +178,5 kJ (Thu nhiệt)": "CaCO3 → CaO + CO2  Δr H°298 = +178.5 kJ (Endothermic thermal decomposition)",
    "Δ_r H°₂₉₈ = Σ Δ_f H°₂₉₈ (Sản phẩm) - Σ Δ_f H°₂₉₈ (Chất đầu)": "Δr H°298 = Σ Δf H°298 (Products) - Σ Δf H°298 (Reactants)",
    "Δ_r H°₂₉₈ = Σ E_b (Chất đầu) - Σ E_b (Sản phẩm)": "Δr H°298 = Σ Eb (Reactants) - Σ Eb (Products)",
    "Phản ứng đốt cháy than có ΔrH°298 mang dấu dương hay âm?": "Does the combustion of coal (carbon) carry a positive or negative sign for Δr H°298?",
    "Mang dấu ÂM (ΔrH°298 < 0) vì là phản ứng tỏa nhiệt.": "It carries a NEGATIVE sign (Δr H°298 < 0) because combustion is strongly exothermic and releases heat.",
    "$$Δ_r H°₂₉₈ = Σ Δ_f H°₂₉₈ (Sản phẩm) - Σ Δ_f H°₂₉₈ (Chất đầu)$$": "$$\\Delta_r H^\\circ_{298} = \\sum \\Delta_f H^\\circ_{298}(\\text{Products}) - \\sum \\Delta_f H^\\circ_{298}(\\text{Reactants})$$",
    "$$Δ_r H°₂₉₈ = Σ E_b (Chất đầu) - Σ E_b (Sản phẩm)$$": "$$\\Delta_r H^\\circ_{298} = \\sum E_b(\\text{Reactants}) - \\sum E_b(\\text{Products})$$",
    "$$CH₄ + 2O₂ → CO₂ + 2H₂O  Δ_r H°₂₉₈ = -890,3 kJ (Tỏa nhiệt)$$": "$$\\text{CH}_4 + 2\\text{O}_2 \\longrightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O} \\quad \\Delta_r H^\\circ_{298} = -890.3\\text{ kJ (Exothermic)}$$",
    "$$CaCO₃ → CaO + CO₂  Δ_r H°₂₉₈ = +178,5 kJ (Thu nhiệt)$$": "$$\\text{CaCO}_3 \\xrightarrow{t^\\circ} \\text{CaO} + \\text{CO}_2 \\quad \\Delta_r H^\\circ_{298} = +178.5\\text{ kJ (Endothermic)}$$",
    "Tính toán biến thiên enthalpy theo nhiệt tạo thành chuẩn và năng lượng liên kết.": "Quantitative enthalpy calculations utilizing standard enthalpies of formation (Hess's Law) and covalent bond dissociation energies.",
    "Ý nghĩa dự đoán phản ứng tự diễn biến.": "Thermodynamic criterion: predicting reaction feasibility and spontaneous direction using reaction enthalpies.",
    "Δ_r H° = Σ E_b(chất đầu) - Σ E_b(sản phẩm)": "Δr H° = Σ Eb(Reactants) - Σ Eb(Products)",
    "Công thức tính ΔrH°298 theo Eb và ΔfH°298": "Formulas for calculating reaction enthalpy Δr H°298 using Eb and Δf H°298",
    "Năng lượng liên kết H-H là 436, Cl-Cl là 243, H-Cl là 432 kJ/mol. Tính ΔrH° của H2 + Cl2 → 2HCl?": "Given bond energies H-H = 436, Cl-Cl = 243, H-Cl = 432 kJ/mol, calculate Δr H° for H2 + Cl2 → 2HCl.",
    "Δ_r H° = (436 + 243) - 2×432 = -185 kJ (Tỏa nhiệt).": "Δr H° = (436 + 243) - 2×432 = -185 kJ (Exothermic synthesis).",
    "$${\\text{Công thức tính ΔrH°298 theo Eb và ΔfH°298}}$$": "$${\\text{Formulas for } \\Delta_r H^\\circ_{298} \\text{ via Bond Dissociation & Formation Enthalpies}}$$",
    "$$Δ_r H° = Σ E_b(chất đầu) - Σ E_b(sản phẩm)$$": "$$\\Delta_r H^\\circ = \\sum E_b(\\text{Reactants}) - \\sum E_b(\\text{Products})$$",
    "Tốc độ phản ứng là độ biến thiên nồng độ trong một đơn vị thời gian. Các yếu tố ảnh hưởng.": "Reaction rate is defined as the change in reactant or product concentration per unit time. Key kinetic factors include concentration, temperature, pressure, surface area, and catalysts.",
    "Chất xúc tác làm giảm năng lượng hoạt hóa Ea.": "Catalysts accelerate reactions by providing an alternative pathway with significantly lower activation energy Ea without being consumed.",
    "Nồng độ, nhiệt độ, áp suất, diện tích tiếp xúc, chất xúc tác": "Concentration, Temperature, Pressure, Surface Area, Catalysts",
    "Định luật tác dụng khối lượng: v = k × [A]^a × [B]^b": "Rate Law (Law of Mass Action): v = k · [A]^a · [B]^b",
    "Hệ số Van't Hoff: v_T2 = v_T1 × γ^((T2 - T1) / 10)": "Van 't Hoff Temperature Coefficient: v_{T2} = v_{T1} · γ^{(T2 - T1) / 10}",
    "Tại sao than nghiền nhỏ lại cháy nhanh hơn than tảng?": "Why does pulverized coal burn far more vigorously and rapidly than large lumps of coal?",
    "Do tăng diện tích bề mặt tiếp xúc với oxi không khí.": "Because pulverization vastly increases the contact surface area available for collisions with atmospheric oxygen molecules.",
    "$$\\text{Định luật tác dụng khối lượng}: v = k × [A]^a × [B]^b$$": "$$\\text{Rate Law}: v = k [A]^a [B]^b$$",
    "$$\\text{Hệ số Van't Hoff}: v_T2 = v_T1 × γ^((T2 - T1) / 10)$$": "$$\\text{Van 't Hoff Rule}: v_{T_2} = v_{T_1} \\cdot \\gamma^{\\frac{T_2 - T_1}{10}}$$",
    "$$Nồng độ, nhiệt độ, áp suất, diện tích tiếp xúc, chất xúc tác$$": "$$\\text{Factors: Concentration, Temperature, Pressure, Surface Area, Catalyst}$$",
    "Hệ thống hóa tốc độ trung bình và bài toán hệ số nhiệt độ Van't Hoff.": "Systematic mastery of average reaction rates, rate constants, and temperature coefficient Van 't Hoff calculations.",
    "Vận dụng điều khiển tốc độ phản ứng trong thực tế.": "Practical chemical engineering: controlling reaction rates in food preservation, industrial synthesis, and combustion.",
    "k: Hằng số tốc độ phản ứng": "k: Specific reaction rate constant",
    "Nếu γ = 2, khi tăng nhiệt độ từ 20°C lên 50°C thì tốc độ tăng bao nhiêu lần?": "If temperature coefficient γ = 2, by how many times does the reaction rate increase when temperature rises from 20°C to 50°C?",
    "Tăng 2^3 = 8 lần.": "The rate increases by 2^{(50-20)/10} = 2³ = 8 times.",
    "$$\\text{k}: Hằng số tốc độ phản ứng$$": "$$k: \\text{Reaction Rate Constant}$$",
    "Cấu hình ns2 np5. Tính oxi hóa giảm dần F2 > Cl2 > Br2 > I2. Halogen trước đẩy halogen sau.": "Group VIIA Halogens (ns² np⁵ valence shell). Strong oxidizing power decreasing down group: F2 > Cl2 > Br2 > I2. Stronger halogens displace weaker halogens from halides.",
    "Nhận biết Iot bằng hồ tinh bột.": "Qualitative test: Elemental iodine (I2) imparts an intense deep-blue complex with starch solution.",
    "Br₂ + 2NaI → 2NaBr + I₂ (I2 làm xanh hồ tinh bột)": "Br2 + 2NaI → 2NaBr + I2 (Iodine turns starch solution deep blue)",
    "F₂ oxi hóa nước: 2F₂ + 2H₂O → 4HF + O₂ ↑": "Fluorine vigorously oxidizes water: 2F2 + 2H2O → 4HF + O2 ↑ (Burns in water vapor)",
    "Cl₂ + 2NaBr → 2NaCl + Br₂ (Dung dịch hóa nâu đỏ)": "Cl2 + 2NaBr → 2NaCl + Br2 (Solution turns reddish-brown due to released bromine)",
    "Dẫn khí Clo vào dung dịch NaBr có hiện tượng gì?": "What observation occurs when chlorine gas is bubbled into a sodium bromide (NaBr) solution?",
    "Dung dịch chuyển sang màu nâu đỏ do giải phóng Br2.": "The colorless solution turns reddish-brown due to the liberation of free bromine (Cl2 + 2NaBr → 2NaCl + Br2).",
    "$$\\text{F₂ oxi hóa nước}: 2F₂ + 2H₂O → 4HF + O₂ ↑$$": "$$2\\text{F}_2 + 2\\text{H}_2\\text{O} \\longrightarrow 4\\text{HF} + \\text{O}_2\\uparrow \\quad (\\text{Fluorine oxidizes water})$$",
    "$$Cl₂ + 2NaBr → 2NaCl + Br₂ (Dung dịch hóa nâu đỏ)$$": "$$\\text{Cl}_2 + 2\\text{NaBr} \\longrightarrow 2\\text{NaCl} + \\text{Br}_2 \\quad (\\text{Reddish-brown solution})$$",
    "$$Br₂ + 2NaI → 2NaBr + I₂ (I2 làm xanh hồ tinh bột)$$": "$$\\text{Br}_2 + 2\\text{NaI} \\longrightarrow 2\\text{NaBr} + \\text{I}_2 \\quad (\\text{Turns starch deep blue})$$",
    "Axit halogenhiđric: Tính axit tăng dần HF < HCl < HBr < HI. Nhận biết halide bằng AgNO3.": "Hydrohalic acids: acid strength increases in the order HF (weak) < HCl < HBr < HI (strongest). Halide identification using silver nitrate AgNO3 precipitation.",
    "Muối iodized chứa KI chống bướu cổ.": "Iodized salt containing trace potassium iodide (KI) or potassium iodate (KIO3) prevents endemic goiter and thyroid disorders.",
    "HF ăn mòn thủy tinh: SiO₂ + 4HF → SiF₄ ↑ + 2H₂O": "Hydrofluoric acid etches silica glass: SiO2 + 4HF → SiF4 ↑ + 2H2O",
    "AgCl ↓ (Trắng), AgBr ↓ (Vàng nhạt), AgI ↓ (Vàng đậm)": "AgCl ↓ (Curdy white precipitate), AgBr ↓ (Pale cream-yellow precipitate), AgI ↓ (Deep yellow precipitate)",
    "Nhỏ AgNO3 vào dung dịch NaCl và NaBr, hiện tượng là gì?": "What distinct precipitates form upon adding AgNO3 solution to separate solutions of NaCl and NaBr?",
    "NaCl tạo kết tủa trắng AgCl; NaBr tạo kết tủa vàng nhạt AgBr.": "NaCl produces a curdy white precipitate of AgCl; NaBr produces a pale cream-yellow precipitate of AgBr.",
    "$$\\text{HF ăn mòn thủy tinh}: SiO₂ + 4HF → SiF₄ ↑ + 2H₂O$$": "$$\\text{SiO}_2 + 4\\text{HF} \\longrightarrow \\text{SiF}_4\\uparrow + 2\\text{H}_2\\text{O} \\quad (\\text{Glass etching})$$",
    "$${\\text{AgCl ↓ (Trắng), AgBr ↓ (Vàng nhạt), AgI ↓ (Vàng đậm)}}$$": "$${\\text{AgCl }\\downarrow\\text{ (White)}, \\text{ AgBr }\\downarrow\\text{ (Pale Yellow)}, \\text{ AgI }\\downarrow\\text{ (Deep Yellow)}}$$",
    "$$AgF tan trong nước$$": "$$\\text{AgF is completely soluble in water (unlike heavy silver halides)}$$",
    "Tổng kết tính chất nhóm halogen, so sánh tính oxi hóa và nhận biết F-, Cl-, Br-, I-.": "Comprehensive summary of Group VIIA halogens, redox trends, halide identification tests, and practical industrial applications.",
    "Thành thạo bài toán nhận biết halogen.": "Solve diagnostic qualitative analysis and quantitative stoichiometry problems involving halogen families.",
    "Cl₂ > Br₂ > I₂ (Tính oxi hóa)": "Cl2 > Br2 > I2 (Oxidizing power decreases down group)",
    "HF < HCl < HBr < HI (Tính axit)": "HF < HCl < HBr < HI (Acid strength increases down group due to decreasing H-X bond energy)",
    "Bảng tổng kết tính chất Halogen": "Comprehensive Halogen Group Summary & Characteristic Matrices",
    "Axit nào được dùng để khắc chữ lên thủy tinh?": "Which mineral acid is specifically utilized for etching artistic designs and markings on glass surfaces?",
    "Axit flohiđric (HF) vì phản ứng hòa tan SiO2.": "Hydrofluoric acid (HF), because it reacts with and dissolves silicon dioxide: SiO2 + 4HF → SiF4 ↑ + 2H2O.",
    "$${\\text{Bảng tổng kết tính chất Halogen}}$$": "$${\\text{Summary Matrix: Physical Trends, Bond Strengths & Halogen Reactivity}}$$",
    "$$Cl₂ > Br₂ > I₂ (Tính oxi hóa)$$": "$$\\text{Cl}_2 > \\text{Br}_2 > \\text{I}_2 \\quad (\\text{Oxidizing Strength})$$",
    "$$HF < HCl < HBr < HI (Tính axit)$$": "$$\\text{HF} < \\text{HCl} < \\text{HBr} < \\text{HI} \\quad (\\text{Acidic Strength in Aqueous Solution})$$"
}

# Apply to lessons
count = 0
for l in lessons:
    if l["grade"] in [8, 10]:
        # Summary
        if isinstance(l.get("summary"), dict):
            s_vn = l["summary"].get("VN", "")
            if s_vn in G8_G10_TRANSLATIONS:
                l["summary"]["EN"] = G8_G10_TRANSLATIONS[s_vn]
                count += 1
        
        # Sections
        for sec in l.get("sections", []):
            if isinstance(sec.get("heading"), dict):
                h_vn = sec["heading"].get("VN", "")
                if h_vn in G8_G10_TRANSLATIONS:
                    sec["heading"]["EN"] = G8_G10_TRANSLATIONS[h_vn]
                    count += 1
            for pt in sec.get("points", []):
                if isinstance(pt, dict):
                    p_vn = pt.get("VN", "")
                    if p_vn in G8_G10_TRANSLATIONS:
                        pt["EN"] = G8_G10_TRANSLATIONS[p_vn]
                        count += 1

        # Theory points
        for tp in l.get("theoryPoints", []):
            if isinstance(tp, dict):
                tp_vn = tp.get("VN", "")
                if tp_vn in G8_G10_TRANSLATIONS:
                    tp["EN"] = G8_G10_TRANSLATIONS[tp_vn]
                    count += 1

        # Sample question
        sq = l.get("sampleQuestion", {})
        if isinstance(sq, dict):
            if isinstance(sq.get("question"), dict):
                q_vn = sq["question"].get("VN", "")
                if q_vn in G8_G10_TRANSLATIONS:
                    sq["question"]["EN"] = G8_G10_TRANSLATIONS[q_vn]
                    count += 1
            if isinstance(sq.get("answer"), dict):
                a_vn = sq["answer"].get("VN", "")
                if a_vn in G8_G10_TRANSLATIONS:
                    sq["answer"]["EN"] = G8_G10_TRANSLATIONS[a_vn]
                    count += 1

        # Key formulas
        new_kf = []
        for kf in l.get("keyFormulas", []):
            if kf in G8_G10_TRANSLATIONS:
                new_kf.append(G8_G10_TRANSLATIONS[kf])
                count += 1
            else:
                new_kf.append(kf)
        l["keyFormulas"] = new_kf

        # Equations
        new_eq = []
        for eq in l.get("equations", []):
            if eq in G8_G10_TRANSLATIONS:
                new_eq.append(G8_G10_TRANSLATIONS[eq])
                count += 1
            else:
                new_eq.append(eq)
        l["equations"] = new_eq

with open("src/data/vietnamCurriculumData.json", "w", encoding="utf-8") as f:
    json.dump(lessons, f, ensure_ascii=False, indent=2)

print(f"Applied {count} translations to Grade 8 & Grade 10!")
