export type FragmentType = 'alkyl' | 'alkenyl' | 'aromatic' | 'functional' | 'halogen';

export interface OrganicFragment {
  id: string;
  name: string;
  vietnameseName: string;
  formula: string;
  displaySymbol: string;
  type: FragmentType;
  color: string;
  valence: 1 | 2; // 1 = terminal/pendant group, 2 = bridging/chain linker
  hint: string;
}

export interface OrganicPuzzle {
  id: string;
  name: string;
  vietnameseName: string;
  iupacName: string;
  formula: string;
  structuralFormula: string;
  description: string;
  vietnameseDescription: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  slots: number;
  targetSequence: string[]; // array of fragment IDs
  acceptedSequences?: string[][]; // alternative valid orientations (e.g. reversed symmetrical)
  allowedFragments: string[]; // pool of available fragments
  maxAttempts: number;
  trivia: string;
  vietnameseTrivia: string;
  category: 'Alkane' | 'Alkene / Vinyl' | 'Alcohol & Ether' | 'Carbonyl & Acid' | 'Ester' | 'Aromatic';
}

export const ORGANIC_FRAGMENTS: Record<string, OrganicFragment> = {
  methyl: {
    id: 'methyl',
    name: 'Methyl',
    vietnameseName: 'Metyl',
    formula: '—CH₃',
    displaySymbol: 'CH₃',
    type: 'alkyl',
    color: '#06b6d4', // cyan-500
    valence: 1,
    hint: 'Single-carbon saturated alkyl radical'
  },
  ethyl: {
    id: 'ethyl',
    name: 'Ethyl',
    vietnameseName: 'Etyl',
    formula: '—CH₂CH₃',
    displaySymbol: 'C₂H₅',
    type: 'alkyl',
    color: '#0ea5e9', // sky-500
    valence: 1,
    hint: 'Two-carbon saturated alkyl radical'
  },
  propyl: {
    id: 'propyl',
    name: 'Propyl',
    vietnameseName: 'Propyl',
    formula: '—CH₂CH₂CH₃',
    displaySymbol: 'C₃H₇',
    type: 'alkyl',
    color: '#3b82f6', // blue-500
    valence: 1,
    hint: 'Linear three-carbon saturated alkyl radical'
  },
  isopropyl: {
    id: 'isopropyl',
    name: 'Isopropyl',
    vietnameseName: 'Isopropin',
    formula: '—CH(CH₃)₂',
    displaySymbol: 'i-C₃H₇',
    type: 'alkyl',
    color: '#6366f1', // indigo-500
    valence: 1,
    hint: 'Branched secondary three-carbon alkyl group'
  },
  tert_butyl: {
    id: 'tert_butyl',
    name: 'tert-Butyl',
    vietnameseName: 'tert-Butyl',
    formula: '—C(CH₃)₃',
    displaySymbol: 't-C₄H₉',
    type: 'alkyl',
    color: '#8b5cf6', // violet-500
    valence: 1,
    hint: 'Bulky tertiary four-carbon alkyl radical'
  },
  vinyl: {
    id: 'vinyl',
    name: 'Vinyl',
    vietnameseName: 'Vinyl',
    formula: '—CH=CH₂',
    displaySymbol: 'CH=CH₂',
    type: 'alkenyl',
    color: '#a855f7', // purple-500
    valence: 1,
    hint: 'Ethenyl radical with a reactive C=C double bond'
  },
  phenyl: {
    id: 'phenyl',
    name: 'Phenyl',
    vietnameseName: 'Phenyl',
    formula: '—C₆H₅',
    displaySymbol: 'C₆H₅',
    type: 'aromatic',
    color: '#ec4899', // pink-500
    valence: 1,
    hint: 'Aromatic benzene ring substituent'
  },
  hydroxy: {
    id: 'hydroxy',
    name: 'Hydroxy',
    vietnameseName: 'Hiđroxy (Rượu)',
    formula: '—OH',
    displaySymbol: 'OH',
    type: 'functional',
    color: '#f59e0b', // amber-500
    valence: 1,
    hint: 'Alcohol / hydroxyl functional group'
  },
  carboxyl: {
    id: 'carboxyl',
    name: 'Carboxyl',
    vietnameseName: 'Cacboxyl (Axit)',
    formula: '—COOH',
    displaySymbol: 'COOH',
    type: 'functional',
    color: '#ef4444', // red-500
    valence: 1,
    hint: 'Carboxylic acid functional group'
  },
  formyl: {
    id: 'formyl',
    name: 'Formyl',
    vietnameseName: 'Fomyl (Anđehit)',
    formula: '—CHO',
    displaySymbol: 'CHO',
    type: 'functional',
    color: '#eab308', // yellow-500
    valence: 1,
    hint: 'Aldehyde carbonyl functional group'
  },
  ester: {
    id: 'ester',
    name: 'Ester Bridge',
    vietnameseName: 'Cầu este',
    formula: '—COO—',
    displaySymbol: 'COO',
    type: 'functional',
    color: '#10b981', // emerald-500
    valence: 2,
    hint: 'Bivalent ester linkage bridging two organic radicals'
  },
  carbonyl: {
    id: 'carbonyl',
    name: 'Carbonyl',
    vietnameseName: 'Cacbonyl (Xeton)',
    formula: '—C(=O)—',
    displaySymbol: 'C=O',
    type: 'functional',
    color: '#f97316', // orange-500
    valence: 2,
    hint: 'Bivalent ketone carbonyl linker'
  },
  ether: {
    id: 'ether',
    name: 'Ether Link',
    vietnameseName: 'Cầu ete',
    formula: '—O—',
    displaySymbol: '—O—',
    type: 'functional',
    color: '#14b8a6', // teal-500
    valence: 2,
    hint: 'Bivalent oxygen bridge forming an ether'
  },
  chloro: {
    id: 'chloro',
    name: 'Chloro',
    vietnameseName: 'Clo',
    formula: '—Cl',
    displaySymbol: 'Cl',
    type: 'halogen',
    color: '#84cc16', // lime-500
    valence: 1,
    hint: 'Electronegative halogen substituent'
  },
  bromo: {
    id: 'bromo',
    name: 'Bromo',
    vietnameseName: 'Brom',
    formula: '—Br',
    displaySymbol: 'Br',
    type: 'halogen',
    color: '#d97706', // amber-600
    valence: 1,
    hint: 'Dense halogen substituent'
  },
  amino: {
    id: 'amino',
    name: 'Amino',
    vietnameseName: 'Amin',
    formula: '—NH₂',
    displaySymbol: 'NH₂',
    type: 'functional',
    color: '#60a5fa', // blue-400
    valence: 1,
    hint: 'Basic amine functional group'
  }
};

export const ORGANIC_PUZZLES: OrganicPuzzle[] = [
  {
    id: 'propane',
    name: 'Propane',
    vietnameseName: 'Propan',
    iupacName: 'Propane',
    formula: 'C₃H₈',
    structuralFormula: 'CH₃—CH₂CH₃',
    description: 'A clean-burning hydrocarbon gas commonly stored in liquefied petroleum gas (LPG) cylinders for cooking and heating.',
    vietnameseDescription: 'Khí hydrocacbon cháy sạch, là thành phần chủ yếu của khí dầu mỏ hóa lỏng (LPG) dùng cho đun nấu và sưởi ấm.',
    difficulty: 'EASY',
    category: 'Alkane',
    slots: 2,
    targetSequence: ['methyl', 'ethyl'],
    acceptedSequences: [['ethyl', 'methyl']],
    allowedFragments: ['methyl', 'ethyl', 'propyl', 'vinyl', 'hydroxy', 'chloro'],
    maxAttempts: 5,
    trivia: 'Combining a methyl group (1 Carbon) with an ethyl group (2 Carbons) constructs the 3-carbon alkane backbone of propane!',
    vietnameseTrivia: 'Ghép một nhóm metyl (1C) với một nhóm etyl (2C) tạo thành mạch 3 cacbon của ankan propan!'
  },
  {
    id: 'vinyl_chloride',
    name: 'Vinyl Chloride',
    vietnameseName: 'Vinyl clorua',
    iupacName: 'Chloroethene',
    formula: 'C₂H₃Cl',
    structuralFormula: 'CH₂=CH—Cl',
    description: 'The monumental organochloride monomer polymerized into Polyvinyl Chloride (PVC) — one of the world’s most widely produced plastics.',
    vietnameseDescription: 'Monomer halogen quan trọng bậc nhất, được trùng hợp thành Polyvinyl Clorua (nhựa PVC) phổ biến toàn cầu.',
    difficulty: 'EASY',
    category: 'Alkene / Vinyl',
    slots: 2,
    targetSequence: ['vinyl', 'chloro'],
    acceptedSequences: [['chloro', 'vinyl']],
    allowedFragments: ['methyl', 'ethyl', 'vinyl', 'chloro', 'bromo', 'hydroxy'],
    maxAttempts: 5,
    trivia: 'Vinyl is an ethenyl radical (—CH=CH₂). Bonding it directly to Chlorine yields the monomer for modern construction PVC piping!',
    vietnameseTrivia: 'Nhóm vinyl (—CH=CH₂) liên kết trực tiếp với nguyên tử Clo tạo thành monomer của ống nhựa PVC trong xây dựng!'
  },
  {
    id: 'ethanol',
    name: 'Ethanol',
    vietnameseName: 'Etanol (Cồn)',
    iupacName: 'Ethanol',
    formula: 'C₂H₆O',
    structuralFormula: 'CH₃CH₂—OH',
    description: 'The principal type of alcohol found in beverages, hand sanitizers, and bio-fuels produced through glucose fermentation.',
    vietnameseDescription: 'Loại cồn sinh học quen thuộc trong đồ uống lên men, nước sát khuẩn y tế và nhiên liệu sinh học E5.',
    difficulty: 'EASY',
    category: 'Alcohol & Ether',
    slots: 2,
    targetSequence: ['ethyl', 'hydroxy'],
    acceptedSequences: [['hydroxy', 'ethyl']],
    allowedFragments: ['methyl', 'ethyl', 'isopropyl', 'hydroxy', 'formyl', 'carboxyl'],
    maxAttempts: 5,
    trivia: 'Ethanol consists of a two-carbon ethyl hydrocarbon backbone capped by a polar, hydrogen-bonding hydroxy group.',
    vietnameseTrivia: 'Etanol gồm gốc etyl 2 carbon gắn liền với nhóm chức hiđroxy (—OH) phân cực tạo liên kết hiđro!'
  },
  {
    id: 'isopropanol',
    name: 'Isopropanol (Rubbing Alcohol)',
    vietnameseName: 'Rượu Isopropylic',
    iupacName: 'Propan-2-ol',
    formula: 'C₃H₈O',
    structuralFormula: '(CH₃)₂CH—OH',
    description: 'A rapid-evaporating secondary alcohol widely used as a medical antiseptic, lens cleaner, and chemical solvent.',
    vietnameseDescription: 'Rượu bậc hai bay hơi nhanh, được dùng rộng rãi để sát trùng y tế, khử khuẩn vết thương và làm dung môi.',
    difficulty: 'MEDIUM',
    category: 'Alcohol & Ether',
    slots: 2,
    targetSequence: ['isopropyl', 'hydroxy'],
    acceptedSequences: [['hydroxy', 'isopropyl']],
    allowedFragments: ['methyl', 'ethyl', 'propyl', 'isopropyl', 'hydroxy', 'chloro', 'ether'],
    maxAttempts: 5,
    trivia: 'Notice the difference from 1-propanol: here the —OH group is bonded to the branched central carbon of the isopropyl radical!',
    vietnameseTrivia: 'Khác với 1-propanol, ở đây nhóm —OH gắn vào cacbon trung tâm phân nhánh của gốc isopropyl!'
  },
  {
    id: 'acetic_acid',
    name: 'Acetic Acid (Vinegar)',
    vietnameseName: 'Axit Axetic (Giấm ăn)',
    iupacName: 'Ethanoic acid',
    formula: 'C₂H₄O₂',
    structuralFormula: 'CH₃—COOH',
    description: 'The characteristic sour component of vinegar and a foundational building block for synthetic fibers, polymers, and esters.',
    vietnameseDescription: 'Thành phần tạo vị chua đặc trưng của giấm ăn và là tiền chất quan trọng để tổng hợp sợi nhân tạo, este.',
    difficulty: 'EASY',
    category: 'Carbonyl & Acid',
    slots: 2,
    targetSequence: ['methyl', 'carboxyl'],
    acceptedSequences: [['carboxyl', 'methyl']],
    allowedFragments: ['methyl', 'ethyl', 'formyl', 'carboxyl', 'hydroxy', 'ester'],
    maxAttempts: 5,
    trivia: 'A single methyl group attached to a carboxyl group forms ethanoic acid, an organic weak acid that imparts the tang to vinegar.',
    vietnameseTrivia: 'Một nhóm metyl gắn với nhóm chức cacboxyl (—COOH) tạo nên axit axetic, axit hữu cơ tạo nên vị chua của giấm ăn.'
  },
  {
    id: 'acetone',
    name: 'Acetone',
    vietnameseName: 'Axeton',
    iupacName: 'Propan-2-one',
    formula: 'C₃H₆O',
    structuralFormula: 'CH₃—C(=O)—CH₃',
    description: 'The simplest and most important ketone — a volatile, colorless, flammable solvent used in laboratories and cosmetics.',
    vietnameseDescription: 'Xeton đơn giản nhất và quan trọng nhất — dung môi không màu, dễ bay hơi dùng nhiều trong phòng thí nghiệm và tẩy rửa móng.',
    difficulty: 'MEDIUM',
    category: 'Carbonyl & Acid',
    slots: 3,
    targetSequence: ['methyl', 'carbonyl', 'methyl'],
    allowedFragments: ['methyl', 'ethyl', 'carbonyl', 'ester', 'formyl', 'ether'],
    maxAttempts: 5,
    trivia: 'A bivalent carbonyl group (—C=O—) bridging two flanking methyl groups creates the quintessential ketone: acetone!',
    vietnameseTrivia: 'Cầu nối cacbonyl (—C=O—) liên kết hai đầu với hai nhóm metyl tạo nên xeton tiêu biểu: axeton!'
  },
  {
    id: 'ethyl_acetate',
    name: 'Ethyl Acetate',
    vietnameseName: 'Etyl Axetat',
    iupacName: 'Ethyl ethanoate',
    formula: 'C₄H₈O₂',
    structuralFormula: 'CH₃—COO—CH₂CH₃',
    description: 'A delightfully sweet, fruit-scented ester synthesized from acetic acid and ethanol, universally used as a gentle green solvent.',
    vietnameseDescription: 'Este có hương thơm trái cây ngọt ngào được điều chế từ axit axetic và etanol, là dung môi xanh phổ biến.',
    difficulty: 'MEDIUM',
    category: 'Ester',
    slots: 3,
    targetSequence: ['methyl', 'ester', 'ethyl'],
    acceptedSequences: [['ethyl', 'ester', 'methyl']],
    allowedFragments: ['methyl', 'ethyl', 'propyl', 'ester', 'ether', 'carbonyl', 'hydroxy'],
    maxAttempts: 5,
    trivia: 'The Fischer esterification between vinegar (acetic acid) and alcohol (ethanol) forms ethyl acetate through an ester bridge!',
    vietnameseTrivia: 'Phản ứng este hóa giữa axit axetic và rượu etylic tạo ra etyl axetat qua cầu nối este —COO— thơm ngát!'
  },
  {
    id: 'diethyl_ether',
    name: 'Diethyl Ether',
    vietnameseName: 'Đietyl Ete',
    iupacName: 'Ethoxyethane',
    formula: 'C₄H₁₀O',
    structuralFormula: 'CH₃CH₂—O—CH₂CH₃',
    description: 'A legendary sweet-smelling, highly volatile liquid that pioneered modern surgical general anesthesia in the 19th century.',
    vietnameseDescription: 'Hợp chất ete thơm lừng, dễ bay hơi từng làm nên cuộc cách mạng trong phẫu thuật gây mê thế kỷ 19.',
    difficulty: 'MEDIUM',
    category: 'Alcohol & Ether',
    slots: 3,
    targetSequence: ['ethyl', 'ether', 'ethyl'],
    allowedFragments: ['methyl', 'ethyl', 'propyl', 'ether', 'ester', 'hydroxy'],
    maxAttempts: 5,
    trivia: 'Two ethyl groups bridged symmetrically by a bivalent oxygen atom (—O—) produce diethyl ether!',
    vietnameseTrivia: 'Hai nhóm etyl đối xứng liên kết qua một nguyên tử oxy trung gian (—O—) tạo nên đietyl ete!'
  },
  {
    id: 'styrene',
    name: 'Styrene',
    vietnameseName: 'Stiren',
    iupacName: 'Ethenylbenzene',
    formula: 'C₈H₈',
    structuralFormula: 'C₆H₅—CH=CH₂',
    description: 'An aromatic monomer composed of a phenyl ring directly conjugated with a vinyl group, the raw material for Styrofoam.',
    vietnameseDescription: 'Monomer thơm gồm vòng phenyl gắn trực tiếp với gốc vinyl không no, nguyên liệu sản xuất xốp cách nhiệt Polystyrene.',
    difficulty: 'HARD',
    category: 'Alkene / Vinyl',
    slots: 2,
    targetSequence: ['phenyl', 'vinyl'],
    acceptedSequences: [['vinyl', 'phenyl']],
    allowedFragments: ['phenyl', 'vinyl', 'ethyl', 'methyl', 'chloro', 'amino'],
    maxAttempts: 5,
    trivia: 'Styrene marries the resonance stability of a benzene ring (phenyl) with the high polymerization reactivity of vinyl (—CH=CH₂)!',
    vietnameseTrivia: 'Stiren kết hợp độ bền thơm của vòng benzen (phenyl) với khả năng trùng hợp mãnh liệt của gốc vinyl!'
  },
  {
    id: 'aniline',
    name: 'Aniline',
    vietnameseName: 'Anilin',
    iupacName: 'Benzenamine',
    formula: 'C₆H₇N',
    structuralFormula: 'C₆H₅—NH₂',
    description: 'The prototypical primary aromatic amine, serving as the historical precursor to indigo synthetic dyes and pharmaceuticals.',
    vietnameseDescription: 'Amin thơm bậc một kinh điển, mở ra kỷ nguyên ngành công nghiệp thuốc nhuộm tổng hợp và dược phẩm thế giới.',
    difficulty: 'HARD',
    category: 'Aromatic',
    slots: 2,
    targetSequence: ['phenyl', 'amino'],
    acceptedSequences: [['amino', 'phenyl']],
    allowedFragments: ['phenyl', 'amino', 'methyl', 'hydroxy', 'carboxyl', 'chloro'],
    maxAttempts: 5,
    trivia: 'Aniline consists of an amino group (—NH₂) attached to a phenyl ring, causing the nitrogen lone pair to delocalize into the aromatic system.',
    vietnameseTrivia: 'Anilin gồm nhóm amin (—NH₂) gắn vào vòng phenyl, làm đôi electron tự do của Nitơ liên hợp vào vòng thơm!'
  },
  {
    id: 'benzoic_acid',
    name: 'Benzoic Acid',
    vietnameseName: 'Axit Benzoic',
    iupacName: 'Benzenecarboxylic acid',
    formula: 'C₇H₆O₂',
    structuralFormula: 'C₆H₅—COOH',
    description: 'An aromatic carboxylic acid naturally occurring in gum benzoin and widely utilized as a food and beverage preservative (E210).',
    vietnameseDescription: 'Axit cacboxylic thơm có trong nhựa cánh kiến trắng, được ứng dụng phổ biến làm chất bảo quản thực phẩm (E210).',
    difficulty: 'HARD',
    category: 'Aromatic',
    slots: 2,
    targetSequence: ['phenyl', 'carboxyl'],
    acceptedSequences: [['carboxyl', 'phenyl']],
    allowedFragments: ['phenyl', 'carboxyl', 'formyl', 'methyl', 'hydroxy', 'ester'],
    maxAttempts: 5,
    trivia: 'Attaching the carboxyl group (—COOH) to a phenyl ring forms benzoic acid, whose sodium salt is a globally recognized food preservative.',
    vietnameseTrivia: 'Gắn nhóm cacboxyl (—COOH) vào vòng phenyl tạo ra axit benzoic, muối natri benzoat của nó là chất bảo quản thực phẩm quen thuộc.'
  }
];
