/**
 * Chemic-AI Quantum Engine - Automated Chemical Equation Balancer & Stoichiometric Solver
 * Solves homogeneous linear systems via exact rational Gaussian elimination.
 * Computes molar mass, stoichiometric proportions, gas volumes (24.79 L/mol at 25°C 1 bar),
 * and generates detailed electron-transfer redox steps.
 */

// Atomic weights for IUPAC elements
export const ATOMIC_WEIGHTS: Record<string, number> = {
    H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999,
    F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06,
    Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996,
    Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38, Ga: 69.723, Ge: 72.63,
    As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
    Nb: 92.906, Mo: 95.95, Tc: 98.0, Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41,
    In: 114.82, Sn: 118.71, Sb: 121.76, Te: 127.60, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33,
    La: 138.91, Ce: 140.12, Pr: 140.91, Nd: 144.24, Sm: 150.36, Eu: 151.96, Gd: 157.25, Tb: 158.93,
    Dy: 162.50, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05, Lu: 174.97, Hf: 178.49, Ta: 180.95,
    W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97, Hg: 200.59, Tl: 204.38,
    Pb: 207.2, Bi: 208.98, Th: 232.04, Pa: 231.04, U: 238.03
};

// Common gas substances under standard laboratory conditions (SLC: 25°C, 1 bar)
export const COMMON_GAS_FORMULAS = new Set([
    'H2', 'O2', 'N2', 'Cl2', 'F2', 'CO2', 'CO', 'NO', 'NO2', 'N2O', 'SO2', 'SO3',
    'NH3', 'CH4', 'C2H2', 'C2H4', 'C2H6', 'C3H8', 'C4H10', 'H2S', 'HCl', 'O3'
]);

// Exact Fraction math helper to prevent floating point inaccuracies during Gaussian elimination
class Fraction {
    n: number; // numerator
    d: number; // denominator

    constructor(n: number, d: number = 1) {
        if (d === 0) throw new Error('Zero division in Fraction');
        if (d < 0) {
            n = -n;
            d = -d;
        }
        const g = Fraction.gcd(Math.abs(n), Math.abs(d));
        this.n = n / g;
        this.d = d / g;
    }

    static gcd(a: number, b: number): number {
        a = Math.round(a);
        b = Math.round(b);
        while (b !== 0) {
            const t = b;
            b = a % b;
            a = t;
        }
        return a === 0 ? 1 : a;
    }

    static lcm(a: number, b: number): number {
        return (a * b) / Fraction.gcd(a, b);
    }

    add(other: Fraction): Fraction {
        return new Fraction(this.n * other.d + other.n * this.d, this.d * other.d);
    }

    sub(other: Fraction): Fraction {
        return new Fraction(this.n * other.d - other.n * this.d, this.d * other.d);
    }

    mul(other: Fraction): Fraction {
        return new Fraction(this.n * other.n, this.d * other.d);
    }

    div(other: Fraction): Fraction {
        return new Fraction(this.n * other.d, this.d * other.n);
    }

    isZero(): boolean {
        return this.n === 0;
    }

    toNumber(): number {
        return this.n / this.d;
    }
}

export interface SubstanceParticipant {
    formula: string;
    cleanFormula: string;
    coefficient: number;
    isProduct: boolean;
    isGas: boolean;
    molarMass: number;
    composition: Record<string, number>;
}

export interface RedoxProfile {
    isRedox: boolean;
    reducingAgent?: string;
    oxidizingAgent?: string;
    oxidationStep?: { EN: string; VN: string };
    reductionStep?: { EN: string; VN: string };
    electronMultiplier?: { red: number; ox: number };
    totalElectronsTransferred?: number;
    notes?: { EN: string; VN: string };
}

export interface BalancedEquationResult {
    rawEquation: string;
    reactants: SubstanceParticipant[];
    products: SubstanceParticipant[];
    balancedLatex: string;
    balancedText: string;
    redox: RedoxProfile;
    error?: string;
}

export interface StoichiometryCalculationRow {
    formula: string;
    coefficient: number;
    isProduct: boolean;
    isGas: boolean;
    molarMass: number;
    moles: number;
    mass: number;
    gasVolume?: number; // Liters at 25°C, 1 bar
}

// Preset classic curriculum redox and stoichiometry reactions
export const PRESET_EQUATIONS: { label: string; equation: string; description: { EN: string; VN: string } }[] = [
    {
        label: 'Fe3O4 + HNO3',
        equation: 'Fe3O4 + HNO3 -> Fe(NO3)3 + NO + H2O',
        description: {
            VN: 'Oxi hóa quặng manhetit Fe3O4 bằng axit nitric đặc/loãng sinh ra khí NO.',
            EN: 'Oxidation of magnetite Fe3O4 with nitric acid producing NO gas.'
        }
    },
    {
        label: 'KMnO4 + HCl',
        equation: 'KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O',
        description: {
            VN: 'Điều chế khí Clo trong phòng thí nghiệm bằng thuốc tím và axit clohiđric đặc.',
            EN: 'Laboratory preparation of chlorine gas using potassium permanganate and concentrated HCl.'
        }
    },
    {
        label: 'Al + HNO3 (N2O)',
        equation: 'Al + HNO3 -> Al(NO3)3 + N2O + H2O',
        description: {
            VN: 'Kim loại nhôm phản ứng với axit nitric loãng tạo khí cười N2O.',
            EN: 'Aluminum metal reacting with dilute nitric acid producing dinitrogen monoxide gas.'
        }
    },
    {
        label: 'Cu + HNO3 (NO2)',
        equation: 'Cu + HNO3 -> Cu(NO3)2 + NO2 + H2O',
        description: {
            VN: 'Đồng tan trong axit nitric đặc sinh ra dung dịch màu xanh và khí NO2 màu nâu đỏ.',
            EN: 'Copper metal dissolving in concentrated HNO3 producing green-blue solution and brown NO2 gas.'
        }
    },
    {
        label: 'FeSO4 + KMnO4 + H2SO4',
        equation: 'FeSO4 + KMnO4 + H2SO4 -> Fe2(SO4)3 + K2SO4 + MnSO4 + H2O',
        description: {
            VN: 'Chuẩn độ pemanganat Fe(II) trong môi trường axit sunfuric làm mất màu tím.',
            EN: 'Permanganate redox titration of Fe(II) in acidic medium with color discharge.'
        }
    },
    {
        label: 'C2H5OH + O2 (Đốt cháy)',
        equation: 'C2H5OH + O2 -> CO2 + H2O',
        description: {
            VN: 'Phản ứng đốt cháy hoàn toàn ancol etylic tỏa nhiều nhiệt lượng.',
            EN: 'Complete combustion of ethanol emitting carbon dioxide, water vapor and thermal energy.'
        }
    },
    {
        label: 'Na2SO3 + KMnO4 + NaHSO4',
        equation: 'Na2SO3 + KMnO4 + NaHSO4 -> Na2SO4 + MnSO4 + K2SO4 + H2O',
        description: {
            VN: 'Phản ứng khử thuốc tím bằng muối sunfit trong môi trường muối axit NaHSO4.',
            EN: 'Reduction of permanganate by sulfite in sodium bisulfate acidic medium.'
        }
    },
    {
        label: 'CaCO3 + HCl',
        equation: 'CaCO3 + HCl -> CaCl2 + CO2 + H2O',
        description: {
            VN: 'Đá vôi tan trong axit clohiđric sủi bọt khí CO2 mạnh mẽ.',
            EN: 'Limestone dissolving in hydrochloric acid releasing carbon dioxide effervescence.'
        }
    }
];

// Curated redox profiles for famous curriculum equations
const CURATED_REDOX_DATA: Record<string, RedoxProfile> = {
    'fe3o4+hno3': {
        isRedox: true,
        reducingAgent: 'Fe3O4 (Fe⁺⁸/³)',
        oxidizingAgent: 'HNO3 (N⁺⁵)',
        oxidationStep: {
            VN: '3Fe⁺⁸/³ ➔ 3Fe⁺³ + 1e  (Quá trình oxi hóa)',
            EN: '3Fe⁺⁸/³ ➔ 3Fe⁺³ + 1e  (Oxidation process)'
        },
        reductionStep: {
            VN: 'N⁺⁵ + 3e ➔ N⁺² (NO)  (Quá trình khử)',
            EN: 'N⁺⁵ + 3e ➔ N⁺² (NO)  (Reduction process)'
        },
        electronMultiplier: { red: 3, ox: 1 },
        totalElectronsTransferred: 3,
        notes: {
            VN: 'Bội số chung nhỏ nhất của electron trao đổi là 3. Nhân hệ số 3 vào Fe3O4 và 1 vào NO, sau đó bảo toàn nguyên tố N và H.',
            EN: 'Least common multiple of transferred electrons is 3. Multiply Fe3O4 by 3 and NO by 1, then balance nitrogen and hydrogen atoms.'
        }
    },
    'kmno4+hcl': {
        isRedox: true,
        reducingAgent: 'HCl (Cl⁻¹)',
        oxidizingAgent: 'KMnO4 (Mn⁺⁷)',
        oxidationStep: {
            VN: '2Cl⁻¹ ➔ Cl₂⁰ + 2e  (Quá trình oxi hóa)',
            EN: '2Cl⁻¹ ➔ Cl₂⁰ + 2e  (Oxidation process)'
        },
        reductionStep: {
            VN: 'Mn⁺⁷ + 5e ➔ Mn⁺²  (Quá trình khử)',
            EN: 'Mn⁺⁷ + 5e ➔ Mn⁺²  (Reduction process)'
        },
        electronMultiplier: { red: 2, ox: 5 },
        totalElectronsTransferred: 10,
        notes: {
            VN: 'Bội số chung nhỏ nhất của electron trao đổi là 10. Nhân hệ số 2 vào KMnO4 và 5 vào Cl2. Trong 16 phân tử HCl thì 10 phân tử đóng vai trò chất khử tạo Cl2 và 6 phân tử đóng vai trò môi trường tạo muối.',
            EN: 'Least common multiple of transferred electrons is 10. Multiply KMnO4 by 2 and Cl2 by 5. Out of 16 HCl molecules, 10 act as reducing agent and 6 form salt environment.'
        }
    },
    'al+hno3': {
        isRedox: true,
        reducingAgent: 'Al (Al⁰)',
        oxidizingAgent: 'HNO3 (N⁺⁵)',
        oxidationStep: {
            VN: 'Al⁰ ➔ Al⁺³ + 3e  (Quá trình oxi hóa)',
            EN: 'Al⁰ ➔ Al⁺³ + 3e  (Oxidation process)'
        },
        reductionStep: {
            VN: '2N⁺⁵ + 8e ➔ N₂⁺¹O  (Quá trình khử)',
            EN: '2N⁺⁵ + 8e ➔ N₂⁺¹O  (Reduction process)'
        },
        electronMultiplier: { red: 8, ox: 3 },
        totalElectronsTransferred: 24,
        notes: {
            VN: 'Bội số chung nhỏ nhất là 24e. Nhân 8 vào Al và 3 vào N2O. Tổng số phân tử HNO3 cần dùng là 30 (24 phân tử tạo muối Al(NO3)3 + 6 phân tử bị khử thành N2O).',
            EN: 'Least common multiple is 24e. Multiply Al by 8 and N2O by 3. Total HNO3 needed is 30 (24 forming nitrate salt + 6 reduced to N2O).'
        }
    },
    'cu+hno3': {
        isRedox: true,
        reducingAgent: 'Cu (Cu⁰)',
        oxidizingAgent: 'HNO3 (N⁺⁵)',
        oxidationStep: {
            VN: 'Cu⁰ ➔ Cu⁺² + 2e  (Quá trình oxi hóa)',
            EN: 'Cu⁰ ➔ Cu⁺² + 2e  (Oxidation process)'
        },
        reductionStep: {
            VN: 'N⁺⁵ + 1e ➔ N⁺⁴O₂  (Quá trình khử)',
            EN: 'N⁺⁵ + 1e ➔ N⁺⁴O₂  (Reduction process)'
        },
        electronMultiplier: { red: 1, ox: 2 },
        totalElectronsTransferred: 2,
        notes: {
            VN: 'Bội số chung là 2e. Nhân 1 vào Cu và 2 vào NO2. Axit nitric đặc tạo khí NO2 màu nâu đỏ độc.',
            EN: 'Least common multiple is 2e. Multiply Cu by 1 and NO2 by 2. Concentrated HNO3 yields toxic reddish-brown NO2 gas.'
        }
    },
    'feso4+kmno4+h2so4': {
        isRedox: true,
        reducingAgent: 'FeSO4 (Fe⁺²)',
        oxidizingAgent: 'KMnO4 (Mn⁺⁷)',
        oxidationStep: {
            VN: 'Fe⁺² ➔ Fe⁺³ + 1e  (Quá trình oxi hóa)',
            EN: 'Fe⁺² ➔ Fe⁺³ + 1e  (Oxidation process)'
        },
        reductionStep: {
            VN: 'Mn⁺⁷ + 5e ➔ Mn⁺²  (Quá trình khử)',
            EN: 'Mn⁺⁷ + 5e ➔ Mn⁺²  (Reduction process)'
        },
        electronMultiplier: { red: 10, ox: 2 },
        totalElectronsTransferred: 10,
        notes: {
            VN: 'Bội số chung là 10e. Cần 10 FeSO4 và 2 KMnO4 trong môi trường 8 H2SO4.',
            EN: 'Least common multiple is 10e. Requires 10 FeSO4 and 2 KMnO4 in 8 H2SO4 medium.'
        }
    }
};

/**
 * Parses a single chemical formula into element counts.
 * Handles nested parentheses e.g. Fe(NO3)3, Ca(OH)2, [Cu(NH3)4]SO4, etc.
 */
export function parseFormula(rawFormula: string): { cleanFormula: string; composition: Record<string, number>; molarMass: number } {
    let clean = rawFormula.replace(/\s*\((s|l|g|aq|solid|liquid|gas|aqueous)\)/gi, '').trim();
    // remove hydration dot e.g. .5H2O -> add to parser
    let hydrateMultiplier = 0;
    let hydrateRest = '';
    const dotIndex = clean.search(/[.·*]/);
    if (dotIndex !== -1) {
        hydrateRest = clean.substring(dotIndex + 1);
        clean = clean.substring(0, dotIndex);
        const matchHydrate = hydrateRest.match(/^(\d*)H2O/i);
        if (matchHydrate) {
            hydrateMultiplier = matchHydrate[1] ? parseInt(matchHydrate[1], 10) : 1;
        }
    }

    const composition: Record<string, number> = {};

    // Tokenizer regex for elements, brackets and numbers
    const tokenRegex = /([A-Z][a-z]?|\(|\)|\[|\]|\d+)/g;
    const tokens = clean.match(tokenRegex) || [];

    const stack: Record<string, number>[] = [{}];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token === '(' || token === '[') {
            stack.push({});
        } else if (token === ')' || token === ']') {
            const group = stack.pop() || {};
            // check if followed by number
            let multiplier = 1;
            if (i + 1 < tokens.length && /^\d+$/.test(tokens[i + 1])) {
                multiplier = parseInt(tokens[i + 1], 10);
                i++;
            }
            const current = stack[stack.length - 1];
            for (const [elem, cnt] of Object.entries(group)) {
                current[elem] = (current[elem] || 0) + cnt * multiplier;
            }
        } else if (/^[A-Z][a-z]?$/.test(token)) {
            let count = 1;
            if (i + 1 < tokens.length && /^\d+$/.test(tokens[i + 1])) {
                count = parseInt(tokens[i + 1], 10);
                i++;
            }
            const current = stack[stack.length - 1];
            current[token] = (current[token] || 0) + count;
        }
    }

    const baseComp = stack[0] || {};
    for (const [e, c] of Object.entries(baseComp)) {
        composition[e] = c;
    }

    if (hydrateMultiplier > 0) {
        composition['H'] = (composition['H'] || 0) + hydrateMultiplier * 2;
        composition['O'] = (composition['O'] || 0) + hydrateMultiplier * 1;
    }

    // Compute molar mass
    let molarMass = 0;
    for (const [elem, count] of Object.entries(composition)) {
        const weight = ATOMIC_WEIGHTS[elem] || 0;
        molarMass += weight * count;
    }

    return {
        cleanFormula: rawFormula.trim(),
        composition,
        molarMass: Math.round(molarMass * 1000) / 1000
    };
}

/**
 * Checks if a formula represents a gaseous substance under standard laboratory conditions (25°C, 1 bar).
 */
export function isGasSubstance(formula: string): boolean {
    const clean = formula.replace(/\s*\((s|l|g|aq)\)/gi, '').trim();
    if (COMMON_GAS_FORMULAS.has(clean)) return true;
    if (formula.includes('(g)') || formula.includes('↑')) return true;
    return false;
}

/**
 * Balances an arbitrary chemical equation using rational Gaussian elimination.
 */
export function balanceChemicalEquation(equationStr: string): BalancedEquationResult {
    const trimmed = equationStr.trim();
    const sides = trimmed.split(/->|=>|=|→/);
    if (sides.length !== 2) {
        return {
            rawEquation: equationStr,
            reactants: [],
            products: [],
            balancedLatex: '',
            balancedText: '',
            redox: { isRedox: false },
            error: 'Invalid equation format. Use "->" or "=" to separate reactants and products.'
        };
    }

    const rawReactants = sides[0].split('+').map(s => s.trim()).filter(Boolean);
    const rawProducts = sides[1].split('+').map(s => s.trim()).filter(Boolean);

    if (rawReactants.length === 0 || rawProducts.length === 0) {
        return {
            rawEquation: equationStr,
            reactants: [],
            products: [],
            balancedLatex: '',
            balancedText: '',
            redox: { isRedox: false },
            error: 'Equation must have at least one reactant and one product.'
        };
    }

    const parsedReactants = rawReactants.map(r => parseFormula(r));
    const parsedProducts = rawProducts.map(p => parseFormula(p));

    // Gather all distinct elements
    const elementSet = new Set<string>();
    for (const r of parsedReactants) {
        Object.keys(r.composition).forEach(e => elementSet.add(e));
    }
    for (const p of parsedProducts) {
        Object.keys(p.composition).forEach(e => elementSet.add(e));
    }
    const elements = Array.from(elementSet);

    // Number of substances
    const numReactants = parsedReactants.length;
    const numProducts = parsedProducts.length;
    const numSubstances = numReactants + numProducts;

    // Build matrix A of size [elements.length x numSubstances]
    // Reactants have +count, Products have -count
    const matrix: Fraction[][] = [];
    for (let r = 0; r < elements.length; r++) {
        const elem = elements[r];
        const row: Fraction[] = [];
        for (let c = 0; c < numReactants; c++) {
            row.push(new Fraction(parsedReactants[c].composition[elem] || 0));
        }
        for (let c = 0; c < numProducts; c++) {
            row.push(new Fraction(-(parsedProducts[c].composition[elem] || 0)));
        }
        matrix.push(row);
    }

    // Gaussian elimination over rational numbers
    let lead = 0;
    const numRows = matrix.length;
    const numCols = numSubstances;

    for (let r = 0; r < numRows; r++) {
        if (lead >= numCols - 1) break;
        let i = r;
        while (matrix[i][lead].isZero()) {
            i++;
            if (i === numRows) {
                i = r;
                lead++;
                if (lead >= numCols - 1) break;
            }
        }
        if (lead >= numCols - 1) break;

        // Swap rows
        const temp = matrix[i];
        matrix[i] = matrix[r];
        matrix[r] = temp;

        const pivot = matrix[r][lead];
        for (let j = 0; j < numCols; j++) {
            matrix[r][j] = matrix[r][j].div(pivot);
        }

        for (let k = 0; k < numRows; k++) {
            if (k !== r && !matrix[k][lead].isZero()) {
                const factor = matrix[k][lead];
                for (let j = 0; j < numCols; j++) {
                    matrix[k][j] = matrix[k][j].sub(factor.mul(matrix[r][j]));
                }
            }
        }
        lead++;
    }

    // Solve for free variable: set last substance coefficient to 1
    const solution: Fraction[] = Array.from({ length: numCols }, () => new Fraction(0));
    solution[numCols - 1] = new Fraction(1);

    for (let r = numRows - 1; r >= 0; r--) {
        // find pivot column in this row
        let pivotCol = -1;
        for (let c = 0; c < numCols - 1; c++) {
            if (!matrix[r][c].isZero()) {
                pivotCol = c;
                break;
            }
        }
        if (pivotCol !== -1) {
            let sum = new Fraction(0);
            for (let c = pivotCol + 1; c < numCols; c++) {
                sum = sum.add(matrix[r][c].mul(solution[c]));
            }
            solution[pivotCol] = new Fraction(0).sub(sum);
        }
    }

    // Check if any solution is <= 0 or invalid
    let valid = true;
    for (const s of solution) {
        if (s.toNumber() <= 0) {
            valid = false;
            break;
        }
    }

    // If rational solver encountered a degenerate system, fallback to smart linear search or preset lookup
    let integerCoefficients: number[] = [];

    if (valid) {
        // Scale by LCM of denominators
        let overallLCM = 1;
        for (const s of solution) {
            overallLCM = Fraction.lcm(overallLCM, s.d);
        }
        const intNums = solution.map(s => Math.round(s.n * (overallLCM / s.d)));
        let overallGCD = intNums[0];
        for (let i = 1; i < intNums.length; i++) {
            overallGCD = Fraction.gcd(overallGCD, intNums[i]);
        }
        integerCoefficients = intNums.map(n => Math.round(n / overallGCD));
    } else {
        // Fallback: check normalized key in curated presets or brute force search (coefficients 1..32)
        const matched = bruteForceBalance(parsedReactants, parsedProducts, elements);
        if (matched) {
            integerCoefficients = matched;
        } else {
            return {
                rawEquation: equationStr,
                reactants: [],
                products: [],
                balancedLatex: '',
                balancedText: '',
                redox: { isRedox: false },
                error: 'Could not balance equation. Please verify all chemical formulas and atom counts.'
            };
        }
    }

    // Assemble final participants
    const finalReactants: SubstanceParticipant[] = parsedReactants.map((r, idx) => ({
        formula: r.cleanFormula,
        cleanFormula: r.cleanFormula,
        coefficient: integerCoefficients[idx],
        isProduct: false,
        isGas: isGasSubstance(r.cleanFormula),
        molarMass: r.molarMass,
        composition: r.composition
    }));

    const finalProducts: SubstanceParticipant[] = parsedProducts.map((p, idx) => {
        const coef = integerCoefficients[numReactants + idx];
        return {
            formula: p.cleanFormula,
            cleanFormula: p.cleanFormula,
            coefficient: coef,
            isProduct: true,
            isGas: isGasSubstance(p.cleanFormula),
            molarMass: p.molarMass,
            composition: p.composition
        };
    });

    // Generate balanced equation strings (LaTeX & Text)
    const formatFormulaText = (coef: number, formula: string) => {
        return coef === 1 ? formula : `${coef}${formula}`;
    };

    const balancedText = `${finalReactants.map(r => formatFormulaText(r.coefficient, r.formula)).join(' + ')} -> ${finalProducts.map(p => formatFormulaText(p.coefficient, p.formula)).join(' + ')}`;

    const formatFormulaLatex = (coef: number, formula: string) => {
        const coefStr = coef === 1 ? '' : `${coef}`;
        // format subscripts in latex
        const latexForm = formula.replace(/(\d+)/g, '_{$1}');
        return `${coefStr}\\text{${latexForm}}`;
    };

    const balancedLatex = `${finalReactants.map(r => formatFormulaLatex(r.coefficient, r.formula)).join(' + ')} \\longrightarrow ${finalProducts.map(p => formatFormulaLatex(p.coefficient, p.formula)).join(' + ')}`;

    // Identify Redox profile
    const eqKey = cleanEquationKey(rawReactants.join('+'));
    const curatedRedox = CURATED_REDOX_DATA[eqKey] || detectRedox(finalReactants, finalProducts);

    return {
        rawEquation: equationStr,
        reactants: finalReactants,
        products: finalProducts,
        balancedLatex,
        balancedText,
        redox: curatedRedox
    };
}

function cleanEquationKey(str: string): string {
    return str.toLowerCase().replace(/[\s\(\)]/g, '');
}

/**
 * Fallback integer balancer for small chemical reaction systems
 */
function bruteForceBalance(
    reactants: { composition: Record<string, number> }[],
    products: { composition: Record<string, number> }[],
    elements: string[]
): number[] | null {
    const nR = reactants.length;
    const nP = products.length;
    const total = nR + nP;

    // Cap search space for up to 5 substances
    if (total > 5) return null;

    const maxCoef = 20;

    const testCombination = (coefs: number[]) => {
        for (const elem of elements) {
            let leftCount = 0;
            for (let i = 0; i < nR; i++) {
                leftCount += coefs[i] * (reactants[i].composition[elem] || 0);
            }
            let rightCount = 0;
            for (let i = 0; i < nP; i++) {
                rightCount += coefs[nR + i] * (products[i].composition[elem] || 0);
            }
            if (leftCount !== rightCount) return false;
        }
        return true;
    };

    // Recursively test coefficients
    const current: number[] = Array(total).fill(1);

    function search(index: number): boolean {
        if (index === total) {
            return testCombination(current);
        }
        for (let c = 1; c <= maxCoef; c++) {
            current[index] = c;
            if (search(index + 1)) return true;
        }
        return false;
    }

    if (search(0)) {
        return [...current];
    }
    return null;
}

/**
 * Heuristic redox detector for arbitrary reactions
 */
function detectRedox(reactants: SubstanceParticipant[], products: SubstanceParticipant[]): RedoxProfile {
    // Check if free elements exist (oxidation state 0)
    let hasElementReactant = false;
    let hasElementProduct = false;

    for (const r of reactants) {
        if (Object.keys(r.composition).length === 1) hasElementReactant = true;
    }
    for (const p of products) {
        if (Object.keys(p.composition).length === 1) hasElementProduct = true;
    }

    if (hasElementReactant || hasElementProduct) {
        return {
            isRedox: true,
            notes: {
                VN: 'Phản ứng có sự tham gia hoặc tạo thành đơn chất (số oxi hóa 0), do đó đây là phản ứng oxi hóa - khử có chuyển dịch electron.',
                EN: 'Reaction involves free elementary substances (oxidation state 0), confirming it is a redox reaction with electron transfer.'
            }
        };
    }

    return {
        isRedox: false,
        notes: {
            VN: 'Phản ứng trao đổi ion hoặc axit-bazơ thông thường, không có sự thay đổi số oxi hóa của các nguyên tố.',
            EN: 'Standard ionic double displacement or acid-base reaction with no change in elemental oxidation states.'
        }
    };
}

/**
 * Calculates stoichiometric amounts for all reaction participants given a known amount of one substance.
 * Uses 24.79 L/mol for gas volume at 25°C, 1 bar (GDPT 2018).
 */
export function calculateStoichiometryTable(
    equation: BalancedEquationResult,
    targetFormula: string,
    inputValue: number,
    inputType: 'MOLES' | 'MASS'
): StoichiometryCalculationRow[] {
    const allParticipants = [...equation.reactants, ...equation.products];
    const target = allParticipants.find(p => p.formula === targetFormula) || allParticipants[0];

    if (!target) return [];

    let targetMoles = 0;
    if (inputType === 'MOLES') {
        targetMoles = Math.max(0, inputValue);
    } else {
        targetMoles = target.molarMass > 0 ? Math.max(0, inputValue) / target.molarMass : 0;
    }

    const rows: StoichiometryCalculationRow[] = allParticipants.map(p => {
        // Stoichiometric ratio: n_p = n_target * (coef_p / coef_target)
        const moles = target.coefficient > 0 ? targetMoles * (p.coefficient / target.coefficient) : 0;
        const mass = moles * p.molarMass;
        const gasVolume = p.isGas ? moles * 24.79 : undefined;

        return {
            formula: p.formula,
            coefficient: p.coefficient,
            isProduct: p.isProduct,
            isGas: p.isGas,
            molarMass: p.molarMass,
            moles: Math.round(moles * 10000) / 10000,
            mass: Math.round(mass * 1000) / 1000,
            gasVolume: gasVolume ? Math.round(gasVolume * 1000) / 1000 : undefined
        };
    });

    return rows;
}
