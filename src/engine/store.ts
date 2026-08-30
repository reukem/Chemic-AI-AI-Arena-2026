/**
 * @file store.ts
 * @description The central Zustand state management architecture for the Chemic-AI Quantum Engine.
 * Houses the AAA Chaining Engine, Root Mean Square (RMS) color mixing algorithms, and Spatial Clamping data.
 */

import { create } from 'zustand';
import { CHEMICAL_REGISTRY, REACTION_RULES } from '../data/ChemicalRegistry';
import { evaluateThermodynamicState } from './ThermodynamicEngine';

/**
 * Global game states. Controls UI rendering boundaries and asynchronous Audio API unlocking.
 */
export type AppState = 'MENU' | 'LOADING' | 'WORKBENCH';

/**
 * Represents a physical spatial container within the WebGL bounds.
 * Handles exact volume capacities, localized optical RGB mixing, and dynamic content dictionaries.
 * 
 * @interface Container
 * @property {number} id - Unique numeric identifier.
 * @property {'beaker' | 'flask'} type - The physical model to render.
 * @property {number} volume - Current fluid volume (0.0 to 100.0 mL).
 * @property {number} maxVol - Maximum capacity constraint. Overflow is blocked.
 * @property {{ r: number, g: number, b: number }} color - Exact computed Root Mean Square RGB color.
 * @property {Record<string, number>} contents - A live dictionary mapping Chemical IDs to their exact volumetric proportions.
 * @property {number} ph - Algorithmic pH approximation of the solution.
 * @property {number} x - The absolute Euclidean X coordinate of the container in the canvas.
 * @property {number} y - The absolute Euclidean Y coordinate of the container in the canvas.
 */
export interface Container {
    id: number;
    type: 'beaker' | 'flask';
    volume: number;
    maxVol: number;
    color: { r: number, g: number, b: number };
    contents: Record<string, number>;
    ph: number;
    x: number;
    y: number;
}

/**
 * The massive global simulation state strictly enforced by Zustand.
 * Triggers all React re-renders efficiently via targeted selector hooks.
 * 
 * @interface SimulationState
 */
interface SimulationState {
    customApiKey: string | null;
    setCustomApiKey: (key: string | null) => void;
    appState: AppState;
    setAppState: (state: AppState) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    language: 'EN' | 'VN';
    setLanguage: (lang: 'EN' | 'VN') => void;
    env: { temp: number; pressure: number };
    containers: Container[];
    activeEffect: 'bubbles' | 'smoke' | 'fire' | 'explosion' | 'fizz' | 'cloud' | null;
    activeEffectContainerId: number | null;
    explosions: { id: number, x: number, y: number, type: string }[];

    // Pause State (Spatial Clamping)
    isPaused: boolean;
    togglePause: () => void;
    setPause: (status: boolean) => void;

    // Socratic Challenge Mode (VN UI)
    isSocraticModeActive: boolean;
    setSocraticMode: (active: boolean) => void;

    // Green Learning Mode (VN UI)
    isLearningModeActive: boolean;
    setLearningMode: (active: boolean) => void;

    // Organic Chemistry Mode (Wordle Puzzle)
    isOrganicModeActive: boolean;
    setOrganicMode: (active: boolean) => void;

    // Easter Egg Menu States (Permanent until simulation restart/reset)
    isMenuCracked: boolean;
    setMenuCracked: (cracked: boolean) => void;
    menuEasterEggStage: number;
    setMenuEasterEggStage: (stage: number) => void;

    // Reaction Popup
    pendingReaction: any | null;
    resolvePendingReaction: () => void;

    // Educational Insight
    pendingEducationalReaction: any | null;
    resolveEducationalReaction: () => void;

    // Actions
    initialize: () => void;
    setEnvTemp: (temp: number) => void;
    setEnvPressure: (pressure: number) => void;
    spawnContainer: (type: 'beaker' | 'flask', x?: number, y?: number) => void;
    addReagentToContainer: (containerId: number, reagentId: string) => void;
    pourContainer: (sourceId: number, targetId: number, heightDiff: number) => void;
    updateContainerPosition: (id: number, x: number, y: number) => void;
    triggerExplosion: (x: number, y: number, type: string) => void;
    removeExplosion: (id: number) => void;
    flushAll: () => void;
    clearEffect: () => void;
}

/**
 * Highly optimized utility to parse exact Hexadecimal strings into RGB channels for the math engine.
 * @param {string} hex - The hex string (e.g., '#3b82f6').
 * @returns {{r:number, g:number, b:number}} RGB map.
 */
const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
};

/**
 * Root Mean Square (RMS) Color Blending Algorithm.
 * Applies true physical photon absorption interpolation rather than basic arithmetic averages.
 * This guarantees that mixing Yellow and Blue outputs a physically authentic Green hue based on volumetric weights.
 * 
 * @param {Object} c1 - Current RGB color of the container.
 * @param {number} v1 - Current volume of the container.
 * @param {Object} c2 - RGB color of the incoming poured/dropped fluid.
 * @param {number} v2 - Added volume.
 * @returns {{r:number, g:number, b:number}} The newly calculated physical color.
 */
const blendColorsRMS = (c1: {r:number, g:number, b:number}, v1: number, c2: {r:number, g:number, b:number}, v2: number) => {
    const tVol = v1 + v2;
    if (tVol <= 0) return { r: 0, g: 0, b: 0 };
    return {
        r: Math.round(Math.sqrt((c1.r * c1.r * v1 + c2.r * c2.r * v2) / tVol)),
        g: Math.round(Math.sqrt((c1.g * c1.g * v1 + c2.g * c2.g * v2) / tVol)),
        b: Math.round(Math.sqrt((c1.b * c1.b * v1 + c2.b * c2.b * v2) / tVol))
    };
};

/**
 * The core Chaining Engine algorithm. Scans a container's contents array and evaluates thermodynamic rules.
 * Automatically checks strict explicit combinations first, then falls back to generic Class-Based taxonomy logic.
 * Also scans for the Thermodynamic Sludge state to prevent infinite loops.
 * 
 * @param {Container} container - The container entity being modified.
 * @returns {any} The triggered reaction payload, or null if totally inert.
 */
const evaluateDynamicReactions = (container: Container, incomingReagents: string[] = []) => {
    // 0. The Thermodynamic Death State (NO FURTHER REACTIONS)
    if (container.contents['ENTROPY_SLUDGE'] > 0) {
        return null; // Totally inert
    }

    let triggeredReaction: any = null;

    // 1. Explicit Hardcoded Logic (Highest Priority)
    for (const rule of REACTION_RULES) {
        const r0 = rule.reactants[0];
        const r1 = rule.reactants[1];
        
        if (rule.orderMatters) {
            // Only triggers if both present and not reacted
            if (container.contents[r0] > 0 && container.contents[r1] > 0 && !container.contents[`reacted_${r0}_${r1}`]) {
                if (incomingReagents.includes(r1) && !incomingReagents.includes(r0)) {
                    triggeredReaction = rule;
                    container.contents[`reacted_${r0}_${r1}`] = 1;
                    break;
                }
            }
        } else {
            if (container.contents[r0] > 0 && container.contents[r1] > 0 && !container.contents[`reacted_${r0}_${r1}`]) {
                triggeredReaction = rule;
                container.contents[`reacted_${r0}_${r1}`] = 1;
                break;
            }
            if (container.contents[r1] > 0 && container.contents[r0] > 0 && !container.contents[`reacted_${r1}_${r0}`]) {
                triggeredReaction = rule;
                container.contents[`reacted_${r1}_${r0}`] = 1;
                break;
            }
        }
    }

    // 2. Class-Based Fallback Engine (Scientific Multi-Class Routing)
    if (!triggeredReaction) {
        const presentClasses = Array.from(new Set(
            Object.keys(container.contents)
                .filter(id => !id.startsWith('reacted_') && container.contents[id] > 0)
                .map(id => CHEMICAL_REGISTRY[id]?.reactionClass)
        ));

        const incomingClasses = incomingReagents.map(id => CHEMICAL_REGISTRY[id]?.reactionClass);
        const currentClasses = Object.keys(container.contents)
            .filter(id => !id.startsWith('reacted_') && !incomingReagents.includes(id) && container.contents[id] > 0)
            .map(id => CHEMICAL_REGISTRY[id]?.reactionClass);

        // Generic Neutralization (Strong Acid + Base)
        if (presentClasses.includes('strong_acid') && (presentClasses.includes('strong_base') || presentClasses.includes('weak_base'))) {
            if (!container.contents['reacted_class_neutralization']) {
                container.contents['reacted_class_neutralization'] = 1;
                const acid = Object.keys(container.contents).find(id => CHEMICAL_REGISTRY[id]?.reactionClass === 'strong_acid') || 'HCl';
                const base = Object.keys(container.contents).find(id => CHEMICAL_REGISTRY[id]?.reactionClass === 'strong_base' || CHEMICAL_REGISTRY[id]?.reactionClass === 'weak_base') || 'NaOH';
                triggeredReaction = {
                    reactants: [acid, base],
                    product: 'SALT_WATER',
                    products: ['SALT_WATER'],
                    equation: {
                        EN: 'H⁺ (aq) + OH⁻ (aq) → H₂O (l) (Exothermic Neutralization)',
                        VN: 'H⁺ (dd) + OH⁻ (dd) → H₂O (l) (Phản Ứng Trung Hòa Tỏa Nhiệt)'
                    },
                    reactionType: {
                        EN: 'Acid-Base Neutralization',
                        VN: 'Phản Ứng Trung Hòa Axit - Bazơ'
                    },
                    mechanism: {
                        EN: 'Hydronium and hydroxide ions neutralize each other to produce liquid water and soluble spectator ions.',
                        VN: 'Ion H⁺ và OH⁻ trung hòa lẫn nhau tạo ra nước và dung dịch muối trung tính.'
                    },
                    message: { EN: 'Neutralization reaction: Acid + Base neutralizes to form Salt and Water.', VN: 'Phản ứng trung hòa: Axit + Bazơ tạo thành Muối và Nước.' },
                    effect: 'bubbles',
                    temperatureSpike: 15
                };
            }
        }
        // Active Metal + Acid (Mg, Zn, Fe, etc.) -> Metal Salt + H2 gas bubbles
        else if ((presentClasses.includes('alkaline_earth_metal') || presentClasses.includes('transition_metal')) && presentClasses.includes('strong_acid')) {
            if (!container.contents['reacted_class_active_metal_acid']) {
                container.contents['reacted_class_active_metal_acid'] = 1;
                const metal = Object.keys(container.contents).find(id => CHEMICAL_REGISTRY[id]?.reactionClass === 'alkaline_earth_metal' || CHEMICAL_REGISTRY[id]?.reactionClass === 'transition_metal') || 'MAGNESIUM';
                const acid = Object.keys(container.contents).find(id => CHEMICAL_REGISTRY[id]?.reactionClass === 'strong_acid') || 'HCl';
                triggeredReaction = {
                    reactants: [metal, acid],
                    product: 'SALT_WATER',
                    products: ['SALT_WATER', 'HYDROGEN_GAS'],
                    equation: {
                        EN: 'M (s) + 2H⁺ (aq) → M²⁺ (aq) + H₂ (g) ↑',
                        VN: 'M (r) + 2H⁺ (dd) → M²⁺ (dd) + H₂ (k) ↑'
                    },
                    reactionType: {
                        EN: 'Active Metal Single Displacement',
                        VN: 'Kim Loại Đẩy Hydro Ra Khỏi Axit'
                    },
                    mechanism: {
                        EN: 'Active metal is oxidized by acid protons, releasing hydrogen gas effervescence and dissolving into a soluble salt.',
                        VN: 'Kim loại hoạt động bị oxi hóa bởi axit, giải phóng bọt khí hydro và tan thành muối.'
                    },
                    message: { EN: 'Metal Oxidation: Active metal reacts with acid, evolving Hydrogen gas (H₂) bubbles.', VN: 'Kim loại tác dụng axit: Giải phóng bọt khí Hydro (H₂) và tan dần.' },
                    effect: 'bubbles',
                    temperatureSpike: 20
                };
            }
        }
        // Carbonate + Acid -> Salt + H2O + CO2 effervescence
        else if (presentClasses.includes('carbonate') && (presentClasses.includes('strong_acid') || presentClasses.includes('weak_acid') || presentClasses.includes('carboxylic_acid'))) {
            if (!container.contents['reacted_class_carbonate_acid']) {
                container.contents['reacted_class_carbonate_acid'] = 1;
                const carb = Object.keys(container.contents).find(id => CHEMICAL_REGISTRY[id]?.reactionClass === 'carbonate') || 'Na2CO3';
                const acid = Object.keys(container.contents).find(id => CHEMICAL_REGISTRY[id]?.reactionClass === 'strong_acid' || CHEMICAL_REGISTRY[id]?.reactionClass === 'weak_acid' || CHEMICAL_REGISTRY[id]?.reactionClass === 'carboxylic_acid') || 'HCl';
                triggeredReaction = {
                    reactants: [carb, acid],
                    product: 'SALT_WATER',
                    products: ['SALT_WATER', 'CARBON_DIOXIDE'],
                    equation: {
                        EN: 'CO₃²⁻ / HCO₃⁻ + H⁺ → H₂O (l) + CO₂ (g) ↑',
                        VN: 'CO₃²⁻ / HCO₃⁻ + H⁺ → H₂O (l) + CO₂ (k) ↑'
                    },
                    reactionType: {
                        EN: 'Carbonate Acidification & Effervescence',
                        VN: 'Axit Hóa Muối Cacbonat & Sủi Bọt CO₂'
                    },
                    mechanism: {
                        EN: 'Protons decompose carbonate/bicarbonate into unstable carbonic acid, liberating Carbon Dioxide gas bubbles.',
                        VN: 'Axit phân hủy muối cacbonat giải phóng bọt khí CO₂ mãnh liệt.'
                    },
                    message: { EN: 'Effervescence: Acid reacts with carbonate salt to liberate vigorous Carbon Dioxide (CO₂) gas bubbles.', VN: 'Sủi bọt khí: Axit tác dụng với muối cacbonat giải phóng khí CO₂ sủi bọt mạnh mẽ.' },
                    effect: 'bubbles',
                    temperatureSpike: 10
                };
            }
        }
        // Dangerous Acid Dilution Check
        else if (incomingClasses.includes('solvent') && currentClasses.includes('strong_acid') && incomingReagents.includes('DISTILLED_WATER')) {
            if (!container.contents['reacted_class_acid_dilution']) {
                container.contents['reacted_class_acid_dilution'] = 1;
                const acid = Object.keys(container.contents).find(id => CHEMICAL_REGISTRY[id]?.reactionClass === 'strong_acid' && !incomingReagents.includes(id)) || 'H2SO4';
                triggeredReaction = {
                    reactants: ['DISTILLED_WATER', acid],
                    product: 'HCl',
                    products: ['HCl'],
                    equation: {
                        EN: 'H₂O (added) + H₂SO₄ (conc) → Flash Boiling & Acid Splattering!',
                        VN: 'H₂O (rót vào) + H₂SO₄ (đặc) → Sôi Bùng Nổ & Bắn Axit!'
                    },
                    reactionType: {
                        EN: 'Hazardous Hydration Exotherm',
                        VN: 'Hiểm Họa Tỏa Nhiệt Hydrat Hóa'
                    },
                    mechanism: {
                        EN: 'Water added to concentrated acid flashes into steam, violently ejecting caustic acid droplets.',
                        VN: 'Rót nước vào axit đặc làm nước sôi tức thì biến thành hơi nước, bắn tung tóe axit gây bỏng nặng.'
                    },
                    message: { EN: 'LAB SAFETY VIOLATION: Never pour water into concentrated acid! Exothermic boil-over hazard!', VN: 'VI PHẠM AN TOÀN: Không bao giờ đổ nước vào axit đặc! Sôi trào nguy hiểm!' },
                    effect: 'explosion',
                    requiresPopup: true,
                    temperatureSpike: 110,
                    hazardLevel: 'CRITICAL'
                };
            }
        }
    }

    // 2.5 Reactant Consumption & Chained Stoichiometric Generation
    if (triggeredReaction) {
        // Stoichiometrically consume reactants
        if (triggeredReaction.reactants) {
            const r0 = triggeredReaction.reactants[0];
            const r1 = triggeredReaction.reactants[1];
            const vol0 = container.contents[r0] || 0;
            const vol1 = container.contents[r1] || 0;
            const reactedVol = Math.max(10, Math.min(vol0 || 10, vol1 || 10));

            delete container.contents[r0];
            delete container.contents[r1];

            // Add authentic products
            const productsToAdd = triggeredReaction.products || [triggeredReaction.product];
            for (const prodId of productsToAdd) {
                if (prodId && CHEMICAL_REGISTRY[prodId]) {
                    container.contents[prodId] = (container.contents[prodId] || 0) + reactedVol;
                }
            }
        }

        // Color and optic updates
        if (triggeredReaction.productColor) {
            container.color = hexToRgb(triggeredReaction.productColor);
        } else if (triggeredReaction.product && CHEMICAL_REGISTRY[triggeredReaction.product]) {
            container.color = hexToRgb(CHEMICAL_REGISTRY[triggeredReaction.product].color);
        }
    }

    return triggeredReaction;
};

/**
 * Instantiate the Zustand global store.
 */
export const useSimulationStore = create<SimulationState>((set, get) => ({
    customApiKey: null,
    setCustomApiKey: (key) => set({ customApiKey: key }),
    appState: 'MENU',
    setAppState: (appState) => set({ appState }),
    activeTab: 'lab',
    setActiveTab: (activeTab) => set({ activeTab }),
    language: 'EN',
    setLanguage: (language) => set({ language }),
    env: { temp: 25, pressure: 1.0 },
    containers: [],
    activeEffect: null,
    activeEffectContainerId: null,
    explosions: [],
    pendingReaction: null,
    pendingEducationalReaction: null,
    isPaused: false,
    
    // Socratic Challenge Mode
    isSocraticModeActive: false,
    setSocraticMode: (active: boolean) => set({ isSocraticModeActive: active }),

    // Green Learning Mode
    isLearningModeActive: false,
    setLearningMode: (active: boolean) => set({ isLearningModeActive: active }),

    // Organic Chemistry Mode (Wordle Puzzle)
    isOrganicModeActive: false,
    setOrganicMode: (active: boolean) => set({ isOrganicModeActive: active }),

    // Easter Egg Menu States
    isMenuCracked: false,
    setMenuCracked: (isMenuCracked: boolean) => set({ isMenuCracked }),
    menuEasterEggStage: 0,
    setMenuEasterEggStage: (menuEasterEggStage: number) => set({ menuEasterEggStage }),

    /**
     * Toggles the global Time-Stop parameter, instantaneously halting all WebGL Canvas motion.
     */
    togglePause: () => set(state => ({ isPaused: !state.isPaused })),
    setPause: (status: boolean) => set({ isPaused: status }),

    /**
     * Resumes the engine loop post-warning modal acknowledgment, discharging any stored VFX/Audio data.
     */
    resolvePendingReaction: () => {
        const state = get();
        const pending = state.pendingReaction;
        if (!pending) return;
        const effect = pending.effect;
        const containerId = pending.containerId;

        // Guaranteed immediate unmount of the modal dialog
        set({
            activeEffect: effect || null,
            activeEffectContainerId: containerId !== undefined ? containerId : null,
            pendingReaction: null
        });

        try {
            if (effect === 'explosion') {
                const c = state.containers.find(c => c.id === containerId);
                if (c) {
                    const r = pending.reactants || [];
                    const rxnType = r.includes('POTASSIUM') ? 'potassium'
                                  : r.includes('H2SO4') ? 'acid_dilution'
                                  : r.includes('SODIUM') ? 'sodium'
                                  : 'alkali_acid';
                    get().triggerExplosion(c.x + 70, c.y + 100, rxnType);
                }
            } else if (effect === 'fizz' || effect === 'bubbles' || effect === 'smoke') {
                audioManager.playSizzle();
            }
        } catch (err) {
            console.warn('VFX/Audio dispatch warning:', err);
        }

        if (effect) {
            setTimeout(() => {
                get().clearEffect();
            }, 4500);
        }
    },

    resolveEducationalReaction: () => {
        const state = get();
        const pending = state.pendingEducationalReaction;
        if (!pending) return;
        const effect = pending.effect;
        const containerId = pending.containerId;

        // Guaranteed immediate unmount of the modal dialog
        set({
            activeEffect: effect || null,
            activeEffectContainerId: containerId !== undefined ? containerId : null,
            pendingEducationalReaction: null
        });

        try {
            if (effect === 'explosion') {
                const c = state.containers.find(c => c.id === containerId);
                if (c) {
                    const r = pending.reactants || [];
                    const rxnType = r.includes('POTASSIUM') ? 'potassium'
                                  : r.includes('H2SO4') ? 'acid_dilution'
                                  : r.includes('SODIUM') ? 'sodium'
                                  : 'alkali_acid';
                    get().triggerExplosion(c.x + 70, c.y + 100, rxnType);
                }
            } else if (effect === 'fizz' || effect === 'bubbles' || effect === 'smoke') {
                audioManager.playSizzle();
            }
        } catch (err) {
            console.warn('VFX/Audio dispatch warning:', err);
        }

        if (effect) {
            setTimeout(() => {
                 get().clearEffect();
            }, 4500);
        }
    },

    triggerExplosion: (x, y, type) => {
        set(state => ({
            explosions: [...state.explosions, { id: Date.now() + Math.random(), x, y, type }]
        }));
    },

    removeExplosion: (id) => {
        set(state => ({
            explosions: state.explosions.filter(e => e.id !== id)
        }));
    },

    initialize: () => {
        set({ containers: [], env: { temp: 25, pressure: 1.0 }, isPaused: false });
        get().spawnContainer('beaker');
    },

    setEnvTemp: (temp: number) => set((state) => ({ env: { ...state.env, temp } })),
    setEnvPressure: (pressure: number) => set((state) => ({ env: { ...state.env, pressure } })),

    spawnContainer: (type: 'beaker' | 'flask', x?: number, y?: number) => {
        const state = get();
        if (state.containers.length >= 4) {
            console.log("Max containers reached!");
            return;
        }
        const newId = state.containers.length > 0 ? Math.max(...state.containers.map(c => c.id)) + 1 : 0;
        
        const tableY = Math.max(250, (typeof window !== 'undefined' ? window.innerHeight : 800) - 220);
        const defaultSlots = [380, 560, 740, 920];
        const startX = x ?? (defaultSlots[state.containers.length % defaultSlots.length] || 560);
        const startY = y ?? tableY; // Strictly seated on tabletop surface!

        const newContainer: Container = {
            id: newId,
            type,
            volume: 0,
            maxVol: 100,
            color: { r: 0, g: 0, b: 0 },
            contents: {},
            ph: 7,
            x: startX,
            y: startY
        };
        set({ containers: [...state.containers, newContainer] });
    },

    updateContainerPosition: (id: number, x: number, y: number) => {
        set((state) => ({
            containers: state.containers.map(c => c.id === id ? { ...c, x, y } : c)
        }));
    },

    /**
     * Physics event: Fires when the user fully executes a drag-and-drop of a solid/liquid onto a target.
     * Evaluates volume limits, triggers RMS blending, and runs the evaluation engine.
     * @param {number} containerId - The target container.
     * @param {string} reagentId - The dropped chemical.
     */
    addReagentToContainer: (containerId: number, reagentId: string) => {
        const state = get();
        const reagent = CHEMICAL_REGISTRY[reagentId];
        if (!reagent) return;

        const containers = [...state.containers];
        const containerIndex = containers.findIndex(c => c.id === containerId);
        if (containerIndex === -1) return;

        const container = { ...containers[containerIndex] } as Container;

        // Inert Sludge Protection Check
        if (container.contents['ENTROPY_SLUDGE'] > 0) return; // Prevent any additions

        const addVol = 20;

        if (container.volume >= container.maxVol) {
            console.log("Container is FULL!");
            return;
        }

        const rColor = hexToRgb(reagent.color);

        // Optical Color Mixing (RMS Physics)
        if (container.volume === 0) {
            container.color = { ...rColor };
        } else {
            container.color = blendColorsRMS(container.color, container.volume, rColor, addVol);
        }

        container.volume += addVol;
        container.contents = { ...container.contents, [reagentId]: (container.contents[reagentId] || 0) + addVol };

        // Robust pH calculation accounting for acid/base neutralization and dilution
        let totalMolesH = 0;
        let totalMolesOH = 0;
        let totalVol = 0;
        for (const [id, vol] of Object.entries(container.contents)) {
            const rg = CHEMICAL_REGISTRY[id];
            if (!rg) continue;
            totalVol += vol;
            if (rg.ph < 7) {
                totalMolesH += Math.pow(10, -rg.ph) * vol;
            } else if (rg.ph > 7) {
                totalMolesOH += Math.pow(10, -(14 - rg.ph)) * vol;
            } else {
                totalMolesH += 1e-7 * vol;
                totalMolesOH += 1e-7 * vol;
            }
        }
        
        if (totalVol > 0) {
            if (totalMolesH > totalMolesOH) {
                const excessH = totalMolesH - totalMolesOH;
                const excessHConc = excessH / totalVol;
                container.ph = -Math.log10(Math.max(1e-14, excessHConc));
            } else if (totalMolesOH > totalMolesH) {
                const excessOH = totalMolesOH - totalMolesH;
                const excessOHConc = excessOH / totalVol;
                const pOH = -Math.log10(Math.max(1e-14, excessOHConc));
                container.ph = 14 - pOH;
            } else {
                container.ph = 7.0;
            }
        } else {
            container.ph = 7.0;
        }

        const triggeredReaction = evaluateDynamicReactions(container, [reagentId]);
        containers[containerIndex] = container;

        if (triggeredReaction && triggeredReaction.requiresPopup) {
            set({
                containers,
                pendingReaction: {
                    ...triggeredReaction,
                    containerId
                }
            });
        } else if (triggeredReaction) {
            const rxnId = triggeredReaction.reactants ? `rxn_${triggeredReaction.reactants[0]}_${triggeredReaction.reactants[1]}` : `rxn_class_${triggeredReaction.product}`;
            set({
                containers,
                pendingEducationalReaction: {
                    ...triggeredReaction,
                    containerId,
                    rxnId
                }
            });
        } else {
            set({ containers });
        }
    },

    /**
     * Physics event: Fires when the user clicks and drags one valid container onto another.
     * Evaluates spatial distance constraints and incrementally transfers proportional volumetric data matrices.
     * @param {number} sourceId - Container transferring fluid.
     * @param {number} targetId - Container receiving fluid.
     * @param {number} heightDiff - Vertical Euclidean coordinate drop delta (used for splash physics).
     */
    pourContainer: (sourceId: number, targetId: number, heightDiff: number) => {
        const state = get();
        const containers = [...state.containers];

        const sourceIdx = containers.findIndex(c => c.id === sourceId);
        const targetIdx = containers.findIndex(c => c.id === targetId);

        if (sourceIdx === -1 || targetIdx === -1) return;

        const source = { ...containers[sourceIdx], contents: { ...containers[sourceIdx].contents } };
        const target = { ...containers[targetIdx], contents: { ...containers[targetIdx].contents } };

        if (source.volume <= 0) return;
        if (target.volume >= target.maxVol) return;
        if (target.contents['ENTROPY_SLUDGE'] > 0) return; // Prevent pour target if dead

        // Thermodynamic freezing check: cannot pour if frozen solid!
        const sourceThermo = evaluateThermodynamicState(source, state.env);
        if (sourceThermo.isFrozen) {
            console.warn("Cannot pour: substance is frozen solid!");
            return;
        }

        const safeHeight = Math.max(0, Math.min(heightDiff, 500));
        const pourRate = 1 + (safeHeight / 500) * 5;

        const availableSpace = target.maxVol - target.volume;
        const actualPour = Math.min(pourRate, source.volume, availableSpace);

        if (actualPour <= 0) return;

        // Optical Color Mixing (RMS)
        if (target.volume === 0) {
            target.color = { ...source.color };
        } else {
            target.color = blendColorsRMS(target.color, target.volume, source.color, actualPour);
        }

        for (const [chemId, vol] of Object.entries(source.contents)) {
            const ratio = vol / source.volume;
            const transferredVol = ratio * actualPour;

            source.contents[chemId] -= transferredVol;
            if (source.contents[chemId] <= 0.01) delete source.contents[chemId];

            target.contents[chemId] = (target.contents[chemId] || 0) + transferredVol;
        }

        source.volume -= actualPour;
        target.volume += actualPour;

        // Robust pH calculation accounting for acid/base neutralization and dilution
        let totalMolesH = 0;
        let totalMolesOH = 0;
        let totalVol = 0;
        for (const [id, vol] of Object.entries(target.contents)) {
            const rg = CHEMICAL_REGISTRY[id];
            if (!rg) continue;
            totalVol += vol;
            if (rg.ph < 7) {
                totalMolesH += Math.pow(10, -rg.ph) * vol;
            } else if (rg.ph > 7) {
                totalMolesOH += Math.pow(10, -(14 - rg.ph)) * vol;
            } else {
                totalMolesH += 1e-7 * vol;
                totalMolesOH += 1e-7 * vol;
            }
        }
        
        if (totalVol > 0) {
            if (totalMolesH > totalMolesOH) {
                const excessH = totalMolesH - totalMolesOH;
                const excessHConc = excessH / totalVol;
                target.ph = -Math.log10(Math.max(1e-14, excessHConc));
            } else if (totalMolesOH > totalMolesH) {
                const excessOH = totalMolesOH - totalMolesH;
                const excessOHConc = excessOH / totalVol;
                const pOH = -Math.log10(Math.max(1e-14, excessOHConc));
                target.ph = 14 - pOH;
            } else {
                target.ph = 7.0;
            }
        } else {
            target.ph = 7.0;
        }

        const triggeredReaction = evaluateDynamicReactions(target, Object.keys(source.contents));

        containers[sourceIdx] = source;
        containers[targetIdx] = target;

        if (triggeredReaction && triggeredReaction.requiresPopup) {
            set({
                containers,
                pendingReaction: {
                    ...triggeredReaction,
                    containerId: targetId
                }
            });
        } else if (triggeredReaction) {
            const rxnId = triggeredReaction.reactants ? `rxn_${triggeredReaction.reactants[0]}_${triggeredReaction.reactants[1]}` : `rxn_class_${triggeredReaction.product}`;
            set({
                containers,
                pendingEducationalReaction: {
                    ...triggeredReaction,
                    containerId: targetId,
                    rxnId
                }
            });
        } else {
            let newEffect = (safeHeight > 250) ? 'fizz' : null;

            set({
                containers,
                ...(newEffect && { activeEffect: newEffect, activeEffectContainerId: targetId })
            });

            if (newEffect) {
                setTimeout(() => get().clearEffect(), 300);
            }
        }
    },

    flushAll: () => {
        set({ containers: [], activeEffect: null, activeEffectContainerId: null });
    },

    clearEffect: () => set({ activeEffect: null, activeEffectContainerId: null })
}));
