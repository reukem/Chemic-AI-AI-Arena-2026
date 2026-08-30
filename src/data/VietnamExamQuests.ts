export interface ExamQuest {
    id: string;
    code: string;
    grade: 10 | 11 | 12;
    title: { VN: string; EN: string };
    curriculumUnit: { VN: string; EN: string };
    description: { VN: string; EN: string };
    requiredReagents: string[];
    targetProduct: string;
    balancedEquation: { VN: string; EN: string };
    hints: { VN: string; EN: string }[];
    competencyScores: {
        stoichiometry: number;
        thermodynamics: number;
        organic: number;
        safety: number;
        inorganic: number;
    };
    experimentSetup: {
        type: 'beaker' | 'flask';
        reagentId: string;
        volume: number;
    }[];
}

export const VIETNAM_EXAM_QUESTS: ExamQuest[] = [
    {
        id: 'quest_saponification',
        code: 'THPT-12-01',
        grade: 12,
        title: {
            VN: 'Thực hành: Thủy phân Este & Xà phòng hóa chất béo',
            EN: 'Practical: Ester Hydrolysis & Fat Saponification'
        },
        curriculumUnit: {
            VN: 'Hóa học 12 // Bài 2: Lipit và Chất giặt rửa tổng hợp',
            EN: 'Grade 12 Chemistry // Lipids & Detergents'
        },
        description: {
            VN: 'Đun nóng chất béo Tristearin với dung dịch kiềm NaOH. Sau phản ứng, thu được muối natri của axit béo (Xà phòng) và Ancol đa chức Glycerol.',
            EN: 'Heat Tristearin fat with aqueous NaOH. Yields sodium carboxylate soap and polyhydric alcohol Glycerol.'
        },
        requiredReagents: ['TRIGLYCERIDE', 'NaOH'],
        targetProduct: 'GLYCEROL',
        balancedEquation: {
            VN: '(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa (Xà phòng) + C₃H₅(OH)₃ (Glycerol)',
            EN: '(C17H35COO)3C3H5 + 3NaOH -> 3C17H35COONa (Soap) + C3H5(OH)3 (Glycerol)'
        },
        hints: [
            {
                VN: 'Gợi ý 1: Chất béo thuộc loại este ba chức của glixerol với axit béo no.',
                EN: 'Hint 1: Triglycerides are tri-esters of glycerol with fatty acids.'
            },
            {
                VN: 'Gợi ý 2: Trộn dung dịch kiềm NaOH vào cốc chứa chất béo và tiến hành đun nóng.',
                EN: 'Hint 2: Mix aqueous NaOH with triglyceride in the vessel.'
            },
            {
                VN: 'Gợi ý 3: Sau phản ứng dung dịch sẽ phân tách lớp xà phòng nổi lên trên.',
                EN: 'Hint 3: Saponified soap layer will separate at the meniscus.'
            }
        ],
        competencyScores: {
            stoichiometry: 20,
            thermodynamics: 15,
            organic: 35,
            safety: 15,
            inorganic: 15
        },
        experimentSetup: [
            { type: 'beaker', reagentId: 'TRIGLYCERIDE', volume: 30 },
            { type: 'flask', reagentId: 'NaOH', volume: 30 }
        ]
    },
    {
        id: 'quest_tollens',
        code: 'THPT-12-02',
        grade: 12,
        title: {
            VN: 'Thực hành: Phản ứng tráng gương với Thuốc thử Tollens',
            EN: 'Practical: Tollens Silver Mirror Reaction'
        },
        curriculumUnit: {
            VN: 'Hóa học 11-12 // Hợp chất Cacbonyl & Cacbohiđrat (Glucozơ)',
            EN: 'Grade 11-12 // Carbonyls & Carbohydrates'
        },
        description: {
            VN: 'Cho Anđehit axetic (hoặc Glucozơ) tác dụng với phức bạc trong amoniac [Ag(NH3)2]OH đun nhẹ để tạo lớp gương bạc sáng loáng trên thành ống nghiệm.',
            EN: 'React Acetaldehyde or Glucose with Tollens ammoniacal silver reagent under mild heating to deposit a silver mirror.'
        },
        requiredReagents: ['ACETALDEHYDE', 'TOLLENS_REAGENT'],
        targetProduct: 'SILVER_MIRROR',
        balancedEquation: {
            VN: 'CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag ↓ + 3NH₃ + H₂O',
            EN: 'CH3CHO + 2[Ag(NH3)2]OH -> CH3COONH4 + 2Ag (s) + 3NH3 + H2O'
        },
        hints: [
            {
                VN: 'Gợi ý 1: Nhóm chức anđehit (-CHO) bị oxi hóa bởi ion Ag⁺ trong môi trường kiềm NH3.',
                EN: 'Hint 1: The formyl group is oxidized by Ag+ in alkaline NH3.'
            },
            {
                VN: 'Gợi ý 2: Phản ứng sinh ra 2 mol Ag kim loại cho mỗi mol anđehit đơn chức.',
                EN: 'Hint 2: Generates 2 moles of metallic Ag per mole of aldehyde.'
            },
            {
                VN: 'Gợi ý 3: Đun cách thủy ở 60-70°C giúp lớp bạc kết tủa mịn và bám chặt.',
                EN: 'Hint 3: Warm gently in a water bath for uniform deposition.'
            }
        ],
        competencyScores: {
            stoichiometry: 25,
            thermodynamics: 10,
            organic: 30,
            safety: 15,
            inorganic: 20
        },
        experimentSetup: [
            { type: 'flask', reagentId: 'TOLLENS_REAGENT', volume: 30 },
            { type: 'beaker', reagentId: 'ACETALDEHYDE', volume: 20 }
        ]
    },
    {
        id: 'quest_polyol',
        code: 'THPT-12-03',
        grade: 12,
        title: {
            VN: 'Thực hành: Nhận biết Ancol đa chức có nhóm OH liền kề',
            EN: 'Practical: Identification of Vicinal Polyols with Cu(OH)2'
        },
        curriculumUnit: {
            VN: 'Hóa học 11-12 // Ancol - Phenol & Phức chất Đồng',
            EN: 'Grade 11-12 // Alcohols, Phenols & Copper Coordination'
        },
        description: {
            VN: 'Tạo kết tủa Cu(OH)2 màu xanh lam từ dung dịch CuSO4 và NaOH, sau đó cho Glycerol vào để hòa tan kết tủa tạo phức chất màu xanh lam thẫm.',
            EN: 'Prepare Cu(OH)2 precipitate from CuSO4 + NaOH, then add Glycerol to dissolve the precipitate into a sapphire blue chelate.'
        },
        requiredReagents: ['GLYCEROL', 'CuSO4', 'NaOH'],
        targetProduct: 'COPPER_GLYCERATE_COMPLEX',
        balancedEquation: {
            VN: '2C₃H₅(OH)₃ + Cu(OH)₂ → [C₃H₅(OH)₂O]₂Cu (Xanh lam thẫm) + 2H₂O',
            EN: '2C3H5(OH)3 + Cu(OH)2 -> [C3H5(OH)2O]2Cu (Sapphire Blue) + 2H2O'
        },
        hints: [
            {
                VN: 'Gợi ý 1: Kết tủa Cu(OH)2 tươi được tạo thành khi nhỏ NaOH vào CuSO4.',
                EN: 'Hint 1: Fresh Cu(OH)2 precipitate forms from NaOH + CuSO4.'
            },
            {
                VN: 'Gợi ý 2: Chỉ các ancol có từ 2 nhóm -OH kề nhau mới hòa tan được Cu(OH)2.',
                EN: 'Hint 2: Only vicinal polyols with adjacent -OH groups dissolve Cu(OH)2.'
            },
            {
                VN: 'Gợi ý 3: Màu dung dịch chuyển từ kết tủa vẩn đục sang dung dịch trong suốt màu xanh lam đậm.',
                EN: 'Hint 3: Solution shifts from turbid precipitate to clear deep blue complex.'
            }
        ],
        competencyScores: {
            stoichiometry: 20,
            thermodynamics: 10,
            organic: 25,
            safety: 15,
            inorganic: 30
        },
        experimentSetup: [
            { type: 'beaker', reagentId: 'CuSO4', volume: 20 },
            { type: 'flask', reagentId: 'NaOH', volume: 20 },
            { type: 'beaker', reagentId: 'GLYCEROL', volume: 20 }
        ]
    },
    {
        id: 'quest_effervescence',
        code: 'THPT-11-04',
        grade: 11,
        title: {
            VN: 'Thực hành: Phản ứng trao đổi ion giải phóng khí CO₂',
            EN: 'Practical: Ion-Exchange Decarboxylation & CO2 Effervescence'
        },
        curriculumUnit: {
            VN: 'Hóa học 11 // Sự điện li & Phản ứng trong dung dịch chất điện li',
            EN: 'Grade 11 // Electrolysis & Ionic Reactions'
        },
        description: {
            VN: 'Cho muối Natri hiđrocacbonat (Baking soda) tác dụng với axit axetic (Giấm ăn). Quan sát hiện tượng sủi bọt khí CO2 mãnh liệt và biến thiên pH.',
            EN: 'React Sodium Bicarbonate with Acetic Acid. Observe vigorous bubbling CO2 effervescence and pH neutralization.'
        },
        requiredReagents: ['NaHCO3', 'ACETIC_ACID'],
        targetProduct: 'CO2_GAS',
        balancedEquation: {
            VN: 'NaHCO₃ (s) + CH₃COOH (aq) → CH₃COONa (aq) + H₂O (l) + CO₂ (g) ↑',
            EN: 'NaHCO3 (s) + CH3COOH (aq) -> CH3COONa (aq) + H2O (l) + CO2 (g) ^'
        },
        hints: [
            {
                VN: 'Gợi ý 1: Axit mạnh hơn (CH3COOH) đẩy axit yếu hơn (H2CO3) ra khỏi muối.',
                EN: 'Hint 1: Stronger acid displaces weaker unstable carbonic acid.'
            },
            {
                VN: 'Gợi ý 2: Axit cacbonic không bền phân hủy ngay thành H2O và bọt khí CO2.',
                EN: 'Hint 2: H2CO3 immediately decomposes into escaping CO2 gas.'
            },
            {
                VN: 'Gợi ý 3: Dung dịch sau phản ứng có tính kiềm nhẹ do ion axetat thủy phân.',
                EN: 'Hint 3: Resulting acetate buffer has near-neutral to slight alkaline pH.'
            }
        ],
        competencyScores: {
            stoichiometry: 25,
            thermodynamics: 20,
            organic: 15,
            safety: 15,
            inorganic: 25
        },
        experimentSetup: [
            { type: 'beaker', reagentId: 'NaHCO3', volume: 30 },
            { type: 'flask', reagentId: 'ACETIC_ACID', volume: 40 }
        ]
    },
    {
        id: 'quest_redox',
        code: 'THPT-10-05',
        grade: 10,
        title: {
            VN: 'Thực hành: Phản ứng Oxi hóa - Khử với Kali Pemanganat',
            EN: 'Practical: Redox Titration & Permanganate Decolorization'
        },
        curriculumUnit: {
            VN: 'Hóa học 10 // Phản ứng Oxi hóa - Khử & Nhóm Halogen/Mangan',
            EN: 'Grade 10 // Redox Reactions & Manganese Chemistry'
        },
        description: {
            VN: 'Nhỏ dung dịch KMnO4 màu tím thẫm vào cốc chứa chất khử trong môi trường axit H2SO4. Dung dịch mất màu tím hoàn toàn do ion MnO4⁻ bị khử về Mn²⁺ không màu.',
            EN: 'Add deep purple KMnO4 into a reducing sugar or iron(II) matrix in acidic H2SO4. Solution decolorizes completely as Mn(VII) is reduced to colorless Mn(II).'
        },
        requiredReagents: ['KMnO4', 'H2SO4', 'GLUCOSE'],
        targetProduct: 'MnSO4_DECOLORIZED',
        balancedEquation: {
            VN: 'MnO₄⁻ (Tím) + 8H⁺ + 5e⁻ → Mn²⁺ (Không màu) + 4H₂O',
            EN: 'MnO4- (Purple) + 8H+ + 5e- -> Mn2+ (Colorless) + 4H2O'
        },
        hints: [
            {
                VN: 'Gợi ý 1: Mangan trong KMnO4 có số oxi hóa cao nhất (+7), thể hiện tính oxi hóa rất mạnh.',
                EN: 'Hint 1: Manganese exhibits +7 oxidation state with strong oxidizing potency.'
            },
            {
                VN: 'Gợi ý 2: Môi trường axit H2SO4 loãng là điều kiện tối ưu để khử Mn(+7) về Mn(+2).',
                EN: 'Hint 2: Dilute H2SO4 facilitates complete reduction to Mn2+.'
            },
            {
                VN: 'Gợi ý 3: Hiện tượng nhận biết phản ứng hoàn thành là sự mất màu tím của thuốc tím.',
                EN: 'Hint 3: The endpoint is visually indicated by complete loss of purple tint.'
            }
        ],
        competencyScores: {
            stoichiometry: 30,
            thermodynamics: 20,
            organic: 10,
            safety: 15,
            inorganic: 25
        },
        experimentSetup: [
            { type: 'flask', reagentId: 'KMnO4', volume: 20 },
            { type: 'beaker', reagentId: 'H2SO4', volume: 20 },
            { type: 'beaker', reagentId: 'GLUCOSE', volume: 25 }
        ]
    }
];
