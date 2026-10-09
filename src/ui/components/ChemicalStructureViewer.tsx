import React, { useState } from 'react';
import OrbitalBoxDiagram from '../OrbitalBoxDiagram';
import Orbital3DViewer from './Orbital3DViewer';
import { getSubstanceStructureProfile } from '../../data/ChemicalStructureData';

export interface StructureViewerProps {
  id: string; // element symbol or compound id (e.g. 'Fe', 'H2O', 'dopamine', 'HNO3', 'glycerol', 'GLUCOSE')
  name?: string;
  formula?: string;
  isVi?: boolean;
  color?: string;
  initialMode?: 'skeletal' | 'lewis' | 'electron' | 'orbital3d' | 'insignia';
  allowModeSwitch?: boolean;
  className?: string;
}

// =========================================================================
// 1. PERIODIC TABLE & ELEMENT RESOLVER
// =========================================================================
export interface ElementInfo {
  z: number;
  symbol: string;
  nameEn: string;
  nameVn: string;
  group: number;
  period: number;
  valence: number;
  type: 'alkali' | 'alkaline_earth' | 'transition_bcc' | 'transition_fcc' | 'transition_hcp' | 'metalloid' | 'diatomic' | 'carbon' | 'phosphorus' | 'sulfur' | 'noble_gas' | 'metal';
  crystalName: { EN: string; VN: string };
  config: string;
}

const ELEMENT_MAP: Record<string, ElementInfo> = {
  h: { z: 1, symbol: 'H', nameEn: 'Hydrogen', nameVn: 'Hydro', group: 1, period: 1, valence: 1, type: 'diatomic', crystalName: { EN: 'Diatomic Covalent Gas (H—H)', VN: 'Phân tử khí liên kết đơn (H—H)' }, config: '1s1' },
  he: { z: 2, symbol: 'He', nameEn: 'Helium', nameVn: 'Heli', group: 18, period: 1, valence: 2, type: 'noble_gas', crystalName: { EN: 'Monatomic Noble Gas (1s² Duet)', VN: 'Khí hiếm đơn nguyên tử (Vỏ 1s² bền)' }, config: '1s2' },
  li: { z: 3, symbol: 'Li', nameEn: 'Lithium', nameVn: 'Liti', group: 1, period: 2, valence: 1, type: 'alkali', crystalName: { EN: 'Body-Centered Cubic (BCC)', VN: 'Lập phương tâm khối (BCC)' }, config: '1s2 2s1' },
  be: { z: 4, symbol: 'Be', nameEn: 'Beryllium', nameVn: 'Beri', group: 2, period: 2, valence: 2, type: 'transition_hcp', crystalName: { EN: 'Hexagonal Close-Packed (HCP)', VN: 'Lục phương xếp chặt (HCP)' }, config: '1s2 2s2' },
  b: { z: 5, symbol: 'B', nameEn: 'Boron', nameVn: 'Bo', group: 13, period: 2, valence: 3, type: 'metalloid', crystalName: { EN: 'Icosahedral B₁₂ Lattice', VN: 'Mạng tinh thể nhị thập diện B₁₂' }, config: '1s2 2s2 2p1' },
  c: { z: 6, symbol: 'C', nameEn: 'Carbon', nameVn: 'Cacbon', group: 14, period: 2, valence: 4, type: 'carbon', crystalName: { EN: 'Graphite (sp²) & Diamond (sp³)', VN: 'Than chì (sp²) & Kim cương (sp³)' }, config: '1s2 2s2 2p2' },
  n: { z: 7, symbol: 'N', nameEn: 'Nitrogen', nameVn: 'Nitơ', group: 15, period: 2, valence: 5, type: 'diatomic', crystalName: { EN: 'Diatomic Triple Bond (N≡N)', VN: 'Phân tử khí liên kết ba (N≡N)' }, config: '1s2 2s2 2p3' },
  o: { z: 8, symbol: 'O', nameEn: 'Oxygen', nameVn: 'Oxy', group: 16, period: 2, valence: 6, type: 'diatomic', crystalName: { EN: 'Diatomic Double Bond (O=O)', VN: 'Phân tử khí liên kết đôi (O=O)' }, config: '1s2 2s2 2p4' },
  f: { z: 9, symbol: 'F', nameEn: 'Fluorine', nameVn: 'Flo', group: 17, period: 2, valence: 7, type: 'diatomic', crystalName: { EN: 'Diatomic Halogen Gas (F—F)', VN: 'Phân tử halogen liên kết đơn (F—F)' }, config: '1s2 2s2 2p5' },
  ne: { z: 10, symbol: 'Ne', nameEn: 'Neon', nameVn: 'Neon', group: 18, period: 2, valence: 8, type: 'noble_gas', crystalName: { EN: 'Stable Noble Gas Octet [Ne]', VN: 'Vỏ bát tử khí hiếm bền vững [Ne]' }, config: '1s2 2s2 2p6' },
  na: { z: 11, symbol: 'Na', nameEn: 'Sodium', nameVn: 'Natri', group: 1, period: 3, valence: 1, type: 'alkali', crystalName: { EN: 'Body-Centered Cubic (BCC)', VN: 'Lập phương tâm khối (BCC)' }, config: '1s2 2s2 2p6 3s1' },
  mg: { z: 12, symbol: 'Mg', nameEn: 'Magnesium', nameVn: 'Magie', group: 2, period: 3, valence: 2, type: 'transition_hcp', crystalName: { EN: 'Hexagonal Close-Packed (HCP)', VN: 'Lục phương xếp chặt (HCP)' }, config: '1s2 2s2 2p6 3s2' },
  al: { z: 13, symbol: 'Al', nameEn: 'Aluminum', nameVn: 'Nhôm', group: 13, period: 3, valence: 3, type: 'transition_fcc', crystalName: { EN: 'Face-Centered Cubic (FCC)', VN: 'Lập phương tâm diện (FCC)' }, config: '1s2 2s2 2p6 3s2 3p1' },
  si: { z: 14, symbol: 'Si', nameEn: 'Silicon', nameVn: 'Silic', group: 14, period: 3, valence: 4, type: 'metalloid', crystalName: { EN: 'Diamond-Cubic Semiconductor', VN: 'Mạng tinh thể kim cương bán dẫn' }, config: '1s2 2s2 2p6 3s2 3p2' },
  p: { z: 15, symbol: 'P', nameEn: 'Phosphorus', nameVn: 'Photpho', group: 15, period: 3, valence: 5, type: 'phosphorus', crystalName: { EN: 'White Phosphorus P₄ Tetrahedron', VN: 'Tứ diện photpho trắng P₄' }, config: '1s2 2s2 2p6 3s2 3p3' },
  s: { z: 16, symbol: 'S', nameEn: 'Sulfur', nameVn: 'Lưu huỳnh', group: 16, period: 3, valence: 6, type: 'sulfur', crystalName: { EN: 'Crown Octagonal S₈ Ring', VN: 'Vòng vương miện bát giác S₈' }, config: '1s2 2s2 2p6 3s2 3p4' },
  cl: { z: 17, symbol: 'Cl', nameEn: 'Chlorine', nameVn: 'Clo', group: 17, period: 3, valence: 7, type: 'diatomic', crystalName: { EN: 'Diatomic Halogen Gas (Cl—Cl)', VN: 'Phân tử halogen liên kết đơn (Cl—Cl)' }, config: '1s2 2s2 2p6 3s2 3p5' },
  ar: { z: 18, symbol: 'Ar', nameEn: 'Argon', nameVn: 'Argon', group: 18, period: 3, valence: 8, type: 'noble_gas', crystalName: { EN: 'Stable Noble Gas Octet [Ar]', VN: 'Vỏ bát tử khí hiếm bền vững [Ar]' }, config: '1s2 2s2 2p6 3s2 3p6' },
  k: { z: 19, symbol: 'K', nameEn: 'Potassium', nameVn: 'Kali', group: 1, period: 4, valence: 1, type: 'alkali', crystalName: { EN: 'Body-Centered Cubic (BCC)', VN: 'Lập phương tâm khối (BCC)' }, config: '1s2 2s2 2p6 3s2 3p6 4s1' },
  ca: { z: 20, symbol: 'Ca', nameEn: 'Calcium', nameVn: 'Canxi', group: 2, period: 4, valence: 2, type: 'transition_fcc', crystalName: { EN: 'Face-Centered Cubic (FCC)', VN: 'Lập phương tâm diện (FCC)' }, config: '1s2 2s2 2p6 3s2 3p6 4s2' },
  sc: { z: 21, symbol: 'Sc', nameEn: 'Scandium', nameVn: 'Scandi', group: 3, period: 4, valence: 2, type: 'transition_hcp', crystalName: { EN: 'Hexagonal Close-Packed (HCP)', VN: 'Lục phương xếp chặt (HCP)' }, config: '1s2 2s2 2p6 3s2 3p6 3d1 4s2' },
  ti: { z: 22, symbol: 'Ti', nameEn: 'Titanium', nameVn: 'Titan', group: 4, period: 4, valence: 2, type: 'transition_hcp', crystalName: { EN: 'Hexagonal Close-Packed (HCP)', VN: 'Lục phương xếp chặt (HCP)' }, config: '1s2 2s2 2p6 3s2 3p6 3d2 4s2' },
  v: { z: 23, symbol: 'V', nameEn: 'Vanadium', nameVn: 'Vanadi', group: 5, period: 4, valence: 2, type: 'transition_bcc', crystalName: { EN: 'Body-Centered Cubic (BCC)', VN: 'Lập phương tâm khối (BCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d3 4s2' },
  cr: { z: 24, symbol: 'Cr', nameEn: 'Chromium', nameVn: 'Crom', group: 6, period: 4, valence: 1, type: 'transition_bcc', crystalName: { EN: 'Body-Centered Cubic (BCC)', VN: 'Lập phương tâm khối (BCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d5 4s1' },
  mn: { z: 25, symbol: 'Mn', nameEn: 'Manganese', nameVn: 'Mangan', group: 7, period: 4, valence: 2, type: 'transition_bcc', crystalName: { EN: 'Body-Centered Cubic (BCC)', VN: 'Lập phương tâm khối (BCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d5 4s2' },
  fe: { z: 26, symbol: 'Fe', nameEn: 'Iron', nameVn: 'Sắt', group: 8, period: 4, valence: 2, type: 'transition_bcc', crystalName: { EN: 'Body-Centered Cubic (α-Fe BCC)', VN: 'Lập phương tâm khối (α-Fe BCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d6 4s2' },
  co: { z: 27, symbol: 'Co', nameEn: 'Cobalt', nameVn: 'Coban', group: 9, period: 4, valence: 2, type: 'transition_hcp', crystalName: { EN: 'Hexagonal Close-Packed (HCP)', VN: 'Lục phương xếp chặt (HCP)' }, config: '1s2 2s2 2p6 3s2 3p6 3d7 4s2' },
  ni: { z: 28, symbol: 'Ni', nameEn: 'Nickel', nameVn: 'Niken', group: 10, period: 4, valence: 2, type: 'transition_fcc', crystalName: { EN: 'Face-Centered Cubic (FCC)', VN: 'Lập phương tâm diện (FCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d8 4s2' },
  cu: { z: 29, symbol: 'Cu', nameEn: 'Copper', nameVn: 'Đồng', group: 11, period: 4, valence: 1, type: 'transition_fcc', crystalName: { EN: 'Face-Centered Cubic (FCC)', VN: 'Lập phương tâm diện (FCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s1' },
  zn: { z: 30, symbol: 'Zn', nameEn: 'Zinc', nameVn: 'Kẽm', group: 12, period: 4, valence: 2, type: 'transition_hcp', crystalName: { EN: 'Hexagonal Close-Packed (HCP)', VN: 'Lục phương xếp chặt (HCP)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2' },
  ga: { z: 31, symbol: 'Ga', nameEn: 'Gallium', nameVn: 'Gali', group: 13, period: 4, valence: 3, type: 'metal', crystalName: { EN: 'Orthorhombic Metal Lattice', VN: 'Mạng tinh thể trực thoi' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p1' },
  ge: { z: 32, symbol: 'Ge', nameEn: 'Germanium', nameVn: 'Gecmani', group: 14, period: 4, valence: 4, type: 'metalloid', crystalName: { EN: 'Diamond Cubic Lattice', VN: 'Mạng tinh thể kim cương' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p2' },
  as: { z: 33, symbol: 'As', nameEn: 'Arsenic', nameVn: 'Asen', group: 15, period: 4, valence: 5, type: 'metalloid', crystalName: { EN: 'Rhombohedral Layered Lattice', VN: 'Mạng tinh thể mặt thoi phân lớp' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p3' },
  se: { z: 34, symbol: 'Se', nameEn: 'Selenium', nameVn: 'Selen', group: 16, period: 4, valence: 6, type: 'diatomic', crystalName: { EN: 'Hexagonal Helical Chains', VN: 'Mạng chuỗi xoắn ốc lục phương' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p4' },
  br: { z: 35, symbol: 'Br', nameEn: 'Bromine', nameVn: 'Brom', group: 17, period: 4, valence: 7, type: 'diatomic', crystalName: { EN: 'Diatomic Liquid Halogen (Br—Br)', VN: 'Phân tử halogen lỏng (Br—Br)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p5' },
  kr: { z: 36, symbol: 'Kr', nameEn: 'Krypton', nameVn: 'Kripton', group: 18, period: 4, valence: 8, type: 'noble_gas', crystalName: { EN: 'Noble Gas Octet [Kr]', VN: 'Vỏ bát tử khí hiếm [Kr]' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6' },
  rb: { z: 37, symbol: 'Rb', nameEn: 'Rubidium', nameVn: 'Rubidi', group: 1, period: 5, valence: 1, type: 'alkali', crystalName: { EN: 'Body-Centered Cubic (BCC)', VN: 'Lập phương tâm khối (BCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 5s1' },
  sr: { z: 38, symbol: 'Sr', nameEn: 'Strontium', nameVn: 'Stronti', group: 2, period: 5, valence: 2, type: 'transition_fcc', crystalName: { EN: 'Face-Centered Cubic (FCC)', VN: 'Lập phương tâm diện (FCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 5s2' },
  ag: { z: 47, symbol: 'Ag', nameEn: 'Silver', nameVn: 'Bạc', group: 11, period: 5, valence: 1, type: 'transition_fcc', crystalName: { EN: 'Face-Centered Cubic (FCC)', VN: 'Lập phương tâm diện (FCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s1' },
  cd: { z: 48, symbol: 'Cd', nameEn: 'Cadmium', nameVn: 'Cadmi', group: 12, period: 5, valence: 2, type: 'transition_hcp', crystalName: { EN: 'Hexagonal Close-Packed (HCP)', VN: 'Lục phương xếp chặt (HCP)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2' },
  sn: { z: 50, symbol: 'Sn', nameEn: 'Tin', nameVn: 'Thiếc', group: 14, period: 5, valence: 4, type: 'metal', crystalName: { EN: 'Tetragonal White Tin (β-Sn)', VN: 'Thiếc trắng tứ phương (β-Sn)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p2' },
  i: { z: 53, symbol: 'I', nameEn: 'Iodine', nameVn: 'Iot', group: 17, period: 5, valence: 7, type: 'diatomic', crystalName: { EN: 'Diatomic Solid Halogen (I—I)', VN: 'Phân tử halogen tinh thể (I—I)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p5' },
  xe: { z: 54, symbol: 'Xe', nameEn: 'Xenon', nameVn: 'Xenon', group: 18, period: 5, valence: 8, type: 'noble_gas', crystalName: { EN: 'Noble Gas Octet [Xe]', VN: 'Vỏ bát tử khí hiếm [Xe]' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p6' },
  cs: { z: 55, symbol: 'Cs', nameEn: 'Cesium', nameVn: 'Xesi', group: 1, period: 6, valence: 1, type: 'alkali', crystalName: { EN: 'Body-Centered Cubic (BCC)', VN: 'Lập phương tâm khối (BCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p6 6s1' },
  ba: { z: 56, symbol: 'Ba', nameEn: 'Barium', nameVn: 'Bari', group: 2, period: 6, valence: 2, type: 'transition_bcc', crystalName: { EN: 'Body-Centered Cubic (BCC)', VN: 'Lập phương tâm khối (BCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 5s2 5p6 6s2' },
  w: { z: 74, symbol: 'W', nameEn: 'Tungsten', nameVn: 'Vonfram', group: 6, period: 6, valence: 2, type: 'transition_bcc', crystalName: { EN: 'Body-Centered Cubic (BCC)', VN: 'Lập phương tâm khối (BCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d4 6s2' },
  pt: { z: 78, symbol: 'Pt', nameEn: 'Platinum', nameVn: 'Bạch kim', group: 10, period: 6, valence: 1, type: 'transition_fcc', crystalName: { EN: 'Face-Centered Cubic (FCC)', VN: 'Lập phương tâm diện (FCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d9 6s1' },
  au: { z: 79, symbol: 'Au', nameEn: 'Gold', nameVn: 'Vàng', group: 11, period: 6, valence: 1, type: 'transition_fcc', crystalName: { EN: 'Face-Centered Cubic (FCC)', VN: 'Lập phương tâm diện (FCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s1' },
  hg: { z: 80, symbol: 'Hg', nameEn: 'Mercury', nameVn: 'Thủy ngân', group: 12, period: 6, valence: 2, type: 'metal', crystalName: { EN: 'Liquid Metal (Rhombohedral at -39°C)', VN: 'Kim loại lỏng (Mặt thoi ở -39°C)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2' },
  pb: { z: 82, symbol: 'Pb', nameEn: 'Lead', nameVn: 'Chì', group: 14, period: 6, valence: 4, type: 'transition_fcc', crystalName: { EN: 'Face-Centered Cubic (FCC)', VN: 'Lập phương tâm diện (FCC)' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 6s2 6p2' },
  u: { z: 92, symbol: 'U', nameEn: 'Uranium', nameVn: 'Urani', group: 3, period: 7, valence: 2, type: 'metal', crystalName: { EN: 'Orthorhombic Dense Lattice', VN: 'Mạng tinh thể trực thoi mật độ cao' }, config: '1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 4d10 4f14 5s2 5p6 5d10 5f3 6s2 6p6 6d1 7s2' }
};

// Aliases for common registry names / formulas
const ELEMENT_ALIASES: Record<string, string> = {
  lithium: 'li', sodium: 'na', potassium: 'k', rubidium: 'rb', cesium: 'cs',
  magnesium: 'mg', calcium: 'ca', barium: 'ba', strontium: 'sr',
  iron: 'fe', copper: 'cu', zinc: 'zn', aluminum: 'al', silver: 'ag', gold: 'au', platinum: 'pt', lead: 'pb',
  carbon: 'c', silicon: 'si', phosphorus: 'p', sulfur: 's',
  hydrogen: 'h', hydrogen_gas: 'h', h2: 'h',
  nitrogen: 'n', nitrogen_gas: 'n', n2: 'n',
  oxygen: 'o', oxygen_gas: 'o', o2: 'o',
  fluorine: 'f', fluorine_gas: 'f', f2: 'f',
  chlorine: 'cl', chlorine_gas: 'cl', cl2: 'cl',
  bromine: 'br', bromine_water: 'br', br2: 'br',
  iodine: 'i', iodine_solution: 'i', i2: 'i',
  helium: 'he', neon: 'ne', argon: 'ar', krypton: 'kr', xenon: 'xe', radon: 'rn'
};

/**
 * Robustly detects if an ID or formula represents a chemical compound (never an element).
 */
export function isCompoundFormula(formula?: string, id?: string): boolean {
  const normId = (id || '').toLowerCase().trim();
  const rawForm = (formula || '').trim();

  // 1. Explicit compound IDs from curriculum & registry
  const KNOWN_COMPOUND_IDS = new Set([
    'distilled_water', 'water', 'h2o',
    'hcl', 'h2so4', 'hno3', 'h3po4', 'naoh', 'koh', 'caoh2', 'baoh2', 'lioh', 'nh3_aq', 'nh3', 'nh4cl',
    'nacl', 'na2co3', 'nahco3', 'sodium_acetate', 'cuso4', 'fecl3', 'fecl2', 'feso4',
    'cucl2', 'cuno3_2', 'na2so4', 'agno3', 'bacl2', 'ki', 'kmno4', 'cac2', 'mgcl2', 'alcl3', 'zncl2',
    'ethanol', 'methanol', 'glycerol', 'phenol', 'acetic_acid', 'formic_acid',
    'triglyceride', 'ethyl_acetate', 'methyl_acetate', 'ethyl_formate', 'soap', 'glucose', 'acetaldehyde',
    'starch', 'albumin_protein', 'acetylene_gas', 'c2h2', 'carbon_dioxide', 'co2', 'no2_gas', 'no2',
    'phenolphthalein', 'universal_indicator', 'tollens_reagent',
    'cu2o_precipitate', 'cu2o', 'starch_iodine_complex', 'tribromophenol_precipitate',
    'biuret_complex', 'cuoh2_precipitate', 'copper_polyol_complex', 'feoh3_precipitate',
    'agcl_precipitate', 'baso4_precipitate', 'pink_base', 'salt_water',
    'sodium_ethoxide', 'sodium_formate', 'sodium_phenolate', 'iron_phenolate_complex',
    'tetraammine_copper', 'agi_precipitate', 'caco3_precipitate', 'baco3_precipitate',
    'feoh2_precipitate', 'aloh3_precipitate', 'sodium_aluminate', 'pbno3_2', 'pbi2_precipitate',
    'dopamine', 'caffeine', 'aspirin', 'benzene', 'picric_acid'
  ]);

  if (KNOWN_COMPOUND_IDS.has(normId)) return true;

  // 2. Structural radical groups or functional markers
  if (/(\(oh\)|\(no3\)|\(so4\)|\(co3\)|\(po4\)|\(nh4\)|cooh|cho|coo|c6h5|c2h5|ch3|c3h5|c6h12|c6h10)/i.test(rawForm)) return true;
  if (/(\[.*\]|\(.*\)\d+)/.test(rawForm)) return true;

  // 3. Count distinct chemical elements in formula
  const cleanForm = rawForm.replace(/\s*\((s|l|g|aq|solid|liquid|gas|aqueous)\)/gi, '').trim();
  const elemSymbols = cleanForm.match(/[A-Z][a-z]?/g);
  if (elemSymbols) {
    const uniqueElems = new Set(elemSymbols);
    if (uniqueElems.size > 1) return true;
  }

  return false;
}

export function resolveElementEntity(id: string, formula?: string): ElementInfo | null {
  // If it is a chemical compound, NEVER resolve as an element!
  if (isCompoundFormula(formula, id)) return null;

  const cleanId = (id || '').toLowerCase().trim();
  const rawForm = (formula || '').trim();
  const cleanFormula = rawForm.replace(/\s*\((s|l|g|aq|solid|liquid|gas|aqueous)\)/gi, '').toLowerCase().trim();

  // 1. Direct symbol check on ID
  if (ELEMENT_MAP[cleanId]) return ELEMENT_MAP[cleanId];
  if (ELEMENT_ALIASES[cleanId] && ELEMENT_MAP[ELEMENT_ALIASES[cleanId]]) {
    return ELEMENT_MAP[ELEMENT_ALIASES[cleanId]];
  }

  // 2. Direct symbol check on clean formula
  if (ELEMENT_MAP[cleanFormula]) return ELEMENT_MAP[cleanFormula];
  if (ELEMENT_ALIASES[cleanFormula] && ELEMENT_MAP[ELEMENT_ALIASES[cleanFormula]]) {
    return ELEMENT_MAP[ELEMENT_ALIASES[cleanFormula]];
  }

  // 3. Subscripted elemental formula check (e.g. "H2", "H₂", "O2", "N2", "P4", "S8", "O3")
  const subs: Record<string, string> = { '₀':'0', '₁':'1', '₂':'2', '₃':'3', '₄':'4', '₅':'5', '₆':'6', '₇':'7', '₈':'8', '₉':'9' };
  const normalizedForm = cleanFormula.replace(/[₀-₉]/g, m => subs[m]);
  const elementMatch = normalizedForm.match(/^([a-z]{1,2})\d*$/);
  if (elementMatch && elementMatch[1]) {
    const sym = elementMatch[1];
    if (ELEMENT_MAP[sym]) return ELEMENT_MAP[sym];
    if (ELEMENT_ALIASES[sym] && ELEMENT_MAP[ELEMENT_ALIASES[sym]]) return ELEMENT_MAP[ELEMENT_ALIASES[sym]];
  }

  return null;
}

// =========================================================================
// UNIVERSAL HIGH-FIDELITY CHEMICAL STRUCTURE VIEWER
// =========================================================================
export const ChemicalStructureViewer: React.FC<StructureViewerProps> = ({
  id,
  name,
  formula,
  isVi = true,
  color = '#22d3ee',
  initialMode = 'skeletal',
  allowModeSwitch = true,
  className = ''
}) => {
  const normId = (id || '').toLowerCase().trim();
  const [activeMode, setActiveMode] = useState<'skeletal' | 'lewis' | 'electron' | 'orbital3d' | 'insignia'>(initialMode);

  // Check if target is an authentic chemical element
  const elementData = resolveElementEntity(normId, formula);
  const isElement = !!elementData;

  return (
    <div className={`relative flex flex-col items-center justify-center rounded-2xl bg-[#020712]/90 border border-cyan-950/80 p-4 shadow-inner ${className}`}>
      {/* Top Mode Switcher Bar */}
      {allowModeSwitch && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 mb-3 rounded-xl bg-[#040e1e]/90 border border-cyan-900/50 text-[10px] font-mono font-bold tracking-wider uppercase z-10">
          <button
            type="button"
            onClick={() => setActiveMode('skeletal')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeMode === 'skeletal' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.3)]' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isElement 
              ? (isVi ? '🏛️ Cấu Trúc / Tinh Thể' : '🏛️ Structure / Lattice') 
              : (isVi ? '📐 Phân Tử 2D' : '📐 2D Skeletal')}
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('lewis')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeMode === 'lewis' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.3)]' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isVi ? '⚡ Lewis Dot' : '⚡ Lewis Structure'}
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('electron')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeMode === 'electron' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.3)]' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isVi ? '⚛️ Cấu Hình e⁻' : '⚛️ Electron Orbitals'}
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('orbital3d')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeMode === 'orbital3d' 
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isVi ? '🌀 Obitan 3D' : '🌀 3D Orbital'}
          </button>

          {isElement && (
            <button
              type="button"
              onClick={() => setActiveMode('insignia')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeMode === 'insignia' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isVi ? '🛡️ Insignia Đơn Chất' : '🛡️ Crystal Insignia'}
            </button>
          )}
        </div>
      )}

      {/* Main Visualizer Chamber */}
      <div className="relative w-full h-[250px] md:h-[270px] flex items-center justify-center overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {activeMode === 'skeletal' && (
          isElement && elementData 
            ? renderElementStructure(elementData, color, isVi)
            : renderCompoundSkeletal(normId, formula, color, isVi)
        )}

        {activeMode === 'lewis' && (
          isElement && elementData 
            ? renderElementLewis(elementData, color, isVi) 
            : renderCompoundLewis(normId, formula, color, isVi)
        )}

        {activeMode === 'electron' && (
          renderUniversalElectronView(normId, formula, elementData, color, isVi)
        )}

        {activeMode === 'orbital3d' && (
          <Orbital3DViewer
            isVi={isVi}
            elementSymbol={elementData?.symbol}
            className="w-full h-full border-none bg-transparent p-0 shadow-none"
          />
        )}

        {activeMode === 'insignia' && (
          isElement && elementData 
            ? renderElementStructure(elementData, color, isVi) 
            : renderCompoundSkeletal(normId, formula, color, isVi)
        )}
      </div>

      {/* Bottom Educational Subtitle */}
      <div className="mt-2 text-center text-[10px] font-mono text-slate-400 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>
          {activeMode === 'skeletal' && (
            isElement 
              ? (isVi ? 'Mạng tinh thể & liên kết vật lý chuẩn hóa đơn chất' : 'Elemental Crystal Lattice & Physical Allotrope Form')
              : (isVi ? 'Chuẩn hóa đồ họa khung phân tử ChemDraw 2D' : 'ChemDraw-grade 2D Skeletal Vector Formula')
          )}
          {activeMode === 'lewis' && (isVi ? 'Cấu trúc Lewis với cặp electron liên kết & electron tự do (:)' : 'Lewis Structure with Lone Pairs & Bonding Pairs')}
          {activeMode === 'electron' && (isVi ? 'Cấu hình electron Aufbau & Quy tắc Hund ô Orbital' : 'Aufbau Electron Configuration & Hund Orbital Boxes')}
          {activeMode === 'orbital3d' && (isVi ? 'Không gian lượng tử 3D, mặt phẳng nút & đám mây xác suất electron' : '3D Quantum Orbital Cloud, Nodal Planes & Wavefunction Density')}
          {activeMode === 'insignia' && (isVi ? 'Biểu tượng hình học & Cấu trúc mạng tinh thể đơn chất' : 'Elemental Allotrope Insignia & Lattice Matrix')}
        </span>
      </div>
    </div>
  );
};

// =========================================================================
// 2. ELEMENT STRUCTURE & CRYSTAL LATTICE RENDERER
// =========================================================================
function renderElementStructure(el: ElementInfo, color: string, isVi: boolean) {
  // 1. Diatomic Nonmetals (H2, N2, O2, F2, Cl2, Br2, I2)
  if (el.type === 'diatomic') {
    const isTriple = el.symbol === 'N';
    const isDouble = el.symbol === 'O';
    const bondLabel = isTriple ? 'N≡N (945 kJ/mol)' : isDouble ? 'O=O (498 kJ/mol)' : `${el.symbol}—${el.symbol}`;

    return (
      <svg viewBox="0 0 280 190" className="w-full h-full max-w-[260px] drop-shadow-[0_0_15px_rgba(34,211,238,0.35)]">
        <circle cx="85" cy="95" r="32" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
        <text x="85" y="102" textAnchor="middle" fill="#ffffff" fontSize="22" fontFamily="sans-serif" fontWeight="900">{el.symbol}</text>
        
        <circle cx="195" cy="95" r="32" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
        <text x="195" y="102" textAnchor="middle" fill="#ffffff" fontSize="22" fontFamily="sans-serif" fontWeight="900">{el.symbol}</text>

        {isTriple ? (
          <>
            <line x1="117" y1="85" x2="163" y2="85" stroke="#f8fafc" strokeWidth="3" />
            <line x1="117" y1="95" x2="163" y2="95" stroke="#38bdf8" strokeWidth="3" />
            <line x1="117" y1="105" x2="163" y2="105" stroke="#f8fafc" strokeWidth="3" />
          </>
        ) : isDouble ? (
          <>
            <line x1="117" y1="88" x2="163" y2="88" stroke="#f8fafc" strokeWidth="3.5" />
            <line x1="117" y1="102" x2="163" y2="102" stroke="#38bdf8" strokeWidth="3.5" />
          </>
        ) : (
          <line x1="117" y1="95" x2="163" y2="95" stroke="#f8fafc" strokeWidth="4" />
        )}

        {el.valence >= 5 && (
          <>
            <circle cx="50" cy="95" r="3" fill="#38bdf8" /><circle cx="43" cy="95" r="3" fill="#38bdf8" />
            <circle cx="230" cy="95" r="3" fill="#38bdf8" /><circle cx="237" cy="95" r="3" fill="#38bdf8" />
          </>
        )}
        {el.valence >= 6 && (
          <>
            <circle cx="85" cy="58" r="3" fill="#38bdf8" /><circle cx="85" cy="51" r="3" fill="#38bdf8" />
            <circle cx="195" cy="58" r="3" fill="#38bdf8" /><circle cx="195" cy="51" r="3" fill="#38bdf8" />
          </>
        )}

        <text x="140" y="155" textAnchor="middle" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
          {bondLabel}
        </text>
        <text x="140" y="175" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? el.crystalName.VN : el.crystalName.EN}
        </text>
      </svg>
    );
  }

  // 2. Carbon Allotropes (Graphite Honeycomb & Diamond Tetrahedral)
  if (el.type === 'carbon') {
    return (
      <svg viewBox="0 0 280 190" className="w-full h-full max-w-[260px]">
        <polygon points="90,65 120,50 150,65 150,95 120,110 90,95" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        <polygon points="150,65 180,50 210,65 210,95 180,110 150,95" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        <polygon points="120,110 150,95 180,110 180,140 150,155 120,140" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        {[[90,65],[120,50],[150,65],[180,50],[210,65],[210,95],[180,110],[150,95],[120,110],[90,95],[180,140],[150,155],[120,140]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill="#f8fafc" stroke="#0284c7" strokeWidth="1" />
        ))}
        <circle cx="150" cy="125" r="14" fill="none" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="140" y="172" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Mạng Lục Giác Graphene (Than Chì sp²)' : 'Graphene Honeycomb (Graphite sp²)'}
        </text>
      </svg>
    );
  }

  // 3. Phosphorus Allotrope (P4 Tetrahedron)
  if (el.type === 'phosphorus') {
    return (
      <svg viewBox="0 0 280 190" className="w-full h-full max-w-[260px]">
        <polygon points="140,40 75,140 205,140" fill="none" stroke="#fb923c" strokeWidth="3" />
        <line x1="140" y1="40" x2="140" y2="108" stroke="#fb923c" strokeWidth="2.5" strokeDasharray="3 3" />
        <line x1="75" y1="140" x2="140" y2="108" stroke="#fb923c" strokeWidth="2.5" />
        <line x1="205" y1="140" x2="140" y2="108" stroke="#fb923c" strokeWidth="2.5" />
        
        <circle cx="140" cy="40" r="12" fill="#ea580c" /><text x="140" y="45" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">P</text>
        <circle cx="75" cy="140" r="12" fill="#ea580c" /><text x="75" y="145" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">P</text>
        <circle cx="205" cy="140" r="12" fill="#ea580c" /><text x="205" y="145" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">P</text>
        <circle cx="140" cy="108" r="11" fill="#c2410c" /><text x="140" y="113" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">P</text>
        
        <text x="140" y="168" textAnchor="middle" fill="#fb923c" fontSize="11" fontFamily="monospace" fontWeight="bold">
          {isVi ? 'Góc liên kết 60°' : 'Bond angle 60°'}
        </text>
        <text x="140" y="182" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
          {isVi ? 'Tứ Diện Photpho Trắng (P₄ Molecule)' : 'White Phosphorus P₄ Tetrahedron'}
        </text>
      </svg>
    );
  }

  // 4. Sulfur Allotrope (S8 Crown Ring)
  if (el.type === 'sulfur') {
    const pts: [number, number][] = [
      [65,100], [90,65], [120,90], [150,60], [180,90], [210,65], [230,100], [190,130], [150,110], [110,130]
    ];
    return (
      <svg viewBox="0 0 280 190" className="w-full h-full max-w-[260px]">
        <polyline 
          points={pts.map(p => p.join(',')).join(' ') + ' ' + pts[0].join(',')} 
          fill="none" 
          stroke="#facc15" 
          strokeWidth="3.5" 
        />
        {pts.slice(0, 8).map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="7" fill="#ca8a04" stroke="#fef08a" strokeWidth="2" />
        ))}
        <text x="145" y="158" textAnchor="middle" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">
          {isVi ? 'Góc nhăn 108° (Octasulfur)' : 'Puckered angle 108° (Octasulfur)'}
        </text>
        <text x="145" y="176" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
          {isVi ? 'Vòng Vương Miện Lưu Huỳnh S₈' : 'Crown Octagon S₈ Ring'}
        </text>
      </svg>
    );
  }

  // 5. Noble Gas (He, Ne, Ar, Kr, Xe, Rn)
  if (el.type === 'noble_gas') {
    return (
      <svg viewBox="0 0 280 190" className="w-full h-full max-w-[260px]">
        <circle cx="140" cy="90" r="65" fill="none" stroke="rgba(192,132,252,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="140" cy="90" r="42" fill="none" stroke="rgba(192,132,252,0.5)" strokeWidth="1.5" />
        <circle cx="140" cy="90" r="22" fill="#7e22ce" stroke="#c084fc" strokeWidth="2" />
        
        <text x="140" y="95" textAnchor="middle" fill="#ffffff" fontSize="14" fontFamily="monospace" fontWeight="900">
          +{el.z}
        </text>

        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 140 + 65 * Math.cos(rad);
          const cy = 90 + 65 * Math.sin(rad);
          return <circle key={i} cx={cx} cy={cy} r="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />;
        })}

        <text x="140" y="168" textAnchor="middle" fill="#c084fc" fontSize="12" fontFamily="monospace" fontWeight="bold">
          {el.symbol} : {el.z === 2 ? 'Duet 1s²' : 'Valence Octet 8e⁻'}
        </text>
        <text x="140" y="184" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
          {isVi ? el.crystalName.VN : el.crystalName.EN}
        </text>
      </svg>
    );
  }

  // 6. Metalloids (Si, Ge, B)
  if (el.type === 'metalloid') {
    return (
      <svg viewBox="0 0 280 190" className="w-full h-full max-w-[260px]">
        <line x1="140" y1="85" x2="140" y2="40" stroke="#94a3b8" strokeWidth="3" />
        <line x1="140" y1="85" x2="85" y2="120" stroke="#94a3b8" strokeWidth="3" />
        <line x1="140" y1="85" x2="195" y2="120" stroke="#94a3b8" strokeWidth="3" />
        <line x1="140" y1="85" x2="140" y2="135" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="3 2" />

        <circle cx="140" cy="85" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
        <text x="140" y="90" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{el.symbol}</text>

        <circle cx="140" cy="40" r="10" fill="#475569" /><circle cx="85" cy="120" r="10" fill="#475569" />
        <circle cx="195" cy="120" r="10" fill="#475569" /><circle cx="140" cy="135" r="9" fill="#334155" />

        <text x="140" y="165" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
          {isVi ? 'Tứ diện sp³ (109.5°)' : 'Tetrahedral sp³ (109.5°)'}
        </text>
        <text x="140" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
          {isVi ? el.crystalName.VN : el.crystalName.EN}
        </text>
      </svg>
    );
  }

  // 7. Metallic Crystal Lattices (FCC, BCC, HCP)
  const isFCC = el.type === 'transition_fcc' || ['cu', 'al', 'au', 'ag', 'ni', 'pt', 'pb', 'ca'].includes(el.symbol.toLowerCase());
  const isHCP = el.type === 'transition_hcp' || ['mg', 'zn', 'ti', 'cd', 'co'].includes(el.symbol.toLowerCase());

  return (
    <svg viewBox="0 0 280 190" className="w-full h-full max-w-[260px] drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
      <rect x="75" y="55" width="75" height="75" fill="none" stroke="rgba(34,211,238,0.4)" strokeWidth="2" />
      <rect x="120" y="28" width="75" height="75" fill="none" stroke="rgba(34,211,238,0.4)" strokeWidth="2" />
      
      <line x1="75" y1="55" x2="120" y2="28" stroke="rgba(34,211,238,0.4)" strokeWidth="2" />
      <line x1="150" y1="55" x2="195" y2="28" stroke="rgba(34,211,238,0.4)" strokeWidth="2" />
      <line x1="75" y1="130" x2="120" y2="103" stroke="rgba(34,211,238,0.4)" strokeWidth="2" />
      <line x1="150" y1="130" x2="195" y2="103" stroke="rgba(34,211,238,0.4)" strokeWidth="2" />

      {[
        [75,55],[150,55],[75,130],[150,130],
        [120,28],[195,28],[120,103],[195,103]
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="6.5" fill="#38bdf8" stroke="#0c4a6e" strokeWidth="1.5" />
      ))}

      {isFCC ? (
        <>
          <circle cx="112" cy="92" r="7.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="157" cy="65" r="7.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="135" cy="41" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="135" cy="116" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
        </>
      ) : (
        <circle cx="135" cy="79" r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
      )}

      <text x="135" y="83" textAnchor="middle" fill="#020617" fontSize="9" fontWeight="900" fontFamily="sans-serif">
        {el.symbol}
      </text>

      <text x="140" y="160" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
        {isVi
          ? (isFCC ? 'Mạng Lập Phương Tâm Diện (FCC 74%)' : isHCP ? 'Mạng Lục Phương Xếp Chặt (HCP)' : 'Mạng Lập Phương Tâm Khối (BCC 68%)')
          : (isFCC ? 'Face-Centered Cubic (FCC 74%)' : isHCP ? 'Hexagonal Close-Packed (HCP)' : 'Body-Centered Cubic (BCC 68%)')}
      </text>
      <text x="140" y="178" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
        {isVi ? el.crystalName.VN : el.crystalName.EN}
      </text>
    </svg>
  );
}

// =========================================================================
// 3. COMPOUND SKELETAL MOLECULAR DIAGRAM RENDERER
// =========================================================================
function renderCompoundSkeletal(id: string, formulaStr: string | undefined, color: string, isVi: boolean) {
  const norm = id.toLowerCase().trim();
  const rawForm = (formulaStr || '').toLowerCase().trim();

  // A. GLUCOSE (C6H12O6 / α-D-Glucopyranose Haworth Ring)
  if (norm.includes('glucose') || norm.includes('c6h12o6') || rawForm.includes('c6h12o6')) {
    return (
      <svg viewBox="0 0 320 220" className="w-full h-full max-w-[290px] drop-shadow-[0_0_16px_rgba(56,189,248,0.35)]">
        {/* Haworth Pyranose 6-Membered Ring */}
        <polygon points="115,75 190,75 215,115 185,150 115,150 85,115" fill="rgba(34,211,238,0.08)" stroke="#38bdf8" strokeWidth="2.5" />
        {/* Front edge thick shading for Haworth 3D perspective */}
        <polyline points="85,115 115,150 185,150 215,115" fill="none" stroke="#f8fafc" strokeWidth="4.5" />
        
        {/* Ring Heteroatom Oxygen */}
        <circle cx="190" cy="75" r="14" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
        <text x="190" y="80" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">O</text>

        {/* C1 (α-anomer: -OH pointing down) */}
        <line x1="215" y1="115" x2="215" y2="85" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 2" />
        <text x="215" y="80" textAnchor="middle" fill="#94a3b8" fontSize="11">H</text>
        <line x1="215" y1="115" x2="215" y2="155" stroke="#38bdf8" strokeWidth="3" />
        <text x="215" y="170" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">OH</text>

        {/* C2: -OH down */}
        <line x1="185" y1="150" x2="185" y2="185" stroke="#38bdf8" strokeWidth="3" />
        <text x="185" y="198" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">OH</text>
        <line x1="185" y1="150" x2="185" y2="125" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 2" />
        <text x="185" y="120" textAnchor="middle" fill="#94a3b8" fontSize="11">H</text>

        {/* C3: -OH up */}
        <line x1="115" y1="150" x2="115" y2="118" stroke="#38bdf8" strokeWidth="3" />
        <text x="115" y="112" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">HO</text>
        <line x1="115" y1="150" x2="115" y2="185" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 2" />
        <text x="115" y="198" textAnchor="middle" fill="#94a3b8" fontSize="11">H</text>

        {/* C4: -OH down */}
        <line x1="85" y1="115" x2="55" y2="125" stroke="#38bdf8" strokeWidth="3" />
        <text x="35" y="130" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">HO</text>
        <line x1="85" y1="115" x2="85" y2="85" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 2" />
        <text x="85" y="80" textAnchor="middle" fill="#94a3b8" fontSize="11">H</text>

        {/* C5: -CH2OH up */}
        <line x1="115" y1="75" x2="115" y2="35" stroke="#38bdf8" strokeWidth="3.5" />
        <text x="115" y="28" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">CH₂OH</text>

        <text x="160" y="215" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'α-D-Glucopyranose (C₆H₁₂O₆ - Vòng Haworth 6 cạnh)' : 'α-D-Glucopyranose (C₆H₁₂O₆ - Haworth Ring)'}
        </text>
      </svg>
    );
  }

  // B. GLYCEROL (C3H5(OH)3 / Propane-1,2,3-triol)
  if (norm.includes('glycerol') || norm.includes('c3h5') || rawForm.includes('c3h5')) {
    return (
      <svg viewBox="0 0 340 210" className="w-full h-full max-w-[310px] drop-shadow-[0_0_16px_rgba(56,189,248,0.35)]">
        {/* 3-Carbon Zig-Zag Backbone */}
        <line x1="70" y1="110" x2="140" y2="70" stroke="#f8fafc" strokeWidth="4" />
        <line x1="140" y1="70" x2="210" y2="110" stroke="#f8fafc" strokeWidth="4" />

        {/* Carbon Labels */}
        <text x="70" y="132" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="monospace">C₁H₂</text>
        <text x="140" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="monospace">C₂H</text>
        <text x="210" y="132" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="monospace">C₃H₂</text>

        {/* 3 -OH Groups branching */}
        <line x1="70" y1="110" x2="30" y2="85" stroke="#38bdf8" strokeWidth="3.5" />
        <text x="12" y="85" fill="#38bdf8" fontSize="15" fontFamily="sans-serif" fontWeight="bold">HO</text>

        <line x1="140" y1="70" x2="140" y2="25" stroke="#38bdf8" strokeWidth="3.5" />
        <text x="140" y="18" textAnchor="middle" fill="#38bdf8" fontSize="15" fontFamily="sans-serif" fontWeight="bold">OH</text>

        <line x1="210" y1="110" x2="250" y2="85" stroke="#38bdf8" strokeWidth="3.5" />
        <text x="256" y="90" fill="#38bdf8" fontSize="15" fontFamily="sans-serif" fontWeight="bold">OH</text>

        <path d="M 35,65 Q 140,0 255,65" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
        
        <text x="160" y="168" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
          {isVi ? '3 nhóm -OH kề nhau (Vicinal Triol)' : '3 adjacent -OH groups (Vicinal Triol)'}
        </text>
        <text x="160" y="195" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
          {isVi ? 'Glycerol (Propan-1,2,3-triol)' : 'Glycerol (Propane-1,2,3-triol)'}
        </text>
      </svg>
    );
  }

  // C. STARCH ((C6H10O5)n / Amylose polymer)
  if (norm.includes('starch') || norm.includes('c6h10o5') || rawForm.includes('c6h10o5')) {
    return (
      <svg viewBox="0 0 340 210" className="w-full h-full max-w-[310px] drop-shadow-[0_0_16px_rgba(56,189,248,0.35)]">
        {/* Unit 1 */}
        <polygon points="50,90 90,90 105,115 90,135 50,135 35,115" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        <text x="90" y="92" fill="#38bdf8" fontSize="10" fontWeight="bold">O</text>
        {/* α-1,4-glycosidic link */}
        <line x1="105" y1="115" x2="135" y2="125" stroke="#f8fafc" strokeWidth="3" />
        <circle cx="145" cy="125" r="9" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
        <text x="145" y="129" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">O</text>
        <line x1="155" y1="125" x2="185" y2="115" stroke="#f8fafc" strokeWidth="3" />
        {/* Unit 2 */}
        <polygon points="185,115 200,90 240,90 255,115 240,135 200,135" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        <text x="240" y="92" fill="#38bdf8" fontSize="10" fontWeight="bold">O</text>

        {/* Polymer Brackets */}
        <path d="M 25,65 L 15,65 L 15,155 L 25,155" fill="none" stroke="#94a3b8" strokeWidth="2" />
        <path d="M 265,65 L 275,65 L 275,155 L 265,155" fill="none" stroke="#94a3b8" strokeWidth="2" />
        <text x="285" y="160" fill="#38bdf8" fontSize="16" fontFamily="monospace" fontWeight="bold">n</text>

        <text x="150" y="175" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
          {isVi ? 'Liên kết α-1,4-Glycosidic' : 'α-1,4-Glycosidic Linkage'}
        </text>
        <text x="150" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Tinh Bột (Amylose / Amylopectin)' : 'Starch Polysaccharide Chain'}
        </text>
      </svg>
    );
  }

  // D. CARBON DIOXIDE (CO2)
  if (norm.includes('carbon_dioxide') || norm === 'co2' || rawForm === 'co2') {
    return (
      <svg viewBox="0 0 290 180" className="w-full h-full max-w-[270px]">
        {/* Linear O = C = O (180°) */}
        <line x1="75" y1="85" x2="130" y2="85" stroke="#f43f5e" strokeWidth="3.5" />
        <line x1="75" y1="95" x2="130" y2="95" stroke="#f43f5e" strokeWidth="3.5" />
        <line x1="160" y1="85" x2="215" y2="85" stroke="#f43f5e" strokeWidth="3.5" />
        <line x1="160" y1="95" x2="215" y2="95" stroke="#f43f5e" strokeWidth="3.5" />

        <circle cx="60" cy="90" r="18" fill="#9f1239" stroke="#fb7185" strokeWidth="2" />
        <text x="60" y="96" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">O</text>

        <circle cx="145" cy="90" r="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
        <text x="145" y="96" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">C</text>

        <circle cx="230" cy="90" r="18" fill="#9f1239" stroke="#fb7185" strokeWidth="2" />
        <text x="230" y="96" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">O</text>

        {/* Dipole arrows cancelling */}
        <line x1="130" y1="65" x2="75" y2="65" stroke="#38bdf8" strokeWidth="2" />
        <line x1="160" y1="65" x2="215" y2="65" stroke="#38bdf8" strokeWidth="2" />
        <text x="145" y="55" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace">
          {isVi ? 'μ = 0 (Thẳng 180°, Không phân cực)' : 'μ = 0 (Linear 180°, Non-polar)'}
        </text>
        <text x="145" y="150" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          Carbon Dioxide (O=C=O, sp)
        </text>
      </svg>
    );
  }

  // E. NITROGEN DIOXIDE (NO2)
  if (norm.includes('no2') || rawForm === 'no2') {
    return (
      <svg viewBox="0 0 290 180" className="w-full h-full max-w-[270px]">
        <circle cx="145" cy="70" r="18" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
        <text x="145" y="76" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">N⁺</text>
        {/* Radical electron dot */}
        <circle cx="145" cy="46" r="3.5" fill="#f59e0b" />

        {/* Left Double Bond O */}
        <line x1="130" y1="80" x2="88" y2="120" stroke="#f43f5e" strokeWidth="3" />
        <line x1="138" y1="88" x2="96" y2="128" stroke="#f43f5e" strokeWidth="3" />
        <circle cx="85" cy="130" r="16" fill="#9f1239" stroke="#fb7185" strokeWidth="2" />
        <text x="85" y="136" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">O</text>

        {/* Right Single/Dative Bond O */}
        <line x1="158" y1="82" x2="202" y2="125" stroke="#f8fafc" strokeWidth="3.5" />
        <circle cx="205" cy="130" r="16" fill="#9f1239" stroke="#fb7185" strokeWidth="2" />
        <text x="205" y="136" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">O⁻</text>

        <text x="145" y="115" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace">
          {isVi ? 'Góc 134° (Gốc tự do e⁻ lẻ)' : '134° Angle (Odd e⁻ Radical)'}
        </text>
        <text x="145" y="165" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Nitơ Đioxit (Khí nâu đỏ NO₂)' : 'Nitrogen Dioxide (Red-Brown Gas NO₂)'}
        </text>
      </svg>
    );
  }

  // F. ACETYLENE / ETHYNE (C2H2)
  if (norm.includes('acetylene') || norm === 'c2h2' || rawForm === 'c2h2') {
    return (
      <svg viewBox="0 0 300 170" className="w-full h-full max-w-[280px]">
        {/* H - C ≡ C - H (180°) */}
        <line x1="55" y1="85" x2="95" y2="85" stroke="#f8fafc" strokeWidth="3.5" />
        <circle cx="40" cy="85" r="15" fill="#0369a1" />
        <text x="40" y="90" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">H</text>

        <line x1="125" y1="77" x2="175" y2="77" stroke="#38bdf8" strokeWidth="3" />
        <line x1="125" y1="85" x2="175" y2="85" stroke="#f8fafc" strokeWidth="3" />
        <line x1="125" y1="93" x2="175" y2="93" stroke="#38bdf8" strokeWidth="3" />

        <circle cx="110" cy="85" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <text x="110" y="90" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">C</text>

        <circle cx="190" cy="85" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <text x="190" y="90" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">C</text>

        <line x1="205" y1="85" x2="245" y2="85" stroke="#f8fafc" strokeWidth="3.5" />
        <circle cx="260" cy="85" r="15" fill="#0369a1" />
        <text x="260" y="90" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">H</text>

        <text x="150" y="130" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace">
          {isVi ? 'Liên kết ba C≡C (1σ + 2π, sp 180°)' : 'Triple bond C≡C (1σ + 2π, sp 180°)'}
        </text>
        <text x="150" y="152" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Axetilen (C₂H₂ - Hiđrocacbon chưa no)' : 'Acetylene (C₂H₂ - Alkyne)'}
        </text>
      </svg>
    );
  }

  // G. ACETALDEHYDE (CH3CHO)
  if (norm.includes('acetaldehyde') || norm === 'ch3cho' || rawForm === 'ch3cho') {
    return (
      <svg viewBox="0 0 290 180" className="w-full h-full max-w-[270px]">
        <text x="45" y="105" fill="#f8fafc" fontSize="14" fontWeight="bold">H₃C</text>
        <line x1="80" y1="100" x2="140" y2="70" stroke="#f8fafc" strokeWidth="3.5" />
        <line x1="140" y1="70" x2="190" y2="105" stroke="#38bdf8" strokeWidth="3.5" />
        <text x="200" y="112" fill="#38bdf8" fontSize="15" fontWeight="bold">H</text>
        
        {/* Carbonyl C=O */}
        <line x1="136" y1="68" x2="136" y2="25" stroke="#f43f5e" strokeWidth="3" />
        <line x1="144" y1="68" x2="144" y2="25" stroke="#f43f5e" strokeWidth="3" />
        <text x="140" y="18" textAnchor="middle" fill="#f43f5e" fontSize="16" fontWeight="bold">O</text>

        <text x="140" y="145" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace">
          {isVi ? 'Nhóm chức Anđehit -CH=O (sp²)' : 'Aldehyde Functional Group -CH=O (sp²)'}
        </text>
        <text x="140" y="165" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Axetanđehit (Etanal - Tráng bạc Tollens)' : 'Acetaldehyde (Ethanal - Tollens Mirror)'}
        </text>
      </svg>
    );
  }

  // H. FORMIC ACID (HCOOH)
  if (norm.includes('formic') || norm === 'hcooh' || rawForm === 'hcooh') {
    return (
      <svg viewBox="0 0 290 180" className="w-full h-full max-w-[270px]">
        <text x="50" y="95" fill="#f8fafc" fontSize="15" fontWeight="bold">H</text>
        <line x1="68" y1="90" x2="130" y2="90" stroke="#f8fafc" strokeWidth="3.5" />
        
        {/* C=O */}
        <line x1="126" y1="88" x2="126" y2="40" stroke="#f43f5e" strokeWidth="3" />
        <line x1="134" y1="88" x2="134" y2="40" stroke="#f43f5e" strokeWidth="3" />
        <text x="130" y="32" textAnchor="middle" fill="#f43f5e" fontSize="16" fontWeight="bold">O</text>

        {/* -OH */}
        <line x1="130" y1="90" x2="190" y2="120" stroke="#38bdf8" strokeWidth="3.5" />
        <text x="200" y="128" fill="#38bdf8" fontSize="15" fontWeight="bold">OH</text>

        <text x="140" y="150" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace">
          {isVi ? 'Axit vừa có tính Axit vừa có tính Anđehit' : 'Dual Carboxylic Acid & Aldehyde Character'}
        </text>
        <text x="140" y="168" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Axit Fomic (Axit kiến HCOOH)' : 'Formic Acid (Methanoic acid HCOOH)'}
        </text>
      </svg>
    );
  }

  // I. TRIGLYCERIDE (Fat / Vegetable Oil)
  if (norm.includes('triglyceride') || norm.includes('vegetable_oil') || rawForm.includes('c17h33coo')) {
    return (
      <svg viewBox="0 0 320 200" className="w-full h-full max-w-[290px]">
        {/* Glycerol backbone */}
        <line x1="50" y1="50" x2="50" y2="150" stroke="#f8fafc" strokeWidth="3.5" />
        <text x="35" y="55" fill="#94a3b8" fontSize="10">CH₂</text>
        <text x="35" y="105" fill="#94a3b8" fontSize="10">CH</text>
        <text x="35" y="155" fill="#94a3b8" fontSize="10">CH₂</text>

        {/* 3 Ester Branches */}
        {[50, 100, 150].map((y, idx) => (
          <g key={idx}>
            <line x1="50" y1={y} x2="90" y2={y} stroke="#38bdf8" strokeWidth="3" />
            <text x="100" y={y + 5} fill="#38bdf8" fontSize="12" fontWeight="bold">O</text>
            <line x1="112" y1={y} x2="140" y2={y} stroke="#f8fafc" strokeWidth="2.5" />
            <line x1="138" y1={y - 2} x2="138" y2={y - 15} stroke="#f43f5e" strokeWidth="2.5" />
            <text x="138" y={y - 17} textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">O</text>
            <path d={`M 140,${y} Q 180,${y-8} 220,${y} T 280,${y}`} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="285" y={y + 4} fill="#f59e0b" fontSize="9" fontFamily="monospace">R₁₇H₃₃</text>
          </g>
        ))}

        <text x="160" y="185" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Chất Béo Trieste (Glycerol + 3 Axit Béo)' : 'Triglyceride Triester Backbone'}
        </text>
      </svg>
    );
  }

  // J. SOAP (Sodium Stearate / Palmitate)
  if (norm.includes('soap') || norm.includes('c17h35coona') || rawForm.includes('coona')) {
    return (
      <svg viewBox="0 0 320 180" className="w-full h-full max-w-[290px]">
        {/* Hydrophobic Wavy Tail */}
        <path d="M 30,90 Q 55,75 80,90 T 130,90 T 180,90 T 220,90" fill="none" stroke="#f59e0b" strokeWidth="3.5" />
        <text x="90" y="115" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">
          {isVi ? 'Đuôi Kỵ Nước C₁₇H₃₅—' : 'Hydrophobic Tail C₁₇H₃₅—'}
        </text>

        {/* Hydrophilic Head -COO- Na+ */}
        <circle cx="245" cy="90" r="14" fill="#9f1239" stroke="#fb7185" strokeWidth="2" />
        <text x="245" y="94" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">COO⁻</text>

        <circle cx="285" cy="90" r="12" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
        <text x="285" y="94" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Na⁺</text>

        <text x="160" y="155" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace">
          {isVi ? 'Đầu Ưa Nước (Cơ chế micell tẩy rửa)' : 'Hydrophilic Head (Micelle mechanism)'}
        </text>
        <text x="160" y="172" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Xà Phòng (Natri Stearat C₁₇H₃₅COONa)' : 'Soap (Sodium Stearate Amphiphilic)'}
        </text>
      </svg>
    );
  }

  // K. AMMONIA (NH3)
  if (norm.includes('nh3') || rawForm.includes('nh3')) {
    return (
      <svg viewBox="0 0 280 180" className="w-full h-full max-w-[250px]">
        <circle cx="140" cy="80" r="22" fill="#1e40af" stroke="#60a5fa" strokeWidth="2.5" />
        <text x="140" y="87" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">N</text>
        
        {/* Lone pair electron cloud */}
        <ellipse cx="140" cy="45" rx="14" ry="10" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="136" cy="45" r="2.5" fill="#38bdf8" /><circle cx="144" cy="45" r="2.5" fill="#38bdf8" />

        {/* 3 H bonds in trigonal pyramid */}
        <line x1="125" y1="95" x2="85" y2="130" stroke="#f8fafc" strokeWidth="3" />
        <circle cx="80" cy="135" r="12" fill="#0369a1" /><text x="80" y="139" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">H</text>

        <line x1="140" y1="102" x2="140" y2="140" stroke="#f8fafc" strokeWidth="4" />
        <circle cx="140" cy="145" r="12" fill="#0369a1" /><text x="140" y="149" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">H</text>

        <line x1="155" y1="95" x2="195" y2="130" stroke="#f8fafc" strokeWidth="3" />
        <circle cx="200" cy="135" r="12" fill="#0369a1" /><text x="200" y="139" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">H</text>

        <text x="140" y="172" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Amoniac (Chóp tam giác 107°, Bazơ Bronsted)' : 'Ammonia (Trigonal Pyramid 107°, Bronsted Base)'}
        </text>
      </svg>
    );
  }

  // L. STRONG BASES (NaOH, KOH, LiOH, Ca(OH)2, Ba(OH)2)
  if (norm.includes('naoh') || norm.includes('koh') || norm.includes('lioh') || norm.includes('caoh') || norm.includes('baoh')) {
    const metal = norm.includes('na') ? 'Na⁺' : norm.includes('k') ? 'K⁺' : norm.includes('li') ? 'Li⁺' : norm.includes('ca') ? 'Ca²⁺' : 'Ba²⁺';
    const isDi = norm.includes('ca') || norm.includes('ba');
    return (
      <svg viewBox="0 0 300 180" className="w-full h-full max-w-[270px]">
        {/* Metal Cation */}
        <circle cx="85" cy="90" r="26" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />
        <text x="85" y="97" textAnchor="middle" fill="#f59e0b" fontSize="17" fontWeight="bold">{metal}</text>

        {/* Ionic Electrostatic Attraction */}
        <line x1="115" y1="90" x2="165" y2="90" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 3" />
        <text x="140" y="80" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">
          {isVi ? 'Hút Tĩnh Điện' : 'Electrostatic Attraction'}
        </text>

        {/* Hydroxide Anion [OH]- */}
        <g transform="translate(195, 90)">
          <circle cx="0" cy="0" r="26" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
          <text x="0" y="6" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">OH⁻</text>
          {isDi && <text x="32" y="6" fill="#38bdf8" fontSize="14" fontWeight="bold">×2</text>}
        </g>

        <text x="150" y="150" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace">
          {isVi ? 'Liên kết Ion Phân Ly Hoàn Toàn (pH = 14)' : 'Complete Ionic Dissociation (pH = 14)'}
        </text>
        <text x="150" y="168" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Dung dịch Kiềm Mạnh (Bazơ Tan)' : 'Strong Alkaline Hydroxide Pair'}
        </text>
      </svg>
    );
  }

  // M. INORGANIC SALTS & PRECIPITATES (CuSO4, NaCl, Na2CO3, CaCO3, BaSO4, AgCl, Cu2O, PbI2)
  if (norm.includes('cuso4') || norm.includes('cucl2') || norm.includes('feso4') || norm.includes('fecl3') || norm.includes('agno3')) {
    const isCu = norm.includes('cu');
    const cation = isCu ? 'Cu²⁺' : norm.includes('fe') ? (norm.includes('fecl3') ? 'Fe³⁺' : 'Fe²⁺') : 'Ag⁺';
    const anion = norm.includes('so4') ? 'SO₄²⁻' : norm.includes('cl') ? 'Cl⁻' : 'NO₃⁻';
    return (
      <svg viewBox="0 0 300 180" className="w-full h-full max-w-[270px]">
        <circle cx="85" cy="90" r="26" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
        <text x="85" y="97" textAnchor="middle" fill="#38bdf8" fontSize="17" fontWeight="bold">{cation}</text>

        <line x1="115" y1="90" x2="165" y2="90" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 3" />

        <circle cx="195" cy="90" r="26" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />
        <text x="195" y="97" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">{anion}</text>

        <text x="140" y="150" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace">
          {isVi ? 'Muối Điện Ly Mạnh Trong Nước' : 'Strong Electrolyte Salt in Solution'}
        </text>
        <text x="140" y="168" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Phức Hợp Muối Vô Cơ (Cation + Anion)' : 'Inorganic Salt Ionic Coordination'}
        </text>
      </svg>
    );
  }

  // N. PRECIPITATES (Cu2O, Cu(OH)2, Fe(OH)3, AgCl, BaSO4, PbI2)
  if (norm.includes('precipitate') || norm === 'cu2o' || norm === 'agcl' || norm === 'baso4' || norm === 'pbi2') {
    return (
      <svg viewBox="0 0 300 180" className="w-full h-full max-w-[270px]">
        {/* Crystal precipitate grid box */}
        <rect x="70" y="45" width="160" height="80" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
        <text x="150" y="90" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="bold" fontFamily="monospace">
          {rawForm.toUpperCase() || (isVi ? 'KẾT TỦA' : 'PRECIPITATE')} ↓
        </text>
        <text x="150" y="112" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace">
          {isVi ? 'Mạng Tinh Thể Khó Tan (Ksp)' : 'Insoluble Crystal Lattice (Ksp)'}
        </text>
        <text x="150" y="160" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Chất Rắn Kết Tủa Đặc Trưng' : 'Authentic Chemical Precipitate Form'}
        </text>
      </svg>
    );
  }

  // O. NITRIC ACID (HNO3)
  if (norm.includes('hno3') || norm.includes('nitric')) {
    return (
      <svg viewBox="0 0 320 210" className="w-full h-full max-w-[290px] drop-shadow-[0_0_16px_rgba(56,189,248,0.4)]">
        <circle cx="160" cy="100" r="18" fill="#1e40af" stroke="#60a5fa" strokeWidth="2.5" />
        <text x="160" y="106" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="sans-serif" fontWeight="900">N⁺</text>

        <line x1="142" y1="100" x2="90" y2="100" stroke="#f8fafc" strokeWidth="3.5" />
        <circle cx="90" cy="100" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
        <text x="90" y="105" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">O</text>
        <line x1="76" y1="100" x2="42" y2="100" stroke="#38bdf8" strokeWidth="3" />
        <text x="28" y="105" textAnchor="middle" fill="#38bdf8" fontSize="15" fontWeight="bold">H</text>

        <line x1="172" y1="87" x2="220" y2="55" stroke="#f43f5e" strokeWidth="3" />
        <line x1="178" y1="96" x2="226" y2="64" stroke="#f43f5e" strokeWidth="3" />
        <circle cx="230" cy="55" r="15" fill="#9f1239" stroke="#fb7185" strokeWidth="2" />
        <text x="230" y="60" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">O</text>

        <line x1="172" y1="112" x2="222" y2="145" stroke="#f8fafc" strokeWidth="3.5" />
        <circle cx="230" cy="145" r="16" fill="#9f1239" stroke="#fb7185" strokeWidth="2" />
        <text x="230" y="150" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">O⁻</text>

        <path d="M 220,70 Q 185,100 220,130" fill="none" stroke="rgba(244,63,94,0.6)" strokeWidth="2" strokeDasharray="3 2" />
        <text x="160" y="150" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace">120° (sp² planar)</text>
        <text x="160" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Axit Nitric (HNO₃) - Cấu trúc cộng hưởng phẳng' : 'Nitric Acid (HNO₃) - Resonant Planar Form'}
        </text>
      </svg>
    );
  }

  // P. SULFURIC ACID (H2SO4)
  if (norm.includes('h2so4') || norm.includes('sulfuric')) {
    return (
      <svg viewBox="0 0 300 200" className="w-full h-full max-w-[270px]">
        <circle cx="150" cy="100" r="16" fill="#ca8a04" stroke="#facc15" strokeWidth="2.5" />
        <text x="150" y="105" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="bold">S</text>

        <line x1="145" y1="84" x2="145" y2="45" stroke="#f43f5e" strokeWidth="3" />
        <line x1="155" y1="84" x2="155" y2="45" stroke="#f43f5e" strokeWidth="3" />
        <text x="150" y="38" textAnchor="middle" fill="#f43f5e" fontSize="15" fontWeight="bold">O</text>

        <line x1="145" y1="116" x2="145" y2="155" stroke="#f43f5e" strokeWidth="3" />
        <line x1="155" y1="116" x2="155" y2="155" stroke="#f43f5e" strokeWidth="3" />
        <text x="150" y="172" textAnchor="middle" fill="#f43f5e" fontSize="15" fontWeight="bold">O</text>

        <line x1="134" y1="100" x2="85" y2="100" stroke="#38bdf8" strokeWidth="3" />
        <text x="55" y="105" fill="#38bdf8" fontSize="14" fontWeight="bold">HO</text>

        <line x1="166" y1="100" x2="215" y2="100" stroke="#38bdf8" strokeWidth="3" />
        <text x="220" y="105" fill="#38bdf8" fontSize="14" fontWeight="bold">OH</text>

        <text x="150" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          Sulfuric Acid (H₂SO₄ - Tetrahedral sp³)
        </text>
      </svg>
    );
  }

  // Q. PHOSPHORIC ACID (H3PO4)
  if (norm.includes('h3po4') || norm.includes('phosphoric')) {
    return (
      <svg viewBox="0 0 300 200" className="w-full h-full max-w-[270px]">
        <circle cx="150" cy="95" r="16" fill="#ea580c" stroke="#fb923c" strokeWidth="2.5" />
        <text x="150" y="100" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="bold">P</text>

        <line x1="145" y1="79" x2="145" y2="40" stroke="#f43f5e" strokeWidth="3" />
        <line x1="155" y1="79" x2="155" y2="40" stroke="#f43f5e" strokeWidth="3" />
        <text x="150" y="32" textAnchor="middle" fill="#f43f5e" fontSize="15" fontWeight="bold">O</text>

        <line x1="134" y1="95" x2="80" y2="80" stroke="#38bdf8" strokeWidth="3" />
        <text x="50" y="85" fill="#38bdf8" fontSize="14" fontWeight="bold">HO</text>

        <line x1="166" y1="95" x2="220" y2="80" stroke="#38bdf8" strokeWidth="3" />
        <text x="225" y="85" fill="#38bdf8" fontSize="14" fontWeight="bold">OH</text>

        <line x1="150" y1="111" x2="150" y2="150" stroke="#38bdf8" strokeWidth="3" />
        <text x="150" y="168" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">OH</text>

        <text x="150" y="195" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          Phosphoric Acid (H₃PO₄ - Triprotic)
        </text>
      </svg>
    );
  }

  // R. HYDROCHLORIC ACID (HCl)
  if (norm.includes('hcl')) {
    return (
      <svg viewBox="0 0 280 180" className="w-full h-full max-w-[250px]">
        <circle cx="80" cy="90" r="16" fill="#0284c7" />
        <text x="80" y="95" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">H</text>
        <line x1="96" y1="90" x2="180" y2="90" stroke="#f8fafc" strokeWidth="4" />
        <circle cx="198" cy="90" r="24" fill="#047857" stroke="#10b981" strokeWidth="2" />
        <text x="198" y="96" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">Cl</text>
        <text x="80" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold">δ⁺</text>
        <text x="198" y="60" fill="#f43f5e" fontSize="11" fontWeight="bold">δ⁻</text>
        <text x="140" y="155" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          Hydrochloric Acid (Polar Covalent)
        </text>
      </svg>
    );
  }

  // S. ETHANOL & ACETIC ACID & ESTERS
  if (norm.includes('ethanol') || norm === 'c2h5oh' || rawForm.includes('c2h5oh')) {
    return (
      <svg viewBox="0 0 280 180" className="w-full h-full max-w-[260px]">
        <line x1="40" y1="100" x2="100" y2="60" stroke="#f8fafc" strokeWidth="3.5" />
        <line x1="100" y1="60" x2="160" y2="100" stroke="#f8fafc" strokeWidth="3.5" />
        <line x1="160" y1="100" x2="215" y2="65" stroke="#38bdf8" strokeWidth="3.5" />
        <text x="20" y="112" fill="#f8fafc" fontSize="14" fontWeight="bold">CH₃</text>
        <text x="220" y="68" fill="#38bdf8" fontSize="16" fontWeight="bold">OH</text>
        <text x="140" y="150" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Ethanol (C₂H₅OH)</text>
      </svg>
    );
  }

  if (norm.includes('acetic_acid') || norm === 'ch3cooh' || rawForm.includes('ch3cooh')) {
    return (
      <svg viewBox="0 0 280 180" className="w-full h-full max-w-[260px]">
        <line x1="50" y1="100" x2="120" y2="60" stroke="#f8fafc" strokeWidth="3.5" />
        <line x1="116" y1="58" x2="116" y2="15" stroke="#f43f5e" strokeWidth="3" />
        <line x1="124" y1="58" x2="124" y2="15" stroke="#f43f5e" strokeWidth="3" />
        <text x="120" y="10" textAnchor="middle" fill="#f43f5e" fontSize="16" fontWeight="bold">O</text>
        <line x1="120" y1="60" x2="185" y2="98" stroke="#38bdf8" strokeWidth="3.5" />
        <text x="190" y="106" fill="#38bdf8" fontSize="16" fontWeight="bold">OH</text>
        <text x="30" y="112" fill="#f8fafc" fontSize="14" fontWeight="bold">H₃C</text>
        <text x="140" y="160" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Acetic Acid (CH₃COOH)</text>
      </svg>
    );
  }

  // T. PHENOL & BENZENE
  if (norm.includes('phenol') || norm === 'c6h5oh') {
    return (
      <svg viewBox="0 0 260 200" className="w-full h-full max-w-[240px]">
        <polygon points="130,55 170,78 170,123 130,145 90,123 90,78" fill="none" stroke="#f8fafc" strokeWidth="3.5" />
        <circle cx="130" cy="100" r="22" fill="none" stroke="rgba(248,250,252,0.6)" strokeWidth="2.5" strokeDasharray="4 2" />
        <line x1="130" y1="55" x2="130" y2="22" stroke="#38bdf8" strokeWidth="3.5" />
        <text x="130" y="18" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">OH</text>
        <text x="130" y="180" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Phenol (C₆H₅OH)</text>
      </svg>
    );
  }

  if (norm.includes('benzene') || norm === 'c6h6') {
    return (
      <svg viewBox="0 0 240 200" className="w-full h-full max-w-[220px]">
        <polygon points="120,40 165,65 165,115 120,140 75,115 75,65" fill="none" stroke="#f8fafc" strokeWidth="4" />
        <circle cx="120" cy="90" r="26" fill="none" stroke="rgba(34,211,238,0.8)" strokeWidth="3" />
        <text x="120" y="175" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Benzene (C₆H₆)</text>
      </svg>
    );
  }

  // U. WATER (H2O)
  if (norm === 'h2o' || norm.includes('water')) {
    return (
      <svg viewBox="0 0 240 180" className="w-full h-full max-w-[220px]">
        <circle cx="120" cy="70" r="18" fill="#0284c7" />
        <text x="120" y="75" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">O</text>
        <line x1="108" y1="82" x2="75" y2="115" stroke="#f8fafc" strokeWidth="4" />
        <line x1="132" y1="82" x2="165" y2="115" stroke="#f8fafc" strokeWidth="4" />
        <circle cx="70" cy="120" r="12" fill="#38bdf8" />
        <text x="70" y="124" textAnchor="middle" fill="#030712" fontSize="11" fontWeight="bold">H</text>
        <circle cx="170" cy="120" r="12" fill="#38bdf8" />
        <text x="170" y="124" textAnchor="middle" fill="#030712" fontSize="11" fontWeight="bold">H</text>
        <text x="120" y="105" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">104.5°</text>
        <text x="120" y="160" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Water (Bent Geometry)</text>
      </svg>
    );
  }

  // V. PROCEDURAL HIGH-FIDELITY 2D CHEMICAL GRAPH ENGINE
  return renderProceduralChemicalGraph(formulaStr || id, color, isVi);
}

// =========================================================================
// 4. PROCEDURAL 2D CHEMICAL GRAPH ENGINE
// =========================================================================
function renderProceduralChemicalGraph(rawFormula: string, color: string, isVi: boolean) {
  const clean = rawFormula.replace(/\([a-zA-Z\s]+\)/g, '').trim();
  const tokens: { sym: string; count: number }[] = [];
  const regex = /([A-Z][a-z]*)(\d*)/g;
  let m;
  while ((m = regex.exec(clean)) !== null) {
    if (m[1]) {
      tokens.push({ sym: m[1], count: m[2] ? parseInt(m[2], 10) : 1 });
    }
  }

  const getCPKColor = (sym: string) => {
    const s = sym.toUpperCase();
    if (s === 'H') return '#38bdf8';
    if (s === 'C') return '#f8fafc';
    if (s === 'N') return '#818cf8';
    if (s === 'O') return '#f43f5e';
    if (s === 'S') return '#facc15';
    if (s === 'P') return '#fb923c';
    if (['F', 'CL', 'BR', 'I'].includes(s)) return '#34d399';
    return '#f59e0b';
  };

  const centerAtom = tokens[0]?.sym || 'X';
  const ligandAtoms = tokens.slice(1);

  return (
    <svg viewBox="0 0 320 220" className="w-full h-full max-w-[290px] drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">
      <circle cx="160" cy="100" r="26" fill="#0f172a" stroke={getCPKColor(centerAtom)} strokeWidth="3" />
      <text x="160" y="107" textAnchor="middle" fill="#ffffff" fontSize="18" fontFamily="sans-serif" fontWeight="900">
        {centerAtom}
      </text>

      {ligandAtoms.length > 0 ? (
        ligandAtoms.map((lig, idx) => {
          const total = ligandAtoms.length;
          const angle = (idx * (360 / total) - 90) * (Math.PI / 180);
          const lx = 160 + 75 * Math.cos(angle);
          const ly = 100 + 75 * Math.sin(angle);
          const ligColor = getCPKColor(lig.sym);

          return (
            <g key={idx}>
              <line 
                x1="160" y1="100" x2={lx} y2={ly} 
                stroke={ligColor} strokeWidth="3" strokeDasharray={total > 3 ? '4 2' : undefined} 
              />
              <circle cx={lx} cy={ly} r="18" fill="#0f172a" stroke={ligColor} strokeWidth="2.5" />
              <text x={lx} y={ly + 5} textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                {lig.sym}{lig.count > 1 ? `₍${lig.count}₎` : ''}
              </text>
            </g>
          );
        })
      ) : (
        <circle cx="160" cy="100" r="45" fill="none" stroke="rgba(34,211,238,0.4)" strokeWidth="2" strokeDasharray="5 3" />
      )}

      <path d="M 40,40 L 25,40 L 25,160 L 40,160" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />
      <path d="M 280,40 L 295,40 L 295,160 L 280,160" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />

      <text x="160" y="185" textAnchor="middle" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
        {clean}
      </text>
      <text x="160" y="202" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
        {isVi ? 'Mô hình liên kết không gian phân tử' : '2D Stereochemical Vector Coordination'}
      </text>
    </svg>
  );
}

// =========================================================================
// 5. UNIVERSAL LEWIS STRUCTURE RENDERER
// =========================================================================
function renderElementLewis(el: ElementInfo, color: string, isVi: boolean) {
  const dots = el.valence;
  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
        <text 
          x="100" 
          y="112" 
          textAnchor="middle" 
          fill="#ffffff" 
          fontSize="38" 
          fontFamily="monospace" 
          fontWeight="900"
          style={{ filter: `drop-shadow(0 0 10px ${color})` }}
        >
          {el.symbol}
        </text>

        {dots >= 1 && <circle cx="100" cy="58" r="4.5" fill="#38bdf8" />}
        {dots >= 5 && <circle cx="86" cy="58" r="4.5" fill="#38bdf8" />}
        {dots >= 5 && <circle cx="114" cy="58" r="4.5" fill="#38bdf8" />}

        {dots >= 2 && <circle cx="142" cy="100" r="4.5" fill="#38bdf8" />}
        {dots >= 6 && <circle cx="142" cy="86" r="4.5" fill="#38bdf8" />}
        {dots >= 6 && <circle cx="142" cy="114" r="4.5" fill="#38bdf8" />}

        {dots >= 3 && <circle cx="100" cy="142" r="4.5" fill="#38bdf8" />}
        {dots >= 7 && <circle cx="86" cy="142" r="4.5" fill="#38bdf8" />}
        {dots >= 7 && <circle cx="114" cy="142" r="4.5" fill="#38bdf8" />}

        {dots >= 4 && <circle cx="58" cy="100" r="4.5" fill="#38bdf8" />}
        {dots >= 8 && <circle cx="58" cy="86" r="4.5" fill="#38bdf8" />}
        {dots >= 8 && <circle cx="58" cy="114" r="4.5" fill="#38bdf8" />}
      </svg>

      <span className="text-xs font-mono font-bold text-cyan-300 -mt-2">
        {dots} {isVi ? 'electron hóa trị (Valence e⁻)' : 'Valence Electrons'}
      </span>
    </div>
  );
}

function renderCompoundLewis(id: string, formulaStr: string | undefined, color: string, isVi: boolean) {
  const norm = id.toLowerCase().trim();
  const rawForm = (formulaStr || '').toLowerCase().trim();

  // 1. Carbon Dioxide Lewis
  if (norm.includes('co2') || rawForm === 'co2') {
    return (
      <svg viewBox="0 0 280 180" className="w-full h-full max-w-[260px]">
        {/* :O=C=O: */}
        <text x="60" y="105" textAnchor="middle" fill="#f43f5e" fontSize="28" fontWeight="bold">O</text>
        <circle cx="48" cy="80" r="3.5" fill="#f43f5e" /><circle cx="60" cy="74" r="3.5" fill="#f43f5e" />
        <circle cx="48" cy="120" r="3.5" fill="#f43f5e" /><circle cx="60" cy="126" r="3.5" fill="#f43f5e" />

        <line x1="80" y1="92" x2="120" y2="92" stroke="#f8fafc" strokeWidth="3" />
        <line x1="80" y1="102" x2="120" y2="102" stroke="#f8fafc" strokeWidth="3" />

        <text x="140" y="105" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="bold">C</text>

        <line x1="160" y1="92" x2="200" y2="92" stroke="#f8fafc" strokeWidth="3" />
        <line x1="160" y1="102" x2="200" y2="102" stroke="#f8fafc" strokeWidth="3" />

        <text x="220" y="105" textAnchor="middle" fill="#f43f5e" fontSize="28" fontWeight="bold">O</text>
        <circle cx="232" cy="80" r="3.5" fill="#f43f5e" /><circle cx="220" cy="74" r="3.5" fill="#f43f5e" />
        <circle cx="232" cy="120" r="3.5" fill="#f43f5e" /><circle cx="220" cy="126" r="3.5" fill="#f43f5e" />

        <text x="140" y="160" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Lewis: Đầy đủ bát tử octet, 2 cặp liên kết đôi (=)' : 'Lewis: Complete octet, 2 double bonds (=)'}
        </text>
      </svg>
    );
  }

  // 2. Nitric acid Lewis
  if (norm.includes('hno3') || norm.includes('nitric')) {
    return (
      <svg viewBox="0 0 300 180" className="w-full h-full max-w-[270px]">
        <text x="150" y="105" textAnchor="middle" fill="#ffffff" fontSize="26" fontWeight="bold">N⁺</text>
        <line x1="125" y1="100" x2="85" y2="100" stroke="#f8fafc" strokeWidth="2.5" />
        <text x="70" y="105" textAnchor="middle" fill="#38bdf8" fontSize="22" fontWeight="bold">O</text>
        <line x1="55" y1="100" x2="25" y2="100" stroke="#f8fafc" strokeWidth="2.5" />
        <text x="15" y="105" textAnchor="middle" fill="#38bdf8" fontSize="20" fontWeight="bold">H</text>

        <line x1="146" y1="78" x2="146" y2="45" stroke="#f8fafc" strokeWidth="2.5" />
        <line x1="154" y1="78" x2="154" y2="45" stroke="#f8fafc" strokeWidth="2.5" />
        <text x="150" y="38" textAnchor="middle" fill="#f43f5e" fontSize="22" fontWeight="bold">O</text>
        <circle cx="138" cy="20" r="3" fill="#f43f5e" /><circle cx="162" cy="20" r="3" fill="#f43f5e" />

        <line x1="150" y1="115" x2="150" y2="145" stroke="#f8fafc" strokeWidth="2.5" />
        <text x="150" y="168" textAnchor="middle" fill="#f43f5e" fontSize="22" fontWeight="bold">O⁻</text>
        <circle cx="132" cy="165" r="3" fill="#f43f5e" /><circle cx="168" cy="165" r="3" fill="#f43f5e" />

        <text x="150" y="180" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Lewis: Đầy đủ cặp e⁻ tự do & điện tích hình thức' : 'Lewis: Complete lone pairs & formal charges'}
        </text>
      </svg>
    );
  }

  // 3. Ammonia (NH3) Lewis
  if (norm.includes('nh3') || rawForm.includes('nh3')) {
    return (
      <svg viewBox="0 0 260 180" className="w-full h-full max-w-[240px]">
        <text x="130" y="95" textAnchor="middle" fill="#ffffff" fontSize="30" fontWeight="bold">N</text>
        {/* 1 lone pair on top */}
        <circle cx="123" cy="62" r="3.5" fill="#38bdf8" /><circle cx="137" cy="62" r="3.5" fill="#38bdf8" />
        
        {/* 3 single bonds */}
        <line x1="112" y1="104" x2="80" y2="128" stroke="#f8fafc" strokeWidth="3" />
        <text x="70" y="142" textAnchor="middle" fill="#38bdf8" fontSize="22" fontWeight="bold">H</text>

        <line x1="130" y1="108" x2="130" y2="140" stroke="#f8fafc" strokeWidth="3" />
        <text x="130" y="162" textAnchor="middle" fill="#38bdf8" fontSize="22" fontWeight="bold">H</text>

        <line x1="148" y1="104" x2="180" y2="128" stroke="#f8fafc" strokeWidth="3" />
        <text x="190" y="142" textAnchor="middle" fill="#38bdf8" fontSize="22" fontWeight="bold">H</text>

        <text x="130" y="24" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
          {isVi ? 'Lewis: 1 cặp e⁻ tự do + 3 cặp liên kết' : 'Lewis: 1 lone pair + 3 bonding pairs'}
        </text>
      </svg>
    );
  }

  // 4. Default Water Lewis
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full max-w-[220px]">
      <text x="120" y="95" textAnchor="middle" fill="#ffffff" fontSize="32" fontFamily="monospace" fontWeight="900">O</text>
      <circle cx="106" cy="62" r="3.5" fill="#38bdf8" />
      <circle cx="118" cy="62" r="3.5" fill="#38bdf8" />
      <circle cx="140" cy="80" r="3.5" fill="#38bdf8" />
      <circle cx="140" cy="92" r="3.5" fill="#38bdf8" />
      <line x1="102" y1="104" x2="72" y2="128" stroke="#f8fafc" strokeWidth="3" />
      <text x="60" y="142" textAnchor="middle" fill="#38bdf8" fontSize="24" fontFamily="monospace" fontWeight="bold">H</text>
      <line x1="112" y1="112" x2="112" y2="145" stroke="#f8fafc" strokeWidth="3" />
      <text x="112" y="168" textAnchor="middle" fill="#38bdf8" fontSize="24" fontFamily="monospace" fontWeight="bold">H</text>
      <text x="120" y="24" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
        {isVi ? 'Lewis: 2 cặp liên kết + 2 cặp e⁻ tự do' : 'Lewis: 2 bonding pairs + 2 lone pairs'}
      </text>
    </svg>
  );
}

// =========================================================================
// 6. UNIVERSAL ELECTRON CONFIGURATION & ORBITAL BOX VIEW
// =========================================================================
function renderUniversalElectronView(
  id: string, 
  formula: string | undefined, 
  elementData: ElementInfo | null, 
  color: string, 
  isVi: boolean
) {
  // If element, compute exact Aufbau configuration
  let config = elementData ? elementData.config : '';
  let descriptor = '';

  if (!config) {
    // Look up compound electron profile
    try {
      const prof = getSubstanceStructureProfile(id, formula || '', 0, true, isVi);
      if (prof && prof.electronConfig) {
        config = prof.electronConfig.nobleGas ? (isVi ? prof.electronConfig.nobleGas.VN : prof.electronConfig.nobleGas.EN) : '';
        descriptor = prof.electronConfig.full ? (isVi ? prof.electronConfig.full.VN : prof.electronConfig.full.EN) : '';
      }
    } catch (e) {
      config = '1s2 2s2 2p6 3s2 3p6';
    }
  }

  if (!config) {
    config = '1s2 2s2 2p6 3s2 3p6';
  }

  // Format orbital configuration text nicely
  const displayConfig = descriptor || config;

  return (
    <div className="flex flex-col items-center justify-center p-2 w-full max-w-sm">
      <div className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-200 font-mono text-xs font-bold tracking-widest text-center shadow-inner max-w-xs break-words">
        {displayConfig}
      </div>

      <div className="w-full mt-2">
        <OrbitalBoxDiagram configuration={elementData ? elementData.config : '2s2 2p4'} color={color} />
      </div>

      <div className="mt-3 flex items-center gap-3 text-[10px] font-mono text-slate-400">
        <span>↑ Spin Up (+1/2)</span>
        <span>↓ Spin Down (-1/2)</span>
      </div>
    </div>
  );
}

export default ChemicalStructureViewer;
