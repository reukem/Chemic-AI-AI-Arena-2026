# -*- coding: utf-8 -*-
import json

with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

G11_TRANSLATIONS = {
    "Phản ứng thuận nghịch đạt cân bằng khi v_t = v_n. Nguyên lí chuyển dịch Le Chatelier.": "Reversible reactions reach dynamic chemical equilibrium when forward rate equals reverse rate (v_f = v_r). Le Chatelier's principle dictates equilibrium shifts under external stresses.",
    "Chất xúc tác làm tăng tốc độ đạt cân bằng nhưng KHÔNG làm chuyển dịch cân bằng.": "A catalyst accelerates both forward and reverse reaction rates equally, shortening the time required to reach equilibrium WITHOUT altering equilibrium positions or the constant Kc.",
    "2NO₂ (g) [Nâu đỏ] ⇌ N₂O₄ (g) [Không màu]  Δ_r H°₂₉₈ = -58 kJ": "2NO2 (g) [Brown] ⇌ N2O4 (g) [Colorless]  Δr H°298 = -58 kJ (Exothermic dimerization)",
    "Tăng T: Chuyển dịch chiều THU NHIỆT (ΔH > 0)": "Increasing Temperature shifts equilibrium in the ENDOTHERMIC direction (ΔH > 0) to absorb excess thermal energy.",
    "Tăng P: Chuyển dịch chiều GIẢM SỐ MOL KHÍ": "Increasing Pressure shifts equilibrium toward the side with FEWER moles of gas particles to relieve pressure stress.",
    "Khi tăng nhiệt độ hệ N2 + 3H2 ⇌ 2NH3 (tỏa nhiệt), cân bằng chuyển dịch theo chiều nào?": "When temperature is elevated for the exothermic Haber-Bosch synthesis (N2 + 3H2 ⇌ 2NH3, ΔH < 0), in which direction does equilibrium shift?",
    "Chuyển dịch theo chiều NGHỊCH (chiều thu nhiệt).": "It shifts in the REVERSE direction (endothermic pathway) to oppose the temperature rise.",
    "$$\\text{Tăng T}: Chuyển dịch chiều THU NHIỆT (ΔH > 0)$$": "$$\\text{Temperature Increase} \\longrightarrow \\text{Shifts in Endothermic Direction } (\\Delta H > 0)$$",
    "$$\\text{{\\text{Tăng P}: Chuyển dịch chiều GIẢM SỐ MOL KHÍ}}$$": "$$\\text{Pressure Increase} \\longrightarrow \\text{Shifts toward Fewer Moles of Gas}$$",
    "$$2NO₂ (g) [Nâu đỏ] \\rightleftharpoons N₂O₄ (g) [Không màu]  Δ_r H°₂₉₈ = -58 kJ$$": "$$2\\text{NO}_2\\text{ (g) [Brown]} \\rightleftharpoons \\text{N}_2\\text{O}_4\\text{ (g) [Colorless]} \\quad \\Delta_r H^\\circ_{298} = -58\\text{ kJ}$$",
    "Sự điện li, thuyết Bronsted-Lowry (axit nhường H+, bazơ nhận H+), tích số ion nước Kw và thang pH.": "Electrolytic dissociation, Brønsted–Lowry acid-base theory (acids are proton H⁺ donors, bases are proton H⁺ acceptors), ion-product constant of water Kw, and logarithmic pH scale.",
    "Chỉ thị pH: Quỳ tím, phenolphtalein, chỉ thị vạn năng.": "Acid-base indicators: Litmus paper (red in acid, blue in base), phenolphthalein (magenta-pink in base), and universal indicator strips.",
    "HCl → H⁺ + Cl⁻ (Mạnh)": "HCl → H⁺ + Cl⁻ (Strong complete ionization)",
    "CH₃COOH ⇌ CH₃COO⁻ + H⁺ (Yếu)": "CH3COOH ⇌ CH3COO⁻ + H⁺ (Weak reversible ionization, Ka = 1.8 × 10⁻⁵)",
    "K_w = [H⁺] × [OH⁻] = 1,0 × 10⁻¹⁴ (ở 25°C)": "Kw = [H⁺] · [OH⁻] = 1.0 × 10⁻¹⁴ at 25°C (pH + pOH = 14)",
    "Một dung dịch có [H+] = 10^-3 M thì pH bằng mấy và môi trường gì?": "If an aqueous solution has [H⁺] = 1.0 × 10⁻³ M, what is its pH and chemical nature?",
    "pH = 3, môi trường AXIT.": "pH = -log[H⁺] = 3.0, corresponding to an ACIDIC medium (pH < 7).",
    "$$K_w = [H⁺] × [OH⁻] = 1,0 × 10⁻¹⁴ (ở 25°C)$$": "$$K_w = [\\text{H}^+][\\text{OH}^-] = 1.0 \\times 10^{-14} \\quad (\\text{at } 25^\\circ\\text{C})$$",
    "$$HCl → H⁺ + Cl⁻ (Mạnh)$$": "$$\\text{HCl} \\longrightarrow \\text{H}^+ + \\text{Cl}^- \\quad (\\text{Strong Electrolyte})$$",
    "$$CH₃COOH \\rightleftharpoons CH₃COO⁻ + H⁺ (Yếu)$$": "$$\\text{CH}_3\\text{COOH} \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}^+ \\quad (\\text{Weak Electrolyte})$$",
    "Tổng kết hằng số Kc, nguyên lí Le Chatelier, tính pH và chuẩn độ axit - bazơ.": "Comprehensive mastery of equilibrium constant Kc calculations, Le Chatelier shifts, buffer pH, and quantitative volumetric acid-base titrations.",
    "Thành thạo tính toán pH và điều khiển chuyển dịch cân bằng.": "Solve advanced equilibrium problems involving titration curves, equivalence points, and indicator selections.",
    "Chuẩn độ axit-bazơ: C_axit × V_axit = C_bazo × V_bazo": "Volumetric Equivalence at End-point: C_acid · V_acid = C_base · V_base",
    "Trộn 100mL dd HCl 0,1M với 100mL dd NaOH 0,1M thu được dung dịch pH bằng mấy?": "What is the resulting pH when 100 mL of 0.1 M HCl is completely neutralized with 100 mL of 0.1 M NaOH?",
    "pH = 7 (trung tính).": "pH = 7.0 (Exact stoichiometric neutralization yielding neutral NaCl saline solution).",
    "$$\\text{Chuẩn độ axit-bazơ}: C_axit × V_axit = C_bazo × V_bazo$$": "$$\\text{Acid-Base Equivalence}: C_{\\text{acid}} V_{\\text{acid}} = C_{\\text{base}} V_{\\text{base}}$$",
    "Nitơ có liên kết ba N≡N rất bền ở nhiệt độ thường (trơ hóa học). Nhiệt độ cao thể hiện tính khử và oxh.": "Diatomic nitrogen (N2) possesses a triple bond N≡N with high dissociation energy (945 kJ/mol), rendering it chemically inert at ambient temperatures. At elevated temperatures or electric discharge, it exhibits both reducing and oxidizing behavior.",
    "Khí N2 dùng làm khí trơ bảo quản thực phẩm.": "Gaseous nitrogen is extensively utilized as a protective inert atmosphere in food packaging, metallurgy, and semiconductor fabrication.",
    "N₂ + O₂ ⇌ 2NO  (3000°C hoặc tia lửa điện)": "N2 + O2 ⇌ 2NO (at 3000°C or under lightning electric arc discharge)",
    "Liên kết ba N≡N bền (Năng lượng 945 kJ/mol)": "Exceptional bond dissociation energy of the N≡N triple bond (945 kJ/mol)",
    "Tại sao khí Nitơ trơ về mặt hóa học ở nhiệt độ phòng?": "Why is nitrogen gas remarkably inert and unreactive at room temperature?",
    "Do liên kết ba N≡N cực kỳ bền vững.": "Because the nonpolar covalent triple bond N≡N requires massive energy (945 kJ/mol) to dissociate.",
    "$${\\text{Liên kết ba N≡N bền (Năng lượng 945 kJ/mol)}}$$": "$${\\text{High Bond Dissociation Energy: } E_b(\\text{N}\\equiv\\text{N}) = 945\\text{ kJ/mol}}$$",
    "$$N₂ + O₂ \\rightleftharpoons 2NO  (3000°C hoặc tia lửa điện)$$": "$$\\text{N}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{NO} \\quad (3000^\\circ\\text{C or Lightning Arc})$$",
    "Ammonia là bazơ Bronsted yếu và chất khử mạnh. Khói trắng NH4Cl và phức đồng xanh thẫm.": "Ammonia (NH3) acts as a weak Brønsted base and strong reducing agent. Produces dense white ammonium chloride (NH4Cl) smoke with HCl vapor and forms a deep royal blue tetraamminecopper(II) complex with Cu²⁺.",
    "Muối ammonium tác dụng kiềm giải phóng khí NH3.": "Ammonium salts react with strong alkalis upon warming to release pungent ammonia gas (NH4⁺ + OH⁻ → NH3 ↑ + H2O).",
    "Cu²⁺ + 4NH₃ → [Cu(NH₃)₄]²⁺ [Phức xanh lam thẫm]": "Cu²⁺ + 4NH3 → [Cu(NH3)4]²⁺ [Deep Royal-Blue Tetraamminecopper(II) Coordination Complex]",
    "NH₃ + HCl → NH₄Cl (Khói trắng mù mịt)": "NH3 (g) + HCl (g) → NH4Cl (s) (Dense billowing white ammonium chloride smoke)",
    "Hiện tượng khi đưa đầu đũa nhúng HCl đặc lại gần đũa nhúng NH3 đặc?": "What visual observation occurs when a glass rod dipped in concentrated HCl is brought near another rod dipped in concentrated aqueous ammonia?",
    "Xuất hiện khói trắng dày đặc muối NH4Cl.": "Dense billowing white fumes of solid ammonium chloride (NH4Cl) micro-crystals immediately form in the air.",
    "$$NH₃ + HCl → NH₄Cl (Khói trắng mù mịt)$$": "$$\\text{NH}_3\\text{ (g)} + \\text{HCl (g)} \\longrightarrow \\text{NH}_4\\text{Cl (s)} \\quad (\\text{Dense White Smoke})$$",
    "$$Cu²⁺ + 4NH₃ → [Cu(NH₃)₄]²⁺ [Phức xanh lam thẫm]$$": "$$\\text{Cu}^{2+} + 4\\text{NH}_3 \\longrightarrow [\\text{Cu}(\\text{NH}_3)_4]^{2+} \\quad (\\text{Deep Royal Blue Complex})$$",
    "Các oxit nitơ (NO, NO2) gây mưa axit. Axit nitric HNO3 có tính oxi hóa cực mạnh.": "Nitrogen oxides (NOx) are major atmospheric pollutants causing photochemical smog and acid rain. Nitric acid (HNO3) is a strong mineral acid and powerful oxidizing agent.",
    "Hiện tượng phú dưỡng do dư thừa nitrat và photphat.": "Eutrophication of water bodies is triggered by runoff containing excess agricultural nitrate and phosphate nutrients, causing algal blooms and hypoxia.",
    "Cu + 4HNO₃ (đặc) → Cu(NO₃)₂ + 2NO₂ ↑ [Nâu đỏ] + 2H₂O": "Cu + 4HNO3 (concentrated) → Cu(NO3)2 + 2NO2 ↑ [Pungent Brown Gas] + 2H2O",
    "3Cu + 8HNO₃ (loãng) → 3Cu(NO₃)₂ + 2NO ↑ + 4H₂O": "3Cu + 8HNO3 (dilute) → 3Cu(NO3)2 + 2NO ↑ [Colorless, oxidizes in air to brown NO2] + 4H2O",
    "HNO₃ oxi hóa hầu hết kim loại lên số oxh cao nhất": "Nitric acid oxidizes virtually all metals (except gold Au and platinum Pt) to their highest oxidation states.",
    "Khí NO2 sinh ra khi hòa tan Cu vào HNO3 đặc có màu gì?": "What is the characteristic color of the toxic gas evolved when copper reacts with concentrated nitric acid?",
    "Có màu NÂU ĐỎ đặc trưng.": "It is a characteristic pungent REDDISH-BROWN gas (Nitrogen dioxide, NO2).",
    "$${\\text{HNO₃ oxi hóa hầu hết kim loại lên số oxh cao nhất}}$$": "$${\\text{HNO}_3\\text{ oxidizes metals to their highest positive oxidation states}}$$",
    "$$Cu + 4HNO₃ (đặc) → Cu(NO₃)₂ + 2NO₂ \\uparrow [Nâu đỏ] + 2H₂O$$": "$$\\text{Cu} + 4\\text{HNO}_3\\text{ (conc)} \\longrightarrow \\text{Cu}(\\text{NO}_3)_2 + 2\\text{NO}_2\\uparrow\\text{ [Brown]} + 2\\text{H}_2\\text{O}$$",
    "$$3Cu + 8HNO₃ (loãng) → 3Cu(NO₃)₂ + 2NO \\uparrow + 4H₂O$$": "$$3\\text{Cu} + 8\\text{HNO}_3\\text{ (dilute)} \\longrightarrow 3\\text{Cu}(\\text{NO}_3)_2 + 2\\text{NO}\\uparrow + 4\\text{H}_2\\text{O}$$",
    "Lưu huỳnh thể hiện tính khử và tính oxi hóa. SO2 là oxit axit và chất tẩy màu.": "Elemental sulfur exhibits dual redox behavior (S⁻², S⁰, S⁺⁴, S⁺⁶). Sulfur dioxide (SO2) is an acidic oxide, food preservative, and industrial bleaching agent.",
    "Dùng bột lưu huỳnh để thu gom thủy ngân rơi vãi.": "Powdered sulfur safely neutralizes and immobilizes toxic elemental mercury spills by forming non-volatile mercuric sulfide (HgS).",
    "SO₂ + Br₂ + 2H₂O → 2HBr + H₂SO₄  (Làm mất màu nước brom)": "SO2 + Br2 + 2H2O → 2HBr + H2SO4 (Discolors orange-brown bromine water)",
    "Hg + S → HgS (Xảy ra ở t° thường dùng thu gom thủy ngân)": "Hg + S → HgS (Occurs spontaneously at room temperature to remediate spilled mercury)",
    "Làm thế nào để xử lý thủy ngân khi bị vỡ nhiệt kế?": "How should a broken mercury thermometer spill be safely decontaminated in the laboratory?",
    "Rắc bột lưu huỳnh (S) lên trên tạo muối HgS không bay hơi.": "Immediately sprinkle elemental sulfur powder over the droplets; it reacts at room temperature to form solid, non-toxic, non-volatile mercuric sulfide (HgS).",
    "$$Hg + S → HgS (Xảy ra ở t° thường dùng thu gom thủy ngân)$$": "$$\\text{Hg} + \\text{S} \\longrightarrow \\text{HgS (s)} \\quad (\\text{Decontamination of toxic mercury spills})$$",
    "$$SO₂ + Br₂ + 2H₂O → 2HBr + H₂SO₄  (Làm mất màu nước brom)$$": "$$\\text{SO}_2 + \\text{Br}_2 + 2\\text{H}_2\\text{O} \\longrightarrow 2\\text{HBr} + \\text{H}_2\\text{SO}_4 \\quad (\\text{Bleaches Bromine Water})$$",
    "H2SO4 loãng là axit mạnh. H2SO4 đặc oxi hóa rất mạnh và háo nước. Sản xuất theo phương pháp tiếp xúc.": "Dilute H2SO4 is a strong dibasic acid. Concentrated H2SO4 is an exceptionally powerful dehydrating agent and strong oxidant. Industrially manufactured via the 3-stage Contact Process.",
    "Nhận biết ion SO4(2-) bằng dung dịch muối Ba2+ tạo kết tủa trắng BaSO4.": "Identification of sulfate anions (SO4²⁻) via barium salts (BaCl2/Ba(OH)2), forming an insoluble white precipitate of BaSO4 resistant to acids.",
    "Cu + 2H₂SO₄ (đặc, t°) → CuSO₄ + SO₂ ↑ + 2H₂O": "Cu + 2H2SO4 (concentrated, hot) → CuSO4 + SO2 ↑ + 2H2O",
    "Tiếp xúc 3 giai đoạn: S/FeS₂ → SO₂ → SO₃ (V₂O₅) → Oleum → H₂SO₄": "Contact Process: S/FeS2 → SO2 → SO3 (V2O5 catalyst at 450°C) → Oleum (H2S2O7) → H2SO4",
    "Chất nào tác dụng H2SO4 đặc nóng giải phóng SO2: CuO, Cu, Fe2O3?": "Which substance reacts with hot concentrated H2SO4 to evolve SO2 gas: CuO, Cu, or Fe2O3?",
    "Đồng (Cu) vì Cu bị oxi hóa lên Cu(II).": "Copper metal (Cu), because elemental Cu (0) is oxidized to Cu(II) while S(+6) is reduced to S(+4) in SO2.",
    "$$\\text{{\\text{Tiếp xúc 3 giai đoạn}: S/FeS₂ → SO₂ → SO₃ (V₂O₅) → Oleum → H₂SO₄}}$$": "$$\\text{Contact Process}: \\text{S/FeS}_2 \\xrightarrow{\\text{burn}} \\text{SO}_2 \\xrightarrow{\\text{V}_2\\text{O}_5, 450^\\circ\\text{C}} \\text{SO}_3 \\xrightarrow{98\\%\\text{ H}_2\\text{SO}_4} \\text{Oleum} \\longrightarrow \\text{H}_2\\text{SO}_4$$",
    "$$Cu + 2H₂SO₄ (đặc, t°) → CuSO₄ + SO₂ \\uparrow + 2H₂O$$": "$$\\text{Cu} + 2\\text{H}_2\\text{SO}_4\\text{ (conc, hot)} \\longrightarrow \\text{CuSO}_4 + \\text{SO}_2\\uparrow + 2\\text{H}_2\\text{O}$$",
    "Hệ thống hóa chu trình nitrogen - sulfur, tính oxi hóa mạnh của HNO3, H2SO4 đặc.": "Systematic review of Nitrogen-Sulfur biochemical cycles, industrial synthesis routes, and the powerful oxidizing actions of concentrated HNO3 and H2SO4.",
    "Al, Fe, Cr bị thụ động trong HNO3 đặc nguội và H2SO4 đặc nguội.": "Aluminum (Al), Iron (Fe), and Chromium (Cr) undergo passivation in cold concentrated HNO3 and H2SO4 due to a dense, impervious oxide surface film.",
    "Nhận biết: NH₄⁺ (kiềm sinh NH₃), SO₄²⁻ (Ba²⁺ sinh BaSO₄ ↓)": "Qualitative analysis: NH4⁺ (heated with alkali liberates pungent NH3), SO4²⁻ (yields white BaSO4 precipitate with Ba²⁺).",
    "So sánh HNO3 và H2SO4 đặc": "Comparative Matrix: Concentrated Nitric Acid vs Concentrated Sulfuric Acid",
    "Kim loại nào bị thụ động trong HNO3 đặc nguội?": "Which metals are passivated and render unreactive in cold concentrated nitric acid (HNO3)?",
    "Nhôm (Al), Sắt (Fe) và Crom (Cr).": "Aluminum (Al), Iron (Fe), and Chromium (Cr).",
    "$${\\text{So sánh HNO3 và H2SO4 đặc}}$$": "$${\\text{Comparative Matrix: Oxidizing Power & Dehydration of Conc. } \\text{HNO}_3 \\text{ vs } \\text{H}_2\\text{SO}_4}$$",
    "$$\\text{Nhận biết}: NH₄⁺ (kiềm sinh NH₃), SO₄²⁻ (Ba²⁺ sinh BaSO₄ \\downarrow)$$": "$$\\text{Diagnostic Tests}: \\text{NH}_4^+ + \\text{OH}^- \\xrightarrow{t^\\circ} \\text{NH}_3\\uparrow, \\quad \\text{Ba}^{2+} + \\text{SO}_4^{2-} \\longrightarrow \\text{BaSO}_4\\downarrow$$",
    "Khái niệm hợp chất hữu cơ, đặc điểm cấu tạo và các nhóm chức phổ biến.": "Fundamentals of organic chemistry, tetravalent carbon bonding geometry, hybridization (sp³, sp², sp), and key characteristic functional groups.",
    "Nhóm chức quyết định tính chất hóa học của phân tử.": "Functional groups are specific groupings of atoms within molecules that dictate their characteristic chemical reactivity and physical properties.",
    "Phổ hồng ngoại IR xác định các nhóm chức đặc trưng": "Infrared (IR) Spectroscopy identifies characteristic functional groups via vibrational absorption wavenumbers (cm⁻¹).",
    "Nhóm chức: -OH (Alcohol), -CHO (Aldehyde), -COOH (Carboxylic acid), -COO- (Ester), -NH₂ (Amine)": "Functional groups: -OH (Alcohol/Hydroxyl), -CHO (Aldehyde/Formyl), -COOH (Carboxylic acid/Carboxyl), -COO- (Ester), -NH2 (Amine/Amino)",
    "Nhóm chức -COOH là nhóm chức của loại hợp chất nào?": "To which class of organic compounds does the -COOH functional group belong?",
    "Carboxylic acids (axit hữu cơ).": "Carboxylic acids (organic acids such as acetic acid CH3COOH).",
    "$$\\text{{\\text{Nhóm chức}: -OH (Alcohol), -CHO (Aldehyde), -COOH (Carboxylic acid), -COO- (Ester), -NH₂ (Amine)}}$$": "$$\\text{Functional Groups}: -\\text{OH (Alcohol)}, -\\text{CHO (Aldehyde)}, -\\text{COOH (Carboxylic Acid)}, -\\text{COO- (Ester)}, -\\text{NH}_2\\text{ (Amine)}$$",
    "$$Phổ hồng ngoại IR xác định các nhóm chức đặc trưng$$": "$$\\text{Infrared (IR) Spectroscopy determines characteristic molecular functional groups}$$",
    "Chiết (độ tan khác nhau), Chưng cất (nhiệt độ sôi khác nhau), Kết tinh và Sắc kí cột.": "Organic isolation and purification techniques: Liquid-liquid extraction (solubility differences), Fractional distillation (boiling point differences), Recrystallization, and Column chromatography.",
    "Ứng dụng sản xuất nước hoa và dược phẩm.": "Essential in essential oil extraction, perfume manufacturing, pharmaceutical synthesis, and natural product purification.",
    "Tách dầu ăn khỏi nước bằng phễu chiết.": "Separating immiscible cooking oil and water using a separatory funnel.",
    "Chưng cất lôi cuốn hơi nước tách tinh dầu": "Steam distillation to extract volatile essential oils (e.g., lemongrass, lavender)",
    "Chiết lỏng - lỏng dùng phễu chiết": "Liquid-liquid partitioning utilizing a separatory funnel",
    "Phương pháp tách rượu etylic ra khỏi nước rượu?": "Which separation method is used to isolate ethanol from an aqueous fermentation broth?",
    "Phương pháp chưng cất phân đoạn.": "Fractional distillation, exploiting the boiling point disparity between ethanol (78.3°C) and water (100°C).",
    "$${\\text{Chưng cất lôi cuốn hơi nước tách tinh dầu}}$$": "$${\\text{Steam distillation for the extraction of volatile essential oils}}$$",
    "$${\\text{Chiết lỏng - lỏng dùng phễu chiết}}$$": "$${\\text{Liquid-liquid extraction using a separatory funnel}}$$",
    "$$Tách dầu ăn khỏi nước bằng phễu chiết.$$": "$$\\text{Separate immiscible oil-water phases via separatory funnel}$$",
    "Thiết lập CTĐGN từ % khối lượng và xác định CTPT dựa trên phổ khối lượng MS.": "Determination of empirical formulas from elemental mass percentages (%C, %H, %O, %N) and molecular formula derivation via Mass Spectrometry (MS) molecular ion peaks.",
    "Nắm vững kiến thức trọng tâm của bài học.": "Master core concepts of molecular mass deduction, fragment ion analysis, and structural validation.",
    "Phổ khối lượng MS cho biết giá trị ion phân tử [M⁺] chính xác bằng M.": "The molecular ion peak [M⁺·] in Mass Spectrometry directly yields the exact molecular mass (M) of the compound.",
    "CTPT = (CTĐGN)_n": "Molecular Formula = (Empirical Formula)_n (where n = M / M_empirical)",
    "$$CTPT = (CTĐGN)_n$$": "$$\\text{Molecular Formula} = (\\text{Empirical Formula})_n \\quad \\left(n = \\frac{M}{M_{\\text{empirical}}}\\right)$$",
    "$$Phổ khối lượng MS cho biết giá trị ion phân tử [M⁺] chính xác bằng M.$$": "$$\\text{Mass Spectrometry (MS) [M}^{+\\bullet}] \\text{ peak gives exact molecular mass } M$$",
    "Thuyết Butlerov, trật tự liên kết, loại mạch cacbon và hiện tượng đồng phân cấu tạo, hình học.": "Butlerov's Theory of Chemical Structure, chemical connectivity, carbon chain types (straight, branched, cyclic), and structural/stereoisomerism (cis-trans).",
    "Trật tự liên kết quy định tính chất của chất.": "The specific sequence and connectivity of atoms within an organic molecule definitively determine its physical and chemical properties.",
    "CH₃-CH₂-CH₂-OH và CH₃-CH(OH)-CH₃ (Đồng phân vị trí -OH)": "Propan-1-ol and Propan-2-ol (Positional isomers of the -OH hydroxyl group)",
    "Đồng phân cấu tạo vs Đồng phân hình học cis - trans": "Structural Isomerism (chain, position, functional group) vs Geometric Stereoisomerism (cis-trans)",
    "Chất nào có đồng phân cis - trans: but-1-en hay but-2-en?": "Which compound exhibits geometric cis-trans isomerism: but-1-ene or but-2-ene?",
    "But-2-en (CH3-CH=CH-CH3) có đồng phân cis và trans.": "But-2-ene (CH3-CH=CH-CH3), because each doubly bonded carbon atom carries two different substituent groups (-H and -CH3).",
    "$${\\text{Đồng phân cấu tạo vs Đồng phân hình học cis - trans}}$$": "$${\\text{Structural Isomerism vs Geometric Stereoisomerism (cis-trans)}}$$",
    "$$CH₃-CH₂-CH₂-OH và CH₃-CH(OH)-CH₃ (Đồng phân vị trí -OH)$$": "$$\\text{Propan-1-ol} \\longleftrightarrow \\text{Propan-2-ol} \\quad (\\text{Positional Isomerism})$$",
    "Tổng kết lập CTPT, viết đồng phân cấu tạo và gọi tên danh pháp IUPAC.": "Systematic IUPAC nomenclature rules, systematic isomer enumeration, and spectroscopic verification for organic molecules.",
    "Củng cố kỹ năng viết đồng phân.": "Methodical derivation of all constitutional isomers without duplication or omission.",
    "Thành thạo phân tích phổ MS và IR.": "Master joint spectral interpretation of Infrared (IR) and Mass Spectrometry (MS) datasets.",
    "Quy tắc tên IUPAC: Vị trí nhánh + Nhánh + Mạch chính + Hậu tố": "IUPAC Nomenclature: Locant-Prefix (Substituents) + Root (Main Chain) + Suffix (Principal Functional Group)",
    "Viết các đồng phân cấu tạo của C4H10?": "Enumerate all constitutional isomers for the alkane formula C4H10.",
    "Gồm Butan và 2-metylpropan.": "Two isomers: Butane (straight chain, b.p. -0.5°C) and 2-Methylpropane / Isobutane (branched chain, b.p. -11.7°C).",
    "$$\\text{Quy tắc tên IUPAC}: Vị trí nhánh + Nhánh + Mạch chính + Hậu tố$$": "$$\\text{IUPAC Format}: \\text{Locant-Prefix} + \\text{Root Carbon Chain} + \\text{Primary/Secondary Suffix}$$",
    "$$Thành thạo phân tích phổ MS và IR.$$": "$${\\text{Mastery of MS molecular ion and IR functional group vibrational analysis}}$$",
    "Công thức CnH2n+2. Chỉ có liên kết đơn C-C và C-H. Phản ứng đặc trưng: thế clo (theo quy tắc thế C bậc cao).": "Alkanes (CnH2n+2, n ≥ 1). Saturated hydrocarbons containing only single C-C and C-H sigma bonds. Characteristic free-radical halogenation substituting preferentially at higher-order carbon atoms.",
    "Alkane là thành phần chính của khí gas LPG và xăng dầu.": "Alkanes form the primary chemical constituents of liquefied petroleum gas (LPG, propane/butane), gasoline, diesel, and natural gas.",
    "CH₃-CH₂-CH₃ + Cl₂ → CH₃-CHCl-CH₃ (Sản phẩm chính 2-clopropan)": "CH3-CH2-CH3 + Cl2 → CH3-CHCl-CH3 + HCl (Major product: 2-chloropropane via secondary radical intermediate)",
    "C_n H₂n+₂ + Cl₂ → C_n H₂n+₁ Cl + HCl  (Ánh sáng)": "CnH2n+2 + Cl2 → CnH2n+1Cl + HCl (hν photochemical free-radical substitution)",
    "Ưu tiên thế H ở C bậc cao hơn": "Halogenation selectively replaces hydrogen atoms attached to higher-substituted carbons (3° > 2° > 1°).",
    "Clo hóa propan, sản phẩm chính là gì?": "What is the major monohalogenated product obtained from the photochemical chlorination of propane?",
    "2-clopropan (CH3-CHCl-CH3).": "2-Chloropropane / Isopropyl chloride (CH3-CHCl-CH3), formed via the more stable secondary free radical intermediate.",
    "$$C_n H₂n+₂ + Cl₂ → C_n H₂n+₁ Cl + HCl  (Ánh sáng)$$": "$$\\text{C}_n\\text{H}_{2n+2} + \\text{Cl}_2 \\xrightarrow{h\\nu} \\text{C}_n\\text{H}_{2n+1}\\text{Cl} + \\text{HCl} \\quad (\\text{Photochemical Substitution})$$",
    "$${\\text{Ưu tiên thế H ở C bậc cao hơn}}$$": "$${\\text{Free-radical substitution selectivity: } 3^\\circ\\text{ Carbon} > 2^\\circ\\text{ Carbon} > 1^\\circ\\text{ Carbon}}$$",
    "$$CH₃-CH₂-CH₃ + Cl₂ → CH₃-CHCl-CH₃ (Sản phẩm chính 2-clopropan)$$": "$$\\text{CH}_3\\text{CH}_2\\text{CH}_3 + \\text{Cl}_2 \\xrightarrow{h\\nu} \\text{CH}_3\\text{CHClCH}_3 + \\text{HCl} \\quad (\\text{Major Product: 2-Chloropropane})$$",
    "Alkene CnH2n (chứa C=C) và Alkyne CnH2n-2 (chứa C≡C). Phản ứng cộng (Markovnikov), trùng hợp và làm mất màu KMnO4.": "Alkenes CnH2n (C=C double bond) and Alkynes CnH2n-2 (C≡C triple bond). Unsaturated hydrocarbons undergoing electrophilic addition (Markovnikov's rule), polymerization, and oxidation with bromine/KMnO4.",
    "Alkyne có nối ba đầu mạch tác dụng AgNO3/NH3 tạo kết tủa vàng.": "Terminal alkynes (alk-1-ynes with acidic acetylenic ≡C-H) react with ammoniacal silver nitrate [Ag(NH3)2]OH to produce characteristic pale-yellow silver acetylide precipitates.",
    "CH₃-CH=CH₂ + HCl → CH₃-CHCl-CH₃ (Chính)": "CH3-CH=CH2 + HCl → CH3-CHCl-CH3 (Major product: 2-chloropropane via Markovnikov addition)",
    "Quy tắc Markovnikov: H cộng vào C nhiều H hơn": "Markovnikov's Rule: In the electrophilic addition of HX to an asymmetric alkene, hydrogen H adds to the carbon already possessing more hydrogen atoms.",
    "Làm mất màu dung dịch Brom và thuốc tím KMnO4": "Decolorization of bromine water (Br2/CCl4) and purple aqueous potassium permanganate (KMnO4) confirms unsaturation.",
    "Chất nào tác dụng AgNO3/NH3 tạo kết tủa vàng?": "Which class of hydrocarbons reacts with ammoniacal silver nitrate solution to form a distinctive yellow precipitate?",
    "Các alkyne có liên kết ba đầu mạch (như Axetilen).": "Terminal alkynes (alk-1-ynes such as acetylene HC≡CH and prop-1-yne HC≡C-CH3).",
    "$$\\text{{\\text{Quy tắc Markovnikov}: H cộng vào C nhiều H hơn}}$$": "$$\\text{Markovnikov's Rule: Electrophile } \\text{H}^+ \\text{ adds to the least substituted carbon}$$",
    "$${\\text{Làm mất màu dung dịch Brom và thuốc tím KMnO4}}$$": "$${\\text{Diagnostic Decolorization: Aqueous } \\text{Br}_2 \\text{ and Baeyer's Reagent } \\text{KMnO}_4}$$",
    "$$CH₃-CH=CH₂ + HCl → CH₃-CHCl-CH₃ (Chính)$$": "$$\\text{CH}_3\\text{CH}=\\text{CH}_2 + \\text{HCl} \\longrightarrow \\text{CH}_3\\text{CHClCH}_3 \\quad (\\text{Major: 2-Chloropropane})$$",
    "Chứa vòng benzen C6H6 và đồng đẳng (Toluen). Quy tắc thế vào vòng thơm và nhánh.": "Arenes / Aromatic hydrocarbons: Benzene ring (C6H6, delocalized 6π electron sextet) and alkylbenzenes (Toluene C6H5CH3). Electrophilic aromatic substitution rules (ortho/para directing activating methyl group).",
    "Toluen làm mất màu KMnO4 khi đun nóng; benzen thì không.": "Toluene oxidizes with hot aqueous KMnO4 to form benzoic acid (C6H5COOH), decolorizing the purple solution, whereas benzene is resistant to oxidation.",
    "Benzen: Dễ thế Br₂ (xúc tác Fe), khó cộng": "Benzene: Undergoes electrophilic bromination readily with FeBr3 catalyst (substitution) while resisting addition reactions due to aromatic resonance stability.",
    "Toluen: Tác dụng KMnO₄ đun nóng tạo C₆H₅COOH": "Toluene: Side-chain oxidation by hot KMnO4 yields potassium benzoate / benzoic acid (C6H5COOH).",
    "Thuốc thử hóa học phân biệt Benzen và Toluen?": "Which chemical reagent distinguishes liquid benzene from toluene in the laboratory?",
    "Dung dịch KMnO4 đun nóng (Toluen làm mất màu thuốc tím).": "Aqueous KMnO4 with heating: Toluene oxidizes and decolorizes the purple solution, while benzene remains unreacted.",
    "$$\\text{{\\text{Benzen}: Dễ thế Br₂ (xúc tác Fe), khó cộng}}$$": "$$\\text{Benzene Aromaticity: Readily undergoes substitution (FeBr}_3\\text{), resists addition}$$",
    "$$\\text{{\\text{Toluen}: Tác dụng KMnO₄ đun nóng tạo C₆H₅COOH}}$$": "$$\\text{C}_6\\text{H}_5\\text{CH}_3 + 2\\text{KMnO}_4 \\xrightarrow{t^\\circ} \\text{C}_6\\text{H}_5\\text{COOK} + 2\\text{MnO}_2\\downarrow + \\text{KOH} + \\text{H}_2\\text{O}$$",
    "Hệ thống hóa tính chất và phân biệt Alkane, Alkene, Alkyne và Arene.": "Comprehensive classification, reaction selectivity, and diagnostic qualitative separation of Alkanes, Alkenes, Alkynes, and Arenes.",
    "Thành thạo giải toán hỗn hợp hydrocarbon.": "Solve multi-step stoichiometry and cracking/combustion problems for hydrocarbon gas mixtures.",
    "Alkane (thế Cl₂) | Alkene (cộng Br₂) | Alk-1-yne (kết tủa AgNO₃/NH₃) | Toluen (KMnO₄, t°)": "Alkane (photo-chlorination) | Alkene (Br2 addition) | Alk-1-yne (AgNO3/NH3 yellow precipitate) | Toluene (hot KMnO4 oxidation)",
    "Bảng so sánh 4 loại Hydrocarbon": "Comparative Matrix: Alkanes, Alkenes, Alkynes, and Arenes",
    "Thứ tự nhận biết: Metan, Etilen, Axetilen?": "What is the optimal reagent sequence to distinguish methane, ethylene, and acetylene?",
    "Dùng AgNO3/NH3 nhận biết Axetilen, sau đó dùng nước Brom nhận biết Etilen.": "First, test with [Ag(NH3)2]OH to identify acetylene (yellow precipitate AgC≡CAg ↓); next, test remaining gases with bromine water to identify ethylene (decolorization). Methane is the unreactive residue.",
    "$${\\text{Bảng so sánh 4 loại Hydrocarbon}}$$": "$${\\text{Diagnostic Separation Matrix: Alkanes, Alkenes, Alkynes, and Arenes}}$$",
    "$$Alkane (thế Cl₂) | Alkene (cộng Br₂) | Alk-1-yne (kết tủa AgNO₃/NH₃) | Toluen (KMnO₄, t°)$$": "$$\\text{Diagnostic Pathway: Alkane } (h\\nu) \\;\\vert\\; \\text{Alkene } (\\text{Br}_2) \\;\\vert\\; \\text{Alk-1-yne } (\\text{Ag}^+) \\;\\vert\\; \\text{Arene } (\\text{KMnO}_4, \\Delta)$$",
    "R-X. Phản ứng thủy phân trong kiềm và phản ứng tách HX (quy tắc Zaitsev).": "Halogenated hydrocarbons (R-X). Nucleophilic substitution (alkaline hydrolysis to alcohols) and base-induced beta-elimination (Zaitsev's rule) yielding alkenes.",
    "Dùng làm dung môi, chất gây mê và chất chống dính Teflon.": "Widely applied as non-flammable solvents, local anesthetics, refrigerants, and non-stick polymer coatings (Teflon PTFE).",
    "Quy tắc Zaitsev: Tách HX ưu tiên H ở C bậc cao": "Zaitsev's Rule: In the dehydrohalogenation of alkyl halides, beta-elimination of HX preferentially removes hydrogen from the more substituted (higher-degree) carbon, forming the more stable, highly substituted alkene.",
    "Thủy phân etyl clorua bằng NaOH đun nóng thu được chất gì?": "What organic product is synthesized when ethyl chloride (C2H5Cl) is hydrolyzed with aqueous NaOH under heat?",
    "Rượu etylic (CH3-CH2-OH) và NaCl.": "Ethanol (CH3-CH2-OH) and sodium chloride (NaCl) via nucleophilic substitution (SN2).",
    "$$\\text{Thủy phân}: R-X + NaOH → R-OH + NaX (t°)$$": "$$\\text{Nucleophilic Hydrolysis}: R\\text{-}X + \\text{NaOH} \\xrightarrow{t^\\circ} R\\text{-OH} + \\text{Na}X$$",
    "$$\\text{{\\text{Quy tắc Zaitsev}: Tách HX ưu tiên H ở C bậc cao}}$$": "$$\\text{Zaitsev's Elimination: Elimination yields the more highly substituted, thermodynamically stable alkene}$$",
    "Nhóm -OH gắn vào C no. Tác dụng Na, phản ứng thế -OH, tách nước tạo alkene/ete và oxi hóa bằng CuO.": "Alcohols (R-OH, hydroxyl group bonded to sp³ saturated carbon). Acidic hydrogen displacement with alkali metals, nucleophilic displacement, acid-catalyzed dehydration (alkene at 170°C, ether at 140°C), and oxidation with CuO.",
    "Ancol đa chức có -OH kề nhau hòa tan Cu(OH)2 tạo dung dịch xanh lam.": "Polyols possessing adjacent (vicinal) hydroxyl groups dissolve freshly precipitated Cu(OH)2, forming a characteristic soluble deep-blue chelate complex.",
    "Glycerol C₃H₅(OH)₃ hòa tan Cu(OH)₂ tạo phức xanh lam thẫm": "Glycerol C3H5(OH)3 dissolves Cu(OH)2, forming a soluble deep royal-blue bis(glycerolato)copper(II) complex.",
    "Tách nước 170°C tạo Alkene; 140°C tạo Ete": "Acid-catalyzed alcohol dehydration: at 170°C (conc. H2SO4) intramolceular elimination yields Alkenes; at 140°C intermolecular dehydration yields Dialkyl Ethers.",
    "Oxi hóa ancol bậc I bằng CuO tạo Anđehit; bậc II tạo Xeton": "Mild oxidation with hot copper(II) oxide (CuO): 1° primary alcohols oxidize to Aldehydes (R-CHO); 2° secondary alcohols oxidize to Ketones (R-CO-R'); 3° tertiary alcohols resist oxidation.",
    "Chất nào tác dụng Cu(OH)2 tạo dung dịch xanh lam: Ethanol hay Glycerol?": "Which compound dissolves Cu(OH)2 to produce an intense deep-blue solution: Ethanol or Glycerol?",
    "Glycerol (do có 3 nhóm -OH liền kề).": "Glycerol / Propane-1,2,3-triol, due to the presence of vicinal hydroxyl groups forming a chelate coordination ring with Cu²⁺.",
    "$${\\text{Tách nước 170°C tạo Alkene; 140°C tạo Ete}}$$": "$$\\text{Alcohol Dehydration: } 170^\\circ\\text{C } (\\text{Alkene}) \\quad\\longleftrightarrow\\quad 140^\\circ\\text{C } (\\text{Ether})$$",
    "$${\\text{Oxi hóa ancol bậc I bằng CuO tạo Anđehit; bậc II tạo Xeton}}$$": "$$1^\\circ\\text{ Alcohol } \\xrightarrow{\\text{CuO}, t^\\circ} \\text{Aldehyde}, \\quad 2^\\circ\\text{ Alcohol } \\xrightarrow{\\text{CuO}, t^\\circ} \\text{Ketone}$$",
    "$$Glycerol C₃H₅(OH)₃ hòa tan Cu(OH)₂ tạo phức xanh lam thẫm$$": "$$2\\text{C}_3\\text{H}_5(\\text{OH})_3 + \\text{Cu(OH)}_2 \\longrightarrow [\\text{C}_3\\text{H}_7\\text{O}_3]_2\\text{Cu} + 2\\text{H}_2\\text{O} \\quad (\\text{Royal Blue Complex})$$",
    "Nhóm -OH gắn trực tiếp vào vòng benzen. Có tính axit yếu. Tác dụng nước brom tạo kết tủa trắng.": "Phenols (Ar-OH, hydroxyl group attached directly to an aromatic benzene ring). Weakly acidic (reacts with NaOH but not NaHCO3), undergoing electrophilic aromatic tribromination with bromine water to form a white precipitate.",
    "Dung dịch phenol làm mất tính bazơ của dung dịch NaOH.": "Phenol neutralizes aqueous NaOH, forming water-soluble sodium phenolate (C6H5ONa).",
    "Ảnh hưởng qua lại làm tăng độ linh động của nguyên tử H nhóm -OH.": "Electronic conjugation between the oxygen lone pairs and the aromatic π system weakens the O-H bond, enhancing its acidity relative to aliphatic alcohols.",
    "C₆H₅OH + 3Br₂ → C₆H₂Br₃OH ↓ (Trắng) + 3HBr": "C6H5OH + 3Br2 → 2,4,6-tribromophenol ↓ (White precipitate) + 3HBr",
    "Thuốc thử đặc trưng nhận biết Phenol?": "What is the characteristic laboratory test reagent to identify phenol?",
    "Dung dịch nước Brom tạo kết tủa trắng 2,4,6-tribromphenol.": "Bromine water: it immediately forms a characteristic white precipitate of 2,4,6-tribromophenol and decolorizes bromine water.",
    "$$C₆H₅OH + 3Br₂ → C₆H₂Br₃OH ↓ (Trắng) + 3HBr$$": "$$\\text{C}_6\\text{H}_5\\text{OH} + 3\\text{Br}_2 \\longrightarrow \\text{C}_6\\text{H}_2\\text{Br}_3\\text{OH}\\downarrow\\text{ (White)} + 3\\text{HBr}$$",
    "$$Ảnh hưởng qua lại làm tăng độ linh động của nguyên tử H nhóm -OH.$$": "$${\\text{p-}\\pi\\text{ Resonance conjugation enhances the acidity of phenolic -OH group}}$$",
    "So sánh tính chất của Alcohol và Phenol, bài toán tách nước và phản ứng với kim loại kiềm.": "Comparative analysis of Alcohols versus Phenols: acidity, reactivity with alkalis, dehydration pathways, and ring substitution.",
    "Thành thạo nhận biết Ancol đơn chức, đa chức và Phenol.": "Master multi-step qualitative diagnostic schemes for aliphatic monools, vicinal polyols, and aromatic phenols.",
    "So sánh: Ancol không tác dụng NaOH; Phenol tác dụng NaOH": "Comparative Distinction: Aliphatic alcohols do not react with NaOH; Phenol reacts readily with NaOH to form sodium phenolate.",
    "Cả hai đều tác dụng với Na giải phóng H₂": "Both aliphatic alcohols and phenols react with metallic sodium to liberate hydrogen gas (2R-OH + 2Na → 2R-ONa + H2 ↑).",
    "Dùng Cu(OH)2 nhận biết Glycerol (xanh lam), sau đó dùng nước Brom nhận biết Phenol (kết tủa trắng).": "First, test with Cu(OH)2 to identify glycerol (deep-blue solution); next, test with bromine water to identify phenol (white precipitate 2,4,6-tribromophenol).",
    "$$\\text{{\\text{So sánh}: Ancol không tác dụng NaOH; Phenol tác dụng NaOH}}$$": "$$\\text{Acidity Contrast}: \\text{Alcohol } + \\text{NaOH} \\rightarrow \\varnothing, \\quad \\text{Phenol } + \\text{NaOH} \\longrightarrow \\text{C}_6\\text{H}_5\\text{ONa} + \\text{H}_2\\text{O}$$",
    "$${\\text{Cả hai đều tác dụng với Na giải phóng H₂}}$$": "$$2R\\text{-OH} + 2\\text{Na} \\longrightarrow 2R\\text{-ONa} + \\text{H}_2\\uparrow$$",
    "$$Thành thạo nhận biết Ancol đơn chức, đa chức và Phenol.$$": "$${\\text{Diagnostic Qualitative Scheme: Monool vs Vicinal Polyol vs Aromatic Phenol}}$$",
    "Nhóm cacbonyl >C=O. Anđehit R-CHO tráng bạc với thuốc thử Tollens và khử Cu(OH)2 tạo Cu2O đỏ gạch.": "Carbonyl compounds (>C=O): Aldehydes (R-CHO) and Ketones (R-CO-R'). Aldehydes are easily oxidized, giving positive Silver Mirror Tollens test and reducing Fehling's/Benedict's Cu(OH)2 to a brick-red Cu2O precipitate.",
    "CH3CHO cho phản ứng iodoform tạo kết tủa vàng CHI3.": "Acetaldehyde (CH3CHO) and methyl ketones give a positive Iodoform reaction (I2/NaOH), yielding a yellow precipitate of triiodomethane (CHI3).",
    "R-CHO + 2Cu(OH)₂ + NaOH → R-COONa + Cu₂O ↓ (Đỏ gạch) + 3H₂O": "R-CHO + 2Cu(OH)2 + NaOH → R-COONa + Cu2O ↓ (Brick-red precipitate) + 3H2O",
    "Sinh ra 2 mol Ag (riêng HCHO sinh 4 mol Ag).": "1 mole of aliphatic aldehyde yields 2 moles of metallic silver Ag (Formaldehyde HCHO yields 4 moles of Ag).",
    "$$\\text{Tráng bạc}: R-CHO + 2[Ag(NH₃)₂]OH → R-COONH₄ + 2Ag ↓ + 3NH₃ + H₂O$$": "$$\\text{Silver Mirror Test}: R\\text{-CHO} + 2[\\text{Ag}(\\text{NH}_3)_2]\\text{OH} \\xrightarrow{t^\\circ} R\\text{-COONH}_4 + 2\\text{Ag}\\downarrow + 3\\text{NH}_3 + \\text{H}_2\\text{O}$$",
    "$$R-CHO + 2Cu(OH)₂ + NaOH → R-COONa + Cu₂O ↓ (Đỏ gạch) + 3H₂O$$": "$$R\\text{-CHO} + 2\\text{Cu(OH)}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} R\\text{-COONa} + \\text{Cu}_2\\text{O}\\downarrow\\text{ (Brick Red)} + 3\\text{H}_2\\text{O}$$",
    "$$CH3CHO cho phản ứng iodoform tạo kết tủa vàng CHI3.$$": "$$\\text{CH}_3\\text{CHO} + 3\\text{I}_2 + 4\\text{NaOH} \\longrightarrow \\text{HCOONa} + \\text{CHI}_3\\downarrow\\text{ (Yellow)} + 3\\text{NaI} + 3\\text{H}_2\\text{O}$$",
    "Nhóm -COOH. Đầy đủ tính axit (làm đỏ quỳ, sủi bọt NaHCO3) và phản ứng este hóa với alcohol.": "Carboxylic Acids (R-COOH, carboxyl group). Exhibiting full acidic character (turns litmus red, effervesces with NaHCO3 to liberate CO2) and undergoing reversible Fischer esterification with alcohols.",
    "Nhiệt độ sôi cao hơn ancol cùng C do liên kết hydrogen dạng đime.": "Carboxylic acids exhibit higher boiling points than corresponding alcohols due to robust cyclic dimeric hydrogen-bonded structures.",
    "R-COOH + R'-OH ⇌ R-COO-R' + H₂O (H₂SO₄ đặc, t°)": "R-COOH + R'-OH ⇌ R-COO-R' + H2O (Fischer esterification catalyzed by conc. H2SO4 under reflux)",
    "Vì liên kết hydrogen liên phân tử giữa các phân tử axit bền hơn nhiều so với ancol.": "Because the strong cyclic dimer hydrogen bonds formed between carboxylic acid molecules require significantly more thermal energy to break than alcohol networks.",
    "$$R-COOH + R'-OH \\rightleftharpoons R-COO-R' + H₂O (H₂SO₄ đặc, t°)$$": "$$R\\text{-COOH} + R'\\text{-OH} \\underset{\\text{H}_2\\text{SO}_4\\text{ (conc)}, t^\\circ}{\\rightleftharpoons} R\\text{-COO-}R' + \\text{H}_2\\text{O} \\quad (\\text{Esterification})$$",
    "$$Nhiệt độ sôi cao hơn ancol cùng C do liên kết hydrogen dạng đime.$$": "$${\\text{Elevated boiling points due to stable cyclic dimeric hydrogen-bonding networks}}$$",
    "Tổng kết hợp chất Carbonyl và Carboxylic Acid. Chuỗi biến hóa và nhận biết các nhóm chức hữu cơ.": "Comprehensive synthesis of Carbonyl Compounds and Carboxylic Acids: multi-step organic reaction chains, isomerism, and functional group diagnosis.",
    "Thành thạo sơ đồ phản ứng hữu cơ lớp 11.": "Master multi-step organic retrosynthesis and conversion pathways from hydrocarbons to carboxylic acids.",
    "Bảng phân biệt: Ancol (-OH), Phenol (-OH thơm), Anđehit (-CHO), Axit (-COOH)": "Diagnostic Matrix: Alcohol (-OH), Phenol (Aromatic -OH), Aldehyde (-CHO), Carboxylic Acid (-COOH)",
    "Chất nào tác dụng NaHCO3 giải phóng CO2: C2H5OH, CH3CHO, CH3COOH?": "Which substance reacts with sodium bicarbonate (NaHCO3) to effervesce and evolve CO2 gas: C2H5OH, CH3CHO, or CH3COOH?",
    "Axit axetic (CH3COOH) vì có tính axit mạnh hơn axit cacbonic.": "Acetic acid (CH3COOH), because it is a stronger acid than carbonic acid (H2CO3) and displaces CO2.",
    "$$\\text{{\\text{Bảng phân biệt}: Ancol (-OH), Phenol (-OH thơm), Anđehit (-CHO), Axit (-COOH)}}$$": "$${\\text{Diagnostic Separation: Alcohol (-OH) vs Phenol (Ar-OH) vs Aldehyde (-CHO) vs Acid (-COOH)}}$$"
}

# Apply to Grade 11 lessons
count = 0
for l in lessons:
    if l["grade"] == 11:
        if isinstance(l.get("summary"), dict):
            s_vn = l["summary"].get("VN", "")
            if s_vn in G11_TRANSLATIONS:
                l["summary"]["EN"] = G11_TRANSLATIONS[s_vn]
                count += 1
        
        for sec in l.get("sections", []):
            if isinstance(sec.get("heading"), dict):
                h_vn = sec["heading"].get("VN", "")
                if h_vn in G11_TRANSLATIONS:
                    sec["heading"]["EN"] = G11_TRANSLATIONS[h_vn]
                    count += 1
            for pt in sec.get("points", []):
                if isinstance(pt, dict):
                    p_vn = pt.get("VN", "")
                    if p_vn in G11_TRANSLATIONS:
                        pt["EN"] = G11_TRANSLATIONS[p_vn]
                        count += 1

        for tp in l.get("theoryPoints", []):
            if isinstance(tp, dict):
                tp_vn = tp.get("VN", "")
                if tp_vn in G11_TRANSLATIONS:
                    tp["EN"] = G11_TRANSLATIONS[tp_vn]
                    count += 1

        sq = l.get("sampleQuestion", {})
        if isinstance(sq, dict):
            if isinstance(sq.get("question"), dict):
                q_vn = sq["question"].get("VN", "")
                if isinstance(q_vn, list): q_vn = " ".join(str(x) for x in q_vn)
                if q_vn in G11_TRANSLATIONS:
                    sq["question"]["EN"] = G11_TRANSLATIONS[q_vn]
                    count += 1
            if isinstance(sq.get("answer"), dict):
                a_vn = sq["answer"].get("VN", "")
                if isinstance(a_vn, list): a_vn = " ".join(str(x) for x in a_vn)
                if a_vn in G11_TRANSLATIONS:
                    sq["answer"]["EN"] = G11_TRANSLATIONS[a_vn]
                    count += 1

        new_kf = []
        for kf in l.get("keyFormulas", []):
            if kf in G11_TRANSLATIONS:
                new_kf.append(G11_TRANSLATIONS[kf])
                count += 1
            else:
                new_kf.append(kf)
        l["keyFormulas"] = new_kf

        new_eq = []
        for eq in l.get("equations", []):
            if eq in G11_TRANSLATIONS:
                new_eq.append(G11_TRANSLATIONS[eq])
                count += 1
            else:
                new_eq.append(eq)
        l["equations"] = new_eq

with open("src/data/vietnamCurriculumData.json", "w", encoding="utf-8") as f:
    json.dump(lessons, f, ensure_ascii=False, indent=2)

print(f"Applied {count} translations to Grade 11!")
