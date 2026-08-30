export type FragmentCategory = 'alkyl' | 'alkenyl' | 'aromatic' | 'functional' | 'halogen' | 'compound';

export interface OrganicTokenData {
  id: string;
  name: string;
  vietnameseName: string;
  formula: string;
  displaySymbol: string;
  category: FragmentCategory;
  color: string;
  valence: number; // 1 = terminal group, 2 = bridge linker, 0 = complete stable molecule
  isStarter: boolean;
  description: string;
  vietnameseDescription: string;
  iupacName?: string;
  structuralFormula?: string;
  trivia?: string;
  vietnameseTrivia?: string;
  uses?: string;
  vietnameseUses?: string;
}

export interface SynthesisReaction {
  id: string;
  inputs: [string, string]; // two token IDs (order-independent)
  resultId: string; // token ID of created molecule
  byProduct?: string; // e.g. "H₂O" or "HCl"
  reactionType: 'Radical Coupling' | 'Esterification' | 'Substitution' | 'Condensation' | 'Addition';
  vietnameseReactionType: string;
  equation: string;
  lucyCheer: string;
  vietnameseLucyCheer: string;
}

// 1. Foundational Starters (Alkyl radicals, functional groups, aromatics, halogens)
export const STARTER_FRAGMENTS: Record<string, OrganicTokenData> = {
  methyl: {
    id: 'methyl',
    name: 'Methyl',
    vietnameseName: 'Metyl',
    formula: '—CH₃',
    displaySymbol: 'CH₃',
    category: 'alkyl',
    color: '#06b6d4', // cyan-500
    valence: 1,
    isStarter: true,
    description: 'The fundamental 1-carbon saturated alkyl radical.',
    vietnameseDescription: 'Gốc ankyl no 1 cacbon cơ bản nhất.'
  },
  ethyl: {
    id: 'ethyl',
    name: 'Ethyl',
    vietnameseName: 'Etyl',
    formula: '—CH₂CH₃',
    displaySymbol: 'C₂H₅',
    category: 'alkyl',
    color: '#0ea5e9', // sky-500
    valence: 1,
    isStarter: true,
    description: 'Two-carbon saturated alkyl hydrocarbon chain.',
    vietnameseDescription: 'Mạch cacbon ankyl no gồm 2 nguyên tử cacbon.'
  },
  propyl: {
    id: 'propyl',
    name: 'Propyl',
    vietnameseName: 'Propyl',
    formula: '—CH₂CH₂CH₃',
    displaySymbol: 'C₃H₇',
    category: 'alkyl',
    color: '#3b82f6', // blue-500
    valence: 1,
    isStarter: true,
    description: 'Linear three-carbon saturated alkyl chain.',
    vietnameseDescription: 'Mạch ankyl thẳng gồm 3 nguyên tử cacbon.'
  },
  isopropyl: {
    id: 'isopropyl',
    name: 'Isopropyl',
    vietnameseName: 'Isopropin',
    formula: '—CH(CH₃)₂',
    displaySymbol: 'i-C₃H₇',
    category: 'alkyl',
    color: '#6366f1', // indigo-500
    valence: 1,
    isStarter: true,
    description: 'Branched secondary three-carbon alkyl group.',
    vietnameseDescription: 'Gốc ankyl nhánh bậc hai với 3 nguyên tử cacbon.'
  },
  vinyl: {
    id: 'vinyl',
    name: 'Vinyl',
    vietnameseName: 'Vinyl',
    formula: '—CH=CH₂',
    displaySymbol: 'CH=CH₂',
    category: 'alkenyl',
    color: '#a855f7', // purple-500
    valence: 1,
    isStarter: true,
    description: 'Ethenyl radical containing a reactive C=C double bond.',
    vietnameseDescription: 'Gốc không no chứa liên kết đôi C=C rất hoạt động.'
  },
  phenyl: {
    id: 'phenyl',
    name: 'Phenyl',
    vietnameseName: 'Phenyl',
    formula: '—C₆H₅',
    displaySymbol: 'C₆H₅',
    category: 'aromatic',
    color: '#ec4899', // pink-500
    valence: 1,
    isStarter: true,
    description: 'Resonance-stabilized aromatic benzene ring radical.',
    vietnameseDescription: 'Gốc thơm vòng benzen bền vững nhờ hệ liên hợp pi.'
  },
  hydroxy: {
    id: 'hydroxy',
    name: 'Hydroxy',
    vietnameseName: 'Hiđroxy',
    formula: '—OH',
    displaySymbol: 'OH',
    category: 'functional',
    color: '#f59e0b', // amber-500
    valence: 1,
    isStarter: true,
    description: 'Alcohol functional group capable of strong hydrogen bonding.',
    vietnameseDescription: 'Nhóm chức ancol tạo liên kết hiđro liên phân tử mạnh.'
  },
  carboxyl: {
    id: 'carboxyl',
    name: 'Carboxyl',
    vietnameseName: 'Cacboxyl',
    formula: '—COOH',
    displaySymbol: 'COOH',
    category: 'functional',
    color: '#ef4444', // red-500
    valence: 1,
    isStarter: true,
    description: 'Acidic functional group characterizing carboxylic acids.',
    vietnameseDescription: 'Nhóm chức axit đặc trưng cho các axit cacboxylic.'
  },
  formyl: {
    id: 'formyl',
    name: 'Formyl',
    vietnameseName: 'Fomyl',
    formula: '—CHO',
    displaySymbol: 'CHO',
    category: 'functional',
    color: '#eab308', // yellow-500
    valence: 1,
    isStarter: true,
    description: 'Aldehyde terminal carbonyl functional group.',
    vietnameseDescription: 'Nhóm chức anđehit có tính khử mạnh (tráng bạc).'
  },
  amino: {
    id: 'amino',
    name: 'Amino',
    vietnameseName: 'Amin',
    formula: '—NH₂',
    displaySymbol: 'NH₂',
    category: 'functional',
    color: '#38bdf8', // sky-400
    valence: 1,
    isStarter: true,
    description: 'Basic nitrogenous functional group with lone-pair donor ability.',
    vietnameseDescription: 'Nhóm chức mang tính bazơ hữu cơ nhờ cặp electron tự do.'
  },
  nitro: {
    id: 'nitro',
    name: 'Nitro',
    vietnameseName: 'Nitro',
    formula: '—NO₂',
    displaySymbol: 'NO₂',
    category: 'functional',
    color: '#dc2626', // red-600
    valence: 1,
    isStarter: true,
    description: 'Strongly electron-withdrawing nitro group.',
    vietnameseDescription: 'Nhóm nitro hút electron mạnh, tạo hợp chất nổ hoặc phẩm nhuộm.'
  },
  chloro: {
    id: 'chloro',
    name: 'Chloro',
    vietnameseName: 'Clo',
    formula: '—Cl',
    displaySymbol: 'Cl',
    category: 'halogen',
    color: '#84cc16', // lime-500
    valence: 1,
    isStarter: true,
    description: 'Electronegative halogen substituent.',
    vietnameseDescription: 'Nhóm thế halogen âm điện cao.'
  }
};

// 2. Discoverable Real Organic Compounds (Craftable Products)
export const CRAFTABLE_COMPOUNDS: Record<string, OrganicTokenData> = {
  // Alkanes
  ethane: {
    id: 'ethane',
    name: 'Ethane',
    vietnameseName: 'Etan',
    formula: 'C₂H₆',
    displaySymbol: 'CH₃—CH₃',
    category: 'compound',
    color: '#06b6d4',
    valence: 0,
    isStarter: false,
    iupacName: 'Ethane',
    structuralFormula: 'CH₃—CH₃',
    description: 'The simplest two-carbon alkane, a key component of natural gas and petrochemical feedstocks.',
    vietnameseDescription: 'Ankan 2 cacbon đơn giản, thành phần quan trọng trong khí thiên nhiên và hóa dầu.',
    trivia: 'Formed by the coupling of two methyl radicals (Wurtz reaction type)!',
    vietnameseTrivia: 'Tạo thành khi hai gốc metyl ghép đôi với nhau!',
    uses: 'Cracked industrially into ethylene for polyethylene plastic production.',
    vietnameseUses: 'Dùng để cracking nhiệt sản xuất etilen làm nhựa PE.'
  },
  propane: {
    id: 'propane',
    name: 'Propane',
    vietnameseName: 'Propan',
    formula: 'C₃H₈',
    displaySymbol: 'C₃H₈',
    category: 'compound',
    color: '#0ea5e9',
    valence: 0,
    isStarter: false,
    iupacName: 'Propane',
    structuralFormula: 'CH₃—CH₂—CH₃',
    description: 'A clean-burning alkane compressed into liquefied petroleum gas (LPG) cylinders.',
    vietnameseDescription: 'Khí gas hóa lỏng (LPG) cháy sạch dùng đun nấu và sưởi ấm.',
    trivia: 'Coupling a 1-carbon methyl with a 2-carbon ethyl radical builds this 3-carbon chain.',
    vietnameseTrivia: 'Ghép một gốc metyl (1C) với gốc etyl (2C) tạo nên mạch propan 3C.',
    uses: 'LPG cooking gas, heating fuel, and clean automotive propellant.',
    vietnameseUses: 'Bình gas đun nấu LPG, nhiên liệu sưởi và động cơ sạch.'
  },
  butane: {
    id: 'butane',
    name: 'Butane',
    vietnameseName: 'Butan',
    formula: 'C₄H₁₀',
    displaySymbol: 'C₄H₁₀',
    category: 'compound',
    color: '#3b82f6',
    valence: 0,
    isStarter: false,
    iupacName: 'Butane',
    structuralFormula: 'CH₃—CH₂—CH₂—CH₃',
    description: 'Four-carbon straight-chain alkane packaged inside portable camping stoves and cigarette lighters.',
    vietnameseDescription: 'Ankan mạch thẳng 4C nén trong bình gas mini du lịch và bật lửa gas.',
    trivia: 'Formed when two ethyl radicals couple together symmetrically!',
    vietnameseTrivia: 'Hình thành khi hai gốc etyl ghép đôi đối xứng!',
    uses: 'Portable cooking canisters, lighter fuel, and aerosol propellant.',
    vietnameseUses: 'Bình gas mini du lịch, bật lửa, chất đẩy bình xịt.'
  },
  isobutane: {
    id: 'isobutane',
    name: 'Isobutane',
    vietnameseName: 'Isobutan',
    formula: 'C₄H₁₀',
    displaySymbol: 'i-C₄H₁₀',
    category: 'compound',
    color: '#6366f1',
    valence: 0,
    isStarter: false,
    iupacName: '2-Methylpropane',
    structuralFormula: '(CH₃)₂CH—CH₃',
    description: 'Branched structural isomer of butane widely utilized as an eco-friendly domestic refrigerant.',
    vietnameseDescription: 'Đồng phân nhánh của butan, được dùng làm môi chất lạnh R600a bảo vệ tầng ozone.',
    trivia: 'Methyl radical binds to the secondary center of an isopropyl group.',
    vietnameseTrivia: 'Gốc metyl liên kết vào vị trí cacbon trung tâm của gốc isopropyl.',
    uses: 'R600a refrigerant in household refrigerators and organic synthesis.',
    vietnameseUses: 'Khí gas lạnh R600a trong tủ lạnh gia đình.'
  },

  // Alcohols
  methanol: {
    id: 'methanol',
    name: 'Methanol',
    vietnameseName: 'Metanol',
    formula: 'CH₄O',
    displaySymbol: 'CH₃OH',
    category: 'compound',
    color: '#f59e0b',
    valence: 0,
    isStarter: false,
    iupacName: 'Methanol',
    structuralFormula: 'CH₃—OH',
    description: 'The simplest alcohol, historically known as wood alcohol. Highly toxic to ingest.',
    vietnameseDescription: 'Cồn gỗ đơn giản nhất, cực kỳ độc hại với thị giác và gan nếu uống phải.',
    trivia: 'Synthesized by capping a methyl radical directly with a hydroxy functional group.',
    vietnameseTrivia: 'Tổng hợp bằng cách gắn trực tiếp nhóm chức hiđroxy vào gốc metyl.',
    uses: 'Industrial solvent, precursor to formaldehyde, and racing fuel.',
    vietnameseUses: 'Dung môi công nghiệp, tiền chất sản xuất fomanđehit, nhiên liệu xe đua.'
  },
  ethanol: {
    id: 'ethanol',
    name: 'Ethanol',
    vietnameseName: 'Etanol',
    formula: 'C₂H₆O',
    displaySymbol: 'C₂H₅OH',
    category: 'compound',
    color: '#10b981',
    valence: 0,
    isStarter: false,
    iupacName: 'Ethanol',
    structuralFormula: 'CH₃CH₂—OH',
    description: 'Universal grain alcohol found in beverages, surgical disinfectants, and E5 biofuel.',
    vietnameseDescription: 'Cồn y tế sát khuẩn, thành phần đồ uống lên men và xăng sinh học E5.',
    trivia: 'Ethyl radical bonded to hydroxy creates the quintessential drinkable and disinfecting alcohol.',
    vietnameseTrivia: 'Gốc etyl liên kết với nhóm hiđroxy tạo nên phân tử cồn y tế quen thuộc.',
    uses: '70% antiseptic hand sanitizer, green solvent, E5 biofuel blend.',
    vietnameseUses: 'Nước rửa tay sát khuẩn 70 độ, dung môi, pha xăng E5.'
  },
  isopropanol: {
    id: 'isopropanol',
    name: 'Isopropanol (Rubbing Alcohol)',
    vietnameseName: 'Rượu Isopropylic',
    formula: 'C₃H₈O',
    displaySymbol: 'i-C₃H₇OH',
    category: 'compound',
    color: '#14b8a6',
    valence: 0,
    isStarter: false,
    iupacName: 'Propan-2-ol',
    structuralFormula: '(CH₃)₂CH—OH',
    description: 'Secondary alcohol that evaporates rapidly without residue, ideal for electronics and medical clinics.',
    vietnameseDescription: 'Rượu bậc hai bay hơi nhanh không để lại cặn, chuẩn mực cho vệ sinh bo mạch và y tế.',
    trivia: 'The hydroxy group attaches to the branched secondary carbon of the isopropyl radical.',
    vietnameseTrivia: 'Nhóm —OH gắn vào cacbon bậc hai ở giữa gốc isopropyl.',
    uses: 'Rubbing alcohol for first-aid sanitization and lens/PCB cleaning.',
    vietnameseUses: 'Cồn khử trùng y tế, vệ sinh thấu kính quang học và bo mạch điện tử.'
  },
  phenol: {
    id: 'phenol',
    name: 'Phenol',
    vietnameseName: 'Phenol',
    formula: 'C₆H₆O',
    displaySymbol: 'C₆H₅OH',
    category: 'compound',
    color: '#ec4899',
    valence: 0,
    isStarter: false,
    iupacName: 'Phenol',
    structuralFormula: 'C₆H₅—OH',
    description: 'Aromatic alcohol with weak acidic properties due to resonance with the benzene ring.',
    vietnameseDescription: 'Ancol thơm có tính axit yếu do hiệu ứng liên hợp đẩy electron với vòng benzen.',
    trivia: 'Coupling Phenyl with Hydroxy forms carbolic acid, the antiseptic that launched antiseptic surgery.',
    vietnameseTrivia: 'Ghép vòng phenyl với nhóm hiđroxy tạo axit cacbolic, mở đầu kỷ nguyên vô trùng phẫu thuật.',
    uses: 'Precursor to Bakelite resins, aspirin synthesis, and antiseptics.',
    vietnameseUses: 'Sản xuất nhựa Bakelite, tổng hợp thuốc hạ sốt aspirin, chất sát khuẩn.'
  },

  // Halides & Alkenes
  chloromethane: {
    id: 'chloromethane',
    name: 'Chloromethane',
    vietnameseName: 'Clometan',
    formula: 'CH₃Cl',
    displaySymbol: 'CH₃Cl',
    category: 'compound',
    color: '#84cc16',
    valence: 0,
    isStarter: false,
    iupacName: 'Chloromethane',
    structuralFormula: 'CH₃—Cl',
    description: 'Electrophilic methylating agent used in chemical synthesis.',
    vietnameseDescription: 'Tác nhân metyl hóa electrophile dùng nhiều trong tổng hợp hữu cơ.',
    trivia: 'Single bond connecting methyl radical and chlorine atom.',
    vietnameseTrivia: 'Liên kết đơn giữa gốc metyl và nguyên tử Clo.',
    uses: 'Silicon polymer manufacturing and chemical methylation.',
    vietnameseUses: 'Sản xuất polyme silicon và phản ứng metyl hóa.'
  },
  chloroethane: {
    id: 'chloroethane',
    name: 'Chloroethane',
    vietnameseName: 'Cloetan',
    formula: 'C₂H₅Cl',
    displaySymbol: 'C₂H₅Cl',
    category: 'compound',
    color: '#a3e635',
    valence: 0,
    isStarter: false,
    iupacName: 'Chloroethane',
    structuralFormula: 'CH₃CH₂—Cl',
    description: 'Volatile liquid that rapidly cools and numbs skin upon contact, used as a topical sports anesthetic.',
    vietnameseDescription: 'Chất lỏng bay hơi nhanh làm lạnh tê buốt da tức thì, xịt giảm đau chấn thương thể thao.',
    trivia: 'Ethyl radical bonded to chlorine atom.',
    vietnameseTrivia: 'Gốc etyl kết hợp với Clo.',
    uses: 'Topical spray anesthetic for athletic injuries.',
    vietnameseUses: 'Bình xịt lạnh giảm đau chấn thương thể thao tức thời.'
  },
  vinyl_chloride: {
    id: 'vinyl_chloride',
    name: 'Vinyl Chloride',
    vietnameseName: 'Vinyl Clorua',
    formula: 'C₂H₃Cl',
    displaySymbol: 'CH₂=CH—Cl',
    category: 'compound',
    color: '#a855f7',
    valence: 0,
    isStarter: false,
    iupacName: 'Chloroethene',
    structuralFormula: 'CH₂=CH—Cl',
    description: 'The monumental monomer that undergoes addition polymerization to create PVC plastic.',
    vietnameseDescription: 'Monomer kinh điển trùng hợp thành nhựa Polyvinyl Clorua (nhựa PVC).',
    trivia: 'Vinyl group conjugated with electronegative chlorine.',
    vietnameseTrivia: 'Gốc vinyl không no gắn với Clo tạo ra monomer nhựa PVC.',
    uses: 'Polymerized into rigid PVC pipes, window frames, and credit cards.',
    vietnameseUses: 'Trùng hợp thành ống nước PVC, khung cửa nhựa và thẻ căn cước.'
  },
  chlorobenzene: {
    id: 'chlorobenzene',
    name: 'Chlorobenzene',
    vietnameseName: 'Clobenzen',
    formula: 'C₆H₅Cl',
    displaySymbol: 'C₆H₅Cl',
    category: 'compound',
    color: '#d946ef',
    valence: 0,
    isStarter: false,
    iupacName: 'Chlorobenzene',
    structuralFormula: 'C₆H₅—Cl',
    description: 'Aromatic halide serving as a solvent and intermediate in pesticide and dye manufacture.',
    vietnameseDescription: 'Halogen thơm dùng làm dung môi và chất trung gian sản xuất thuốc bảo vệ thực vật.',
    trivia: 'Chlorine atom bonded to aromatic phenyl ring.',
    vietnameseTrivia: 'Nguyên tử Clo liên kết trực tiếp với vòng benzen thơm.',
    uses: 'High-boiling solvent, precursor to diphenyl ether and dyes.',
    vietnameseUses: 'Dung môi điểm sôi cao, tổng hợp điphenyl ete và chất nhuộm.'
  },

  // Carbonyls & Acids
  formaldehyde: {
    id: 'formaldehyde',
    name: 'Formaldehyde',
    vietnameseName: 'Fomanđehit (Focmon)',
    formula: 'CH₂O',
    displaySymbol: 'HCHO',
    category: 'compound',
    color: '#eab308',
    valence: 0,
    isStarter: false,
    iupacName: 'Methanal',
    structuralFormula: 'H—CHO',
    description: 'Pungent aldehyde gas dissolved in water as formalin for biological specimen preservation.',
    vietnameseDescription: 'Khí anđehit mùi cay hắc, dung dịch nước 37% gọi là focmon để ngâm bảo quản mẫu sinh học.',
    trivia: 'The simplest possible aldehyde molecule!',
    vietnameseTrivia: 'Phân tử anđehit đơn giản nhất trong tự nhiên!',
    uses: 'Biological specimen preservation, urea-formaldehyde adhesives.',
    vietnameseUses: 'Dung dịch focmon ngâm tiêu bản giải phẫu, keo dán gỗ ép.'
  },
  acetaldehyde: {
    id: 'acetaldehyde',
    name: 'Acetaldehyde',
    vietnameseName: 'Axetanđehit',
    formula: 'C₂H₄O',
    displaySymbol: 'CH₃CHO',
    category: 'compound',
    color: '#ca8a04',
    valence: 0,
    isStarter: false,
    iupacName: 'Ethanal',
    structuralFormula: 'CH₃—CHO',
    description: 'Pungent aldehyde formed naturally in liver alcohol metabolism (causes hangover symptoms).',
    vietnameseDescription: 'Sản phẩm chuyển hóa trung gian của rượu trong gan, gây triệu chứng say nguội và đỏ mặt.',
    trivia: 'Methyl radical bonded to formyl group.',
    vietnameseTrivia: 'Gốc metyl kết hợp với nhóm fomyl tạo anđehit axetic.',
    uses: 'Silver mirror test (Tollens reagent), acetic acid precursor.',
    vietnameseUses: 'Phản ứng tráng gương, sản xuất axit axetic và dược phẩm.'
  },
  benzaldehyde: {
    id: 'benzaldehyde',
    name: 'Benzaldehyde',
    vietnameseName: 'Benzenđehit',
    formula: 'C₇H₆O',
    displaySymbol: 'C₆H₅CHO',
    category: 'compound',
    color: '#f97316',
    valence: 0,
    isStarter: false,
    iupacName: 'Benzaldehyde',
    structuralFormula: 'C₆H₅—CHO',
    description: 'Aromatic aldehyde providing the signature sweet aroma of bitter almonds and marzipan.',
    vietnameseDescription: 'Anđehit thơm tạo nên hương hạnh nhân ngọt ngào đặc trưng trong bánh kẹo.',
    trivia: 'Formyl group attached directly to an aromatic phenyl ring.',
    vietnameseTrivia: 'Nhóm fomyl gắn trực tiếp vào vòng benzen thơm tạo hương hạnh nhân.',
    uses: 'Almond flavoring, perfumery, cosmetic fragrance.',
    vietnameseUses: 'Hương liệu thực phẩm vị hạnh nhân, nước hoa cao cấp.'
  },
  acetic_acid: {
    id: 'acetic_acid',
    name: 'Acetic Acid (Vinegar)',
    vietnameseName: 'Axit Axetic (Giấm)',
    formula: 'C₂H₄O₂',
    displaySymbol: 'CH₃COOH',
    category: 'compound',
    color: '#ef4444',
    valence: 0,
    isStarter: false,
    iupacName: 'Ethanoic acid',
    structuralFormula: 'CH₃—COOH',
    description: 'The sharp acidic compound in kitchen vinegar and crucial precursor for synthetic polymers.',
    vietnameseDescription: 'Axit hữu cơ tạo nên vị chua của giấm ăn và nguyên liệu tổng hợp tơ este nhân tạo.',
    trivia: 'Formed by plugging methyl into carboxyl.',
    vietnameseTrivia: 'Ghép gốc metyl vào nhóm cacboxyl tạo nên axit axetic.',
    uses: 'Culinary vinegar (4-8%), vinyl acetate monomer, cellulose acetate fibers.',
    vietnameseUses: 'Giấm ăn, sản xuất tơ visco và tơ axetat nhân tạo.'
  },
  benzoic_acid: {
    id: 'benzoic_acid',
    name: 'Benzoic Acid',
    vietnameseName: 'Axit Benzoic',
    formula: 'C₇H₆O₂',
    displaySymbol: 'C₆H₅COOH',
    category: 'compound',
    color: '#b91c1c',
    valence: 0,
    isStarter: false,
    iupacName: 'Benzenecarboxylic acid',
    structuralFormula: 'C₆H₅—COOH',
    description: 'White crystalline aromatic acid whose sodium salt (sodium benzoate) preserves soft drinks and sauces.',
    vietnameseDescription: 'Axit thơm tinh thể trắng, muối natri benzoat bảo quản nước giải khát và tương ớt.',
    trivia: 'Phenyl ring capped by carboxyl group.',
    vietnameseTrivia: 'Vòng phenyl liên kết với nhóm cacboxyl tạo axit benzoic.',
    uses: 'Food preservative (E210/E211), antifungal ointment.',
    vietnameseUses: 'Chất bảo quản thực phẩm chống nấm mốc (E210/E211).'
  },

  // Amines & Aromatics
  methylamine: {
    id: 'methylamine',
    name: 'Methylamine',
    vietnameseName: 'Metylamin',
    formula: 'CH₅N',
    displaySymbol: 'CH₃NH₂',
    category: 'compound',
    color: '#38bdf8',
    valence: 0,
    isStarter: false,
    iupacName: 'Methanamine',
    structuralFormula: 'CH₃—NH₂',
    description: 'Pungent fishy-smelling gas acting as a strong organic base, precursor to pharmaceuticals.',
    vietnameseDescription: 'Khí mùi khai tanh cá mang tính bazơ mạnh, nguyên liệu tổng hợp dược phẩm.',
    trivia: 'Methyl radical bonded to basic amino group.',
    vietnameseTrivia: 'Gốc metyl gắn với nhóm amin mang tính bazơ.',
    uses: 'Pharmaceuticals, agricultural pesticides, surfactant synthesis.',
    vietnameseUses: 'Sản xuất dược phẩm, thuốc bảo vệ thực vật, chất hoạt động bề mặt.'
  },
  ethylamine: {
    id: 'ethylamine',
    name: 'Ethylamine',
    vietnameseName: 'Etylamin',
    formula: 'C₂H₇N',
    displaySymbol: 'C₂H₅NH₂',
    category: 'compound',
    color: '#0284c7',
    valence: 0,
    isStarter: false,
    iupacName: 'Ethanamine',
    structuralFormula: 'CH₃CH₂—NH₂',
    description: 'Two-carbon primary aliphatic amine with strong ammonia-like odor.',
    vietnameseDescription: 'Amin bậc một mạch hở có mùi khai tương tự amoniac, tan vô hạn trong nước.',
    trivia: 'Ethyl radical bonded to amino group.',
    vietnameseTrivia: 'Gốc etyl kết hợp với nhóm chức amin.',
    uses: 'Herbicides, rubber vulcanization accelerator.',
    vietnameseUses: 'Sản xuất thuốc diệt cỏ, chất xúc tác lưu hóa cao su.'
  },
  aniline: {
    id: 'aniline',
    name: 'Aniline',
    vietnameseName: 'Anilin',
    formula: 'C₆H₇N',
    displaySymbol: 'C₆H₅NH₂',
    category: 'compound',
    color: '#6366f1',
    valence: 0,
    isStarter: false,
    iupacName: 'Benzenamine',
    structuralFormula: 'C₆H₅—NH₂',
    description: 'The foundation of the modern synthetic dye and pharmaceutical industry, yielding deep mauve and indigo colors.',
    vietnameseDescription: 'Chất mở đầu kỷ nguyên ngành nhuộm nhân tạo và thuốc nhuộm chàm, paracetamol.',
    trivia: 'Amino nitrogen lone-pair delocalizes into the aromatic phenyl ring, weakening its basicity.',
    vietnameseTrivia: 'Đôi electron tự do của Nitơ liên hợp vào vòng benzen làm giảm tính bazơ.',
    uses: 'Polyurethane precursors, azo dyes, paracetamol / acetaminophen.',
    vietnameseUses: 'Sản xuất thuốc nhuộm azo, nhựa xốp polyurethane, thuốc hạ sốt Paracetamol.'
  },
  toluene: {
    id: 'toluene',
    name: 'Toluene',
    vietnameseName: 'Toluen',
    formula: 'C₇H₈',
    displaySymbol: 'C₆H₅CH₃',
    category: 'compound',
    color: '#8b5cf6',
    valence: 0,
    isStarter: false,
    iupacName: 'Methylbenzene',
    structuralFormula: 'C₆H₅—CH₃',
    description: 'Aromatic hydrocarbon solvent with sweet model-glue smell, precursor to polyurethane and TNT.',
    vietnameseDescription: 'Hiđrocacbon thơm mùi sơn keo đặc trưng, dung môi pha sơn và nguyên liệu sản xuất TNT.',
    trivia: 'Methyl radical substituting a hydrogen on the phenyl ring.',
    vietnameseTrivia: 'Gốc metyl liên kết vào vòng phenyl tạo nên toluen.',
    uses: 'Paint thinner, aviation fuel additive, TNT precursor.',
    vietnameseUses: 'Dung môi pha sơn, tăng chỉ số octan cho xăng máy bay, thuốc nổ TNT.'
  },
  styrene: {
    id: 'styrene',
    name: 'Styrene',
    vietnameseName: 'Stiren',
    formula: 'C₈H₈',
    displaySymbol: 'C₆H₅CH=CH₂',
    category: 'compound',
    color: '#a855f7',
    valence: 0,
    isStarter: false,
    iupacName: 'Ethenylbenzene',
    structuralFormula: 'C₆H₅—CH=CH₂',
    description: 'Conjugated aromatic alkene polymerized into expanded polystyrene (Styrofoam cups and packing).',
    vietnameseDescription: 'Alkene thơm liên hợp được trùng hợp thành xốp Polystyrene (hộp xốp, bao bì đệm).',
    trivia: 'Coupling of phenyl ring with reactive vinyl radical.',
    vietnameseTrivia: 'Ghép vòng phenyl với gốc vinyl tạo stiren có khả năng trùng hợp cực mạnh.',
    uses: 'Polystyrene plastics, fiberglass resins, synthetic rubber (SBR).',
    vietnameseUses: 'Sản xuất xốp cách nhiệt, cao su nhân tạo Buna-S, nhựa composite.'
  },
  nitrobenzene: {
    id: 'nitrobenzene',
    name: 'Nitrobenzene',
    vietnameseName: 'Nitrobenzen',
    formula: 'C₆H₅NO₂',
    displaySymbol: 'C₆H₅NO₂',
    category: 'compound',
    color: '#dc2626',
    valence: 0,
    isStarter: false,
    iupacName: 'Nitrobenzene',
    structuralFormula: 'C₆H₅—NO₂',
    description: 'Oily pale yellow liquid with an intense almond scent, reduced industrially to yield aniline.',
    vietnameseDescription: 'Chất lỏng màu vàng nhạt sánh như dầu, mùi hạnh nhân, khử thành anilin trong công nghiệp.',
    trivia: 'Electrophilic substitution placing nitro group onto phenyl ring.',
    vietnameseTrivia: 'Gốc nitro gắn vào vòng phenyl tạo nitrobenzen.',
    uses: 'Aniline manufacturing intermediate, lubricating oil refining.',
    vietnameseUses: 'Nguyên liệu sản xuất anilin, lọc dầu bôi trơn máy móc.'
  },

  // Multi-tier Synthesized Compounds (Infinite Craft Level)
  ethyl_acetate: {
    id: 'ethyl_acetate',
    name: 'Ethyl Acetate',
    vietnameseName: 'Etyl Axetat',
    formula: 'C₄H₈O₂',
    displaySymbol: 'CH₃COOC₂H₅',
    category: 'compound',
    color: '#10b981',
    valence: 0,
    isStarter: false,
    iupacName: 'Ethyl ethanoate',
    structuralFormula: 'CH₃—COO—CH₂CH₃',
    description: 'Sweet, pleasant fruit-scented ester synthesized from vinegar and ethanol; common green solvent.',
    vietnameseDescription: 'Este mùi chuối chín ngọt ngào tổng hợp từ giấm và cồn, dung môi tẩy sơn móng tay.',
    trivia: 'Classic Fischer esterification between Acetic Acid and Ethanol!',
    vietnameseTrivia: 'Phản ứng este hóa Fischer kinh điển giữa Axit Axetic và Etanol giải phóng nước!',
    uses: 'Non-acetone nail polish remover, decaffeinating coffee, fruit flavoring.',
    vietnameseUses: 'Nước tẩy móng tay thơm dịu, khử cafein trong hạt cà phê, hương liệu thực phẩm.'
  },
  methyl_acetate: {
    id: 'methyl_acetate',
    name: 'Methyl Acetate',
    vietnameseName: 'Metyl Axetat',
    formula: 'C₃H₆O₂',
    displaySymbol: 'CH₃COOCH₃',
    category: 'compound',
    color: '#059669',
    valence: 0,
    isStarter: false,
    iupacName: 'Methyl ethanoate',
    structuralFormula: 'CH₃—COO—CH₃',
    description: 'Volatile fruity ester with quick evaporation rate, used in adhesives and fast-drying lacquers.',
    vietnameseDescription: 'Este mùi quả táo bay hơi nhanh, dùng trong keo dán siêu dính và sơn khô nhanh.',
    trivia: 'Synthesized from Acetic Acid and Methanol!',
    vietnameseTrivia: 'Este tạo ra từ Axit Axetic kết hợp Metanol!',
    uses: 'Fast-evaporating solvent in perfumes, paints, and nail polish.',
    vietnameseUses: 'Dung môi trong nước hoa cao cấp, sơn xịt và keo dán.'
  },
  aspirin: {
    id: 'aspirin',
    name: 'Aspirin',
    vietnameseName: 'Aspirin (Thuốc giảm đau)',
    formula: 'C₉H₈O₄',
    displaySymbol: 'Aspirin',
    category: 'compound',
    color: '#ef4444',
    valence: 0,
    isStarter: false,
    iupacName: '2-Acetoxybenzoic acid',
    structuralFormula: 'C₆H₄(OCOCH₃)COOH',
    description: 'One of the most famous medications in human history, relieving pain, inflammation, and preventing blood clots.',
    vietnameseDescription: 'Loại thuốc hạ sốt, giảm đau và chống đông máu kinh điển hàng đầu trong lịch sử y học.',
    trivia: 'Synthesized by esterifying Phenol/Benzoic derivatives with Acetic Acid!',
    vietnameseTrivia: 'Được tổng hợp từ dẫn xuất phenol và axit axetic, cứu sống hàng triệu bệnh nhân tim mạch!',
    uses: 'Analgesic pain relief, antipyretic fever reducer, daily antiplatelet therapy.',
    vietnameseUses: 'Giảm đau, hạ sốt, chống viêm và phòng ngừa nhồi máu cơ tim.'
  },
  tnt: {
    id: 'tnt',
    name: 'TNT (Trinitrotoluene)',
    vietnameseName: 'Thuốc nổ TNT',
    formula: 'C₇H₅N₃O₆',
    displaySymbol: 'TNT',
    category: 'compound',
    color: '#dc2626',
    valence: 0,
    isStarter: false,
    iupacName: '2,4,6-Trinitrotoluene',
    structuralFormula: 'C₆H₂(NO₂)₃CH₃',
    description: 'Insensitive yellow explosive used universally as the benchmark standard for explosive energy.',
    vietnameseDescription: 'Thuốc nổ quân dụng và mỏ đá nổi tiếng, được dùng làm đơn vị chuẩn đo lường sức công phá.',
    trivia: 'Formed by triple nitration of Toluene with Nitro groups!',
    vietnameseTrivia: 'Được tạo ra khi nitơ hóa Toluen bằng các nhóm Nitro!',
    uses: 'Mining quarry blasting, military demolition standard.',
    vietnameseUses: 'Khai thác mỏ đá, công binh phá dỡ, thước đo năng lượng nổ (tấn TNT).'
  }
};

// 3. Complete Reaction Matrix (100% Real Organic Reactions)
export const SYNTHESIS_REACTIONS: SynthesisReaction[] = [
  // --- Radical + Radical / Radical + Functional Combinations ---
  {
    id: 'r_ethane',
    inputs: ['methyl', 'methyl'],
    resultId: 'ethane',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Ghép đôi gốc tự do',
    equation: 'CH₃• + •CH₃ ➔ CH₃—CH₃',
    lucyCheer: 'Two methyl radicals coupled together! You forged Ethane, a foundational alkane!',
    vietnameseLucyCheer: 'Hai gốc metyl đã ghép đôi hoàn hảo! Em đã tạo ra Etan, ankan cơ bản!'
  },
  {
    id: 'r_propane',
    inputs: ['methyl', 'ethyl'],
    resultId: 'propane',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Ghép đôi gốc tự do',
    equation: 'CH₃• + •CH₂CH₃ ➔ CH₃CH₂CH₃',
    lucyCheer: '1 Carbon + 2 Carbons = Propane! Perfect LPG fuel for household cooking!',
    vietnameseLucyCheer: '1 carbon + 2 carbon = Propan! Khí đốt sạch trong bình gas sinh hoạt!'
  },
  {
    id: 'r_butane',
    inputs: ['ethyl', 'ethyl'],
    resultId: 'butane',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Ghép đôi gốc tự do',
    equation: 'C₂H₅• + •C₂H₅ ➔ C₄H₁₀',
    lucyCheer: 'Two ethyls combined symmetrically into Butane, the fuel in camping canisters!',
    vietnameseLucyCheer: 'Hai gốc etyl đối xứng ghép thành Butan, khí gas trong bình du lịch!'
  },
  {
    id: 'r_isobutane',
    inputs: ['methyl', 'isopropyl'],
    resultId: 'isobutane',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Ghép đôi nhánh',
    equation: 'CH₃• + •CH(CH₃)₂ ➔ (CH₃)₂CH—CH₃',
    lucyCheer: 'Branched alkane created! Isobutane is the eco-friendly coolant in modern refrigerators!',
    vietnameseLucyCheer: 'Tạo ankan có nhánh thành công! Isobutan chính là gas lạnh xanh R600a trong tủ lạnh!'
  },
  {
    id: 'r_methanol',
    inputs: ['methyl', 'hydroxy'],
    resultId: 'methanol',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Cố định nhóm chức',
    equation: 'CH₃• + •OH ➔ CH₃OH',
    lucyCheer: 'Methyl + Hydroxy = Methanol! Be careful, wood alcohol is toxic to drink!',
    vietnameseLucyCheer: 'Metyl + Hiđroxy = Metanol! Chú ý nhé, cồn gỗ này cực độc không được uống đâu!'
  },
  {
    id: 'r_ethanol',
    inputs: ['ethyl', 'hydroxy'],
    resultId: 'ethanol',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Cố định nhóm chức',
    equation: 'C₂H₅• + •OH ➔ C₂H₅OH',
    lucyCheer: 'Hooray, Ethanol! The world\'s favorite surgical disinfectant and biofuel!',
    vietnameseLucyCheer: 'Tuyệt vời, Etanol! Cồn y tế sát khuẩn và nhiên liệu sinh học số một thế giới!'
  },
  {
    id: 'r_isopropanol',
    inputs: ['isopropyl', 'hydroxy'],
    resultId: 'isopropanol',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Cố định nhóm chức',
    equation: '(CH₃)₂CH• + •OH ➔ (CH₃)₂CHOH',
    lucyCheer: 'Isopropanol synthesized! That quick-evaporating medical rubbing alcohol!',
    vietnameseLucyCheer: 'Tổng hợp thành công Cồn Isopropylic! Rượu y tế bay hơi cực nhanh không để lại cặn!'
  },
  {
    id: 'r_phenol',
    inputs: ['phenyl', 'hydroxy'],
    resultId: 'phenol',
    reactionType: 'Substitution',
    vietnameseReactionType: 'Thế ái nhân vòng thơm',
    equation: 'C₆H₅• + •OH ➔ C₆H₅OH',
    lucyCheer: 'Phenol forged! The historic antiseptic that revolutionized hospital surgery!',
    vietnameseLucyCheer: 'Phenol ra đời! Chất sát trùng lịch sử đã thay đổi hoàn toàn nền phẫu thuật y khoa!'
  },
  {
    id: 'r_chloromethane',
    inputs: ['methyl', 'chloro'],
    resultId: 'chloromethane',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Halogen hóa',
    equation: 'CH₃• + •Cl ➔ CH₃Cl',
    lucyCheer: 'Chloromethane created! A fundamental methylating reagent in organic synthesis!',
    vietnameseLucyCheer: 'Tạo Clometan thành công! Tác nhân metyl hóa đắc lực trong phòng thí nghiệm!'
  },
  {
    id: 'r_chloroethane',
    inputs: ['ethyl', 'chloro'],
    resultId: 'chloroethane',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Halogen hóa',
    equation: 'C₂H₅• + •Cl ➔ C₂H₅Cl',
    lucyCheer: 'Chloroethane! That ice-cold spray doctors use on sports players during games!',
    vietnameseLucyCheer: 'Cloetan! Bình xịt lạnh làm tê giảm đau chấn thương thể thao trên sân cỏ!'
  },
  {
    id: 'r_vinyl_chloride',
    inputs: ['vinyl', 'chloro'],
    resultId: 'vinyl_chloride',
    reactionType: 'Addition',
    vietnameseReactionType: 'Halogen hóa không no',
    equation: 'CH₂=CH• + •Cl ➔ CH₂=CH—Cl',
    lucyCheer: 'Vinyl Chloride! Polymerize this and you get all the PVC pipes in modern cities!',
    vietnameseLucyCheer: 'Vinyl Clorua! Trùng hợp chất này sẽ tạo ra toàn bộ hệ thống ống nhựa PVC hiện đại!'
  },
  {
    id: 'r_chlorobenzene',
    inputs: ['phenyl', 'chloro'],
    resultId: 'chlorobenzene',
    reactionType: 'Substitution',
    vietnameseReactionType: 'Thế halogen thơm',
    equation: 'C₆H₅• + •Cl ➔ C₆H₅Cl',
    lucyCheer: 'Chlorobenzene! A heavy aromatic halogen solvent for high-temp chemistry!',
    vietnameseLucyCheer: 'Clobenzen! Dung môi halogen thơm chịu nhiệt dùng trong tổng hợp công nghiệp!'
  },
  {
    id: 'r_acetaldehyde',
    inputs: ['methyl', 'formyl'],
    resultId: 'acetaldehyde',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Cố định nhóm cacbonyl',
    equation: 'CH₃• + •CHO ➔ CH₃CHO',
    lucyCheer: 'Acetaldehyde! Ready for the Tollens silver mirror demonstration!',
    vietnameseLucyCheer: 'Axetanđehit! Sẵn sàng cho phản ứng tráng bạc tráng gương long lanh!'
  },
  {
    id: 'r_benzaldehyde',
    inputs: ['phenyl', 'formyl'],
    resultId: 'benzaldehyde',
    reactionType: 'Substitution',
    vietnameseReactionType: 'Cố định nhóm cacbonyl thơm',
    equation: 'C₆H₅• + •CHO ➔ C₆H₅CHO',
    lucyCheer: 'Mmm, smell that? Benzaldehyde gives off that sweet almond and marzipan fragrance!',
    vietnameseLucyCheer: 'Thơm quá! Benzenđehit tỏa ra hương hạnh nhân ngọt ngào trong bánh kẹo!'
  },
  {
    id: 'r_acetic_acid',
    inputs: ['methyl', 'carboxyl'],
    resultId: 'acetic_acid',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Cố định nhóm cacboxyl',
    equation: 'CH₃• + •COOH ➔ CH₃COOH',
    lucyCheer: 'Acetic Acid! The sour tang of natural kitchen vinegar!',
    vietnameseLucyCheer: 'Axit Axetic! Vị chua thanh quen thuộc của giấm ăn trong mọi gian bếp!'
  },
  {
    id: 'r_benzoic_acid',
    inputs: ['phenyl', 'carboxyl'],
    resultId: 'benzoic_acid',
    reactionType: 'Substitution',
    vietnameseReactionType: 'Cố định nhóm cacboxyl thơm',
    equation: 'C₆H₅• + •COOH ➔ C₆H₅COOH',
    lucyCheer: 'Benzoic Acid! Its sodium salt protects food and drinks from mold and spoilage!',
    vietnameseLucyCheer: 'Axit Benzoic! Muối natri benzoat bảo quản nước ngọt và nước sốt thơm ngon!'
  },
  {
    id: 'r_methylamine',
    inputs: ['methyl', 'amino'],
    resultId: 'methylamine',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Cố định nhóm amin',
    equation: 'CH₃• + •NH₂ ➔ CH₃NH₂',
    lucyCheer: 'Methylamine! A foundational organic amine base with a distinctly fishy smell!',
    vietnameseLucyCheer: 'Metylamin! Amin hữu cơ đơn giản mang tính bazơ, có mùi tanh cá đặc trưng!'
  },
  {
    id: 'r_ethylamine',
    inputs: ['ethyl', 'amino'],
    resultId: 'ethylamine',
    reactionType: 'Radical Coupling',
    vietnameseReactionType: 'Cố định nhóm amin',
    equation: 'C₂H₅• + •NH₂ ➔ C₂H₅NH₂',
    lucyCheer: 'Ethylamine! Completely soluble in water, forming an alkaline solution!',
    vietnameseLucyCheer: 'Etylamin! Tan vô hạn trong nước tạo dung dịch có môi trường kiềm làm xanh quỳ tím!'
  },
  {
    id: 'r_aniline',
    inputs: ['phenyl', 'amino'],
    resultId: 'aniline',
    reactionType: 'Substitution',
    vietnameseReactionType: 'Amin hóa vòng thơm',
    equation: 'C₆H₅• + •NH₂ ➔ C₆H₅NH₂',
    lucyCheer: 'Aniline! The historic precursor that unlocked color synthetic indigo and azo dyes!',
    vietnameseLucyCheer: 'Anilin! Hợp chất huyền thoại mở màn ngành công nghiệp thuốc nhuộm rực rỡ!'
  },
  {
    id: 'r_toluene',
    inputs: ['phenyl', 'methyl'],
    resultId: 'toluene',
    reactionType: 'Substitution',
    vietnameseReactionType: 'Ankyl hóa Friedel-Crafts',
    equation: 'C₆H₅• + •CH₃ ➔ C₆H₅CH₃',
    lucyCheer: 'Toluene synthesized! That sweet aromatic smell in airplane fuels and paints!',
    vietnameseLucyCheer: 'Toluen ra lò! Dung môi thơm đặc trưng trong sơn mài và phụ gia nhiên liệu máy bay!'
  },
  {
    id: 'r_styrene',
    inputs: ['phenyl', 'vinyl'],
    resultId: 'styrene',
    reactionType: 'Substitution',
    vietnameseReactionType: 'Liên hợp vòng thơm',
    equation: 'C₆H₅• + •CH=CH₂ ➔ C₆H₅CH=CH₂',
    lucyCheer: 'Styrene! The versatile monomer polymerized into lightweight Styrofoam packaging!',
    vietnameseLucyCheer: 'Stiren! Monomer tạo nên xốp bảo vệ hàng hóa và hộp đựng thực phẩm siêu nhẹ!'
  },
  {
    id: 'r_nitrobenzene',
    inputs: ['phenyl', 'nitro'],
    resultId: 'nitrobenzene',
    reactionType: 'Substitution',
    vietnameseReactionType: 'Nitro hóa vòng thơm',
    equation: 'C₆H₅• + •NO₂ ➔ C₆H₅NO₂',
    lucyCheer: 'Nitrobenzene! Dense oily liquid with strong almond aroma, crucial for dye synthesis!',
    vietnameseLucyCheer: 'Nitrobenzen! Dầu nặng màu vàng nhạt mùi hạnh nhân, bước đệm để điều chế anilin!'
  },

  // --- Advanced Molecule + Molecule Reactions (Infinite Craft Level) ---
  {
    id: 'r_fischer_ethyl_acetate',
    inputs: ['acetic_acid', 'ethanol'],
    resultId: 'ethyl_acetate',
    byProduct: 'H₂O',
    reactionType: 'Esterification',
    vietnameseReactionType: 'Este hóa Fischer',
    equation: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O',
    lucyCheer: 'Fischer Esterification success! Acetic Acid + Ethanol created delicious fruity Ethyl Acetate!',
    vietnameseLucyCheer: 'Este hóa Fischer thành công rực rỡ! Giấm ăn + Cồn tạo ra Etyl Axetat mùi hoa quả ngát hương!'
  },
  {
    id: 'r_fischer_methyl_acetate',
    inputs: ['acetic_acid', 'methanol'],
    resultId: 'methyl_acetate',
    byProduct: 'H₂O',
    reactionType: 'Esterification',
    vietnameseReactionType: 'Este hóa Fischer',
    equation: 'CH₃COOH + CH₃OH ⇌ CH₃COOCH₃ + H₂O',
    lucyCheer: 'Methyl Acetate synthesized! Quick-drying, apple-scented ester for modern varnishes!',
    vietnameseLucyCheer: 'Tổng hợp Metyl Axetat thành công! Este thơm mùi táo khô nhanh trong sơn bóng!'
  },
  {
    id: 'r_aspirin_synthesis',
    inputs: ['phenol', 'acetic_acid'],
    resultId: 'aspirin',
    byProduct: 'H₂O',
    reactionType: 'Condensation',
    vietnameseReactionType: 'Tổng hợp thuốc hạ sốt',
    equation: 'Phenol derivative + CH₃COOH ➔ Aspirin + H₂O',
    lucyCheer: 'INCREDIBLE DISCOVERY! You synthesized Aspirin, saving cardiovascular lives worldwide!',
    vietnameseLucyCheer: 'PHÁT MINH VĨ ĐẠI! Em đã tổng hợp được Aspirin, thần dược bảo vệ trái tim nhân loại!'
  },
  {
    id: 'r_tnt_nitration',
    inputs: ['toluene', 'nitro'],
    resultId: 'tnt',
    reactionType: 'Substitution',
    vietnameseReactionType: 'Đa nitro hóa',
    equation: 'C₆H₅CH₃ + 3 NO₂ ➔ TNT + 3 H₂O',
    lucyCheer: 'WHOA! Explosive synthesis: TNT unlocked! Handle this with laboratory precision!',
    vietnameseLucyCheer: 'Ồ WAA! Tổng hợp phản ứng nổ: Thuốc nổ TNT! Cần thao tác hết sức chuẩn xác trong phòng lab!'
  }
];

// Quick index maps
export const ALL_ORGANIC_TOKENS: Record<string, OrganicTokenData> = {
  ...STARTER_FRAGMENTS,
  ...CRAFTABLE_COMPOUNDS
};
