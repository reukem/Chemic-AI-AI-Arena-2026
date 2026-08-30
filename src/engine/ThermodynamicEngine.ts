/**
 * @file ThermodynamicEngine.ts
 * High-fidelity physical thermodynamic simulation engine.
 * Computes boiling points, freezing points, vapor pressures, and phase transitions
 * under dynamic temperature and pressure conditions (Clausius-Clapeyron relation).
 */

import { Container } from './store';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';

export interface ThermodynamicState {
  isBoiling: boolean;
  isSimmering: boolean; // Near boiling (within 12°C)
  isFrozen: boolean;
  effectiveBoilingPoint: number;
  effectiveFreezingPoint: number;
  steamColor: string;
  steamDensity: number; // 0 to 1
  evaporationRate: number; // mL per second
  vaporName?: string;
  phaseDescription: {
    EN: string;
    VN: string;
  };
}

// Authentic thermodynamic constants at 1.0 atm standard pressure
export interface SubstanceThermalData {
  boilingPoint: number; // °C
  freezingPoint: number; // °C
  steamColor: string; // RGBA
  vaporName: { EN: string; VN: string };
  volatility: number; // relative evaporation speed multiplier
}

export const THERMAL_DATABASE: Record<string, SubstanceThermalData> = {
  'DISTILLED_WATER': {
    boilingPoint: 100.0,
    freezingPoint: 0.0,
    steamColor: 'rgba(224, 242, 254, 0.75)',
    vaporName: { EN: 'Water Vapor (H₂O Steam)', VN: 'Hơi Nước (H₂O)' },
    volatility: 1.0
  },
  'SALT_WATER': {
    boilingPoint: 102.5,
    freezingPoint: -2.8,
    steamColor: 'rgba(224, 242, 254, 0.75)',
    vaporName: { EN: 'Water Vapor (H₂O Steam)', VN: 'Hơi Nước (H₂O)' },
    volatility: 0.9
  },
  'ETHANOL': {
    boilingPoint: 78.37,
    freezingPoint: -114.1,
    steamColor: 'rgba(216, 180, 254, 0.7)',
    vaporName: { EN: 'Ethanol Vapor (Flammable)', VN: 'Hơi Cồn Ethanol (Dễ cháy)' },
    volatility: 2.2
  },
  'HEXANE': {
    boilingPoint: 68.7,
    freezingPoint: -95.3,
    steamColor: 'rgba(254, 240, 138, 0.65)',
    vaporName: { EN: 'Hexane Hydrocarbon Vapor', VN: 'Hơi Hydrocacbon Hexan' },
    volatility: 2.8
  },
  'ACETIC_ACID': {
    boilingPoint: 118.1,
    freezingPoint: 16.6, // Glacial acetic acid freezes at room temperature!
    steamColor: 'rgba(240, 240, 250, 0.7)',
    vaporName: { EN: 'Pungent Acetic Acid Fumes', VN: 'Hơi Axit Axetic Nồng' },
    volatility: 1.2
  },
  'HCl': {
    boilingPoint: 108.5, // Azeotropic 20.2% HCl solution
    freezingPoint: -30.0,
    steamColor: 'rgba(230, 245, 230, 0.8)',
    vaporName: { EN: 'Choking Hydrochloric Acid Fumes (HCl Gas)', VN: 'Khói Khí Axit Clohidric (HCl)' },
    volatility: 1.8
  },
  'HNO3': {
    boilingPoint: 83.0,
    freezingPoint: -42.0,
    steamColor: 'rgba(254, 215, 170, 0.8)',
    vaporName: { EN: 'Toxic Nitrogen Dioxide & Acid Fumes', VN: 'Khí Khói Axit Nitric Độc Hại' },
    volatility: 2.0
  },
  'H2SO4': {
    boilingPoint: 337.0,
    freezingPoint: 10.3,
    steamColor: 'rgba(240, 240, 240, 0.85)',
    vaporName: { EN: 'Dense Sulfur Trioxide Fumes', VN: 'Hơi Khói Axit Sunfuric Đặc' },
    volatility: 0.15
  },
  'AMMONIA': {
    boilingPoint: 37.7, // Concentrated aqueous ammonia rapidly releases NH3 gas
    freezingPoint: -77.7,
    steamColor: 'rgba(220, 230, 255, 0.8)',
    vaporName: { EN: 'Suffocating Ammonia Gas (NH₃)', VN: 'Khí Amoniac Độc Nồng (NH₃)' },
    volatility: 3.5
  },
  'BROMINE': {
    boilingPoint: 58.8,
    freezingPoint: -7.2,
    steamColor: 'rgba(185, 45, 15, 0.85)', // Dense red-orange bromine vapor!
    vaporName: { EN: 'Dense Corrosive Red-Brown Bromine Vapor', VN: 'Hơi Brom Đỏ Nâu Độc Hại' },
    volatility: 2.5
  },
  'NaOH': {
    boilingPoint: 105.0,
    freezingPoint: -4.0,
    steamColor: 'rgba(224, 242, 254, 0.75)',
    vaporName: { EN: 'Water Vapor (Caustic Mist)', VN: 'Hơi Nước (Sương Kiềm)' },
    volatility: 0.8
  },
  'KOH': {
    boilingPoint: 106.0,
    freezingPoint: -5.0,
    steamColor: 'rgba(224, 242, 254, 0.75)',
    vaporName: { EN: 'Water Vapor', VN: 'Hơi Nước' },
    volatility: 0.8
  },
  'COPPER_SULFATE': {
    boilingPoint: 103.0,
    freezingPoint: -2.5,
    steamColor: 'rgba(224, 242, 254, 0.75)',
    vaporName: { EN: 'Water Vapor (Salt Solution)', VN: 'Hơi Nước (Dung dịch muối)' },
    volatility: 0.8
  },
  'POTASSIUM_PERMANGANATE': {
    boilingPoint: 102.0,
    freezingPoint: -2.0,
    steamColor: 'rgba(224, 242, 254, 0.75)',
    vaporName: { EN: 'Water Vapor', VN: 'Hơi Nước' },
    volatility: 0.8
  }
};

/**
 * Calculates pressure-dependent boiling point using the Clausius-Clapeyron relation.
 * High pressure elevates boiling point (e.g. pressure cooker).
 * Vacuum / low pressure sharply lowers boiling point (vacuum distillation).
 */
export function calculateEffectiveBoilingPoint(baseTb: number, pressureAtm: number): number {
  if (pressureAtm <= 0.05) pressureAtm = 0.05;
  // Approximate Clausius-Clapeyron boiling point shift: ΔT ≈ 28.5 * log10(P)
  const shift = 28.5 * Math.log10(pressureAtm);
  return Math.round((baseTb + shift) * 10) / 10;
}

/**
 * Evaluates the full thermodynamic state for a specific container
 * given its chemical composition and the current environmental conditions.
 */
export function evaluateThermodynamicState(
  container: Container,
  env: { temp: number; pressure: number }
): ThermodynamicState {
  // Empty container fallback
  if (!container || container.volume <= 0 || !container.contents || Object.keys(container.contents).length === 0) {
    return {
      isBoiling: false,
      isSimmering: false,
      isFrozen: false,
      effectiveBoilingPoint: 100,
      effectiveFreezingPoint: 0,
      steamColor: 'rgba(224, 242, 254, 0.7)',
      steamDensity: 0,
      evaporationRate: 0,
      phaseDescription: {
        EN: 'Vessel Empty',
        VN: 'Bình Trống'
      }
    };
  }

  // Find dominant substance by volume fraction
  let dominantId = 'DISTILLED_WATER';
  let maxVol = 0;
  for (const [id, vol] of Object.entries(container.contents)) {
    if (vol > maxVol) {
      maxVol = vol;
      dominantId = id;
    }
  }

  const thermalData = THERMAL_DATABASE[dominantId] || {
    boilingPoint: 100.0,
    freezingPoint: 0.0,
    steamColor: 'rgba(224, 242, 254, 0.75)',
    vaporName: { EN: 'Steam Vapor', VN: 'Hơi Bay Lên' },
    volatility: 1.0
  };

  const effBoiling = calculateEffectiveBoilingPoint(thermalData.boilingPoint, env.pressure);
  const effFreezing = thermalData.freezingPoint;

  const currentTemp = env.temp;
  const isBoiling = currentTemp >= effBoiling;
  const isSimmering = !isBoiling && currentTemp >= (effBoiling - 14);
  const isFrozen = currentTemp <= effFreezing;

  // Calculate dynamic steam density based on superheat
  let steamDensity = 0;
  let evaporationRate = 0;
  if (isBoiling) {
    const superheat = Math.min(100, currentTemp - effBoiling);
    steamDensity = Math.min(1.0, 0.4 + (superheat / 60) * 0.6);
    evaporationRate = (0.25 + (superheat / 50) * 0.5) * thermalData.volatility;
  } else if (isSimmering) {
    const simRatio = (currentTemp - (effBoiling - 14)) / 14;
    steamDensity = 0.15 + simRatio * 0.25;
    evaporationRate = 0.05 * thermalData.volatility;
  }

  // Generate scientific phase description
  let phaseDescription: { EN: string; VN: string };
  if (isFrozen) {
    phaseDescription = {
      EN: `Solid Frozen Matrix (${currentTemp}°C ≤ ${effFreezing}°C)`,
      VN: `Đông đặc thể rắn (${currentTemp}°C ≤ ${effFreezing}°C)`
    };
  } else if (isBoiling) {
    phaseDescription = {
      EN: `Vigorous Boiling (${currentTemp}°C ≥ ${effBoiling}°C at ${env.pressure.toFixed(1)} atm)`,
      VN: `Sôi mãnh liệt (${currentTemp}°C ≥ ${effBoiling}°C tại ${env.pressure.toFixed(1)} atm)`
    };
  } else if (isSimmering) {
    phaseDescription = {
      EN: `Simmering / Approaching Boiling (${currentTemp}°C / ${effBoiling}°C)`,
      VN: `Gần sôi / Bốc hơi lăn tăn (${currentTemp}°C / ${effBoiling}°C)`
    };
  } else {
    phaseDescription = {
      EN: `Equilibrium Liquid Phase (${currentTemp}°C)`,
      VN: `Thể lỏng cân bằng (${currentTemp}°C)`
    };
  }

  return {
    isBoiling,
    isSimmering,
    isFrozen,
    effectiveBoilingPoint: effBoiling,
    effectiveFreezingPoint: effFreezing,
    steamColor: thermalData.steamColor,
    steamDensity,
    evaporationRate,
    vaporName: thermalData.vaporName.EN,
    phaseDescription
  };
}
