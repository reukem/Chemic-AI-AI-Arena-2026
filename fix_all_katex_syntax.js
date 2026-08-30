const fs = require('fs');
const katex = require('katex');

const data = JSON.parse(fs.readFileSync('src/data/vietnamCurriculumData.json', 'utf8'));

// General KaTeX string sanitization function
function cleanKatexString(str) {
    if (!str || typeof str !== 'string') return str;
    let s = str.trim();

    const hasDD = s.startsWith('$$') && s.endsWith('$$');
    if (hasDD) {
        s = s.slice(2, -2).trim();
    }

    // Fix double text nesting like \text{{\text{...}}} or \text{{\text{...}
    while (s.startsWith('{\\text{') && s.endsWith('}') && !s.endsWith('}}')) {
        s = s.slice(7, -1).trim();
        s = '\\text{' + s + '}';
    }
    while (s.startsWith('\\text{{\\text{')) {
        s = s.replace('\\text{{\\text{', '\\text{');
    }
    s = s.replace(/\\text\{\\text\{/g, '\\text{');

    // Fix unclosed {\text{...
    if (s.startsWith('{\\text{') && !s.endsWith('}}')) {
        s = s.slice(7).trim();
        if (s.endsWith('}')) s = s.slice(0, -1).trim();
        s = '\\text{' + s + '}';
    }

    // Fix arrows inside \text{...}
    s = s.replace(/\\text\{([^}]*?)(\\longrightarrow|\\rightarrow|\\to|\\rightleftharpoons|\\xrightleftharpoons|\\xrightarrow)([^}]*?)\}/g, (match, p1, arr, p2) => {
        return `\\text{${p1.trim()}} ${arr} \\text{${p2.trim()}}`;
    });

    // Fix raw unescaped % (except already escaped \%)
    s = s.replace(/(?<!\\)%/g, '\\%');

    // Fix broken subscript patterns like C_{\text{M} = or K_{\text{C} =
    s = s.replace(/([A-Z])_\{?\\text\{([A-Za-z0-9]+)\}\s*=/g, '$1_{\\text{$2}} =');
    s = s.replace(/([A-Z])_\{?\\text\{([A-Za-z0-9]+)\}\s*([^\}])/g, '$1_{\\text{$2}}$3');
    s = s.replace(/C_\{\\text\{M\}\s*=/g, 'C_M =');
    s = s.replace(/K_\{\\text\{C\}\s*=/g, 'K_C =');
    s = s.replace(/K_\{\\text\{C\}/g, 'K_C');
    s = s.replace(/C_\{\\text\{M\}/g, 'C_M');
    s = s.replace(/C_\{\\text\{M\s*=/g, 'C_M =');
    s = s.replace(/K_\{\\text\{C\s*=/g, 'K_C =');

    // Fix fraction typos
    s = s.replace(/\\frac\{m_\{?\\text\{ct\}\}?\{m_\{?\\text\{dd\}\}?/g, '\\frac{m_{\\text{ct}}}{m_{\\text{dd}}}');
    s = s.replace(/\\frac\{m_\{?\\text\{solute\}\}?\{m_\{?\\text\{solution\}\}?/g, '\\frac{m_{\\text{solute}}}{m_{\\text{solution}}}');

    // Fix \text{m_H} -> m_{\text{H}}
    s = s.replace(/\\text\{m_([A-Za-z0-9]+)\}/g, 'm_{\\text{$1}}');
    s = s.replace(/\\text\{Fe2\^III O3\^II\}/g, '\\text{Fe}_2^{\\text{III}}\\text{O}_3^{\\text{II}}');
    s = s.replace(/\\text\{Fe₂\^III O₃\^II\}/g, '\\text{Fe}_2^{\\text{III}}\\text{O}_3^{\\text{II}}');

    // Fix missing closing braces in \text{
    let openCount = (s.match(/\{/g) || []).length;
    let closeCount = (s.match(/\}/g) || []).length;
    while (openCount > closeCount) {
        s += '}';
        closeCount++;
    }
    while (closeCount > openCount && s.endsWith('}')) {
        s = s.slice(0, -1);
        closeCount--;
    }

    return hasDD ? `$$${s}$$` : s;
}

// Explicit overrides for specific lessons where needed
const SPECIFIC_FORMULA_FIXES = {
    // Grade 11 Lesson 1
    "G11_L1_kf0_EN": "$$K_C = \\frac{[\\text{C}]^c \\cdot [\\text{D}]^d}{[\\text{A}]^a \\cdot [\\text{B}]^b}$$",
    "G11_L1_kf0_VN": "$$K_C = \\frac{[\\text{C}]^c \\cdot [\\text{D}]^d}{[\\text{A}]^a \\cdot [\\text{B}]^b}$$",
    "G11_L1_kf1_EN": "$$\\text{Temperature Increase}: \\text{Equilibrium shifts in Endothermic direction } (\\Delta H > 0)$$",
    "G11_L1_kf1_VN": "$$\\text{Tăng nhiệt độ}: \\text{Cân bằng chuyển dịch theo chiều Thu nhiệt } (\\Delta H > 0)$$",
    "G11_L1_kf2_EN": "$$\\text{Pressure Increase}: \\text{Equilibrium shifts toward fewer moles of gas}$$",
    "G11_L1_kf2_VN": "$$\\text{Tăng áp suất}: \\text{Cân bằng chuyển dịch theo chiều Giảm số mol khí}$$",
    "G11_L1_eq0_EN": "$$\\text{N}_2\\text{(g)} + 3\\text{H}_2\\text{(g)} \\rightleftharpoons 2\\text{NH}_3\\text{(g)}, \\quad \\Delta_r H^\\circ_{298} = -92\\text{ kJ}$$",
    "G11_L1_eq0_VN": "$$\\text{N}_2\\text{(k)} + 3\\text{H}_2\\text{(k)} \\rightleftharpoons 2\\text{NH}_3\\text{(k)}, \\quad \\Delta_r H^\\circ_{298} = -92\\text{ kJ}$$",
    "G11_L1_eq1_EN": "$$2\\text{NO}_2\\text{(g) [Red-Brown Gas]} \\rightleftharpoons \\text{N}_2\\text{O}_4\\text{(g) [Colorless Gas]}, \\quad \\Delta_r H^\\circ_{298} = -58\\text{ kJ}$$",
    "G11_L1_eq1_VN": "$$2\\text{NO}_2\\text{(k) [Nâu đỏ]} \\rightleftharpoons \\text{N}_2\\text{O}_4\\text{(k) [Không màu]}, \\quad \\Delta_r H^\\circ_{298} = -58\\text{ kJ}$$",

    // Grade 8
    "G8_L2_kf1_EN": "$$C\\% = \\frac{m_{\\text{solute}}}{m_{\\text{solution}}} \\times 100\\% \\quad (\\text{Mass Percentage Concentration})$$",
    "G8_L2_kf1_VN": "$$C\\% = \\frac{m_{\\text{ct}}}{m_{\\text{dd}}} \\times 100\\% \\quad (\\text{Nồng độ phần trăm})$$",
    "G8_L3_kf0_EN": "$$\\text{Tilt test tube at } 45^\\circ$$",
    "G8_L3_kf0_VN": "$$\\text{Nghiêng ống nghiệm } 45^\\circ$$",
    "G8_L5_kf0_EN": "$$\\text{Chemical Symbol}$$",
    "G8_L5_kf0_VN": "$$\\text{Kí hiệu hóa học}$$",
    "G8_L5_kf1_EN": "$$\\text{Atomic Mass (amu)}$$",
    "G8_L5_kf1_VN": "$$\\text{Nguyên tử khối (amu)}$$",
    "G8_L6_kf0_EN": "$$\\text{Elements vs Compounds}$$",
    "G8_L6_kf0_VN": "$$\\text{Đơn chất vs Hợp chất}$$",
    "G8_L7_kf0_EN": "$$\\text{Physical Phenomenon}$$",
    "G8_L7_kf0_VN": "$$\\text{Hiện tượng vật lí}$$",
    "G8_L10_eq0_VN": "$$\\text{Fe}_2^{\\text{III}}\\text{O}_3^{\\text{II}}: 2 \\times \\text{III} = 3 \\times \\text{II}$$",
    "G8_L10_eq0_EN": "$$\\text{Fe}_2^{\\text{III}}\\text{O}_3^{\\text{II}}: 2 \\times \\text{III} = 3 \\times \\text{II}$$",
    "G8_L12_kf0_EN": "$$\\text{Chemical reactions produce new substances}$$",
    "G8_L12_kf0_VN": "$$\\text{Hóa học sinh chất mới}$$",
    "G8_L13_kf0_EN": "$$\\text{Reactants} \\longrightarrow \\text{Products}$$",
    "G8_L13_kf0_VN": "$$\\text{Chất phản ứng} \\longrightarrow \\text{Sản phẩm}$$",
    "G8_L16_kf0_EN": "$$\\text{Atom Conservation: Balanced atoms on both sides}$$",
    "G8_L16_kf0_VN": "$$\\text{Cân bằng số nguyên tử 2 vế}$$",
    "G8_L18_kf1_EN": "$$M \\text{ (g/mol)}$$",
    "G8_L18_kf1_VN": "$$M \\text{ (g/mol)}$$",
    "G8_L24_kf0_EN": "$$\\text{Oxygen sustains combustion and respiration}$$",
    "G8_L24_kf0_VN": "$$\\text{Oxi duy trì sự cháy và hô hấp}$$",
    "G8_L26_kf0_EN": "$$\\text{Acidic Oxides}: \\text{SO}_2, \\text{CO}_2, \\text{P}_2\\text{O}_5$$",
    "G8_L26_kf0_VN": "$$\\text{Oxit axit}: \\text{SO}_2, \\text{CO}_2, \\text{P}_2\\text{O}_5$$",
    "G8_L26_kf1_EN": "$$\\text{Basic Oxides}: \\text{Na}_2\\text{O}, \\text{CaO}, \\text{CuO}$$",
    "G8_L26_kf1_VN": "$$\\text{Oxit bazơ}: \\text{Na}_2\\text{O}, \\text{CaO}, \\text{CuO}$$",
    "G8_L28_kf0_EN": "$$78\\%\\text{ N}_2, \\; 21\\%\\text{ O}_2, \\; 1\\%\\text{ other gases}$$",
    "G8_L28_kf0_VN": "$$78\\%\\text{ N}_2, \\; 21\\%\\text{ O}_2, \\; 1\\%\\text{ khí khác}$$",
    "G8_L36_kf0_EN": "$$m_{\\text{H}} : m_{\\text{O}} = 1 : 8$$",
    "G8_L36_kf0_VN": "$$m_{\\text{H}} : m_{\\text{O}} = 1 : 8$$",
    "G8_L37_kf0_EN": "$$\\text{Acids}: \\text{HCl}, \\text{H}_2\\text{SO}_4$$",
    "G8_L37_kf0_VN": "$$\\text{Axit}: \\text{HCl}, \\text{H}_2\\text{SO}_4$$",
    "G8_L37_kf1_EN": "$$\\text{Bases}: \\text{NaOH}, \\text{Cu(OH)}_2$$",
    "G8_L37_kf1_VN": "$$\\text{Bazơ}: \\text{NaOH}, \\text{Cu(OH)}_2$$",
    "G8_L37_kf2_EN": "$$\\text{Salts}: \\text{NaCl}, \\text{CuSO}_4$$",
    "G8_L37_kf2_VN": "$$\\text{Muối}: \\text{NaCl}, \\text{CuSO}_4$$",
    "G8_L41_kf0_EN": "$$S = \\frac{m_{\\text{solute}}}{m_{\\text{water}}} \\times 100$$",
    "G8_L41_kf0_VN": "$$S = \\frac{m_{\\text{ct}}}{m_{\\text{nước}}} \\times 100$$",
    "G8_L42_kf1_EN": "$$C_M = \\frac{n}{V} \\text{ (M)}$$",
    "G8_L42_kf1_VN": "$$C_M = \\frac{n}{V} \\text{ (M)}$$",
    "G8_L44_eq0_EN": "$$C_M = \\frac{n}{V_L}$$",
    "G8_L44_eq0_VN": "$$C_M = \\frac{n}{V_L}$$",
    "G8_L45_kf0_EN": "$$\\text{Dissolve 5 g NaCl into 45 g } \\text{H}_2\\text{O (10\\% solution)}$$",
    "G8_L45_kf0_VN": "$$\\text{Cân 5g NaCl hòa vào 45g nước (dung dịch 10\\%)}$$",

    // Grade 9
    "G9_L8_kf1_EN": "$$\\text{Ca(OH)}_2 \\text{ Diagnostic Test for } \\text{CO}_2$$",
    "G9_L8_kf1_VN": "$$\\text{Ca(OH)}_2 \\text{ nhận biết } \\text{CO}_2$$",
    "G9_L11_eq0_EN": "$$\\text{Urea }: (\\text{NH}_2)_2\\text{CO} \\text{ has highest nitrogen content (46\\% N)}$$",
    "G9_L11_eq0_VN": "$$\\text{Urê }: (\\text{NH}_2)_2\\text{CO} \\text{ có độ dinh dưỡng cao nhất (46\\% N)}$$",
    "G9_L12_kf1_EN": "$$\\text{Non-metal} \\longleftrightarrow \\text{Acidic Oxide} \\longleftrightarrow \\text{Acid} \\longleftrightarrow \\text{Salt}$$",
    "G9_L12_kf1_VN": "$$\\text{Phi kim} \\longleftrightarrow \\text{Oxit axit} \\longleftrightarrow \\text{Axit} \\longleftrightarrow \\text{Muối}$$",
    "G9_L25_kf0_EN": "$$\\text{Strong Non-metals}: \\text{F}_2, \\text{Cl}_2, \\text{O}_2; \\quad \\text{Weak}: \\text{C}, \\text{Si}, \\text{S}$$",
    "G9_L25_kf0_VN": "$$\\text{Phi kim mạnh}: \\text{F}_2, \\text{Cl}_2, \\text{O}_2; \\quad \\text{Yếu}: \\text{C}, \\text{Si}, \\text{S}$$",

    // Grade 10
    "G10_L3_kf0_EN": "$$\\text{Subshells}: s \\text{ (2e)}, \\; p \\text{ (6e)}, \\; d \\text{ (10e)}, \\; f \\text{ (14e)}$$",
    "G10_L3_kf0_VN": "$$\\text{Phân lớp}: s \\text{ (2e)}, \\; p \\text{ (6e)}, \\; d \\text{ (10e)}, \\; f \\text{ (14e)}$$",
    "G10_L3_kf1_EN": "$$\\text{Aufbau Order}: 1s \\; 2s \\; 2p \\; 3s \\; 3p \\; 4s \\; 3d \\; 4p \\dots$$",
    "G10_L3_kf1_VN": "$$\\text{Thứ tự}: 1s \\; 2s \\; 2p \\; 3s \\; 3p \\; 4s \\; 3d \\; 4p \\dots$$",
    "G10_L4_kf0_EN": "$$\\text{Review: Atomic Number } Z, \\text{ Mass Number } A, \\text{ and Electron Configurations}$$",
    "G10_L4_kf0_VN": "$$\\text{Ôn tập } Z, A, \\text{ Cấu hình e}$$",
    "G10_L10_kf0_EN": "$$\\text{Octet Rule: 8 valence electrons for stable configuration (2e for Helium)}$$",
    "G10_L10_kf0_VN": "$$\\text{Quy tắc Octet: 8 electron lớp ngoài cùng (hoặc 2e của He)}$$",
    "G10_L15_kf0_EN": "$$\\text{Reducing Agent: Donates electrons (Oxidation state increases)}$$",
    "G10_L15_kf0_VN": "$$\\text{Chất khử: nhường e (tăng số oxh)}$$",
    "G10_L15_kf1_EN": "$$\\text{Oxidizing Agent: Accepts electrons (Oxidation state decreases)}$$",
    "G10_L15_kf1_VN": "$$\\text{Chất oxi hóa: nhận e (giảm số oxh)}$$",
    "G10_L16_kf0_EN": "$$\\text{Electron Balancing: Determining stoichiometric coefficients for redox couples}$$",
    "G10_L16_kf0_VN": "$$\\text{Thăng bằng electron: Tìm hệ số chất khử và chất oxi hóa}$$",
    "G10_L18_kf0_EN": "$$\\text{Reaction Enthalpy Calculation via Bond Energies and Formation Enthalpies}$$",
    "G10_L18_kf0_VN": "$$\\text{Công thức tính } \\Delta_r H^\\circ_{298} \\text{ theo } E_b \\text{ và } \\Delta_f H^\\circ_{298}$$",

    // Grade 11
    "G11_L3_kf0_EN": "$$\\text{Acid-Base Equivalence}: C_{\\text{acid}} \\cdot V_{\\text{acid}} = C_{\\text{base}} \\cdot V_{\\text{base}}$$",
    "G11_L3_kf0_VN": "$$\\text{Chuẩn độ axit-bazơ}: C_{\\text{axit}} \\cdot V_{\\text{axit}} = C_{\\text{bazơ}} \\cdot V_{\\text{bazơ}}$$",
    "G11_L4_kf0_EN": "$$\\text{Robust Triple Bond } \\text{N}\\equiv\\text{N } (\\text{Bond Energy } 945\\text{ kJ/mol})$$",
    "G11_L4_kf0_VN": "$$\\text{Liên kết ba } \\text{N}\\equiv\\text{N } \\text{bền (Năng lượng } 945\\text{ kJ/mol})$$",
    "G11_L6_kf0_EN": "$$\\text{HNO}_3\\text{ oxidizes most metals to their highest oxidation states}$$",
    "G11_L6_kf0_VN": "$$\\text{HNO}_3\\text{ oxi hóa hầu hết kim loại lên số oxh cao nhất}$$",
    "G11_L6_eq0_EN": "$$\\text{Cu} + 4\\text{HNO}_3\\text{ (conc)} \\longrightarrow \\text{Cu(NO}_3)_2 + 2\\text{NO}_2\\uparrow\\text{ [Red-Brown Gas]} + 2\\text{H}_2\\text{O}$$",
    "G11_L6_eq0_VN": "$$\\text{Cu} + 4\\text{HNO}_3\\text{ (đặc)} \\longrightarrow \\text{Cu(NO}_3)_2 + 2\\text{NO}_2\\uparrow\\text{ [Nâu đỏ]} + 2\\text{H}_2\\text{O}$$",
    "G11_L6_eq1_EN": "$$3\\text{Cu} + 8\\text{HNO}_3\\text{ (dilute)} \\longrightarrow 3\\text{Cu(NO}_3)_2 + 2\\text{NO}\\uparrow + 4\\text{H}_2\\text{O}$$",
    "G11_L6_eq1_VN": "$$3\\text{Cu} + 8\\text{HNO}_3\\text{ (loãng)} \\longrightarrow 3\\text{Cu(NO}_3)_2 + 2\\text{NO}\\uparrow + 4\\text{H}_2\\text{O}$$",
    "G11_L8_kf0_EN": "$$\\text{Contact Process (3 Stages)}: \\text{S/FeS}_2 \\longrightarrow \\text{SO}_2 \\xrightarrow{\\text{V}_2\\text{O}_5} \\text{SO}_3 \\longrightarrow \\text{Oleum} \\longrightarrow \\text{H}_2\\text{SO}_4$$",
    "G11_L8_kf0_VN": "$$\\text{Tiếp xúc 3 giai đoạn}: \\text{S/FeS}_2 \\longrightarrow \\text{SO}_2 \\xrightarrow{\\text{V}_2\\text{O}_5} \\text{SO}_3 \\longrightarrow \\text{Oleum} \\longrightarrow \\text{H}_2\\text{SO}_4$$",
    "G11_L10_kf0_EN": "$$\\text{Functional Groups}: \\text{-OH (Alcohol)}, \\; \\text{-CHO (Aldehyde)}, \\; \\text{-COOH (Acid)}, \\; \\text{-COO- (Ester)}, \\; \\text{-NH}_2\\text{ (Amine)}$$",
    "G11_L10_kf0_VN": "$$\\text{Nhóm chức}: \\text{-OH (Ancol)}, \\; \\text{-CHO (Anđehit)}, \\; \\text{-COOH (Axit)}, \\; \\text{-COO- (Este)}, \\; \\text{-NH}_2\\text{ (Amin)}$$",
    "G11_L13_kf0_EN": "$$\\text{Structural Isomers vs Stereochemical Cis-Trans Isomers}$$",
    "G11_L13_kf0_VN": "$$\\text{Đồng phân cấu tạo vs Đồng phân hình học cis - trans}$$",
    "G11_L16_kf0_EN": "$$\\text{Markovnikov Rule}: \\text{H adds to Carbon with more hydrogen atoms}$$",
    "G11_L16_kf0_VN": "$$\\text{Quy tắc Markovnikov}: \\text{H cộng vào C nhiều H hơn}$$",
    "G11_L17_kf0_EN": "$$\\text{Benzene: Readily undergoes electrophilic bromination (Fe catalyst), reluctant addition}$$",
    "G11_L17_kf0_VN": "$$\\text{Benzen: Dễ thế } \\text{Br}_2 \\text{ (xúc tác Fe), khó cộng}$$",
    "G11_L17_kf1_EN": "$$\\text{Toluene Oxidation}: \\text{C}_6\\text{H}_5\\text{-CH}_3 + [\\text{O}] \\xrightarrow{\\text{KMnO}_4, t^\\circ} \\text{C}_6\\text{H}_5\\text{-COOH}$$",
    "G11_L17_kf1_VN": "$$\\text{Toluen}: \\text{C}_6\\text{H}_5\\text{-CH}_3 + [\\text{O}] \\xrightarrow{\\text{KMnO}_4, t^\\circ} \\text{C}_6\\text{H}_5\\text{-COOH}$$",
    "G11_L19_kf1_EN": "$$\\text{Zaitsev Rule}: \\text{Elimination preferentially removes H from more substituted Carbon}$$",
    "G11_L19_kf1_VN": "$$\\text{Quy tắc Zaitsev}: \\text{Tách HX ưu tiên H ở C bậc cao}$$",
    "G11_L22_kf0_EN": "$$\\text{Acidic Basicity}: \\text{Aliphatic alcohols do NOT react with NaOH; Phenol neutralizes NaOH}$$",
    "G11_L22_kf0_VN": "$$\\text{So sánh}: \\text{Ancol không tác dụng NaOH; Phenol tác dụng NaOH}$$",
    "G11_L25_kf0_EN": "$$\\text{Diagnostic Matrix: Alcohols (-OH), Phenols (Ar-OH), Aldehydes (-CHO), Acids (-COOH)}$$",
    "G11_L25_kf0_VN": "$$\\text{Bảng phân biệt: Ancol (-OH), Phenol (-OH thơm), Anđehit (-CHO), Axit (-COOH)}$$"
};

// Process all formulas and equations
data.forEach(lesson => {
    const g = lesson.grade;
    const num = lesson.lessonNumber;

    (lesson.keyFormulas || []).forEach((kf, idx) => {
        const keyEN = `G${g}_L${num}_kf${idx}_EN`;
        const keyVN = `G${g}_L${num}_kf${idx}_VN`;
        if (typeof kf === 'object') {
            if (SPECIFIC_FORMULA_FIXES[keyVN]) kf.VN = SPECIFIC_FORMULA_FIXES[keyVN];
            else kf.VN = cleanKatexString(kf.VN);

            if (SPECIFIC_FORMULA_FIXES[keyEN]) kf.EN = SPECIFIC_FORMULA_FIXES[keyEN];
            else kf.EN = cleanKatexString(kf.EN);
        }
    });

    (lesson.equations || []).forEach((eq, idx) => {
        const keyEN = `G${g}_L${num}_eq${idx}_EN`;
        const keyVN = `G${g}_L${num}_eq${idx}_VN`;
        if (typeof eq === 'object') {
            if (SPECIFIC_FORMULA_FIXES[keyVN]) eq.VN = SPECIFIC_FORMULA_FIXES[keyVN];
            else eq.VN = cleanKatexString(eq.VN);

            if (SPECIFIC_FORMULA_FIXES[keyEN]) eq.EN = SPECIFIC_FORMULA_FIXES[keyEN];
            else eq.EN = cleanKatexString(eq.EN);
        }
    });
});

fs.writeFileSync('src/data/vietnamCurriculumData.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Sanitization applied to vietnamCurriculumData.json');
