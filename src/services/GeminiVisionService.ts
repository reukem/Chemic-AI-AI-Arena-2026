import { GoogleGenAI } from '@google/genai';
import { useSimulationStore } from '../engine/store';
import { ai } from '../engine/aiService';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';

export interface VisionSolveResult {
    title: string;
    problemType: 'exam_question' | 'reagent_bottle' | 'experimental_setup' | 'molecular_structure';
    equationText: string;
    explanation: string;
    stepByStep: string[];
    suggestedReagents: string[];
    suggestedContainers: {
        type: 'beaker' | 'flask';
        reagentId: string;
        volume: number;
    }[];
    safetyNotes: string;
    curriculumLevel: string;
}

const VISION_SYSTEM_INSTRUCTION = `You are Professor Lucy, an expert Chemistry Vision AI Tutor.
Analyze the chemistry homework, exam problem, or reagent image provided by the student.

You must output a strictly valid JSON object matching this schema:
{
  "title": "Short title of the reaction or problem (e.g. Saponification of Tristearin)",
  "problemType": "exam_question" | "reagent_bottle" | "experimental_setup" | "molecular_structure",
  "equationText": "Balanced reaction equation with state symbols (e.g. NaHCO3 (s) + CH3COOH (aq) -> CH3COONa (aq) + H2O (l) + CO2 (g) ^)",
  "explanation": "Clear, concise scientific explanation of the chemical principles (under 2 paragraphs)",
  "stepByStep": [
    "Step 1: Identify reactants...",
    "Step 2: Balance stoichiometry...",
    "Step 3: Predict observations..."
  ],
  "suggestedReagents": ["List of chemical IDs that match our registry (e.g. NaHCO3, ACETIC_ACID, CuSO4, NaOH, GLYCEROL, SODIUM, ETHANOL, FeCl3, AgNO3, HCl, H2SO4)"],
  "suggestedContainers": [
    {"type": "beaker", "reagentId": "NaHCO3", "volume": 30},
    {"type": "flask", "reagentId": "ACETIC_ACID", "volume": 40}
  ],
  "safetyNotes": "Essential safety protocols (e.g. Exothermic heat release, wear goggles)",
  "curriculumLevel": "Grade 12 National Exam (THPT Quốc Gia)"
}

Only return raw JSON. Do not include markdown code block ticks (\`\`\`json).`;

export async function analyzeChemistryImage(
    imageBase64: string,
    mimeType: string = 'image/jpeg',
    userQuery: string = 'Analyze this chemistry problem, solve the reaction, and configure the lab bench.'
): Promise<VisionSolveResult> {
    const store = useSimulationStore.getState();
    const customKey = store.customApiKey;
    const client = customKey ? new GoogleGenAI({ apiKey: customKey }) : ai;
    const isVi = store.language === 'VN';

    try {
        const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            inlineData: {
                                mimeType: mimeType,
                                data: cleanBase64
                            }
                        },
                        {
                            text: `${userQuery}\nLanguage requested: ${isVi ? 'Vietnamese (Tiếng Việt)' : 'English'}`
                        }
                    ]
                }
            ],
            config: {
                systemInstruction: VISION_SYSTEM_INSTRUCTION,
                temperature: 0.2
            }
        });

        const rawText = response.text || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return normalizeVisionResult(parsed, isVi);
        }
        throw new Error("Could not parse JSON from Gemini vision output");
    } catch (error) {
        console.warn("Gemini Vision API fallback to local AI solver:", error);
        return getOfflineVisionFallback(userQuery, isVi);
    }
}

function normalizeVisionResult(data: any, isVi: boolean): VisionSolveResult {
    return {
        title: data.title || (isVi ? 'Phân Tích Đề Bài Hóa Học' : 'Chemistry Problem Analysis'),
        problemType: data.problemType || 'exam_question',
        equationText: data.equationText || 'NaHCO₃ (s) + CH₃COOH (aq) → CH₃COONa (aq) + H₂O (l) + CO₂ (g) ↑',
        explanation: data.explanation || (isVi ? 'Phản ứng tạo bọt khí CO₂ mãnh liệt.' : 'Decarboxylation reaction liberating CO₂ gas.'),
        stepByStep: Array.isArray(data.stepByStep) && data.stepByStep.length > 0 
            ? data.stepByStep 
            : [isVi ? 'Bước 1: Xác định chất phản ứng' : 'Step 1: Identify reactants'],
        suggestedReagents: Array.isArray(data.suggestedReagents) ? data.suggestedReagents : ['NaHCO3', 'ACETIC_ACID'],
        suggestedContainers: Array.isArray(data.suggestedContainers) && data.suggestedContainers.length > 0
            ? data.suggestedContainers
            : [
                { type: 'beaker', reagentId: 'NaHCO3', volume: 30 },
                { type: 'flask', reagentId: 'ACETIC_ACID', volume: 40 }
            ],
        safetyNotes: data.safetyNotes || (isVi ? 'Đeo kính bảo hộ khi thực hiện phản ứng sủi bọt.' : 'Wear safety goggles during effervescence.'),
        curriculumLevel: data.curriculumLevel || 'Grade 12 THPT QG'
    };
}

export function getOfflineVisionFallback(query: string, isVi: boolean): VisionSolveResult {
    const q = query.toLowerCase();

    if (q.includes('soap') || q.includes('xa phong') || q.includes('sapon') || q.includes('triglyceride') || q.includes('chat beo')) {
        return {
            title: isVi ? 'Phản Ứng Xà Phòng Hóa Chất Béo (Saponification)' : 'Alkaline Saponification of Triglycerides',
            problemType: 'exam_question',
            equationText: '(C₁₇H₃₃COO)₃C₃H₅ + 3NaOH → C₃H₅(OH)₃ (Glycerol) + 3C₁₇H₃₃COONa (Xà phòng)',
            explanation: isVi 
                ? 'Thủy phân este ba chức (chất béo) trong môi trường kiềm đun nóng tạo ra ancol đa chức Glycerol và hỗn hợp muối natri của axit béo (Xà phòng).'
                : 'Alkaline hydrolysis of triglycerides under heating yields propane-1,2,3-triol (Glycerol) and sodium carboxylate fatty salts (Soap).',
            stepByStep: isVi 
                ? [
                    'Bước 1: Nhận diện este 3 chức của glixerol với axit béo.',
                    'Bước 2: Viết phương trình thủy phân este trong môi trường kiềm (NaOH).',
                    'Bước 3: Tách lớp xà phòng nổi lên trên bằng dung dịch NaCl bão hòa.'
                ]
                : [
                    'Step 1: Identify triglyceride ester functional groups.',
                    'Step 2: Execute nucleophilic acyl substitution with hydroxide ions.',
                    'Step 3: Salt out amphiphilic soap layer using saturated NaCl brine.'
                ],
            suggestedReagents: ['TRIGLYCERIDE', 'NaOH'],
            suggestedContainers: [
                { type: 'beaker', reagentId: 'TRIGLYCERIDE', volume: 35 },
                { type: 'flask', reagentId: 'NaOH', volume: 35 }
            ],
            safetyNotes: isVi ? 'Dung dịch kiềm NaOH có tính ăn mòn da, cẩn thận khi đun nóng.' : 'Corrosive alkali. Handle with lab gloves.',
            curriculumLevel: 'Hóa học 12 // Bài 2: Lipit - Xà phòng'
        };
    }

    if (q.includes('bac') || q.includes('silver') || q.includes('tollens') || q.includes('trang guong') || q.includes('aldehyde') || q.includes('gluco')) {
        return {
            title: isVi ? 'Phản Ứng Tráng Bạc Thuốc Thử Tollens' : 'Tollens Reagent Silver Mirror Redox',
            problemType: 'exam_question',
            equationText: 'CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag (s) ↓ + 3NH₃ + H₂O',
            explanation: isVi 
                ? 'Nhóm chức anđehit (-CHO) có tính khử mạnh, khử phức bạc trong môi trường amoniac tạo lớp bạc kim loại sáng bóng bám vào thành bình.'
                : 'The terminal formyl group (-CHO) reduces diamminesilver(I) complexes, depositing a gleaming metallic silver mirror.',
            stepByStep: isVi 
                ? [
                    'Bước 1: Điều chế thuốc thử Tollens từ AgNO₃ và dung dịch NH₃.',
                    'Bước 2: Cho dung dịch anđehit/glucozơ vào ống nghiệm.',
                    'Bước 3: Đun cách thủy ở 60-70°C quan sát lớp gương bạc sáng loáng.'
                ]
                : [
                    'Step 1: Form Tollens complex from AgNO₃ and excess NH₃.',
                    'Step 2: Add reducing sugar/aldehyde substrate.',
                    'Step 3: Warm in water bath (65°C) to observe silver mirror formation.'
                ],
            suggestedReagents: ['ACETALDEHYDE', 'TOLLENS_REAGENT'],
            suggestedContainers: [
                { type: 'flask', reagentId: 'TOLLENS_REAGENT', volume: 30 },
                { type: 'beaker', reagentId: 'ACETALDEHYDE', volume: 20 }
            ],
            safetyNotes: isVi ? 'Không để khô cặn thuốc thử Tollens (có thể tạo muối bạc nổ).' : 'Do not store dry Tollens residues.',
            curriculumLevel: 'Hóa học 11-12 // Anđehit & Cacbohiđrat'
        };
    }

    // Default: Bicarbonate + Acid
    return {
        title: isVi ? 'Phản Ứng Sủi Bọt Khí CO₂ (Axit - Muối Bicacbonat)' : 'Bicarbonate Decarboxylation & Effervescence',
        problemType: 'exam_question',
        equationText: 'NaHCO₃ (s) + CH₃COOH (aq) → CH₃COONa (aq) + H₂O (l) + CO₂ (g) ↑',
        explanation: isVi 
            ? 'Axit axetic chuyển proton H⁺ cho ion bicacbonat tạo axit cacbonic không bền (H₂CO₃), phân hủy ngay lập tức thành nước và khí CO₂ sủi bọt cuồn cuộn.'
            : 'Acetic acid transfers a proton to bicarbonate, forming transient carbonic acid (H₂CO₃) which decomposes vigorously into water and escaping CO₂ bubbles.',
        stepByStep: isVi 
            ? [
                'Bước 1: Xác định tính bazơ lưỡng tính của muối NaHCO₃.',
                'Bước 2: Viết phương trình trao đổi ion giải phóng khí CO₂.',
                'Bước 3: Quan sát bọt khí và độ tăng áp suất/nhiệt độ.'
            ]
            : [
                'Step 1: Identify bicarbonate amphiprotic proton acceptor.',
                'Step 2: Formulate acid-base decarboxylation equation.',
                'Step 3: Measure gas volume expansion and temperature shift.'
            ],
        suggestedReagents: ['NaHCO3', 'ACETIC_ACID'],
        suggestedContainers: [
            { type: 'beaker', reagentId: 'NaHCO3', volume: 30 },
            { type: 'flask', reagentId: 'ACETIC_ACID', volume: 40 }
        ],
        safetyNotes: isVi ? 'Khí CO₂ sinh ra nhanh có thể làm trào bọt ra ngoài miệng bình.' : 'Rapid gas evolution can cause foaming overflow.',
        curriculumLevel: 'Hóa học 11-12 // Axit - Bazơ - Muối'
    };
}
