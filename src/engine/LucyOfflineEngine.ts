/**
 * @file LucyOfflineEngine.ts
 * Standalone Offline Chemistry Knowledge Engine for Professor Lucy.
 * Provides rich, authoritative, professor-grade chemistry intelligence,
 * real-time workbench container diagnostics, safety auditing, reaction prediction,
 * and encyclopedic chemistry QA without requiring an external Gemini API key.
 */

import { CHEMICAL_REGISTRY, REACTION_RULES } from '../data/ChemicalRegistry';
import { THERMAL_DATABASE, calculateEffectiveBoilingPoint } from './ThermodynamicEngine';
import { PERIODIC_TABLE_DATA } from '../data/PeriodicTableData';
import { SUBSTANCE_STRUCTURES } from '../data/ChemicalStructureData';

export interface LabContainerState {
  id: number;
  volume: number;
  pH: string;
  contents: Record<string, number>;
  temperature: number;
}

// Curated Socratic challenges for interactive offline engagement
const OFFLINE_CHALLENGES = [
  {
    EN: "Challenge Time, Researcher! If you have a solution with a pH of 3.0, and you dilute it with pure distilled water by a factor of 10, what will the new pH be? (Hint: Consider the logarithmic definition of hydronium concentration [H⁺]).",
    VN: "Thử thách đây, Nhà nghiên cứu! Nếu em có một dung dịch với pH = 3.0, và em pha loãng nó với nước cất tinh khiết 10 lần, thì pH mới sẽ là bao nhiêu? (Gợi ý: Hãy nghĩ về định nghĩa logarit của nồng độ ion [H⁺])."
  },
  {
    EN: "Here is a quick quiz for you! Why does Water (H₂O) have a much higher boiling point (100°C) than Hydrogen Sulfide (H₂S, -60°C), even though Sulfur is much heavier than Oxygen? (Hint: Think about intermolecular forces and electronegativity!).",
    VN: "Câu hỏi nhanh cho em đây! Tại sao Nước (H₂O) lại có nhiệt độ sôi cao hơn nhiều (100°C) so với Khí Hiđro Sunfua (H₂S, -60°C), mặc dù Lưu huỳnh nặng hơn Oxy rất nhiều? (Gợi ý: Hãy chú ý đến lực liên kết giữa các phân tử và độ âm điện!)."
  },
  {
    EN: "Professor Lucy's pop quiz: When Hydrochloric Acid (HCl) reacts with Sodium Hydroxide (NaOH), why does the temperature of the beaker rise? What type of thermodynamic reaction is this?",
    VN: "Câu hỏi của Cô Lucy: Khi Axit Clohiđric (HCl) phản ứng với Natri Hiđroxit (NaOH), tại sao nhiệt độ của cốc lại tăng lên? Đây là loại phản ứng nhiệt động học gì?"
  },
  {
    EN: "Organic Chemistry Challenge: How can you chemically distinguish between an Alkane (like Hexane) and an Alkene (like Hexene) using simple laboratory reagents? (Hint: Think about halogen addition with Bromine water!).",
    VN: "Thử thách Hóa Hữu cơ: Làm thế nào để phân biệt bằng phương pháp hóa học giữa một Ankan (như Hexan) và một Anken (như Hexen) bằng thuốc thử phòng thí nghiệm thông thường? (Gợi ý: Nghĩ về phản ứng cộng halogen với nước Brom!)."
  }
];

export interface OrganicSandboxContext {
  boardTokens?: { name: string; vietnameseName?: string; formula: string; category?: string }[];
  discoveredCount?: number;
  totalCount?: number;
  remainingTargets?: { name: string; vietnameseName?: string; formula?: string }[];
  suggestedHint?: string;
  recentFailureReason?: string;
}

/**
 * Generates an intelligent, context-aware chemistry response
 * entirely offline using the local compiled knowledge base.
 */
export function generateOfflineLucyResponse(
  userQuery: string,
  containers: LabContainerState[] = [],
  language: string = 'en',
  env: { temp: number; pressure: number } = { temp: 25, pressure: 1.0 },
  organicContext?: OrganicSandboxContext
): string {
  const isVi = String(language).toLowerCase().includes('v');
  const q = userQuery.toLowerCase().trim();

  // 0. ORGANIC SANDBOX SPECIFIC INTENTS
  if (organicContext) {
    if (q.includes('hint') || q.includes('gợi ý') || q.includes('next') || q.includes('chất tiếp') || q.includes('chế tạo gì')) {
      if (organicContext.suggestedHint) {
        return `[LUCY OFFLINE DATABANK]\n\n💡 ${organicContext.suggestedHint}`;
      }
    }

    if (q.includes('board') || q.includes('bàn') || q.includes('analyze') || q.includes('soi') || q.includes('đang có')) {
      const tokens = organicContext.boardTokens || [];
      if (tokens.length === 0) {
        return isVi
          ? `[LUCY OFFLINE DATABANK]\n\nTrên bàn ghép phân tử hiện đang trống trơn! Em hãy kéo các mảnh gốc như **Methyl (—CH₃)**, **Ethyl (—C₂H₅)**, hoặc nhóm chức **Hydroxyl (—OH)** từ thư viện bên phải ra bàn nhé!`
          : `[LUCY OFFLINE DATABANK]\n\nYour molecular workbench is currently empty! Drag fragments such as **Methyl (—CH₃)**, **Ethyl (—C₂H₅)**, or functional groups like **Hydroxyl (—OH)** from the library to begin!`;
      }

      const list = tokens.map(t => `• **${isVi ? (t.vietnameseName || t.name) : t.name}** (\`${t.formula}\`)`).join('\n');
      return isVi
        ? `[LUCY OFFLINE DATABANK]\n\n📋 **CÁC MẢNH PHÂN TỬ TRÊN BÀN HIỆN TẠI** (${tokens.length} mảnh):\n${list}\n\n👉 *Gợi ý*: Hãy kéo 2 mảnh có hóa trị phù hợp lại gần nhau để kích hoạt hiệu ứng hút nam châm và ghép thành hợp chất mới!`
        : `[LUCY OFFLINE DATABANK]\n\n📋 **CURRENT WORKBENCH FRAGMENTS** (${tokens.length} items):\n${list}\n\n👉 *Tip*: Drag complementary fragments close to each other to initiate magnetic proximity snapping and trigger synthesis!`;
    }

    if (q.includes('fail') || q.includes('thất bại') || q.includes('không ghép được') || q.includes('tại sao')) {
      if (organicContext.recentFailureReason) {
        return `[LUCY OFFLINE DATABANK]\n\n⚠️ ${organicContext.recentFailureReason}`;
      }
      return isVi
        ? `[LUCY OFFLINE DATABANK]\n\n⚠️ **Quy tắc ghép phân tử hữu cơ**:\n1. Các gốc tự do (như Methyl, Ethyl, Phenyl...) có hóa trị 1 hoặc 2, cần ghép vào nhóm chức hoặc gốc khác có vị trí liên kết trống.\n2. Phân tử đã bão hòa (hóa trị 0 như Metan, Etan, Nước) không thể tự ghép thêm nếu không có chất khơi mào hoặc phản ứng thế.\n3. Hãy thử ghép một gốc ankyl với một nhóm chức (ví dụ: Ethyl + Hydroxyl ➔ Ethanol)!`
        : `[LUCY OFFLINE DATABANK]\n\n⚠️ **Organic Synthesis Valence Rules**:\n1. Radicals (such as Methyl, Ethyl, Phenyl) have open valences (1 or 2) and must pair with complementary bonding sites.\n2. Complete stable molecules (valence 0 like Methane, Water) cannot couple directly without catalysts.\n3. Try coupling an alkyl radical with a functional group (e.g. Ethyl + Hydroxyl ➔ Ethanol)!`;
    }
  }

  // 1. STATUS REPORT REQUEST
  if (
    q.includes('status') || 
    q.includes('báo cáo') || 
    q.includes('what is in my container') || 
    q.includes('trong cốc') || 
    q.includes('tổng quan') ||
    q.includes('report')
  ) {
    return generateWorkbenchStatusReport(containers, isVi, env);
  }

  // 2. SAFETY CHECK REQUEST
  if (
    q.includes('safe') || 
    q.includes('an toàn') || 
    q.includes('hazard') || 
    q.includes('nguy hiểm') || 
    q.includes('warning') || 
    q.includes('cảnh báo')
  ) {
    return generateSafetyAudit(containers, isVi, env);
  }

  // 3. CHALLENGE / QUIZ REQUEST
  if (
    q.includes('challenge') || 
    q.includes('đố') || 
    q.includes('quiz') || 
    q.includes('hỏi tôi') || 
    q.includes('test me')
  ) {
    const randomChallenge = OFFLINE_CHALLENGES[Math.floor(Math.random() * OFFLINE_CHALLENGES.length)];
    return isVi ? `[LUCY OFFLINE DATABANK]\n\n${randomChallenge.VN}` : `[LUCY OFFLINE DATABANK]\n\n${randomChallenge.EN}`;
  }

  // 4. THERMODYNAMICS: BOILING, FREEZING, STEAM, PRESSURE
  if (
    q.includes('boil') || 
    q.includes('sôi') || 
    q.includes('freeze') || 
    q.includes('đông đá') || 
    q.includes('băng') || 
    q.includes('steam') || 
    q.includes('hơi nước') || 
    q.includes('pressure') || 
    q.includes('áp suất') || 
    q.includes('temperature') || 
    q.includes('nhiệt độ')
  ) {
    return generateThermodynamicsAnswer(q, isVi, env);
  }

  // 5. CHEMICAL REACTION & MIXING INQUIRY
  if (
    q.includes('mix') || 
    q.includes('trộn') || 
    q.includes('react') || 
    q.includes('phản ứng') || 
    q.includes('what happens') || 
    q.includes('điều gì xảy ra')
  ) {
    return generateReactionPrediction(q, isVi, containers);
  }

  // 6. SPECIFIC CHEMICAL SUBSTANCE INQUIRY
  const matchedChemical = findChemicalInQuery(q);
  if (matchedChemical) {
    return generateChemicalDossier(matchedChemical, isVi, env);
  }

  // 7. PERIODIC TABLE & ELEMENT LOOKUP
  const matchedElement = findElementInQuery(q);
  if (matchedElement) {
    return generateElementDossier(matchedElement, isVi);
  }

  // 8. ORGANIC CHEMISTRY INQUIRY
  if (
    q.includes('organic') || 
    q.includes('hữu cơ') || 
    q.includes('alkane') || 
    q.includes('ankan') || 
    q.includes('alkene') || 
    q.includes('anken') || 
    q.includes('alkyne') || 
    q.includes('ankin') || 
    q.includes('alcohol') || 
    q.includes('ancol') || 
    q.includes('ester') || 
    q.includes('este') || 
    q.includes('acid') || 
    q.includes('axit')
  ) {
    return generateOrganicChemistryAnswer(q, isVi);
  }

  // 9. GENERAL PROFESSOR LUCY GREETING OR INTRO
  if (
    q.includes('who are you') || 
    q.includes('bạn là ai') || 
    q.includes('cô là ai') || 
    q.includes('hello') || 
    q.includes('xin chào') || 
    q.includes('hi')
  ) {
    return isVi
      ? `[LUCY OFFLINE DATABANK]\n\nChào em! Tôi là Giáo sư Lucy, người cố vấn Hóa học AI của Quantum Reality Engine. Hiện tại tôi đang kích hoạt **Kho Tri thức Cục bộ (Offline Mode)** với đầy đủ dữ liệu phòng thí nghiệm, nhiệt động học và phản ứng hóa học. Em cần tôi phân tích tình trạng bàn thí nghiệm hay giải đáp nguyên lý hóa học nào?`
      : `[LUCY OFFLINE DATABANK]\n\nGreetings, researcher! I am Professor Lucy, the AI Chemistry Mentor of the Quantum Reality Engine. I am currently operating on my **Offline Quantum Knowledge Core**, equipped with comprehensive chemical registries, thermodynamic physics, and reaction mechanics. How may I assist your scientific investigations today?`;
  }

  // DEFAULT COMPREHENSIVE ANSWER
  return isVi
    ? `[LUCY OFFLINE DATABANK]\n\nTôi đã ghi nhận câu hỏi của em: "${userQuery}".\n\nTrong chế độ Ngoại tuyến (Offline Databank), tôi có thể hỗ trợ em toàn diện về:\n- **Báo cáo trạng thái bàn thí nghiệm** (Thử nhấn nút 'Status Report')\n- **Kiểm tra an toàn hóa chất & bảo hộ** (Nút 'Safety Check')\n- **Nhiệt động học**: Độ sôi (${env.temp}°C), đóng băng, áp suất khí quyển (${env.pressure.toFixed(1)} atm)\n- **Phương trình phản ứng** giữa các hóa chất (HCl, NaOH, CuSO₄, Axit H₂SO₄, Cồn...)\n- **Bảng tuần hoàn & Cấu hình electron** của tất cả các nguyên tố.\n\nHãy cho tôi biết em muốn tìm hiểu phần nào nhé!`
    : `[LUCY OFFLINE DATABANK]\n\nI have received your inquiry: "${userQuery}".\n\nWhile running on the Local Offline Databank, I am fully equipped to assist you with:\n- **Live Workbench Status Reports** (Click 'Status Report')\n- **Hazard & Laboratory Safety Audits** (Click 'Safety Check')\n- **Thermodynamic Phase Transitions**: Boiling points (${env.temp}°C), freezing, and pressure variations (${env.pressure.toFixed(1)} atm)\n- **Reaction Mechanisms & Equations** (Neutralization, precipitation, redox, esterification)\n- **Periodic Table & Electron Configurations** for all elements.\n\nWhat specific chemical phenomenon would you like to investigate?`;
}

// -----------------------------------------------------------------------------
// HELPER GENERATORS
// -----------------------------------------------------------------------------

function generateWorkbenchStatusReport(
  containers: LabContainerState[], 
  isVi: boolean, 
  env: { temp: number; pressure: number }
): string {
  if (!containers || containers.length === 0) {
    return isVi
      ? `[LUCY OFFLINE DATABANK]\n\n**Báo cáo Hiện trường Phòng Thí nghiệm**:\nHiện tại chưa có dụng cụ thủy tinh nào trên bàn thao tác. Em hãy kéo một **Cốc Thủy Tinh (Beaker)** hoặc **Bình Tam Giác (Flask)** từ ngăn Dụng cụ ra bàn nhé!`
      : `[LUCY OFFLINE DATABANK]\n\n**Workbench Status Report**:\nThere are currently no active glassware vessels on the laboratory table. Drag a **Beaker** or **Erlenmeyer Flask** from the Equipment Dock to begin!`;
  }

  const reports: string[] = [];
  containers.forEach((c, idx) => {
    const label = c.id === 0 ? 'Alpha' : c.id === 1 ? 'Beta' : c.id === 2 ? 'Gamma' : `Container ${c.id}`;
    const vol = c.volume || 0;
    const phVal = Number(c.pH || 7.0);

    let phDesc = isVi ? 'Trung tính' : 'Neutral';
    if (phVal < 3.0) phDesc = isVi ? 'Axit rất mạnh' : 'Strongly Acidic';
    else if (phVal < 6.5) phDesc = isVi ? 'Axit nhẹ' : 'Mildly Acidic';
    else if (phVal > 11.5) phDesc = isVi ? 'Bazơ/Kiềm rất mạnh' : 'Strongly Alkaline';
    else if (phVal > 7.5) phDesc = isVi ? 'Bazơ nhẹ' : 'Mildly Alkaline';

    const chemicalList = Object.entries(c.contents || {});
    let chemDesc = '';
    if (chemicalList.length === 0 || vol <= 0) {
      chemDesc = isVi ? '_Trống (Empty)_' : '_Empty_';
    } else {
      chemDesc = chemicalList
        .map(([id, amount]) => {
          const reg = CHEMICAL_REGISTRY[id];
          const name = reg ? (isVi ? reg.name.VN : reg.name.EN) : id;
          return `${name}: ${amount.toFixed(1)} mL`;
        })
        .join(', ');
    }

    // Thermodynamic state for this container
    let thermalState = '';
    if (env.temp <= 0 && vol > 0) {
      thermalState = isVi ? '❄️ **Đông đặc thể rắn (Frozen Solid)**' : '❄️ **Frozen Solid Matrix**';
    } else if (env.temp >= 100 && vol > 0) {
      thermalState = isVi ? '♨️ **Đang sôi mãnh liệt (Vigorously Boiling)**' : '♨️ **Vigorously Boiling with Steam**';
    } else {
      thermalState = isVi ? `🌡️ Thể lỏng cân bằng (${env.temp}°C)` : `🌡️ Equilibrium Liquid (${env.temp}°C)`;
    }

    if (isVi) {
      reports.push(
        `**Dụng cụ [${label}]**:\n- Thể tích: **${vol} mL** / 100 mL\n- Chỉ số pH: **${phVal.toFixed(1)}** (${phDesc})\n- Thành phần: ${chemDesc}\n- Trạng thái vật lý: ${thermalState}`
      );
    } else {
      reports.push(
        `**Vessel [${label}]**:\n- Volume: **${vol} mL** / 100 mL\n- pH Level: **${phVal.toFixed(1)}** (${phDesc})\n- Composition: ${chemDesc}\n- Physical State: ${thermalState}`
      );
    }
  });

  const header = isVi 
    ? `[LUCY OFFLINE DATABANK]\n\n### 📋 BÁO CÁO PHÒNG THÍ NGHIỆM CHI TIẾT\n*Điều kiện môi trường: ${env.temp}°C | Áp suất: ${env.pressure.toFixed(1)} atm*\n\n`
    : `[LUCY OFFLINE DATABANK]\n\n### 📋 DETAILED WORKBENCH STATUS REPORT\n*Environmental Matrix: ${env.temp}°C | Pressure: ${env.pressure.toFixed(1)} atm*\n\n`;

  return header + reports.join('\n\n');
}

function generateSafetyAudit(
  containers: LabContainerState[], 
  isVi: boolean, 
  env: { temp: number; pressure: number }
): string {
  const hazards: string[] = [];

  // Check temperature hazards
  if (env.temp >= 100) {
    hazards.push(
      isVi 
        ? `🔥 **CẢNH BÁO NHIỆT ĐỘ CAO (${env.temp}°C)**: Dung dịch trong bình đang sôi và bốc hơi nhanh. Hãy cẩn thận nguy cơ bỏng nhiệt và hít phải hơi hóa chất!` 
        : `🔥 **HIGH TEMPERATURE ALERT (${env.temp}°C)**: Solutions are actively boiling. High scalding risk and thermal expansion vapor release!`
    );
  } else if (env.temp <= 0) {
    hazards.push(
      isVi 
        ? `❄️ **CẢNH BÁO BĂNG GIÁ (${env.temp}°C)**: Dung dịch đã đóng băng thành khối rắn. Không thể thực hiện thao tác rót cho đến khi nâng nhiệt độ.` 
        : `❄️ **CRYOGENIC FREEZING ALERT (${env.temp}°C)**: Solutions are completely frozen into a solid crystalline lattice. Liquid pouring is disabled.`
    );
  }

  // Check chemical hazards in all containers
  let hasAcid = false;
  let hasBase = false;
  let hasFlammable = false;
  let hasToxic = false;

  containers.forEach(c => {
    Object.keys(c.contents || {}).forEach(chemId => {
      const chem = CHEMICAL_REGISTRY[chemId];
      if (!chem) return;
      if (chem.hazards?.includes('corrosive') || ['HCl', 'HNO3', 'H2SO4'].includes(chemId)) hasAcid = true;
      if (chem.hazards?.includes('corrosive') || ['NaOH', 'KOH'].includes(chemId)) hasBase = true;
      if (chem.hazards?.includes('flammable') || ['ETHANOL', 'HEXANE'].includes(chemId)) hasFlammable = true;
      if (chem.hazards?.includes('toxic') || ['BROMINE', 'AMMONIA'].includes(chemId)) hasToxic = true;
    });
  });

  if (hasAcid) {
    hazards.push(
      isVi 
        ? `⚠️ **AXIT ĂN MÒN (CORROSIVE ACID)**: Phát hiện axit đậm đặc. Tuyệt đối không để dung dịch tiếp xúc với da hoặc mắt. Đeo kính bảo hộ và găng tay nitrile!` 
        : `⚠️ **CORROSIVE ACID HAZARD**: Strong mineral acids detected. Severe chemical burn hazard to epithelial tissues. Eye protection and nitrile gloves mandatory!`
    );
  }

  if (hasBase) {
    hazards.push(
      isVi 
        ? `⚠️ **BAZƠ KIỀM MẠNH (CAUSTIC BASE)**: Các bazơ như NaOH/KOH gây xà phòng hóa mô và cực kỳ nguy hiểm cho giác mạc nếu bắn vào mắt.` 
        : `⚠️ **CAUSTIC ALKALINE HAZARD**: Strong bases detected. Causes deep saponification burns. Flush immediately with copious water if contact occurs.`
    );
  }

  if (hasFlammable) {
    hazards.push(
      isVi 
        ? `⚡ **CHẤT LỎNG DỄ CHÁY (FLAMMABLE)**: Dung môi hữu cơ (Cồn, Hexan) có áp suất hơi cao. Giữ xa nguồn đánh lửa và nhiệt độ quá cao.` 
        : `⚡ **FLAMMABLE VOLATILE ORGANICS**: Flammable vapors present. Keep containers away from open flames and rapid thermal ignition sources.`
    );
  }

  if (hasToxic) {
    hazards.push(
      isVi 
        ? `☣️ **HƠI KHÍ ĐỘC HẠI (TOXIC FUMES)**: Phát hiện Brom hoặc Amoniac có khả năng giải phóng khí độc. Cần thao tác trong tủ hút khí độc!` 
        : `☣️ **TOXIC VAPOR EVOLUTION**: Hazardous vapor evolution detected (Bromine/Ammonia). Operate strictly within a certified fume extraction hood!`
    );
  }

  if (hazards.length === 0) {
    hazards.push(
      isVi 
        ? `✅ **MÔI TRƯỜNG AN TOÀN**: Không phát hiện rủi ro nghiêm trọng trên bàn thí nghiệm. Tuy nhiên luôn tuân thủ nguyên tắc đeo kính và áo blouse bảo hộ!` 
        : `✅ **SAFETY PARAMETERS NOMINAL**: No critical chemical or physical hazards detected on the workbench. Standard laboratory PPE remains recommended!`
    );
  }

  const title = isVi ? `[LUCY OFFLINE DATABANK]\n\n### 🛡️ BÁO CÁO AN TOÀN HÓA HỌC (SAFETY AUDIT)\n\n` : `[LUCY OFFLINE DATABANK]\n\n### 🛡️ LABORATORY SAFETY AUDIT PROTOCOL\n\n`;
  return title + hazards.join('\n\n');
}

function generateThermodynamicsAnswer(
  query: string, 
  isVi: boolean, 
  env: { temp: number; pressure: number }
): string {
  if (isVi) {
    return `[LUCY OFFLINE DATABANK]\n\n### ♨️ NGUYÊN LÝ NHIỆT ĐỘNG HỌC & CHUYỂN PHA\n\n` +
      `1. **Hiện tượng Sôi (Boiling)**: Chất lỏng sôi khi áp suất hơi bão hòa của nó bằng với áp suất khí quyển bên ngoài.\n` +
      `- Ở áp suất tiêu chuẩn (1.0 atm), Nước tinh khiết sôi ở **100.0°C**, Cồn Ethanol sôi ở **78.4°C**, Hexan sôi ở **68.7°C**.\n` +
      `- Khi nhiệt độ đạt hoặc vượt điểm sôi, các bọt khí hình thành từ đáy bình, nổi lên mặt thoáng và bốc thành hơi nước bay lên.\n\n` +
      `2. **Ảnh hưởng của Áp suất (Phương trình Clausius-Clapeyron)**:\n` +
      `- Hiện tại áp suất đang là **${env.pressure.toFixed(1)} atm**.\n` +
      `- Khi hạ áp suất xuống thấp (ví dụ 0.1 atm trong điều kiện chân không), nhiệt độ sôi của nước giảm xuống chỉ còn khoảng **45°C** (Sôi chân không).\n` +
      `- Ngược lại, trong nồi áp suất (3.0 atm), nước có thể duy trì thể lỏng tới **145°C**!\n\n` +
      `3. **Hiện tượng Đông đặc (Freezing)**:\n` +
      `- Khi nhiệt độ $\\le 0.0^\\circ\\text{C}$, các phân tử nước liên kết hydro tạo mạng tinh thể lục giác mở, hóa rắn hoàn toàn thành băng và cố định thể tích.`;
  }

  return `[LUCY OFFLINE DATABANK]\n\n### ♨️ THERMODYNAMIC PHASE TRANSITIONS & EQUILIBRIA\n\n` +
    `1. **Boiling Mechanics**: A liquid boils when its internal vapor pressure equals the external atmospheric pressure.\n` +
    `- At standard pressure (1.0 atm), Distilled Water boils at **100.0°C**, Ethanol at **78.4°C**, and Hexane at **68.7°C**.\n` +
    `- At $T \\ge T_{\\text{boil}}$, bubbles nucleate vigorously at the vessel base, rising to burst at the meniscus and venting rising vapor clouds.\n\n` +
    `2. **Pressure Sensitivity (Clausius-Clapeyron Equation)**:\n` +
    `- Current workbench pressure: **${env.pressure.toFixed(1)} atm**.\n` +
    `- In vacuum environments ($0.1\\text{ atm}$), water boils rapidly near room temperature ($\\approx 45^\\circ\\text{C}$).\n` +
    `- In pressurized autoclaves ($3.0\\text{ atm}$), the boiling point is elevated to $\\approx 145^\\circ\\text{C}$!\n\n` +
    `3. **Cryogenic Freezing Point**:\n` +
    `- At temperatures $\\le 0.0^\\circ\\text{C}$, intermolecular hydrogen bonding locks water molecules into an open hexagonal ice lattice, immobilizing the fluid.`;
}

function generateReactionPrediction(query: string, isVi: boolean, containers: LabContainerState[]): string {
  // Neutralization
  if ((query.includes('hcl') || query.includes('acid') || query.includes('axit')) && (query.includes('naoh') || query.includes('base') || query.includes('bazo'))) {
    return isVi
      ? `[LUCY OFFLINE DATABANK]\n\n### 💥 PHẢN ỨNG TRUNG HÒA AXIT - BAZƠ\n\n` +
        `$$\\text{HCl} + \\text{NaOH} \\longrightarrow \\text{NaCl} + \\text{H}_2\\text{O} + \\Delta H$$\n\n` +
        `- **Hiện tượng**: Dung dịch tỏa nhiệt mạnh (phản ứng tỏa nhiệt), chỉ số pH tiến dần về **7.0 (Trung tính)**.\n` +
        `- **Bản chất ion thu gọn**: $\\text{H}^+ + \\text{OH}^- \\longrightarrow \\text{H}_2\\text{O}$\n` +
        `- **Sản phẩm**: Muối ăn Natri Clorua tan hoàn toàn trong nước, không tạo kết tủa hay khí.`
      : `[LUCY OFFLINE DATABANK]\n\n### 💥 ACID-BASE NEUTRALIZATION REACTION\n\n` +
        `$$\\text{HCl} + \\text{NaOH} \\longrightarrow \\text{NaCl} + \\text{H}_2\\text{O} + \\Delta H$$\n\n` +
        `- **Phenomenon**: Highly exothermic reaction causing solution temperature to rise; pH equilibrates towards **7.0 (Neutral)**.\n` +
        `- **Net Ionic Equation**: $\\text{H}^+ + \\text{OH}^- \\longrightarrow \\text{H}_2\\text{O}$\n` +
        `- **Resulting Solution**: Aqueous Sodium Chloride ($NaCl$). No precipitate or gaseous effervescence.`;
  }

  // Precipitation (CuSO4 + NaOH)
  if (query.includes('cuso4') || query.includes('copper') || query.includes('đồng')) {
    return isVi
      ? `[LUCY OFFLINE DATABANK]\n\n### 🧪 PHẢN ỨNG TẠO KẾT TỦA ĐỒNG (II) HIĐROXIT\n\n` +
        `$$\\text{CuSO}_4 + 2\\text{NaOH} \\longrightarrow \\text{Cu(OH)}_2 \\downarrow + \\text{Na}_2\\text{SO}_4$$\n\n` +
        `- **Hiện tượng**: Xuất hiện ngay lập tức chất kết tủa dạng keo màu **xanh lam đậm** (Cu(OH)₂).\n` +
        `- **Bản chất ion**: $\\text{Cu}^{2+} + 2\\text{OH}^- \\longrightarrow \\text{Cu(OH)}_2 \\downarrow$\n` +
        `- **Ứng dụng**: Phản ứng định tính phát hiện ion đồng $\\text{Cu}^{2+}$ và thuốc thử Biuret trong phân tích hóa sinh.`
      : `[LUCY OFFLINE DATABANK]\n\n### 🧪 CUPRIC HYDROXIDE PRECIPITATION REACTION\n\n` +
        `$$\\text{CuSO}_4 + 2\\text{NaOH} \\longrightarrow \\text{Cu(OH)}_2 \\downarrow + \\text{Na}_2\\text{SO}_4$$\n\n` +
        `- **Phenomenon**: Immediate precipitation of a gelatinous, vivid **royal blue solid** ($Cu(OH)_2$).\n` +
        `- **Net Ionic Equation**: $\\text{Cu}^{2+} + 2\\text{OH}^- \\longrightarrow \\text{Cu(OH)}_2 \\downarrow$\n` +
        `- **Analytical Use**: Diagnostic test for $Cu^{2+}$ cations and basis for the Biuret test in biochemistry.`;
  }

  // General synthesis
  return isVi
    ? `[LUCY OFFLINE DATABANK]\n\n### ⚗️ QUY TẮC TỔNG HỢP PHẢN ỨNG HÓA HỌC\n\n` +
      `Để phản ứng diễn ra trong phòng thí nghiệm ảo:\n` +
      `1. Em có thể rót từ cốc này sang cốc khác bằng cách kéo một cốc đến gần cốc kia.\n` +
      `2. Thử nghiệm phản ứng trung hòa (HCl + NaOH), phản ứng tạo kết tủa (CuSO₄ + NaOH), hoặc oxi hóa khử với KMnO₄!\n` +
      `3. Em muốn dự đoán phản ứng giữa 2 chất cụ thể nào? Hãy nêu tên hóa chất để cô Lucy hướng dẫn chi tiết nhé!`
    : `[LUCY OFFLINE DATABANK]\n\n### ⚗️ CHEMICAL SYNTHESIS & REACTION MECHANISMS\n\n` +
      `To trigger reactions on the virtual workbench:\n` +
      `1. Pour reagents between containers by dragging one vessel over another.\n` +
      `2. Test classic reactions: Neutralization ($HCl + NaOH$), Precipitation ($CuSO_4 + NaOH$), or Redox oxidation with $KMnO_4$!\n` +
      `3. Which specific pair of reagents would you like to combine? Specify their names and I will break down the molecular mechanism for you!`;
}

function findChemicalInQuery(q: string): string | null {
  const map: Record<string, string> = {
    'water': 'DISTILLED_WATER',
    'nước': 'DISTILLED_WATER',
    'h2o': 'DISTILLED_WATER',
    'ethanol': 'ETHANOL',
    'cồn': 'ETHANOL',
    'alcohol': 'ETHANOL',
    'rượu': 'ETHANOL',
    'hcl': 'HCl',
    'hydrochloric': 'HCl',
    'clohidric': 'HCl',
    'naoh': 'NaOH',
    'sodium hydroxide': 'NaOH',
    'natri hidroxit': 'NaOH',
    'kiềm': 'NaOH',
    'h2so4': 'H2SO4',
    'sulfuric': 'H2SO4',
    'sunfuric': 'H2SO4',
    'bromine': 'BROMINE',
    'brom': 'BROMINE',
    'br2': 'BROMINE',
    'kmno4': 'POTASSIUM_PERMANGANATE',
    'thuốc tím': 'POTASSIUM_PERMANGANATE',
    'permanganate': 'POTASSIUM_PERMANGANATE',
    'ammonia': 'AMMONIA',
    'amoniac': 'AMMONIA',
    'nh3': 'AMMONIA',
    'cuso4': 'COPPER_SULFATE',
    'copper sulfate': 'COPPER_SULFATE',
    'đồng sunfat': 'COPPER_SULFATE'
  };

  for (const [key, id] of Object.entries(map)) {
    if (q.includes(key)) return id;
  }
  return null;
}

function generateChemicalDossier(chemId: string, isVi: boolean, env: { temp: number; pressure: number }): string {
  const reg = CHEMICAL_REGISTRY[chemId];
  const thermal = THERMAL_DATABASE[chemId];
  const struct = SUBSTANCE_STRUCTURES[chemId];

  const name = reg ? (isVi ? reg.name.VN : reg.name.EN) : chemId;
  const formula = reg?.formula || 'N/A';
  const bp = thermal ? thermal.boilingPoint : 100;
  const fp = thermal ? thermal.freezingPoint : 0;
  const effBp = calculateEffectiveBoilingPoint(bp, env.pressure);
  const configText = struct 
    ? (isVi ? struct.electronConfig.full.VN : struct.electronConfig.full.EN) 
    : (isVi ? 'Cấu trúc hóa trị tiêu chuẩn' : 'Standard valence configuration');

  if (isVi) {
    return `[LUCY OFFLINE DATABANK]\n\n### 🔬 HỒ SƠ HÓA CHẤT: ${name} (${formula})\n\n` +
      `- **Công thức phân tử**: ${formula}\n` +
      `- **Điểm sôi chuẩn**: **${bp}°C** (Tại ${env.pressure.toFixed(1)} atm: **${effBp}°C**)\n` +
      `- **Điểm đông đặc**: **${fp}°C**\n` +
      `- **Mô tả tính chất**: ${reg?.description?.VN || 'Hóa chất phòng thí nghiệm tinh khiết.'}\n` +
      `- **Cấu hình electron**: ${configText}\n` +
      `- **Cảnh báo an toàn**: ${reg?.hazards?.join(', ') || 'Cần tuân thủ quy tắc phòng thí nghiệm thông thường.'}`;
  }

  return `[LUCY OFFLINE DATABANK]\n\n### 🔬 CHEMICAL PROFILE: ${name} (${formula})\n\n` +
    `- **Molecular Formula**: ${formula}\n` +
    `- **Standard Boiling Point**: **${bp}°C** (At ${env.pressure.toFixed(1)} atm: **${effBp}°C**)\n` +
    `- **Melting / Freezing Point**: **${fp}°C**\n` +
    `- **Physical Characteristics**: ${reg?.description?.EN || 'Pure analytical laboratory grade reagent.'}\n` +
    `- **Electron Configuration**: ${configText}\n` +
    `- **Safety Profile**: ${reg?.hazards?.join(', ') || 'Standard laboratory handling protocols apply.'}`;
}

function findElementInQuery(q: string): any | null {
  for (const el of PERIODIC_TABLE_DATA) {
    if (
      q.includes(el.name.toLowerCase()) || 
      q.includes(el.name_vi.toLowerCase()) || 
      q.split(/[\s,?!.]+/).includes(el.symbol.toLowerCase())
    ) {
      return el;
    }
  }
  return null;
}

function generateElementDossier(element: any, isVi: boolean): string {
  if (isVi) {
    return `[LUCY OFFLINE DATABANK]\n\n### ⚛️ NGUYÊN TỐ: ${element.name_vi} (${element.symbol}) - Số hiệu ${element.number}\n\n` +
      `- **Ký hiệu hóa học**: **${element.symbol}**\n` +
      `- **Số hiệu nguyên tử (Z)**: **${element.number}**\n` +
      `- **Nguyên tử khối**: **${element.atomic_mass.toFixed(3)} u**\n` +
      `- **Nhóm / Chu kỳ**: Nhóm ${element.group}, Chu kỳ ${element.period} (${element.category_vi || element.category})\n` +
      `- **Cấu hình electron**: \`${element.electron_configuration}\`\n` +
      `- **Độ âm điện**: ${element.electronegativity_pauling ? element.electronegativity_pauling : 'Không xác định'}\n` +
      `- **Đặc điểm**: ${element.summary_vi || element.summary}`;
  }

  return `[LUCY OFFLINE DATABANK]\n\n### ⚛️ ELEMENT DOSSIER: ${element.name} (${element.symbol}) - Atomic No. ${element.number}\n\n` +
    `- **Chemical Symbol**: **${element.symbol}**\n` +
    `- **Atomic Number (Z)**: **${element.number}**\n` +
    `- **Standard Atomic Weight**: **${element.atomic_mass.toFixed(3)} u**\n` +
    `- **Group & Period**: Group ${element.group}, Period ${element.period} (${element.category})\n` +
    `- **Ground-State Electron Config**: \`${element.electron_configuration}\`\n` +
    `- **Pauling Electronegativity**: ${element.electronegativity_pauling ? element.electronegativity_pauling : 'N/A'}\n` +
    `- **Scientific Overview**: ${element.summary}`;
}

function generateOrganicChemistryAnswer(q: string, isVi: boolean): string {
  if (isVi) {
    return `[LUCY OFFLINE DATABANK]\n\n### 🌿 NỀN TẢNG HÓA HỌC HỮU CƠ (ORGANIC CHEMISTRY)\n\n` +
      `1. **Các dãy đồng đẳng Hydrocacbon cơ bản**:\n` +
      `- **Ankan (Alkanes)**: Công thức chung $C_n H_{2n+2}$ (chỉ chứa liên kết đơn bền vững, ví dụ: Metan $CH_4$, Hexan $C_6H_{14}$).\n` +
      `- **Anken (Alkenes)**: Công thức $C_n H_{2n}$ (chứa 1 liên kết đôi $C=C$, phản ứng cộng đặc trưng làm mất màu nước Brom).\n` +
      `- **Ankin (Alkynes)**: Công thức $C_n H_{2n-2}$ (chứa 1 liên kết ba $C \\equiv C$, ví dụ: Axetilen $C_2H_2$).\n\n` +
      `2. **Các nhóm chức quan trọng**:\n` +
      `- **Ancol (Alcohols)**: Chứa nhóm Hiđroxyl $-OH$ (Ethanol $C_2H_5OH$).\n` +
      `- **Axit Cacboxylic**: Chứa nhóm $-COOH$ (Axit Axetic $CH_3COOH$).\n` +
      `- **Este**: Tạo thành từ phản ứng este hóa giữa Axit và Ancol với xúc tác $H_2SO_4$ đặc, thường có mùi thơm hoa quả đặc trưng!`;
  }

  return `[LUCY OFFLINE DATABANK]\n\n### 🌿 ORGANIC CHEMISTRY PRINCIPLES & NOMENCLATURE\n\n` +
    `1. **Fundamental Hydrocarbon Families**:\n` +
    `- **Alkanes**: Saturated hydrocarbons ($C_n H_{2n+2}$) containing only single $\\sigma$-bonds (e.g., Methane $CH_4$, Hexane $C_6H_{14}$).\n` +
    `- **Alkenes**: Unsaturated hydrocarbons ($C_n H_{2n}$) with a $C=C$ double bond; undergo electrophilic addition to decolorize Bromine.\n` +
    `- **Alkynes**: Hydrocarbons ($C_n H_{2n-2}$) featuring a reactive $C \\equiv C$ triple bond (e.g., Acetylene $C_2H_2$).\n\n` +
    `2. **Key Functional Groups**:\n` +
    `- **Hydroxyl Group ($-OH$)**: Alcohols (Ethanol $C_2H_5OH$, high boiling points due to intermolecular hydrogen bonding).\n` +
    `- **Carboxyl Group ($-COOH$)**: Carboxylic acids (Acetic acid $CH_3COOH$, weak organic acids).\n` +
    `- **Ester Linkage ($-COO-$)**: Synthesized via acid-catalyzed Fischer esterification, characterized by pleasant fruity aromas!`;
}
