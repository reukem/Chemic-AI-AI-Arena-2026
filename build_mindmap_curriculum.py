# -*- coding: utf-8 -*-
import json

def get_mindmap_g12():
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

    def make_lesson(num, ch_num, title, summary, sections, formulas, equations, q, a, reagents):
        clean_title = title.split(':', 1)[1].strip() if ':' in title else title
        all_points = []
        for s in sections:
            for p in s["points"]:
                all_points.append({"VN": f"[{s['heading']}] {p}", "EN": f"[{s['heading']}] {p}"})
        
        return {
            "id": f"hh12_b{num}",
            "code": f"HH12-B{num:02d}",
            "lessonNumber": num,
            "grade": 12,
            "chapterNumber": ch_num,
            "chapterTitle": c12[ch_num],
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

    lessons = []

    # ==========================================
    # BÀI 1: ESTER - LIPID (DUMBING DOWN & LATEX)
    # ==========================================
    lessons.append(make_lesson(
        1, 1, "Bài 1: Ester – Lipid (Khái niệm, Cấu tạo & Tính chất)",
        "Dễ hiểu nhất: Lấy phân tử Axit cacboxylic (chua), rút nhóm $-OH$ ra rồi cắm nhóm $-OR'$ của Ancol vào $\\to$ Ta được một phân tử Ester thơm nức mùi hoa quả!",
        [
            {
                "heading": "I. KHÁI NIỆM & CÁCH TẠO RA ESTER (SIÊU DỄ NHỚ)",
                "points": [
                    "🔹 **Ester sinh ra từ đâu?** Khi cho Axit cacboxylic tác dụng với Ancol (xúc tác $H_2SO_4$ đặc, đun nóng), nhóm $-OH$ ở gốc axit bị thay thế bởi nhóm $-OR'$ của ancol $\\to$ Tạo thành Ester $\\text{R-COO-R}'$.",
                    "🔹 **Công thức tổng quát**: Ester no, đơn chức, mạch hở luôn có dạng: $$\\text{C}_n\\text{H}_{2n}\\text{O}_2 \\quad (n \\ge 2)$$ Ví dụ: $\\text{HCOOCH}_3$ ($n=2$, Metyl fomat), $\\text{CH}_3\\text{COOC}_2\\text{H}_5$ ($n=4$, Etyl axetat).",
                    "🔹 **Mẹo đọc tên IUPAC trong 3 giây**: Đọc tên gốc đuôi $R'$ trước $\\to$ Đọc tên gốc axit đầu rồi đổi đuôi thành **-at** (Ví dụ: $\\text{CH}_3\\text{COO}-\\text{C}_2\\text{H}_5 \\to \\text{C}_2\\text{H}_5$ là *Etyl*, $\\text{CH}_3\\text{COO}$ là *axetat* $\\to$ **Etyl axetat**)."
                ]
            },
            {
                "heading": "II. TÍNH CHẤT VẬT LÍ & BẢNG MÙI THƠM HOA QUẢ",
                "points": [
                    "🔹 **Độ tan & Khối lượng riêng**: Ester nhẹ hơn nước, không tan trong nước và nổi lên trên (do giữa các phân tử ester KHÔNG có liên kết hydrogen liên phân tử như axit và rượu).",
                    "🔹 **Nhiệt độ sôi**: Thấp hơn rất nhiều so với axit và rượu có cùng phân tử khối.",
                    "🔹 **3 Mùi thơm hoa quả kinh điển trong đề thi**: 🍌 Chuối chín: Isoamyl axetat $\\text{CH}_3\\text{COOCH}_2\\text{CH}_2\\text{CH(CH}_3)_2$ | 🍍 Quả dứa: Etyl butirat $\\text{C}_3\\text{H}_7\\text{COOC}_2\\text{H}_5$ | 🌸 Hoa nhài: Benzyl axetat $\\text{CH}_3\\text{COOCH}_2\\text{C}_6\\text{H}_5$."
                ]
            },
            {
                "heading": "III. 2 PHẢN ỨNG THỦY PHÂN BẮT BUỘC PHẢI THUỘC",
                "points": [
                    "🔹 **1. Thủy phân trong Axit (Thuận nghịch 2 chiều $\\rightleftharpoons$)**: Đun với dung dịch axit loãng, ester bị xé đôi trả lại Axit và Ancol ban đầu: $$\\text{R-COO-R}' + \\text{H}_2\\text{O} \\;\\xrightleftharpoons{\\text{H}^+, t^\\circ}\\; \\text{R-COOH} + \\text{R}'\\text{-OH}$$ ⚠️ Phản ứng không hoàn toàn, tạo hỗn hợp tách thành 2 lớp chất lỏng!",
                    "🔹 **2. Thủy phân trong Kiềm / Phản ứng Xà phòng hóa (1 chiều $\\rightarrow$)**: Đun với dung dịch $NaOH$, ester bị bẻ gãy hoàn toàn tạo muối natri và ancol: $$\\text{R-COO-R}' + \\text{NaOH} \\;\\xrightarrow{t^\\circ}\\; \\text{R-COONa (Muối)} + \\text{R}'\\text{-OH (Ancol)}$$ ✨ Phản ứng xảy ra hoàn toàn tạo dung dịch đồng nhất!",
                    "🔹 **Trường hợp đặc biệt**: Ester của Phenol cần dùng $2NaOH$: $\\text{R-COOC}_6\\text{H}_5 + 2\\text{NaOH} \\xrightarrow{t^\\circ} \\text{R-COONa} + \\text{C}_6\\text{H}_5\\text{ONa} + \\text{H}_2\\text{O}$; Vinyl ester tạo anđehit: $\\text{CH}_3\\text{COOCH=CH}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{CH}_3\\text{CHO}$."
                ]
            },
            {
                "heading": "IV. CHẤT BÉO (TRIGLYCERIDE) & 4 AXIT BÉO NẰM LÒNG",
                "points": [
                    "🔹 **Chất béo là gì?** Là triester của Glycerol $\\text{C}_3\\text{H}_5(\\text{OH})_3$ với 3 phân tử acid béo: $$(\\text{R-COO})_3\\text{C}_3\\text{H}_5$$",
                    "🔹 **4 Axit béo ruột cần nhớ**: 1. Axit Panmitic: $\\text{C}_{15}\\text{H}_{31}\\text{COOH}$ ($M=256$, No $\\to$ Rắn) | 2. Axit Stearic: $\\text{C}_{17}\\text{H}_{35}\\text{COOH}$ ($M=284$, No $\\to$ Rắn) | 3. Axit Oleic: $\\text{C}_{17}\\text{H}_{33}\\text{COOH}$ ($M=282$, Không no 1 nối đôi $\\text{C=C} \\to$ Lỏng) | 4. Axit Linoleic: $\\text{C}_{17}\\text{H}_{31}\\text{COOH}$ ($M=280$, Không no 2 nối đôi $\\text{C=C} \\to$ Lỏng).",
                    "🔹 **Quy tắc thể rắn / lỏng**: Mỡ động vật (chứa gốc no như Tristearin) $\\to$ Thể rắn. Dầu thực vật (chứa gốc không no như Triolein) $\\to$ Thể lỏng.",
                    "🔹 **Biến dầu thành bơ**: Sục khí $H_2$ vào dầu lỏng: $(\\text{C}_{17}\\text{H}_{33}\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{H}_2 \\xrightarrow{\\text{Ni}, t^\\circ} (\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5$ (Tristearin rắn) $\\to$ Sản xuất bơ nhân tạo Margarine."
                ]
            }
        ],
        [
            "$$\\text{C}_n\\text{H}_{2n}\\text{O}_2 \\quad (n \\ge 2)$$",
            "$$\\text{R-COO-R}' + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{R-COONa} + \\text{R}'\\text{-OH}$$",
            "$$(\\text{RCOO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\xrightarrow{t^\\circ} 3\\text{RCOONa (Xà phòng)} + \\text{C}_3\\text{H}_5(\\text{OH})_3$$"
        ],
        [
            "$$\\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{C}_2\\text{H}_5\\text{OH}$$",
            "$$(\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\xrightarrow{t^\\circ} 3\\text{C}_{17}\\text{H}_{35}\\text{COONa} + \\text{C}_3\\text{H}_5(\\text{OH})_3$$",
            "$$(\\text{C}_{17}\\text{H}_{33}\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{H}_2 \\xrightarrow{\\text{Ni}, t^\\circ} (\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5$$"
        ],
        "Tại sao mỡ lợn (mỡ động vật) để ở nhiệt độ phòng thì đông đặc thành thể rắn, còn dầu ăn (dầu thực vật) lại ở thể lỏng?",
        "Vì mỡ lợn chứa chủ yếu các gốc acid béo NO (như gốc panmitat $C_{15}H_{31}$, stearat $C_{17}H_{35}$) có mạch carbon duỗi thẳng, các phân tử xếp khít chặt chẽ vào nhau nên có lực hút liên phân tử mạnh dẫn đến nhiệt độ nóng chảy cao (thể rắn). Ngược lại, dầu thực vật chứa gốc acid béo KHÔNG NO (như gốc oleat $C_{17}H_{33}$) có liên kết đôi $C=C$ dạng cis bẻ cong gấp khúc mạch carbon, cản trở các phân tử xếp khít nên lực hút yếu và có nhiệt độ nóng chảy thấp (thể lỏng).",
        ["ETHYL_ACETATE", "TRIGLYCERIDE", "NaOH", "GLYCEROL", "ETHANOL"]
    ))

    # =========================================================================
    # BÀI 2: XÀ PHÒNG VÀ CHẤT GIẶT RỬA (MÔ HÌNH HÌNH HỌC CHUẨN SGK / SƠ ĐỒ LỚP HỌC)
    # =========================================================================
    lessons.append(make_lesson(
        2, 1, "Bài 2: Xà phòng và Chất giặt rửa tổng hợp",
        "Sơ đồ tư duy trực quan 5 phần: Khái niệm, Cấu tạo phân tử (Đầu ưa nước - Đuôi kị nước), Cơ chế giặt rửa 3 bước, Sơ đồ sản xuất và Bảng so sánh ưu - nhược điểm với nước cứng!",
        [
            {
                "heading": "I. KHÁI NIỆM (SIÊU NGẮN GỌN)",
                "points": [
                    "🧼 **Xà phòng**: Là hỗn hợp muối sodium ($\\text{Na}$) hoặc potassium ($\\text{K}$) của các acid béo (như $\\text{C}_{17}\\text{H}_{35}\\text{COONa}$, $\\text{C}_{15}\\text{H}_{31}\\text{COONa}$) và các chất phụ gia tạo màu, mùi.",
                    "🧴 **Chất giặt rửa tổng hợp**: Là hợp chất nhân tạo có tác dụng giặt rửa như xà phòng. Thường là muối sodium alkylsulfate ($\\text{R-OSO}_3\\text{Na}$) hoặc alkylbenzene sulfonate ($\\text{R-C}_6\\text{H}_4\\text{-SO}_3\\text{Na}$)."
                ]
            },
            {
                "heading": "II. CẤU TẠO PHÂN TỬ (MÔ HÌNH TRỰC QUAN ĐẦU & ĐUÔI)",
                "points": [
                    "💧 **Phần phân cực (Đầu ưa nước - Tan trong nước)**: Là nhóm carboxylate $-\\text{COO}^-\\text{Na}^+$ (trong xà phòng) hoặc nhóm sulfate $-\\text{OSO}_3^-\\text{Na}^+$, sulfonate $-\\text{SO}_3^-\\text{Na}^+$ (trong chất giặt rửa).",
                    "🛢️ **Phần không phân cực (Đuôi kị nước - Tan trong dầu, ghét nước)**: Là gốc hydrocarbon dài $\\text{R}-$ (ví dụ $\\text{C}_{17}\\text{H}_{35}-$, $\\text{C}_{15}\\text{H}_{31}-$) không tan trong nước nhưng tan rất tốt trong dầu mỡ."
                ]
            },
            {
                "heading": "III. TÍNH CHẤT GIẶT RỬA (CƠ CHẾ 3 BƯỚC CỰC KỲ DỄ HIỂU)",
                "points": [
                    "🔹 **Bước 1 (Thâm nhập)**: Khi hòa vào nước, các đuôi kị nước (ưa dầu) cắm sâu vào bề mặt vết bẩn dầu mỡ trên sợi vải, còn đầu ưa nước chĩa ra ngoài dung dịch nước.",
                    "🔹 **Bước 2 (Phân tán Micelle)**: Khi vò hoặc máy giặt khuấy đảo, các phân tử giặt rửa kéo xé vết dầu mỡ ra khỏi sợi vải, chia nhỏ thành các hạt micelle siêu vi lơ lửng trong nước.",
                    "🔹 **Bước 3 (Rửa trôi)**: Xả nước sạch, các hạt micelle mang theo vết bẩn bị dòng nước cuốn trôi hoàn toàn $\\to$ Quần áo sạch tinh tươm!"
                ]
            },
            {
                "heading": "IV. PHƯƠNG PHÁP SẢN XUẤT (SƠ ĐỒ KHỐI FLOWCHART)",
                "points": [
                    "1️⃣ **Sản xuất Xà phòng**:",
                    "  • Cách 1: $\\text{Chất béo} + \\text{NaOH/KOH} \\xrightarrow{t^\\circ} \\text{RCOONa(K) (Xà phòng)} + \\text{Glycerol}$.",
                    "  • Cách 2: $\\text{Alkane (Dầu mỏ)} \\xrightarrow{Oxi\\,h\\acute{o}a} \\text{RCOOH (Acid béo)} \\xrightarrow{+NaOH} \\text{RCOONa (Xà phòng)}$.",
                    "2️⃣ **Sản xuất Chất giặt rửa tổng hợp**:",
                    "  • $\\text{Dầu mỏ} \\longrightarrow \\text{R-SO}_3\\text{H / R-OSO}_3\\text{H} \\xrightarrow{+NaOH} \\text{R-SO}_3\\text{Na / R-OSO}_3\\text{Na}$."
                ]
            },
            {
                "heading": "V. BẢNG SO SÁNH ƯU & NHƯỢC ĐIỂM (XÀ PHÒNG VS CHẤT GIẶT RỬA)",
                "points": [
                    "🧼 **1. Xà phòng**:",
                    "  • *Ưu điểm*: Có thể bị phân hủy bởi các vi sinh vật trong tự nhiên $\\to$ Ít gây ô nhiễm môi trường nguồn nước.",
                    "  • *Nhược điểm*: Khi dùng trong **Nước cứng** (chứa ion $\\text{Ca}^{2+}, \\text{Mg}^{2+}$), xà phòng phản ứng tạo kết tủa cặn không tan: $2\\text{RCOO}^- + \\text{Ca}^{2+} \\to (\\text{RCOO})_2\\text{Ca} \\downarrow$ làm mất bọt giặt, tốn xà phòng và ố vàng quần áo!",
                    "🧴 **2. Chất giặt rửa tổng hợp**:",
                    "  • *Ưu điểm*: Dùng tốt và giặt sạch trong cả **Nước cứng** vì muối của $\\text{Ca}^{2+}, \\text{Mg}^{2+}$ với gốc sulfonate $\\text{R-SO}_3^-$ tan tốt trong nước.",
                    "  • *Nhược điểm*: Khó bị vi sinh vật phân hủy sinh học $\\to$ Tích tụ gây bọt bẩn và ô nhiễm môi trường sông hồ."
                ]
            }
        ],
        [
            "$$\\text{Cấu tạo}: \\underbrace{\\text{R-}}_{\\text{Đuôi kị nước (ưa mỡ)}} \\;-\\; \\underbrace{\\text{COO}^-\\text{Na}^+}_{\\text{Đầu ưa nước (tan trong nước)}}$$",
            "$$\\text{Nước cứng làm hỏng xà phòng}: 2\\text{R-COONa} + \\text{Ca}^{2+} \\to (\\text{R-COO})_2\\text{Ca} \\downarrow + 2\\text{Na}^+$$",
            "$$\\text{Chất giặt rửa}: \\text{R-SO}_3\\text{Na} + \\text{Ca}^{2+} \\to \\text{Tan tốt (không tạo kết tủa)}$$"
        ],
        [
            "$$(\\text{RCOO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\xrightarrow{t^\\circ} 3\\text{RCOONa (Xà phòng)} + \\text{C}_3\\text{H}_5(\\text{OH})_3$$",
            "$$2\\text{C}_{17}\\text{H}_{35}\\text{COONa} + \\text{Ca}^{2+} \\to (\\text{C}_{17}\\text{H}_{35}\\text{COO})_2\\text{Ca} \\downarrow (\\text{Cặn trắng}) + 2\\text{Na}^+$$"
        ],
        "Tại sao khi giặt bằng xà phòng thông thường trong nước giếng khoan (nước cứng chứa nhiều Ca2+ và Mg2+) thì giặt không sạch và quần áo bị ố vàng, trong khi dùng bột giặt Omo/Aba thì vẫn nhiều bọt và giặt sạch bóng?",
        "Vì xà phòng thường (muối natri của acid béo RCOONa) gặp ion Ca2+ và Mg2+ trong nước cứng sẽ tạo ra kết tủa canxi stearat / magie stearat không tan: 2RCOONa + Ca2+ -> (RCOO)2Ca kết tủa. Kết tủa này làm mất khả năng tạo bọt của xà phòng và bám dính vào sợi vải gây ố vàng. Ngược lại, bột giặt tổng hợp chứa gốc sulfonate (R-SO3Na), muối của nó với Ca2+ và Mg2+ tan rất tốt trong nước nên không bị kết tủa và vẫn giặt sạch hiệu quả.",
        ["TRIGLYCERIDE", "NaOH", "GLYCEROL", "WATER"]
    ))

    # =========================================================================
    # BÀI 4: CARBOHYDRATE - GLUCOSE & FRUCTOSE (DUMBING DOWN & LATEX)
    # =========================================================================
    lessons.append(make_lesson(
        4, 2, "Bài 4: Giới thiệu về Carbohydrate: Glucose & Fructose",
        "Đường Glucose (đường nho) và Fructose (đường mật ong) đều có cùng công thức phân tử $C_6H_{12}O_6$ ($M=180$). Cả hai đều tráng gương tạo bạc sáng loáng, nhưng chỉ có Glucose mới làm mất màu nước Brom!",
        [
            {
                "heading": "I. CẤU TRÚC PHÂN TỬ (NHẬN DIỆN TRONG 1 NỐT NHẠC)",
                "points": [
                    "🍇 **Glucose ($C_6H_{12}O_6$)**: Phân tử có **5 nhóm $-OH$ kề nhau** (tính chất polyalcohol) + **1 nhóm anđehit $-CHO$** ở đầu mạch: $$\\text{CH}_2\\text{OH}-(CHOH)_4-\\text{CHO}$$",
                    "🍯 **Fructose ($C_6H_{12}O_6$)**: Là đồng phân của Glucose, có **5 nhóm $-OH$** + **1 nhóm xeton $>C=O$** ở carbon số 2: $$\\text{CH}_2\\text{OH}-(CHOH)_3-\\text{CO}-\\text{CH}_2\\text{OH}$$",
                    "🔄 **Cơ chế chuyển hóa kì diệu**: Trong môi trường KIỀM (như thuốc thử Tollens, dung dịch $Cu(OH)_2/NaOH$), Fructose tự động chuyển hóa thành Glucose: $$\\text{Fructose} \\;\\xrightleftharpoons{\\text{OH}^-}\\; \\text{Glucose}$$"
                ]
            },
            {
                "heading": "II. 3 PHẢN ỨNG THÍ NGHIỆM ĐỈNH CAO CỦA GLUCOSE",
                "points": [
                    "🔹 **1. Hòa tan $Cu(OH)_2$ ở nhiệt độ thường $\\to$ Dung dịch Xanh Lam Thẫm**: Do có nhiều nhóm $-OH$ kề nhau, glucose hòa tan kết tủa $Cu(OH)_2$ tạo phức đồng màu xanh lam tuyệt đẹp: $$2\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{Cu(OH)}_2 \\to [\\text{C}_6\\text{H}_{11}\\text{O}_6]_2\\text{Cu (Phức xanh lam thẫm)} + 2\\text{H}_2\\text{O}$$",
                    "🔹 **2. Phản ứng Tráng Bạc với Thuốc thử Tollens $\\to$ Gương Bạc Sáng Loáng**: Nhóm $-CHO$ khử ion $Ag^+$ thành kim loại $Ag$ sáng bóng bám vào thành ống nghiệm: $$\\text{CH}_2\\text{OH(CHOH)}_4\\text{CHO} + 2[\\text{Ag(NH}_3)_2]\\text{OH} \\;\\xrightarrow{t^\\circ}\\; \\text{CH}_2\\text{OH(CHOH)}_4\\text{COONH}_4 + 2\\text{Ag} \\downarrow + 3\\text{NH}_3 + \\text{H}_2\\text{O}$$ ✨ Ghi nhớ: $1\\text{ mol Glucose} \\to 2\\text{ mol Ag kim loại} \\downarrow$.",
                    "🔹 **3. Làm mất màu nước Brom $\\to$ Tuyệt chiêu phân biệt Glucose và Fructose**: Glucose làm MẤT MÀU nước Brom (tạo axit gluconic), còn Fructose KHÔNG làm mất màu nước Brom!"
                ]
            },
            {
                "heading": "III. ỨNG DỤNG THỰC TẾ & LÊN MEN RƯỢU",
                "points": [
                    "🍷 **Lên men rượu**: $\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{Men zima}} 2\\text{C}_2\\text{H}_5\\text{OH (Rượu)} + 2\\text{CO}_2 \\uparrow$.",
                    "💉 **Y học**: Dùng làm dịch truyền huyết thanh ngọt (glucose 5%) tiếp sức cấp tốc cho người ốm mệt."
                ]
            }
        ],
        [
            "$$1\\text{ mol Glucose (-CHO)} + 2[\\text{Ag(NH}_3)_2]\\text{OH} \\to 2\\text{ mol Ag} \\downarrow$$",
            "$$2\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{Cu(OH)}_2 \\to [\\text{C}_6\\text{H}_{11}\\text{O}_6]_2\\text{Cu (Xanh lam thẫm)} + 2\\text{H}_2\\text{O}$$",
            "$$\\text{Phân biệt}: \\text{Glucose làm mất màu nước } \\text{Br}_2 \\;(\\text{Fructose thì KHÔNG})$$"
        ],
        [
            "$$\\text{CH}_2\\text{OH(CHOH)}_4\\text{CHO} + 2[\\text{Ag(NH}_3)_2]\\text{OH} \\to \\text{CH}_2\\text{OH(CHOH)}_4\\text{COONH}_4 + 2\\text{Ag} \\downarrow + 3\\text{NH}_3 + \\text{H}_2\\text{O}$$",
            "$$2\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{Cu(OH)}_2 \\to [\\text{C}_6\\text{H}_{11}\\text{O}_6]_2\\text{Cu} + 2\\text{H}_2\\text{O}$$",
            "$$\\text{CH}_2\\text{OH(CHOH)}_4\\text{CHO} + \\text{Br}_2 + \\text{H}_2\\text{O} \\to \\text{CH}_2\\text{OH(CHOH)}_4\\text{COOH} + 2\\text{HBr}$$"
        ],
        "Tại sao Fructose không chứa nhóm anđehit (-CHO) nhưng trong phòng thí nghiệm vẫn tham gia phản ứng tráng bạc tạo gương sáng?",
        "Vì thuốc thử Tollens [Ag(NH3)2]OH có môi trường kiềm bazơ (chứa NH3/OH-). Trong môi trường kiềm, Fructose nhanh chóng bị đồng phân hóa chuyển thành Glucose qua chất trung gian enediol, và chính Glucose tạo thành này tham gia phản ứng khử Ag+ thành gương bạc Ag kim loại sáng bóng.",
        ["GLUCOSE", "TOLLENS_REAGENT", "CuSO4", "NaOH", "BROMINE"]
    ))

    # =========================================================================
    # BÀI 8: AMINE (AMIN) – PHÂN LOẠI & TÍNH BAZƠ
    # =========================================================================
    lessons.append(make_lesson(
        8, 3, "Bài 8: Amine (Amin) – Phân loại, Cấu trúc & Tính bazơ",
        "Amine là gì? Lấy phân tử Amoniac $NH_3$ mùi khai, rút bớt $H$ ra và cắm gốc hydrocarbon vào $\\to$ Thành Amine! Đều có tính bazơ và có thể làm quỳ tím hóa xanh!",
        [
            {
                "heading": "I. BẬC AMIN & CÁCH NHẬN BIẾT (SIÊU DỄ)",
                "points": [
                    "🔹 **Bậc của amin = Số nguyên tử H trong $NH_3$ bị thay thế**:",
                    "  • **Bậc 1**: Thay 1 H $\\to \\text{R-NH}_2$ (Ví dụ: Metylamin $\\text{CH}_3\\text{NH}_2$, Anilin $\\text{C}_6\\text{H}_5\\text{NH}_2$).",
                    "  • **Bậc 2**: Thay 2 H $\\to \\text{R-NH-R}'$ (Ví dụ: Đimetylamin $\\text{CH}_3\\text{-NH-CH}_3$).",
                    "  • **Bậc 3**: Thay cả 3 H $\\to \\text{R-N(R')-R}''$ (Ví dụ: Trimetylamin $(\\text{CH}_3)_3\\text{N}$).",
                    "⚠️ Lưu ý: Bậc amin tính theo số gốc gắn vào N, KHÁC HOÀN TOÀN bậc ancol (tính theo bậc carbon mang nhóm -OH)!"
                ]
            },
            {
                "heading": "II. SO SÁNH ĐỘ MẠNH TÍNH BAZƠ (BÍ KÍP ĐIỂM 10)",
                "points": [
                    "🔹 **Quy luật lực bazơ**: Gốc đẩy electron (nhóm ankyl no) làm TĂNG tính bazơ; Gốc hút electron (vòng benzen thơm) làm GIẢM tính bazơ.",
                    "🔹 **Bảng xếp hạng lực bazơ kinh điển**:",
                    "$$(\\text{CH}_3)_2\\text{NH} \\;(\\text{Bậc 2}) > \\text{CH}_3\\text{NH}_2 \\;(\\text{Bậc 1}) > \\text{NH}_3 > \\text{C}_6\\text{H}_5\\text{NH}_2 \\;(\\text{Anilin})$$",
                    "🔹 **Đổi màu chỉ thị**: Amin béo làm **quỳ tím hóa xanh** (hoặc phenolphthalein hóa hồng). Riêng **Anilin ($\text{C}_6\text{H}_5\text{NH}_2$)** có tính bazơ rất yếu nên **KHÔNG làm đổi màu quỳ tím**!"
                ]
            },
            {
                "heading": "III. ANILINE VỚI NƯỚC BROM (PHẢN ỨNG TẠO KẾT TỦA TRẮNG)",
                "points": [
                    "Nhỏ nước Brom vào dung dịch Anilin $\\to$ Xuất hiện ngay lập tức **kết tủa TRẮNG** của 2,4,6-tribromanilin (dùng để nhận biết Anilin!):",
                    "$$\\text{C}_6\\text{H}_5\\text{NH}_2 + 3\\text{Br}_2 \\to \\text{C}_6\\text{H}_2\\text{Br}_3\\text{NH}_2 \\downarrow (\\text{Trắng}) + 3\\text{HBr}$$"
                ]
            }
        ],
        [
            "$$\\text{Lực bazơ}: (\\text{CH}_3)_2\\text{NH} > \\text{CH}_3\\text{NH}_2 > \\text{NH}_3 > \\text{C}_6\\text{H}_5\\text{NH}_2$$",
            "$$\\text{Nhận biết Anilin}: \\text{C}_6\\text{H}_5\\text{NH}_2 + 3\\text{Br}_2 \\to \\text{C}_6\\text{H}_2\\text{Br}_3\\text{NH}_2 \\downarrow (\\text{Trắng}) + 3\\text{HBr}$$"
        ],
        [
            "$$\\text{CH}_3\\text{NH}_2 + \\text{HCl} \\to \\text{CH}_3\\text{NH}_3\\text{Cl} \\quad (\\text{Khói trắng muối amoni})$$",
            "$$\\text{C}_6\\text{H}_5\\text{NH}_2 + 3\\text{Br}_2 \\to \\text{C}_6\\text{H}_2\\text{Br}_3\\text{NH}_2 \\downarrow (\\text{Kết tủa trắng}) + 3\\text{HBr}$$"
        ],
        "Làm thế nào để rửa sạch ống nghiệm bị dính Anilin dầu mỡ bám chặt vào đáy thủy tinh?",
        "Vì Anilin không tan trong nước nhưng có tính bazơ, ta chỉ cần tráng ống nghiệm bằng dung dịch axit clohidric (HCl). Anilin sẽ phản ứng với HCl tạo thành muối phenylamoni clorua (C6H5NH3Cl) tan hoàn toàn trong nước, sau đó rửa lại nhẹ nhàng bằng nước sạch.",
        ["NH3", "BROMINE", "HCl", "NaOH"]
    ))

    # =========================================================================
    # BÀI 15: PIN ĐIỆN HÓA & NGUỒN ĐIỆN GALVANI
    # =========================================================================
    lessons.append(make_lesson(
        15, 5, "Bài 15: Thế điện cực & Nguồn điện hóa học (Pin Galvani)",
        "Biến hóa năng thành điện năng bằng phản ứng oxi hóa - khử tự phát giữa 2 thanh kim loại nhúng trong dung dịch muối!",
        [
            {
                "heading": "I. CẤU TẠO & CƠ CHẾ PIN ĐIỆN ZN – CU (QUY TẮC ANOT / CATOT)",
                "points": [
                    "⚡ **Cực Âm (Anot - Kim loại mạnh hơn $\\text{Zn}$)**: Xảy ra quá trình **OXI HÓA** (nhường electron): $$\\text{Zn} \\to \\text{Zn}^{2+} + 2e \\quad (\\text{Thanh kẽm bị mòn dần})$$",
                    "⚡ **Cực Dương (Catot - Kim loại yếu hơn $\\text{Cu}$)**: Xảy ra quá trình **KHỬ** (nhận electron): $$\\text{Cu}^{2+} + 2e \\to \\text{Cu} \\downarrow \\quad (\\text{Đồng kim loại bám vào thanh Cu dày lên})$$",
                    "🌉 **Cầu muối (chứa dung dịch $KNO_3$ hoặc $KCl$)**: Giữ cân bằng điện tích giữa 2 cốc dung dịch (anion $NO_3^-$ sang cực âm, cation $K^+$ sang cực dương).",
                    "🔋 **Công thức tính Suất điện động chuẩn $E^\\circ_{\\text{pin}}$**: $$E^\\circ_{\\text{pin}} = E^\\circ_{\\text{catot (dương)}} - E^\\circ_{\\text{anot (âm)}} = E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) - E^\\circ(\\text{Zn}^{2+}/\\text{Zn}) = 0.34 - (-0.76) = +1.10\\text{ V}$$"
                ]
            }
        ],
        [
            "$$E^\\circ_{\\text{pin}} = E^\\circ_{\\text{catot (dương)}} - E^\\circ_{\\text{anot (âm)}} > 0$$",
            "$$\\text{Pin Zn-Cu}: E^\\circ_{\\text{pin}} = 0.34 - (-0.76) = +1.10\\text{ V}$$"
        ],
        [
            "$$\\text{Anot (-)}: \\text{Zn} \\to \\text{Zn}^{2+} + 2e$$",
            "$$\\text{Catot (+)}: \\text{Cu}^{2+} + 2e \\to \\text{Cu} \\downarrow$$",
            "$$\\text{Phản ứng tổng}: \\text{Zn} + \\text{Cu}^{2+} \\to \\text{Zn}^{2+} + \\text{Cu} \\quad (E^\\circ_{\\text{pin}} = +1.10\\text{V})$$"
        ],
        "Cho cặp Mg2+/Mg (-2,37V) và Cu2+/Cu (+0,34V). Suất điện động chuẩn của pin Mg - Cu là bao nhiêu?",
        "E°_pin = E°(Cu2+/Cu) - E°(Mg2+/Mg) = 0,34 - (-2,37) = +2,71 V.",
        ["Zn", "CuSO4", "Fe", "Cu", "AgNO3"]
    ))

    # =========================================================================
    # BÀI 28: PHỨC CHẤT (COORDINATION CHEMISTRY)
    # =========================================================================
    lessons.append(make_lesson(
        28, 8, "Bài 28: Sơ lược về Phức chất (Coordination Chemistry)",
        "Phức chất là sự kết hợp kì diệu giữa một ion kim loại trung tâm (như $Cu^{2+}, Fe^{3+}, Ag^+$) với các phân tử phối tử xung quanh (như $NH_3, H_2O, OH^-$) tạo nên màu sắc rực rỡ và tính chất phi thường!",
        [
            {
                "heading": "I. CẤU TẠO PHỨC CHẤT (MÔ HÌNH HẠT NHÂN & PHỐI TỬ)",
                "points": [
                    "🔹 **Công thức tổng quát**: $$[\\text{M}(\\text{L})_n]^z$$ Trong đó: $\\text{M}$ là ion kim loại trung tâm (có orbital trống); $\\text{L}$ là phối tử ligand (có cặp electron tự do cho - nhận); $n$ là số phối trí.",
                    "🔹 **Phức đồng amoniac màu XANH LAM THẪM**: Nhỏ từ từ dung dịch $NH_3$ vào dung dịch $CuSO_4$: Ban đầu tạo kết tủa xanh nhạt $Cu(OH)_2$, sau đó kết tủa tan dần tạo dung dịch phức $[\\text{Cu}(\\text{NH}_3)_4]^{2+}$ màu **xanh lam thẫm** trong suốt: $$\\text{Cu(OH)}_2 + 4\\text{NH}_3 \\to [\\text{Cu(NH}_3)_4](\\text{OH})_2 \\quad (\\text{Tan tạo phức xanh thẫm})$$",
                    "🔹 **Thuốc thử Tollens tráng bạc**: Là phức chất diamminebac(I) $[\\text{Ag(NH}_3)_2]^+$."
                ]
            }
        ],
        [
            "$$[\\text{M}(\\text{L})_n]^z \\quad (\\text{Liên kết cho - nhận giữa phối tử L và ion trung tâm M})$$",
            "$$\\text{Cu}^{2+} + 4\\text{NH}_3 \\to [\\text{Cu(NH}_3)_4]^{2+} \\quad (\\text{Màu xanh lam thẫm})$$",
            "$$\\text{Ag}^+ + 2\\text{NH}_3 \\to [\\text{Ag(NH}_3)_2]^+ \\quad (\\text{Thuốc thử Tollens})$$"
        ],
        [
            "$$\\text{CuSO}_4 + 2\\text{NH}_3 + 2\\text{H}_2\\text{O} \\to \\text{Cu(OH)}_2 \\downarrow (\\text{Xanh nhạt}) + (\\text{NH}_4)_2\\text{SO}_4$$",
            "$$\\text{Cu(OH)}_2 + 4\\text{NH}_3 \\to [\\text{Cu(NH}_3)_4](\\text{OH})_2 \\quad (\\text{Dung dịch xanh lam thẫm})$$"
        ],
        "Mô tả hiện tượng khi nhỏ từ từ dung dịch NH3 đến dư vào ống nghiệm chứa CuSO4?",
        "Ban đầu xuất hiện kết tủa màu xanh nhạt của Cu(OH)2. Khi nhỏ tiếp NH3 đến dư, kết tủa tan dần tạo thành dung dịch trong suốt có màu XANH LAM THẪM đặc trưng của ion phức tetraamminedong(II) [Cu(NH3)4]2+.",
        ["CuSO4", "NH3", "AgNO3", "FeCl3", "PHENOL"]
    ))

    return lessons

print("Loaded get_mindmap_g12")
