/**
 * @file ChemicalRegistry.ts
 * @description The central thermodynamic, physical, and pedagogical data taxonomy for the Chemic-AI Quantum Engine.
 * Defines all authentic chemical substances, optical blending hues, physical states, and stoichiometric reaction pathways.
 */

export type ChemicalType = 'liquid' | 'solid' | 'gas';
export type LocalizedString = { EN: string; VN: string };

export type ChemicalCategory = 
    | 'element' 
    | 'acid' 
    | 'base' 
    | 'salt' 
    | 'organic' 
    | 'indicator' 
    | 'solvent';

export type ReactionClass = 
    | 'alkali_metal' 
    | 'alkaline_earth_metal'
    | 'transition_metal'
    | 'strong_acid' 
    | 'weak_acid'
    | 'strong_base' 
    | 'weak_base'
    | 'salt'
    | 'carbonate'
    | 'transition_metal_salt'
    | 'halogen'
    | 'non_metal'
    | 'alcohol'
    | 'polyol'
    | 'aldehyde'
    | 'ketone'
    | 'carboxylic_acid'
    | 'ester'
    | 'triglyceride'
    | 'carbohydrate'
    | 'amine'
    | 'indicator' 
    | 'solvent'
    | 'inert'
    | 'precipitate';

export interface Chemical {
    id: string;
    name: LocalizedString;
    formula: string;
    color: string; 
    type: ChemicalType;
    category: ChemicalCategory;
    reactionClass: ReactionClass;
    ph: number;
    description: LocalizedString;
    isOrganic: boolean;
    stateOfMatter?: 'solid' | 'liquid' | 'gas' | 'aqueous';
    hazardTypes?: Array<'flammable' | 'corrosive' | 'toxic' | 'explosive' | 'oxidizer' | 'irritant'>;
    molarMass?: number;
}

export interface ReactionRule {
    reactants: [string, string];
    product: string;
    products?: string[];
    productColor?: string;
    equation?: { EN: string; VN: string };
    reactionType?: { EN: string; VN: string };
    mechanism?: { EN: string; VN: string };
    message: LocalizedString;
    effect?: 'bubbles' | 'smoke' | 'fire' | 'explosion' | 'precipitate' | 'fizz' | 'color_shift';
    temperatureSpike?: number;
    requiresPopup?: boolean;
    orderMatters?: boolean;
    precipitateColor?: string;
    hazardLevel?: 'SAFE' | 'WARNING' | 'DANGER' | 'CRITICAL';
}

/**
 * Massive, scientifically authenticated Chemical Registry for Chemic-AI.
 * Covers foundational Grade 10-12, Advanced Placement (AP), and University Inorganic & Organic Chemistry.
 */
export const CHEMICAL_REGISTRY: Record<string, Chemical> = {
    // ==========================================
    // 1. SOLVENTS
    // ==========================================
    'DISTILLED_WATER': {
        id: 'DISTILLED_WATER',
        name: { EN: 'Distilled Water', VN: 'Nước Cất' },
        formula: 'H₂O',
        color: '#bae6fd',
        type: 'liquid',
        category: 'solvent',
        reactionClass: 'solvent',
        ph: 7.0,
        description: { EN: 'High-purity deionized water. The universal polar solvent for chemical reactions.', VN: 'Nước cất tinh khiết khử ion. Dung môi phân cực phổ biến cho các phản ứng hóa học.' },
        isOrganic: false,
        stateOfMatter: 'liquid',
        molarMass: 18.015
    },

    // ==========================================
    // 2. METALS & ELEMENTS (Alkali, Alkaline Earth, Transition)
    // ==========================================
    'LITHIUM': {
        id: 'LITHIUM',
        name: { EN: 'Lithium Metal', VN: 'Kim loại Liti' },
        formula: 'Li',
        color: '#e2e8f0',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkali_metal',
        ph: 7.0,
        description: { EN: 'Lightest alkali metal. Floats on water and reacts steadily, generating hydrogen gas and LiOH.', VN: 'Kim loại kiềm nhẹ nhất. Nổi trên nước và phản ứng đều đặn sinh khí hydro và LiOH.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['flammable', 'corrosive'],
        molarMass: 6.94
    },
    'SODIUM': {
        id: 'SODIUM',
        name: { EN: 'Sodium Metal', VN: 'Kim loại Natri' },
        formula: 'Na',
        color: '#cbd5e1',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkali_metal',
        ph: 7.0,
        description: { EN: 'Soft silvery alkali metal. Melts into a skittering molten sphere on water and burns with an incandescent golden flame (589 nm).', VN: 'Kim loại kiềm mềm màu trắng bạc. Nóng chảy thành viên tròn chạy trên mặt nước và cháy với ngọn lửa vàng đặc trưng (589 nm).' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['explosive', 'flammable', 'corrosive'],
        molarMass: 22.99
    },
    'POTASSIUM': {
        id: 'POTASSIUM',
        name: { EN: 'Potassium Metal', VN: 'Kim loại Kali' },
        formula: 'K',
        color: '#94a3b8',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkali_metal',
        ph: 7.0,
        description: { EN: 'Hyper-reactive alkali metal. Ignites spontaneously upon water contact with a brilliant lilac flame (766 nm).', VN: 'Kim loại kiềm hoạt động cực mạnh. Tự bốc cháy khi tiếp xúc với nước bằng ngọn lửa màu tím tráng lệ (766 nm).' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['explosive', 'flammable', 'corrosive'],
        molarMass: 39.10
    },
    'MAGNESIUM': {
        id: 'MAGNESIUM',
        name: { EN: 'Magnesium Ribbon', VN: 'Kim loại Magie' },
        formula: 'Mg',
        color: '#e2e8f0',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkaline_earth_metal',
        ph: 7.0,
        description: { EN: 'Shiny silvery-white alkaline earth metal. Burns with a blinding white light and reacts rapidly with acids.', VN: 'Kim loại kiềm thổ màu trắng bạc. Cháy với ánh sáng trắng chói lòa và phản ứng nhanh với axit.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['flammable'],
        molarMass: 24.305
    },
    'CALCIUM': {
        id: 'CALCIUM',
        name: { EN: 'Calcium Metal', VN: 'Kim loại Canxi' },
        formula: 'Ca',
        color: '#d1d5db',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkaline_earth_metal',
        ph: 7.0,
        description: { EN: 'Reactive alkaline earth metal. Sinks in water and produces vigorous effervescence of hydrogen gas and Ca(OH)₂.', VN: 'Kim loại kiềm thổ hoạt động. Chìm trong nước và sủi bọt mạnh khí hydro và vôi tôi Ca(OH)₂.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['flammable', 'corrosive'],
        molarMass: 40.08
    },
    'BARIUM': {
        id: 'BARIUM',
        name: { EN: 'Barium Metal', VN: 'Kim loại Bari' },
        formula: 'Ba',
        color: '#9ca3af',
        type: 'solid',
        category: 'element',
        reactionClass: 'alkaline_earth_metal',
        ph: 7.0,
        description: { EN: 'Heavy reactive alkaline earth metal. Produces apple-green flame and insoluble sulfates.', VN: 'Kim loại kiềm thổ nặng. Cho ngọn lửa màu xanh lục táo và tạo kết tủa sunfat không tan.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        hazardTypes: ['toxic', 'flammable'],
        molarMass: 137.33
    },
    'IRON': {
        id: 'IRON',
        name: { EN: 'Iron Powder / Shavings', VN: 'Bột Sắt' },
        formula: 'Fe',
        color: '#64748b',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7.0,
        description: { EN: 'Transition metal with multiple oxidation states (+2, +3). Reacts with dilute acids to give green Fe²⁺ solutions.', VN: 'Kim loại chuyển tiếp có nhiều số oxi hóa (+2, +3). Tác dụng với axit loãng tạo dung dịch Fe²⁺ màu xanh lục nhạt.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 55.845
    },
    'COPPER': {
        id: 'COPPER',
        name: { EN: 'Copper Metal', VN: 'Kim loại Đồng' },
        formula: 'Cu',
        color: '#f97316',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7.0,
        description: { EN: 'Reddish-orange transition metal. Unreactive with non-oxidizing acids, but reacts vigorously with concentrated nitric acid (HNO₃).', VN: 'Kim loại chuyển tiếp màu đỏ cam. Không tan trong axit thường, nhưng tan mạnh trong HNO₃ đặc tạo khí NO₂ màu nâu đỏ.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 63.546
    },
    'ZINC': {
        id: 'ZINC',
        name: { EN: 'Zinc Granules', VN: 'Kẽm Hạt' },
        formula: 'Zn',
        color: '#94a3b8',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7.0,
        description: { EN: 'Amphoteric transition metal. Standard reagent for generating hydrogen gas with acids in laboratory settings.', VN: 'Kim loại lưỡng tính. Hóa chất tiêu chuẩn để điều chế khí hydro trong phòng thí nghiệm.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 65.38
    },
    'ALUMINUM': {
        id: 'ALUMINUM',
        name: { EN: 'Aluminum Foil / Powder', VN: 'Nhôm Lá / Bột' },
        formula: 'Al',
        color: '#e2e8f0',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7.0,
        description: { EN: 'Lightweight amphoteric metal. Reacts with both strong acids and strong alkalis with passive oxide layer removal.', VN: 'Kim loại lưỡng tính nhẹ. Phản ứng được với cả axit mạnh lẫn bazơ kiềm mạnh sinh khí hydro.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 26.98
    },
    'SILVER': {
        id: 'SILVER',
        name: { EN: 'Silver Mirror Film', VN: 'Bạc Kim Loại' },
        formula: 'Ag',
        color: '#f1f5f9',
        type: 'solid',
        category: 'element',
        reactionClass: 'transition_metal',
        ph: 7.0,
        description: { EN: 'Precious transition metal with the highest electrical and optical reflectivity. Forms silver mirror coatings in Tollens test.', VN: 'Kim loại quý có độ phản xạ quang học cao nhất. Tạo thành lớp gương sáng bóng trong phản ứng tráng bạc.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 107.87
    },

    // ==========================================
    // 3. INORGANIC ACIDS
    // ==========================================
    'HCl': {
        id: 'HCl',
        name: { EN: 'Hydrochloric Acid (1M)', VN: 'Axit Clohiđric (1M)' },
        formula: 'HCl',
        color: '#e0f2fe',
        type: 'liquid',
        category: 'acid',
        reactionClass: 'strong_acid',
        ph: 1.0,
        description: { EN: 'Strong monoprotic mineral acid. Completely dissociates into H⁺ and Cl⁻ ions.', VN: 'Axit vô cơ mạnh đơn chức. Phân ly hoàn toàn thành các ion H⁺ và Cl⁻.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['corrosive', 'irritant'],
        molarMass: 36.46
    },
    'H2SO4': {
        id: 'H2SO4',
        name: { EN: 'Sulfuric Acid (Concentrated)', VN: 'Axit Sunfuric (Đặc)' },
        formula: 'H₂SO₄',
        color: '#f8fafc',
        type: 'liquid',
        category: 'acid',
        reactionClass: 'strong_acid',
        ph: 0.1,
        description: { EN: 'Dense, oily, strongly dehydrating diprotic acid. Highly exothermic upon water dilution (always add acid to water!).', VN: 'Axit vô cơ hai chức đậm đặc, có tính háo nước cực mạnh. Tỏa nhiệt dữ dội khi pha loãng với nước (luôn rót axit vào nước!).' },
        isOrganic: false,
        stateOfMatter: 'liquid',
        hazardTypes: ['corrosive', 'toxic'],
        molarMass: 98.079
    },
    'HNO3': {
        id: 'HNO3',
        name: { EN: 'Nitric Acid (Concentrated)', VN: 'Axit Nitric (Đặc)' },
        formula: 'HNO₃',
        color: '#fef08a',
        type: 'liquid',
        category: 'acid',
        reactionClass: 'strong_acid',
        ph: 0.5,
        description: { EN: 'Powerful oxidizing mineral acid. Dissolves copper and gives off reddish-brown NO₂ gas.', VN: 'Axit vô cơ có tính oxi hóa cực mạnh. Hòa tan đồng kim loại và giải phóng khí NO₂ màu nâu đỏ độc hại.' },
        isOrganic: false,
        stateOfMatter: 'liquid',
        hazardTypes: ['corrosive', 'oxidizer', 'toxic'],
        molarMass: 63.01
    },
    'H3PO4': {
        id: 'H3PO4',
        name: { EN: 'Phosphoric Acid', VN: 'Axit Photphoric' },
        formula: 'H₃PO₄',
        color: '#f1f5f9',
        type: 'liquid',
        category: 'acid',
        reactionClass: 'weak_acid',
        ph: 2.2,
        description: { EN: 'Triprotic mineral acid of moderate strength. Used in rust conversion and biochemical phosphorylation.', VN: 'Axit ba chức có độ mạnh trung bình. Dùng trong tẩy gỉ sắt và hóa sinh.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 97.994
    },

    // ==========================================
    // 4. BASES & ALKALIS
    // ==========================================
    'NaOH': {
        id: 'NaOH',
        name: { EN: 'Sodium Hydroxide (1M)', VN: 'Natri Hydroxit (1M)' },
        formula: 'NaOH',
        color: '#f0fdf4',
        type: 'liquid',
        category: 'base',
        reactionClass: 'strong_base',
        ph: 14.0,
        description: { EN: 'Caustic soda. Strong alkali that completely dissociates into Na⁺ and OH⁻. Essential for saponification and precipitation.', VN: 'Xút ăn da. Bazơ kiềm mạnh phân ly hoàn toàn thành Na⁺ và OH⁻. Dùng trong xà phòng hóa và kết tủa ion kim loại.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['corrosive'],
        molarMass: 39.997
    },
    'KOH': {
        id: 'KOH',
        name: { EN: 'Potassium Hydroxide (1M)', VN: 'Kali Hydroxit (1M)' },
        formula: 'KOH',
        color: '#f0fdf4',
        type: 'liquid',
        category: 'base',
        reactionClass: 'strong_base',
        ph: 14.0,
        description: { EN: 'Caustic potash. Extremely hygroscopic strong alkali used for manufacturing liquid soaps and organic hydrolysis.', VN: 'Bazơ kiềm mạnh có tính hút ẩm cao, dùng trong sản xuất xà phòng lỏng và thủy phân este.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['corrosive'],
        molarMass: 56.11
    },
    'CaOH2': {
        id: 'CaOH2',
        name: { EN: 'Limewater / Calcium Hydroxide', VN: 'Nước Vôi Trong Ca(OH)₂' },
        formula: 'Ca(OH)₂',
        color: '#f8fafc',
        type: 'liquid',
        category: 'base',
        reactionClass: 'strong_base',
        ph: 12.4,
        description: { EN: 'Clear limewater solution. Turns milky white in the presence of carbon dioxide (CO₂) due to CaCO₃ precipitate formation.', VN: 'Nước vôi trong suốt. Vẩn đục trắng khi sục khí CO₂ do tạo kết tủa Canxi Cacbonat (CaCO₃).' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 74.093
    },
    'BaOH2': {
        id: 'BaOH2',
        name: { EN: 'Barium Hydroxide Solution', VN: 'Dung dịch Bari Hydroxit' },
        formula: 'Ba(OH)₂',
        color: '#f1f5f9',
        type: 'liquid',
        category: 'base',
        reactionClass: 'strong_base',
        ph: 13.5,
        description: { EN: 'Strong soluble alkaline solution. Excellent reagent for quantitative sulfate precipitation.', VN: 'Dung dịch bazơ kiềm mạnh. Thuốc thử hoàn hảo để nhận biết và kết tủa ion sunfat SO₄²⁻.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['corrosive', 'toxic'],
        molarMass: 171.34
    },
    'NH3_AQ': {
        id: 'NH3_AQ',
        name: { EN: 'Aqueous Ammonia (NH₄OH)', VN: 'Dung dịch Amoniac (NH₄OH)' },
        formula: 'NH₃ (aq)',
        color: '#f0fdfa',
        type: 'liquid',
        category: 'base',
        reactionClass: 'weak_base',
        ph: 11.2,
        description: { EN: 'Pungent weak base with strong complexing ability. Dissolves AgCl and Cu(OH)₂ forming deep blue ammine complexes.', VN: 'Dung dịch bazơ yếu mùi khai có khả năng tạo phức mạnh. Hòa tan Cu(OH)₂ tạo phức chất amoniac màu xanh thẫm.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['irritant', 'toxic'],
        molarMass: 35.05
    },

    // ==========================================
    // 5. SALTS & SOLUTIONS
    // ==========================================
    'NaCl': {
        id: 'NaCl',
        name: { EN: 'Sodium Chloride (Brine)', VN: 'Natri Clorua (Nước Muối)' },
        formula: 'NaCl',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7.0,
        description: { EN: 'Standard table salt solution. Neutral electrolyte yielding white AgCl precipitate with silver nitrate.', VN: 'Dung dịch muối ăn trung tính. Cho kết tủa trắng AgCl khi tác dụng với Bạc Nitrat.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 58.44
    },
    'Na2CO3': {
        id: 'Na2CO3',
        name: { EN: 'Sodium Carbonate (Soda Ash)', VN: 'Natri Cacbonat (Soda)' },
        formula: 'Na₂CO₃',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'carbonate',
        ph: 11.6,
        description: { EN: 'Alkaline carbonate salt. Effervesces vigorously with acids to liberate CO₂ gas.', VN: 'Muối cacbonat có tính kiềm. Sủi bọt dữ dội giải phóng khí CO₂ khi gặp axit.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 105.99
    },
    'NaHCO3': {
        id: 'NaHCO3',
        name: { EN: 'Sodium Bicarbonate (Baking Soda)', VN: 'Natri Bicacbonat (Baking Soda)' },
        formula: 'NaHCO₃',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'carbonate',
        ph: 8.3,
        description: { EN: 'Mildly alkaline amphiprotic bicarbonate salt. Readily releases CO₂ bubbles upon reaction with vinegar / acetic acid.', VN: 'Muối bicacbonat lưỡng tính. Phản ứng sủi bọt CO₂ nhanh chóng với giấm ăn (axit axetic).' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 84.007
    },
    'SODIUM_ACETATE': {
        id: 'SODIUM_ACETATE',
        name: { EN: 'Sodium Acetate Solution', VN: 'Dung dịch Natri Axetat' },
        formula: 'CH₃COONa',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'salt',
        ph: 8.9,
        description: { EN: 'Organic salt formed from acetic acid neutralization or sodium reaction with vinegar. Hydrolyzes to give a mildly basic solution.', VN: 'Muối hữu cơ sinh ra từ phản ứng trung hòa axit axetic hoặc natri tác dụng với giấm. Thủy phân cho môi trường kiềm yếu.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 82.03
    },
    'CuSO4': {
        id: 'CuSO4',
        name: { EN: 'Copper(II) Sulfate (0.5M)', VN: 'Đồng(II) Sunfat (0.5M)' },
        formula: 'CuSO₄',
        color: '#3b82f6',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 4.5,
        description: { EN: 'Brilliant azure blue solution of hydrated Cu²⁺ ions. Forms Cu(OH)₂ blue precipitate with alkalis.', VN: 'Dung dịch màu xanh lam tuyệt đẹp của ion Cu²⁺. Tạo kết tủa xanh lam Cu(OH)₂ khi tác dụng với dung dịch kiềm.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 159.609
    },
    'FeCl3': {
        id: 'FeCl3',
        name: { EN: 'Iron(III) Chloride (0.5M)', VN: 'Sắt(III) Clorua (0.5M)' },
        formula: 'FeCl₃',
        color: '#d97706',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 2.0,
        description: { EN: 'Yellowish-brown solution of Fe³⁺ ions. Produces reddish-brown Fe(OH)₃ precipitate and purple phenol complexes.', VN: 'Dung dịch màu vàng nâu của ion Fe³⁺. Tạo kết tủa nâu đỏ Fe(OH)₃ với kiềm và tạo phức màu tím đặc trưng với phenol.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 162.20
    },
    'AgNO3': {
        id: 'AgNO3',
        name: { EN: 'Silver Nitrate (0.1M)', VN: 'Bạc Nitrat (0.1M)' },
        formula: 'AgNO₃',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 6.0,
        description: { EN: 'Colorless silver salt solution. Standard analytical test for halide ions (Cl⁻, Br⁻, I⁻) forming distinct precipitates.', VN: 'Dung dịch muối bạc trong suốt. Thuốc thử phân tích kinh điển nhận biết các ion halogenua (Cl⁻, Br⁻, I⁻).' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['corrosive', 'oxidizer'],
        molarMass: 169.87
    },
    'BaCl2': {
        id: 'BaCl2',
        name: { EN: 'Barium Chloride (0.2M)', VN: 'Bari Clorua (0.2M)' },
        formula: 'BaCl₂',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7.0,
        description: { EN: 'Colorless barium salt solution. Specifically detects sulfate ions (SO₄²⁻) by instantly forming insoluble white BaSO₄.', VN: 'Dung dịch muối bari trong suốt. Dùng đặc hiệu để nhận biết ion sunfat (SO₄²⁻) tạo kết tủa trắng BaSO₄ không tan trong axit.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['toxic'],
        molarMass: 208.23
    },
    'KI': {
        id: 'KI',
        name: { EN: 'Potassium Iodide Solution', VN: 'Kali Iodua (KI)' },
        formula: 'KI',
        color: '#fef3c7',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7.0,
        description: { EN: 'Iodide salt solution. Forms yellow PbI₂ precipitate with lead and dissolves elemental iodine to prepare Lugol reagent.', VN: 'Dung dịch muối iodua. Tạo kết tủa vàng tươi với chì và hòa tan iot để tạo dung dịch Lugol.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 166.00
    },
    'KMnO4': {
        id: 'KMnO4',
        name: { EN: 'Potassium Permanganate (0.05M)', VN: 'Thuốc Tím (KMnO₄)' },
        formula: 'KMnO₄',
        color: '#7e22ce',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'transition_metal_salt',
        ph: 7.0,
        description: { EN: 'Intense violet-purple solution of MnO₄⁻. Classic oxidizing agent that decolorizes in acidic redox reactions with alkenes/Fe²⁺.', VN: 'Dung dịch màu tím đậm đặc trưng của ion MnO₄⁻. Chất oxi hóa mạnh bị mất màu tím trong môi trường axit khi gặp anken hoặc Fe²⁺.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        hazardTypes: ['oxidizer'],
        molarMass: 158.034
    },

    // ==========================================
    // 6. ORGANIC COMPOUNDS (Alcohols, Acids, Esters, Fats, Sugars)
    // ==========================================
    'ETHANOL': {
        id: 'ETHANOL',
        name: { EN: 'Ethanol (Ethyl Alcohol 96%)', VN: 'Cồn Etylic / Rượu Etylic' },
        formula: 'C₂H₅OH',
        color: '#f1f5f9',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'alcohol',
        ph: 7.0,
        description: { EN: 'Volatile, flammable primary alcohol. Reacts with sodium to form ethoxide and esterifies with acetic acid to give ethyl acetate.', VN: 'Ancol no đơn chức dễ cháy. Tác dụng với natri giải phóng H₂ và este hóa với axit axetic tạo etyl axetat có mùi thơm trái cây.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ['flammable'],
        molarMass: 46.07
    },
    'METHANOL': {
        id: 'METHANOL',
        name: { EN: 'Methanol (Methyl Alcohol)', VN: 'Rượu Metylic (Methanol)' },
        formula: 'CH₃OH',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'alcohol',
        ph: 7.0,
        description: { EN: 'Simplest alcohol. Highly toxic solvent that burns with a clean, almost invisible pale blue flame.', VN: 'Ancol đơn giản nhất. Dung môi hữu cơ độc hại, cháy với ngọn lửa màu xanh nhạt.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ['flammable', 'toxic'],
        molarMass: 32.04
    },
    'GLYCEROL': {
        id: 'GLYCEROL',
        name: { EN: 'Glycerol (Glycerin / Propane-1,2,3-triol)', VN: 'Glixerol / Glixerin' },
        formula: 'C₃H₅(OH)₃',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'polyol',
        ph: 7.0,
        description: { EN: 'Viscous, sweet polyalcohol with 3 adjacent -OH groups. Dissolves Cu(OH)₂ to form a signature deep sapphire blue complex.', VN: 'Ancol đa chức có 3 nhóm -OH liền kề. Hòa tan kết tủa Cu(OH)₂ tạo phức chất màu xanh lam thẫm (xanh thẫm đặc trưng của polyancol).' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 92.09
    },
    'PHENOL': {
        id: 'PHENOL',
        name: { EN: 'Phenol Solution', VN: 'Dung dịch Phenol' },
        formula: 'C₆H₅OH',
        color: '#fdf4ff',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'weak_acid',
        ph: 5.5,
        description: { EN: 'Aromatic hydroxy compound with weak acidic character. Reacts with NaOH and gives deep purple complex with FeCl₃.', VN: 'Hợp chất thơm có nhóm -OH đính trực tiếp vào vòng benzen. Phản ứng với NaOH và cho màu tím tím đậm đặc trưng với FeCl₃.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ['toxic', 'corrosive'],
        molarMass: 94.11
    },
    'ACETIC_ACID': {
        id: 'ACETIC_ACID',
        name: { EN: 'Acetic Acid (Vinegar / Ethanoic Acid)', VN: 'Axit Axetic (Giấm Ăn)' },
        formula: 'CH₃COOH',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'carboxylic_acid',
        ph: 2.8,
        description: { EN: 'Pungent weak carboxylic acid. Reacts with sodium to form sodium acetate + H₂ gas, and reacts with alcohols to form fragrant esters.', VN: 'Axit cacboxylic đơn chức có mùi chua giấm. Tác dụng với natri tạo natri axetat + khí H₂, và este hóa với rượu tạo este mùi thơm.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 60.052
    },
    'FORMIC_ACID': {
        id: 'FORMIC_ACID',
        name: { EN: 'Formic Acid (Methanoic Acid)', VN: 'Axit Fomic (HCOOH)' },
        formula: 'HCOOH',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'carboxylic_acid',
        ph: 2.3,
        description: { EN: 'Simplest carboxylic acid containing an aldehyde group (-CHO). Uniquely undergoes the silver mirror reaction with Tollens reagent.', VN: 'Axit cacboxylic đơn giản nhất vừa có tính axit vừa có nhóm chức andehit (-CHO). Tham gia được phản ứng tráng bạc với thuốc thử Tollens.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ['corrosive', 'toxic'],
        molarMass: 46.03
    },
    'TRIGLYCERIDE': {
        id: 'TRIGLYCERIDE',
        name: { EN: 'Vegetable Oil (Triglycerides / Triolein)', VN: 'Dầu Thực Vật (Chất Béo / Triolein)' },
        formula: '(C₁₇H₃₃COO)₃C₃H₅',
        color: '#fef08a',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'triglyceride',
        ph: 7.0,
        description: { EN: 'Lipid / triester of glycerol and fatty acids. Hydrolyzes in hot sodium hydroxide (saponification) to synthesize glycerol and soap.', VN: 'Chất béo hữu cơ (este của glixerol và axit béo). Khi đun nóng với dung dịch kiềm NaOH (phản ứng xà phòng hóa) tạo ra glixerol và muối xà phòng.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 885.4
    },
    'ETHYL_ACETATE': {
        id: 'ETHYL_ACETATE',
        name: { EN: 'Ethyl Acetate (Ester)', VN: 'Etyl Axetat (Este)' },
        formula: 'CH₃COOC₂H₅',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'ester',
        ph: 7.0,
        description: { EN: 'Fragrant sweet-smelling ester synthesized from acetic acid and ethanol. Immiscible with water, forming an upper organic layer.', VN: 'Este có mùi thơm ngọt của hoa quả, sinh ra từ phản ứng este hóa giữa axit axetic và ancol etylic. Nhẹ hơn nước và ít tan trong nước.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ['flammable'],
        molarMass: 88.11
    },
    'SOAP': {
        id: 'SOAP',
        name: { EN: 'Soap Solution (Sodium Oleate / Stearate)', VN: 'Xà Phòng Hóa (Muối Natri Axit Béo)' },
        formula: 'C₁₇H₃₃COONa',
        color: '#fefce8',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'salt',
        ph: 9.5,
        description: { EN: 'Amphiphilic fatty acid salt produced by saponification. Forms cleansing micelles with hydrophobic hydrocarbon tails and hydrophilic ionic heads.', VN: 'Muối natri của axit béo sinh ra từ phản ứng xà phòng hóa. Phân tử lưỡng cực tạo hạt mixen giúp tẩy rửa dầu mỡ hiệu quả.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 304.44
    },
    'GLUCOSE': {
        id: 'GLUCOSE',
        name: { EN: 'Glucose Solution (0.5M)', VN: 'Dung dịch Glucozơ (Đường Đơn)' },
        formula: 'C₆H₁₂O₆',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'carbohydrate',
        ph: 7.0,
        description: { EN: 'Aldohexose monosaccharide with 5 adjacent -OH groups and 1 aldehyde group. Reduces Tollens reagent to form a shining silver mirror.', VN: 'Đường đơn aldohexozơ có 5 nhóm -OH liền kề và 1 nhóm andehit (-CHO). Khử thuốc thử Tollens tạo lớp gương bạc sáng loáng.' },
        isOrganic: true,
        stateOfMatter: 'aqueous',
        molarMass: 180.16
    },
    'ACETALDEHYDE': {
        id: 'ACETALDEHYDE',
        name: { EN: 'Acetaldehyde (Ethanal)', VN: 'Andehit Axetic (Axetanđehit)' },
        formula: 'CH₃CHO',
        color: '#f8fafc',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'aldehyde',
        ph: 7.0,
        description: { EN: 'Pungent volatile aldehyde. Undergoes nucleophilic oxidation in the Tollens test to form metallic silver precipitate.', VN: 'Andehit no đơn chức bay hơi. Tham gia phản ứng tráng bạc với thuốc thử Tollens tạo kết tủa bạc kim loại Ag.' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        hazardTypes: ['flammable', 'toxic'],
        molarMass: 44.05
    },

    // ==========================================
    // 7. INDICATORS & SPECIAL REAGENTS
    // ==========================================
    'PHENOLPHTHALEIN': {
        id: 'PHENOLPHTHALEIN',
        name: { EN: 'Phenolphthalein Indicator (1%)', VN: 'Chỉ Thị Phenolphtalein' },
        formula: 'C₂₀H₁₄O₄',
        color: '#f8fafc',
        type: 'liquid',
        category: 'indicator',
        reactionClass: 'indicator',
        ph: 7.0,
        description: { EN: 'pH indicator. Completely colorless in acidic and neutral solutions (pH < 8.2), turning brilliant fuchsia pink in alkaline media (pH > 8.2).', VN: 'Chất chỉ thị pH. Hoàn toàn không màu trong môi trường axit và trung tính (pH < 8.2), chuyển sang màu hồng cánh sen rực rỡ trong môi trường kiềm (pH > 8.2).' },
        isOrganic: true,
        stateOfMatter: 'liquid',
        molarMass: 318.32
    },
    'UNIVERSAL_INDICATOR': {
        id: 'UNIVERSAL_INDICATOR',
        name: { EN: 'Universal pH Indicator', VN: 'Chỉ Thị Vạn Năng (Universal pH)' },
        formula: 'pH Indicator Sol',
        color: '#22c55e',
        type: 'liquid',
        category: 'indicator',
        reactionClass: 'indicator',
        ph: 7.0,
        description: { EN: 'Multi-component pH indicator solution exhibiting a continuous rainbow spectrum: Red (pH 1-3) -> Yellow (pH 5-6) -> Green (pH 7) -> Blue/Violet (pH 9-14).', VN: 'Dung dịch chỉ thị pH đa thành phần đổi màu dải quang phổ cầu vồng: Đỏ (pH 1-3) -> Vàng (pH 5-6) -> Xanh lục (pH 7) -> Xanh lam/Tím (pH 9-14).' },
        isOrganic: true,
        stateOfMatter: 'liquid'
    },
    'TOLLENS_REAGENT': {
        id: 'TOLLENS_REAGENT',
        name: { EN: 'Tollens Reagent (Ammoniacal Silver)', VN: 'Thuốc Thử Tollens (AgNO₃/NH₃)' },
        formula: '[Ag(NH₃)₂]OH',
        color: '#f0fdfa',
        type: 'liquid',
        category: 'indicator',
        reactionClass: 'transition_metal_salt',
        ph: 10.5,
        description: { EN: 'Diamminesilver(I) hydroxide complex. Selective mild oxidizing reagent that oxidizes aldehydes and reducing sugars to deposit a brilliant silver mirror (Ag).', VN: 'Phức chất điaminbạc(I) hydroxit. Thuốc thử chọn lọc oxi hóa nhóm andehit trong glucozơ/andehit tạo lớp gương bạc sáng loáng.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 158.94
    },

    // ==========================================
    // 8. REACTION PRODUCTS & PRECIPITATES
    // ==========================================
    'CuOH2_PRECIPITATE': {
        id: 'CuOH2_PRECIPITATE',
        name: { EN: 'Copper(II) Hydroxide (Blue Precipitate)', VN: 'Đồng(II) Hydroxit (Kết Tủa Xanh Lam)' },
        formula: 'Cu(OH)₂ ↓',
        color: '#0284c7',
        type: 'solid',
        category: 'base',
        reactionClass: 'precipitate',
        ph: 8.5,
        description: { EN: 'Gelatinous azure-blue precipitate. Dissolves in acids (HCl) and dissolves in polyols (glycerol, glucose) to form deep sapphire blue complexes.', VN: 'Kết tủa keo màu xanh lam tươi. Tan trong axit giải phóng Cu²⁺ và tan trong polyancol (glixerol, glucozơ) tạo phức màu xanh lam thẫm.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 97.56
    },
    'COPPER_POLYOL_COMPLEX': {
        id: 'COPPER_POLYOL_COMPLEX',
        name: { EN: 'Copper-Glycerol Sapphire Complex', VN: 'Phức Đồng-Glixerol Xanh Thẫm' },
        formula: '[Cu(C₃H₇O₃)₂]',
        color: '#1d4ed8',
        type: 'liquid',
        category: 'organic',
        reactionClass: 'salt',
        ph: 8.0,
        description: { EN: 'Deep sapphire-blue soluble coordination complex. The definitive analytical identification test for vicinal polyhydroxy compounds (Grade 12).', VN: 'Dung dịch phức chất màu xanh lam thẫm trong suốt. Dấu hiệu nhận biết đặc trưng kinh điển của các hợp chất polyancol có nhóm -OH liền kề (Hóa 12).' },
        isOrganic: true,
        stateOfMatter: 'aqueous'
    },
    'FeOH3_PRECIPITATE': {
        id: 'FeOH3_PRECIPITATE',
        name: { EN: 'Iron(III) Hydroxide (Brown Precipitate)', VN: 'Sắt(III) Hydroxit (Kết Tủa Nâu Đỏ)' },
        formula: 'Fe(OH)₃ ↓',
        color: '#b45309',
        type: 'solid',
        category: 'base',
        reactionClass: 'precipitate',
        ph: 8.0,
        description: { EN: 'Dense reddish-brown rust precipitate. Insoluble in water, easily dissolved by mineral acids.', VN: 'Kết tủa màu nâu đỏ đặc trưng. Không tan trong nước, tan dễ dàng trong các dung dịch axit mạnh.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 106.87
    },
    'AgCl_PRECIPITATE': {
        id: 'AgCl_PRECIPITATE',
        name: { EN: 'Silver Chloride (Curdy White Precipitate)', VN: 'Bạc Clorua (Kết Tủa Trắng Vón)' },
        formula: 'AgCl ↓',
        color: '#f8fafc',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7.0,
        description: { EN: 'Curdy white precipitate that darkens upon light exposure. Insoluble in HNO₃, readily dissolves in aqueous ammonia forming [Ag(NH₃)₂]⁺.', VN: 'Kết tủa trắng vón như sữa chua. Không tan trong axit HNO₃, tan trong dung dịch amoniac tạo phức tan [Ag(NH₃)₂]⁺.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 143.32
    },
    'BaSO4_PRECIPITATE': {
        id: 'BaSO4_PRECIPITATE',
        name: { EN: 'Barium Sulfate (Dense White Precipitate)', VN: 'Bari Sunfat (Kết Tủa Trắng Không Tan)' },
        formula: 'BaSO₄ ↓',
        color: '#f8fafc',
        type: 'solid',
        category: 'salt',
        reactionClass: 'precipitate',
        ph: 7.0,
        description: { EN: 'Dense, extremely insoluble white precipitate. Completely impervious to mineral acids.', VN: 'Kết tủa trắng rất bền, nặng và mịn. Hoàn toàn không tan trong nước và các axit vô cơ mạnh.' },
        isOrganic: false,
        stateOfMatter: 'solid',
        molarMass: 233.39
    },
    'HYDROGEN_GAS': {
        id: 'HYDROGEN_GAS',
        name: { EN: 'Hydrogen Gas (Bubbles)', VN: 'Khí Hydro (H₂)' },
        formula: 'H₂ ↑',
        color: '#e0f2fe',
        type: 'gas',
        category: 'element',
        reactionClass: 'inert',
        ph: 7.0,
        description: { EN: 'Colorless, odorless, highly flammable gas produced by active metal-acid or metal-water redox reactions.', VN: 'Khí không màu, không mùi, rất nhẹ và dễ cháy nổ, sinh ra khi kim loại hoạt động tác dụng với axit hoặc nước.' },
        isOrganic: false,
        stateOfMatter: 'gas',
        molarMass: 2.016
    },
    'CARBON_DIOXIDE': {
        id: 'CARBON_DIOXIDE',
        name: { EN: 'Carbon Dioxide Gas (Effervescence)', VN: 'Khí Cacbonic (CO₂)' },
        formula: 'CO₂ ↑',
        color: '#f1f5f9',
        type: 'gas',
        category: 'element',
        reactionClass: 'inert',
        ph: 6.0,
        description: { EN: 'Colorless gas that produces vigorous effervescence. Turns clear limewater milky white.', VN: 'Khí không màu gây sủi bọt mạnh. Làm đục nước vôi trong do tạo kết tủa CaCO₃.' },
        isOrganic: false,
        stateOfMatter: 'gas',
        molarMass: 44.01
    },
    'PINK_BASE': {
        id: 'PINK_BASE',
        name: { EN: 'Alkaline Phenolphthalein (Fuchsia)', VN: 'Dung Dịch Bazơ Hồng Cánh Sen' },
        formula: 'Ind⁻ (Fuchsia)',
        color: '#f43f5e',
        type: 'liquid',
        category: 'indicator',
        reactionClass: 'indicator',
        ph: 11.0,
        description: { EN: 'Dianionic quinoid form of phenolphthalein displaying a dazzling fuchsia pink color in basic solution.', VN: 'Dạng ion mang điện tích âm của phenolphtalein có cấu trúc quinoid phát màu hồng cánh sen rực rỡ trong môi trường bazơ.' },
        isOrganic: true,
        stateOfMatter: 'aqueous'
    },
    'SALT_WATER': {
        id: 'SALT_WATER',
        name: { EN: 'Neutral Salt Solution (NaCl + H₂O)', VN: 'Dung Dịch Muối Trung Tính' },
        formula: 'NaCl (aq)',
        color: '#f8fafc',
        type: 'liquid',
        category: 'salt',
        reactionClass: 'salt',
        ph: 7.0,
        description: { EN: 'Neutral aqueous salt solution produced by stoichiometric acid-base neutralization.', VN: 'Dung dịch muối ăn trung hòa sinh ra từ phản ứng trung hòa axit - bazơ.' },
        isOrganic: false,
        stateOfMatter: 'aqueous',
        molarMass: 58.44
    }
};

/**
 * Pedagogically rigorous, scientifically authentic reaction rules.
 * Strictly maps stoichiometric equations, thermodynamic enthalpy, mechanisms, and real physical products.
 */
export const REACTION_RULES: ReactionRule[] = [
    // ==========================================
    // A. ALKALI METALS & WATER (Coulomb Explosion & Hydrogen Gas)
    // ==========================================
    {
        reactants: ['SODIUM', 'DISTILLED_WATER'],
        product: 'NaOH',
        products: ['NaOH', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Na (s) + 2H₂O (l) → 2NaOH (aq) + H₂ (g) ↑',
            VN: '2Na (r) + 2H₂O (l) → 2NaOH (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Violent Exothermic Redox & Coulomb Detonation',
            VN: 'Oxi Hóa - Khử Tỏa Nhiệt Mãnh Liệt & Nổ Coulomb'
        },
        mechanism: {
            EN: 'Metallic sodium rapidly transfers valence electrons to water molecules, reducing protons to hydrogen gas while generating hydroxide ions and intense heat (ΔH° = -368 kJ/mol). The heat ignites escaping H₂ with incandescent golden-yellow sodium D-line emissions (589 nm).',
            VN: 'Natri kim loại nhường nhanh electron hóa trị cho phân tử nước, khử H⁺ thành khí hydro đồng thời sinh ra ion OH⁻ và tỏa lượng nhiệt khổng lồ (ΔH° = -368 kJ/mol). Nhiệt lượng đốt cháy khí H₂ phát ra ngọn lửa màu vàng rực rỡ đặc trưng của vạch quang phổ Natri (589 nm).'
        },
        message: {
            EN: 'Violent exothermic reaction! Sodium skitters on water, burns with a golden flame, and detonates to form Sodium Hydroxide (NaOH) and Hydrogen gas (H₂).',
            VN: 'Phản ứng tỏa nhiệt dữ dội! Natri nóng chảy chạy trên mặt nước, cháy với ngọn lửa màu vàng và phát nổ tạo dung dịch Natri Hydroxit (NaOH) và khí Hydro (H₂).'
        },
        effect: 'explosion',
        temperatureSpike: 95,
        requiresPopup: true,
        hazardLevel: 'CRITICAL'
    },
    {
        reactants: ['POTASSIUM', 'DISTILLED_WATER'],
        product: 'KOH',
        products: ['KOH', 'HYDROGEN_GAS'],
        equation: {
            EN: '2K (s) + 2H₂O (l) → 2KOH (aq) + H₂ (g) ↑',
            VN: '2K (r) + 2H₂O (l) → 2KOH (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Hypergolic Alkali Metal Detonation',
            VN: 'Phản Ứng Nổ Tự Bốc Cháy Kim Loại Kiềm'
        },
        mechanism: {
            EN: 'Potassium has lower ionization energy than sodium (419 kJ/mol). Electron transfer is instantaneous, immediately igniting hydrogen with an ethereal violet/lilac flame (766 nm) and detonating with a powerful shockwave.',
            VN: 'Kali có năng lượng ion hóa thấp hơn natri (419 kJ/mol). Quá trình truyền electron diễn ra chớp nhoáng, ngay lập tức đốt cháy khí hydro với ngọn lửa màu tím tráng lệ (766 nm) và phát nổ tạo sóng xung kích cực mạnh.'
        },
        message: {
            EN: 'Hyper-exothermic reaction! Potassium ignites spontaneously with a brilliant lilac flame and detonates, yielding Potassium Hydroxide (KOH) and Hydrogen gas (H₂).',
            VN: 'Phản ứng siêu tỏa nhiệt! Kali tự bốc cháy với ngọn lửa màu tím và phát nổ dữ dội, tạo dung dịch Kali Hydroxit (KOH) và khí Hydro (H₂).'
        },
        effect: 'explosion',
        temperatureSpike: 120,
        requiresPopup: true,
        hazardLevel: 'CRITICAL'
    },
    {
        reactants: ['LITHIUM', 'DISTILLED_WATER'],
        product: 'NaOH',
        products: ['NaOH', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Li (s) + 2H₂O (l) → 2LiOH (aq) + H₂ (g) ↑',
            VN: '2Li (r) + 2H₂O (l) → 2LiOH (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Exothermic Alkali Metal Oxidation',
            VN: 'Phản Ứng Oxi Hóa Kim Loại Kiềm Tỏa Nhiệt'
        },
        mechanism: {
            EN: 'Lithium floats and steadily effervesces across the water surface, liberating H₂ gas and forming Lithium Hydroxide solution without spontaneous detonation due to its higher melting point.',
            VN: 'Liti nổi và sủi bọt khí hydro đều đặn trên mặt nước, tạo dung dịch Liti Hydroxit mà không phát nổ tự phát do có nhiệt độ nóng chảy cao hơn.'
        },
        message: {
            EN: 'Steady exothermic reaction: Lithium floats and reacts with water to produce Lithium Hydroxide (LiOH) and bubbling Hydrogen gas (H₂).',
            VN: 'Phản ứng tỏa nhiệt đều đặn: Liti nổi trên mặt nước sinh ra dung dịch LiOH kiềm và bọt khí Hydro (H₂).'
        },
        effect: 'bubbles',
        temperatureSpike: 35
    },

    // ==========================================
    // B. ALKALI METALS & ACIDS (Corrected: No false NaCl!)
    // ==========================================
    {
        reactants: ['SODIUM', 'ACETIC_ACID'],
        product: 'SODIUM_ACETATE',
        products: ['SODIUM_ACETATE', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Na (s) + 2CH₃COOH (aq) → 2CH₃COONa (aq) + H₂ (g) ↑',
            VN: '2Na (r) + 2CH₃COOH (dd) → 2CH₃COONa (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Metal-Acid Single Replacement & Gas Evolution',
            VN: 'Phản Ứng Thế Kim Loại - Axit Hữu Cơ & Thoát Khí'
        },
        mechanism: {
            EN: 'Sodium metal reduces the acidic proton of the carboxyl group (-COOH) in acetic acid, generating Sodium Acetate (CH₃COONa) salt and rapid bubbling of Hydrogen gas (H₂). Notice that no chlorine is present, so Sodium Acetate is formed, NOT table salt!',
            VN: 'Kim loại Natri khử ion H⁺ trong nhóm cacboxyl (-COOH) của axit axetic, tạo muối Natri Axetat (CH₃COONa) và giải phóng bọt khí Hydro (H₂). Vì phản ứng không hề có Clo nên sản phẩm là Natri Axetat chứ KHÔNG PHẢI muối ăn NaCl!'
        },
        message: {
            EN: 'Authentic Reaction: Sodium displaces hydrogen from Acetic Acid to form Sodium Acetate (CH₃COONa) and vigorous Hydrogen gas (H₂) effervescence.',
            VN: 'Phản ứng chuẩn xác: Natri tác dụng với Axit Axetic tạo muối Natri Axetat (CH₃COONa) và sủi bọt khí Hydro (H₂) mạnh mẽ.'
        },
        effect: 'fizz',
        temperatureSpike: 45
    },
    {
        reactants: ['SODIUM', 'HCl'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Na (s) + 2HCl (aq) → 2NaCl (aq) + H₂ (g) ↑',
            VN: '2Na (r) + 2HCl (dd) → 2NaCl (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Violent Strong Acid-Metal Single Replacement',
            VN: 'Phản Ứng Thế Axit Mạnh - Kim Loại Tỏa Nhiệt Dữ Dội'
        },
        mechanism: {
            EN: 'In the presence of high concentration H⁺ ions from HCl, electron transfer from sodium occurs at explosive velocity, liberating H₂ with immediate thermal flash.',
            VN: 'Dưới nồng độ ion H⁺ cao của axit clohiđric, sự truyền electron từ natri diễn ra với tốc độ bùng nổ, giải phóng H₂ kèm theo chớp nhiệt tức thì.'
        },
        message: {
            EN: 'Violent reaction! Sodium reacts aggressively with Hydrochloric Acid to produce Sodium Chloride (NaCl) and roaring Hydrogen gas (H₂).',
            VN: 'Phản ứng dữ dội! Natri tác dụng cực mạnh với Axit Clohiđric tạo muối Natri Clorua (NaCl) và luồng khí Hydro (H₂) bùng cháy.'
        },
        effect: 'explosion',
        temperatureSpike: 85,
        requiresPopup: true,
        hazardLevel: 'CRITICAL'
    },

    // ==========================================
    // C. SAPONIFICATION (Fat + Alkali -> Glycerol + Soap)
    // ==========================================
    {
        reactants: ['TRIGLYCERIDE', 'NaOH'],
        product: 'SOAP',
        products: ['SOAP', 'GLYCEROL'],
        equation: {
            EN: '(C₁₇H₃₃COO)₃C₃H₅ (l) + 3NaOH (aq) → C₃H₅(OH)₃ (l) + 3C₁₇H₃₃COONa (aq)',
            VN: '(C₁₇H₃₃COO)₃C₃H₅ (l) + 3NaOH (dd) → C₃H₅(OH)₃ (l) + 3C₁₇H₃₃COONa (dd)'
        },
        reactionType: {
            EN: 'Saponification / Alkaline Ester Hydrolysis',
            VN: 'Phản Ứng Xà Phòng Hóa / Thủy Phân Este Trong Kiềm'
        },
        mechanism: {
            EN: 'Nucleophilic Attack: Hydroxide ion (OH⁻) attacks the electrophilic carbonyl carbon of the ester bonds in the triglyceride. Collapse of tetrahedral intermediate cleaves the ester linkage, yielding Glycerol (propane-1,2,3-triol) and amphiphilic Sodium Carboxylate (Soap). Soap molecules assemble into cleansing micelles!',
            VN: 'Cơ chế tấn công nucleophil: Ion OH⁻ tấn công vào cacbon cacbonyl tích điện dương của liên kết este trong chất béo. Sự sụp đổ của trạng thái trung gian tứ diện bẻ gãy liên kết este, tạo ra Glixerol và muối Natri của axit béo (Xà phòng). Xà phòng tạo các hạt mixen giúp hòa tan dầu mỡ để tẩy rửa!'
        },
        message: {
            EN: 'Saponification Complete: Alkaline hydrolysis of Triglycerides with Sodium Hydroxide synthesizes Glycerol and authentic cleansing Soap (Sodium Oleate)!',
            VN: 'Xà phòng hóa thành công: Thủy phân chất béo trong dung dịch kiềm NaOH tạo ra Glixerol và Xà phòng tẩy rửa đích thực (Natri Oleat)!'
        },
        effect: 'bubbles',
        temperatureSpike: 25,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['TRIGLYCERIDE', 'KOH'],
        product: 'SOAP',
        products: ['SOAP', 'GLYCEROL'],
        equation: {
            EN: '(C₁₇H₃₃COO)₃C₃H₅ (l) + 3KOH (aq) → C₃H₅(OH)₃ (l) + 3C₁₇H₃₃COOK (aq)',
            VN: '(C₁₇H₃₃COO)₃C₃H₅ (l) + 3KOH (dd) → C₃H₅(OH)₃ (l) + 3C₁₇H₃₃COOK (dd)'
        },
        reactionType: {
            EN: 'Liquid Soap Saponification',
            VN: 'Xà Phòng Hóa Sản Xuất Xà Phòng Lỏng'
        },
        mechanism: {
            EN: 'Hydrolysis of triglycerides using Potassium Hydroxide (KOH) produces potassium fatty acid salts, which are softer and more soluble than sodium salts, forming liquid soap and shampoo bases.',
            VN: 'Thủy phân chất béo bằng KOH tạo muối kali của axit béo mềm và dễ tan hơn muối natri, là nền tảng sản xuất xà phòng lỏng và sữa tắm.'
        },
        message: {
            EN: 'Liquid Saponification: Reaction of triglycerides with KOH synthesizes Glycerol and soluble Potassium Soft Soap.',
            VN: 'Xà phòng hóa lỏng: Chất béo tác dụng với KOH tạo Glixerol và xà phòng kali mềm tan tốt.'
        },
        effect: 'bubbles',
        temperatureSpike: 25
    },

    // ==========================================
    // D. FISCHER ESTERIFICATION (Carboxylic Acid + Alcohol)
    // ==========================================
    {
        reactants: ['ACETIC_ACID', 'ETHANOL'],
        product: 'ETHYL_ACETATE',
        products: ['ETHYL_ACETATE', 'DISTILLED_WATER'],
        equation: {
            EN: 'CH₃COOH (l) + C₂H₅OH (l) ⇌ CH₃COOC₂H₅ (l) + H₂O (l)',
            VN: 'CH₃COOH (l) + C₂H₅OH (l) ⇌ CH₃COOC₂H₅ (l) + H₂O (l)'
        },
        reactionType: {
            EN: 'Fischer Esterification (Reversible)',
            VN: 'Phản Ứng Este Hóa Fischer (Thuận Nghịch)'
        },
        mechanism: {
            EN: 'Protonation of the carbonyl oxygen by acid catalyst enhances electrophilicity. Ethanol performs nucleophilic attack, followed by proton transfer and water elimination to yield fragrant Ethyl Acetate (fruit aroma).',
            VN: 'Axit axetic tác dụng với ancol etylic (xúc tác H₂SO₄ đặc đun nóng) tạo este Etyl Axetat có mùi thơm hoa quả đặc trưng, nhẹ hơn nước và nổi lên trên.'
        },
        message: {
            EN: 'Esterification synthesis: Acetic Acid and Ethanol combine to produce sweet, fruity Ethyl Acetate ester!',
            VN: 'Phản ứng este hóa: Axit Axetic và Ancol Etylic kết hợp tạo este Etyl Axetat có mùi thơm hoa quả dễ chịu!'
        },
        effect: 'bubbles',
        temperatureSpike: 15
    },

    // ==========================================
    // E. POLYOL & COPPER COMPLEXATION (Grade 12 Identification Test)
    // ==========================================
    {
        reactants: ['CuSO4', 'NaOH'],
        product: 'CuOH2_PRECIPITATE',
        products: ['CuOH2_PRECIPITATE', 'SALT_WATER'],
        equation: {
            EN: 'CuSO₄ (aq) + 2NaOH (aq) → Cu(OH)₂ (s) ↓ + Na₂SO₄ (aq)',
            VN: 'CuSO₄ (dd) + 2NaOH (dd) → Cu(OH)₂ (r) ↓ + Na₂SO₄ (dd)'
        },
        reactionType: {
            EN: 'Precipitation / Double Replacement',
            VN: 'Phản Ứng Trao Đổi Tạo Kết Tủa'
        },
        mechanism: {
            EN: 'Hydrated Cu²⁺ ions combine instantaneously with hydroxide ions (OH⁻) exceeding the solubility product (Ksp = 2.2 × 10⁻²⁰), precipitating out as gelatinous bright blue Copper(II) Hydroxide.',
            VN: 'Các ion Cu²⁺ kết hợp tức thì với ion OH⁻ vượt quá tích số tan, tạo thành kết tủa keo màu xanh lam tươi Cu(OH)₂.'
        },
        message: {
            EN: 'Precipitation synthesis: Copper(II) Sulfate reacts with Sodium Hydroxide to form a vibrant blue gelatinous precipitate of Cu(OH)₂.',
            VN: 'Tạo kết tủa: Dung dịch CuSO₄ tác dụng với NaOH sinh ra kết tủa keo màu xanh lam tươi Cu(OH)₂.'
        },
        effect: 'precipitate',
        precipitateColor: '#0284c7',
        temperatureSpike: 10
    },
    {
        reactants: ['GLYCEROL', 'CuOH2_PRECIPITATE'],
        product: 'COPPER_POLYOL_COMPLEX',
        products: ['COPPER_POLYOL_COMPLEX'],
        equation: {
            EN: '2C₃H₅(OH)₃ (l) + Cu(OH)₂ (s) → [Cu(C₃H₇O₃)₂] (aq) + 2H₂O (l)',
            VN: '2C₃H₅(OH)₃ (l) + Cu(OH)₂ (r) → [Cu(C₃H₇O₃)₂] (dd) + 2H₂O (l)'
        },
        reactionType: {
            EN: 'Polyalcohol Chelation Coordination Complex',
            VN: 'Phản Ứng Tạo Phức Chelate Đặc Trưng Của Polyancol'
        },
        mechanism: {
            EN: 'Glycerol contains 3 adjacent vicinal hydroxyl groups (-OH). The alcohol oxygens coordinate with the Cu²⁺ center, completely dissolving the blue precipitate to form a soluble, intense deep sapphire-blue chelate complex [Cu(C₃H₇O₃)₂]. This is the signature analytical test for multi-hydroxy compounds with adjacent -OH groups!',
            VN: 'Glixerol có các nhóm -OH liền kề. Các nguyên tử oxi tạo liên kết phối trí với ion Cu²⁺, hòa tan hoàn toàn kết tủa Cu(OH)₂ tạo dung dịch phức chất màu xanh lam thẫm (xanh thẫm đặc trưng của polyancol). Đây là phản ứng kinh điển để nhận biết ancol đa chức có nhóm -OH kề nhau (Hóa 12)!'
        },
        message: {
            EN: 'Complexation Discovery: Glycerol dissolves Cu(OH)₂ precipitate, producing an intense deep sapphire-blue copper-polyol complex solution!',
            VN: 'Khám phá tạo phức: Glixerol hòa tan kết tủa Cu(OH)₂ tạo dung dịch phức chất màu xanh lam thẫm rực rỡ đặc trưng!'
        },
        effect: 'color_shift',
        productColor: '#1d4ed8',
        temperatureSpike: 10,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['GLUCOSE', 'CuOH2_PRECIPITATE'],
        product: 'COPPER_POLYOL_COMPLEX',
        products: ['COPPER_POLYOL_COMPLEX'],
        equation: {
            EN: '2C₆H₁₂O₆ (aq) + Cu(OH)₂ (s) → [Cu(C₆H₁₁O₆)₂] (aq) + 2H₂O (l)',
            VN: '2C₆H₁₂O₆ (dd) + Cu(OH)₂ (r) → [Cu(C₆H₁₁O₆)₂] (dd) + 2H₂O (l)'
        },
        reactionType: {
            EN: 'Monosaccharide Polyol Complexation',
            VN: 'Tạo Phức Đồng-Glucozơ Màu Xanh Lam Thẫm'
        },
        mechanism: {
            EN: 'Glucose has 5 adjacent hydroxyl groups (-OH). At room temperature, it dissolves Cu(OH)₂ to form a signature deep blue copper-glucose complex solution.',
            VN: 'Glucozơ có 5 nhóm -OH liền kề. Ở nhiệt độ thường, glucozơ hòa tan kết tủa Cu(OH)₂ tạo dung dịch phức đồng-glucozơ màu xanh lam thẫm.'
        },
        message: {
            EN: 'Glucose Polyol Test: Monosaccharide dissolves Cu(OH)₂ to form a transparent deep blue complex solution.',
            VN: 'Nhận biết glucozơ: Glucozơ hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch phức màu xanh lam thẫm.'
        },
        effect: 'color_shift',
        productColor: '#1d4ed8',
        temperatureSpike: 8
    },

    // ==========================================
    // F. PRECIPITATE DISSOLUTION (Acid dissolving Hydroxide precipitate)
    // ==========================================
    {
        reactants: ['CuOH2_PRECIPITATE', 'HCl'],
        product: 'CuSO4',
        products: ['CuSO4', 'DISTILLED_WATER'],
        equation: {
            EN: 'Cu(OH)₂ (s) + 2HCl (aq) → CuCl₂ (aq) + 2H₂O (l)',
            VN: 'Cu(OH)₂ (r) + 2HCl (dd) → CuCl₂ (dd) + 2H₂O (l)'
        },
        reactionType: {
            EN: 'Acid Dissolution of Insoluble Base',
            VN: 'Axit Hòa Tan Bazơ Không Tan'
        },
        mechanism: {
            EN: 'Strong acid protons (H⁺) protonate the hydroxide ions of the solid lattice, driving dissolution equilibrium forward and clearing the blue precipitate into a transparent blue-green CuCl₂ solution.',
            VN: 'Ion H⁺ từ axit clohiđric tác dụng với ion OH⁻ trong mạng tinh thể kết tủa, hòa tan hoàn toàn kết tủa xanh Cu(OH)₂ tạo dung dịch CuCl₂ trong suốt màu xanh lam.'
        },
        message: {
            EN: 'Precipitate Dissolved: Hydrochloric Acid neutralizes the insoluble Cu(OH)₂ precipitate, returning it to a clear blue copper solution!',
            VN: 'Hòa tan kết tủa: Axit Clohiđric hòa tan hoàn toàn kết tủa Cu(OH)₂, chuyển thành dung dịch muối đồng màu xanh trong suốt!'
        },
        effect: 'bubbles',
        productColor: '#38bdf8',
        temperatureSpike: 15
    },

    // ==========================================
    // G. TOLLENS SILVER MIRROR TEST (Aldehyde / Glucose Oxidation)
    // ==========================================
    {
        reactants: ['GLUCOSE', 'TOLLENS_REAGENT'],
        product: 'SILVER',
        products: ['SILVER', 'DISTILLED_WATER'],
        equation: {
            EN: 'CH₂OH(CHOH)₄CHO + 2[Ag(NH₃)₂]OH → CH₂OH(CHOH)₄COONH₄ + 2Ag (s) ↓ + 3NH₃ + H₂O',
            VN: 'CH₂OH(CHOH)₄CHO + 2[Ag(NH₃)₂]OH → CH₂OH(CHOH)₄COONH₄ + 2Ag (r) ↓ + 3NH₃ + H₂O'
        },
        reactionType: {
            EN: 'Silver Mirror Test / Tollens Oxidation',
            VN: 'Phản Ứng Tráng Bạc / Thuốc Thử Tollens'
        },
        mechanism: {
            EN: 'The aldehyde group (-CHO) in open-chain glucose is oxidized to an ammonium carboxylate salt, while Ag⁺ diamminesilver ions are reduced to metallic Silver (Ag⁰), depositing a gleaming, reflective silver mirror on the glass walls.',
            VN: 'Nhóm chức andehit (-CHO) của glucozơ bị oxi hóa thành muối amoni gluconat, đồng thời ion Ag⁺ trong phức bị khử về bạc kim loại (Ag⁰), bám vào thành bình tạo thành lớp gương bạc sáng loáng.'
        },
        message: {
            EN: 'Silver Mirror Formed: Glucose reduces Tollens reagent, depositing a shining reflective coating of pure elemental Silver (Ag) onto the vessel walls!',
            VN: 'Tráng bạc thành công: Glucozơ khử thuốc thử Tollens tạo thành lớp gương Bạc (Ag) kim loại sáng bóng bám vào thành bình!'
        },
        effect: 'precipitate',
        precipitateColor: '#f1f5f9',
        temperatureSpike: 20,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['ACETALDEHYDE', 'TOLLENS_REAGENT'],
        product: 'SILVER',
        products: ['SILVER', 'DISTILLED_WATER'],
        equation: {
            EN: 'CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag (s) ↓ + 3NH₃ + H₂O',
            VN: 'CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag (r) ↓ + 3NH₃ + H₂O'
        },
        reactionType: {
            EN: 'Aldehyde Silver Mirror Reaction',
            VN: 'Phản Ứng Tráng Gương Của Andehit'
        },
        mechanism: {
            EN: 'Acetaldehyde reduces ammoniacal silver nitrate, depositing brilliant elemental silver on the beaker walls.',
            VN: 'Andehit axetic khử phức bạc amoniac, giải phóng bạc kim loại sáng loáng.'
        },
        message: {
            EN: 'Silver Mirror Deposit: Acetaldehyde is oxidized to ammonium acetate, creating a bright metallic silver mirror!',
            VN: 'Tạo gương bạc: Axetanđehit bị oxi hóa sinh ra lớp gương bạc kim loại sáng loáng!'
        },
        effect: 'precipitate',
        precipitateColor: '#f1f5f9',
        temperatureSpike: 20
    },

    // ==========================================
    // H. CARBONATES & EFFERVESCENCE (Baking Soda / Soda Ash + Acid)
    // ==========================================
    {
        reactants: ['NaHCO3', 'ACETIC_ACID'],
        product: 'SODIUM_ACETATE',
        products: ['SODIUM_ACETATE', 'CARBON_DIOXIDE', 'DISTILLED_WATER'],
        equation: {
            EN: 'NaHCO₃ (s) + CH₃COOH (aq) → CH₃COONa (aq) + H₂O (l) + CO₂ (g) ↑',
            VN: 'NaHCO₃ (r) + CH₃COOH (dd) → CH₃COONa (dd) + H₂O (l) + CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Carbonate Decarboxylation & Effervescence',
            VN: 'Phản Ứng Axit Tác Dụng Muối Cacbonat Giải Phóng CO₂'
        },
        mechanism: {
            EN: 'Acetic acid transfers a proton to bicarbonate forming carbonic acid (H₂CO₃), which rapidly decomposes into water and escaping Carbon Dioxide gas (CO₂ bubbles).',
            VN: 'Axit axetic (giấm) phản ứng với muối natri bicacbonat tạo axit cacbonic kém bền, phân hủy tức thì thành nước và sủi bọt khí CO₂ mãnh liệt.'
        },
        message: {
            EN: 'Classic Baking Soda & Vinegar Reaction: Vigorous bubbling of Carbon Dioxide (CO₂) gas and formation of Sodium Acetate solution!',
            VN: 'Phản ứng kinh điển Baking Soda & Giấm: Sủi bọt khí CO₂ mãnh liệt và tạo dung dịch muối Natri Axetat!'
        },
        effect: 'bubbles',
        temperatureSpike: -5
    },
    {
        reactants: ['Na2CO3', 'HCl'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'CARBON_DIOXIDE'],
        equation: {
            EN: 'Na₂CO₃ (aq) + 2HCl (aq) → 2NaCl (aq) + H₂O (l) + CO₂ (g) ↑',
            VN: 'Na₂CO₃ (dd) + 2HCl (dd) → 2NaCl (dd) + H₂O (l) + CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Strong Acid-Carbonate Effervescence',
            VN: 'Axit Mạnh Đẩy Axit Yếu Ra Khỏi Muối Cacbonat'
        },
        mechanism: {
            EN: 'HCl displaces weak carbonic acid from carbonate salt, driving intense effervescence of CO₂ gas and yielding neutral sodium chloride solution.',
            VN: 'Axit clohiđric đẩy axit cacbonic ra khỏi muối, sủi bọt khí CO₂ mạnh mẽ và tạo dung dịch nước muối trung tính.'
        },
        message: {
            EN: 'Carbonate Acidification: Hydrochloric Acid reacts with Sodium Carbonate to produce vigorous fizzing of CO₂ and NaCl salt water.',
            VN: 'Axit hóa cacbonat: Axit Clohiđric tác dụng với Soda sinh ra bọt khí CO₂ sủi bọt mạnh và nước muối NaCl.'
        },
        effect: 'bubbles',
        temperatureSpike: 10
    },

    // ==========================================
    // I. ANALYTICAL PRECIPITATIONS (AgCl, BaSO4, Fe(OH)3)
    // ==========================================
    {
        reactants: ['AgNO3', 'NaCl'],
        product: 'AgCl_PRECIPITATE',
        products: ['AgCl_PRECIPITATE'],
        equation: {
            EN: 'AgNO₃ (aq) + NaCl (aq) → AgCl (s) ↓ + NaNO₃ (aq)',
            VN: 'AgNO₃ (dd) + NaCl (dd) → AgCl (r) ↓ + NaNO₃ (dd)'
        },
        reactionType: {
            EN: 'Halide Precipitation Test',
            VN: 'Nhận Biết Ion Clorua Bằng Bạc Nitrat'
        },
        mechanism: {
            EN: 'Ag⁺ and Cl⁻ ions combine to form highly insoluble Silver Chloride (Ksp = 1.8 × 10⁻¹⁰), falling out of solution as an iconic curdy white precipitate.',
            VN: 'Các ion Ag⁺ và Cl⁻ kết hợp tạo thành muối Bạc Clorua không tan, lắng xuống đáy bình dưới dạng kết tủa trắng vón.'
        },
        message: {
            EN: 'Halide Test: Silver Nitrate reacts with Sodium Chloride to form a curdy white precipitate of Silver Chloride (AgCl).',
            VN: 'Nhận biết Cl⁻: Bạc Nitrat tác dụng với muối ăn tạo kết tủa trắng vón Bạc Clorua (AgCl).'
        },
        effect: 'precipitate',
        precipitateColor: '#f8fafc',
        temperatureSpike: 5
    },
    {
        reactants: ['BaCl2', 'H2SO4'],
        product: 'BaSO4_PRECIPITATE',
        products: ['BaSO4_PRECIPITATE', 'HCl'],
        equation: {
            EN: 'BaCl₂ (aq) + H₂SO₄ (aq) → BaSO₄ (s) ↓ + 2HCl (aq)',
            VN: 'BaCl₂ (dd) + H₂SO₄ (dd) → BaSO₄ (r) ↓ + 2HCl (dd)'
        },
        reactionType: {
            EN: 'Sulfate Identification Test',
            VN: 'Nhận Biết Ion Sunfat (SO₄²⁻)'
        },
        mechanism: {
            EN: 'Ba²⁺ cations bind with sulfate anions (SO₄²⁻) to form extremely insoluble Barium Sulfate (Ksp = 1.1 × 10⁻¹⁰), which does not dissolve in any strong acid.',
            VN: 'Ion Ba²⁺ kết hợp với ion sunfat tạo kết tủa Bari Sunfat (BaSO₄) màu trắng đặc trưng, không tan trong bất kỳ dung dịch axit mạnh nào.'
        },
        message: {
            EN: 'Sulfate Test: Barium Chloride precipitates sulfate ions as dense, acid-insoluble white Barium Sulfate (BaSO₄).',
            VN: 'Nhận biết SO₄²⁻: Bari Clorua phản ứng với Axit Sunfuric tạo kết tủa trắng Bari Sunfat (BaSO₄) không tan trong axit.'
        },
        effect: 'precipitate',
        precipitateColor: '#f8fafc',
        temperatureSpike: 15
    },
    {
        reactants: ['FeCl3', 'NaOH'],
        product: 'FeOH3_PRECIPITATE',
        products: ['FeOH3_PRECIPITATE', 'SALT_WATER'],
        equation: {
            EN: 'FeCl₃ (aq) + 3NaOH (aq) → Fe(OH)₃ (s) ↓ + 3NaCl (aq)',
            VN: 'FeCl₃ (dd) + 3NaOH (dd) → Fe(OH)₃ (r) ↓ + 3NaCl (dd)'
        },
        reactionType: {
            EN: 'Transition Metal Hydroxide Precipitation',
            VN: 'Kết Tủa Hydroxit Kim Loại Chuyển Tiếp'
        },
        mechanism: {
            EN: 'Trivalent Fe³⁺ ions form a dense reddish-brown flocculent precipitate of Iron(III) Hydroxide upon hydroxide addition.',
            VN: 'Ion Fe³⁺ kết hợp với ion OH⁻ tạo thành kết tủa màu nâu đỏ đặc trưng của Sắt(III) Hydroxit.'
        },
        message: {
            EN: 'Iron(III) Test: Iron(III) Chloride precipitates with NaOH to yield reddish-brown Iron(III) Hydroxide Fe(OH)₃.',
            VN: 'Nhận biết Fe³⁺: Sắt(III) Clorua tác dụng với kiềm tạo kết tủa màu nâu đỏ Fe(OH)₃.'
        },
        effect: 'precipitate',
        precipitateColor: '#b45309',
        temperatureSpike: 12
    },

    // ==========================================
    // J. INDICATORS & TITRATION (Phenolphthalein)
    // ==========================================
    {
        reactants: ['PHENOLPHTHALEIN', 'NaOH'],
        product: 'PINK_BASE',
        products: ['PINK_BASE'],
        equation: {
            EN: 'H₂Ind (colorless, pH < 8.2) + 2OH⁻ → Ind²⁻ (vivid fuchsia, pH > 8.2) + 2H₂O',
            VN: 'H₂Ind (không màu, pH < 8.2) + 2OH⁻ → Ind²⁻ (hồng cánh sen, pH > 8.2) + 2H₂O'
        },
        reactionType: {
            EN: 'Acid-Base Indicator Chromophore Deprotonation',
            VN: 'Chuyển Màu Chỉ Thị Axit - Bazơ'
        },
        mechanism: {
            EN: 'In alkaline pH > 8.2, hydroxide ions deprotonate the lactone ring of phenolphthalein, opening the ring into a planar conjugated quinoid structure that strongly absorbs green light and transmits vivid fuchsia pink!',
            VN: 'Khi pH > 8.2, các ion OH⁻ tách proton làm mở vòng lacton của phenolphtalein thành hệ liên hợp quinoid phẳng hấp thụ ánh sáng và phát màu hồng cánh sen rực rỡ!'
        },
        message: {
            EN: 'Indicator Activated: Phenolphthalein detects the basic pH of NaOH, instantaneously shifting from colorless to vivid fuchsia pink!',
            VN: 'Chỉ thị đổi màu: Phenolphtalein nhận biết môi trường kiềm của NaOH, ngay lập tức chuyển từ không màu sang màu hồng cánh sen rực rỡ!'
        },
        effect: 'color_shift',
        productColor: '#f43f5e',
        temperatureSpike: 2
    },
    {
        reactants: ['PHENOLPHTHALEIN', 'KOH'],
        product: 'PINK_BASE',
        products: ['PINK_BASE'],
        equation: {
            EN: 'H₂Ind + 2OH⁻ (from KOH) → Ind²⁻ (fuchsia pink) + 2H₂O',
            VN: 'H₂Ind + 2OH⁻ (từ KOH) → Ind²⁻ (hồng cánh sen) + 2H₂O'
        },
        reactionType: {
            EN: 'Indicator Color Shift',
            VN: 'Chuyển Màu Chỉ Thị'
        },
        mechanism: {
            EN: 'Phenolphthalein turns brilliant pink in the presence of strong potassium hydroxide base.',
            VN: 'Phenolphtalein đổi sang màu hồng rực rỡ khi gặp dung dịch bazơ mạnh KOH.'
        },
        message: {
            EN: 'Basic Detection: Phenolphthalein turns brilliant pink with Potassium Hydroxide solution.',
            VN: 'Nhận biết kiềm: Phenolphtalein chuyển sang màu hồng đậm với dung dịch KOH.'
        },
        effect: 'color_shift',
        productColor: '#f43f5e',
        temperatureSpike: 2
    },

    // ==========================================
    // K. DANGEROUS ACID DILUTION
    // ==========================================
    {
        reactants: ['H2SO4', 'DISTILLED_WATER'],
        product: 'HCl',
        products: ['HCl'],
        equation: {
            EN: 'H₂SO₄ (conc) + H₂O (l) → H₃O⁺ + HSO₄⁻ (Extreme Exothermic Flash-Boil!)',
            VN: 'H₂SO₄ (đặc) + H₂O (l) → H₃O⁺ + HSO₄⁻ (Tỏa Nhiệt Sôi Bùng Nổ Nguy Hiểm!)'
        },
        reactionType: {
            EN: 'Extreme Exothermic Hydration Hazard',
            VN: 'Nguy Hiểm Tỏa Nhiệt Sôi Trào Axit'
        },
        mechanism: {
            EN: 'CRITICAL LAB SAFETY RULE: NEVER POUR WATER INTO CONCENTRATED ACID! Water is less dense and sits on top of concentrated H₂SO₄; the intense heat of hydration (ΔH° = -880 kJ/mol) instantly flash-boils the water into steam, violently splashing boiling concentrated acid outwards!',
            VN: 'QUY TẮC AN TOÀN PHÒNG THÍ NGHIỆM SỐ 1: TUYỆT ĐỐI KHÔNG ĐƯỢC ĐỔ NƯỚC VÀO AXIT ĐẶC! Nước nhẹ hơn nổi lên trên, nhiệt hydrat hóa cực lớn (ΔH° = -880 kJ/mol) làm nước sôi bùng tức thì thành hơi nước, bắn tung tóe axit đặc sôi ra xung quanh gây bỏng nặng!'
        },
        message: {
            EN: 'LAB SAFETY VIOLATION: Water poured into concentrated acid causes dangerous flash-boiling and splashing! Always add acid slowly to water!',
            VN: 'CẢNH BÁO NGUY HIỂM: Rót nước vào axit đặc gây sôi bùng dữ dội và bắn axit! Luôn luôn phải rót từ từ axit vào nước!'
        },
        effect: 'explosion',
        temperatureSpike: 110,
        requiresPopup: true,
        orderMatters: true,
        hazardLevel: 'CRITICAL'
    },
    {
        reactants: ['DISTILLED_WATER', 'H2SO4'],
        product: 'HCl',
        products: ['HCl'],
        equation: {
            EN: 'H₂O (bulk) + H₂SO₄ (added slowly) → Dilute H₂SO₄ (Safe Heat Dissipation)',
            VN: 'H₂O (nhiều) + H₂SO₄ (rót từ từ) → Axit Loãng (Tản Nhiệt An Toàn)'
        },
        reactionType: {
            EN: 'Safe Acid Dilution Protocol',
            VN: 'Quy Trình Pha Loãng Axit An Toàn'
        },
        mechanism: {
            EN: 'CORRECT PROTOCOL: Adding concentrated sulfuric acid slowly down the wall of a large volume of water allows the substantial heat capacity of water to safely absorb and dissipate the exothermic energy.',
            VN: 'QUY TRÌNH CHUẨN: Rót từ từ axit sunfuric đặc dọc theo thành cốc vào lượng nước lớn giúp nhiệt dung của nước hấp thụ và tản nhiệt an toàn mà không bị sôi bắn.'
        },
        message: {
            EN: 'Safe Dilution: Acid added to water allows the large volume of water to safely absorb the hydration heat without boiling.',
            VN: 'Pha loãng an toàn: Rót axit vào nước giúp lượng nước lớn hấp thụ nhiệt an toàn, không bị sôi trào.'
        },
        effect: 'bubbles',
        temperatureSpike: 20,
        orderMatters: true
    },

    // ==========================================
    // L. STANDARD NEUTRALIZATIONS
    // ==========================================
    {
        reactants: ['HCl', 'NaOH'],
        product: 'SALT_WATER',
        products: ['SALT_WATER'],
        equation: {
            EN: 'HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l) (ΔH° = -57.1 kJ/mol)',
            VN: 'HCl (dd) + NaOH (dd) → NaCl (dd) + H₂O (l) (ΔH° = -57.1 kJ/mol)'
        },
        reactionType: {
            EN: 'Arrhenius Acid-Base Neutralization',
            VN: 'Phản Ứng Trung Hòa Axit - Bazơ Chuẩn'
        },
        mechanism: {
            EN: 'Hydronium ions (H₃O⁺) and hydroxide ions (OH⁻) combine exothermically to produce neutral water molecules (H₂O) and spectator ions Na⁺ and Cl⁻ with standard enthalpy ΔH° = -57.1 kJ/mol.',
            VN: 'Ion H⁺ của axit kết hợp với ion OH⁻ của bazơ tạo thành phân tử nước trung tính và muối ăn NaCl với nhiệt phản ứng chuẩn ΔH° = -57.1 kJ/mol.'
        },
        message: {
            EN: 'Neutralization Complete: Strong acid HCl and strong base NaOH react to form neutral salt water (NaCl) and pure water.',
            VN: 'Trung hòa hoàn tất: Axit mạnh HCl và bazơ mạnh NaOH phản ứng tạo thành nước muối trung tính NaCl (pH = 7).'
        },
        effect: 'bubbles',
        temperatureSpike: 15
    },
    {
        reactants: ['ACETIC_ACID', 'NaOH'],
        product: 'SODIUM_ACETATE',
        products: ['SODIUM_ACETATE'],
        equation: {
            EN: 'CH₃COOH (aq) + NaOH (aq) → CH₃COONa (aq) + H₂O (l)',
            VN: 'CH₃COOH (dd) + NaOH (dd) → CH₃COONa (dd) + H₂O (l)'
        },
        reactionType: {
            EN: 'Weak Acid - Strong Base Neutralization',
            VN: 'Trung Hòa Axit Yếu - Bazơ Mạnh'
        },
        mechanism: {
            EN: 'Sodium hydroxide deprotonates acetic acid completely, forming Sodium Acetate solution which has a slightly alkaline equivalence point (pH ~ 8.9).',
            VN: 'NaOH trung hòa axit axetic tạo dung dịch muối Natri Axetat có môi trường kiềm nhẹ (pH ~ 8.9).'
        },
        message: {
            EN: 'Neutralization: Acetic Acid reacts with Sodium Hydroxide to form Sodium Acetate (CH₃COONa) solution.',
            VN: 'Phản ứng trung hòa: Axit Axetic tác dụng với NaOH tạo dung dịch muối Natri Axetat (CH₃COONa).'
        },
        effect: 'bubbles',
        temperatureSpike: 12
    },
    {
        reactants: ['MAGNESIUM', 'HCl'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'HYDROGEN_GAS'],
        equation: {
            EN: 'Mg (s) + 2HCl (aq) → MgCl₂ (aq) + H₂ (g) ↑',
            VN: 'Mg (r) + 2HCl (dd) → MgCl₂ (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Active Metal-Acid Single Replacement',
            VN: 'Kim Loại Hoạt Động Tác Dụng Axit Sinh Khí Hydro'
        },
        mechanism: {
            EN: 'Magnesium metal is oxidized by protons, vigorously bubbling hydrogen gas and dissolving into a clear magnesium chloride solution.',
            VN: 'Magie bị oxi hóa bởi axit, sủi bọt khí hydro mạnh mẽ và tan dần tạo dung dịch Magie Clorua không màu.'
        },
        message: {
            EN: 'Metal Dissolution: Magnesium ribbon dissolves rapidly in Hydrochloric Acid with vigorous bubbling of Hydrogen gas (H₂).',
            VN: 'Kim loại tan trong axit: Dải Magie tan nhanh trong Axit Clohiđric và sủi bọt khí Hydro (H₂) cuồn cuộn.'
        },
        effect: 'bubbles',
        temperatureSpike: 25
    },
    {
        reactants: ['NaHCO3', 'HCl'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'CARBON_DIOXIDE'],
        equation: {
            EN: 'NaHCO₃ (s) + HCl (aq) → NaCl (aq) + H₂O (l) + CO₂ (g) ↑',
            VN: 'NaHCO₃ (r) + HCl (dd) → NaCl (dd) + H₂O (l) + CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Carbonate Acidification & Rapid Effervescence',
            VN: 'Axit Clohiđric Tác Dụng Muối Bicacbonat'
        },
        mechanism: {
            EN: 'Strong acid protons decompose sodium bicarbonate into carbonic acid, immediately fizzing and boiling over with escaping Carbon Dioxide gas (CO₂).',
            VN: 'Axit clohiđric phân hủy natri bicacbonat tức thì, giải phóng luồng bọt khí CO₂ sủi bọt cuồn cuộn.'
        },
        message: {
            EN: 'Energetic Fizzing: Sodium Bicarbonate and Hydrochloric Acid rapidly effervesce, liberating bubbling Carbon Dioxide (CO₂) gas!',
            VN: 'Sủi bọt mãnh liệt: Baking Soda và Axit Clohiđric sủi bọt dữ dội, giải phóng luồng khí CO₂!'
        },
        effect: 'fizz',
        temperatureSpike: 10
    },
    {
        reactants: ['NaHCO3', 'H2SO4'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'CARBON_DIOXIDE'],
        equation: {
            EN: '2NaHCO₃ (s) + H₂SO₄ (aq) → Na₂SO₄ (aq) + 2H₂O (l) + 2CO₂ (g) ↑',
            VN: '2NaHCO₃ (r) + H₂SO₄ (dd) → Na₂SO₄ (dd) + 2H₂O (l) + 2CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Bicarbonate-Sulfuric Acid Effervescence',
            VN: 'Sủi Bọt Khí CO₂ Với Axit Sunfuric'
        },
        mechanism: {
            EN: 'Sulfuric acid displaces carbon dioxide from bicarbonate with vigorous foaming and heat release.',
            VN: 'Axit sunfuric đẩy khí CO₂ ra khỏi muối bicacbonat tạo bọt trào mãnh liệt.'
        },
        message: {
            EN: 'Effervescence: Sulfuric Acid reacts violently with Sodium Bicarbonate, generating dense CO₂ foam.',
            VN: 'Sủi bọt mạnh: Axit Sunfuric phản ứng với Baking soda tạo bọt khí CO₂ trào dâng.'
        },
        effect: 'fizz',
        temperatureSpike: 15
    },
    {
        reactants: ['Na2CO3', 'H2SO4'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'CARBON_DIOXIDE'],
        equation: {
            EN: 'Na₂CO₃ (aq) + H₂SO₄ (aq) → Na₂SO₄ (aq) + H₂O (l) + CO₂ (g) ↑',
            VN: 'Na₂CO₃ (dd) + H₂SO₄ (dd) → Na₂SO₄ (dd) + H₂O (l) + CO₂ (k) ↑'
        },
        reactionType: {
            EN: 'Carbonate Neutralization & Gas Evolution',
            VN: 'Axit Sunfuric Tác Dụng Muối Cacbonat'
        },
        mechanism: {
            EN: 'Proton transfer from sulfuric acid produces vigorous CO₂ gas fizzing.',
            VN: 'Axit sunfuric tác dụng với soda giải phóng bọt khí CO₂ sủi bọt mạnh.'
        },
        message: {
            EN: 'Carbonate Acid Fizz: Rapid evolution of Carbon Dioxide gas bubbles.',
            VN: 'Sủi bọt khí: Phản ứng giải phóng khí CO₂ sủi bọt mạnh mẽ.'
        },
        effect: 'fizz',
        temperatureSpike: 15
    },
    {
        reactants: ['NH3_AQ', 'HCl'],
        product: 'SALT_WATER',
        products: ['SALT_WATER'],
        equation: {
            EN: 'NH₃ (g) + HCl (g) → NH₄Cl (s) (Dense White Smoke / Acid-Base Gas Reaction)',
            VN: 'NH₃ (k) + HCl (k) → NH₄Cl (r) (Khói Trắng Đặc Amoni Clorua)'
        },
        reactionType: {
            EN: 'Gas-Phase Acid-Base Smoke Synthesis',
            VN: 'Tạo Khói Trắng Amoni Clorua Kinh Điển'
        },
        mechanism: {
            EN: 'Gaseous ammonia molecules and hydrogen chloride vapors meet above the solution, reacting instantly to form microcrystalline airborne solid Ammonium Chloride (NH₄Cl) particles that appear as iconic dense white smoke!',
            VN: 'Hơi amoniac và hơi axit clohiđric gặp nhau phản ứng tức thì tạo thành các vi tinh thể muối amoni clorua (NH₄Cl) lơ lửng trong không khí tạo thành luồng khói trắng dày đặc đặc trưng!'
        },
        message: {
            EN: 'Classic White Smoke Test: Ammonia and Hydrochloric Acid vapors react to produce dense clouds of white Ammonium Chloride (NH₄Cl) smoke!',
            VN: 'Thí nghiệm khói trắng kinh điển: Hơi Amoniac và Axit Clohiđric tác dụng tạo luồng khói trắng mù mịt của muối Amoni Clorua (NH₄Cl)!'
        },
        effect: 'smoke',
        temperatureSpike: 25,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['COPPER', 'HNO3'],
        product: 'CuSO4',
        products: ['CuSO4'],
        equation: {
            EN: 'Cu (s) + 4HNO₃ (conc) → Cu(NO₃)₂ (aq) + 2NO₂ (g) ↑ + 2H₂O (l) (Reddish-Brown Toxic Gas!)',
            VN: 'Cu (r) + 4HNO₃ (đặc) → Cu(NO₃)₂ (dd) + 2NO₂ (k) ↑ + 2H₂O (l) (Khí Nâu Đỏ Độc Hại!)'
        },
        reactionType: {
            EN: 'Oxidizing Acid Redox & Nitrogen Dioxide Evolution',
            VN: 'Phản Ứng Oxi Hóa Đồng Sinh Khí Nâu Đỏ NO₂'
        },
        mechanism: {
            EN: 'Concentrated nitric acid oxidizes copper metal (Cu⁰ -> Cu²⁺) while reducing nitrate to dense reddish-brown Nitrogen Dioxide gas (NO₂ ↑). Solution shifts to an emerald green/blue.',
            VN: 'Axit nitric đặc oxi hóa đồng kim loại thành dung dịch màu xanh lục và giải phóng luồng khí Nitơ Đioxit (NO₂) màu nâu đỏ độc hại cuồn cuộn!'
        },
        message: {
            EN: 'Toxic Gas Evolution: Nitric Acid dissolves Copper, generating dense reddish-brown Nitrogen Dioxide (NO₂) gas!',
            VN: 'Thoát khí độc: Axit Nitric hòa tan đồng, giải phóng luồng khí NO₂ màu nâu đỏ cuồn cuộn!'
        },
        effect: 'smoke',
        productColor: '#059669',
        temperatureSpike: 45,
        requiresPopup: true,
        hazardLevel: 'WARNING'
    },
    {
        reactants: ['ALUMINUM', 'HCl'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'HYDROGEN_GAS'],
        equation: {
            EN: '2Al (s) + 6HCl (aq) → 2AlCl₃ (aq) + 3H₂ (g) ↑',
            VN: '2Al (r) + 6HCl (dd) → 2AlCl₃ (dd) + 3H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Amphoteric Metal Acid Displacement',
            VN: 'Nhôm Tác Dụng Axit Clohiđric Sinh Khí Hydro'
        },
        mechanism: {
            EN: 'After oxide layer dissolution, aluminum metal reacts vigorously with hydrochloric acid, generating roaring effervescence of hydrogen gas.',
            VN: 'Sau khi lớp màng oxit tan, nhôm phản ứng mãnh liệt với axit clohiđric giải phóng khí hydro sủi bọt mạnh.'
        },
        message: {
            EN: 'Aluminum Dissolution: Aluminum reacts with Hydrochloric Acid, boiling over with Hydrogen gas (H₂) effervescence.',
            VN: 'Nhôm tan trong axit: Nhôm tác dụng với Axit Clohiđric sủi bọt khí Hydro (H₂) dữ dội.'
        },
        effect: 'fizz',
        temperatureSpike: 35
    },
    {
        reactants: ['IRON', 'HCl'],
        product: 'FeCl3',
        products: ['FeCl3', 'HYDROGEN_GAS'],
        equation: {
            EN: 'Fe (s) + 2HCl (aq) → FeCl₂ (aq) + H₂ (g) ↑',
            VN: 'Fe (r) + 2HCl (dd) → FeCl₂ (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Transition Metal Acid Dissolution',
            VN: 'Sắt Tác Dụng Axit Clohiđric'
        },
        mechanism: {
            EN: 'Iron shavings react with HCl to form pale green Iron(II) Chloride and bubbling Hydrogen gas.',
            VN: 'Bột sắt tan trong axit clohiđric tạo dung dịch muối sắt(II) clorua màu xanh nhạt và sủi bọt khí hydro.'
        },
        message: {
            EN: 'Iron Dissolution: Iron reacts with Hydrochloric Acid to yield FeCl₂ and bubbling Hydrogen gas.',
            VN: 'Sắt tan trong axit: Sắt tác dụng với HCl sinh ra FeCl₂ và sủi bọt khí Hydro.'
        },
        effect: 'fizz',
        productColor: '#84cc16',
        temperatureSpike: 15
    },
    {
        reactants: ['ETHANOL', 'SODIUM'],
        product: 'SODIUM_ACETATE',
        products: ['SODIUM_ACETATE', 'HYDROGEN_GAS'],
        equation: {
            EN: '2C₂H₅OH (l) + 2Na (s) → 2C₂H₅ONa (aq) + H₂ (g) ↑',
            VN: '2C₂H₅OH (l) + 2Na (r) → 2C₂H₅ONa (dd) + H₂ (k) ↑'
        },
        reactionType: {
            EN: 'Alcohol Deprotonation & Hydrogen Evolution',
            VN: 'Ancol Tác Dụng Kim Loại Kiềm'
        },
        mechanism: {
            EN: 'Sodium reacts steadily with the hydroxyl proton of ethanol, bubbling hydrogen gas and forming Sodium Ethoxide.',
            VN: 'Natri tác dụng với nguyên tử hydro trong nhóm -OH của rượu etylic, giải phóng khí hydro sủi bọt và tạo muối Natri Etylat.'
        },
        message: {
            EN: 'Alcohol Reactivity: Sodium dissolves in Ethanol, evolving bubbling Hydrogen gas (H₂) and forming Sodium Ethoxide.',
            VN: 'Tính chất ancol: Natri tan trong rượu etylic, sủi bọt khí Hydro (H₂) và tạo Natri Etylat.'
        },
        effect: 'fizz',
        temperatureSpike: 25
    },
    {
        reactants: ['PHENOL', 'FeCl3'],
        product: 'PINK_BASE',
        products: ['PINK_BASE'],
        equation: {
            EN: '6C₆H₅OH + FeCl₃ → H₃[Fe(OC₆H₅)₆] (Deep Violet Complex) + 3HCl',
            VN: '6C₆H₅OH + FeCl₃ → H₃[Fe(OC₆H₅)₆] (Phức Tím Đậm) + 3HCl'
        },
        reactionType: {
            EN: 'Phenol Coordination Complexation Test',
            VN: 'Nhận Biết Phenol Bằng Sắt(III) Clorua'
        },
        mechanism: {
            EN: 'Phenol molecules coordinate with Fe³⁺ ions, forming an iconic, intense royal purple/violet coordination complex. This is the standard analytical test for aromatic phenolic groups.',
            VN: 'Phenol tác dụng với ion Fe³⁺ tạo phức chất màu tím đậm đặc trưng. Đây là phản ứng đặc hiệu để nhận biết phenol.'
        },
        message: {
            EN: 'Phenol Test: Phenol reacts with Iron(III) Chloride, forming an intense royal purple coordination complex!',
            VN: 'Nhận biết Phenol: Phenol phản ứng với FeCl₃ tạo phức chất màu tím đậm đặc trưng!'
        },
        effect: 'color_shift',
        productColor: '#581c87',
        temperatureSpike: 5,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['AgNO3', 'KI'],
        product: 'AgCl_PRECIPITATE',
        products: ['AgCl_PRECIPITATE'],
        equation: {
            EN: 'AgNO₃ (aq) + KI (aq) → AgI (s) ↓ + KNO₃ (aq)',
            VN: 'AgNO₃ (dd) + KI (dd) → AgI (r) ↓ + KNO₃ (dd)'
        },
        reactionType: {
            EN: 'Iodide Halide Precipitation',
            VN: 'Nhận Biết Ion Iodua (I⁻)'
        },
        mechanism: {
            EN: 'Ag⁺ and I⁻ ions precipitate instantly as pale yellow, highly insoluble Silver Iodide (AgI).',
            VN: 'Ion Ag⁺ và I⁻ kết tủa tức thì tạo thành muối Bạc Iodua (AgI) màu vàng nhạt không tan trong axit.'
        },
        message: {
            EN: 'Iodide Test: Silver Nitrate precipitates iodide ions as pale yellow Silver Iodide (AgI).',
            VN: 'Nhận biết I⁻: Bạc Nitrat tác dụng với KI tạo kết tủa màu vàng nhạt Bạc Iodua (AgI).'
        },
        effect: 'precipitate',
        precipitateColor: '#fef08a',
        temperatureSpike: 5
    },
    {
        reactants: ['BaCl2', 'CuSO4'],
        product: 'BaSO4_PRECIPITATE',
        products: ['BaSO4_PRECIPITATE', 'CuSO4'],
        equation: {
            EN: 'BaCl₂ (aq) + CuSO₄ (aq) → BaSO₄ (s) ↓ + CuCl₂ (aq)',
            VN: 'BaCl₂ (dd) + CuSO₄ (dd) → BaSO₄ (r) ↓ + CuCl₂ (dd)'
        },
        reactionType: {
            EN: 'Double Replacement Sulfate Precipitation',
            VN: 'Kết Tủa Bari Sunfat Trong Dung Dịch Muối Đồng'
        },
        mechanism: {
            EN: 'Barium ions precipitate sulfate as dense white BaSO₄ in a brilliant blue copper chloride solution.',
            VN: 'Bari clorua kết tủa ion sunfat tạo BaSO₄ màu trắng mịn lắng trong dung dịch muối đồng màu xanh.'
        },
        message: {
            EN: 'Sulfate Precipitation: BaCl₂ reacts with CuSO₄ to produce insoluble white BaSO₄ precipitate.',
            VN: 'Kết tủa sunfat: BaCl₂ tác dụng với CuSO₄ tạo kết tủa trắng BaSO₄.'
        },
        effect: 'precipitate',
        precipitateColor: '#f8fafc',
        temperatureSpike: 8
    },
    {
        reactants: ['CuSO4', 'NH3_AQ'],
        product: 'COPPER_POLYOL_COMPLEX',
        products: ['COPPER_POLYOL_COMPLEX'],
        equation: {
            EN: 'CuSO₄ + 4NH₃ + 2H₂O → [Cu(NH₃)₄]SO₄ (Deep Blue Tetraamminecopper Complex)',
            VN: 'CuSO₄ + 4NH₃ + 2H₂O → [Cu(NH₃)₄]SO₄ (Phức Đồng-Amoniac Xanh Thẫm)'
        },
        reactionType: {
            EN: 'Tetraamminecopper(II) Chelation',
            VN: 'Phản Ứng Tạo Phức Đồng-Amoniac Xanh Thẫm'
        },
        mechanism: {
            EN: 'Initial Cu(OH)₂ precipitate dissolves in excess aqueous ammonia, forming the deep azure-blue [Cu(NH₃)₄]²⁺ complex ion.',
            VN: 'Kết tủa Cu(OH)₂ ban đầu tan trong dung dịch amoniac dư tạo thành phức chất tetraamin đồng(II) màu xanh thẫm đặc trưng.'
        },
        message: {
            EN: 'Ammine Complex: Ammonia reacts with Copper Sulfate, dissolving into deep azure-blue [Cu(NH₃)₄]²⁺ complex!',
            VN: 'Tạo phức amoniac: Amoniac tác dụng với CuSO₄ tạo dung dịch phức chất màu xanh thẫm rực rỡ!'
        },
        effect: 'color_shift',
        productColor: '#1e40af',
        temperatureSpike: 10
    },
    {
        reactants: ['FeCl3', 'NaOH'],
        product: 'FeOH3_PRECIPITATE',
        products: ['FeOH3_PRECIPITATE', 'SALT_WATER'],
        equation: {
            EN: 'FeCl₃ (aq) + 3NaOH (aq) → Fe(OH)₃ (s) ↓ + 3NaCl (aq)',
            VN: 'FeCl₃ (dd) + 3NaOH (dd) → Fe(OH)₃ (r) ↓ + 3NaCl (dd)'
        },
        reactionType: {
            EN: 'Iron(III) Hydroxide Rust-Brown Precipitation',
            VN: 'Kết Tủa Sắt(III) Hydroxit Nâu Đỏ'
        },
        mechanism: {
            EN: 'Hydroxide ions combine with ferric ions to form dense gelatinous reddish-brown Iron(III) Hydroxide precipitate.',
            VN: 'Ion OH⁻ kết tủa với ion Fe³⁺ tạo thành kết tủa dạng keo màu nâu đỏ của Sắt(III) Hydroxit.'
        },
        message: {
            EN: 'Rust-Brown Precipitation: Iron(III) Chloride reacts with Sodium Hydroxide to form Fe(OH)₃ precipitate.',
            VN: 'Kết tủa nâu đỏ: Sắt(III) Clorua tác dụng với NaOH tạo kết tủa Fe(OH)₃ màu nâu đỏ lắng dần.'
        },
        effect: 'precipitate',
        precipitateColor: '#78350f',
        temperatureSpike: 12
    },
    {
        reactants: ['FeCl3', 'KOH'],
        product: 'FeOH3_PRECIPITATE',
        products: ['FeOH3_PRECIPITATE', 'SALT_WATER'],
        equation: {
            EN: 'FeCl₃ (aq) + 3KOH (aq) → Fe(OH)₃ (s) ↓ + 3KCl (aq)',
            VN: 'FeCl₃ (dd) + 3KOH (dd) → Fe(OH)₃ (r) ↓ + 3KCl (dd)'
        },
        reactionType: {
            EN: 'Iron(III) Precipitation with Potassium Hydroxide',
            VN: 'Tạo Kết Tủa Fe(OH)₃ Bằng KOH'
        },
        mechanism: {
            EN: 'Ferric ions precipitate with potassium hydroxide yielding reddish-brown Fe(OH)₃.',
            VN: 'Dung dịch KOH kết tủa ion sắt(III) tạo Fe(OH)₃ màu nâu đỏ.'
        },
        message: {
            EN: 'Precipitation: FeCl₃ reacts with KOH to form dense brown Fe(OH)₃ precipitate.',
            VN: 'Kết tủa: FeCl₃ tác dụng với KOH tạo kết tủa nâu đỏ Fe(OH)₃.'
        },
        effect: 'precipitate',
        precipitateColor: '#78350f',
        temperatureSpike: 12
    },
    {
        reactants: ['FeOH3_PRECIPITATE', 'HCl'],
        product: 'FeCl3',
        products: ['FeCl3'],
        equation: {
            EN: 'Fe(OH)₃ (s) + 3HCl (aq) → FeCl₃ (aq) + 3H₂O (l)',
            VN: 'Fe(OH)₃ (r) + 3HCl (dd) → FeCl₃ (dd) + 3H₂O (l)'
        },
        reactionType: {
            EN: 'Iron Hydroxide Acid Dissolution',
            VN: 'Axit Clohiđric Hòa Tan Kết Tủa Sắt(III) Hydroxit'
        },
        mechanism: {
            EN: 'Hydrochloric acid dissolves the rust-brown Fe(OH)₃ precipitate back into a clear yellow-brown FeCl₃ solution.',
            VN: 'Axit clohiđric hòa tan hoàn toàn kết tủa nâu đỏ Fe(OH)₃ tạo dung dịch FeCl₃ màu vàng nâu trong suốt.'
        },
        message: {
            EN: 'Precipitate Dissolution: Hydrochloric Acid dissolves Fe(OH)₃ precipitate into clear yellow-brown FeCl₃.',
            VN: 'Hòa tan kết tủa: Axit Clohiđric hòa tan kết tủa Fe(OH)₃ thành dung dịch FeCl₃ màu vàng nâu trong suốt.'
        },
        effect: 'bubbles',
        productColor: '#f59e0b',
        temperatureSpike: 10
    },
    {
        reactants: ['CaOH2', 'Na2CO3'],
        product: 'SALT_WATER',
        products: ['SALT_WATER'],
        equation: {
            EN: 'Ca(OH)₂ (aq) + Na₂CO₃ (aq) → CaCO₃ (s) ↓ + 2NaOH (aq) (Milky White Turbidity)',
            VN: 'Ca(OH)₂ (dd) + Na₂CO₃ (dd) → CaCO₃ (r) ↓ + 2NaOH (dd) (Vẩn Đục Nước Vôi Trong)'
        },
        reactionType: {
            EN: 'Limewater Carbonate Precipitation & Causticization',
            VN: 'Làm Đục Nước Vôi Trong Bằng Soda'
        },
        mechanism: {
            EN: 'Calcium ions react with carbonate ions to precipitate insoluble fine white Calcium Carbonate (CaCO₃), generating caustic sodium hydroxide solution.',
            VN: 'Nước vôi trong Ca(OH)₂ tác dụng với muối cacbonat tạo kết tủa trắng Canxi Cacbonat (CaCO₃) làm vẩn đục dung dịch và sinh ra xút NaOH.'
        },
        message: {
            EN: 'Causticization: Limewater and Sodium Carbonate precipitate chalky white CaCO₃ and generate NaOH.',
            VN: 'Vẩn đục nước vôi: Nước vôi trong tác dụng với Na₂CO₃ tạo kết tủa trắng mịn CaCO₃.'
        },
        effect: 'precipitate',
        precipitateColor: '#ffffff',
        temperatureSpike: 8
    },
    {
        reactants: ['BaCl2', 'Na2CO3'],
        product: 'SALT_WATER',
        products: ['SALT_WATER'],
        equation: {
            EN: 'BaCl₂ (aq) + Na₂CO₃ (aq) → BaCO₃ (s) ↓ + 2NaCl (aq)',
            VN: 'BaCl₂ (dd) + Na₂CO₃ (dd) → BaCO₃ (r) ↓ + 2NaCl (dd)'
        },
        reactionType: {
            EN: 'Barium Carbonate Double Replacement',
            VN: 'Kết Tủa Muối Bari Cacbonat'
        },
        mechanism: {
            EN: 'Barium ions combine with carbonate to form dense insoluble white Barium Carbonate (BaCO₃) precipitate.',
            VN: 'Ion Ba²⁺ kết tủa với ion cacbonat tạo muối Bari Cacbonat (BaCO₃) màu trắng không tan.'
        },
        message: {
            EN: 'Precipitation: BaCl₂ reacts with Na₂CO₃ to precipitate white BaCO₃.',
            VN: 'Kết tủa: BaCl₂ tác dụng với Na₂CO₃ tạo kết tủa trắng BaCO₃.'
        },
        effect: 'precipitate',
        precipitateColor: '#f8fafc',
        temperatureSpike: 6
    },
    {
        reactants: ['ACETALDEHYDE', 'TOLLENS_REAGENT'],
        product: 'SALT_WATER',
        products: ['SALT_WATER'],
        equation: {
            EN: 'CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag (s) ↓ + 3NH₃ + H₂O (Silver Mirror Deposit)',
            VN: 'CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag (r) ↓ + 3NH₃ + H₂O (Tráng Gương Bạc Kim Loại)'
        },
        reactionType: {
            EN: 'Acetaldehyde Tollens Silver Mirror Redox',
            VN: 'Phản Ứng Tráng Bạc Của Anđehit Axetic'
        },
        mechanism: {
            EN: 'Acetaldehyde reduces diamminesilver(I) cations to metallic silver atoms that deposit as a brilliant reflective silver mirror on the glass vessel walls.',
            VN: 'Anđehit axetic khử ion phức bạc tạo lớp bạc kim loại sáng bóng như gương bám chặt vào thành bình thủy tinh.'
        },
        message: {
            EN: 'Silver Mirror Test: Acetaldehyde reduces Tollens Reagent to deposit a shining reflective metallic Silver mirror!',
            VN: 'Phản ứng tráng bạc: Anđehit axetic khử thuốc thử Tollens tạo lớp gương bạc sáng loáng bám trên thành bình!'
        },
        effect: 'precipitate',
        precipitateColor: '#e2e8f0',
        temperatureSpike: 15,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['FORMIC_ACID', 'TOLLENS_REAGENT'],
        product: 'SALT_WATER',
        products: ['SALT_WATER', 'CARBON_DIOXIDE'],
        equation: {
            EN: 'HCOOH + 2[Ag(NH₃)₂]OH → (NH₄)₂CO₃ + 2Ag (s) ↓ + 2NH₃ + H₂O (Formic Acid Silver Mirror)',
            VN: 'HCOOH + 2[Ag(NH₃)₂]OH → (NH₄)₂CO₃ + 2Ag (r) ↓ + 2NH₃ + H₂O (Axit Fomic Tráng Bạc Độc Đáo)'
        },
        reactionType: {
            EN: 'Formic Acid Aldehyde-Like Silver Mirror Oxidation',
            VN: 'Phản Ứng Tráng Bạc Của Axit Fomic'
        },
        mechanism: {
            EN: 'Due to its unique terminal formyl (-CHO) hydrogen, Formic Acid is the only carboxylic acid capable of reducing Tollens reagent to elemental silver while evolving CO₂!',
            VN: 'Do chứa nhóm formyl (-CHO), Axit Fomic là axit cacboxylic duy nhất có khả năng tham gia phản ứng tráng bạc tạo lớp kim loại Ag sáng bóng!'
        },
        message: {
            EN: 'Unique Formic Acid Test: Formic Acid exhibits aldehyde reducing properties to deposit a silver mirror!',
            VN: 'Tính chất đặc biệt: Axit fomic vừa có tính axit vừa có tính anđehit, tham gia phản ứng tráng gương tạo lớp bạc sáng bóng!'
        },
        effect: 'precipitate',
        precipitateColor: '#e2e8f0',
        temperatureSpike: 12,
        requiresPopup: true,
        hazardLevel: 'SAFE'
    },
    {
        reactants: ['FORMIC_ACID', 'NaOH'],
        product: 'SALT_WATER',
        products: ['SALT_WATER'],
        equation: {
            EN: 'HCOOH (aq) + NaOH (aq) → HCOONa (aq) + H₂O (l)',
            VN: 'HCOOH (dd) + NaOH (dd) → HCOONa (dd) + H₂O (l)'
        },
        reactionType: {
            EN: 'Formic Acid Neutralization',
            VN: 'Trung Hòa Axit Fomic'
        },
        mechanism: {
            EN: 'Strong base neutralizes formic acid to form Sodium Formate solution.',
            VN: 'Axit fomic tác dụng với NaOH tạo dung dịch muối Natri Fomiat và nước.'
        },
        message: {
            EN: 'Neutralization: Formic Acid reacts with Sodium Hydroxide to form Sodium Formate (HCOONa).',
            VN: 'Phản ứng trung hòa: Axit fomic tác dụng với NaOH tạo muối Natri Fomiat (HCOONa).'
        },
        effect: 'bubbles',
        temperatureSpike: 14
    },
    {
        reactants: ['PHENOL', 'NaOH'],
        product: 'SALT_WATER',
        products: ['SALT_WATER'],
        equation: {
            EN: 'C₆H₅OH (s) + NaOH (aq) → C₆H₅ONa (aq) + H₂O (l) (Phenol Dissolution in Alkali)',
            VN: 'C₆H₅OH (r) + NaOH (dd) → C₆H₅ONa (dd) + H₂O (l) (Phenol Tan Trong Dung Dịch Kiềm)'
        },
        reactionType: {
            EN: 'Phenol Weak Acidity & Sodium Phenolate Synthesis',
            VN: 'Tính Axit Của Phenol Tác Dụng Kiềm'
        },
        mechanism: {
            EN: 'The benzene ring stabilizes the phenolate anion, allowing phenol to react with sodium hydroxide and dissolve into clear Sodium Phenolate solution.',
            VN: 'Vòng benzen làm tăng độ linh động của nguyên tử H trong nhóm -OH, giúp phenol tác dụng với NaOH và tan thành dung dịch Natri Phenolat trong suốt.'
        },
        message: {
            EN: 'Phenol Acid Property: Insoluble Phenol dissolves in Sodium Hydroxide, forming soluble Sodium Phenolate.',
            VN: 'Tính axit của phenol: Phenol tan trong dung dịch NaOH tạo muối Natri Phenolat tan trong suốt.'
        },
        effect: 'bubbles',
        temperatureSpike: 10
    },
    {
        reactants: ['GLUCOSE', 'KMnO4'],
        product: 'SALT_WATER',
        products: ['SALT_WATER'],
        equation: {
            EN: 'Glucose + KMnO₄ + H₂SO₄ → Gluconic Acid + MnSO₄ (Decolorization of Purple Solution)',
            VN: 'Glucozơ + KMnO₄ + H₂SO₄ → Axit Gluconic + MnSO₄ (Mất Màu Tím Thuốc Tím)'
        },
        reactionType: {
            EN: 'Carbohydrate Permanganate Oxidation & Decolorization',
            VN: 'Glucozơ Khử Dung Dịch Thuốc Tím'
        },
        mechanism: {
            EN: 'Glucose reduces purple permanganate (Mn⁷⁺) ions to colorless manganese(II) (Mn²⁺) ions in acidic solution, demonstrating reducing sugar activity.',
            VN: 'Glucozơ khử ion Pemanganat màu tím thành ion Mangan(II) không màu, chứng minh tính chất khử của đường glucozơ.'
        },
        message: {
            EN: 'Decolorization Test: Glucose reduces purple Potassium Permanganate solution to colorless Mn²⁺.',
            VN: 'Mất màu thuốc tím: Glucozơ khử dung dịch KMnO₄ từ màu tím đậm thành dung dịch không màu.'
        },
        effect: 'color_shift',
        productColor: '#f8fafc',
        temperatureSpike: 12
    }
];
