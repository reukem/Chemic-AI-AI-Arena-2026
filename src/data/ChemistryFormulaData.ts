/**
 * ChemistryFormulaData.ts
 * Comprehensive database of chemical formulas, stoichiometry relations,
 * symbol reference codex, and calculation problem sets for Grades 8-12.
 * Based on the Vietnam National Chemistry Curriculum (GDPT 2018) & Standard IUPAC Guidelines.
 */

export interface FormulaSymbol {
    symbol: string;
    latexSymbol: string;
    name: { VN: string; EN: string };
    unit: string;
    description: { VN: string; EN: string };
}

export interface ChemistryFormula {
    id: string;
    sectionNumber: number;
    gradeRange: string;
    category: 'STOICHIOMETRY' | 'SOLUTION' | 'MIXTURES' | 'ADVANCED';
    title: { VN: string; EN: string };
    latexMain: string;
    latexVariants?: string[];
    description: { VN: string; EN: string };
    diagramType?: 'triangle' | 'flow' | 'conversion';
    symbols: string[]; // key of symbols involved
    solverType?: string;
}

export interface CalculationQuestion {
    id: string;
    code: string;
    grade: 8 | 9 | 10 | 11 | 12;
    category: 'MOL_MASS' | 'SOLUTION_CONC' | 'GAS_MIXTURE' | 'PRECIPITATE_GAS' | 'THERMO_ENTHALPY' | 'PH_ACID_BASE' | 'FARADAY_ELECTRO' | 'ORGANIC_ESTERS';
    title: { VN: string; EN: string };
    question: { VN: string; EN: string };
    formulaIds: string[];
    givenData: { label: string; value: string }[];
    equation?: string;
    options?: { id: string; text: string; isCorrect: boolean }[];
    numericAnswer?: {
        value: number;
        tolerance: number;
        unit: string;
    };
    stepByStepSolution: {
        step: number;
        title: { VN: string; EN: string };
        latexContent: string;
        explanation: { VN: string; EN: string };
    }[];
    suggestedReagents?: string[];
}

/**
 * 1. SYMBOL & UNIT REFERENCE TABLE (Matching paper image reference chart)
 */
export const FORMULA_SYMBOLS_TABLE: FormulaSymbol[] = [
    {
        symbol: 'n',
        latexSymbol: 'n',
        name: { VN: 'Số mol chất', EN: 'Amount of substance (Moles)' },
        unit: 'mol',
        description: { VN: 'Lượng chất chứa 6,022 × 10²³ hạt vi mô (nguyên tử hoặc phân tử).', EN: 'Quantity containing Avogadro constant (6.022 × 10²³) elementary entities.' }
    },
    {
        symbol: 'n_hh',
        latexSymbol: 'n_{\\text{hh}}',
        name: { VN: 'Số mol hỗn hợp các chất', EN: 'Total moles in mixture' },
        unit: 'mol',
        description: { VN: 'Tổng số mol của tất cả các chất cấu thành hỗn hợp: n_hh = n_A + n_B + ...', EN: 'Sum of molar amounts of all constituents in the mixture.' }
    },
    {
        symbol: 'n_T, n_E',
        latexSymbol: 'n_T, n_E',
        name: { VN: 'Số mol chất khí T, khí E', EN: 'Moles of gas component T, E' },
        unit: 'mol',
        description: { VN: 'Số mol của từng cấu tử khí riêng biệt trong hỗn hợp khí.', EN: 'Individual mole count of component gases in a gas blend.' }
    },
    {
        symbol: 'm',
        latexSymbol: 'm',
        name: { VN: 'Khối lượng chất', EN: 'Mass of substance' },
        unit: 'g',
        description: { VN: 'Khối lượng của mẫu chất tính bằng gam (g) hoặc kilôgam (kg).', EN: 'Mass of substance measured in grams (g) or kilograms (kg).' }
    },
    {
        symbol: 'V',
        latexSymbol: 'V',
        name: { VN: 'Thể tích khí ở điều kiện chuẩn (đkc)', EN: 'Gas volume at Standard Laboratory Conditions (SLC)' },
        unit: 'L',
        description: { VN: 'Thể tích khí đo ở 25°C (298 K) và 1 bar theo SGK GDPT 2018 (1 mol = 24,79 L).', EN: 'Gas volume at 25°C and 1 bar under modern IUPAC standard (1 mol = 24.79 L).' }
    },
    {
        symbol: 'V_dd',
        latexSymbol: 'V_{\\text{dd}}',
        name: { VN: 'Thể tích dung dịch', EN: 'Solution volume' },
        unit: 'mL hoặc L',
        description: { VN: 'Thể tích toàn bộ dung dịch sau khi hòa tan chất tan vào dung môi.', EN: 'Total volume of the resulting liquid solution.' }
    },
    {
        symbol: 'V_hh',
        latexSymbol: 'V_{\\text{hh}}',
        name: { VN: 'Thể tích hỗn hợp khí', EN: 'Gas mixture volume' },
        unit: 'L hoặc mL',
        description: { VN: 'Tổng thể tích của hỗn hợp các chất khí đo cùng điều kiện nhiệt độ và áp suất.', EN: 'Total volume occupied by the gas mixture under identical T and P.' }
    },
    {
        symbol: 'M',
        latexSymbol: 'M',
        name: { VN: 'Khối lượng mol của chất', EN: 'Molar mass of substance' },
        unit: 'g/mol (amu)',
        description: { VN: 'Khối lượng tính bằng gam của 1 mol chất đó, có trị số bằng phân tử khối (amu).', EN: 'Mass of one mole of a substance, numerically equal to molecular weight in amu.' }
    },
    {
        symbol: 'M_ct',
        latexSymbol: 'M_{\\text{ct}}',
        name: { VN: 'Khối lượng mol của chất tan', EN: 'Molar mass of solute' },
        unit: 'g/mol (amu)',
        description: { VN: 'Khối lượng mol của chất tan trong dung dịch (ví dụ: NaCl = 58,5; H2SO4 = 98).', EN: 'Molar mass of the chemical dissolved in solvent.' }
    },
    {
        symbol: 'C%',
        latexSymbol: 'C\\%',
        name: { VN: 'Nồng độ phần trăm khối lượng', EN: 'Mass percentage concentration' },
        unit: '%',
        description: { VN: 'Số gam chất tan có trong 100 gam dung dịch.', EN: 'Mass of solute dissolved per 100 grams of solution.' }
    },
    {
        symbol: 'C_M',
        latexSymbol: 'C_M',
        name: { VN: 'Nồng độ mol của dung dịch', EN: 'Molar concentration (Molarity)' },
        unit: 'mol/L (M)',
        description: { VN: 'Số mol chất tan có trong 1 lít dung dịch.', EN: 'Amount of solute in moles per liter of solution.' }
    },
    {
        symbol: 'm_ct',
        latexSymbol: 'm_{\\text{ct}}',
        name: { VN: 'Khối lượng chất tan', EN: 'Mass of solute' },
        unit: 'g',
        description: { VN: 'Khối lượng của chất bị hòa tan trong dung dịch.', EN: 'Mass of the substance dissolved in the liquid matrix.' }
    },
    {
        symbol: 'm_dd',
        latexSymbol: 'm_{\\text{dd}}',
        name: { VN: 'Khối lượng dung dịch', EN: 'Mass of solution' },
        unit: 'g',
        description: { VN: 'Tổng khối lượng chất tan và dung môi: m_dd = m_ct + m_dm.', EN: 'Combined mass of solute and solvent.' }
    },
    {
        symbol: 'm_dm',
        latexSymbol: 'm_{\\text{dm}}',
        name: { VN: 'Khối lượng dung môi', EN: 'Mass of solvent' },
        unit: 'g',
        description: { VN: 'Khối lượng của chất dùng để hòa tan (thường là nước cất H2O: 1 mL ≈ 1 g).', EN: 'Mass of the liquid medium used for dissolution.' }
    },
    {
        symbol: 'm_hh',
        latexSymbol: 'm_{\\text{hh}}',
        name: { VN: 'Khối lượng hỗn hợp', EN: 'Total mixture mass' },
        unit: 'g',
        description: { VN: 'Tổng khối lượng của tất cả các chất trong mẫu hỗn hợp: m_hh = m_A + m_B + ...', EN: 'Sum of all individual constituent masses in the sample.' }
    },
    {
        symbol: 'm_kt, m_kh',
        latexSymbol: 'm\\downarrow, m\\uparrow',
        name: { VN: 'Khối lượng kết tủa và khí bay hơi', EN: 'Precipitate & evolved gas mass' },
        unit: 'g',
        description: { VN: 'Khối lượng chất kết tủa tách khỏi dung dịch hoặc chất khí thoát ra ngoài không khí.', EN: 'Mass of solid precipitate settled or gaseous product liberated.' }
    },
    {
        symbol: 'd',
        latexSymbol: 'd',
        name: { VN: 'Khối lượng riêng của dung dịch', EN: 'Density of solution' },
        unit: 'g/mL (g/cm³)',
        description: { VN: 'Khối lượng của một đơn vị thể tích dung dịch: d = m_dd / V_dd.', EN: 'Mass per unit volume of the liquid solution.' }
    },
    {
        symbol: 'd_AB',
        latexSymbol: 'd_{A/B}',
        name: { VN: 'Tỉ khối của khí A so với khí B', EN: 'Relative vapor density of gas A to B' },
        unit: 'Không thứ nguyên',
        description: { VN: 'Cho biết khí A nặng hay nhẹ hơn khí B bao nhiêu lần: d_A/B = M_A / M_B.', EN: 'Dimensionless ratio of molar mass of gas A to gas B.' }
    }
];

/**
 * 2. MASTER CHEMICAL FORMULAS CATALOG (Exact items 1-9 from paper + advanced high school items)
 */
export const CHEMISTRY_FORMULAS: ChemistryFormula[] = [
    {
        id: 'mole_mass_volume',
        sectionNumber: 1,
        gradeRange: 'Lớp 8 - 12',
        category: 'STOICHIOMETRY',
        title: {
            VN: '1. Hệ thức liên hệ giữa Số Mol, Khối Lượng và Thể Tích Khí',
            EN: '1. Interrelation Between Moles, Mass, Molar Mass and Gas Volume'
        },
        latexMain: 'n = \\frac{m}{M} \\iff m = n \\cdot M',
        latexVariants: [
            'V = n \\cdot 24{,}79 \\iff n = \\frac{V}{24{,}79} \\quad (\\text{ở đkc: } 25^\\circ\\text{C, } 1\\text{ bar})',
            'm = \\frac{V}{24{,}79} \\cdot M \\iff V = \\frac{m}{M} \\cdot 24{,}79'
        ],
        description: {
            VN: 'Mối quan hệ tam giác cốt lõi giữa Khối lượng m (g), Số mol n (mol) và Thể tích khí V (L) ở điều kiện chuẩn GDPT 2018 (24,79 L/mol thay cho chuẩn cũ 22,4 L/mol).',
            EN: 'Fundamental triangular conversion between mass m (g), amount in moles n (mol), and gas volume V (L) under modern SLC standard 24.79 L/mol.'
        },
        diagramType: 'conversion',
        symbols: ['n', 'm', 'M', 'V'],
        solverType: 'MOLE_MASS_VOLUME'
    },
    {
        id: 'solution_mass',
        sectionNumber: 2,
        gradeRange: 'Lớp 8 - 12',
        category: 'SOLUTION',
        title: {
            VN: '2. Công thức tính Khối Lượng Dung Dịch',
            EN: '2. Solution Mass Conservation Formula'
        },
        latexMain: 'm_{\\text{dd}} = m_{\\text{ct}} + m_{\\text{dm}}',
        latexVariants: [
            'm_{\\text{ct}} = m_{\\text{dd}} - m_{\\text{dm}}',
            'm_{\\text{dm}} = m_{\\text{dd}} - m_{\\text{ct}}'
        ],
        description: {
            VN: 'Khối lượng dung dịch luôn bằng tổng khối lượng chất tan và khối lượng dung môi (nước). Với nước nguyên chất: m_nước ≈ V_nước (ở 4°C, d = 1 g/mL).',
            EN: 'Total solution mass equals the sum of solute mass and solvent mass. For water, 1 mL ≈ 1 g.'
        },
        symbols: ['m_dd', 'm_ct', 'm_dm'],
        solverType: 'SOLUTION_MASS'
    },
    {
        id: 'percent_concentration',
        sectionNumber: 3,
        gradeRange: 'Lớp 8 - 12',
        category: 'SOLUTION',
        title: {
            VN: '3. Nồng Độ Phần Trăm Khối Lượng C% của Dung Dịch',
            EN: '3. Mass Percentage Concentration (C%)'
        },
        latexMain: 'C\\% = \\frac{m_{\\text{ct}}}{m_{\\text{dd}}} \\cdot 100\\%',
        latexVariants: [
            'm_{\\text{ct}} = \\frac{C\\% \\cdot m_{\\text{dd}}}{100\\%}',
            'm_{\\text{dd}} = \\frac{m_{\\text{ct}}}{C\\%} \\cdot 100\\%'
        ],
        description: {
            VN: 'Cho biết số gam chất tan có trong 100 gam dung dịch. Rất thông dụng trong pha chế dung dịch axit đặc, dung dịch muối sinh lý 0,9%.',
            EN: 'Represents the grams of solute dissolved in 100 grams of solution.'
        },
        symbols: ['C%', 'm_ct', 'm_dd'],
        solverType: 'PERCENT_CONCENTRATION'
    },
    {
        id: 'molar_concentration',
        sectionNumber: 4,
        gradeRange: 'Lớp 8 - 12',
        category: 'SOLUTION',
        title: {
            VN: '4. Nồng Độ Mol của Dung Dịch (C_M)',
            EN: '4. Molar Concentration / Molarity (C_M)'
        },
        latexMain: 'C_M = \\frac{n}{V_{\\text{dd}}} \\quad (\\text{mol/L hay M})',
        latexVariants: [
            'n = C_M \\cdot V_{\\text{dd}}',
            'V_{\\text{dd}} = \\frac{n}{C_M}'
        ],
        description: {
            VN: 'Cho biết số mol chất tan trong 1 lít dung dịch. Lưu ý thể tích V_dd trong công thức này bắt buộc phải đổi sang đơn vị Lít (L).',
            EN: 'Molar concentration expressing moles of solute per liter of solution. Volume V must be in Liters.'
        },
        symbols: ['C_M', 'n', 'V_dd'],
        solverType: 'MOLAR_CONCENTRATION'
    },
    {
        id: 'cm_c_percent_relation',
        sectionNumber: 5,
        gradeRange: 'Lớp 9 - 12',
        category: 'SOLUTION',
        title: {
            VN: '5. Hệ Thức Chuyển Đổi Giữa C% và C_M',
            EN: '5. Interconversion Relation Between C% and C_M'
        },
        latexMain: 'C_M = \\frac{C\\% \\cdot 10 \\cdot d}{M_{\\text{ct}}}',
        latexVariants: [
            'C\\% = \\frac{C_M \\cdot M_{\\text{ct}}}{10 \\cdot d}',
            'd = \\frac{C_M \\cdot M_{\\text{ct}}}{10 \\cdot C\\%}'
        ],
        description: {
            VN: 'Công thức vàng kết nối nồng độ phần trăm C% và nồng độ mol C_M thông qua khối lượng riêng d (g/mL) và khối lượng mol chất tan M_ct.',
            EN: 'The golden conversion formula connecting C% and molarity C_M via solution density d (g/mL) and solute molar mass M_ct.'
        },
        symbols: ['C_M', 'C%', 'd', 'M_ct'],
        solverType: 'CM_CPERCENT_RELATION'
    },
    {
        id: 'solution_density',
        sectionNumber: 6,
        gradeRange: 'Lớp 8 - 12',
        category: 'SOLUTION',
        title: {
            VN: '6. Khối Lượng Riêng của Dung Dịch (d)',
            EN: '6. Solution Density (d)'
        },
        latexMain: 'd = \\frac{m_{\\text{dd}}}{V_{\\text{dd}}} \\quad (\\text{g/mL hoặc g/cm}^3)',
        latexVariants: [
            'm_{\\text{dd}} = V_{\\text{dd}} \\cdot d',
            'V_{\\text{dd}} = \\frac{m_{\\text{dd}}}{d}'
        ],
        description: {
            VN: 'Tỉ số giữa khối lượng dung dịch (g) và thể tích dung dịch (mL). Chú ý khi tính C_M cần đổi V_dd từ mL sang Lít bằng cách chia 1000.',
            EN: 'Density representing mass per volume (g/mL). Divide mL by 1000 when calculating molarity.'
        },
        symbols: ['d', 'm_dd', 'V_dd'],
        solverType: 'SOLUTION_DENSITY'
    },
    {
        id: 'mass_conservation_solution',
        sectionNumber: 7,
        gradeRange: 'Lớp 9 - 12',
        category: 'SOLUTION',
        title: {
            VN: '7. Bảo Toàn Khối Lượng Dung Dịch Sau Phản Ứng',
            EN: '7. Solution Mass Balance After Chemical Reaction'
        },
        latexMain: 'm_{\\text{dd sau pư}} = \\sum m_{\\text{trước pư}} - (m\\downarrow + m\\uparrow)',
        latexVariants: [
            'm_{\\text{dd sau pư}} = m_{\\text{kim loại/oxit}} + m_{\\text{dd axit}} - m_{\\text{khí thoát ra}}',
            'm_{\\text{dd sau pư}} = m_{\\text{dd A}} + m_{\\text{dd B}} - m_{\\text{kết tủa}}'
        ],
        description: {
            VN: 'Định luật bảo toàn khối lượng chất lỏng: Khi tính nồng độ dung dịch thu được sau phản ứng, phải trừ đi phần kết tủa lắng xuống đáy hoặc khí bay hơi thoát khỏi bình.',
            EN: 'Liquid mass conservation: To compute post-reaction solution concentration, subtract mass of precipitates settled and gases liberated.'
        },
        symbols: ['m_dd', 'm_kt, m_kh'],
        solverType: 'MASS_CONSERVATION'
    },
    {
        id: 'mixture_composition',
        sectionNumber: 8,
        gradeRange: 'Lớp 8 - 12',
        category: 'MIXTURES',
        title: {
            VN: '8. Thành Phần Phần Trăm Khối Lượng & Thể Tích Hỗn Hợp',
            EN: '8. Mass & Volume Percentage Composition in Mixtures'
        },
        latexMain: '\\%m_A = \\frac{m_A}{m_{\\text{hh}}} \\cdot 100\\% \\implies \\%m_A + \\%m_B + \\dots = 100\\%',
        latexVariants: [
            '\\%V_T = \\%n_T = \\frac{V_T}{V_{\\text{hh}}} \\cdot 100\\% = \\frac{n_T}{n_{\\text{hh}}} \\cdot 100\\%',
            '\\overline{M}_{\\text{hh}} = \\frac{m_{\\text{hh}}}{n_{\\text{hh}}} = \\frac{M_A \\cdot n_A + M_B \\cdot n_B}{n_A + n_B}'
        ],
        description: {
            VN: 'Với hỗn hợp chất rắn/lỏng: tính theo tỉ lệ khối lượng. Với hỗn hợp khí: phần trăm thể tích (%V) đúng bằng phần trăm số mol (%n). Khối lượng mol trung bình là chiếc chìa khóa giải toán hỗn hợp.',
            EN: 'For solids/liquids: percentage by mass. For gases: volume percentage equals molar percentage (%V = %n).'
        },
        symbols: ['m_hh', 'n_hh', 'V_hh'],
        solverType: 'MIXTURE_COMPOSITION'
    },
    {
        id: 'gas_relative_density',
        sectionNumber: 9,
        gradeRange: 'Lớp 8 - 12',
        category: 'MIXTURES',
        title: {
            VN: '9. Công Thức Tỉ Khối của Chất Khí',
            EN: '9. Vapor Density & Relative Gas Density Formulas'
        },
        latexMain: 'd_{A/B} = \\frac{M_A}{M_B} \\quad ; \\quad d_{A/\\text{KK}} = \\frac{M_A}{29}',
        latexVariants: [
            'M_A = d_{A/B} \\cdot M_B',
            'M_A = d_{A/\\text{KK}} \\cdot 29',
            'd_{\\text{hh}/B} = \\frac{\\overline{M}_{\\text{hh}}}{M_B}'
        ],
        description: {
            VN: 'Cho biết khí A nặng hơn hay nhẹ hơn khí B bao nhiêu lần. Không khí có khối lượng mol trung bình quy ước là 29 g/mol (gồm xấp xỉ 80% N2 và 20% O2).',
            EN: 'Compares relative density of gas A to gas B or to dry air (standard molar mass 29 g/mol).'
        },
        symbols: ['d_AB', 'M'],
        solverType: 'GAS_DENSITY'
    },
    {
        id: 'standard_reaction_enthalpy',
        sectionNumber: 10,
        gradeRange: 'Lớp 10 - 12',
        category: 'ADVANCED',
        title: {
            VN: '10. Biến Thiên Enthalpy Chuẩn của Phản Ứng (Δ_r H°_298)',
            EN: '10. Standard Reaction Enthalpy Change (Δ_r H°_298)'
        },
        latexMain: '\\Delta_r H^\\circ_{298} = \\sum \\Delta_f H^\\circ_{298}(\\text{sp}) - \\sum \\Delta_f H^\\circ_{298}(\\text{cđ})',
        latexVariants: [
            '\\Delta_r H^\\circ_{298} = \\sum E_b(\\text{cđ}) - \\sum E_b(\\text{sp}) \\quad (\\text{theo năng lượng liên kết})',
            '\\Delta_r H^\\circ_{298} < 0 \\implies \\text{Phản ứng tỏa nhiệt (Exothermic)}',
            '\\Delta_r H^\\circ_{298} > 0 \\implies \\text{Phản ứng thu nhiệt (Endothermic)}'
        ],
        description: {
            VN: 'Chương trình GDPT 2018 Lớp 10: Tính nhiệt phản ứng từ nhiệt tạo thành chuẩn (Δ_f H°) hoặc tổng năng lượng liên kết (Eb). Quyết định sự tỏa nhiệt hay thu nhiệt của phản ứng.',
            EN: 'Calculates heat of reaction from standard enthalpies of formation or bond dissociation energies.'
        },
        symbols: ['M'],
        solverType: 'ENTHALPY'
    },
    {
        id: 'ph_equilibrium_acids',
        sectionNumber: 11,
        gradeRange: 'Lớp 11 - 12',
        category: 'ADVANCED',
        title: {
            VN: '11. Công Thức Tính pH và Nồng Độ Ion [H+], [OH-]',
            EN: '11. pH Scale & Hydronium/Hydroxide Concentrations'
        },
        latexMain: '\\text{pH} = -\\log[\\text{H}^+] \\iff [\\text{H}^+] = 10^{-\\text{pH}}',
        latexVariants: [
            '\\text{pOH} = -\\log[\\text{OH}^-] \\iff [\\text{OH}^-] = 10^{-\\text{pOH}}',
            '\\text{pH} + \\text{pOH} = 14 \\quad (\\text{ở } 25^\\circ\\text{C})',
            'K_w = [\\text{H}^+][\\text{OH}^-] = 1{,}0 \\times 10^{-14}'
        ],
        description: {
            VN: 'Thang đo pH định lượng độ axit và bazơ của môi trường nước. [H+] > 10^-7 M: môi trường axit (pH < 7); [H+] < 10^-7 M: bazơ (pH > 7); pH = 7: trung tính.',
            EN: 'The logarithmic pH scale quantifying acidity and basicity in aqueous equilibrium at 25°C.'
        },
        symbols: ['C_M'],
        solverType: 'PH_CALCULATOR'
    },
    {
        id: 'faraday_electrolysis',
        sectionNumber: 12,
        gradeRange: 'Lớp 12',
        category: 'ADVANCED',
        title: {
            VN: '12. Định Luật Điện Phân Faraday',
            EN: '12. Faraday\'s Law of Electrolysis'
        },
        latexMain: 'm = \\frac{A \\cdot I \\cdot t}{n \\cdot F}',
        latexVariants: [
            'n_e = \\frac{I \\cdot t}{F} \\quad (F = 96500\\text{ C/mol})',
            'm = n_{\\text{kim loại}} \\cdot M = \\frac{n_e}{\\text{hóa trị}} \\cdot M'
        ],
        description: {
            VN: 'Tính lượng kim loại bám vào catot hoặc lượng khí thoát ra ở anot khi điện phân dung dịch/nóng chảy với dòng điện không đổi I (A) trong thời gian t (giây).',
            EN: 'Calculates the mass of substance deposited on electrodes during electrolysis using Faraday constant F = 96500 C/mol.'
        },
        symbols: ['m', 'M', 'n'],
        solverType: 'FARADAY'
    },
    {
        id: 'organic_unsaturation_degree',
        sectionNumber: 13,
        gradeRange: 'Lớp 11 - 12',
        category: 'ADVANCED',
        title: {
            VN: '13. Độ Bất Bão Hòa của Phân Tử Hữu Cơ (k hay π + vòng)',
            EN: '13. Degree of Unsaturation / Index of Hydrogen Deficiency (k)'
        },
        latexMain: 'k = \\frac{2C + 2 + N - H - X}{2}',
        latexVariants: [
            'k = \\pi + v \\quad (\\text{tổng số liên kết } \\pi \\text{ và số vòng no})',
            '\\text{Este no, đơn chức, mạch hở } (\\text{C}_n\\text{H}_{2n}\\text{O}_2): k = 1'
        ],
        description: {
            VN: 'Xác định số liên kết đôi, ba và số vòng trong công thức phân tử hữu cơ CxHyOzNtXu. Cực kỳ quan trọng để giải nhanh bài toán đồng phân và đốt cháy este, axit cacboxylic.',
            EN: 'Determines the total number of pi bonds and cyclic rings in an organic molecular formula.'
        },
        symbols: ['n'],
        solverType: 'UNSATURATION'
    }
];

/**
 * 3. EXTENSIVE CALCULATION QUESTIONS DATABASE (Grades 8 to 12)
 * Carefully designed with authentic numerical questions, multiple choice + numeric input,
 * and detailed step-by-step LaTeX derivations.
 */
export const CALCULATION_QUESTIONS_DATA: CalculationQuestion[] = [
    // --- GRADE 8 ---
    {
        id: 'g8_calc_01',
        code: 'CALC-08-01',
        grade: 8,
        category: 'MOL_MASS',
        title: {
            VN: 'Tính số mol và thể tích khí Oxi sinh ra từ KMnO4',
            EN: 'Moles and Gas Volume of Oxygen from Potassium Permanganate'
        },
        question: {
            VN: 'Nhiệt phân hoàn toàn 31,6 gam thuốc tím (KMnO₄). Tính thể tích khí O₂ (đktc mới 25°C, 1 bar) thu được.',
            EN: 'Thermal decomposition of 31.6 g KMnO4 is carried out completely. Calculate the volume of O2 gas (at SLC 25°C, 1 bar) produced.'
        },
        formulaIds: ['mole_mass_volume'],
        givenData: [
            { label: 'm(KMnO₄)', value: '31.6 g' },
            { label: 'M(KMnO₄)', value: '158 g/mol' },
            { label: 'T, P', value: '25°C, 1 bar' }
        ],
        equation: '2KMnO₄ → K₂MnO₄ + MnO₂ + O₂↑',
        options: [
            { id: 'A', text: '2.479 L', isCorrect: true },
            { id: 'B', text: '4.958 L', isCorrect: false },
            { id: 'C', text: '2.24 L', isCorrect: false },
            { id: 'D', text: '1.24 L', isCorrect: false }
        ],
        numericAnswer: {
            value: 2.479,
            tolerance: 0.05,
            unit: 'L'
        },
        stepByStepSolution: [
            {
                step: 1,
                title: { VN: 'Tính số mol KMnO₄', EN: 'Calculate moles of KMnO4' },
                latexContent: 'n_{\\text{KMnO}_4} = \\frac{m}{M} = \\frac{31{,}6}{158} = 0{,}2\\text{ mol}',
                explanation: {
                    VN: 'Áp dụng công thức n = m / M với M(KMnO4) = 39 + 55 + 16×4 = 158 g/mol.',
                    EN: 'Apply formula n = m / M with M(KMnO4) = 158 g/mol.'
                }
            },
            {
                step: 2,
                title: { VN: 'Theo phương trình phản ứng tính mol O₂', EN: 'Find moles of O2 via stoichiometry' },
                latexContent: '2\\text{KMnO}_4 \\xrightarrow{t^\\circ} \\text{K}_2\\text{MnO}_4 + \\text{MnO}_2 + \\text{O}_2 \\uparrow \\implies n_{\\text{O}_2} = \\frac{1}{2} n_{\\text{KMnO}_4} = 0{,}1\\text{ mol}',
                explanation: {
                    VN: 'Tỉ lệ mol giữa KMnO4 và O2 là 2 : 1, do đó n(O2) = 0.2 / 2 = 0.1 mol.',
                    EN: 'The stoichiometric ratio is 2 : 1, yielding n(O2) = 0.1 mol.'
                }
            },
            {
                step: 3,
                title: { VN: 'Tính thể tích khí O₂ ở điều kiện chuẩn (đkc)', EN: 'Calculate gas volume at standard conditions' },
                latexContent: 'V_{\\text{O}_2} = n \\cdot 24{,}79 = 0{,}1 \\cdot 24{,}79 = 2{,}479\\text{ L}',
                explanation: {
                    VN: 'Theo chuẩn GDPT 2018 (25°C, 1 bar), 1 mol khí chiếm thể tích 24,79 L. Đáp số: 2,479 Lít.',
                    EN: 'Under modern curriculum standard (25°C, 1 bar), 1 mol occupies 24.79 L. Result: 2.479 Liters.'
                }
            }
        ],
        suggestedReagents: ['KMnO4']
    },
    {
        id: 'g8_calc_02',
        code: 'CALC-08-02',
        grade: 8,
        category: 'SOLUTION_CONC',
        title: {
            VN: 'Pha chế dung dịch NaCl nồng độ phần trăm C%',
            EN: 'Preparation of Sodium Chloride Solution at Target C%'
        },
        question: {
            VN: 'Hòa tan hoàn toàn 15 gam muối ăn (NaCl) vào 185 gam nước cất. Tính nồng độ phần trăm (C%) của dung dịch thu được.',
            EN: 'Dissolve 15 g of NaCl completely in 185 g of distilled water. Calculate the mass percent concentration (C%) of the resulting solution.'
        },
        formulaIds: ['solution_mass', 'percent_concentration'],
        givenData: [
            { label: 'm(NaCl)', value: '15 g' },
            { label: 'm(H₂O)', value: '185 g' }
        ],
        options: [
            { id: 'A', text: '7.5%', isCorrect: true },
            { id: 'B', text: '8.1%', isCorrect: false },
            { id: 'C', text: '15.0%', isCorrect: false },
            { id: 'D', text: '5.0%', isCorrect: false }
        ],
        numericAnswer: {
            value: 7.5,
            tolerance: 0.1,
            unit: '%'
        },
        stepByStepSolution: [
            {
                step: 1,
                title: { VN: 'Tính khối lượng dung dịch m_dd', EN: 'Calculate solution mass m_dd' },
                latexContent: 'm_{\\text{dd}} = m_{\\text{ct}} + m_{\\text{dm}} = 15 + 185 = 200\\text{ gam}',
                explanation: {
                    VN: 'Khối lượng dung dịch bằng khối lượng chất tan NaCl cộng với khối lượng nước dung môi.',
                    EN: 'Total solution mass equals solute mass plus solvent water mass.'
                }
            },
            {
                step: 2,
                title: { VN: 'Áp dụng công thức nồng độ phần trăm C%', EN: 'Apply mass percentage formula' },
                latexContent: 'C\\% = \\frac{m_{\\text{ct}}}{m_{\\text{dd}}} \\cdot 100\\% = \\frac{15}{200} \\cdot 100\\% = 7{,}5\\%',
                explanation: {
                    VN: 'Lấy khối lượng chất tan chia khối lượng dung dịch rồi nhân 100%. Kết quả là 7,5%.',
                    EN: 'Divide solute mass by solution mass and multiply by 100%. Result: 7.5%.'
                }
            }
        ],
        suggestedReagents: ['NaCl', 'WATER']
    },

    // --- GRADE 9 ---
    {
        id: 'g9_calc_01',
        code: 'CALC-09-01',
        grade: 9,
        category: 'PRECIPITATE_GAS',
        title: {
            VN: 'Tính khối lượng kết tủa BaSO4 và C% dung dịch sau phản ứng',
            EN: 'Precipitation of BaSO4 & Resulting Solution Concentration'
        },
        question: {
            VN: 'Cho 20,8 gam BaCl₂ tác dụng vừa đủ với 100 gam dung dịch H₂SO₄. Tính khối lượng kết tủa trắng BaSO₄ thu được.',
            EN: '20.8 g of BaCl2 reacts completely with 100 g aqueous H2SO4. Calculate the mass of white BaSO4 precipitate formed.'
        },
        formulaIds: ['mole_mass_volume', 'mass_conservation_solution'],
        givenData: [
            { label: 'm(BaCl₂)', value: '20.8 g' },
            { label: 'M(BaCl₂)', value: '208 g/mol' },
            { label: 'M(BaSO₄)', value: '233 g/mol' }
        ],
        equation: 'BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl',
        options: [
            { id: 'A', text: '23.3 g', isCorrect: true },
            { id: 'B', text: '20.8 g', isCorrect: false },
            { id: 'C', text: '11.65 g', isCorrect: false },
            { id: 'D', text: '46.6 g', isCorrect: false }
        ],
        numericAnswer: {
            value: 23.3,
            tolerance: 0.1,
            unit: 'g'
        },
        stepByStepSolution: [
            {
                step: 1,
                title: { VN: 'Tính số mol BaCl₂', EN: 'Calculate moles of BaCl2' },
                latexContent: 'n_{\\text{BaCl}_2} = \\frac{m}{M} = \\frac{20{,}8}{208} = 0{,}1\\text{ mol}',
                explanation: {
                    VN: 'M(BaCl2) = 137 + 35.5×2 = 208 g/mol.',
                    EN: 'M(BaCl2) = 208 g/mol.'
                }
            },
            {
                step: 2,
                title: { VN: 'Lập phương trình và tính số mol BaSO₄', EN: 'Stoichiometric ratio for BaSO4' },
                latexContent: '\\text{BaCl}_2 + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{BaSO}_4 \\downarrow + 2\\text{HCl} \\implies n_{\\text{BaSO}_4} = n_{\\text{BaCl}_2} = 0{,}1\\text{ mol}',
                explanation: {
                    VN: 'Tỉ lệ mol là 1 : 1, vậy số mol kết tủa BaSO4 là 0,1 mol.',
                    EN: 'Stoichiometric ratio 1:1, hence n(BaSO4) = 0.1 mol.'
                }
            },
            {
                step: 3,
                title: { VN: 'Tính khối lượng kết tủa BaSO₄', EN: 'Calculate precipitate mass' },
                latexContent: 'm_{\\text{BaSO}_4} = n \\cdot M = 0{,}1 \\cdot 233 = 23{,}3\\text{ gam}',
                explanation: {
                    VN: 'M(BaSO4) = 137 + 32 + 16×4 = 233 g/mol. Khối lượng thu được: 23,3 g.',
                    EN: 'M(BaSO4) = 233 g/mol. Total precipitate: 23.3 g.'
                }
            }
        ],
        suggestedReagents: ['BaCl2', 'H2SO4']
    },
    {
        id: 'g9_calc_02',
        code: 'CALC-09-02',
        grade: 9,
        category: 'GAS_MIXTURE',
        title: {
            VN: 'Tính nồng độ mol C_M của dung dịch NaOH trung hòa axit',
            EN: 'Molar Concentration of NaOH in Acid Neutralization'
        },
        question: {
            VN: 'Cần bao nhiêu mL dung dịch NaOH 0,5 M để trung hòa hoàn toàn 200 mL dung dịch HCl 0,25 M?',
            EN: 'How many mL of 0.5 M NaOH solution is required to neutralize 200 mL of 0.25 M HCl solution?'
        },
        formulaIds: ['molar_concentration'],
        givenData: [
            { label: 'C_M(HCl)', value: '0.25 M' },
            { label: 'V(HCl)', value: '200 mL (0.2 L)' },
            { label: 'C_M(NaOH)', value: '0.5 M' }
        ],
        equation: 'NaOH + HCl → NaCl + H₂O',
        options: [
            { id: 'A', text: '100 mL', isCorrect: true },
            { id: 'B', text: '200 mL', isCorrect: false },
            { id: 'C', text: '50 mL', isCorrect: false },
            { id: 'D', text: '400 mL', isCorrect: false }
        ],
        numericAnswer: {
            value: 100,
            tolerance: 1,
            unit: 'mL'
        },
        stepByStepSolution: [
            {
                step: 1,
                title: { VN: 'Tính số mol HCl cần trung hòa', EN: 'Calculate moles of HCl' },
                latexContent: 'n_{\\text{HCl}} = C_M \\cdot V = 0{,}25 \\cdot 0{,}2 = 0{,}05\\text{ mol}',
                explanation: {
                    VN: 'Đổi 200 mL = 0,2 L rồi nhân với nồng độ mol.',
                    EN: 'Convert 200 mL to 0.2 L and multiply by molarity.'
                }
            },
            {
                step: 2,
                title: { VN: 'Tính số mol NaOH theo phản ứng trung hòa', EN: 'Determine required moles of NaOH' },
                latexContent: '\\text{NaOH} + \\text{HCl} \\rightarrow \\text{NaCl} + \\text{H}_2\\text{O} \\implies n_{\\text{NaOH}} = n_{\\text{HCl}} = 0{,}05\\text{ mol}',
                explanation: {
                    VN: 'Axit và bazơ đơn chức phản ứng tỉ lệ 1:1, do đó n(NaOH) = 0,05 mol.',
                    EN: 'Equimolar 1:1 reaction, n(NaOH) = 0.05 mol.'
                }
            },
            {
                step: 3,
                title: { VN: 'Tính thể tích dung dịch NaOH cần dùng', EN: 'Find volume of NaOH solution' },
                latexContent: 'V_{\\text{dd NaOH}} = \\frac{n}{C_M} = \\frac{0{,}05}{0{,}5} = 0{,}1\\text{ L} = 100\\text{ mL}',
                explanation: {
                    VN: 'Áp dụng công thức V = n / C_M, đổi 0,1 L = 100 mL.',
                    EN: 'Apply V = n / C_M, 0.1 L = 100 mL.'
                }
            }
        ],
        suggestedReagents: ['NaOH', 'HCl']
    },

    // --- GRADE 10 ---
    {
        id: 'g10_calc_01',
        code: 'CALC-10-01',
        grade: 10,
        category: 'THERMO_ENTHALPY',
        title: {
            VN: 'Tính biến thiên Enthalpy chuẩn Δ_r H°_298 của phản ứng nhiệt nhôm',
            EN: 'Standard Enthalpy Change of Thermite Reaction'
        },
        question: {
            VN: 'Cho phản ứng nhiệt nhôm: 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(s). Biết nhiệt tạo thành chuẩn Δ_f H°_298: Fe₂O₃(s) là -824,2 kJ/mol; Al₂O₃(s) là -1675,7 kJ/mol. Tính biến thiên enthalpy chuẩn Δ_r H°_298 của phản ứng.',
            EN: 'Thermite reaction: 2Al(s) + Fe2O3(s) -> Al2O3(s) + 2Fe(s). Given Δ_f H°_298 of Fe2O3 is -824.2 kJ/mol, Al2O3 is -1675.7 kJ/mol. Calculate Δ_r H°_298.'
        },
        formulaIds: ['standard_reaction_enthalpy'],
        givenData: [
            { label: 'Δ_f H°(Fe₂O₃)', value: '-824.2 kJ/mol' },
            { label: 'Δ_f H°(Al₂O₃)', value: '-1675.7 kJ/mol' },
            { label: 'Δ_f H°(Al, Fe)', value: '0 kJ/mol (đơn chất bền)' }
        ],
        equation: '2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(s)',
        options: [
            { id: 'A', text: '-851.5 kJ', isCorrect: true },
            { id: 'B', text: '+851.5 kJ', isCorrect: false },
            { id: 'C', text: '-2500.0 kJ', isCorrect: false },
            { id: 'D', text: '-425.8 kJ', isCorrect: false }
        ],
        numericAnswer: {
            value: -851.5,
            tolerance: 0.5,
            unit: 'kJ'
        },
        stepByStepSolution: [
            {
                step: 1,
                title: { VN: 'Áp dụng công thức biến thiên enthalpy phản ứng', EN: 'Formulate enthalpy balance' },
                latexContent: '\\Delta_r H^\\circ_{298} = \\sum \\Delta_f H^\\circ_{298}(\\text{sản phẩm}) - \\sum \\Delta_f H^\\circ_{298}(\\text{chất đầu})',
                explanation: {
                    VN: 'Tổng nhiệt tạo thành các chất sản phẩm trừ đi tổng nhiệt tạo thành các chất tham gia đầu.',
                    EN: 'Total standard formation enthalpy of products minus reactants.'
                }
            },
            {
                step: 2,
                title: { VN: 'Thay số các giá trị enthalpy chuẩn', EN: 'Substitute numerical enthalpy values' },
                latexContent: '\\Delta_r H^\\circ_{298} = [1 \\cdot (-1675{,}7) + 2 \\cdot 0] - [2 \\cdot 0 + 1 \\cdot (-824{,}2)]',
                explanation: {
                    VN: 'Đơn chất bền Al(s) và Fe(s) có Δ_f H° = 0 kJ/mol theo quy ước chuẩn IUPAC.',
                    EN: 'Elemental substances in standard states have Δ_f H° = 0 kJ/mol.'
                }
            },
            {
                step: 3,
                title: { VN: 'Tính toán kết quả và kết luận dấu năng lượng', EN: 'Final computation and thermal conclusion' },
                latexContent: '\\Delta_r H^\\circ_{298} = -1675{,}7 + 824{,}2 = -851{,}5\\text{ kJ}',
                explanation: {
                    VN: 'Δ_r H° < 0 (-851,5 kJ) chứng minh đây là phản ứng tỏa nhiệt cực kì mãnh liệt, nóng chảy cả sắt!',
                    EN: 'Negative value (-851.5 kJ) indicates strongly exothermic thermite reaction generating liquid iron.'
                }
            }
        ],
        suggestedReagents: ['Al', 'Fe2O3']
    },

    // --- GRADE 11 ---
    {
        id: 'g11_calc_01',
        code: 'CALC-11-01',
        grade: 11,
        category: 'PH_ACID_BASE',
        title: {
            VN: 'Tính pH của dung dịch axit mạnh HCl và pha loãng',
            EN: 'pH Calculation of Strong Acid HCl & Dilution Effect'
        },
        question: {
            VN: 'Hòa tan 0,001 mol khí HCl vào nước thu được 100 mL dung dịch. Tính giá trị pH của dung dịch axit này.',
            EN: 'Dissolve 0.001 mol HCl in water to make 100 mL solution. Calculate the pH value of this acidic solution.'
        },
        formulaIds: ['molar_concentration', 'ph_equilibrium_acids'],
        givenData: [
            { label: 'n(HCl)', value: '0.001 mol' },
            { label: 'V_dd', value: '100 mL = 0.1 L' }
        ],
        equation: 'HCl → H⁺ + Cl⁻ (điện ly hoàn toàn)',
        options: [
            { id: 'A', text: 'pH = 2', isCorrect: true },
            { id: 'B', text: 'pH = 3', isCorrect: false },
            { id: 'C', text: 'pH = 1', isCorrect: false },
            { id: 'D', text: 'pH = 4', isCorrect: false }
        ],
        numericAnswer: {
            value: 2.0,
            tolerance: 0.1,
            unit: ''
        },
        stepByStepSolution: [
            {
                step: 1,
                title: { VN: 'Tính nồng độ mol ion [H⁺]', EN: 'Calculate [H+] molarity' },
                latexContent: '[\\text{H}^+] = C_M(\\text{HCl}) = \\frac{n}{V} = \\frac{0{,}001}{0{,}1} = 0{,}01\\text{ M} = 10^{-2}\\text{ M}',
                explanation: {
                    VN: 'HCl là axit mạnh phân li hoàn toàn: [H+] = C_M(HCl) = 0,01 M.',
                    EN: 'HCl is a strong monoprotic acid completely dissociated: [H+] = 0.01 M.'
                }
            },
            {
                step: 2,
                title: { VN: 'Áp dụng định nghĩa thang đo pH', EN: 'Apply logarithmic pH definition' },
                latexContent: '\\text{pH} = -\\log[\\text{H}^+] = -\\log(10^{-2}) = 2',
                explanation: {
                    VN: 'Lấy logarit âm cơ số 10: -log(10^-2) = 2. Dung dịch có tính axit mạnh.',
                    EN: 'Negative log gives pH = 2.0.'
                }
            }
        ],
        suggestedReagents: ['HCl', 'WATER']
    },

    // --- GRADE 12 ---
    {
        id: 'g12_calc_01',
        code: 'CALC-12-01',
        grade: 12,
        category: 'ORGANIC_ESTERS',
        title: {
            VN: 'Bài toán thủy phân este no đơn chức (Etyl Axetat)',
            EN: 'Stoichiometry of Ethyl Acetate Saponification'
        },
        question: {
            VN: 'Thủy phân hoàn toàn 8,8 gam etyl axetat (CH₃COOC₂H₅) bằng dung dịch NaOH vừa đủ. Sau phản ứng cô cạn dung dịch, thu được m gam muối khan. Tính m.',
            EN: 'Completely hydrolyze 8.8 g of ethyl acetate with stoichiometric NaOH. Evaporate to dryness. Calculate mass m of dry carboxylate salt.'
        },
        formulaIds: ['mole_mass_volume', 'organic_unsaturation_degree'],
        givenData: [
            { label: 'm(este)', value: '8.8 g' },
            { label: 'M(CH₃COOC₂H₅)', value: '88 g/mol' },
            { label: 'M(CH₃COONa)', value: '82 g/mol' }
        ],
        equation: 'CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH',
        options: [
            { id: 'A', text: '8.2 g', isCorrect: true },
            { id: 'B', text: '6.8 g', isCorrect: false },
            { id: 'C', text: '9.6 g', isCorrect: false },
            { id: 'D', text: '4.1 g', isCorrect: false }
        ],
        numericAnswer: {
            value: 8.2,
            tolerance: 0.1,
            unit: 'g'
        },
        stepByStepSolution: [
            {
                step: 1,
                title: { VN: 'Tính số mol este etyl axetat', EN: 'Calculate moles of ethyl acetate' },
                latexContent: 'n_{\\text{este}} = \\frac{m}{M} = \\frac{8{,}8}{88} = 0{,}1\\text{ mol}',
                explanation: {
                    VN: 'M(CH3COOC2H5) = 12×4 + 1×8 + 16×2 = 88 g/mol.',
                    EN: 'Molar mass of ethyl acetate = 88 g/mol.'
                }
            },
            {
                step: 2,
                title: { VN: 'Theo phương trình phản ứng tính mol muối natri axetat', EN: 'Find moles of sodium acetate' },
                latexContent: '\\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{C}_2\\text{H}_5\\text{OH} \\implies n_{\\text{CH}_3\\text{COONa}} = 0{,}1\\text{ mol}',
                explanation: {
                    VN: 'Phản ứng este đơn chức tỉ lệ 1:1, thu được 0,1 mol CH3COONa.',
                    EN: 'Equimolar saponification produces 0.1 mol of sodium acetate.'
                }
            },
            {
                step: 3,
                title: { VN: 'Tính khối lượng muối khan m', EN: 'Calculate dry salt mass' },
                latexContent: 'm = n \\cdot M = 0{,}1 \\cdot 82 = 8{,}2\\text{ gam}',
                explanation: {
                    VN: 'M(CH3COONa) = 15 + 12 + 32 + 23 = 82 g/mol. Kết quả: 8,2 g.',
                    EN: 'M(CH3COONa) = 82 g/mol. Mass of dry salt = 8.2 g.'
                }
            }
        ],
        suggestedReagents: ['ETHYL_ACETATE', 'NaOH']
    },
    {
        id: 'g12_calc_02',
        code: 'CALC-12-02',
        grade: 12,
        category: 'FARADAY_ELECTRO',
        title: {
            VN: 'Tính khối lượng đồng bám vào catot theo định luật Faraday',
            EN: 'Electrolytic Copper Deposition via Faraday\'s Law'
        },
        question: {
            VN: 'Điện phân dung dịch CuSO₄ với cường độ dòng điện không đổi I = 1,93 A trong thời gian 50 phút. Tính khối lượng kim loại đồng (Cu) bám vào catot.',
            EN: 'Electrolyze CuSO4 solution with a constant current I = 1.93 A for 50 minutes. Calculate mass of Cu deposited onto cathode.'
        },
        formulaIds: ['faraday_electrolysis'],
        givenData: [
            { label: 'I', value: '1.93 A' },
            { label: 't', value: '50 phút = 3000 s' },
            { label: 'M(Cu)', value: '64 g/mol' },
            { label: 'F', value: '96500 C/mol' },
            { label: 'n (electron)', value: '2 (Cu²⁺ + 2e → Cu)' }
        ],
        equation: 'Cu²⁺ + 2e → Cu (tại Catot)',
        options: [
            { id: 'A', text: '1.92 g', isCorrect: true },
            { id: 'B', text: '3.84 g', isCorrect: false },
            { id: 'C', text: '0.96 g', isCorrect: false },
            { id: 'D', text: '6.40 g', isCorrect: false }
        ],
        numericAnswer: {
            value: 1.92,
            tolerance: 0.05,
            unit: 'g'
        },
        stepByStepSolution: [
            {
                step: 1,
                title: { VN: 'Đổi đơn vị thời gian và tính số mol electron trao đổi', EN: 'Convert time and find mole of electrons' },
                latexContent: 't = 50 \\times 60 = 3000\\text{ s} \\implies n_e = \\frac{I \\cdot t}{F} = \\frac{1{,}93 \\cdot 3000}{96500} = 0{,}06\\text{ mol}',
                explanation: {
                    VN: 'Áp dụng công thức n_e = (I × t) / F với F = 96500 C/mol.',
                    EN: 'Apply n_e = (I * t) / F with F = 96500 C/mol.'
                }
            },
            {
                step: 2,
                title: { VN: 'Tính số mol Cu thoát ra ở catot', EN: 'Determine moles of reduced Cu' },
                latexContent: '\\text{Cu}^{2+} + 2e \\rightarrow \\text{Cu} \\implies n_{\\text{Cu}} = \\frac{n_e}{2} = \\frac{0{,}06}{2} = 0{,}03\\text{ mol}',
                explanation: {
                    VN: 'Ion Cu²⁺ cần nhận 2 electron để tạo kim loại đồng.',
                    EN: 'Cu(2+) requires 2 electrons to form elemental copper.'
                }
            },
            {
                step: 3,
                title: { VN: 'Tính khối lượng đồng thu được', EN: 'Calculate deposited copper mass' },
                latexContent: 'm = n_{\\text{Cu}} \\cdot M_{\\text{Cu}} = 0{,}03 \\cdot 64 = 1{,}92\\text{ gam}',
                explanation: {
                    VN: 'm = (A × I × t) / (n × F) = 1,92 gam đồng.',
                    EN: 'Final mass = 1.92 g copper.'
                }
            }
        ],
        suggestedReagents: ['CuSO4']
    }
];

/**
 * 4. QUICK REAGENT PICKER FOR LIVE CALCULATION SOLVERS
 */
export const QUICK_CALC_SUBSTANCES = [
    { formula: 'CaCO3', name: 'Canxi Cacbonat', molarMass: 100.09 },
    { formula: 'H2SO4', name: 'Axit Sunfuric', molarMass: 98.08 },
    { formula: 'NaOH', name: 'Natri Hiđroxit', molarMass: 40.00 },
    { formula: 'HCl', name: 'Axit Clohiđric', molarMass: 36.46 },
    { formula: 'NaCl', name: 'Natri Clorua', molarMass: 58.44 },
    { formula: 'Fe', name: 'Sắt', molarMass: 55.85 },
    { formula: 'Al', name: 'Nhôm', molarMass: 26.98 },
    { formula: 'Cu', name: 'Đồng', molarMass: 63.55 },
    { formula: 'CO2', name: 'Cacbon Đioxit', molarMass: 44.01 },
    { formula: 'O2', name: 'Khí Oxi', molarMass: 32.00 },
    { formula: 'H2', name: 'Khí Hiđro', molarMass: 2.02 },
    { formula: 'BaSO4', name: 'Bari Sunfat', molarMass: 233.39 },
    { formula: 'KMnO4', name: 'Kali Pemanganat', molarMass: 158.03 },
    { formula: 'CH3COOH', name: 'Axit Axetic', molarMass: 60.05 },
    { formula: 'C2H5OH', name: 'Etanol', molarMass: 46.07 },
    { formula: 'CH3COOC2H5', name: 'Etyl Axetat', molarMass: 88.11 }
];
