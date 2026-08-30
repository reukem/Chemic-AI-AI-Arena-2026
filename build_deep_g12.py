# -*- coding: utf-8 -*-
import json

def get_rich_curriculum():
    all_lessons = []

    def make_rich_lesson(grade, num, ch_num, ch_title, title, summary, sections, formulas, equations, q, a, reagents):
        clean_title = title.split(':', 1)[1].strip() if ':' in title else title
        # Flatten points for backwards compatibility with theoryPoints
        all_points = []
        for s in sections:
            for p in s["points"]:
                all_points.append({"VN": f"[{s['heading']}] {p}", "EN": f"[{s['heading']}] {p}"})
        
        return {
            "id": f"hh{grade}_b{num}",
            "code": f"HH{grade}-B{num:02d}",
            "lessonNumber": num,
            "grade": grade,
            "chapterNumber": ch_num,
            "chapterTitle": ch_title,
            "title": {
                "VN": title,
                "EN": f"Lesson {num}: {clean_title}"
            },
            "summary": {
                "VN": summary,
                "EN": summary
            },
            "sections": [
                {
                    "heading": {"VN": sec["heading"], "EN": sec["heading"]},
                    "points": [{"VN": p, "EN": p} for p in sec["points"]]
                }
                for sec in sections
            ],
            "keyFormulas": formulas,
            "equations": equations,
            "theoryPoints": all_points,
            "sampleQuestion": {
                "question": {"VN": q, "EN": q},
                "answer": {"VN": a, "EN": a}
            },
            "suggestedReagents": reagents
        }

    # =========================================================================
    # LỚP 12 (30 BÀI HỌC CHUYÊN SÂU - CỰC KỲ CHI TIẾT & ĐẦY ĐỦ)
    # =========================================================================
    c12 = {
        1: "Chương 1: Ester – Lipid",
        2: "Chương 2: Carbohydrate",
        3: "Chương 3: Hợp chất chứa Nitrogen",
        4: "Chương 4: Polymer",
        5: "Chương 5: Pin điện & Điện phân",
        6: "Chương 6: Đại cương về kim loại",
        7: "Chương 7: Nguyên tố nhóm IA và nhóm IIA",
        8: "Chương 8: Sơ lược về kim loại chuyển tiếp & phức chất"
    }

    g12_rich = [
        (1, 1, "Bài 1: Ester – Lipid (Khái niệm, Cấu tạo & Tính chất)",
         "Ester và Lipid là những nhóm hợp chất hữu cơ quan trọng có mặt phổ biến trong sinh vật và đời sống. Ester tạo nên hương thơm quyến rũ của hoa quả và nước hoa, trong khi Lipid (chất béo) là nguồn dự trữ năng lượng và cấu tạo màng tế bào.",
         [
             {
                 "heading": "1. Khái niệm & Cấu trúc phân tử Ester",
                 "points": [
                     "Khi thay thế nhóm -OH ở nhóm cacboxyl (-COOH) của axit cacboxylic bằng nhóm -OR' của ancol thì thu được Ester (công thức tổng quát: R-COO-R', trong đó R' khác H).",
                     "Ester đơn chức no, mạch hở có CTPT chung là C_n H_2n O_2 (với n ≥ 2). Ví dụ: HCOOCH3 (Metyl fomat), CH3COOC2H5 (Etyl axetat).",
                     "Danh pháp IUPAC: Tên gốc hiđrocacbon R' + Tên gốc axit đuôi '-at' (Ví dụ: CH3COOC2H5 đọc là Etyl axetat; HCOOCH3 đọc là Metyl fomat)."
                 ]
             },
             {
                 "heading": "2. Tính chất vật lí của Ester",
                 "points": [
                     "Các ester thường là chất lỏng hoặc chất rắn ở nhiệt độ phòng, nhẹ hơn nước và rất ít tan trong nước do không có liên kết hydrogen liên phân tử như axit và ancol.",
                     "Nhiệt độ sôi của ester thấp hơn đáng kể so với axit cacboxylic và ancol có cùng khối lượng phân tử hoặc cùng số nguyên tử carbon.",
                     "Nhiều ester có mùi thơm hoa quả đặc trưng: Isoamyl axetat (CH3COOCH2CH2CH(CH3)2) có mùi chuối chín; Etyl butirat và Etyl propionat có mùi dứa; Benzyl axetat có mùi hoa nhài."
                 ]
             },
             {
                 "heading": "3. Tính chất hóa học & Cơ chế phản ứng của Ester",
                 "points": [
                     "Thủy phân trong môi trường axit (Thuận nghịch): R-COO-R' + H2O ⇌ R-COOH + R'-OH (Xúc tác H2SO4 đặc, đun nóng nhẹ). Phản ứng không hoàn toàn và tạo hỗn hợp 2 lớp chất lỏng.",
                     "Thủy phân trong môi trường kiềm / Xà phòng hóa (Một chiều): R-COO-R' + NaOH → R-COONa + R'-OH (Đun nóng). Phản ứng xảy ra hoàn toàn tạo muối tan và ancol.",
                     "Phản ứng của ester đặc biệt: Ester của phenol (R-COOC6H5 + 2NaOH → R-COONa + C6H5ONa + H2O); Ester có gốc không no (Vinyl axetat: CH3COOCH=CH2 + NaOH → CH3COONa + CH3CHO)."
                 ]
             },
             {
                 "heading": "4. Khái niệm & Phân loại Lipid - Chất béo (Triglyceride)",
                 "points": [
                     "Lipid là những hợp chất hữu cơ có trong tế bào sống, không tan trong nước nhưng tan nhiều trong dung môi hữu cơ không phân cực (ete, benzen, clorofom).",
                     "Chất béo (Triglyceride / Triacylglycerol) là triester của glycerol với các axit béo (axit monocacboxylic có mạch C dài, không phân nhánh, số C chẵn từ 12 đến 24).",
                     "4 Axit béo kinh điển cần nhớ: Axit Palmitic (C15H31COOH, no, M=256), Axit Stearic (C17H35COOH, no, M=284), Axit Oleic (C17H33COOH, không no có 1 liên kết C=C cis, M=282), Axit Linoleic (C17H31COOH, không no có 2 liên kết C=C, M=280).",
                     "Chất béo no (Tristearin, Tripalmitin) thường ở thể rắn ở nhiệt độ thường (mỡ động vật). Chất béo không no (Triolein) ở thể lỏng (dầu thực vật).",
                     "Phản ứng hiđro hóa dầu lỏng thành mỡ rắn: Triolein (lỏng) + 3H2 → Tristearin (rắn) (Xúc tác Ni, 175-190°C) dùng sản xuất bơ nhân tạo (margarine) và xà phòng.",
                     "Sự ôi thiu của chất béo: Liên kết đôi C=C của axit béo không no bị oxi hóa chậm bởi oxi không khí tạo thành peoxit, sau đó phân hủy thành anđehit và xeton có mùi hôi khét độc hại."
                 ]
             }
         ],
         [
             "Ester no đơn chức mạch hở: C_n H₂n O₂ (n ≥ 2)",
             "Thủy phân môi trường axit: R-COO-R' + H₂O ⇌ R-COOH + R'-OH  (H⁺, t°)",
             "Xà phòng hóa: R-COO-R' + NaOH → R-COONa + R'-OH  (t°)",
             "Chất béo (Triglyceride): (R-COO)₃C₃H₅ + 3NaOH → 3R-COONa (Xà phòng) + C₃H₅(OH)₃ (Glycerol)"
         ],
         [
             "CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH  [Xà phòng hóa etyl axetat]",
             "(C₁₇H₃₅COO)₃C₃H₅ (Tristearin) + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃  [Tạo xà phòng]",
             "(C₁₇H₃₃COO)₃C₃H₅ (Triolein lỏng) + 3H₂ → (C₁₇H₃₅COO)₃C₃H₅ (Tristearin rắn)  [Ni, t°]",
             "CH₃COOCH=CH₂ + NaOH → CH₃COONa + CH₃CHO  [Vinyl ester tạo anđehit]"
         ],
         "Tại sao chất béo không no (dầu thực vật) ở thể lỏng còn chất béo no (mỡ động vật) lại ở thể rắn ở điều kiện thường?",
         "Vì các gốc axit béo không no (như Oleic, Linoleic) chứa liên kết đôi C=C cấu hình cis làm mạch carbon bị bẻ cong gấp khúc, cản trở các phân tử xếp chặt khít vào nhau nên lực tương tác Van der Waals yếu dẫn đến nhiệt độ nóng chảy thấp (ở thể lỏng). Ngược lại, gốc axit béo no có mạch thẳng duỗi thẳng xếp khít chặt chẽ nên có lực hút mạnh và nhiệt độ nóng chảy cao (ở thể rắn).",
         ["ETHYL_ACETATE", "TRIGLYCERIDE", "NaOH", "GLYCEROL", "ETHANOL"]),

        (2, 1, "Bài 2: Xà phòng & Chất giặt rửa tổng hợp",
         "Nghiên cứu cơ chế tẩy rửa vết bẩn của xà phòng và chất giặt rửa tổng hợp, so sánh ưu nhược điểm và hành vi của chúng trong môi trường nước cứng.",
         [
             {
                 "heading": "1. Khái niệm & Thành phần Xà phòng",
                 "points": [
                     "Xà phòng là hỗn hợp muối natri hoặc kali của các axit béo (thường là natri stearat C17H35COONa, natri panmitat C15H31COONa) kèm theo chất độn và hương liệu.",
                     "Muối Natri tạo xà phòng bánh rắn thông thường; muối Kali tạo xà phòng lỏng hoặc kem cạo râu mềm mịn."
                 ]
             },
             {
                 "heading": "2. Cấu trúc phân tử & Cơ chế giặt rửa",
                 "points": [
                     "Phân tử chất giặt rửa gồm 2 phần đối lập: Đầu ưa nước phân cực (nhóm -COO⁻Na⁺ hoặc -SO₃⁻Na⁺) và Đuôi kị nước không phân cực (mạch hidrocacbon dài ưa dầu mỡ).",
                     "Cơ chế tẩy rửa: Đuôi kị nước cắm sâu vào vết dầu mỡ trên bề mặt sợi vải, đầu ưa nước hướng ra ngoài dung dịch nước. Khi vò hoặc khuấy, các hạt dầu mỡ bị phân tán thành những hạt micelle siêu nhỏ lơ lửng trong nước và bị cuốn trôi theo dòng nước xả."
                 ]
             },
             {
                 "heading": "3. So sánh Xà phòng và Chất giặt rửa tổng hợp trong Nước cứng",
                 "points": [
                     "Nước cứng là nước chứa nhiều ion Ca²⁺ và Mg²⁺.",
                     "Nhược điểm của xà phòng: Gốc -COO⁻ tạo kết tủa không tan với Ca²⁺ và Mg²⁺ (như (C17H35COO)2Ca ↓) làm mất tác dụng giặt tẩy, bám cặn làm ố vàng vải sợi.",
                     "Ưu điểm của chất giặt rửa tổng hợp (chứa gốc sunfonat R-SO3Na hoặc sunfat R-OSO3Na): Muối của Ca²⁺ và Mg²⁺ với gốc sunfonat tan tốt trong nước nên giặt rửa bình thường và hiệu quả trong cả nước cứng."
                 ]
             }
         ],
         [
             "Cơ chế hạt Micelle: Đuôi ưa dầu cắm vào chất bẩn + Đầu ưa nước hướng ra ngoài",
             "Phản ứng với nước cứng: 2R-COONa + Ca²⁺ → (R-COO)₂Ca ↓ + 2Na⁺ (Gây kết tủa làm mất bọt)"
         ],
         [
             "2C₁₇H₃₅COONa + Ca²⁺ → (C₁₇H₃₅COO)₂Ca ↓ (Kết tủa trắng) + 2Na⁺",
             "R-SO₃Na + Ca²⁺ → Không tạo kết tủa (Tan tốt trong nước cứng)"
         ],
         "Tại sao khi giặt bằng xà phòng thông thường trong nước giếng khoan (nước cứng) thì quần áo thường bị ố vàng và tốn nhiều xà phòng?",
         "Vì các ion Ca2+ và Mg2+ trong nước cứng phản ứng với muối natri của axit béo tạo thành kết tủa canxi stearat / magie stearat không tan lắng đọng làm ố vải và tiêu hao lượng lớn xà phòng trước khi tạo bọt giặt.",
         ["TRIGLYCERIDE", "NaOH", "GLYCEROL", "WATER"]),

        (3, 1, "Bài 3: Luyện tập & Ôn tập chuyên sâu Chương 1: Ester – Lipid",
         "Tổng kết các dạng bài toán cốt lõi: Phản ứng đốt cháy ester, thủy phân hỗn hợp ester, bài toán xà phòng hóa chất béo và định luật bảo toàn khối lượng.",
         [
             {
                 "heading": "1. Các phương pháp giải toán Ester – Lipid",
                 "points": [
                     "Bảo toàn khối lượng trong phản ứng xà phòng hóa: m_este + m_NaOH = m_muối + m_ancol.",
                     "Xà phòng hóa chất béo: n_NaOH = 3 × n_chất béo = 3 × n_glycerol ⇒ m_chất béo + m_NaOH = m_xà phòng + m_glycerol.",
                     "Đốt cháy ester no đơn chức: n_CO2 = n_H2O và n_O2 phản ứng = (3n - 2)/2 × n_este.",
                     "Chỉ số xà phòng hóa: Số mg KOH cần để trung hòa axit tự do và xà phòng hóa hết ester trong 1 gam chất béo."
                 ]
             }
         ],
         [
             "n_NaOH = 3 × n_glycerol",
             "m_chất béo + m_NaOH = m_muối (xà phòng) + m_glycerol",
             "Đốt cháy ester no đơn chức: n_CO₂ = n_H₂O"
         ],
         [
             "(RCOO)₃C₃H₅ + 3NaOH → 3RCOONa + C₃H₅(OH)₃"
         ],
         "Xà phòng hóa hoàn toàn 17,8 gam tristearin (C17H35COO)3C3H5 cần dùng vừa đủ m gam dung dịch NaOH 10%. Tính m và khối lượng glycerol thu được?",
         "n_tristearin = 17,8 / 890 = 0,02 mol ⇒ n_NaOH = 0,02 × 3 = 0,06 mol (2,4g NaOH) ⇒ m_dd NaOH = 2,4 / 10% = 24 gam. n_glycerol = 0,02 mol ⇒ m_glycerol = 0,02 × 92 = 1,84 gam.",
         ["TRIGLYCERIDE", "NaOH", "GLYCEROL", "ETHYL_ACETATE"]),

        (4, 2, "Bài 4: Giới thiệu về Carbohydrate: Glucose & Fructose",
         "Carbohydrate (gluxit, saccarit) là hợp chất hữu cơ tạp chức phổ biến trong tự nhiên. Glucose và Fructose là hai monosaccharide quan trọng nhất cung cấp năng lượng trực tiếp cho sự sống.",
         [
             {
                 "heading": "1. Cấu trúc phân tử Glucose & Fructose",
                 "points": [
                     "Glucose (C6H12O6, M=180) là hợp chất tạp chức: Phân tử dạng mạch hở có 5 nhóm hydroxyl (-OH) kề nhau và 1 nhóm anđehit (-CHO) ở đầu mạch (CH2OH-(CHOH)4-CHO). Trong dung dịch, glucose tồn tại chủ yếu ở dạng mạch vòng α-glucose và β-glucose.",
                     "Fructose (C6H12O6, M=180) là đồng phân của glucose: Mạch hở chứa 5 nhóm -OH và 1 nhóm xeton (>C=O) ở vị trí C2 (CH2OH-CHOH-CHOH-CHOH-CO-CH2OH).",
                     "Trong môi trường kiềm (OH⁻), Fructose và Glucose có khả năng chuyển hóa qua lại thuận nghịch với nhau: Fructose ⇌ Enediol ⇌ Glucose."
                 ]
             },
             {
                 "heading": "2. Tính chất hóa học của Glucose",
                 "points": [
                     "Tính chất của polyalcohol (nhiều nhóm -OH kề nhau): Ở nhiệt độ thường, dung dịch glucose hòa tan kết tủa Cu(OH)2 tạo dung dịch phức đồng-glucose màu xanh lam thẫm đặc trưng.",
                     "Tính chất của aldehyde (nhóm -CHO): Tham gia phản ứng tráng bạc với thuốc thử Tollens [Ag(NH3)2]OH tạo lớp gương bạc sáng loáng bám trên thành ống nghiệm (1 mol Glucose sinh 2 mol Ag kim loại).",
                     "Khử Cu(OH)2 trong môi trường kiềm nóng: Đun nóng với Cu(OH)2/NaOH tạo kết tủa đỏ gạch của đồng(I) oxit Cu2O.",
                     "Oxi hóa bởi dung dịch nước Brom: Glucose làm mất màu nước Brom (tạo axit gluconic CH2OH(CHOH)4COOH). Fructose KHÔNG làm mất màu nước Brom (dùng để phân biệt Glucose và Fructose!).",
                     "Phản ứng lên men rượu: Dưới tác dụng của men zima của nấm men, glucose lên men tạo rượu etylic và khí CO2 (C6H12O6 → 2C2H5OH + 2CO2 ↑)."
                 ]
             }
         ],
         [
             "1 mol Glucose (-CHO) + 2 [Ag(NH₃)₂]OH → 2 mol Ag kim loại ↓ (Tráng gương)",
             "2 C₆H₁₂O₆ + Cu(OH)₂ → [C₆H₁₁O₆]₂Cu (Phức màu xanh lam thẫm) + 2H₂O",
             "Phân biệt Glucose và Fructose bằng nước Brom: Glucose làm mất màu, Fructose thì không"
         ],
         [
             "CH₂OH(CHOH)₄CHO + 2[Ag(NH₃)₂]OH → CH₂OH(CHOH)₄COONH₄ + 2Ag ↓ + 3NH₃ + H₂O",
             "2C₆H₁₂O₆ + Cu(OH)₂ → [C₆H₁₁O₆]₂Cu + 2H₂O  [Xanh lam thẫm ở t° thường]",
             "CH₂OH(CHOH)₄CHO + 2Cu(OH)₂ + NaOH → CH₂OH(CHOH)₄COONa + Cu₂O ↓ (Đỏ gạch) + 3H₂O (t°)",
             "CH₂OH(CHOH)₄CHO + Br₂ + H₂O → CH₂OH(CHOH)₄COOH + 2HBr  [Mất màu nước brom]"
         ],
         "Tại sao Fructose không chứa nhóm anđehit (-CHO) nhưng vẫn tham gia phản ứng tráng bạc với thuốc thử Tollens và khử Cu(OH)2 tạo kết tủa đỏ gạch?",
         "Vì thuốc thử Tollens [Ag(NH3)2]OH và dung dịch Cu(OH)2/NaOH đều có môi trường KIỀM (bazơ). Trong môi trường kiềm, Fructose nhanh chóng bị đồng phân hóa chuyển thành Glucose thông qua trạng thái trung gian enediol, và chính Glucose tạo thành này tham gia phản ứng tráng bạc và tạo kết tủa Cu2O.",
         ["GLUCOSE", "TOLLENS_REAGENT", "CuSO4", "NaOH", "BROMINE"]),

        (5, 2, "Bài 5: Saccharose & Maltose (Disaccharide)",
         "Saccharose (đường mía) và Maltose (đường mạch nha) là hai disaccharide tiêu biểu có công thức phân tử C12H22O11 (M=342). Tìm hiểu cấu trúc liên kết glycoside và tính chất thủy phân.",
         [
             {
                 "heading": "1. Cấu trúc phân tử Saccharose",
                 "points": [
                     "Saccharose gồm một gốc α-glucose và một gốc β-fructose liên kết với nhau qua nguyên tử oxi giữa C1 của glucose và C2 của fructose (liên kết α,β-1,2-glycoside).",
                     "Do cả hai nhóm cacbonyl (nhóm anđehit C1 của glucose và nhóm xeton C2 của fructose) đều đã tham gia tạo liên kết glycoside, nên phân tử Saccharose KHÔNG còn nhóm hemiacetal tự do. Vì vậy, Saccharose là đường KHÔNG có tính khử (không tráng bạc trực tiếp, không làm mất màu nước brom)."
                 ]
             },
             {
                 "heading": "2. Tính chất hóa học của Saccharose",
                 "points": [
                     "Hòa tan Cu(OH)2 ở nhiệt độ thường: Tạo dung dịch phức đồng-saccharose màu xanh lam thẫm trong suốt do có nhiều nhóm -OH kề nhau.",
                     "Phản ứng thủy phân trong môi trường axit: Đun nóng với axit vô cơ (HCl, H2SO4) hoặc có men xúc tác, liên kết glycoside bị bẻ gãy tạo ra hỗn hợp gồm 1 mol Glucose và 1 mol Fructose.",
                     "Hỗn hợp sau thủy phân của Saccharose có khả năng tham gia phản ứng tráng bạc (1 mol Saccharose sau thủy phân tạo ra 1 mol Glucose + 1 mol Fructose tráng gương sinh 4 mol Ag kim loại)."
                 ]
             }
         ],
         [
             "Saccharose: Không tráng bạc trực tiếp, hòa tan Cu(OH)₂ ở t° thường",
             "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ (Glucose) + C₆H₁₂O₆ (Fructose)  (Axit, t°)",
             "1 mol Saccharose bị thủy phân hoàn toàn tráng bạc thu được 4 mol Ag"
         ],
         [
             "2C₁₂H₂₂O₁₁ + Cu(OH)₂ → [C₁₂H₂₁O₁₁]₂Cu + 2H₂O  [Xanh lam thẫm]",
             "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ (Glucose) + C₆H₁₂O₆ (Fructose)  [H⁺, t°]"
         ],
         "Thủy phân hoàn toàn 34,2 gam Saccharose trong dung dịch axit loãng, sau đó trung hòa axit dư rồi cho toàn bộ sản phẩm tác dụng với lượng dư thuốc thử Tollens. Tính khối lượng Ag kết tủa thu được?",
         "n_Saccharose = 34,2 / 342 = 0,1 mol. Thủy phân hoàn toàn sinh ra 0,1 mol Glucose và 0,1 mol Fructose. Toàn bộ tráng bạc: n_Ag = 2 × n_Glucose + 2 × n_Fructose = 4 × n_Saccharose = 0,4 mol ⇒ m_Ag = 0,4 × 108 = 43,2 gam.",
         ["GLUCOSE", "HCl", "TOLLENS_REAGENT", "CuSO4", "NaOH"]),

        (6, 2, "Bài 6: Tinh bột & Cellulose (Polysaccharide)",
         "Tinh bột và Cellulose là các polymer thiên nhiên có công thức tổng quát (C6H10O5)n. Khám phá cấu trúc nhánh amylopectin, cấu trúc sợi cellulose và phản ứng màu của Iot.",
         [
             {
                 "heading": "1. Tinh bột (Starch)",
                 "points": [
                     "Tinh bột gồm 2 thành phần: Amylose (chiếm 20-30%, gồm các gốc α-glucose liên kết α-1,4-glycoside tạo chuỗi xoắn không phân nhánh) và Amylopectin (chiếm 70-80%, có thêm liên kết α-1,6-glycoside tạo mạng phân nhánh phức tạp).",
                     "Phản ứng màu đặc trưng với Iot (I2): Phân tử Iot chui lọt vào bên trong cấu trúc chuỗi xoắn của amylose tạo thành hợp chất bọc có màu XANH TÍM đặc trưng. Khi đun nóng, cấu trúc xoắn bị duỗi thẳng làm Iot thoát ra ngoài khiến màu xanh tím biến mất; khi để nguội, chuỗi xoắn lại và màu xanh tím xuất hiện trở lại.",
                     "Thủy phân: Tinh bột bị thủy phân bởi men amilaza trong nước bọt hoặc axit vô cơ đun nóng qua các giai đoạn trung gian (đextrin, mantozo) và cuối cùng thành Glucose."
                 ]
             },
             {
                 "heading": "2. Cellulose (Xenlulozơ)",
                 "points": [
                     "Cellulose là thành phần chính tạo nên màng tế bào thực vật (gỗ chiếm 50%, sợi bông nõn chiếm 98%).",
                     "Cấu tạo: Gồm rất nhiều gốc β-glucose liên kết với nhau bằng liên kết β-1,4-glycoside tạo thành mạch kéo dài không phân nhánh, không xoắn. Mỗi mắt xích C6H10O5 còn 3 nhóm hydroxyl tự do nên có thể viết là [C6H7O2(OH)3]n.",
                     "Phản ứng với Axit Nitric (HNO3 đặc): [C6H7O2(OH)3]n + 3nHNO3 → [C6H7O2(ONO2)3]n (Cellulose trinitrat / Thuốc súng không khói) + 3nH2O (Xúc tác H2SO4 đặc, đun nóng).",
                     "Hòa tan trong nước Svayze [Cu(NH3)4](OH)2: Tạo dung dịch nhớt dùng để kéo thành sợi tơ nhân tạo (tơ visco, tơ axetat, tơ đồng-amoniac)."
                 ]
             }
         ],
         [
             "Nhận biết tinh bột: Dung dịch I₂ → Hợp chất màu XANH TÍM (mất màu khi đun, hiện lại khi nguội)",
             "Cellulose trinitrat (Thuốc súng không khói): [C₆H₇O₂(OH)₃]_n + 3n HNO₃ → [C₆H₇O₂(ONO₂)₃]_n + 3n H₂O",
             "Thủy phân hoàn toàn tinh bột/cellulose: (C₆H₁₀O₅)_n + n H₂O → n C₆H₁₂O₆ (Glucose)"
         ],
         [
             "Tinh bột + I₂ ⇌ Hợp chất màu xanh tím  [Hiện tượng bọc phân tử Iot]",
             "[C₆H₇O₂(OH)₃]_n + 3nHNO₃ → [C₆H₇O₂(ONO₂)₃]_n (Thuốc súng không khói) + 3nH₂O  [H₂SO₄ đặc, t°]"
         ],
         "Tại sao con người có thể tiêu hóa được tinh bột (cơm, khoai) nhưng không thể tiêu hóa được cellulose (cỏ, rơm rạ) dù cả hai đều cấu tạo từ các mắt xích glucose?",
         "Vì trong hệ tiêu hóa của người chỉ có enzyme amylase có khả năng xúc tác thủy phân liên kết α-1,4-glycoside (trong tinh bột), mà không có enzyme cellulase để thủy phân liên kết β-1,4-glycoside (trong cellulose). Động vật ăn cỏ tiêu hóa được cellulose nhờ các vi sinh vật cộng sinh trong dạ dày tiết ra enzyme cellulase.",
         ["GLUCOSE", "HNO3", "H2SO4", "CuSO4", "NH3"]),

        (7, 2, "Bài 7: Luyện tập & Tổng kết Chương 2: Carbohydrate",
         "Hệ thống hóa toàn bộ bảng so sánh cấu trúc, phản ứng đặc trưng và phương pháp nhận biết các loại đường Carbohydrate.",
         [
             {
                 "heading": "1. Bảng nhận diện Carbohydrate cốt lõi",
                 "points": [
                     "Glucose: Có phản ứng tráng bạc, hòa tan Cu(OH)2 tạo phức xanh lam, làm mất màu nước Brom.",
                     "Fructose: Có tráng bạc trong môi trường kiềm, hòa tan Cu(OH)2, KHÔNG làm mất màu nước Brom.",
                     "Saccharose: Không tráng bạc trực tiếp, hòa tan Cu(OH)2, thủy phân sinh Glucose + Fructose tráng bạc được.",
                     "Tinh bột: Không tráng bạc, tạo màu xanh tím với dung dịch Iot.",
                     "Cellulose: Tác dụng HNO3 đặc tạo thuốc súng không khói, tan trong nước Svayze."
                 ]
             }
         ],
         [
             "Bảng nhận biết: Nước Brom (Glucose) | Dung dịch I₂ (Tinh bột) | Thuốc thử Tollens (Glucose, Fructose)"
         ],
         [
             "Glucose + Br₂ + H₂O → Axit gluconic + 2HBr",
             "Tinh bột + I₂ → Hợp chất màu xanh tím"
         ],
         "Trình bày phương pháp hóa học phân biệt 4 dung dịch mất nhãn: Glucose, Saccharose, Glycerol, Hồ tinh bột?",
         "Bước 1: Nhỏ dung dịch Iot (I2) nhận biết Hồ tinh bột (chuyển màu xanh tím). Bước 2: Dùng thuốc thử Tollens [Ag(NH3)2]OH đun nhẹ nhận biết Glucose (xuất hiện kết tủa gương bạc sáng loáng). Bước 3: Đun nóng 2 mẫu còn lại với dung dịch axit HCl rồi trung hòa kiềm và thử lại bằng thuốc thử Tollens, mẫu nào sinh ra kết tủa gương bạc là Saccharose (bị thủy phân tạo đường khử), mẫu không phản ứng là Glycerol.",
         ["GLUCOSE", "TOLLENS_REAGENT", "CuSO4", "NaOH", "BROMINE"]),

        (8, 3, "Bài 8: Amine (Amin) – Phân loại, Cấu trúc & Tính bazơ",
         "Amine là dẫn xuất khi thay thế nguyên tử hydro trong phân tử NH3 bằng gốc hiđrocacbon. Tìm hiểu tính bazơ, bậc amin và phản ứng đặc trưng của Aniline.",
         [
             {
                 "heading": "1. Khái niệm, Phân loại & Bậc của Amine",
                 "points": [
                     "Bậc của amine được tính bằng số nguyên tử H trong phân tử NH3 bị thay thế bởi gốc hiđrocacbon: Bậc 1 (R-NH2), Bậc 2 (R-NH-R'), Bậc 3 (R-N(R')-R'').",
                     "Phân loại theo gốc hidrocacbon: Amine béo (no, mạch hở như Metylamin CH3NH2, Etylamin C2H5NH2) và Amine thơm (như Aniline C6H5NH2).",
                     "Tên thông thường: Tên gốc hiđrocacbon + 'amin' (CH3NH2: Metylamin; (CH3)2NH: Đimetylamin; (CH3)3N: Trimetylamin; C6H5NH2: Anilin)."
                 ]
             },
             {
                 "heading": "2. Tính chất vật lí & Tính bazơ của Amine",
                 "points": [
                     "Metylamin, đimetylamin, trimetylamin và etylamin là những chất khí ở nhiệt độ phòng, có mùi khai khó chịu độc hại, tan nhiều trong nước.",
                     "Tính bazơ: Do nguyên tử N trong nhóm amine còn 1 cặp electron chưa liên kết tự do có khả năng nhận proton H⁺.",
                     "So sánh độ mạnh tính bazơ: Amin béo bậc 2 > Amin béo bậc 1 > NH3 > Amin thơm (Anilin C6H5NH2). Ví dụ: (CH3)2NH > CH3NH2 > NH3 > C6H5NH2.",
                     "Các amine béo làm quỳ tím chuyển sang màu xanh và phenolphtalein chuyển sang màu hồng. Aniline có tính bazơ rất yếu do vòng benzen hút electron nên KHÔNG làm đổi màu quỳ tím."
                 ]
             },
             {
                 "heading": "3. Phản ứng đặc trưng của Aniline (C6H5NH2)",
                 "points": [
                     "Tác dụng với dung dịch axit mạnh: C6H5NH2 (ít tan trong nước) + HCl → C6H5NH3Cl (Phenylamoni clorua tan trong suốt).",
                     "Phản ứng thế trên nhân thơm với nước Brom: Nhóm -NH2 đẩy electron làm tăng mật độ e ở vị trí ortho và para. Aniline tác dụng ngay với nước Brom ở nhiệt độ phòng tạo kết tủa trắng 2,4,6-tribromanilin (dùng để nhận biết Aniline!)."
                 ]
             }
         ],
         [
             "Bậc của amine = Số gốc hidrocacbon liên kết với N",
             "So sánh tính bazơ: CH₃-NH-CH₃ > CH₃NH₂ > NH₃ > C₆H₅NH₂ (Anilin)",
             "Nhận biết Anilin: Tác dụng nước Brom → Kết tủa trắng 2,4,6-tribromanilin"
         ],
         [
             "CH₃NH₂ + HCl → CH₃NH₃Cl  [Tạo muối metylamoni clorua]",
             "C₆H₅NH₂ + 3Br₂ → C₆H₂Br₃NH₂ ↓ (Kết tủa trắng) + 3HBr  [Nhận biết anilin]"
         ],
         "Tại sao Aniline không làm đổi màu giấy quỳ tím nhưng vẫn là một bazơ, và làm thế nào để rửa sạch ống nghiệm dính Aniline?",
         "Aniline không đổi màu quỳ vì có vòng benzen hút electron làm giảm mạnh mật độ electron trên nguyên tử nitơ, khiến tính bazơ của nó rất yếu (yếu hơn NH3). Để rửa sạch ống nghiệm dính aniline (không tan trong nước), ta tráng ống nghiệm bằng dung dịch axit clohidric (HCl) để chuyển aniline thành muối phenylamoni clorua (C6H5NH3Cl) tan hoàn toàn trong nước, sau đó rửa lại bằng nước sạch.",
         ["NH3", "BROMINE", "HCl", "NaOH"]),

        (9, 3, "Bài 9: Amino Acid & Peptide (Cấu trúc Lưỡng tính & Liên kết Peptit)",
         "Amino acid là hợp chất hữu cơ tạp chức chứa đồng thời nhóm amino (-NH2) và nhóm cacboxyl (-COOH). Peptide là chuỗi các α-amino acid tạo tiền đề hình thành sự sống.",
         [
             {
                 "heading": "1. Cấu trúc lưỡng cực & Tính chất của Amino Acid",
                 "points": [
                     "Các amino acid thiên nhiên hầu hết là α-amino acid (nhóm -NH2 gắn ở carbon số 2 cạnh -COOH).",
                     "5 Amino acid chuẩn cần thuộc nằm lòng: Glycine (H2N-CH2-COOH, M=75), Alanine (CH3-CH(NH2)-COOH, M=89), Valine ((CH3)2CH-CH(NH2)-COOH, M=117), Axit Glutamic (HOOC-CH2-CH2-CH(NH2)-COOH, M=147, có 2 -COOH làm quỳ tím hóa đỏ), Lysine (H2N-(CH2)4-CH(NH2)-COOH, M=146, có 2 -NH2 làm quỳ tím hóa xanh).",
                     "Ở trạng thái rắn và trong dung dịch, amino acid tồn tại dưới dạng ion lưỡng cực H3N⁺-R-COO⁻ nên có nhiệt độ nóng chảy rất cao, tan tốt trong nước và có vị hơi ngọt.",
                     "Tính chất lưỡng tính: Vừa tác dụng với axit mạnh (nhờ nhóm -NH2), vừa tác dụng với bazơ mạnh (nhờ nhóm -COOH)."
                 ]
             },
             {
                 "heading": "2. Khái niệm Peptide & Liên kết Peptit",
                 "points": [
                     "Liên kết peptit là liên kết -CO-NH- giữa hai đơn vị α-amino acid.",
                     "Peptide là hợp chất chứa từ 2 đến 50 gốc α-amino acid liên kết với nhau bằng các liên kết peptit.",
                     "Phân loại: Oligopeptide (gồm 2 đến 10 gốc, ví dụ: Dipeptide gồm 2 gốc và 1 liên kết peptit; Tripeptide gồm 3 gốc và 2 liên kết peptit); Polypeptide (gồm 11 đến 50 gốc).",
                     "Phản ứng màu Biuret: Trong môi trường kiềm, các peptide có từ 2 liên kết peptit trở lên (tức là từ Tripeptide trở lên) tác dụng với Cu(OH)2 tạo thành phức chất màu TÍM đặc trưng. Dipeptide KHÔNG cho phản ứng màu Biuret."
                 ]
             }
         ],
         [
             "Tính chất lưỡng tính: H₂N-R-COOH + HCl → ClH₃N-R-COOH; H₂N-R-COOH + NaOH → H₂N-R-COONa + H₂O",
             "Số liên kết peptit = Số mắt xích α-amino acid - 1",
             "Phản ứng màu Biuret: Peptide từ 2 liên kết peptit (Tripeptide trở lên) + Cu(OH)₂ → Phức chất màu TÍM"
         ],
         [
             "H₂N-CH₂-COOH + HCl → ClH₃N-CH₂-COOH  [Tác dụng axit]",
             "H₂N-CH₂-COOH + NaOH → H₂N-CH₂-COONa + H₂O  [Tác dụng bazơ]",
             "H₂N-CH₂-CO-NH-CH(CH₃)-COOH + 2NaOH → H₂N-CH₂-COONa + H₂N-CH(CH₃)-COONa + H₂O  [Thủy phân dipeptide]"
         ],
         "Dung dịch các amino acid sau làm quỳ tím đổi màu như thế nào: Glycine, Axit Glutamic, Lysine?",
         "Glycine (1 nhóm -NH2, 1 nhóm -COOH) không làm đổi màu quỳ tím (môi trường gần như trung tính pH ≈ 6). Axit Glutamic (1 nhóm -NH2, 2 nhóm -COOH) làm quỳ tím hóa ĐỎ (tính axit chiếm ưu thế). Lysine (2 nhóm -NH2, 1 nhóm -COOH) làm quỳ tím hóa XANH (tính bazơ chiếm ưu thế).",
         ["CuSO4", "NaOH", "HCl"]),

        (10, 3, "Bài 10: Protein & Enzyme (Chất đạm & Xúc tác sinh học)",
         "Protein là nền tảng vật chất của mọi sự sống. Tìm hiểu cấu trúc bậc của protein, hiện tượng đông tụ và cơ chế xúc tác enzyme.",
         [
             {
                 "heading": "1. Cấu tạo & Tính chất của Protein",
                 "points": [
                     "Protein là những polypeptide cao phân tử có phân tử khối từ vài vạn đến vài triệu amu, gồm nhiều chuỗi polypeptide cuộn gập tạo cấu trúc không gian phức tạp (bậc 1 đến bậc 4).",
                     "Hiện tượng đông tụ: Dưới tác dụng của nhiệt độ cao, axit, kiềm hoặc muối kim loại nặng, cấu trúc không gian của protein bị phá vỡ khiến protein bị vón cục kết tủa lại (ví dụ: nấu canh riêu cua, lòng trắng trứng luộc chín).",
                     "Phản ứng màu Biuret: Tất cả các protein đều tác dụng với Cu(OH)2 trong môi trường kiềm tạo hợp chất phức màu TÍM đặc trưng.",
                     "Phản ứng Xanthoproteic: Nhỏ axit nitric đặc (HNO3 đặc) vào protein (lòng trắng trứng) xuất hiện kết tủa màu VÀNG do phản ứng nitro hóa các vòng benzen của axit amin thơm (tyrosine, phenylalanine)."
                 ]
             },
             {
                 "heading": "2. Enzyme (Chất xúc tác sinh học)",
                 "points": [
                     "Hầu hết enzyme là các protein có khả năng xúc tác cho các phản ứng sinh hóa trong cơ thể với hiệu năng cực cao (làm tăng tốc độ phản ứng lên hàng triệu lần) và có tính chọn lọc tuyệt đối (mỗi enzyme chỉ xúc tác cho một phản ứng duy nhất)."
                 ]
             }
         ],
         [
             "Sự đông tụ protein: Do nhiệt độ, axit, bazơ, rượu",
             "Phản ứng nhận biết Protein: Phản ứng Biuret (Cu(OH)₂ → Màu Tím); Phản ứng với HNO₃ đặc (Màu Vàng)"
         ],
         [
             "Protein + Cu(OH)₂ / NaOH → Phức chất màu TÍM đặc trưng",
             "Protein + HNO₃ (đặc) → Kết tủa màu VÀNG (Phản ứng xanthoproteic)"
         ],
         "Giải thích hiện tượng khi nấu canh cua đồng, gạch cua nổi lên thành từng mảng lớn trên mặt nước?",
         "Trong thịt cua đồng chứa hàm lượng lớn protein hòa tan. Khi đun sôi nước canh, nhiệt độ cao làm đứt gãy các liên kết không gian giữ cấu trúc protein, khiến protein bị biến tính và đông tụ lại thành các mảng xốp nhẹ nổi lên trên mặt nước canh.",
         ["HNO3", "CuSO4", "NaOH", "ETHANOL"]),

        (11, 3, "Bài 11: Luyện tập & Tổng kết Chương 3: Hợp chất chứa Nitrogen",
         "Tổng kết các dạng bài tập amin, amino acid, bài toán thủy phân peptide và phương pháp bảo toàn khối lượng.",
         [
             {
                 "heading": "1. Phương pháp giải bài toán Peptide",
                 "points": [
                     "Thủy phân hoàn toàn 1 mol n-peptide: Cần (n - 1) mol H2O và n mol NaOH.",
                     "Bảo toàn khối lượng: m_peptide + m_H2O = m_amino acid; hoặc m_peptide + m_NaOH = m_muối + m_H2O (với n_H2O = n_peptide)."
                 ]
             }
         ],
         [
             "m_peptide + m_NaOH = m_muối + m_H₂O (với n_H₂O = n_peptide)",
             "n_HCl phản ứng = Tổng số nhóm -NH₂; n_NaOH phản ứng = Tổng số nhóm -COOH"
         ],
         [
             "Gly-Ala-Val + 3NaOH → Gly-Na + Ala-Na + Val-Na + H₂O"
         ],
         "Thủy phân hoàn toàn 0,1 mol tripeptide Gly-Ala-Val bằng 400mL dung dịch NaOH 1M. Cô cạn dung dịch sau phản ứng thu được bao nhiêu gam chất rắn khan?",
         "n_NaOH ban đầu = 0,4 mol. n_NaOH phản ứng = 3 × 0,1 = 0,3 mol ⇒ NaOH dư = 0,1 mol (4g). M_tripeptide = 75 + 89 + 117 - 2×18 = 245 g/mol ⇒ m_tripeptide = 24,5g. n_H2O sinh ra = n_peptide = 0,1 mol (1,8g). Bảo toàn khối lượng: m_chất rắn = m_peptide + m_NaOH ban đầu - m_H2O = 24,5 + (0,4 × 40) - 1,8 = 38,7 gam.",
         ["CuSO4", "NaOH", "HCl", "HNO3"]),

        (12, 4, "Bài 12: Đại cương về Polymer (Khái niệm, Cấu trúc & Tổng hợp)",
         "Polymer là hợp chất có phân tử khối rất lớn tạo nên từ nhiều mắt xích monomer. Tìm hiểu phản ứng trùng hợp, trùng ngưng và phân loại chất dẻo, tơ, cao su.",
         [
             {
                 "heading": "1. Khái niệm & Phân loại Polymer",
                 "points": [
                     "Phân tử khối M_polime = n × M_mắt xích (trong đó n là hệ số polymer hóa).",
                     "Phân loại theo nguồn gốc: Polymer thiên nhiên (Tinh bột, Cellulose, Tơ tằm, Cao su thiên nhiên); Polymer tổng hợp (Nhựa PE, PVC, Tơ nilon-6,6); Polymer bán tổng hợp / nhân tạo (Tơ visco, tơ axetat chế hóa từ cellulose thiên nhiên).",
                     "Phân loại theo cấu trúc mạch: Mạch không phân nhánh (PE, PVC, Amylose); Mạch phân nhánh (Amylopectin, Glicogen); Mạng không gian 3 chiều (Cao su lưu hóa, Nhựa bakelite màng rezit)."
                 ]
             },
             {
                 "heading": "2. Phương pháp tổng hợp: Trùng hợp vs Trùng ngưng",
                 "points": [
                     "Phản ứng trùng hợp: Quá trình kết hợp nhiều phân tử nhỏ (monomer) giống nhau hay tương tự nhau thành phân tử rất lớn (polymer). Điều kiện: Monomer phải chứa liên kết đôi C=C (hoặc vòng kém bền). Ví dụ: Trùng hợp Etylen tạo Polyetylen (PE); Trùng hợp Vinyl clorua tạo Poly(vinyl clorua) (PVC); Trùng hợp Styren tạo Polystyren (PS).",
                     "Phản ứng trùng ngưng: Quá trình kết hợp nhiều phân tử monomer thành polymer đồng thời giải phóng các phân tử nhỏ khác (chủ yếu là H2O). Điều kiện: Monomer phải chứa ít nhất 2 nhóm chức có khả năng phản ứng. Ví dụ: Trùng ngưng axit adipic với hexametylendiamin tạo Tơ Nilon-6,6; Trùng ngưng axit terephtalic với etylen glycol tạo Tơ Lapsan."
                 ]
             }
         ],
         [
             "Trùng hợp: n CH₂=CH-X → (-CH₂-CH(X)-)_n (Cần liên kết đôi C=C)",
             "Trùng ngưng: n H₂N-(CH₂)₅-COOH → (-NH-(CH₂)₅-CO-)_n (Tơ nilon-6) + n H₂O",
             "M_polime = n × M_mắt xích"
         ],
         [
             "n CH₂=CH₂ → (-CH₂-CH₂-)_n  [Nhựa PE]",
             "n CH₂=CHCl → (-CH₂-CHCl-)_n  [Nhựa PVC]",
             "n H₂N-(CH₂)₆-NH₂ + n HOOC-(CH₂)₄-COOH → (-NH-(CH₂)₆-NH-CO-(CH₂)₄-CO-)_n + 2nH₂O  [Tơ Nilon-6,6]"
         ],
         "Phân biệt rõ điều kiện cấu tạo của monomer tham gia phản ứng trùng hợp và phản ứng trùng ngưng?",
         "Để tham gia phản ứng TRÙNG HỢP, phân tử monomer bắt buộc phải có liên kết đôi C=C (như etilen, vinyl clorua) hoặc vòng kém bền có thể mở vòng. Để tham gia phản ứng TRÙNG NGƯNG, phân tử monomer bắt buộc phải có ít nhất 2 nhóm chức có khả năng phản ứng tương tác với nhau (như -COOH, -NH2, -OH) để liên kết tạo mạch và tách ra phân tử nhỏ H2O.",
         ["ETHANOL", "CARBON"]),

        (13, 4, "Bài 13: Vật liệu Polymer: Chất dẻo, Tơ, Cao su & Keo dán",
         "Khám phá các loại vật liệu polymer cách mạng hóa nền công nghiệp hiện đại: Thủy tinh hữu cơ Plexiglas, Tơ nilon chống đạn, Cao su lưu hóa và Keo dán epoxy.",
         [
             {
                 "heading": "1. Chất dẻo (Plastics)",
                 "points": [
                     "Polyetylen (PE): Màng bọc thực phẩm, túi nilon, chai lọ dẻo.",
                     "Poly(vinyl clorua) (PVC): Ống dẫn nước, vỏ bọc dây điện cách điện, da nhân tạo.",
                     "Poly(metyl metacrylat) (PMMA / Thủy tinh hữu cơ Plexiglas): Trùng hợp metyl metacrylat (CH2=C(CH3)COOCH3) tạo khối polymer trong suốt, truyền sáng 92%, không vỡ vụn dùng làm kính máy bay, kính bảo hộ, răng giả.",
                     "Teflon (-CF2-CF2-)n: Trùng hợp tetrafloetilen, chịu nhiệt và trơ với mọi hóa chất dùng làm lớp chống dính chảo."
                 ]
             },
             {
                 "heading": "2. Tơ (Fibers)",
                 "points": [
                     "Tơ poliamit (Nilon-6,6; Nilon-6; Nilon-7): Chứa các liên kết peptit -CO-NH- dai, bền, óng mượt, giữ nhiệt tốt nhưng kém bền trong môi trường axit và kiềm (không giặt bằng xà phòng kiềm đặc hoặc nước sôi!).",
                     "Tơ vinylic (Tơ nitron / olon): Trùng hợp vinyl xianua (CH2=CH-CN) có tính giữ nhiệt cao dùng dệt áo len ấm mùa đông."
                 ]
             },
             {
                 "heading": "3. Cao su & Kỹ thuật Lưu hóa cao su",
                 "points": [
                     "Cao su là vật liệu polymer có tính đàn hồi cao (biến dạng khi chịu lực và trở lại hình dạng ban đầu khi thôi tác dụng).",
                     "Cao su thiên nhiên: Polyisopren có cấu hình cis.",
                     "Cao su Buna (Polybutadien) và Cao su Buna-S, Buna-N tổng hợp.",
                     "Lưu hóa cao su: Đun nóng cao su sống với lưu huỳnh (S) ở 140°C tạo các cầu nối đisunfua -S-S- nối các mạch polymer thẳng thành mạng không gian 3 chiều giúp cao su lưu hóa có độ đàn hồi vượt trội, chịu ma sát tốt và khó bị mòn hơn nhiều (dùng làm lốp xe)."
                 ]
             }
         ],
         [
             "Plexiglas (PMMA): Trùng hợp CH₂=C(CH₃)COOCH₃ (Metyl metacrylat)",
             "Tơ Poliamit (Nilon-6,6): Kém bền trong môi trường axit và kiềm mạnh",
             "Cao su lưu hóa: Cầu nối đisunfua -S-S- tạo mạng không gian 3D đàn hồi cao"
         ],
         [
             "n CH₂=C(CH₃)COOCH₃ → (-CH₂-C(CH₃)(COOCH₃)-)_n  [Thủy tinh hữu cơ Plexiglas]",
             "n CH₂=CH-CH=CH₂ → (-CH₂-CH=CH-CH₂-)_n  [Cao su Buna]"
         ],
         "Tại sao người ta không dùng xà phòng có độ kiềm cao hoặc nước quá nóng để giặt quần áo may bằng tơ nilon, tơ tằm?",
         "Vì tơ tằm (protein) và tơ nilon (poliamit) đều chứa các liên kết amit/peptit -CO-NH- trong mạch polymer. Các liên kết này rất dễ bị thủy phân cắt đứt mạch trong môi trường kiềm mạnh hoặc nhiệt độ cao, làm cho vải sợi bị mủn rách, co rút và mất độ bền.",
         ["TRIGLYCERIDE", "NaOH", "WATER"]),

        (14, 4, "Bài 14: Luyện tập & Tổng kết Chương 4: Polymer",
         "Hệ thống hóa nhận diện monomer, phân loại tơ, trùng hợp và bài toán hiệu suất tổng hợp polymer.",
         [
             {
                 "heading": "1. Tổng kết phân loại Polymer",
                 "points": [
                     "Tơ thiên nhiên: Tơ tằm, bông gai, len lông cừu.",
                     "Tơ bán tổng hợp (nhân tạo): Tơ visco, tơ axetat (chế tạo từ cellulose).",
                     "Tơ tổng hợp: Nilon-6,6; Nilon-6; Tơ lapsan; Tơ nitron (olon)."
                 ]
             }
         ],
         [
             "M_polime = n × M_mắt xích"
         ],
         [
             "n CH₂=CHCl → (-CH₂-CHCl-)_n"
         ],
         "Để sản xuất 1 tấn nhựa PVC với hiệu suất cả quá trình đạt 80% thì cần dùng bao nhiêu thể tích khí etilen (C2H4) ở đkc (25°C, 1 bar)?",
         "Sơ đồ: C2H4 (M=28) ➔ C2H3Cl ➔ PVC (M=62,5). m_C2H4 lí thuyết = 1 × 28 / 62,5 = 0,448 tấn. Vì H=80% ⇒ m_C2H4 thực tế = 0,448 / 80% = 0,56 tấn = 560.000 gam ⇒ n_C2H4 = 560.000 / 28 = 20.000 mol ⇒ V_C2H4 = 20.000 × 24,79 = 495.800 Lít = 495,8 m³.",
         ["ETHANOL", "CARBON"]),

        (15, 5, "Bài 15: Thế điện cực & Nguồn điện hóa học (Pin Galvani)",
         "Pin điện hóa biến đổi hóa năng thành điện năng thông qua phản ứng oxi hóa - khử tự diễn biến. Tìm hiểu cặp oxi hóa - khử, dãy thế điện cực chuẩn và tính suất điện động của pin.",
         [
             {
                 "heading": "1. Cặp oxi hóa - khử & Thế điện cực chuẩn E°",
                 "points": [
                     "Dạng oxi hóa và dạng khử của cùng một nguyên tố tạo thành cặp oxi hóa - khử M^(n+)/M (ví dụ: Zn²⁺/Zn, Cu²⁺/Cu, Ag⁺/Ag).",
                     "Thế điện cực chuẩn E° đo ở nồng độ ion 1M, nhiệt độ 25°C so với điện cực hydro chuẩn (E°(2H⁺/H2) = 0,00 V).",
                     "Ý nghĩa của E°: Giá trị E° càng âm thì dạng khử càng mạnh (kim loại có tính khử mạnh dễ nhường e); giá trị E° càng dương thì dạng oxi hóa càng mạnh (ion kim loại có tính oxi hóa mạnh dễ nhận e)."
                 ]
             },
             {
                 "heading": "2. Cấu tạo & Cơ chế hoạt động của Pin Galvani (Zn – Cu)",
                 "points": [
                     "Anot (Cực âm - Kim loại có E° nhỏ hơn): Xảy ra quá trình OXI HÓA Zn → Zn²⁺ + 2e (Kẽm tan ra).",
                     "Catot (Cực dương - Kim loại có E° lớn hơn): Xảy ra quá trình KHỬ Cu²⁺ + 2e → Cu (Đồng kim loại bám vào cực).",
                     "Cầu muối (chứa dung dịch KNO3 hoặc KCl): Cân bằng điện tích cho 2 cốc dung dịch (Anion NO3⁻ di chuyển về Anot, Cation K⁺ di chuyển về Catot).",
                     "Suất điện động chuẩn của pin: E°_pin = E°_catot (dương) - E°_anot (âm) = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = +0,34 - (-0,76) = +1,10 V."
                 ]
             },
             {
                 "heading": "3. Quy tắc Alpha (α) xác định chiều phản ứng",
                 "points": [
                     "Xếp 2 cặp oxh/khử theo chiều E° tăng dần từ trái sang phải: Fe²⁺/Fe ... Cu²⁺/Cu.",
                     "Phản ứng tự xảy ra giữa chất oxi hóa mạnh hơn với chất khử mạnh hơn tạo ra chất oxi hóa yếu hơn và chất khử yếu hơn: Cu²⁺ (oxh mạnh) + Fe (khử mạnh) → Fe²⁺ (oxh yếu) + Cu (khử yếu)."
                 ]
             }
         ],
         [
             "Suất điện động chuẩn: E°_pin = E°_catot - E°_anot > 0",
             "Pin Zn - Cu: E°_pin = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = 0,34 - (-0,76) = +1,10 V",
             "Quy tắc alpha: Dạng oxh mạnh hơn + Dạng khử mạnh hơn → Dạng oxh yếu hơn + Dạng khử yếu hơn"
         ],
         [
             "Anot (-): Zn → Zn²⁺ + 2e  [Quá trình oxi hóa kẽm]",
             "Catot (+): Cu²⁺ + 2e → Cu  [Quá trình khử ion đồng]",
             "Phản ứng tổng quát trong pin: Zn + Cu²⁺ → Zn²⁺ + Cu  [E°_pin = +1,10V]"
         ],
         "Cho biết E°(Mg2+/Mg) = -2,37V và E°(Ag+/Ag) = +0,80V. Hãy lập sơ đồ pin điện hóa, viết phản ứng ở các điện cực và tính suất điện động chuẩn E°_pin?",
         "Cực âm (Anot) là thanh Mg: Mg → Mg²⁺ + 2e. Cực dương (Catot) là thanh Ag: Ag⁺ + 1e → Ag. Sơ đồ pin: (-) Mg | Mg²⁺ (1M) || Ag⁺ (1M) | Ag (+). Phản ứng tổng: Mg + 2Ag⁺ → Mg²⁺ + 2Ag. Suất điện động chuẩn E°_pin = E°(Ag+/Ag) - E°(Mg2+/Mg) = 0,80 - (-2,37) = +3,17 V.",
         ["Zn", "CuSO4", "Fe", "Cu", "AgNO3"]),

        (16, 5, "Bài 16: Điện phân (Electrolysis – Dung dịch & Nóng chảy)",
         "Điện phân là quá trình oxi hóa - khử cưỡng bức xảy ra trên bề mặt các điện cực dưới tác dụng của dòng điện một chiều. Nắm vững thứ tự phóng điện và định luật Faraday.",
         [
             {
                 "heading": "1. Nguyên tắc & Quy luật Điện phân",
                 "points": [
                     "Cực âm (Catot nối cực âm nguồn điện): Hút cation, xảy ra quá trình KHỬ (nhận e). Thứ tự khử ở Catot: Cation oxh mạnh khử trước: Ag⁺ > Fe³⁺ > Cu²⁺ > H⁺ > Fe²⁺ > Zn²⁺ > H2O (Cation kim loại từ Al³⁺ trở về trước không bị khử trong dung dịch nước mà H2O bị khử: 2H2O + 2e → H2 ↑ + 2OH⁻).",
                     "Cực dương (Anot nối cực dương nguồn điện): Hút anion, xảy ra quá trình OXI HÓA (nhường e). Thứ tự oxh ở Anot trơ: S²⁻ > I⁻ > Br⁻ > Cl⁻ > H2O (Các gốc chứa oxi như SO4²⁻, NO3⁻ không bị oxi hóa trong dung dịch nước mà H2O bị oxi hóa: 2H2O → O2 ↑ + 4H⁺ + 4e)."
                 ]
             },
             {
                 "heading": "2. Định luật định lượng Faraday",
                 "points": [
                     "Khối lượng chất giải phóng ở điện cực: m = (A × I × t) / (n × F) (trong đó: A là khối lượng mol, I là cường độ dòng điện Ampe, t là thời gian giây, n là số e trao đổi, F = 96500 C/mol là hằng số Faraday).",
                     "Số mol electron trao đổi: n_e = (I × t) / F = Σ (n_chất × số e trao đổi)."
                 ]
             },
             {
                 "heading": "3. Ứng dụng công nghiệp của Điện phân",
                 "points": [
                     "Sản xuất kim loại mạnh (Na, Mg, Al): Bắt buộc dùng phương pháp điện phân nóng chảy muối hoặc oxit.",
                     "Tinh luyện đồng tinh khiết (dùng Anot tan bằng đồng thô).",
                     "Mạ điện: Mạ vàng, bạc, crom lên đồ trang sức và linh kiện để chống ăn mòn và tăng tính thẩm mĩ."
                 ]
             }
         ],
         [
             "Định luật Faraday: m = (A × I × t) / (n × F)  (F = 96500 C/mol)",
             "Số mol electron trao đổi: n_e = (I × t) / F",
             "Điện phân nóng chảy NaCl: 2NaCl → 2Na + Cl₂ ↑",
             "Điện phân dung dịch CuSO₄: 2CuSO₄ + 2H₂O → 2Cu ↓ (Catot) + O₂ ↑ (Anot) + 2H₂SO₄"
         ],
         [
             "Catot (-): Cu²⁺ + 2e → Cu ↓  [Điện phân dung dịch CuSO₄]",
             "Anot (+): 2H₂O → O₂ ↑ + 4H⁺ + 4e  [Dung dịch chuyển sang môi trường axit H₂SO₄]",
             "2NaCl + 2H₂O → 2NaOH + Cl₂ ↑ (Anot) + H₂ ↑ (Catot)  [Điện phân dd có màng ngăn]"
         ],
         "Điện phân 500mL dung dịch CuSO4 với điện cực trơ, cường độ dòng điện I = 5A trong thời gian 3860 giây. Tính khối lượng Cu bám vào catot và thể tích khí thoát ra ở anot (ở 25°C, 1 bar)?",
         "n_e = (I × t) / F = (5 × 3860) / 96500 = 0,2 mol. Ở Catot: Cu²⁺ + 2e → Cu ⇒ n_Cu = n_e / 2 = 0,1 mol ⇒ m_Cu = 0,1 × 64 = 6,4 gam. Ở Anot: 2H2O → O2 + 4H⁺ + 4e ⇒ n_O2 = n_e / 4 = 0,2 / 4 = 0,05 mol ⇒ V_O2 = 0,05 × 24,79 = 1,2395 Lít.",
         ["CuSO4", "NaCl", "WATER", "SODIUM"]),

        (17, 5, "Bài 17: Luyện tập & Tổng kết Chương 5: Pin điện & Điện phân",
         "Tổng kết phương pháp giải bài toán điện phân nâng cao: điện phân hỗn hợp muối, điện phân dung dịch có màng ngăn và bài toán trao đổi electron.",
         [
             {
                 "heading": "1. Phương pháp bảo toàn electron trong điện phân",
                 "points": [
                     "Tổng số mol e nhường ở Anot luôn bằng tổng số mol e nhận ở Catot: n_e (Anot) = n_e (Catot) = (I × t) / F.",
                     "Độ giảm khối lượng dung dịch sau điện phân: m_dung dịch giảm = m_kết tủa (Cu, Ag) + m_khí (Cl2, O2, H2)."
                 ]
             }
         ],
         [
             "n_e trao đổi = (I × t) / 96500",
             "m_dung dịch giảm = m_kết tủa + m_khí bay ra"
         ],
         [
             "CuSO₄ + 2NaCl → Cu ↓ + Cl₂ ↑ + Na₂SO₄  [Điện phân trơ trơ không màng]"
         ],
         "Điện phân dung dịch chứa 0,1 mol AgNO3 và 0,15 mol Cu(NO3)2 với điện cực trơ. Khi ở catot bắt đầu có bọt khí thoát ra thì dừng lại. Tính tổng số mol electron đã trao đổi?",
         "Thứ tự khử ở Catot: Ag⁺ + 1e → Ag (0,1 mol Ag⁺ cần 0,1 mol e); sau đó Cu²⁺ + 2e → Cu (0,15 mol Cu²⁺ cần 0,3 mol e). Khi catot bắt đầu có bọt khí tức là H2O bắt đầu bị điện phân, vậy cả Ag+ và Cu2+ đã bị khử hết. Tổng n_e trao đổi = 0,1 + 0,3 = 0,4 mol.",
         ["AgNO3", "CuSO4", "NaCl", "WATER"]),

        (18, 6, "Bài 18: Cấu tạo & Liên kết trong Tinh thể Kim loại",
         "Khám phá bản chất của liên kết kim loại, các kiểu mạng tinh thể lập phương tâm khối, lập phương tâm diện, lục giác chặt khít và nguồn gốc tính chất cơ lí.",
         [
             {
                 "heading": "1. Bản chất Liên kết Kim loại",
                 "points": [
                     "Liên kết kim loại là liên kết hình thành giữa các cation kim loại ở nút mạng tinh thể và các electron hóa trị tự do chuyển động hỗn loạn không định hướng (khí electron tự do).",
                     "Chính các electron tự do này giữ cho các cation kim loại gắn kết chặt chẽ với nhau và truyền tải năng lượng điện, nhiệt khắp khối kim loại."
                 ]
             },
             {
                 "heading": "2. 3 Kiểu Mạng Tinh thể Kim loại Cơ bản",
                 "points": [
                     "Mạng lập phương tâm khối (BCC): Li, Na, K, Rb, Cs, Ba, Cr, Fe_α. Độ đặc khít 68% (nguyên tử chiếm 68% thể tích tinh thể, còn 32% là khoảng trống).",
                     "Mạng lập phương tâm diện (FCC): Cu, Ag, Au, Al, Ni, Pt, Fe_γ. Độ đặc khít 74%.",
                     "Mạng lục giác chặt khít (HCP): Be, Mg, Zn, Ti. Độ đặc khít 74%."
                 ]
             }
         ],
         [
             "Mạng lập phương tâm khối (BCC): Li, Na, K, Ba, Cr, Fe (Độ đặc khít 68%)",
             "Mạng lập phương tâm diện (FCC): Cu, Ag, Au, Al, Pt (Độ đặc khít 74%)",
             "Mạng lục giác chặt khít (HCP): Be, Mg, Zn (Độ đặc khít 74%)"
         ],
         [
             "Liên kết kim loại: Cation kim loại Mⁿ⁺ + Khí electron tự do (e⁻)"
         ],
         "Tại sao các kim loại kiềm (Li, Na, K) có khối lượng riêng rất nhỏ và rất mềm có thể cắt dễ dàng bằng dao?",
         "Vì kim loại kiềm có bán kính nguyên tử lớn, cấu hình chỉ có 1 electron hóa trị và kết tinh ở mạng lập phương tâm khối (BCC) có độ đặc khít thấp (68%), liên kết kim loại yếu nên khối lượng riêng nhỏ và độ cứng rất thấp.",
         ["SODIUM", "POTASSIUM", "Fe", "Cu", "Al"]),

        (19, 6, "Bài 19: Tính chất Vật lí & Hóa học Chung của Kim loại",
         "Phân tích chuyên sâu 4 tính chất vật lí chung do electron tự do mang lại và tính chất hóa học đặc trưng là tính khử.",
         [
             {
                 "heading": "1. 4 Tính chất Vật lí Chung & Kỉ lục Kim loại",
                 "points": [
                     "Tính dẻo: Vàng (Au) dẻo nhất (có thể dát mỏng thành lá 0,0001 mm cho ánh sáng xuyên qua hoặc kéo dài hàng km).",
                     "Tính dẫn điện & dẫn nhiệt: Giảm dần theo thứ tự Bạc (Ag) > Đồng (Cu) > Vàng (Au) > Nhôm (Al) > Sắt (Fe). Nhiệt độ tăng làm dao động nút mạng tăng cản trở electron nên độ dẫn điện giảm.",
                     "Ánh kim: Electron tự do phản xạ hầu hết các tia sáng nhìn thấy tạo vẻ sáng bóng.",
                     "Kỉ lục kim loại: Nóng chảy cao nhất: Vonfram (W, 3422°C dùng làm dây tóc bóng đèn); Nóng chảy thấp nhất: Thủy ngân (Hg, -39°C ở thể lỏng); Cứng nhất: Crom (Cr, cắt được thủy tinh); Mềm nhất: Xesi (Cs); Nặng nhất: Osmi (Os, D = 22,6 g/cm³); Nhẹ nhất: Liti (Li, D = 0,53 g/cm³)."
                 ]
             },
             {
                 "heading": "2. Tính chất Hóa học Đặc trưng: Tính Khử",
                 "points": [
                     "Nguyên tử kim loại có ít electron lớp ngoài cùng (1, 2, 3e), bán kính nguyên tử tương đối lớn nên năng lượng ion hóa nhỏ, rất dễ nhường electron trở thành cation kim loại: M → M^(n+) + ne.",
                     "Tác dụng với phi kim (O2, Cl2, S).",
                     "Tác dụng với axit: Axit thường (HCl, H2SO4 loãng) chỉ oxi hóa kim loại đứng trước H giải phóng H2; Axit oxi hóa mạnh (HNO3, H2SO4 đặc) oxi hóa hầu hết kim loại (trừ Au, Pt) lên số oxi hóa cao nhất không sinh khí H2.",
                     "Tác dụng với dung dịch muối: Kim loại mạnh hơn đẩy kim loại yếu hơn ra khỏi muối."
                 ]
             }
         ],
         [
             "Dẫn điện: Ag > Cu > Au > Al > Fe",
             "Nóng chảy cao nhất: Vonfram W (3422°C) | Cứng nhất: Crom Cr",
             "Tính khử: M → Mⁿ⁺ + ne"
         ],
         [
             "2Al + 3Cl₂ → 2AlCl₃",
             "Fe + 2HCl → FeCl₂ + H₂ ↑",
             "3Cu + 8HNO₃ (loãng) → 3Cu(NO₃)₂ + 2NO ↑ + 4H₂O"
         ],
         "Tại sao nhôm (Al) dẫn điện kém hơn đồng (Cu) nhưng trong thực tế người ta lại dùng dây nhôm để làm đường dây tải điện cao thế Bắc - Nam?",
         "Mặc dù đồng dẫn điện tốt hơn nhôm, nhưng nhôm có khối lượng riêng nhẹ hơn đồng gần 3,3 lần (D_Al = 2,7 g/cm³ so với D_Cu = 8,9 g/cm³) và giá thành rẻ hơn. Dùng dây nhôm giúp giảm tải trọng đè lên các cột điện cao thế và tiết kiệm chi phí xây dựng khổng lồ.",
         ["Cu", "Fe", "Al", "Zn", "HNO3"]),

        (20, 6, "Bài 20: Tách Kim loại & Luyện kim (Nhiệt luyện, Thủy luyện, Điện phân)",
         "Nắm vững 3 phương pháp luyện kim then chốt trong công nghiệp và cơ sở lựa chọn phương pháp cho từng nhóm kim loại.",
         [
             {
                 "heading": "1. 3 Phương pháp Tách Kim loại",
                 "points": [
                     "Nhiệt luyện: Dùng chất khử mạnh (CO, H2, C, Al) để khử ion kim loại trong oxit ở nhiệt độ cao. Ứng dụng: Luyện kim loại hoạt động trung bình và yếu (sau Al như Fe, Cu, Pb, Zn). Ví dụ: Luyện gang từ quặng hematit Fe2O3 trong lò cao.",
                     "Thủy luyện: Dùng kim loại có tính khử mạnh hơn để đẩy ion kim loại yếu ra khỏi dung dịch muối của nó. Ứng dụng: Tách kim loại quý hoặc kim loại kém hoạt động (Cu, Ag, Au). Ví dụ: Dùng Fe đẩy Cu ra khỏi dung dịch CuSO4 rỉ mỏ đồng.",
                     "Điện phân: Phương pháp vạn năng và mạnh mẽ nhất. Điện phân nóng chảy dùng điều chế kim loại có tính khử rất mạnh (Li, Na, K, Ca, Ba, Mg, Al). Điện phân dung dịch dùng điều chế kim loại trung bình và yếu (Cu, Zn, Ag)."
                 ]
             }
         ],
         [
             "Nhiệt luyện: Fe₂O₃ + 3CO → 2Fe + 3CO₂  (t°)",
             "Thủy luyện: Fe + CuSO₄ → FeSO₄ + Cu ↓",
             "Điện phân nóng chảy oxit nhôm: 2Al₂O₃ → 4Al + 3O₂  (Điện cực than chì, criolit Na₃AlF₆, 950°C)"
         ],
         [
             "Fe₂O₃ + 3CO → 2Fe + 3CO₂  [Lò cao]",
             "2Al₂O₃ → 4Al + 3O₂  [Điện phân nóng chảy]"
         ],
         "Tại sao không thể điều chế kim loại Nhôm (Al) bằng phương pháp nhiệt luyện (dùng CO khử Al2O3) hoặc điện phân dung dịch AlCl3?",
         "Vì ion Al3+ có tính oxi hóa rất yếu và liên kết Al-O trong Al2O3 cực kỳ bền vững nên các chất khử như CO, H2 không thể khử được ở nhiệt độ thường/cao. Còn khi điện phân dung dịch AlCl3, do ion Al3+ có thế khử âm hơn nước nên nước sẽ bị khử trước ở Catot sinh ra khí H2 và ion OH⁻ thay vì tạo ra kim loại Al.",
         ["Fe", "Al", "CuSO4", "CARBON"]),

        (21, 6, "Bài 21: Hợp kim (Alloy) – Cấu tạo, Tính chất & Ứng dụng",
         "Hợp kim là vật liệu chứa kim loại cơ bản kết hợp nguyên tố khác. Phân tích ưu thế vượt trội của hợp kim so với kim loại nguyên chất.",
         [
             {
                 "heading": "1. Khái niệm & Cấu trúc Hợp kim",
                 "points": [
                     "Hợp kim có liên kết kim loại hoặc dung dịch rắn, hợp chất hóa học giữa các kim loại với nhau hoặc với phi kim.",
                     "Tính chất cơ học vượt trội: Hợp kim thường có độ cứng cao hơn, độ bền kéo lớn hơn và nhiệt độ nóng chảy thấp hơn kim loại thành phần. Do các nguyên tử lạ chèn vào mạng tinh thể làm xáo trộn cấu trúc đều đặn, cản trở các lớp tinh thể trượt lên nhau khi chịu ngoại lực."
                 ]
             },
             {
                 "heading": "2. Một số Hợp kim Tiêu biểu",
                 "points": [
                     "Gang (2 - 5% C): Giòn, chịu nén tốt dùng đúc bệ máy, nắp cống.",
                     "Thép (< 2% C): Dẻo, đàn hồi, chịu lực kéo cực tốt dùng xây dựng cầu đường, nhà cao tầng.",
                     "Inox (Thép không rỉ Fe-Cr-Ni): Crom tạo màng oxit Cr2O3 siêu bền bảo vệ bề mặt chống ăn mòn tuyệt hảo.",
                     "Đuyra (Duralumin: Al-Cu-Mg-Mn): Rất nhẹ và bền tương đương thép dùng chế tạo thân vỏ máy bay, tàu vũ trụ."
                 ]
             }
         ],
         [
             "Gang: 2 - 5% Carbon | Thép: 0,01 - 2% Carbon",
             "Đuyra (Al-Cu-Mg): Hợp kim siêu nhẹ chế tạo hàng không",
             "Inox (Fe-Cr-Ni): Chống ăn mòn tuyệt hảo"
         ],
         [
             "Fe + Cr + Ni → Hợp kim Inox không rỉ"
         ],
         "Tại sao người ta không dùng vàng nguyên chất 24K (99,99% Au) để đính đá quý làm nhẫn kim cương mà lại dùng vàng Tây (vàng 18K, 14K)?",
         "Vì vàng nguyên chất 24K là kim loại rất dẻo và mềm, khi đeo dễ bị méo mó, biến dạng và làm rơi rụng đá quý. Vàng Tây (18K) là hợp kim của vàng với đồng (Cu), bạc (Ag), kẽm (Zn) có độ cứng cao hơn rất nhiều, chịu lực tốt và giữ chặt các chấu đính kim cương.",
         ["Fe", "CARBON", "Al", "Cu"]),

        (22, 6, "Bài 22: Sự Ăn mòn Kim loại (Ăn mòn Hóa học vs Điện hóa học)",
         "Sự phá hủy kim loại dưới tác dụng của môi trường. Phân tích điều kiện ăn mòn điện hóa và các phương pháp chống ăn mòn trong thực tiễn.",
         [
             {
                 "heading": "1. 2 Loại Ăn mòn Kim loại",
                 "points": [
                     "Ăn mòn hóa học: Quá trình oxi hóa - khử trong đó electron của kim loại chuyển trực tiếp đến các chất trong môi trường (không phát sinh dòng điện). Ví dụ: Ống xả xe máy bị gỉ do khí thải quyển nóng.",
                     "Ăn mòn điện hóa học: Quá trình phá hủy kim loại do phát sinh dòng điện micro trong dung dịch chất điện li (xảy ra phổ biến và phá hủy ghê gớm nhất!)."
                 ]
             },
             {
                 "heading": "2. 3 Điều kiện để xảy ra Ăn mòn Điện hóa học",
                 "points": [
                     "1. Có 2 điện cực có bản chất khác nhau (Kim loại - Kim loại như Fe-Cu, Zn-Fe; hoặc Kim loại - Phi kim như Fe-C trong gang thép).",
                     "2. Hai điện cực tiếp xúc trực tiếp hoặc gián tiếp với nhau qua dây dẫn.",
                     "3. Cả hai điện cực cùng tiếp xúc với một dung dịch chất điện li (nước mưa, nước biển, không khí ẩm).",
                     "Cơ chế: Cực âm (Anot - Kim loại có tính khử mạnh hơn) bị oxi hóa ăn mòn phá hủy: Fe → Fe²⁺ + 2e. Cực dương (Catot - Kim loại yếu hơn hoặc than chì C): Xảy ra quá trình khử H⁺ hoặc O2 hòa tan: O2 + 2H2O + 4e → 4OH⁻."
                 ]
             },
             {
                 "heading": "3. Biện pháp Bảo vệ Kim loại",
                 "points": [
                     "Phương pháp bảo vệ bề mặt: Sơn, mạ, bôi dầu mỡ, tráng men để cách ly kim loại với môi trường.",
                     "Phương pháp điện hóa (Dùng kim loại hi sinh): Gắn khối kim loại có tính khử mạnh hơn (như Kẽm Zn) vào cấu trúc sắt thép (như vỏ tàu biển, chân giàn khoan dầu khí). Kẽm đóng vai trò là Anot bị ăn mòn hi sinh, còn vỏ thép đóng vai trò Catot được bảo vệ nguyên vẹn."
                 ]
             }
         ],
         [
             "Điều kiện ăn mòn điện hóa: 2 điện cực khác nhau + Tiếp xúc nhau + Cùng trong dung dịch điện li",
             "Anot (-): Kim loại mạnh hơn bị ăn mòn phá hủy",
             "Bảo vệ điện hóa: Gắn Zn vào vỏ tàu biển bằng thép để Zn bị ăn mòn bảo vệ Fe"
         ],
         [
             "Anot (-): Fe → Fe²⁺ + 2e  [Ăn mòn thép]",
             "Catot (+): O₂ + 2H₂O + 4e → 4OH⁻  [Trong không khí ẩm]",
             "Fe²⁺ + 2OH⁻ → Fe(OH)₂ ↓ ➔ Fe₂O₃.nH₂O  [Gỉ sắt màu nâu đỏ]"
         ],
         "Một sợi dây phơi bằng đồng nối với một sợi dây thép (Fe-C) để ngoài trời mưa ẩm. Chỗ nối sẽ bị đứt ở vị trí dây nào trước? Giải thích?",
         "Chỗ nối sẽ bị đứt ở sợi dây thép trước. Vì Fe có tính khử mạnh hơn Cu nên khi tiếp xúc với nhau trong dung dịch điện li (nước mưa), một pin điện hóa vi mô hình thành. Sắt (Fe) đóng vai trò là Anot (cực âm) bị oxi hóa tan ra liên tục (Fe → Fe²⁺ + 2e) dẫn đến sợi dây thép bị ăn mòn nhanh chóng và đứt trước.",
         ["Fe", "CARBON", "Zn", "NaCl", "WATER"]),

        (23, 6, "Bài 23: Luyện tập & Tổng kết Chương 6: Đại cương Kim loại",
         "Hệ thống hóa toàn bộ lý thuyết kim loại, dãy điện hóa và phương pháp giải toán kim loại tác dụng với axit và muối.",
         [
             {
                 "heading": "1. Tổng kết kiến thức Chương Kim loại",
                 "points": [
                     "Tính chất hóa học đặc trưng: Tính khử (M → M^(n+) + ne).",
                     "Quy tắc so sánh tính khử và tính oxi hóa trên dãy điện hóa.",
                     "Phân biệt ăn mòn hóa học và ăn mòn điện hóa."
                 ]
             }
         ],
         [
             "Bảo toàn electron: Σ n_e nhường = Σ n_e nhận"
         ],
         [
             "Fe + 2AgNO₃ → Fe(NO₃)₂ + 2Ag ↓"
         ],
         "Cho 5,6 gam bột Fe vào 200mL dung dịch AgNO3 1,5M. Sau khi phản ứng hoàn toàn thu được m gam kết tủa kim loại. Tính m?",
         "n_Fe = 5,6 / 56 = 0,1 mol; n_AgNO3 = 0,3 mol. Giai đoạn 1: Fe + 2Ag⁺ → Fe²⁺ + 2Ag ↓ (0,1 mol Fe phản ứng với 0,2 mol Ag⁺ sinh 0,2 mol Ag và 0,1 mol Fe²⁺, còn dư 0,1 mol Ag⁺). Giai đoạn 2: Fe²⁺ + Ag⁺ → Fe³⁺ + Ag ↓ (0,1 mol Fe²⁺ phản ứng vừa đủ với 0,1 mol Ag⁺ dư sinh thêm 0,1 mol Ag). Tổng n_Ag thu được = 0,2 + 0,1 = 0,3 mol ⇒ m = 0,3 × 108 = 32,4 gam.",
         ["Fe", "AgNO3", "CuSO4", "Zn"]),

        (24, 7, "Bài 24: Nguyên tố nhóm IA (Kim loại kiềm: Li, Na, K, Rb, Cs)",
         "Kim loại kiềm có tính khử mạnh nhất trong tất cả các kim loại. Tìm hiểu cấu trúc electron ns1, màu ngọn lửa đặc trưng và quy tắc bảo quản an toàn.",
         [
             {
                 "heading": "1. Vị trí, Cấu tạo & Tính chất Vật lí",
                 "points": [
                     "Nhóm IA gồm: Liti (Li), Natri (Na), Kali (K), Rubidi (Rb), Xesi (Cs).",
                     "Cấu hình electron lớp ngoài cùng ns¹: Rất dễ nhường 1 electron để đạt cấu hình bát tử bền của khí hiếm ⇒ Trong mọi hợp chất, kim loại kiềm luôn có số oxi hóa +1.",
                     "Tính chất vật lí: Mạng lập phương tâm khối (BCC), màu trắng bạc có ánh kim, mềm có thể cắt bằng dao, nhiệt độ nóng chảy và nhiệt độ sôi thấp, khối lượng riêng nhỏ (Na và K nhẹ hơn nước nổi trên mặt nước)."
                 ]
             },
             {
                 "heading": "2. Tính chất Hóa học: Tính khử cực kỳ mãnh liệt",
                 "points": [
                     "Tác dụng với nước ở nhiệt độ thường: 2M + 2H2O → 2MOH + H2 ↑. Phản ứng tỏa nhiệt dữ dội, mẩu Na nóng chảy vo tròn chạy trên mặt nước sủi bọt khí H2; Kali bốc cháy ngọn lửa màu tím hoa cà.",
                     "Tác dụng với oxi: Cháy trong không khí tạo oxit (Li2O), peoxit (Na2O2) hoặc supeoxit (KO2).",
                     "Màu ngọn lửa đặc trưng (dùng nhận biết ion kim loại kiềm): Li cho ngọn lửa màu Đỏ tía; Na cho ngọn lửa màu Vàng tươi; K cho ngọn lửa màu Tím hoa cà.",
                     "Quy tắc bảo quản an toàn: Do phản ứng mãnh liệt với nước và oxi không khí, kim loại kiềm (Na, K) bắt buộc phải ngâm chìm hoàn toàn trong dầu hỏa khan."
                 ]
             }
         ],
         [
             "Kim loại kiềm (nhóm IA): Số oxi hóa duy nhất là +1",
             "2M + 2H₂O → 2MOH + H₂ ↑  (Tỏa nhiệt nổ)",
             "Màu ngọn lửa: Na (Vàng tươi), K (Tím hoa cà), Li (Đỏ tía)",
             "Bảo quản kim loại kiềm: Ngâm trong dầu hỏa khan"
         ],
         [
             "2Na + 2H₂O → 2NaOH + H₂ ↑  [Phản ứng mãnh liệt]",
             "2Na + O₂ → Na₂O₂  (Natri peoxit khi đốt trong oxi dư)"
         ],
         "Tại sao khi dập tắt đám cháy kim loại kiềm (Natri, Kali) tuyệt đối không được dùng nước hoặc bình cứu hỏa CO2?",
         "Vì kim loại kiềm phản ứng mãnh liệt với nước tạo khí H2 dễ cháy nổ (2Na + 2H2O → 2NaOH + H2 ↑), đồng thời ở nhiệt độ cao kim loại kiềm khử được cả khí CO2 sinh ra than và khí độc (4Na + CO2 → 2Na2O + C) khiến đám cháy bùng phát dữ dội hơn. Để dập đám cháy kim loại kiềm, bắt buộc phải dùng cát khô hoặc bột chữa cháy chuyên dụng phủ kín cách ly không khí.",
         ["SODIUM", "POTASSIUM", "WATER"]),

        (25, 7, "Bài 25: Nguyên tố nhóm IIA (Kim loại kiềm thổ: Be, Mg, Ca, Sr, Ba) & Nước cứng",
         "Nhóm IIA có cấu hình ns2, số oxi hóa +2. Tìm hiểu tính chất của Canxi, đá vôi, vôi sống, vôi tôi và phân loại, làm mềm nước cứng.",
         [
             {
                 "heading": "1. Tính chất Kim loại Kiềm thổ",
                 "points": [
                     "Nhóm IIA gồm: Beri (Be), Magie (Mg), Canxi (Ca), Stronti (Sr), Bari (Ba).",
                     "Cấu hình electron ns² ⇒ Số oxi hóa đặc trưng là +2 trong mọi hợp chất.",
                     "Tính khử mạnh (tăng dần từ Be đến Ba): Ca, Sr, Ba phản ứng với nước ở nhiệt độ thường tạo dung dịch kiềm; Mg chỉ phản ứng chậm với nước nóng; Be không phản ứng với nước ở bất kì nhiệt độ nào."
                 ]
             },
             {
                 "heading": "2. Hợp chất quan trọng của Canxi",
                 "points": [
                     "Canxi oxit (CaO - Vôi sống): Tác dụng với nước tỏa nhiệt cực mạnh tạo vôi tôi (CaO + H2O → Ca(OH)2).",
                     "Canxi hiđroxit (Ca(OH)2 - Vôi tôi / Nước vôi trong): Dùng trong xây dựng, khử chua đất trồng trọt và nhận biết khí CO2 (tạo kết tủa trắng CaCO3).",
                     "Canxi cacbonat (CaCO3 - Đá vôi): Bị hòa tan bởi nước có hòa tan khí CO2 tạo muối tan Canxi hiđrocacbonat (hiện tượng xâm thực tạo hang động thạch nhũ): CaCO3 + CO2 + H2O ⇌ Ca(HCO3)2.",
                     "Canxi sunfat (Thạch cao): Thạch cao sống (CaSO4.2H2O), Thạch cao nung (CaSO4.H2O dùng đúc tượng và bó bột khi gãy xương), Thạch cao khan (CaSO4)."
                 ]
             },
             {
                 "heading": "3. Nước cứng & Phương pháp làm mềm nước cứng",
                 "points": [
                     "Định nghĩa: Nước cứng là nước chứa nhiều ion Ca²⁺ và Mg²⁺ (ngược lại là nước mềm).",
                     "Nước cứng tạm thời: Chứa anion HCO3⁻ (Ca(HCO3)2, Mg(HCO3)2). Làm mềm bằng cách: Đun sôi (Ca(HCO3)2 → CaCO3 ↓ + CO2 ↑ + H2O) hoặc dùng dung dịch Ca(OH)2 vừa đủ, Na2CO3, Na3PO4.",
                     "Nước cứng vĩnh cửu: Chứa anion Cl⁻, SO4²⁻ (CaCl2, MgSO4). Làm mềm bằng dung dịch Na2CO3 hoặc Na3PO4.",
                     "Nước cứng toàn phần: Chứa cả tính cứng tạm thời và vĩnh cửu. Dùng Na2CO3 hoặc Na3PO4 (làm mềm được mọi loại nước cứng!)."
                 ]
             }
         ],
         [
             "Nước cứng tạm thời: Chứa ion Ca²⁺, Mg²⁺, HCO₃⁻",
             "Làm mềm nước cứng tạm thời: Đun sôi | Dùng Ca(OH)₂ vừa đủ | Na₂CO₃ | Na₃PO₄",
             "Chất làm mềm TẤT CẢ các loại nước cứng: Na₂CO₃ hoặc Na₃PO₄",
             "Hiện tượng thạch nhũ hang động: CaCO₃ + CO₂ + H₂O ⇌ Ca(HCO₃)₂"
         ],
         [
             "Ca(HCO₃)₂ → CaCO₃ ↓ + CO₂ ↑ + H₂O  [Đun sôi làm mềm nước cứng tạm thời]",
             "Ca²⁺ + CO₃²⁻ → CaCO₃ ↓  [Dùng Na₂CO₃ làm mềm nước cứng]",
             "CaO + H₂O → Ca(OH)₂  [Vôi tôi tỏa nhiệt]"
         ],
         "Tại sao đun sôi nước cứng tạm thời lại làm mềm được nước và tạo cặn dưới đáy ấm đun nước?",
         "Vì trong nước cứng tạm thời có chứa muối canxi hiđrocacbonat Ca(HCO3)2 và magie hiđrocacbonat Mg(HCO3)2. Khi đun sôi, muối hiđrocacbonat bị nhiệt phân hủy tạo thành kết tủa canxi cacbonat CaCO3 và magie cacbonat MgCO3 lắng xuống đáy ấm tạo thành lớp cặn vôi, do đó các ion Ca2+ và Mg2+ bị loại bỏ khỏi dung dịch làm nước trở nên mềm.",
         ["Mg", "CaCO3", "CaO", "NaHCO3", "WATER"]),

        (26, 7, "Bài 26: Luyện tập & Tổng kết Chương 7: Nhóm IA và Nhóm IIA",
         "Hệ thống hóa bài toán kim loại kiềm/kiềm thổ tác dụng với nước, sục khí CO2 vào dung dịch kiềm và nhận biết ion.",
         [
             {
                 "heading": "1. Dạng toán CO2 sục vào dung dịch Ca(OH)2 / Ba(OH)2",
                 "points": [
                     "Xét tỉ lệ T = n_OH⁻ / n_CO2:",
                     "T ≤ 1: Chỉ tạo muối axit HCO3⁻ (không có kết tủa).",
                     "1 < T < 2: Tạo hỗn hợp 2 muối (CO3²⁻ kết tủa và HCO3⁻ tan).",
                     "T ≥ 2: Chỉ tạo muối trung hòa CO3²⁻ (kết tủa cực đại)."
                 ]
             }
         ],
         [
             "T = n_OH⁻ / n_CO₂",
             "T = 1: Tạo HCO₃⁻ | T = 2: Tạo CO₃²⁻"
         ],
         [
             "CO₂ + Ca(OH)₂ → CaCO₃ ↓ + H₂O  [Tạo kết tủa trắng]",
             "CaCO₃ + CO₂ (dư) + H₂O → Ca(HCO₃)₂  [Kết tủa tan khi CO₂ dư]"
         ],
         "Sục 3,7185 Lít khí CO2 ở đkc (25°C, 1 bar) vào 200mL dung dịch Ca(OH)2 1M. Tính khối lượng kết tủa CaCO3 thu được?",
         "n_CO2 = 3,7185 / 24,79 = 0,15 mol. n_Ca(OH)2 = 0,2 mol ⇒ n_OH⁻ = 0,4 mol. T = n_OH⁻ / n_CO2 = 0,4 / 0,15 = 2,67 > 2 ⇒ Ca(OH)2 dư, chỉ tạo muối trung hòa CaCO3 theo CO2. n_CaCO3 = n_CO2 = 0,15 mol ⇒ m_CaCO3 = 0,15 × 100 = 15 gam.",
         ["CaCO3", "CaO", "NaHCO3", "NaOH", "WATER"]),

        (27, 8, "Bài 27: Đại cương về Kim loại Chuyển tiếp Dãy thứ nhất",
         "Gồm 10 nguyên tố từ Sc (Z=21) đến Zn (Z=30). Cấu hình e [Ar] 3d^(1-10) 4s^(1-2), có nhiều trạng thái oxi hóa và tính chất từ tính đặc biệt.",
         [
             {
                 "heading": "1. Đặc điểm Cấu hình Electron & Trạng thái Oxi hóa",
                 "points": [
                     "10 nguyên tố chuyển tiếp dãy 3d: Sc (21), Ti (22), V (23), Cr (24), Mn (25), Fe (26), Co (27), Ni (28), Cu (29), Zn (30).",
                     "Quy luật điền electron: Electron được điền vào phân lớp 3d bên trong trước khi hoàn thành lớp ngoài cùng 4s.",
                     "Cấu hình ngoại lệ bền vững: Crom Cr (Z=24) có cấu hình [Ar] 3d⁵ 4s¹ (bán bão hòa phân lớp d); Đồng Cu (Z=29) có cấu hình [Ar] 3d¹⁰ 4s¹ (bão hòa hoàn toàn phân lớp d).",
                     "Nhiều trạng thái oxi hóa: Do các electron 3d và 4s có mức năng lượng gần nhau nên đều có thể tham gia tạo liên kết hóa học. Ví dụ: Fe (+2, +3), Cr (+2, +3, +6), Mn (+2, +3, +4, +6, +7). Số oxi hóa cao nhất của Mangan là +7 trong thuốc tím KMnO4 (chất oxi hóa cực mạnh)."
                 ]
             },
             {
                 "heading": "2. Tính chất Từ & Màu sắc Hợp chất",
                 "points": [
                     "Các hợp chất của kim loại chuyển tiếp thường có màu sắc vô cùng phong phú và rực rỡ do các electron d chưa ghép đôi chuyển mức năng lượng d-d khi hấp thụ ánh sáng nhìn thấy.",
                     "Nhiều kim loại chuyển tiếp và hợp chất của chúng là chất xúc tác quan trọng bậc nhất trong công nghiệp hóa chất (Fe trong tổng hợp NH3; V2O5 trong sản xuất H2SO4; Pt, Pd trong xử lý khí thải ô tô)."
                 ]
             }
         ],
         [
             "Cấu hình electron đặc biệt: Cr [Ar] 3d⁵ 4s¹ | Cu [Ar] 3d¹⁰ 4s¹",
             "Nhiều số oxi hóa biến đổi: Mn (+2 đến +7), Fe (+2, +3), Cr (+2, +3, +6)",
             "Hợp chất chuyển tiếp có màu sắc rực rỡ do dịch chuyển mức d-d"
         ],
         [
             "2KMnO₄ → K₂MnO₄ + MnO₂ + O₂ ↑  (t°)",
             "Cr₂O₃ + 2Al → 2Cr + Al₂O₃  (Nhiệt nhôm)"
         ],
         "Tại sao muối của ion kim loại nhóm chính như Na+, Ca2+, Al3+ thường không màu, trong khi dung dịch muối của kim loại chuyển tiếp như Cu2+, Fe3+, Ni2+, MnO4- lại có màu sắc rất rực rỡ?",
         "Vì các ion kim loại nhóm chính (Na+, Ca2+, Al3+) có cấu hình electron bão hòa khí hiếm không có electron độc thân ở phân lớp d. Ngược lại, các ion kim loại chuyển tiếp (Cu2+ 3d⁹, Fe3+ 3d⁵) có phân lớp d chưa bão hòa; dưới tác dụng của các phối tử, các orbital d bị tách mức năng lượng và khi hấp thụ photon ánh sáng khả kiến, electron d nhảy từ mức thấp lên mức cao, phản chiếu phần ánh sáng còn lại tạo nên màu sắc đặc trưng (Cu2+ màu xanh lam, Fe3+ màu vàng nâu, MnO4- màu tím đậm).",
         ["Fe", "Cu", "KMnO4", "CHLORINE"]),

        (28, 8, "Bài 28: Sơ lược về Phức chất (Coordination Chemistry)",
         "Phức chất là một trong những thành tựu rực rỡ nhất của hóa học hiện đại. Tìm hiểu nguyên tử trung tâm, phối tử ligand, số phối trí và liên kết phối trí cho - nhận.",
         [
             {
                 "heading": "1. Khái niệm & Cấu tạo Phức chất",
                 "points": [
                     "Phức chất là hợp chất gồm một nguyên tử hoặc ion trung tâm (thường là ion kim loại chuyển tiếp có orbital trống) liên kết với một hay nhiều phân tử hoặc anion gọi là phối tử (ligand) bằng liên kết cho - nhận (liên kết phối trí).",
                     "Cấu trúc công thức phức chất: [M(L)_n]^z trong đó: M là nguyên tử/ion trung tâm; L là phối tử (ligand); n là số phối trí (số liên kết σ tạo giữa phối tử và ion trung tâm); z là điện tích của cầu nội phức.",
                     "Các phối tử phổ biến: Phối tử trung hòa: Aqua (H2O), Ammine (NH3), Carbonyl (CO); Phối tử anion: Chlorido (Cl⁻), Hydroxido (OH⁻), Cyanido (CN⁻)."
                 ]
             },
             {
                 "heading": "2. Một số Phức chất Kinh điển trong Thực hành",
                 "points": [
                     "Phức chất Tetraamminedong(II) [Cu(NH3)4]²⁺: Khi nhỏ từ từ dung dịch NH3 vào dung dịch CuSO4, ban đầu xuất hiện kết tủa xanh nhạt Cu(OH)2, sau đó kết tủa tan dần tạo thành dung dịch phức [Cu(NH3)4]²⁺ màu XANH LAM THẪM trong suốt.",
                     "Thuốc thử Tollens Diamminebac(I) [Ag(NH3)2]⁺: Tạo thành khi hòa tan Ag2O/AgNO3 trong dung dịch NH3 dư dùng trong phản ứng tráng gương.",
                     "Phức chất Sắt-Phenol [Fe(OC6H5)6]³⁻: Khi nhỏ dung dịch FeCl3 vào phenol tạo phức chất màu TÍM thẫm đặc trưng (dùng nhận biết phenol!)."
                 ]
             }
         ],
         [
             "Cấu tạo phức: [M(L)_n]^z  (M: Ion trung tâm, L: Phối tử ligand, n: Số phối trí)",
             "Cu²⁺ + 4NH₃ → [Cu(NH₃)₄]²⁺  (Dung dịch phức màu xanh lam thẫm)",
             "Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺  (Thuốc thử Tollens)",
             "Fe³⁺ + 6C₆H₅OH → [Fe(OC₆H₅)₆]³⁻ + 6H⁺  (Phức màu tím thẫm nhận biết phenol)"
         ],
         [
             "CuSO₄ + 2NH₃ + 2H₂O → Cu(OH)₂ ↓ (Xanh nhạt) + (NH₄)₂SO₄",
             "Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄](OH)₂  [Tan tạo phức màu xanh lam thẫm]",
             "AgNO₃ + 3NH₃ + H₂O → [Ag(NH₃)₂]OH + NH₄NO₃  [Thuốc thử Tollens]"
         ],
         "Mô tả hiện tượng và viết phương trình hóa học xảy ra khi nhỏ từ từ từng giọt dung dịch NH3 đến dư vào ống nghiệm chứa dung dịch CuSO4?",
         "Hiện tượng: Ban đầu xuất hiện kết tủa màu xanh nhạt của Cu(OH)2: CuSO4 + 2NH3 + 2H2O → Cu(OH)2 ↓ + (NH4)2SO4. Khi tiếp tục nhỏ dung dịch NH3 đến dư, kết tủa Cu(OH)2 tan dần ra và dung dịch chuyển thành màu XANH LAM THẪM trong suốt do tạo phức chất tan tetraamminedong(II) hiđroxit: Cu(OH)2 + 4NH3 → [Cu(NH3)4](OH)2.",
         ["CuSO4", "NH3", "AgNO3", "FeCl3", "PHENOL"]),

        (29, 8, "Bài 29: Tính chất, Độ bền & Ứng dụng Sinh học của Phức chất",
         "Tìm hiểu hằng số bền Kbền của phức chất và vai trò sống còn của các phức chất sinh học như Hemoglobin, Diệp lục Chlorophyll và thuốc trị ung thư Cisplatin.",
         [
             {
                 "heading": "1. Độ bền của Phức chất & Hằng số Bền Kbền",
                 "points": [
                     "Phản ứng tạo phức là phản ứng thuận nghịch: M + nL ⇌ [MLn]. Hằng số cân bằng của phản ứng gọi là Hằng số bền K_bền (hoặc β).",
                     "Giá trị K_bền càng lớn thì phức chất càng bền vững và phối tử liên kết càng chặt với ion trung tâm.",
                     "Hiệu ứng Chelate: Các phối tử đa càng (như EDTA, H2N-CH2-CH2-NH2) tạo phức vòng càng khép kín bền hơn rất nhiều so với phối tử đơn càng."
                 ]
             },
             {
                 "heading": "2. Vai trò Sống còn của Phức chất trong Y Sinh học",
                 "points": [
                     "Hemoglobin (Hồng cầu trong máu người): Là một phức chất khổng lồ của ion Sắt(II) Fe²⁺ với vòng porphyrin, giữ nhiệm vụ hấp thu O2 ở phổi và vận chuyển O2 nuôi toàn bộ mô tế bào trong cơ thể.",
                     "Chlorophyll (Diệp lục tố trong lá cây): Là phức chất của ion Magie Mg²⁺ với nhân porphyrin, giữ vai trò hấp thu năng lượng ánh sáng mặt trời để thực hiện quá trình quang hợp sinh ra khí O2 và đường glucose.",
                     "Vitamin B12 (Cobalamin): Là phức chất sinh học của ion Coban Co³⁺ cần thiết cho quá trình tạo máu và chức năng thần kinh.",
                     "Thuốc chống ung thư Cisplatin [Pt(NH3)2Cl2]: Phức chất vuông phẳng của bạch kim có khả năng liên kết chéo với chuỗi xoắn kép DNA của tế bào ung thư ức chế sự nhân đôi của khối u."
                 ]
             }
         ],
         [
             "Hemoglobin trong máu: Phức chất sinh học của ion Fe²⁺ vận chuyển oxy",
             "Chlorophyll (Diệp lục lá cây): Phức chất sinh học của ion Mg²⁺ quang hợp",
             "Thuốc chống ung thư Cisplatin: [Pt(NH₃)₂Cl₂] ức chế phân chia tế bào ung thư",
             "Hằng số bền K_bền: K_bền càng lớn phức chất càng bền vững"
         ],
         [
             "Fe²⁺ (Hemoglobin) + O₂ ⇌ Oxyhemoglobin  [Vận chuyển O₂ nuôi cơ thể]",
             "Mg²⁺ (Diệp lục) + hν + CO₂ + H₂O → C₆H₁₂O₆ + O₂  [Quang hợp cây xanh]"
         ],
         "Tại sao khí Cacbon monoxit (CO) lại cực kỳ độc hại và chỉ cần một nồng độ nhỏ trong không khí cũng có thể gây ngạt thở tử vong nhanh chóng?",
         "Vì phân tử CO là một phối tử tạo phức với ion Fe2+ trong phân tử Hemoglobin có hằng số bền K_bền lớn hơn khoảng 200 đến 250 lần so với khí Oxy (O2). Khi hít phải khí CO, CO sẽ chiếm chỗ và liên kết chặt chẽ với Fe2+ tạo thành cacboxyhemoglobin rất bền vững không nhả ra được, làm tê liệt hoàn toàn chức năng vận chuyển oxy của hồng cầu khiến nạn nhân bị ngạt thở tử vong ở cấp độ tế bào.",
         ["Fe", "Mg", "CuSO4", "NH3"]),

        (30, 8, "Bài 30: Ôn tập Chương 8 & Tổng kết Toàn diện Khóa học Hóa học THPT",
         "Tổng kết toàn diện 179 bài học từ Lớp 8 đến Lớp 12: Vững vàng bản chất nguyên tử, quy luật tuần hoàn, liên kết hóa học, cân bằng nhiệt động học, hóa học hữu cơ thực nghiệm và điện hóa phức chất.",
         [
             {
                 "heading": "1. 5 Trụ cột Hóa học Cốt lõi",
                 "points": [
                     "1. Cấu trúc Nguyên tử & Liên kết: Octet, Orbital AO, CHT, Ion, Hydrogen quyết định tính chất vật lí và hóa học của chất.",
                     "2. Động học & Nhiệt động học: Biến thiên Enthalpy ΔrH°298, Tốc độ phản ứng v, Hằng số cân bằng Kc và Nguyên lí Le Chatelier.",
                     "3. Phản ứng Oxi hóa - Khử & Điện hóa: Thăng bằng electron, Pin Galvani, Điện phân và chống ăn mòn kim loại.",
                     "4. Hóa học Hữu cơ & Cơ chế: Nhóm chức, Hiđrocacbon, Alcohol, Phenol, Carbonyl, Ester, Lipid, Carbohydrate, Amine, Peptide, Polymer.",
                     "5. Kim loại chuyển tiếp & Phức chất: Màu sắc, xúc tác và vai trò sống còn trong y sinh học."
                 ]
             }
         ],
         [
             "Vững vàng 5 trụ cột Hóa học chuẩn chương trình GDPT 2018",
             "Sẵn sàng bứt phá điểm 10 trong kì thi Tốt nghiệp THPT Quốc Gia"
         ],
         [
             "Chemic-AI x RMIT Vietnam x AI Riser 2026  [Đột phá công nghệ Giáo dục tương tác 3D]"
         ],
         "Lời chúc và bí quyết ôn tập từ Giáo sư Lucy và Chemic-AI?",
         "Hóa học không phải là học vẹt phương trình, mà là thấu hiểu bản chất chuyển dịch electron và liên kết giữa các nguyên tử! Hãy kết hợp học lý thuyết trong Giáo trình Academy với việc trực tiếp nạp hóa chất vào Bàn Thí Nghiệm 3D để quan sát màu sắc, kết tủa và khí sinh ra. Chúc các bạn học sinh tỏa sáng và đạt kết quả xuất sắc nhất!",
         ["SODIUM", "Fe", "CuSO4", "GLUCOSE", "ETHANOL", "KMnO4"])
    ]

    for item in g12_rich:
        all_lessons.append(make_rich_lesson(12, item[0], item[1], c12[item[1]], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9]))

    return all_lessons

print("Loaded g12_rich definitions")
