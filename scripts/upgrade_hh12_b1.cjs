const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/vietnamCurriculumData.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// 1. Upgraded hh12_b1: 100% Comprehensive Ester - Lipid
const upgraded_b1 = {
  "id": "hh12_b1",
  "code": "HH12-B01",
  "lessonNumber": 1,
  "grade": 12,
  "chapterNumber": 1,
  "chapterTitle": {
    "VN": "Chương 1: Ester – Lipid",
    "EN": "Chapter 1: Esters – Lipids & Saponification"
  },
  "title": {
    "VN": "Bài 1: Ester – Lipid (Khái niệm, Cấu tạo & Tính chất Toàn diện)",
    "EN": "Lesson 1: Esters & Lipids (Comprehensive Theory, Structure & Properties)"
  },
  "summary": {
    "VN": "Dễ hiểu nhất: Lấy phân tử Axit cacboxylic (chua), rút nhóm $-OH$ ra rồi cắm nhóm $-OR'$ của Ancol vào $\\to$ Ta được một phân tử Ester thơm nức mùi hoa quả! Nắm trọn 100% bài học: Khái niệm & gọi tên IUPAC, cách đếm nhanh đồng phân ($2^{n-2}$), tính chất vật lí & bảng mùi hoa quả, 2 phản ứng thủy phân cốt lõi & các trường hợp đặc biệt, phản ứng cháy & gốc không no (thủy tinh hữu cơ Plexiglas), kỹ thuật thí nghiệm điều chế Fischer chuẩn thi THPTQG, 4 axit béo ruột của chất béo và các ứng dụng thực tế đỉnh cao.",
    "EN": "The most intuitive definition: Take a carboxylic acid (sour), remove the $-OH$ group and attach the $-OR'$ group from an alcohol $\\to$ You obtain a sweet, fruity ester molecule! Master 100% of the curriculum: IUPAC nomenclature, isomer shortcut formulas ($2^{n-2}$), physical properties & fruit scents, reversible/irreversible hydrolysis & special cases, combustion & unsaturated reactions (Plexiglas PMMA), laboratory Fischer esterification protocols, the 4 key fatty acids of triglycerides, and cutting-edge industrial applications."
  },
  "sections": [
    {
      "heading": {
        "VN": "I. KHÁI NIỆM, CẤU TẠO & MẸO ĐỌC TÊN IUPAC TRONG 3 GIÂY",
        "EN": "I. CONCEPT, STRUCTURE & 3-SECOND IUPAC NOMENCLATURE RULE"
      },
      "points": [
        {
          "VN": "🔹 **Ester sinh ra từ đâu?**: Khi cho carboxylic acid tác dụng với alcohol (xúc tác $\\text{H}_2\\text{SO}_4$ đặc, đun nóng), nhóm $-\\text{OH}$ ở gốc acid bị thay thế bởi nhóm $-\\text{OR}'$ của alcohol $\\to$ Tạo thành ester có dạng tổng quát: $$\\text{R-COO-R}'$$ (trong đó $\\text{R}$ là nguyên tử $\\text{H}$ hoặc gốc hydrocarbon, $\\text{R}'$ bắt buộc là gốc hydrocarbon).",
          "EN": "🔹 **How are Esters Formed?**: When a carboxylic acid reacts with an alcohol (catalyzed by concentrated $\\text{H}_2\\text{SO}_4$, heated), the $-\\text{OH}$ group of the acid is replaced by the $-\\text{OR}'$ alkoxy group of the alcohol $\\to$ Forming a general ester molecule: $$\\text{R-COO-R}'$$ (where $\\text{R}$ is $\\text{H}$ or a hydrocarbon radical, and $\\text{R}'$ must be a hydrocarbon radical)."
        },
        {
          "VN": "🔹 **Công thức tổng quát ester no, đơn chức, mạch hở**: Luôn tuân theo công thức phân tử: $$\\text{C}_n\\text{H}_{2n}\\text{O}_2 \\quad (n \\ge 2)$$ Ví dụ: $\\text{HCOOCH}_3$ ($n=2$, methyl formate), $\\text{CH}_3\\text{COOCH}_2\\text{CH}_3$ ($n=4$, ethyl acetate).",
          "EN": "🔹 **General Formula for Saturated Open-Chain Monoesters**: Always follows the molecular formula: $$\\text{C}_n\\text{H}_{2n}\\text{O}_2 \\quad (n \\ge 2)$$ Examples: $\\text{HCOOCH}_3$ ($n=2$, methyl formate), $\\text{CH}_3\\text{COOCH}_2\\text{CH}_3$ ($n=4$, ethyl acetate)."
        },
        {
          "VN": "🔹 **Mẹo đọc tên IUPAC trong 3 giây**: Đọc tên gốc đuôi hydrocarbon $\\text{R}'$ trước $\\to$ Đọc tên gốc acid $\\text{RCOO}-$ tương ứng rồi đổi đuôi *-ic* thành đuôi *-at* (*-ate*). Ví dụ: $\\text{CH}_3\\text{COO-C}_2\\text{H}_5 \\implies \\text{C}_2\\text{H}_5$ là *ethyl*, $\\text{CH}_3\\text{COO-}$ là *acetate* $\\to$ **Ethyl acetate**; $\\text{HCOO-CH}_3 \\to$ **Methyl formate**; $\\text{CH}_2\\text{=CH-COOCH}_3 \\to$ **Methyl acrylate**.",
          "EN": "🔹 **3-Second IUPAC Nomenclature Rule**: State the tail hydrocarbon radical $\\text{R}'$ first $\\to$ Then state the carboxylate acid root $\\text{RCOO}-$ ending in *-ate*. Example: $\\text{CH}_3\\text{COO-C}_2\\text{H}_5 \\implies \\text{C}_2\\text{H}_5$ is *ethyl*, $\\text{CH}_3\\text{COO-}$ is *acetate* $\\to$ **Ethyl acetate**; $\\text{HCOO-CH}_3 \\to$ **Methyl formate**; $\\text{CH}_2\\text{=CH-COOCH}_3 \\to$ **Methyl acrylate**."
        },
        {
          "VN": "🔹 **Phân loại Ester**: Gồm ester đơn chức ($\\text{RCOOR}'$), ester đa chức (tạo bởi đa acid + đơn alcohol như $(\\text{RCOO})_n\\text{R}'$ hoặc đơn acid + đa alcohol như $(\\text{RCOO})_n\\text{R}'$), ester không no (có liên kết đôi $\\text{C=C}$ ở gốc) và ester thơm ($\\text{RCOOC}_6\\text{H}_5$).",
          "EN": "🔹 **Ester Classification**: Monofunctional esters ($\\text{RCOOR}'$), polyfunctional esters (polyacid + monoalcohol or polyalcohol + monoacid), unsaturated esters (containing $\\text{C=C}$ double bonds), and aromatic phenyl esters ($\\text{RCOOC}_6\\text{H}_5$)."
        }
      ]
    },
    {
      "heading": {
        "VN": "II. TÍNH CHẤT VẬT LÍ, ĐỘ TAN & BẢNG MÙI THƠM HOA QUẢ KINH ĐIỂN",
        "EN": "II. PHYSICAL PROPERTIES, SOLUBILITY & CLASSIC FRUIT FRAGRANCE GUIDE"
      },
      "points": [
        {
          "VN": "🔹 **Độ tan & Khối lượng riêng**: Phần lớn ester ở điều kiện thường là chất lỏng nhẹ hơn nước ($d < 1\\text{ g/cm}^3$), không tan hoặc rất ít tan trong nước và nổi lên trên bề mặt. Nguyên nhân: Giữa các phân tử ester **KHÔNG CÓ liên kết hydrogen liên phân tử** như acid và alcohol, đồng thời khả năng tạo liên kết hydrogen với phân tử nước cực kỳ yếu.",
          "EN": "🔹 **Solubility & Density**: Most esters at ambient conditions are liquids lighter than water ($d < 1\\text{ g/cm}^3$), insoluble or poorly soluble in water, floating on the surface. Cause: Ester molecules **LACK intermolecular hydrogen bonds** with one another, and their ability to form hydrogen bonds with water molecules is negligible."
        },
        {
          "VN": "🔹 **Nhiệt độ sôi**: Thấp hơn rất nhiều so với alcohol và carboxylic acid có cùng phân tử khối hoặc cùng số nguyên tử carbon do không có liên kết hydrogen liên phân tử: $$T_s(\\text{Ester}) < T_s(\\text{Alcohol}) < T_s(\\text{Carboxylic Acid})$$ Ví dụ: Ethyl formate ($M=74, T_s = 54^\\circ\\text{C}$) thấp hơn Propionic acid ($M=74, T_s = 141^\\circ\\text{C}$).",
          "EN": "🔹 **Boiling Point Comparison**: Significantly lower than isomeric alcohols and carboxylic acids of comparable molecular mass due to the absence of intermolecular hydrogen bonding: $$T_b(\\text{Ester}) < T_b(\\text{Alcohol}) < T_b(\\text{Carboxylic Acid})$$ Example: Ethyl formate ($M=74, T_b = 54^\\circ\\text{C}$) vs. Propionic acid ($M=74, T_b = 141^\\circ\\text{C}$)."
        },
        {
          "VN": "🔹 **Bảng 5 mùi thơm hoa quả kinh điển trong đề thi THPTQG & Quốc tế**:\n🍌 **Chuối chín**: Isoamyl acetate $\\text{CH}_3\\text{COOCH}_2\\text{CH}_2\\text{CH(CH}_3)_2$\n🍍 **Quả dứa**: Ethyl butyrate $\\text{C}_3\\text{H}_7\\text{COOC}_2\\text{H}_5$ & Ethyl propionate $\\text{C}_2\\text{H}_5\\text{COOC}_2\\text{H}_5$\n🍎 **Quả táo**: Ethyl isovalerate $\\text{CH}_3\\text{-CH(CH}_3)\\text{-CH}_2\\text{COOC}_2\\text{H}_5$\n🌸 **Hoa nhài**: Benzyl acetate $\\text{CH}_3\\text{COOCH}_2\\text{C}_6\\text{H}_5$\n🌹 **Hoa hồng**: Geranyl acetate $\\text{CH}_3\\text{COOC}_{10}\\text{H}_{17}$.",
          "EN": "🔹 **5 Classic Fruit & Floral Fragrances in National Exams**:\n🍌 **Ripe Banana**: Isoamyl acetate $\\text{CH}_3\\text{COOCH}_2\\text{CH}_2\\text{CH(CH}_3)_2$\n🍍 **Pineapple**: Ethyl butyrate $\\text{C}_3\\text{H}_7\\text{COOC}_2\\text{H}_5$ & Ethyl propionate $\\text{C}_2\\text{H}_5\\text{COOC}_2\\text{H}_5$\n🍎 **Apple**: Ethyl isovalerate $\\text{CH}_3\\text{-CH(CH}_3)\\text{-CH}_2\\text{COOC}_2\\text{H}_5$\n🌸 **Jasmine**: Benzyl acetate $\\text{CH}_3\\text{COOCH}_2\\text{C}_6\\text{H}_5$\n🌹 **Rose**: Geranyl acetate $\\text{CH}_3\\text{COOC}_{10}\\text{H}_{17}$."
        }
      ]
    },
    {
      "heading": {
        "VN": "III. 2 PHẢN ỨNG THỦY PHÂN CỐT LÕI & CÁC TRƯỜNG HỢP ĐẶC BIỆT",
        "EN": "III. CORE HYDROLYSIS REACTIONS & ESSENTIAL SPECIAL CASES"
      },
      "points": [
        {
          "VN": "🔹 **1. Thủy phân trong Axit (Thuận nghịch 2 chiều $\\rightleftharpoons$)**: Đun với dung dịch acid vô cơ loãng ($\\text{H}_2\\text{SO}_4$ loãng hoặc $\\text{HCl}$), ester bị phân cắt thuận nghịch trả lại acid cacboxylic và alcohol ban đầu: $$\\text{R-COO-R}' + \\text{H}_2\\text{O} \\;\\xrightleftharpoons{\\text{H}^+, t^\\circ}\\; \\text{R-COOH} + \\text{R}'\\text{-OH}$$ ⚠️ Phản ứng không hoàn toàn (hiệu suất $< 100\\%$), sau phản ứng tạo hỗn hợp tách thành 2 lớp chất lỏng!",
          "EN": "🔹 **1. Acid-Catalyzed Hydrolysis (Reversible Equilibrium $\\rightleftharpoons$)**: Refluxing with dilute inorganic acid ($\\text{H}_2\\text{SO}_4$ or $\\text{HCl}$) reversibly cleaves the ester back into the parent carboxylic acid and alcohol: $$\\text{R-COO-R}' + \\text{H}_2\\text{O} \\;\\xrightleftharpoons{\\text{H}^+, t^\\circ}\\; \\text{R-COOH} + \\text{R}'\\text{-OH}$$ ⚠️ Incomplete reaction (yield $< 100\\%$); upon cooling, the mixture separates into two immiscible liquid layers!"
        },
        {
          "VN": "🔹 **2. Thủy phân trong Kiềm / Phản ứng Xà phòng hóa (1 chiều $\\rightarrow$)**: Đun với dung dịch $\\text{NaOH}$ hoặc $\\text{KOH}$, ester bị bẻ gãy hoàn toàn tạo muối carboxylate natri/kali và alcohol: $$\\text{R-COO-R}' + \\text{NaOH} \\;\\xrightarrow{t^\\circ}\\; \\text{R-COONa (Muối)} + \\text{R}'\\text{-OH (Alcohol)}$$ ✨ Phản ứng xảy ra hoàn toàn (1 chiều), sau phản ứng tạo dung dịch đồng nhất!",
          "EN": "🔹 **2. Base-Promoted Hydrolysis / Saponification (Irreversible $\\rightarrow$)**: Heating with $\\text{NaOH}$ or $\\text{KOH}$ completely hydrolyzes the ester into sodium/potassium carboxylate salt and alcohol: $$\\text{R-COO-R}' + \\text{NaOH} \\;\\xrightarrow{t^\\circ}\\; \\text{R-COONa (Salt)} + \\text{R}'\\text{-OH (Alcohol)}$$ ✨ Complete irreversible reaction, yielding a clear homogeneous solution!"
        },
        {
          "VN": "🔹 **3 Trường hợp đặc biệt cực hay bẫy trong đề thi**:\n1. **Ester của Phenol**: Tác dụng với kiềm theo tỉ lệ mol $1 : 2$, sinh ra 2 muối và nước (không tạo alcohol): $$\\text{R-COOC}_6\\text{H}_5 + 2\\text{NaOH} \\xrightarrow{t^\\circ} \\text{R-COONa} + \\text{C}_6\\text{H}_5\\text{ONa} + \\text{H}_2\\text{O}$$\n2. **Vinyl Ester** (nối đôi đính trực tiếp vào oxi): Bị thủy phân tạo muối và aldehyde: $$\\text{CH}_3\\text{COOCH=CH}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{CH}_3\\text{CHO}$$\n3. **Ester tạo Ketone**: Gốc không no có nhánh đính vào carbon mang liên kết ester: $$\\text{CH}_3\\text{COOC(CH}_3)\\text{=CH}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{CH}_3\\text{COCH}_3 \\text{ (Acetone)}$$.",
          "EN": "🔹 **3 High-Yield Special Cases in Exams**:\n1. **Phenyl Ester**: Reacts with alkali in a $1 : 2$ mole ratio, producing two salts and water without forming alcohol: $$\\text{R-COOC}_6\\text{H}_5 + 2\\text{NaOH} \\xrightarrow{t^\\circ} \\text{R-COONa} + \\text{C}_6\\text{H}_5\\text{ONa} + \\text{H}_2\\text{O}$$\n2. **Vinyl Ester** (alkenyl directly bonded to ester oxygen): Hydrolyzes into a carboxylate salt and an aldehyde: $$\\text{CH}_3\\text{COOCH=CH}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{CH}_3\\text{CHO}$$\n3. **Ketone-Forming Ester**: Branched alkenyl at the ester linkage hydrolyzes to a ketone: $$\\text{CH}_3\\text{COOC(CH}_3)\\text{=CH}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{CH}_3\\text{COCH}_3 \\text{ (Acetone)}$$."
        }
      ]
    },
    {
      "heading": {
        "VN": "IV. CÁCH TÍNH SỐ ĐỒNG PHÂN & MẸO ĐẾM NHANH CẤU TẠO (TRỌNG TÂM ĐỀ THI)",
        "EN": "IV. CONSTITUTIONAL ISOMER SHORTCUTS & COUNTING TECHNIQUES"
      },
      "points": [
        {
          "VN": "🔹 **Mẹo tính nhanh số đồng phân ester no, đơn chức, mạch hở**: Đối với ester $\\text{C}_n\\text{H}_{2n}\\text{O}_2$, số lượng đồng phân cấu tạo ester được tính nhanh bằng công thức: $$\\text{Số đồng phân ester} = 2^{n - 2} \\quad (2 \\le n < 5)$$",
          "EN": "🔹 **Shortcut Formula for Saturated Open-Chain Monoesters**: For esters $\\text{C}_n\\text{H}_{2n}\\text{O}_2$, the number of constitutional ester isomers is computed as: $$\\text{Number of ester isomers} = 2^{n - 2} \\quad (2 \\le n < 5)$$"
        },
        {
          "VN": "🔹 **Bảng liệt kê tường minh các đồng phân thường gặp trong đề thi**:\n• **$\\text{C}_2\\text{H}_4\\text{O}_2$ ($n=2$)**: $2^{2-2} = 1$ đồng phân duy nhất: $\\text{HCOOCH}_3$ (Methyl formate).\n• **$\\text{C}_3\\text{H}_6\\text{O}_2$ ($n=3$)**: $2^{3-2} = 2$ đồng phân: $\\text{HCOOCH}_2\\text{CH}_3$ (Ethyl formate) và $\\text{CH}_3\\text{COOCH}_3$ (Methyl acetate).\n• **$\\text{C}_4\\text{H}_8\\text{O}_2$ ($n=4$)**: $2^{4-2} = 4$ đồng phân:\n  1. $\\text{HCOO-CH}_2\\text{CH}_2\\text{CH}_3$ (Propyl formate)\n  2. $\\text{HCOO-CH(CH}_3)_2$ (Isopropyl formate)\n  3. $\\text{CH}_3\\text{COO-CH}_2\\text{CH}_3$ (Ethyl acetate)\n  4. $\\text{CH}_3\\text{CH}_2\\text{COO-CH}_3$ (Methyl propionate).\n• **$\\text{C}_5\\text{H}_{10}\\text{O}_2$ ($n=5$)**: Có **9** đồng phân cấu tạo ester (4 gốc formate + 2 gốc acetate + 2 gốc propionate + 1 gốc butyrate).",
          "EN": "🔹 **Explicit Isomer Inventory in National Exams**:\n• **$\\text{C}_2\\text{H}_4\\text{O}_2$ ($n=2$)**: $2^{2-2} = 1$ isomer: $\\text{HCOOCH}_3$ (Methyl formate).\n• **$\\text{C}_3\\text{H}_6\\text{O}_2$ ($n=3$)**: $2^{3-2} = 2$ isomers: $\\text{HCOOCH}_2\\text{CH}_3$ (Ethyl formate) & $\\text{CH}_3\\text{COOCH}_3$ (Methyl acetate).\n• **$\\text{C}_4\\text{H}_8\\text{O}_2$ ($n=4$)**: $2^{4-2} = 4$ isomers:\n  1. $\\text{HCOO-CH}_2\\text{CH}_2\\text{CH}_3$ (Propyl formate)\n  2. $\\text{HCOO-CH(CH}_3)_2$ (Isopropyl formate)\n  3. $\\text{CH}_3\\text{COO-CH}_2\\text{CH}_3$ (Ethyl acetate)\n  4. $\\text{CH}_3\\text{CH}_2\\text{COO-CH}_3$ (Methyl propionate).\n• **$\\text{C}_5\\text{H}_{10}\\text{O}_2$ ($n=5$)**: Has **9** constitutional ester isomers."
        },
        {
          "VN": "🔹 **Mẹo làm bài trắc nghiệm về tính chất đặc biệt**:\n• **Ester có phản ứng tráng bạc ($+ \\text{AgNO}_3/\\text{NH}_3 \\to 2\\text{Ag}\\downarrow$)**: Bắt buộc phải có dạng $\\text{HCOOR}'$ (gốc acid là acid formic). Ví dụ: $\\text{C}_4\\text{H}_8\\text{O}_2$ có 4 đồng phân este thì có đúng 2 đồng phân tham gia tráng bạc ($\\text{HCOO-C}_3\\text{H}_7$).\n• **Ester thơm chứa vòng benzen $\\text{C}_8\\text{H}_8\\text{O}_2$**: Có tổng cộng **4 đồng phân ester** thơm ($\\text{HCOOCH}_2\\text{C}_6\\text{H}_5$, $\\text{HCOOC}_6\\text{H}_4\\text{CH}_3$ [ortho, meta, para], $\\text{CH}_3\\text{COOC}_6\\text{H}_5$, và $\\text{C}_6\\text{H}_5\\text{COOCH}_3$).",
          "EN": "🔹 **Exam Shortcuts for Functional Isomerism**:\n• **Silver Mirror Active Esters ($+ \\text{AgNO}_3/\\text{NH}_3 \\to 2\\text{Ag}\\downarrow$)**: Must have the general structure $\\text{HCOOR}'$ (formate head). For example, among the 4 isomers of $\\text{C}_4\\text{H}_8\\text{O}_2$, exactly 2 undergo silver mirroring ($\\text{HCOO-C}_3\\text{H}_7$).\n• **Aromatic Phenyl Esters $\\text{C}_8\\text{H}_8\\text{O}_2$**: Possess **4 ester isomers** ($\\text{HCOOCH}_2\\text{C}_6\\text{H}_5$, $\\text{HCOOC}_6\\text{H}_4\\text{CH}_3$ [ortho, meta, para], $\\text{CH}_3\\text{COOC}_6\\text{H}_5$, and $\\text{C}_6\\text{H}_5\\text{COOCH}_3$)."
        }
      ]
    },
    {
      "heading": {
        "VN": "V. PHẢN ỨNG CHÁY & PHẢN ỨNG CỦA GỐC HYDROCARBON KHÔNG NO",
        "EN": "V. COMBUSTION STOICHIOMETRY & UNSATURATED RADICAL REACTIONS"
      },
      "points": [
        {
          "VN": "🔹 **Phản ứng Cháy ester no, đơn chức, mạch hở**: Khi đốt cháy hoàn toàn trong oxi dư, số mol $\\text{CO}_2$ sinh ra LUÔN BẰNG số mol $\\text{H}_2\\text{O}$: $$\\text{C}_n\\text{H}_{2n}\\text{O}_2 + \\frac{3n - 2}{2}\\text{O}_2 \\;\\xrightarrow{t^\\circ}\\; n\\text{CO}_2 + n\\text{H}_2\\text{O} \\implies n_{\\text{CO}_2} = n_{\\text{H}_2\\text{O}}$$ Ngược lại, nếu đốt cháy một este mà thu được $n_{\\text{CO}_2} > n_{\\text{H}_2\\text{O}} \\implies$ Este đó không no (chứa liên kết đôi $\\text{C=C}$ hoặc vòng).",
          "EN": "🔹 **Combustion of Saturated Open-Chain Monoesters**: Complete combustion produces equal moles of carbon dioxide and water: $$\\text{C}_n\\text{H}_{2n}\\text{O}_2 + \\frac{3n - 2}{2}\\text{O}_2 \\;\\xrightarrow{t^\\circ}\\; n\\text{CO}_2 + n\\text{H}_2\\text{O} \\implies n_{\\text{CO}_2} = n_{\\text{H}_2\\text{O}}$$ Conversely, if $n_{\\text{CO}_2} > n_{\\text{H}_2\\text{O}} \\implies$ The ester is unsaturated (contains $\\text{C=C}$ double bonds or rings)."
        },
        {
          "VN": "🔹 **Phản ứng cộng của gốc không no**: Các ester có liên kết đôi $\\text{C=C}$ ở gốc hydrocarbon (như methyl acrylate $\\text{CH}_2\\text{=CH-COOCH}_3$, triolein) có khả năng:\n• Làm mất màu dung dịch nước Brom: $\\text{CH}_2\\text{=CH-COOCH}_3 + \\text{Br}_2 \\to \\text{CH}_2\\text{Br-CHBr-COOCH}_3$.\n• Cộng hidro ($\\text{Ni}, t^\\circ$): Chuyển hóa ester không no thành ester no tương ứng.\n• Làm mất màu dung dịch thuốc tím $\\text{KMnO}_4$.",
          "EN": "🔹 **Addition Reactions of Unsaturated Radicals**: Esters containing $\\text{C=C}$ double bonds (e.g. methyl acrylate $\\text{CH}_2\\text{=CH-COOCH}_3$, triolein) readily:\n• Decolorize aqueous bromine: $\\text{CH}_2\\text{=CH-COOCH}_3 + \\text{Br}_2 \\to \\text{CH}_2\\text{Br-CHBr-COOCH}_3$.\n• Add hydrogen ($\\text{Ni}, t^\\circ$): Converting unsaturated esters to saturated analogues.\n• Decolorize potassium permanganate ($\\text{KMnO}_4$)."
        },
        {
          "VN": "🔹 **Phản ứng trùng hợp tạo Thủy tinh Hữu cơ (Plexiglas / PMMA)**: Ester chứa liên kết đôi có khả năng tham gia phản ứng trùng hợp tạo polymer hữu dụng. Nổi tiếng nhất là Methyl methacrylate trùng hợp tạo Poly(methyl methacrylate): $$n\\,\\text{CH}_2\\text{=C(CH}_3)\\text{-COOCH}_3 \\;\\xrightarrow{xt, t^\\circ, p}\\; \\left[\\text{-CH}_2\\text{-C(CH}_3)(\\text{COOCH}_3)\\text{-}\\right]_n$$",
          "EN": "🔹 **Polymerization to Organic Glass (Plexiglas / PMMA)**: Esters containing alkenyl radicals polymerize into high-grade plastics. Most famously, methyl methacrylate polymerizes into poly(methyl methacrylate): $$n\\,\\text{CH}_2\\text{=C(CH}_3)\\text{-COOCH}_3 \\;\\xrightarrow{xt, t^\\circ, p}\\; \\left[\\text{-CH}_2\\text{-C(CH}_3)(\\text{COOCH}_3)\\text{-}\\right]_n$$"
        }
      ]
    },
    {
      "heading": {
        "VN": "VI. THÍ NGHIỆM ĐIỀU CHẾ ESTER (FISCHER) & KỸ THUẬT PHÒNG LAB CHUẨN THPTQG",
        "EN": "VI. LABORATORY FISCHER ESTERIFICATION SYNTHESIS & PRACTICAL SKILLS"
      },
      "points": [
        {
          "VN": "🔹 **3 Bước thực hành điều chế Ethyl Acetate chuẩn phòng thí nghiệm**:\n• **Bước 1**: Cho $1\\text{ mL } \\text{C}_2\\text{H}_5\\text{OH}$ nguyên chất, $1\\text{ mL } \\text{CH}_3\\text{COOH}$ băng và vài giọt dung dịch $\\text{H}_2\\text{SO}_4$ đặc vào ống nghiệm khô, lắc đều.\n• **Bước 2**: Đặt ống nghiệm vào cốc nước nóng $65 - 70^\\circ\\text{C}$ (đun cách thủy) trong khoảng 5 phút, có lắp ống thủy tinh thẳng làm ống sinh hàn khí để hồi lưu hơi.\n• **Bước 3**: Để nguội ống nghiệm, sau đó rót thêm $2\\text{ mL}$ dung dịch $\\text{NaCl}$ bão hòa vào hỗn hợp.",
          "EN": "🔹 **3-Step Practical Synthesis of Ethyl Acetate**:\n• **Step 1**: Add $1\\text{ mL}$ absolute $\\text{C}_2\\text{H}_5\\text{OH}$, $1\\text{ mL}$ glacial $\\text{CH}_3\\text{COOH}$, and a few drops of concentrated $\\text{H}_2\\text{SO}_4$ into a clean dry test tube, shake gently.\n• **Step 2**: Immerse the tube in a hot water bath at $65 - 70^\\circ\\text{C}$ for 5 minutes with a vertical glass condenser tube to reflux volatile vapors.\n• **Step 3**: Cool to room temperature, then pour $2\\text{ mL}$ of saturated $\\text{NaCl}$ solution into the tube."
        },
        {
          "VN": "🔹 **Hiện tượng quan sát được**: Sau bước 2, hỗn hợp bắt đầu có mùi thơm hoa quả đặc trưng của ester. Sau bước 3, chất lỏng trong ống nghiệm tách thành 2 lớp rõ rệt: lớp ester nhẹ hơn nổi lên phía trên, lớp nước muối ở phía dưới.",
          "EN": "🔹 **Observed Laboratory Phenomena**: After step 2, a sweet fruity ester fragrance evolves. After step 3, the liquid clearly separates into two distinct phases: the lighter ester layer floats on top, and the aqueous saline solution settles below."
        },
        {
          "VN": "🔹 **4 Lưu ý sống còn trong đề thi THPTQG về thí nghiệm này**:\n1. **Vai trò của $\\text{H}_2\\text{SO}_4$ đặc**: Đóng vai trò kép cực kỳ quan trọng: Vừa là **chất xúc tác** làm tăng tốc độ phản ứng este hóa, vừa là **chất hút nước** để làm giảm nồng độ $\\text{H}_2\\text{O}$, làm cân bằng hóa học chuyển dịch sang chiều thuận theo nguyên lý Le Chatelier, nâng cao hiệu suất tạo ester.\n2. **Vai trò của dung dịch $\\text{NaCl}$ bão hòa**: Nhằm 2 mục đích sống còn: Làm tăng khối lượng riêng của lớp dung dịch nước bên dưới, đồng thời làm giảm độ tan của ethyl acetate trong nước (hiệu ứng 'salting out'), giúp ester tách lớp sắc nét hoàn toàn.\n3. **Vai trò của phương pháp đun cách thủy & đá bọt**: Nhiệt độ $65 - 70^\\circ\\text{C}$ giúp phản ứng đạt tốc độ tối ưu mà không làm sôi bốc hơi mất acid và alcohol (đều dễ cháy); đá bọt giúp điều hòa quá trình sôi, tránh hiện tượng trào dung dịch.\n4. **Ống thủy tinh dài đóng vai trò gì**: Đóng vai trò là ống sinh hàn hồi lưu, giúp ngưng tụ hơi alcohol, acid và ester bay hơi trở lại ống nghiệm, tránh hao hụt sản phẩm.",
          "EN": "🔹 **4 Critical National Exam Points on This Experiment**:\n1. **Dual Role of Concentrated $\\text{H}_2\\text{SO}_4$**: Acts both as a **catalyst** to accelerate the reaction rate and as a **dehydrating agent** absorbing water to drive equilibrium forward via Le Chatelier's principle, maximizing yield.\n2. **Role of Saturated $\\text{NaCl}$ Solution**: Serves two essential functions: Increases aqueous phase density and drastically lowers ester solubility via the **salting-out effect**, causing the ester to cleanly separate as the upper layer.\n3. **Water Bath & Boiling Chips**: Heating at $65 - 70^\\circ\\text{C}$ avoids open flames since alcohols/esters are volatile and flammable; porous boiling chips ensure smooth boiling without dangerous bumping.\n4. **Vertical Condenser Glass Tube**: Functions as an air-cooled reflux condenser, condensing volatile vapors back into the liquid phase to prevent material loss."
        }
      ]
    },
    {
      "heading": {
        "VN": "VII. CHẤT BÉO (TRIGLYCERIDE) & 4 AXIT BÉO NẰM LÒNG",
        "EN": "VII. FATS (TRIGLYCERIDES) & THE 4 ESSENTIAL FATTY ACIDS"
      },
      "points": [
        {
          "VN": "🔹 **Chất béo là gì?**: Là triester của Glycerol $\\text{C}_3\\text{H}_5(\\text{OH})_3$ với các acid béo monocacboxylic mạch carbon dài chẵn không phân nhánh, có công thức chung: $$(\\text{R-COO})_3\\text{C}_3\\text{H}_5$$",
          "EN": "🔹 **What are Fats?**: Triesters of glycerol $\\text{C}_3\\text{H}_5(\\text{OH})_3$ with long even-numbered unbranched fatty acids, represented by: $$(\\text{R-COO})_3\\text{C}_3\\text{H}_5$$"
        },
        {
          "VN": "🔹 **4 Acid béo ruột bắt buộc phải thuộc**:\n1. **Axit Panmitic**: $\\text{C}_{15}\\text{H}_{31}\\text{COOH}$ ($M=256$, gốc no $\\to$ tạo chất béo rắn Tripalmitin $(\\text{C}_{15}\\text{H}_{31}\\text{COO})_3\\text{C}_3\\text{H}_5$).\n2. **Axit Stearic**: $\\text{C}_{17}\\text{H}_{35}\\text{COOH}$ ($M=284$, gốc no $\\to$ tạo chất béo rắn Tristearin $(\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5$).\n3. **Axit Oleic**: $\\text{C}_{17}\\text{H}_{33}\\text{COOH}$ ($M=282$, gốc không no có 1 nối đôi $\\text{C=C}$ dạng cis $\\to$ tạo chất béo lỏng Triolein $(\\text{C}_{17}\\text{H}_{33}\\text{COO})_3\\text{C}_3\\text{H}_5$).\n4. **Axit Linoleic**: $\\text{C}_{17}\\text{H}_{31}\\text{COOH}$ ($M=280$, gốc không no có 2 nối đôi $\\text{C=C}$ dạng cis $\\to$ tạo chất béo lỏng Trilinolein $(\\text{C}_{17}\\text{H}_{31}\\text{COO})_3\\text{C}_3\\text{H}_5$).",
          "EN": "🔹 **The 4 Fundamental Fatty Acids to Memorize**:\n1. **Palmitic Acid**: $\\text{C}_{15}\\text{H}_{31}\\text{COOH}$ ($M=256$, saturated $\\to$ forms solid fat Tripalmitin $(\\text{C}_{15}\\text{H}_{31}\\text{COO})_3\\text{C}_3\\text{H}_5$).\n2. **Stearic Acid**: $\\text{C}_{17}\\text{H}_{35}\\text{COOH}$ ($M=284$, saturated $\\to$ forms solid fat Tristearin $(\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5$).\n3. **Oleic Acid**: $\\text{C}_{17}\\text{H}_{33}\\text{COOH}$ ($M=282$, monounsaturated with 1 cis $\\text{C=C}$ $\\to$ forms liquid oil Triolein $(\\text{C}_{17}\\text{H}_{33}\\text{COO})_3\\text{C}_3\\text{H}_5$).\n4. **Linoleic Acid**: $\\text{C}_{17}\\text{H}_{31}\\text{COOH}$ ($M=280$, polyunsaturated with 2 cis $\\text{C=C}$ $\\to$ forms liquid oil Trilinolein $(\\text{C}_{17}\\text{H}_{31}\\text{COO})_3\\text{C}_3\\text{H}_5$)."
        },
        {
          "VN": "🔹 **Quy tắc Thể Rắn vs Thể Lỏng**:\n• **Mỡ động vật** (chứa chủ yếu gốc acid béo no như Tristearin, Tripalmitin): Mạch hydrocarbon duỗi thẳng, các phân tử xếp khít nhau $\\implies$ Lực tương tác Van der Waals lớn $\\implies$ Nhiệt độ nóng chảy cao $\\implies$ **Thể rắn ở nhiệt độ thường**.\n• **Dầu thực vật** (chứa chủ yếu gốc acid béo không no như Triolein): Liên kết đôi dạng cis bẻ gãy khúc mạch carbon, cản trở các phân tử xếp khít $\\implies$ Lực liên phân tử yếu $\\implies$ Nhiệt độ nóng chảy thấp $\\implies$ **Thể lỏng ở nhiệt độ thường**.",
          "EN": "🔹 **Solid vs. Liquid Phase Rule**:\n• **Animal Fats** (chiefly saturated radicals like tristearin): Straight carbon chains pack tightly together $\\implies$ Strong intermolecular Van der Waals forces $\implies$ High melting points $\implies$ **Solid at room temperature**.\n• **Vegetable Oils** (chiefly unsaturated cis radicals like triolein): Cis double bonds introduce kinks in the carbon backbone preventing tight packing $\\implies$ Weak intermolecular forces $\implies$ Low melting points $\implies$ **Liquid at room temperature**."
        },
        {
          "VN": "🔹 **Biến dầu lỏng thành bơ rắn (Phản ứng Hydro hóa)**: Sục khí $\\text{H}_2$ vào dầu thực vật lỏng ở nhiệt độ cao có xúc tác Niken để no hóa liên kết đôi: $$(\\text{C}_{17}\\text{H}_{33}\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{H}_2 \\;\\xrightarrow{\\text{Ni}, t^\\circ}\\; (\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5 \\text{ (Tristearin rắn)}$$ Ứng dụng: Sản xuất bơ nhân tạo Margarine và xà phòng bánh, giúp vận chuyển dễ dàng và bảo quản lâu hơn.",
          "EN": "🔹 **Hydrogenation (Converting Liquid Oil to Solid Margarine)**: Bubbling $\\text{H}_2$ through unsaturated oil over a Nickel catalyst saturates $\\text{C=C}$ double bonds: $$(\\text{C}_{17}\\text{H}_{33}\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{H}_2 \\;\\xrightarrow{\\text{Ni}, t^\\circ}\\; (\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5 \\text{ (Solid Tristearin)}$$ Industrial use: Produces margarine and hard soaps, prolonging shelf life and facilitating transportation."
        },
        {
          "VN": "🔹 **Hiện tượng Ôi thiu của Chất Béo**: Khi dầu mỡ để lâu tiếp xúc với oxy không khí và ánh sáng, các liên kết đôi $\\text{C=C}$ ở gốc acid béo không no bị oxy hóa chậm tạo thành các hợp chất hydroperoxide hữu cơ, sau đó phân hủy tạo thành các aldehyde và ketone có mùi khét khó chịu và gây độc hại.",
          "EN": "🔹 **Rancidification of Lipids**: When cooking oils and fats are exposed to atmospheric oxygen and light, unsaturated $\\text{C=C}$ double bonds undergo auto-oxidation forming lipid hydroperoxides, which subsequently decompose into pungent, foul-smelling, and harmful aldehydes and ketones."
        }
      ]
    },
    {
      "heading": {
        "VN": "VIII. ỨNG DỤNG THỰC TẾ ĐỜI SỐNG & FUN FACTS HÓA HỌC ĐỈNH CAO",
        "EN": "VIII. REAL-WORLD APPLICATIONS, INDUSTRIAL USES & CHEMISTRY FUN FACTS"
      },
      "points": [
        {
          "VN": "🔹 **Ứng dụng của Ester trong đời sống & công nghiệp**:\n• **Dung môi tuyệt vời**: Ethyl acetate và butyl acetate có khả năng hòa tan rất tốt các polyme, sơn móng tay, mực in, vecni và nhựa tổng hợp.\n• **Hương liệu & Nước hoa**: Chiết xuất hoặc tổng hợp làm hương thơm cho bánh kẹo, nước ngọt, mỹ phẩm và nước hoa cao cấp.\n• **Vật liệu Poly(methyl methacrylate) (Plexiglas)**: Có độ truyền suốt quang học lên đến $92\\%$, độ bền va đập gấp 10 lần thủy tinh vô cơ, không vỡ thành mảnh vụn sắc nhọn. Ứng dụng: Kính buồng lái máy bay chiến đấu, kính chắn gió xe đua F1, bể cá thủy cung khổng lồ, răng giả y tế và kính áp tròng!",
          "EN": "🔹 **Ester Applications in Everyday Life & Technology**:\n• **Superb Solvents**: Ethyl acetate and butyl acetate are widely utilized to dissolve polymers, nail polish, paints, varnishes, and industrial resins.\n• **Fragrances & Flavors**: Formulated into confectionery, soft drinks, luxury perfumes, and cosmetics.\n• **Plexiglas (PMMA Organic Glass)**: Boasts $92\\%$ light transmittance, 10x the impact resistance of inorganic silica glass, and shatter-resistant safety. Applications: Fighter jet cockpits, Formula 1 windscreens, massive public aquarium tunnels, dental prosthetics, and intraocular lenses!"
        },
        {
          "VN": "🔹 **Tầm quan trọng sinh học của Lipid & Chất béo**:\n• **Kho dự trữ năng lượng vàng**: $1\\text{ gam}$ chất béo khi oxy hóa hoàn toàn giải phóng tới $\\approx 9\\text{ kcal} \\approx 37.7\\text{ kJ}$, gấp hơn 2 lần năng lượng do $1\\text{ gam}$ carbohydrate hoặc protein cung cấp ($\\approx 4\\text{ kcal}$).\n• **Hòa tan Vitamin**: Là môi trường hòa tan duy nhất để cơ thể hấp thu các vitamin thiết yếu $\\text{A}, \\text{D}, \\text{E}, \\text{K}$. Thiếu chất béo sẽ dẫn đến thiếu hụt nghiêm trọng các vitamin này.\n• **Cấu trúc màng tế bào & Mô đệm**: Lớp lipid kép (phospholipid) cấu thành màng tế bào sống, đồng thời lớp mỡ dưới da giữ ấm và bảo vệ các cơ quan nội tạng khỏi va đập cơ học.",
          "EN": "🔹 **Biological Significance of Lipids & Fats**:\n• **Prime Energy Depot**: Complete oxidation of $1\\text{ gram}$ of fat delivers $\\approx 9\\text{ kcal} \\approx 37.7\\text{ kJ}$, over twice the caloric density of carbohydrates or proteins ($\\approx 4\\text{ kcal/g}$).\n• **Vitamin Vehicle**: Acts as the sole dissolving medium for fat-soluble vitamins $\\text{A}, \\text{D}, \\text{E}, \\text{and } \\text{K}$. Fat deficiency inhibits their intestinal absorption.\n• **Cellular Architecture & Insulation**: Phospholipid bilayers form living cell membranes, while adipose tissue insulates the body and cushions vital organs."
        },
        {
          "VN": "🔹 **Fun Facts Hóa học thú vị dành cho bạn**:\n• 🐟 **Omega-3 & Omega-6**: Cơ thể người không thể tự tổng hợp các acid béo không no đa liên kết như EPA, DHA (có trong cá hồi, dầu hạt lanh), nhưng chúng lại tối quan trọng cho sự phát triển của não bộ và tim mạch!\n• 🧼 **Nguồn gốc từ 'Sapo' (Xà phòng)**: Người La Mã cổ đại phát hiện ra xà phòng từ đồi Sapo, nơi mỡ động vật tế thần chảy vào tro củi kiềm ($\\text{K}_2\\text{CO}_3$), tạo ra bọt rửa trôi vết bẩn khi trời mưa!\n• 🍌 **Chuối chín tự 'gây mê'**: Mùi chuối chín ngào ngạt do chính isoamyl acetate tạo ra, cùng với khí ethylene do chuối tiết ra kích thích các quả chuối xung quanh chín đồng loạt!",
          "EN": "🔹 **Fascinating Chemistry Fun Facts**:\n• 🐟 **Essential Omega-3 & Omega-6**: Humans lack enzymes to synthesize polyunsaturated fatty acids like EPA & DHA, yet they are vital building blocks of brain tissue and cardiovascular health!\n• 🧼 **The Legend of Mount Sapo**: Ancient Romans discovered soap on Mount Sapo when sacrificed animal tallow mixed with wood ash alkalies ($\\text{K}_2\\text{CO}_3$), producing natural cleansing foam during rainfall!\n• 🍌 **Banana Self-Ripening Aroma**: The unmistakable sweet scent of ripe bananas is pure isoamyl acetate, produced concurrently with ethylene gas that triggers neighboring fruits to ripen!"
        }
      ]
    }
  ],
  "keyFormulas": [
    {
      "VN": "Ester no đơn chức mạch hở: C_n H₂n O₂ (n ≥ 2)",
      "EN": "$$\\text{General Formula (Saturated Monoester)}: \\text{C}_n\\text{H}_{2n}\\text{O}_2 \\quad (n \\ge 2)$$"
    },
    {
      "VN": "Mẹo tính số đồng phân ester no đơn chức: Số đồng phân = 2^{n - 2} (2 ≤ n < 5)",
      "EN": "$$\\text{Isomer Shortcut Formula}: \\text{Number of Isomers} = 2^{n - 2} \\quad (2 \\le n < 5)$$"
    },
    {
      "VN": "Đốt cháy ester no đơn chức mạch hở: n_CO₂ = n_H₂O",
      "EN": "$$\\text{Combustion Stoichiometry}: n_{\\text{CO}_2} = n_{\\text{H}_2\\text{O}} \\quad \\text{and} \\quad n_{\\text{O}_2} = \\frac{3n - 2}{2} \\times n_{\\text{ester}}$$"
    },
    {
      "VN": "Hiệu suất phản ứng este hóa: H% = (n_este thực tế / n_este lý thuyết) × 100%",
      "EN": "$$\\text{Esterification Yield}: H\\% = \\frac{n_{\\text{ester (actual)}}}{n_{\\text{ester (theoretical)}}} \\times 100\\%$$"
    },
    {
      "VN": "Thủy phân trong axit: R-COO-R' + H₂O ⇌ R-COOH + R'-OH (H⁺, t°)",
      "EN": "$$\\text{Acid Hydrolysis}: R\\text{-COO-}R' + \\text{H}_2\\text{O} \\;\\underset{\\text{H}^+, t^\\circ}{\\rightleftharpoons}\\; R\\text{-COOH} + R'\\text{-OH}$$"
    },
    {
      "VN": "Xà phòng hóa: R-COO-R' + NaOH → R-COONa + R'-OH (t°)",
      "EN": "$$\\text{Saponification}: R\\text{-COO-}R' + \\text{NaOH} \\;\\xrightarrow{t^\\circ}\\; R\\text{-COONa} + R'\\text{-OH}$$"
    },
    {
      "VN": "Bảo toàn khối lượng xà phòng hóa: m_este + m_NaOH pư = m_muối + m_ancol",
      "EN": "$$\\text{Mass Conservation}: m_{\\text{ester}} + m_{\\text{NaOH}} = m_{\\text{salt}} + m_{\\text{alcohol}}$$"
    },
    {
      "VN": "Xà phòng hóa chất béo (Triglyceride): n_NaOH = 3 × n_chất béo = 3 × n_glycerol",
      "EN": "$$\\text{Triglyceride Saponification}: n_{\\text{NaOH}} = 3 \\times n_{\\text{fat}} = 3 \\times n_{\\text{glycerol}}$$"
    }
  ],
  "equations": [
    {
      "VN": "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O  [H₂SO₄ đặc, t° - Phản ứng Este hóa Fischer]",
      "EN": "$$\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\;\\xrightleftharpoons{\\text{H}_2\\text{SO}_4\\text{ conc.}, t^\\circ}\\; \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O} \\quad [\\text{Fischer Esterification}]$$"
    },
    {
      "VN": "CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH  [Xà phòng hóa etyl axetat]",
      "EN": "$$\\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{NaOH} \\;\\xrightarrow{t^\\circ}\\; \\text{CH}_3\\text{COONa} + \\text{C}_2\\text{H}_5\\text{OH} \\quad [\\text{Ethyl Acetate Saponification}]$$"
    },
    {
      "VN": "C_nH_{2n}O₂ + ((3n - 2)/2) O₂ → n CO₂ + n H₂O  [Đốt cháy este no đơn chức mạch hở]",
      "EN": "$$\\text{C}_n\\text{H}_{2n}\\text{O}_2 + \\frac{3n - 2}{2}\\text{O}_2 \\;\\xrightarrow{t^\\circ}\\; n\\text{CO}_2 + n\\text{H}_2\\text{O} \\quad [\\text{Complete Combustion}]$$"
    },
    {
      "VN": "CH₂=CH-COOCH₃ + Br₂ → CH₂Br-CHBr-COOCH₃  [Làm mất màu dung dịch Brom]",
      "EN": "$$\\text{CH}_2\\text{=CH-COOCH}_3 + \\text{Br}_2 \\;\\to\\; \\text{CH}_2\\text{Br-CHBr-COOCH}_3 \\quad [\\text{Bromine Addition to Methyl Acrylate}]$$"
    },
    {
      "VN": "n CH₂=C(CH₃)COOCH₃ → [-CH₂-C(CH₃)(COOCH₃)-]_n  [xt, t°, p - Trùng hợp tạo Thủy tinh hữu cơ Plexiglas]",
      "EN": "$$n\\,\\text{CH}_2\\text{=C(CH}_3)\\text{-COOCH}_3 \\;\\xrightarrow{xt, t^\\circ, p}\\; \\left[\\text{-CH}_2\\text{-C(CH}_3)(\\text{COOCH}_3)\\text{-}\\right]_n \\quad [\\text{PMMA Plexiglas Polymerization}]$$"
    },
    {
      "VN": "CH₃COOC₆H₅ + 2NaOH → CH₃COONa + C₆H₅ONa + H₂O  [Ester của Phenol tác dụng tỉ lệ 1:2]",
      "EN": "$$\\text{CH}_3\\text{COOC}_6\\text{H}_5 + 2\\text{NaOH} \\;\\xrightarrow{t^\\circ}\\; \\text{CH}_3\\text{COONa} + \\text{C}_6\\text{H}_5\\text{ONa} + \\text{H}_2\\text{O} \\quad [\\text{Phenyl Ester Cleavage}]$$"
    },
    {
      "VN": "CH₃COOCH=CH₂ + NaOH → CH₃COONa + CH₃CHO  [Vinyl ester tạo anđehit]",
      "EN": "$$\\text{CH}_3\\text{COOCH=CH}_2 + \\text{NaOH} \\;\\xrightarrow{t^\\circ}\\; \\text{CH}_3\\text{COONa} + \\text{CH}_3\\text{CHO} \\quad [\\text{Vinyl Ester Cleavage}]$$"
    },
    {
      "VN": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃  [Xà phòng hóa Tristearin tạo xà phòng]",
      "EN": "$$(\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\;\\xrightarrow{t^\\circ}\\; 3\\text{C}_{17}\\text{H}_{35}\\text{COONa} + \\text{C}_3\\text{H}_5(\\text{OH})_3 \\quad [\\text{Tristearin Saponification}]$$"
    },
    {
      "VN": "(C₁₇H₃₃COO)₃C₃H₅ + 3H₂ → (C₁₇H₃₅COO)₃C₃H₅  [Ni, t° - Hydro hóa biến dầu lỏng thành bơ Margarine rắn]",
      "EN": "$$(\\text{C}_{17}\\text{H}_{33}\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{H}_2 \\;\\xrightarrow{\\text{Ni}, t^\\circ}\\; (\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5 \\quad [\\text{Hydrogenation to Solid Margarine}]$$"
    }
  ],
  "theoryPoints": [
    {
      "VN": "[I. KHÁI NIỆM & DANH PHÁP] Ester có công thức chung R-COO-R'. Ester no, đơn chức, mạch hở: C_n H_{2n} O_2 (n ≥ 2). Tên gọi: Tên gốc R' + tên gốc acid đổi đuôi -at.",
      "EN": "[I. CONCEPTS & NOMENCLATURE] General ester formula R-COO-R'. Saturated open-chain monoesters: C_n H_{2n} O_2 (n ≥ 2). IUPAC name: R' hydrocarbon radical + acid root ending in -ate."
    },
    {
      "VN": "[II. TÍNH CHẤT VẬT LÍ] Nhẹ hơn nước, ít tan trong nước, Ts(este) < Ts(ancol) < Ts(axit). Mùi thơm: chuối chín (isoamyl axetat), quả dứa (etyl butirat), hoa nhài (benzyl axetat).",
      "EN": "[II. PHYSICAL PROPERTIES] Lighter than water, low solubility, Tb(ester) < Tb(alcohol) < Tb(acid). Fragrances: banana (isoamyl acetate), pineapple (ethyl butyrate), jasmine (benzyl acetate)."
    },
    {
      "VN": "[III. THỦY PHÂN] Thủy phân axit (thuận nghịch 2 chiều, xúc tác H2SO4 loãng, tách 2 lớp). Thủy phân kiềm (xà phòng hóa 1 chiều, tạo dung dịch đồng nhất). Este phenol cần 2 NaOH tạo 2 muối và nước. Vinyl este tạo anđehit.",
      "EN": "[III. HYDROLYSIS] Acid hydrolysis is reversible (dilute H2SO4, 2 layers). Saponification is irreversible (1 layer). Phenyl esters react with 2 NaOH yielding 2 salts and H2O. Vinyl esters yield aldehydes."
    },
    {
      "VN": "[IV. ĐỒNG PHÂN] Mẹo tính nhanh số đồng phân este no đơn hở: 2^{n-2} (2 ≤ n < 5). C2H4O2 có 1 đp, C3H6O2 có 2 đp, C4H8O2 có 4 đp (trong đó 2 đp có phản ứng tráng bạc HCOO-). Este thơm C8H8O2 có 4 đồng phân este.",
      "EN": "[IV. ISOMERS] Shortcut for saturated open-chain monoesters: 2^{n-2} (2 ≤ n < 5). C2H4O2 has 1 isomer, C3H6O2 has 2, C4H8O2 has 4 (2 active in silver mirror test HCOO-). Aromatic C8H8O2 has 4 ester isomers."
    },
    {
      "VN": "[V. PHẢN ỨNG CHÁY & GỐC KHÔNG NO] Đốt este no đơn hở cho n_CO2 = n_H2O. Gốc không no làm mất màu dd Brom, cộng H2 (Ni, t°). Trùng hợp metyl metacrylat tạo thủy tinh hữu cơ Plexiglas (PMM).",
      "EN": "[V. COMBUSTION & UNSATURATED RADICALS] Combustion of saturated monoesters gives n_CO2 = n_H2O. Unsaturated radicals decolorize Br2 and add H2. Methyl methacrylate polymerizes to Plexiglas (PMMA)."
    },
    {
      "VN": "[VI. THÍ NGHIỆM ĐIỀU CHẾ FISCHER] Axit axetic + ethanol + H2SO4 đặc, đun cách thủy 65-70°C. H2SO4 đặc vừa xúc tác vừa hút nước chuyển dịch cân bằng. Thêm dd NaCl bão hòa để tăng khối lượng riêng và giảm độ tan của este, giúp este nổi lên tách lớp sắc nét.",
      "EN": "[VI. FISCHER SYNTHESIS] Acetic acid + ethanol + conc H2SO4, heated in 65-70°C water bath. Conc H2SO4 acts as catalyst and dehydrating agent. Saturated NaCl increases aqueous density and salts out the ester into a sharp upper layer."
    },
    {
      "VN": "[VII. CHẤT BÉO & 4 AXIT BÉO] Triester (RCOO)3C3H5 của glycerol. 4 axit béo: Panmitic (C15H31COOH, no), Stearic (C17H35COOH, no), Oleic (C17H33COOH, 1 nối đôi cis), Linoleic (C17H31COOH, 2 nối đôi cis). Dầu thực vật (lỏng) + 3H2 → mỡ bơ (rắn). Chất béo ôi thiu do nối đôi C=C bị oxy hóa thành peoxit.",
      "EN": "[VII. FATS & 4 FATTY ACIDS] Triesters (RCOO)3C3H5 of glycerol. 4 acids: Palmitic (C15H31COOH, sat), Stearic (C17H35COOH, sat), Oleic (C17H33COOH, 1 cis double bond), Linoleic (C17H31COOH, 2 cis double bonds). Hydrogenation converts liquid oil to solid margarine. Rancidification occurs via auto-oxidation of C=C bonds."
    },
    {
      "VN": "[VIII. ỨNG DỤNG & FUN FACTS] Dung môi ethyl/butyl axetat pha sơn, mực in; Thủy tinh hữu cơ Plexiglas làm kính máy bay, kính bảo hộ, răng giả; Lipid dự trữ năng lượng 9 kcal/g, hòa tan vitamin A, D, E, K; Axit béo Omega-3/6 bảo vệ tim mạch; Mùi chuối chín là isoamyl axetat.",
      "EN": "[VIII. APPLICATIONS & FUN FACTS] Ethyl/butyl acetate solvents for paints and inks; Plexiglas PMMA for aircraft canopies, safety visors, dentures; Lipids store 9 kcal/g and absorb vitamins A, D, E, K; Omega-3/6 fatty acids protect cardiovascular health; Ripe banana aroma is pure isoamyl acetate."
    }
  ],
  "sampleQuestion": {
    "question": {
      "VN": "1. Cho ester no, đơn chức, mạch hở X có công thức phân tử C₄H₈O₂. Hỏi X có bao nhiêu đồng phân cấu tạo và bao nhiêu đồng phân tham gia được phản ứng tráng bạc? 2. Trong thí nghiệm điều chế ethyl acetate trong phòng thí nghiệm, tại sao sau khi đun cách thủy cần để nguội rồi thêm dung dịch NaCl bão hòa mà không phải nước cất?",
      "EN": "1. Given saturated, open-chain monoester X with molecular formula C₄H₈O₂. How many constitutional isomers does X have, and how many of them can undergo the silver mirror reaction? 2. In the laboratory synthesis of ethyl acetate, why is saturated NaCl solution added after cooling instead of distilled water?"
    },
    "answer": {
      "VN": "1. Áp dụng công thức tính nhanh 2^{n-2} = 2^{4-2} = 4 đồng phân cấu tạo gồm: HCOO-CH₂CH₂CH₃ (propyl fomat), HCOO-CH(CH₃)₂ (isopropyl fomat), CH₃COO-CH₂CH₃ (etyl axetat), và C₂H₅COO-CH₃ (metyl propionat). Trong đó có đúng 2 đồng phân tham gia tráng bạc vì có nhóm formiat HCOO- ở đầu (HCOO-C₃H₇ cả 2 dạng). 2. Rót dung dịch NaCl bão hòa vào hỗn hợp nhằm 2 mục đích sống còn: (a) Làm tăng khối lượng riêng của lớp dung dịch nước bên dưới; (b) Làm giảm độ tan của ethyl acetate trong nước (hiệu ứng salting-out). Nhờ đó, ethyl acetate nhẹ hơn sẽ nổi lên và tách thành lớp dầu riêng biệt cực kỳ sắc nét trên bề mặt, giúp dễ dàng nhận biết và chiết tách. Nếu chỉ thêm nước cất, một lượng lớn este vẫn hòa tan trong nước và ranh giới phân lớp sẽ rất mờ nhạt.",
      "EN": "1. Applying the shortcut formula 2^{n-2} = 2^{4-2} = 4 constitutional isomers: HCOO-CH₂CH₂CH₃ (propyl formate), HCOO-CH(CH₃)₂ (isopropyl formate), CH₃COO-CH₂CH₃ (ethyl acetate), and C₂H₅COO-CH₃ (methyl propionate). Exactly 2 isomers undergo silver mirroring because they possess the formic ester head HCOO- (both forms of HCOO-C₃H₇). 2. Adding saturated NaCl solution serves two vital functions: (a) Increases the density of the lower aqueous phase; (b) Decreases the solubility of ethyl acetate in water (salting-out effect). As a result, the lighter ethyl acetate cleanly separates into a sharp, distinct upper oily layer, allowing effortless observation and extraction. Adding distilled water would leave much of the ester partially dissolved, resulting in poor and faint phase boundary definition."
    }
  },
  "suggestedReagents": [
    "ETHYL_ACETATE",
    "TRIGLYCERIDE",
    "NaOH",
    "GLYCEROL",
    "ETHANOL",
    "ACETIC_ACID",
    "H2SO4"
  ]
};

// 2. Upgraded hh12_b3: 100% Comprehensive Review of Chapter 1: Ester - Lipid
const upgraded_b3 = {
  "id": "hh12_b3",
  "code": "HH12-B03",
  "lessonNumber": 3,
  "grade": 12,
  "chapterNumber": 1,
  "chapterTitle": {
    "VN": "Chương 1: Ester – Lipid",
    "EN": "Chapter 1: Esters – Lipids & Saponification"
  },
  "title": {
    "VN": "Bài 3: Luyện tập & Ôn tập Chuyên sâu Toàn diện Chương 1: Ester – Lipid",
    "EN": "Lesson 3: Comprehensive Problem Solving & Mastery Review of Chapter 1: Esters & Lipids"
  },
  "summary": {
    "VN": "Hệ thống hóa toàn bộ 5 phương pháp giải toán cốt lõi cho kỳ thi THPTQG & Đánh giá năng lực: Phương pháp biện luận đồng phân & tráng bạc, Bảo toàn khối lượng & Tăng giảm khối lượng trong xà phòng hóa, Bài toán đốt cháy ester & hỗn hợp ester, Bài toán chất béo (Triglyceride), chỉ số xà phòng hóa & cộng H₂/Br₂, cùng Kỹ thuật xử lý các câu hỏi thực nghiệm điều chế este.",
    "EN": "Systematize all 5 core problem-solving methodologies for national examinations: Isomer deduction & silver mirror logic, Mass conservation & delta mass in saponification, Ester combustion stoichiometry, Triglyceride fat calculations (saponification index & H₂/Br₂ addition), and Experimental laboratory esterification exam techniques."
  },
  "sections": [
    {
      "heading": {
        "VN": "I. PHƯƠNG PHÁP BIỆN LUẬN ĐỒNG PHÂN & ĐẶC ĐIỂM CẤU TẠO",
        "EN": "I. ISOMER DEDUCTION & STRUCTURAL ELUCIDATION STRATEGIES"
      },
      "points": [
        {
          "VN": "• **Công thức đếm nhanh ester no, đơn chức, mạch hở**: $$\\text{Số đồng phân ester } (\\text{C}_n\\text{H}_{2n}\\text{O}_2) = 2^{n - 2} \\quad (2 \\le n < 5)$$ $\\text{C}_2\\text{H}_4\\text{O}_2 \\to 1$; $\\text{C}_3\\text{H}_6\\text{O}_2 \\to 2$; $\\text{C}_4\\text{H}_8\\text{O}_2 \\to 4$; $\\text{C}_5\\text{H}_{10}\\text{O}_2 \\to 9$ đồng phân cấu tạo.",
          "EN": "• **Shortcut Formula for Saturated Open-Chain Monoesters**: $$\\text{Number of ester isomers } (\\text{C}_n\\text{H}_{2n}\\text{O}_2) = 2^{n - 2} \\quad (2 \\le n < 5)$$ $\\text{C}_2\\text{H}_4\\text{O}_2 \\to 1$; $\\text{C}_3\\text{H}_6\\text{O}_2 \\to 2$; $\\text{C}_4\\text{H}_8\\text{O}_2 \\to 4$; $\\text{C}_5\\text{H}_{10}\\text{O}_2 \\to 9$ constitutional isomers."
        },
        {
          "VN": "• **Nhận diện ester tráng bạc**: Ester tham gia phản ứng tráng bạc $\\implies$ Bắt buộc có cấu tạo dạng $\\text{HCOOR}'$. Thủy phân trong kiềm cho sản phẩm muối $\\text{HCOONa}$ cũng có khả năng tráng bạc (tạo $2\\text{ mol Ag}$ mỗi mol muối).",
          "EN": "• **Recognizing Silver-Mirror Active Esters**: Ester precipitates silver with Tollens' reagent $\\implies$ Must possess the $\\text{HCOOR}'$ format. Alkaline hydrolysis yields $\\text{HCOONa}$, which independently reduces Tollens' reagent ($2\\text{ mol Ag}$ per mol salt)."
        },
        {
          "VN": "• **Nhận diện ester của Phenol**: Thủy phân tác dụng với $\\text{NaOH}$ theo tỉ lệ mol $1 : 2$, sinh ra 2 muối và nước mà không sinh ra alcohol: $$\\text{RCOOC}_6\\text{H}_5 + 2\\text{NaOH} \\to \\text{RCOONa} + \\text{C}_6\\text{H}_5\\text{ONa} + \\text{H}_2\\text{O}$$",
          "EN": "• **Recognizing Phenyl Esters**: Hydrolyzes with $\\text{NaOH}$ in a $1 : 2$ stoichiometric ratio yielding 2 salts and water without producing alcohol: $$\\text{RCOOC}_6\\text{H}_5 + 2\\text{NaOH} \\to \\text{RCOONa} + \\text{C}_6\\text{H}_5\\text{ONa} + \\text{H}_2\\text{O}$$"
        }
      ]
    },
    {
      "heading": {
        "VN": "II. BẢO TOÀN KHỐI LƯỢNG & TĂNG GIẢM KHỐI LƯỢNG TRONG PHẢN ỨNG XÀ PHÒNG HÓA",
        "EN": "II. CONSERVATION OF MASS & DELTA MASS IN SAPONIFICATION"
      },
      "points": [
        {
          "VN": "• **Định luật Bảo toàn khối lượng**: $$m_{\\text{ester}} + m_{\\text{NaOH pư}} = m_{\\text{muối}} + m_{\\text{alcohol}}$$ Lưu ý: Nếu dùng $\\text{NaOH}$ dư thì khi cô cạn dung dịch sau phản ứng, chất rắn khan thu được gồm cả muối và $\\text{NaOH}$ dư: $$m_{\\text{chất rắn}} = m_{\\text{muối}} + m_{\\text{NaOH dư}}$$",
          "EN": "• **Law of Conservation of Mass**: $$m_{\\text{ester}} + m_{\\text{NaOH consumed}} = m_{\\text{salt}} + m_{\\text{alcohol}}$$ Note: If excess $\\text{NaOH}$ is used, the dry solid residue after evaporation comprises both carboxylate salts and unreacted $\\text{NaOH}$: $$m_{\\text{dry solid}} = m_{\\text{salt}} + m_{\\text{NaOH excess}}$$"
        },
        {
          "VN": "• **Phương pháp Tăng giảm khối lượng**: Khi xà phòng hóa ester $\\text{RCOOR}'$ bằng $\\text{NaOH}$ tạo muối $\\text{RCOONa}$: $$\\Delta m = m_{\\text{muối}} - m_{\\text{ester}} = n_{\\text{ester}} \\times (23 - M_{\\text{R}'})$$ • Nếu $M_{\\text{muối}} > M_{\\text{ester}} \\implies M_{\\text{R}'} < 23 \\implies \\text{R}'$ là $-\\text{CH}_3$ ($M=15$).\n• Nếu $M_{\\text{muối}} < M_{\\text{ester}} \\implies M_{\\text{R}'} > 23$ (ví dụ $-\\text{C}_2\\text{H}_5, -\\text{C}_3\\text{H}_7$).",
          "EN": "• **Delta Mass (Mass Variation) Method**: When saponifying ester $\\text{RCOOR}'$ with $\\text{NaOH}$ into $\\text{RCOONa}$: $$\\Delta m = m_{\\text{salt}} - m_{\\text{ester}} = n_{\\text{ester}} \\times (23 - M_{\\text{R}'})$$ • If $M_{\\text{salt}} > M_{\\text{ester}} \\implies M_{\\text{R}'} < 23 \\implies \\text{R}'$ is $-\\text{CH}_3$ ($M=15$).\n• If $M_{\\text{salt}} < M_{\\text{ester}} \\implies M_{\\text{R}'} > 23$ (e.g. $-\\text{C}_2\\text{H}_5, -\\text{C}_3\\text{H}_7$)."
        }
      ]
    },
    {
      "heading": {
        "VN": "III. PHƯƠNG PHÁP GIẢI BÀI TOÁN ĐỐT CHÁY ESTER & HỖN HỢP",
        "EN": "III. COMBUSTION STOICHIOMETRY FOR ESTERS & MIXTURES"
      },
      "points": [
        {
          "VN": "• **Ester no, đơn chức, mạch hở**: Khi đốt cháy luôn có: $$n_{\\text{CO}_2} = n_{\\text{H}_2\\text{O}}$$ Số nguyên tử carbon trung bình: $\\bar{n} = \\frac{n_{\\text{CO}_2}}{n_{\\text{ester}}}$.",
          "EN": "• **Saturated Open-Chain Monoesters**: Combustion always yields: $$n_{\\text{CO}_2} = n_{\\text{H}_2\\text{O}}$$ Mean carbon number: $\\bar{n} = \\frac{n_{\\text{CO}_2}}{n_{\\text{ester}}}$."
        },
        {
          "VN": "• **Bảo toàn nguyên tố Oxi**: $$2 \\times n_{\\text{ester}} + 2 \\times n_{\\text{O}_2} = 2 \\times n_{\\text{CO}_2} + n_{\\text{H}_2\\text{O}}$$ Giúp tính nhanh lượng $\\text{O}_2$ cần dùng hoặc khối lượng ester: $m_{\\text{ester}} = m_{\\text{C}} + m_{\\text{H}} + m_{\\text{O}} = 12n_{\\text{CO}_2} + 2n_{\\text{H}_2\\text{O}} + 32n_{\\text{ester}}$.",
          "EN": "• **Oxygen Element Conservation**: $$2 \\times n_{\\text{ester}} + 2 \\times n_{\\text{O}_2} = 2 \\times n_{\\text{CO}_2} + n_{\\text{H}_2\\text{O}}$$ Rapidly calculates required $\\text{O}_2$ or ester mass: $m_{\\text{ester}} = m_{\\text{C}} + m_{\\text{H}} + m_{\\text{O}} = 12n_{\\text{CO}_2} + 2n_{\\text{H}_2\\text{O}} + 32n_{\\text{ester}}$."
        },
        {
          "VN": "• **Ester không no (có $k$ liên kết pi)**: $$n_{\\text{CO}_2} - n_{\\text{H}_2\\text{O}} = (k - 1) \\times n_{\\text{ester}}$$ Với $k = 2$ (este không no 1 nối đôi $\\text{C=C}$ ở gốc) $\\implies n_{\\text{ester}} = n_{\\text{CO}_2} - n_{\\text{H}_2\\text{O}}$.",
          "EN": "• **Unsaturated Esters ($k$ degrees of unsaturation)**: $$n_{\\text{CO}_2} - n_{\\text{H}_2\\text{O}} = (k - 1) \\times n_{\\text{ester}}$$ For $k = 2$ (mono-unsaturated with 1 $\\text{C=C}$) $\\implies n_{\\text{ester}} = n_{\\text{CO}_2} - n_{\\text{H}_2\\text{O}}$."
        }
      ]
    },
    {
      "heading": {
        "VN": "IV. PHƯƠNG PHÁP GIẢI BÀI TOÁN CHẤT BÉO (TRIGLYCERIDE)",
        "EN": "IV. TRIGLYCERIDE LIPID STOICHIOMETRY & HYDROGENATION METHODS"
      },
      "points": [
        {
          "VN": "• **Tỉ lệ mol vàng trong xà phòng hóa chất béo**: $$n_{\\text{NaOH}} = 3 \\times n_{\\text{chất béo}} = 3 \\times n_{\\text{glycerol}}$$ $$m_{\\text{chất béo}} + m_{\\text{NaOH}} = m_{\\text{muối (xà phòng)}} + m_{\\text{glycerol}} \\quad (M_{\\text{glycerol}} = 92\\text{ g/mol})$$",
          "EN": "• **Golden Molar Ratio in Fat Saponification**: $$n_{\\text{NaOH}} = 3 \\times n_{\\text{fat}} = 3 \\times n_{\\text{glycerol}}$$ $$m_{\\text{fat}} + m_{\\text{NaOH}} = m_{\\text{soap}} + m_{\\text{glycerol}} \\quad (M_{\\text{glycerol}} = 92\\text{ g/mol})$$"
        },
        {
          "VN": "• **Phản ứng hydro hóa & cộng brom của chất béo không no**: Số mol $\\text{H}_2$ hoặc $\\text{Br}_2$ phản ứng đúng bằng số liên kết đôi $\\text{C=C}$ trong phân tử chất béo: $$n_{\\text{H}_2} = n_{\\text{Br}_2} = k_{\\text{C=C}} \\times n_{\\text{chất béo}}$$ Ví dụ: Triolein có 3 nối đôi $\\text{C=C} \\implies n_{\\text{H}_2} = 3 \\times n_{\\text{triolein}}$; Trilinolein có 6 nối đôi $\\text{C=C} \\implies n_{\\text{H}_2} = 6 \\times n_{\\text{trilinolein}}$.",
          "EN": "• **Hydrogenation & Bromination of Unsaturated Fats**: Moles of $\\text{H}_2$ or $\\text{Br}_2$ consumed equals the total number of aliphatic $\\text{C=C}$ double bonds: $$n_{\\text{H}_2} = n_{\\text{Br}_2} = k_{\\text{C=C}} \\times n_{\\text{fat}}$$ Example: Triolein has 3 $\\text{C=C}$ bonds $\\implies n_{\\text{H}_2} = 3 \\times n_{\\text{triolein}}$; Trilinolein has 6 $\\text{C=C}$ bonds $\\implies n_{\\text{H}_2} = 6 \\times n_{\\text{trilinolein}}$."
        },
        {
          "VN": "• **Chỉ số xà phòng hóa & Chỉ số axit**: Chỉ số axit là số $\\text{mg KOH}$ dùng để trung hòa hết acid béo tự do có trong $1\\text{ gam}$ chất béo. Chỉ số xà phòng hóa là số $\\text{mg KOH}$ để xà phòng hóa hoàn toàn $1\\text{ gam}$ chất béo.",
          "EN": "• **Saponification Value & Acid Value**: Acid value is milligrams of $\\text{KOH}$ needed to neutralize free fatty acids in $1\\text{ g}$ of fat. Saponification value is milligrams of $\\text{KOH}$ needed to completely saponify $1\\text{ g}$ of fat."
        }
      ]
    },
    {
      "heading": {
        "VN": "V. KỸ THUẬT XỬ LÝ CÂU HỎI THỰC NGHIỆM ĐIỀU CHẾ & NHẬN BIẾT",
        "EN": "V. EXPERIMENTAL LAB QUESTIONS & CHEMICAL IDENTIFICATION"
      },
      "points": [
        {
          "VN": "• **Câu hỏi thí nghiệm este hóa**: Nhớ chắc 3 bước: Trộn alcohol + acid + $\\text{H}_2\\text{SO}_4$ đặc $\\to$ Đun cách thủy $65-70^\\circ\\text{C}$ (có ống sinh hàn hồi lưu) $\\to$ Làm nguội, thêm dung dịch $\\text{NaCl}$ bão hòa để este tách lớp nổi lên trên do hiệu ứng salting-out.",
          "EN": "• **Fischer Lab Exam Questions**: Remember the 3 steps: Mix alcohol + carboxylic acid + conc $\\text{H}_2\\text{SO}_4$ $\\to$ Heat in $65-70^\\circ\\text{C}$ water bath with reflux tube $\\to$ Cool, add saturated $\\text{NaCl}$ to salt out the floating ester layer."
        },
        {
          "VN": "• **Phân biệt Este, Alcohol và Carboxylic Acid**: Dùng quỳ tím (axit hóa đỏ, ancol và este không đổi màu) $\\to$ Dùng kim loại $\\text{Na}$ (ancol sủi bọt khí $\\text{H}_2$, este trơ không phản ứng) $\\to$ Dùng nước (este không tan tách 2 lớp có mùi thơm, ancol và axit tan vô hạn).",
          "EN": "• **Distinguishing Esters, Alcohols & Carboxylic Acids**: Use litmus paper (acid turns red; alcohols and esters unaffected) $\\to$ Use $\\text{Na}$ metal (alcohols liberate $\\text{H}_2$ gas bubbles; esters inert) $\\to$ Add water (esters are immiscible and fragrant; low alcohols and acids are miscible)."
        }
      ]
    }
  ],
  "keyFormulas": [
    {
      "VN": "Tỉ lệ xà phòng hóa chất béo: n_NaOH = 3 × n_glycerol = 3 × n_triglyceride",
      "EN": "$$n_{\\text{NaOH}} = 3 \\times n_{\\text{glycerol}} = 3 \\times n_{\\text{triglyceride}}$$"
    },
    {
      "VN": "Bảo toàn khối lượng: m_chất béo + m_NaOH = m_xà phòng + m_glycerol",
      "EN": "$$\\text{Mass Conservation}: m_{\\text{fat}} + m_{\\text{NaOH}} = m_{\\text{soap}} + m_{\\text{glycerol}}$$"
    },
    {
      "VN": "Đốt cháy ester no đơn chức: n_CO₂ = n_H₂O",
      "EN": "$$n_{\\text{CO}_2} = n_{\\text{H}_2\\text{O}} \\quad (\\text{Saturated Open-Chain Monoesters})$$"
    },
    {
      "VN": "Bảo toàn nguyên tố O: 2 n_este + 2 n_O₂ = 2 n_CO₂ + n_H₂O",
      "EN": "$$2 n_{\\text{ester}} + 2 n_{\\text{O}_2} = 2 n_{\\text{CO}_2} + n_{\\text{H}_2\\text{O}}$$"
    },
    {
      "VN": "Cộng hidro của chất béo không no: n_H₂ = k_{C=C} × n_chất béo",
      "EN": "$$n_{\\text{H}_2} = k_{\\text{C=C}} \\times n_{\\text{fat}}$$"
    }
  ],
  "equations": [
    {
      "VN": "(RCOO)₃C₃H₅ + 3NaOH → 3RCOONa + C₃H₅(OH)₃  [Xà phòng hóa chất béo]",
      "EN": "$$(R\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\;\\xrightarrow{t^\\circ}\\; 3R\\text{COONa} + \\text{C}_3\\text{H}_5(\\text{OH})_3$$"
    },
    {
      "VN": "(C₁₇H₃₃COO)₃C₃H₅ + 3H₂ → (C₁₇H₃₅COO)₃C₃H₅  [Ni, t° - No hóa Triolein]",
      "EN": "$$(\\text{C}_{17}\\text{H}_{33}\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{H}_2 \\;\\xrightarrow{\\text{Ni}, t^\\circ}\\; (\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5$$"
    },
    {
      "VN": "HCOONa + 2[Ag(NH₃)₂]OH → Na₂CO₃ + 2Ag↓ + 4NH₃ + H₂O  [Muối fomat tráng bạc]",
      "EN": "$$\\text{HCOONa} + 2[\\text{Ag}(\\text{NH}_3)_2]\\text{OH} \\;\\to\\; \\text{Na}_2\\text{CO}_3 + 2\\text{Ag}\\downarrow + 4\\text{NH}_3 + \\text{H}_2\\text{O}$$"
    }
  ],
  "theoryPoints": [
    {
      "VN": "[I. ĐỒNG PHÂN & CẤU TẠO] Số đp este no đơn hở = 2^{n-2} (2 ≤ n < 5). Este tráng bạc có dạng HCOOR'. Este phenol RCOOC6H5 tác dụng tỉ lệ 1:2 với NaOH tạo 2 muối và nước.",
      "EN": "[I. ISOMERS] Shortcut 2^{n-2} (2 ≤ n < 5). Silver mirror esters have format HCOOR'. Phenyl esters react 1:2 with NaOH yielding 2 salts and water."
    },
    {
      "VN": "[II. BẢO TOÀN KHỐI LƯỢNG] m_este + m_NaOH pư = m_muối + m_ancol. Delta m = n_este × (23 - M_R'). Nếu M_R' < 23 thì R' là gốc metyl (-CH3).",
      "EN": "[II. MASS CONSERVATION] m_ester + m_NaOH = m_salt + m_alcohol. Delta m = n_ester × (23 - M_R'). If M_R' < 23, R' is methyl (-CH3)."
    },
    {
      "VN": "[III. ĐỐT CHÁY ESTER] Este no đơn hở cho n_CO2 = n_H2O. Bảo toàn oxi: 2 n_este + 2 n_O2 = 2 n_CO2 + n_H2O. Este không no 1 liên kết C=C cho n_este = n_CO2 - n_H2O.",
      "EN": "[III. COMBUSTION] Saturated monoesters give n_CO2 = n_H2O. Oxygen balance: 2 n_ester + 2 n_O2 = 2 n_CO2 + n_H2O. For 1 C=C bond: n_ester = n_CO2 - n_H2O."
    },
    {
      "VN": "[IV. CHẤT BÉO] n_NaOH = 3 n_chất béo = 3 n_glycerol. m_chất béo + m_NaOH = m_xà phòng + m_glycerol. n_H2 pư = số liên kết C=C × n_chất béo.",
      "EN": "[IV. FATS] n_NaOH = 3 n_fat = 3 n_glycerol. m_fat + m_NaOH = m_soap + m_glycerol. n_H2 consumed = double bonds count × n_fat."
    },
    {
      "VN": "[V. THỰC NGHIỆM] Thí nghiệm este hóa: H2SO4 đặc vừa xúc tác vừa hút nước; thêm NaCl bão hòa để este tách lớp nổi lên trên bề mặt do hiệu ứng salting out.",
      "EN": "[V. EXPERIMENT] Fischer synthesis: Conc H2SO4 acts as catalyst and dehydrating agent; saturated NaCl salts out the floating ester upper layer."
    }
  ],
  "sampleQuestion": {
    "question": {
      "VN": "Xà phòng hóa hoàn toàn 17,8 gam tristearin (C₁₇H₃₅COO)₃C₃H₅ cần dùng vừa đủ bao nhiêu gam dung dịch NaOH 10%? Tính khối lượng xà phòng (muối natri stearat) và glycerol thu được?",
      "EN": "Complete saponification of 17.8 grams of tristearin (C₁₇H₃₅COO)₃C₃H₅ requires exactly how many grams of 10% NaOH solution? Calculate the mass of soap (sodium stearate) and glycerol obtained?"
    },
    "answer": {
      "VN": "1. Khối lượng mol tristearin M = 890 g/mol ⇒ n_tristearin = 17,8 / 890 = 0,02 mol.\n2. Theo phương trình: n_NaOH = 3 × 0,02 = 0,06 mol ⇒ m_NaOH nguyên chất = 0,06 × 40 = 2,4 gam ⇒ m_dung dịch NaOH 10% = 2,4 / 10% = 24 gam.\n3. n_glycerol = n_tristearin = 0,02 mol ⇒ m_glycerol = 0,02 × 92 = 1,84 gam.\n4. n_muối natri stearat C₁₇H₃₅COONa = 3 × 0,02 = 0,06 mol (M = 306 g/mol) ⇒ m_xà phòng = 0,06 × 306 = 18,36 gam. (Hoặc áp dụng bảo toàn khối lượng: m_xà phòng = 17,8 + 2,4 - 1,84 = 18,36 gam).",
      "EN": "1. Molar mass of tristearin M = 890 g/mol ⇒ n_tristearin = 17.8 / 890 = 0.02 mol.\n2. By stoichiometry: n_NaOH = 3 × 0.02 = 0.06 mol ⇒ m_pure NaOH = 0.06 × 40 = 2.4 g ⇒ m_10% NaOH solution = 2.4 / 10% = 24 grams.\n3. n_glycerol = n_tristearin = 0.02 mol ⇒ m_glycerol = 0.02 × 92 = 1.84 grams.\n4. n_sodium stearate C₁₇H₃₅COONa = 3 × 0.02 = 0.06 mol (M = 306 g/mol) ⇒ m_soap = 0.06 × 306 = 18.36 grams. (Verified by conservation of mass: m_soap = 17.8 + 2.4 - 1.84 = 18.36 grams)."
    }
  },
  "suggestedReagents": [
    "TRIGLYCERIDE",
    "NaOH",
    "GLYCEROL",
    "ETHYL_ACETATE",
    "ACETIC_ACID",
    "ETHANOL"
  ]
};

// Replace in data
const idx_b1 = data.findIndex(d => d.id === 'hh12_b1');
if (idx_b1 !== -1) {
  data[idx_b1] = upgraded_b1;
  console.log('Successfully upgraded hh12_b1 at index', idx_b1);
} else {
  console.error('hh12_b1 not found!');
}

const idx_b3 = data.findIndex(d => d.id === 'hh12_b3');
if (idx_b3 !== -1) {
  data[idx_b3] = upgraded_b3;
  console.log('Successfully upgraded hh12_b3 at index', idx_b3);
} else {
  console.error('hh12_b3 not found!');
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
console.log('File successfully written! Total lessons:', data.length);
