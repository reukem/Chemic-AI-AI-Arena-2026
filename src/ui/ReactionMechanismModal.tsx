import React, { useState, useEffect } from 'react';
import { audioManager } from '../engine/AudioManager';

interface ReactionMechanismModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVi?: boolean;
  initialMechanismId?: string;
}

interface MechanismStep {
  title: { EN: string; VN: string };
  desc: { EN: string; VN: string };
  electronAction: { EN: string; VN: string };
  svgContent: React.ReactNode | ((isVi: boolean) => React.ReactNode);
}

interface MechanismDefinition {
  id: string;
  name: { EN: string; VN: string };
  equation: string;
  category: { EN: string; VN: string };
  steps: MechanismStep[];
}

const MECHANISMS: MechanismDefinition[] = [
  // 1. Fischer Esterification
  {
    id: 'esterification',
    name: { EN: 'Fischer Esterification Mechanism', VN: 'Cơ chế Phản ứng Este hóa Fischer' },
    equation: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O',
    category: { EN: 'Nucleophilic Acyl Substitution', VN: 'Thế Nucleophile vào nhóm Acyl' },
    steps: [
      {
        title: { EN: 'Step 1: Carbonyl Protonation', VN: 'Bước 1: Proton hóa Oxi Cacbonyl' },
        desc: {
          EN: 'A proton (H⁺) from the sulfuric acid catalyst bonds to the carbonyl oxygen lone pair, drastically increasing the electrophilicity of the central carbon.',
          VN: 'Proton (H⁺) từ xúc tác H₂SO₄ gắn vào cặp electron tự do của oxi cacbonyl, làm tăng mạnh điện tích dương và hoạt tính electrophin của nguyên tử cacbon trung tâm.'
        },
        electronAction: {
          EN: 'Lone pair on O attacks H⁺ → Oxygen gains positive formal charge (+)',
          VN: 'Đôi electron trên O tấn công H⁺ → Oxi nhận điện tích hình thức (+)'
        },
        svgContent: (
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-md mx-auto">
            {/* Acetic Acid CH3-C(=O+H)-OH */}
            <text x="70" y="110" fill="#f8fafc" fontSize="16" fontWeight="bold">H₃C</text>
            <line x1="110" y1="105" x2="160" y2="105" stroke="#f8fafc" strokeWidth="3.5" />
            
            {/* Carbonyl Carbon */}
            <circle cx="160" cy="105" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="160" y="111" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">Cᵟ⁺</text>

            {/* C=O+H with curly arrow */}
            <line x1="156" y1="89" x2="156" y2="50" stroke="#f43f5e" strokeWidth="3" />
            <line x1="164" y1="89" x2="164" y2="50" stroke="#f43f5e" strokeWidth="3" />
            <circle cx="160" cy="40" r="15" fill="#9f1239" stroke="#fb7185" strokeWidth="2" />
            <text x="160" y="46" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">O⁺</text>
            <line x1="175" y1="40" x2="205" y2="40" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="215" y="45" fill="#38bdf8" fontSize="14" fontWeight="bold">H</text>

            {/* Bottom -OH */}
            <line x1="160" y1="121" x2="160" y2="160" stroke="#38bdf8" strokeWidth="3" />
            <text x="160" y="178" textAnchor="middle" fill="#38bdf8" fontSize="15" fontWeight="bold">OH</text>

            {/* Incoming Alcohol Molecule Ethanol with lone pairs */}
            <g transform="translate(260, 105)">
              <text x="0" y="5" fill="#38bdf8" fontSize="15" fontWeight="bold">H—O:</text>
              <text x="40" y="5" fill="#f8fafc" fontSize="15" fontWeight="bold">—C₂H₅</text>
              {/* Curved Arrow attacking C */}
              <path d="M 10,-10 Q -40,-40 -80,-5" fill="none" stroke="#22d3ee" strokeWidth="3" strokeDasharray="4 2" markerEnd="url(#arrow)" />
            </g>
          </svg>
        )
      },
      {
        title: { EN: 'Step 2: Nucleophilic Attack of Alcohol', VN: 'Bước 2: Rượu tấn công Nucleophile' },
        desc: {
          EN: 'The lone pair of oxygen on ethanol attacks the electrophilic carbonyl carbon, breaking the C=O pi bond and forming a tetrahedral intermediate.',
          VN: 'Đôi electron tự do trên oxi của etanol tấn công vào nguyên tử cacbon tích điện dương, mở liên kết pi C=O để tạo hợp chất trung gian tứ diện.'
        },
        electronAction: {
          EN: 'C-O bond forms, C=O π-bond breaks and electrons move to O',
          VN: 'Hình thành liên kết C-O mới, electron pi chuyển dịch lên nguyên tử oxi'
        },
        svgContent: (
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-md mx-auto">
            {/* Tetrahedral Intermediate */}
            <circle cx="180" cy="100" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="180" y="106" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">C</text>
            <line x1="140" y1="100" x2="164" y2="100" stroke="#f8fafc" strokeWidth="3" />
            <text x="110" y="105" fill="#f8fafc" fontSize="14" fontWeight="bold">H₃C</text>

            <line x1="180" y1="84" x2="180" y2="50" stroke="#38bdf8" strokeWidth="3" />
            <text x="180" y="42" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">OH</text>

            <line x1="180" y1="116" x2="180" y2="150" stroke="#38bdf8" strokeWidth="3" />
            <text x="180" y="168" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">OH</text>

            {/* Attached O+H-C2H5 */}
            <line x1="196" y1="100" x2="235" y2="100" stroke="#22d3ee" strokeWidth="3.5" />
            <circle cx="250" cy="100" r="14" fill="#9f1239" stroke="#fb7185" strokeWidth="2" />
            <text x="250" y="105" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">O⁺</text>
            <text x="270" y="95" fill="#38bdf8" fontSize="12" fontWeight="bold">H</text>
            <text x="270" y="115" fill="#f8fafc" fontSize="12" fontWeight="bold">C₂H₅</text>
          </svg>
        )
      },
      {
        title: { EN: 'Step 3: Proton Transfer & Elimination of Water', VN: 'Bước 3: Chuyển vị Proton & Tách Nước' },
        desc: {
          EN: 'A proton shifts from the newly attached ethoxy oxygen to one of the hydroxyl groups, converting it into a good leaving group (-OH₂⁺) which departs as a water molecule (H₂O).',
          VN: 'Proton chuyển vị sang một trong các nhóm -OH lân cận, biến nó thành nhóm xuất tốt (-OH₂⁺). Phân tử nước tách ra khỏi hợp chất.'
        },
        electronAction: {
          EN: 'H⁺ moves to -OH → H₂O departs as stable leaving group',
          VN: 'H⁺ chuyển sang nhóm -OH → H₂O tách ra làm bền hóa hệ'
        },
        svgContent: (isVi: boolean) => (
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-md mx-auto">
            <circle cx="160" cy="100" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="160" y="106" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">C</text>

            {/* Reforming carbonyl with curved arrow */}
            <line x1="160" y1="84" x2="160" y2="45" stroke="#f43f5e" strokeWidth="3.5" />
            <text x="160" y="38" textAnchor="middle" fill="#f43f5e" fontSize="15" fontWeight="bold">O⁺—H</text>

            <line x1="176" y1="100" x2="225" y2="100" stroke="#38bdf8" strokeWidth="3" />
            <text x="245" y="105" fill="#38bdf8" fontSize="14" fontWeight="bold">O—C₂H₅</text>

            {/* Water leaving with broken bond */}
            <line x1="160" y1="116" x2="160" y2="145" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 3" />
            <g transform="translate(160, 165)">
              <text x="0" y="5" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">
                {isVi ? 'H₂O ↑ (Tách ra)' : 'H₂O ↑ (Leaving Group)'}
              </text>
            </g>
          </svg>
        )
      },
      {
        title: { EN: 'Step 4: Deprotonation & Ethyl Acetate Formation', VN: 'Bước 4: Tách H⁺ & Tạo thành Etyl Axetat' },
        desc: {
          EN: 'Loss of the catalytic proton restores the neutral carbonyl double bond C=O, completing the ester synthesis and regenerating the acid catalyst.',
          VN: 'Tách proton H⁺ tái tạo liên kết đôi C=O trung hòa, hoàn tất quá trình tổng hợp este Etyl axetat và hoàn trả xúc tác axit H₂SO₄.'
        },
        electronAction: {
          EN: 'O-H bond electrons restore C=O double bond → Ester isolated',
          VN: 'Đôi electron O-H hoàn trả liên kết đôi C=O → Thu được este tinh khiết'
        },
        svgContent: (isVi: boolean) => (
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-md mx-auto">
            {/* Final Ester CH3COOC2H5 */}
            <text x="60" y="105" fill="#f8fafc" fontSize="15" fontWeight="bold">H₃C</text>
            <line x1="98" y1="100" x2="145" y2="100" stroke="#f8fafc" strokeWidth="3.5" />
            
            {/* C=O */}
            <line x1="141" y1="98" x2="141" y2="55" stroke="#f43f5e" strokeWidth="3" />
            <line x1="149" y1="98" x2="149" y2="55" stroke="#f43f5e" strokeWidth="3" />
            <text x="145" y="48" textAnchor="middle" fill="#f43f5e" fontSize="16" fontWeight="bold">O</text>

            {/* Ester Oxygen */}
            <line x1="145" y1="100" x2="200" y2="100" stroke="#38bdf8" strokeWidth="3.5" />
            <text x="212" y="105" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">O</text>

            {/* Ethyl Tail */}
            <line x1="225" y1="100" x2="270" y2="70" stroke="#f8fafc" strokeWidth="3.5" />
            <line x1="270" y1="70" x2="315" y2="100" stroke="#f8fafc" strokeWidth="3.5" />
            <text x="325" y="105" fill="#f8fafc" fontSize="13" fontWeight="bold">CH₃</text>

            <text x="200" y="165" textAnchor="middle" fill="#34d399" fontSize="13" fontFamily="monospace" fontWeight="bold">
              {isVi ? '✓ Etyl Axetat (CH₃COOC₂H₅ - Hương thơm quả táo)' : '✓ Ethyl Acetate (CH₃COOC₂H₅ - Fruity Aroma)'}
            </text>
          </svg>
        )
      }
    ]
  },

  // 2. Base-Catalyzed Saponification
  {
    id: 'saponification',
    name: { EN: 'Base Hydrolysis / Saponification', VN: 'Cơ chế Thủy phân Este trong Kiềm (Xà phòng hóa)' },
    equation: 'CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH',
    category: { EN: 'Irreversible Nucleophilic Acyl Substitution', VN: 'Thế Nucleophile không thuận nghịch' },
    steps: [
      {
        title: { EN: 'Step 1: Hydroxide Nucleophilic Addition', VN: 'Bước 1: Ion OH⁻ tấn công Cacbonyl' },
        desc: {
          EN: 'The strong hydroxide nucleophile (OH⁻) directly attacks the electrophilic carbonyl carbon of the ester.',
          VN: 'Ion hiđroxit (OH⁻) mang điện tích âm mạnh tấn công trực tiếp vào nguyên tử cacbon cacbonyl tích điện dương của este.'
        },
        electronAction: {
          EN: 'OH⁻ pair forms C-OH bond, C=O π-electrons shift to O⁻',
          VN: 'Cặp electron của OH⁻ tạo liên kết C-OH, electron pi chuyển sang O⁻'
        },
        svgContent: (
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-md mx-auto">
            <text x="80" y="105" fill="#f8fafc" fontSize="15" fontWeight="bold">H₃C</text>
            <line x1="115" y1="100" x2="160" y2="100" stroke="#f8fafc" strokeWidth="3.5" />
            <circle cx="160" cy="100" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="160" y="106" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">C</text>

            {/* Carbonyl Oxygen */}
            <line x1="156" y1="84" x2="156" y2="50" stroke="#f43f5e" strokeWidth="3" />
            <line x1="164" y1="84" x2="164" y2="50" stroke="#f43f5e" strokeWidth="3" />
            <text x="160" y="42" textAnchor="middle" fill="#f43f5e" fontSize="15" fontWeight="bold">O</text>

            <line x1="176" y1="100" x2="225" y2="100" stroke="#38bdf8" strokeWidth="3" />
            <text x="245" y="105" fill="#38bdf8" fontSize="14" fontWeight="bold">OC₂H₅</text>

            {/* Incoming OH- attacking */}
            <g transform="translate(160, 160)">
              <text x="0" y="5" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">:OH⁻</text>
              <path d="M 0,-5 L 0,-35" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="3 2" markerEnd="url(#arrow)" />
            </g>
          </svg>
        )
      },
      {
        title: { EN: 'Step 2: Tetrahedral Collapse & Ethoxide Expulsion', VN: 'Bước 2: Phục hồi C=O & Đẩy nhóm Ancolat' },
        desc: {
          EN: 'The negative charge on oxygen reforms the strong C=O carbonyl double bond, expelling the ethoxide anion (C₂H₅O⁻) as the leaving group.',
          VN: 'Điện tích âm trên oxi khôi phục liên kết đôi C=O bền vững, đồng thời đẩy ion etylat (C₂H₅O⁻) ra ngoài.'
        },
        electronAction: {
          EN: 'O⁻ electrons collapse into C=O double bond, C-O bond cleaved',
          VN: 'Cặp electron O⁻ tạo lại liên kết đôi C=O, bẻ gãy liên kết C-OC₂H₅'
        },
        svgContent: (
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-md mx-auto">
            {/* Acetic Acid intermediate + Ethoxide */}
            <text x="80" y="105" fill="#f8fafc" fontSize="15" fontWeight="bold">H₃C</text>
            <line x1="115" y1="100" x2="160" y2="100" stroke="#f8fafc" strokeWidth="3.5" />
            <line x1="156" y1="98" x2="156" y2="55" stroke="#f43f5e" strokeWidth="3" />
            <line x1="164" y1="98" x2="164" y2="55" stroke="#f43f5e" strokeWidth="3" />
            <text x="160" y="48" textAnchor="middle" fill="#f43f5e" fontSize="16" fontWeight="bold">O</text>

            <line x1="160" y1="100" x2="195" y2="135" stroke="#38bdf8" strokeWidth="3" />
            <text x="210" y="142" fill="#38bdf8" fontSize="15" fontWeight="bold">OH</text>

            {/* Expelled C2H5O- */}
            <g transform="translate(280, 100)">
              <text x="0" y="5" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">⁻:OC₂H₅</text>
            </g>
          </svg>
        )
      },
      {
        title: { EN: 'Step 3: Rapid Irreversible Proton Transfer', VN: 'Bước 3: Chuyển vị Proton một chiều' },
        desc: {
          EN: 'The strongly basic ethoxide ion rapidly removes the acidic proton from acetic acid, yielding ethanol and resonance-stabilized acetate (CH₃COO⁻ Na⁺).',
          VN: 'Ion bazơ mạnh C₂H₅O⁻ hút proton H⁺ từ axit axetic, tạo thành ancol etylic và muối natri axetat (CH₃COONa) cộng hưởng bền vững.'
        },
        electronAction: {
          EN: 'Proton transfer is completely irreversible, driving reaction to 100% completion',
          VN: 'Quá trình chuyển vị proton là một chiều, thúc đẩy phản ứng xà phòng hóa đạt 100%'
        },
        svgContent: (isVi: boolean) => (
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-md mx-auto">
            <g transform="translate(120, 100)">
              <text x="0" y="5" textAnchor="middle" fill="#38bdf8" fontSize="17" fontWeight="bold">CH₃COO⁻ Na⁺</text>
              <text x="0" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11">
                {isVi ? 'Natri Axetat (Muối tan)' : 'Sodium Acetate (Soluble Salt)'}
              </text>
            </g>
            <text x="200" y="105" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">+</text>
            <g transform="translate(280, 100)">
              <text x="0" y="5" textAnchor="middle" fill="#34d399" fontSize="17" fontWeight="bold">C₂H₅OH</text>
              <text x="0" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11">
                {isVi ? 'Ancol Etylic' : 'Ethanol'}
              </text>
            </g>
          </svg>
        )
      }
    ]
  },

  // 3. Tollens Silver Mirror Reaction
  {
    id: 'tollens',
    name: { EN: 'Tollens Silver Mirror Reaction', VN: 'Cơ chế Phản ứng Tráng Gương Tollens' },
    equation: 'CH₃CHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → CH₃COO⁻ + 2Ag↓ + 4NH₃ + 2H₂O',
    category: { EN: 'Single Electron Transfer Redox', VN: 'Oxi hóa - Khử Chuyển dịch 1 Electron' },
    steps: [
      {
        title: { EN: 'Step 1: Carbonyl Hydration to Gem-Diol', VN: 'Bước 1: Hiđrat hóa Anđehit trong Kiềm' },
        desc: {
          EN: 'Hydroxide attacks the carbonyl carbon of acetaldehyde, generating an active gem-diolate intermediate.',
          VN: 'Ion OH⁻ trong môi trường kiềm amoniac tấn công cacbon anđehit, hình thành hợp chất trung gian gem-điolat hoạt động.'
        },
        electronAction: {
          EN: 'Aldehyde prepares for redox electron transfer',
          VN: 'Anđehit sẵn sàng chuyển giao electron cho phức bạc'
        },
        svgContent: (
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-md mx-auto">
            <text x="100" y="105" fill="#f8fafc" fontSize="16" fontWeight="bold">CH₃—CH=O</text>
            <text x="210" y="105" fill="#ef4444" fontSize="16" fontWeight="bold">+ OH⁻</text>
            <line x1="260" y1="100" x2="310" y2="100" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="335" y="105" fill="#38bdf8" fontSize="15" fontWeight="bold">CH₃—CH(OH)O⁻</text>
          </svg>
        )
      },
      {
        title: { EN: 'Step 2: Electron Transfer & Silver Precipitation', VN: 'Bước 2: Chuyển giao Electron & Kết tủa Bạc' },
        desc: {
          EN: 'Electrons from the carbon-hydrogen bond transfer to two Ag⁺ complex ions, reducing silver to metallic elemental silver (Ag⁰) which deposits as a shiny mirror coating.',
          VN: 'Electron từ liên kết C-H chuyển sang ion phức [Ag(NH₃)₂]⁺, khử bạc xuống Ag⁰ nguyên chất kết tủa bám chặt vào thành ống nghiệm tạo lớp gương sáng bóng.'
        },
        electronAction: {
          EN: 'Ag⁺ + 1e⁻ → Ag⁰ (Metallic Silver Crystal Layer)',
          VN: 'Ag⁺ + 1e⁻ → Ag⁰ (Bạc kim loại kết tủa lấp lánh)'
        },
        svgContent: (isVi: boolean) => (
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-md mx-auto">
            {/* Mirror deposition graphic */}
            <rect x="80" y="70" width="240" height="60" rx="8" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
            <text x="200" y="105" textAnchor="middle" fill="#f8fafc" fontSize="20" fontWeight="900" fontFamily="monospace">
              {isVi ? '✨ 2 Ag⁰ (LỚP GƯƠNG BẠC SÁNG BÓNG) ✨' : '✨ 2 Ag⁰ (LUSTROUS SILVER MIRROR) ✨'}
            </text>
            <text x="200" y="160" textAnchor="middle" fill="#38bdf8" fontSize="12" fontFamily="monospace">
              {isVi ? 'Aldehyde bị oxi hóa thành muối Amoni Axetat (CH₃COONH₄)' : 'Aldehyde oxidized to Ammonium Acetate (CH₃COONH₄)'}
            </text>
          </svg>
        )
      }
    ]
  }
];

export const ReactionMechanismModal: React.FC<ReactionMechanismModalProps> = ({
  isOpen,
  onClose,
  isVi = true,
  initialMechanismId
}) => {
  const [selectedMechId, setSelectedMechId] = useState(initialMechanismId || 'esterification');
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (initialMechanismId) {
      setSelectedMechId(initialMechanismId);
      setCurrentStepIdx(0);
    }
  }, [initialMechanismId]);

  const mech = MECHANISMS.find(m => m.id === selectedMechId) || MECHANISMS[0];
  const step = mech.steps[currentStepIdx] || mech.steps[0];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStepIdx(prev => {
        if (prev >= mech.steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        try {
          audioManager.playClick();
        } catch (_) {}
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, mech.steps.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      onClick={() => { audioManager.playClick(); onClose(); }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xl p-3 md:p-6 overflow-hidden select-none animate-in fade-in duration-200 pointer-events-auto cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] bg-gradient-to-b from-[#030914] via-[#050f22] to-[#020610] border-2 border-cyan-400/70 rounded-3xl p-5 md:p-7 shadow-[0_0_80px_rgba(6,182,212,0.4)] flex flex-col gap-4 overflow-y-auto custom-scrollbar cursor-default"
      >
        
        {/* SVG Marker Definition */}
        <svg className="hidden">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
            </marker>
          </defs>
        </svg>

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-900/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              🎬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  {isVi ? 'HOẠT HỌA CƠ CHẾ PHẢN ỨNG HỮU CƠ (ARROW PUSHING)' : 'ARROW-PUSHING REACTION MECHANISM ANIMATOR'}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-wider">
                {isVi ? mech.name.VN : mech.name.EN}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              audioManager.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-cyan-950/80 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90 text-base font-bold shrink-0 z-10"
            title={isVi ? 'Đóng (ESC hoặc click ngoài)' : 'Close (ESC or click outside)'}
          >
            ✕
          </button>
        </div>

        {/* Mechanism Selector Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#040e1e]/90 p-3 rounded-2xl border border-cyan-900/40 text-xs font-mono">
          <div className="flex-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
              {isVi ? 'Chọn phản ứng cần xem cơ chế:' : 'Select Target Mechanism:'}
            </span>
            <select
              value={selectedMechId}
              onChange={(e) => {
                setSelectedMechId(e.target.value);
                setCurrentStepIdx(0);
                setIsPlaying(false);
              }}
              className="w-full bg-[#030914] border border-cyan-800/60 rounded-xl px-3 py-1.5 text-cyan-200 focus:outline-none focus:border-cyan-400 text-xs font-bold"
            >
              {MECHANISMS.map(m => (
                <option key={m.id} value={m.id}>
                  {isVi ? m.name.VN : m.name.EN} ({m.equation})
                </option>
              ))}
            </select>
          </div>

          <div className="px-4 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-center">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
              {isVi ? mech.category.VN : mech.category.EN}
            </span>
            <span className="text-xs font-black text-white font-mono block mt-0.5">
              {mech.equation}
            </span>
          </div>
        </div>

        {/* Step Progress Ribbon */}
        <div className="flex items-center gap-2">
          {mech.steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                audioManager.playClick();
                setCurrentStepIdx(idx);
                setIsPlaying(false);
              }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                currentStepIdx === idx
                  ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                  : 'bg-[#040e1e]/60 border-cyan-950 text-slate-500 hover:text-slate-300'
              }`}
            >
              {isVi ? `Bước ${idx + 1}` : `Step ${idx + 1}`}
            </button>
          ))}
        </div>

        {/* Central Visualizer Chamber (Arrow-Pushing Animated Display) */}
        <div className="relative w-full h-[220px] md:h-[240px] bg-[#020610]/95 border border-cyan-950 rounded-2xl flex items-center justify-center p-4 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          {typeof step.svgContent === 'function' ? step.svgContent(!!isVi) : step.svgContent}
        </div>

        {/* Pedagogical Step Insight Card */}
        <div className="bg-[#040e1e] border border-cyan-900/50 rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-cyan-300 font-sans">
              {isVi ? step.title.VN : step.title.EN}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-700/60 text-[10px] font-mono text-cyan-300 font-bold">
              {currentStepIdx + 1} / {mech.steps.length}
            </span>
          </div>

          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans font-medium">
            {isVi ? step.desc.VN : step.desc.EN}
          </p>

          <div className="flex items-center gap-2 pt-2 border-t border-cyan-900/30 text-[11px] font-mono text-amber-300 font-bold">
            <span>⚡ {isVi ? 'Dòng di chuyển electron:' : 'Electron Flow:'}</span>
            <span className="text-slate-300 font-normal">{isVi ? step.electronAction.VN : step.electronAction.EN}</span>
          </div>
        </div>

        {/* Media Control Toolbar */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => {
              audioManager.playClick();
              setCurrentStepIdx(prev => Math.max(0, prev - 1));
            }}
            disabled={currentStepIdx === 0}
            className={`px-4 py-2 rounded-xl font-mono font-bold text-xs uppercase transition-all ${
              currentStepIdx === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-600'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer'
            }`}
          >
            ← {isVi ? 'Bước trước' : 'Previous'}
          </button>

          <button
            onClick={() => {
              audioManager.playClick();
              setIsPlaying(!isPlaying);
            }}
            className={`px-6 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 ${
              isPlaying
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white'
            }`}
          >
            <span>{isVi ? (isPlaying ? '⏸ TẠM DỪNG' : '▶ PHÁT TỰ ĐỘNG') : (isPlaying ? '⏸ PAUSE' : '▶ AUTO-PLAY')}</span>
          </button>

          <button
            onClick={() => {
              audioManager.playClick();
              setCurrentStepIdx(prev => Math.min(mech.steps.length - 1, prev + 1));
            }}
            disabled={currentStepIdx === mech.steps.length - 1}
            className={`px-4 py-2 rounded-xl font-mono font-bold text-xs uppercase transition-all ${
              currentStepIdx === mech.steps.length - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-600'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer'
            }`}
          >
            {isVi ? 'Bước tiếp theo' : 'Next'} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactionMechanismModal;
