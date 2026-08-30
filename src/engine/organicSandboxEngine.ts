import { GoogleGenAI } from '@google/genai';
import { 
  OrganicTokenData, 
  SynthesisReaction, 
  SYNTHESIS_REACTIONS, 
  ALL_ORGANIC_TOKENS, 
  CRAFTABLE_COMPOUNDS 
} from '../data/organicSandboxData';
import { useSimulationStore } from './store';

export interface CombineResult {
  success: boolean;
  compound?: OrganicTokenData;
  reaction?: SynthesisReaction;
  byProduct?: string;
  reason?: string;
  vietnameseReason?: string;
}

/**
 * Attempts to combine two tokens (radicals or molecules) into a valid organic compound.
 */
export function combineOrganicTokens(tokenIdA: string, tokenIdB: string): CombineResult {
  const tokenA = ALL_ORGANIC_TOKENS[tokenIdA];
  const tokenB = ALL_ORGANIC_TOKENS[tokenIdB];

  if (!tokenA || !tokenB) {
    return {
      success: false,
      reason: 'Unknown molecular species.',
      vietnameseReason: 'Loại phân tử không xác định.'
    };
  }

  // Find matching reaction in the matrix (order-independent)
  const reaction = SYNTHESIS_REACTIONS.find(r => 
    (r.inputs[0] === tokenIdA && r.inputs[1] === tokenIdB) ||
    (r.inputs[0] === tokenIdB && r.inputs[1] === tokenIdA)
  );

  if (reaction) {
    const product = CRAFTABLE_COMPOUNDS[reaction.resultId];
    if (product) {
      return {
        success: true,
        compound: product,
        reaction,
        byProduct: reaction.byProduct
      };
    }
  }

  // Deterministic chemical failure classification
  return generateDeterministicFailure(tokenA, tokenB);
}

/**
 * Deterministic fallback chemistry failure explanations.
 */
function generateDeterministicFailure(tokenA: OrganicTokenData, tokenB: OrganicTokenData): CombineResult {
  // Case 1: Combining two halogens
  if (tokenA.category === 'halogen' && tokenB.category === 'halogen') {
    return {
      success: false,
      reason: `Halogen repulsion: Both ${tokenA.name} and ${tokenB.name} are electronegative halogens. They form diatomic halogens (e.g. Cl₂), not an organic carbon backbone!`,
      vietnameseReason: `Đẩy electron Halogen: Cả ${tokenA.vietnameseName} và ${tokenB.vietnameseName} đều là halogen có độ âm điện lớn. Chúng tạo đơn chất halogen chứ không tạo mạch cacbon hữu cơ!`
    };
  }

  // Case 2: Combining two terminal functional groups (e.g. -OH + -COOH or -OH + -NH2)
  if (tokenA.category === 'functional' && tokenB.category === 'functional') {
    return {
      success: false,
      reason: `Valence mismatch: ${tokenA.name} (${tokenA.formula}) and ${tokenB.name} (${tokenB.formula}) are terminal functional groups. You need an alkyl or aromatic carbon radical to anchor them!`,
      vietnameseReason: `Thiếu mạch cacbon: ${tokenA.vietnameseName} (${tokenA.formula}) và ${tokenB.vietnameseName} (${tokenB.formula}) là nhóm chức biên. Cần có gốc cacbon ankyl hoặc vòng thơm để liên kết!`
    };
  }

  // Case 3: Already stable, saturated molecules
  if (tokenA.valence === 0 && tokenB.valence === 0) {
    return {
      success: false,
      reason: `Thermodynamic stability: Both ${tokenA.name} and ${tokenB.name} are already complete, valence-saturated molecules. They won't react spontaneously without specific coupling conditions!`,
      vietnameseReason: `Bão hòa hóa trị: Cả ${tokenA.vietnameseName} và ${tokenB.vietnameseName} đều là phân tử no đã bão hòa liên kết. Chúng không tự phản ứng nếu thiếu điều kiện xúc tác đặc biệt!`
    };
  }

  // Case 4: Default incompatible bond
  return {
    success: false,
    reason: `Incompatible orbital overlap: ${tokenA.name} (${tokenA.formula}) cannot spontaneously couple with ${tokenB.name} (${tokenB.formula}) under standard laboratory conditions.`,
    vietnameseReason: `Orbital không tương thích: ${tokenA.vietnameseName} (${tokenA.formula}) không thể liên kết trực tiếp với ${tokenB.vietnameseName} (${tokenB.formula}) trong điều kiện thường.`
  };
}

/**
 * Calls Gemini AI to generate dynamic, witty failure commentary from Professor Lucy.
 */
export async function getDynamicLucyFailureExplanation(
  tokenA: OrganicTokenData, 
  tokenB: OrganicTokenData, 
  isVi: boolean
): Promise<string> {
  const deterministic = generateDeterministicFailure(tokenA, tokenB);
  const fallback = isVi ? deterministic.vietnameseReason! : deterministic.reason!;

  try {
    const storeKey = useSimulationStore.getState().apiKey;
    const activeKey = storeKey || 'AIzaSyD_HG86cparkxU6igrfeT5aRdKNhClvN2Q';
    const genAI = new GoogleGenAI({ apiKey: activeKey });

    const prompt = isVi
      ? `Em là Giáo sư Lucy, chuyên gia Hóa học AI dí dỏm và thông tuệ. Một học sinh trong phòng thí nghiệm vừa cố gắng ghép nối 2 mảnh phân tử: "${tokenA.vietnameseName}" (${tokenA.formula}) và "${tokenB.vietnameseName}" (${tokenB.formula}).
Hãy giải thích ngắn gọn trong đúng 1-2 câu ngắn, bằng giọng điệu sắc sảo, đáng yêu của cô giáo Lucy, vì sao 2 mảnh này trong hóa học thực tế KHÔNG THỂ tạo thành một liên kết bền vững (do bão hòa hóa trị, độ âm điện, hay thiếu mạch cacbon). Không dài dòng.`
      : `You are Professor Lucy, a brilliant and slightly witty AI chemistry mentor. A student on the molecular workbench just tried to plug together: "${tokenA.name}" (${tokenA.formula}) and "${tokenB.name}" (${tokenB.formula}).
Explain in exactly 1-2 short, witty, educational sentences why real organic chemistry prohibits this bond (e.g. valence saturation, electronegativity repulsion, or lack of a carbon backbone). Keep it punchy.`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.5,
      }
    });

    if (response.text && response.text.trim().length > 10) {
      return response.text.trim();
    }
    return fallback;
  } catch (err) {
    console.warn('[Organic Sandbox] Gemini dynamic critique failed, using deterministic critique:', err);
    return fallback;
  }
}
