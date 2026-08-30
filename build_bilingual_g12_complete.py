# -*- coding: utf-8 -*-
import json

# Comprehensive English translations for all 30 Grade 12 lessons
G12_ENGLISH_DATA = {
    1: {
        "title": "Lesson 1: Esters – Lipids (Structure, Nomenclature & Properties)",
        "summary": "Esters and lipids are vital organic families across biochemistry and industry. Esters provide pleasant fruity fragrances and perfumery essences, while lipids (fats and oils) serve as primary biological energy reserves and cell membrane matrices.",
        "sections": [
            {
                "heading": "1. Core Concept & Molecular Architecture of Esters",
                "points": [
                    "When the -OH hydroxyl group of a carboxylic acid (-COOH) is replaced by an alkoxy group (-OR') from an alcohol, an Ester (general formula: R-COO-R', R' ≠ H) is synthesized.",
                    "Saturated monocarboxylic esters have the general molecular formula C_n H_2n O_2 (n ≥ 2). Examples: HCOOCH3 (Methyl formate), CH3COOC2H5 (Ethyl acetate).",
                    "IUPAC Nomenclature: Hydrocarbon group R' (alkyl/aryl) + Carboxylate root ending in '-oate' / '-ate' (e.g., CH3COOC2H5 is named Ethyl acetate; HCOOCH3 is Methyl formate)."
                ]
            },
            {
                "heading": "2. Physical Properties & Characteristic Fragrances",
                "points": [
                    "Esters are volatile liquids or low-melting solids, lighter than water and sparingly soluble in aqueous media due to the absence of intermolecular hydrogen bonding between ester molecules.",
                    "Boiling points of esters are significantly lower than those of isomeric carboxylic acids and alcohols of comparable molecular mass.",
                    "Characteristic fruity aromas: Isoamyl acetate (CH3COOCH2CH2CH(CH3)2) smells of ripe bananas; Ethyl butyrate smells of pineapples; Benzyl acetate smells of jasmine blossoms."
                ]
            },
            {
                "heading": "3. Chemical Reactions & Hydrolysis Mechanisms",
                "points": [
                    "Acid-Catalyzed Hydrolysis (Reversible Equilibrium): R-COO-R' + H2O ⇌ R-COOH + R'-OH (reflux with dilute H2SO4). Reaction reaches dynamic equilibrium, separating into two immiscible liquid layers.",
                    "Base-Promoted Hydrolysis / Saponification (Irreversible): R-COO-R' + NaOH → R-COONa + R'-OH (heat). Reaction goes to completion, yielding water-soluble carboxylate salts and alcohols.",
                    "Special Ester Cleavages: Phenyl esters require 2 equivalents of NaOH (R-COOC6H5 + 2NaOH → R-COONa + C6H5ONa + H2O); Vinyl esters yield aldehydes (CH3COOCH=CH2 + NaOH → CH3COONa + CH3CHO)."
                ]
            },
            {
                "heading": "4. Lipids, Fats & Fatty Acid Classification",
                "points": [
                    "Lipids are hydrophobic biological macromolecules insoluble in water but highly soluble in nonpolar organic solvents (ether, benzene, chloroform, hexane).",
                    "Fats (Triglycerides / Triacylglycerols) are triesters of glycerol with long-chain unbranched fatty acids (even carbon numbers from C12 to C24).",
                    "Four Fundamental Fatty Acids: Palmitic acid (C15H31COOH, saturated, M=256), Stearic acid (C17H35COOH, saturated, M=284), Oleic acid (C17H33COOH, monounsaturated cis-C=C, M=282), Linoleic acid (C17H31COOH, diunsaturated, M=280).",
                    "Saturated fats (Tristearin, Tripalmitin) are solids at room temperature (animal tallows). Unsaturated fats (Triolein) are liquids at room temperature (vegetable oils).",
                    "Catalytic Hydrogenation: Triolein (liquid) + 3H2 → Tristearin (solid) (Ni catalyst at 180°C) industrially converts vegetable oils into solid margarine and shortenings.",
                    "Lipid Rancidification: Atmospheric oxygen slowly oxidizes unsaturated C=C double bonds into organic peroxides, which decompose into foul-smelling, toxic aldehydes and ketones."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Saturated Monocarboxylic Ester}: \\text{C}_n\\text{H}_{2n}\\text{O}_2 \\quad (n \\ge 2)$$",
            "$$\\text{Acid Hydrolysis}: R\\text{-COO-}R' + \\text{H}_2\\text{O} \\;\\underset{\\text{H}^+, t^\\circ}{\\rightleftharpoons}\\; R\\text{-COOH} + R'\\text{-OH}$$",
            "$$\\text{Saponification}: R\\text{-COO-}R' + \\text{NaOH} \\;\\xrightarrow{t^\\circ}\\; R\\text{-COONa} + R'\\text{-OH}$$",
            "$$\\text{Triglyceride Saponification}: (R\\text{-COO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\;\\xrightarrow{t^\\circ}\\; 3R\\text{-COONa (Soap)} + \\text{C}_3\\text{H}_5(\\text{OH})_3\\text{ (Glycerol)}$$"
        ],
        "equations": [
            "$$\\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{C}_2\\text{H}_5\\text{OH} \\quad [\\text{Saponification of Ethyl Acetate}]$$",
            "$$(\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\xrightarrow{t^\\circ} 3\\text{C}_{17}\\text{H}_{35}\\text{COONa} + \\text{C}_3\\text{H}_5(\\text{OH})_3 \\quad [\\text{Tristearin Saponification}]$$",
            "$$(\\text{C}_{17}\\text{H}_{33}\\text{COO})_3\\text{C}_3\\text{H}_5\\text{ (liquid)} + 3\\text{H}_2 \\xrightarrow{\\text{Ni}, t^\\circ} (\\text{C}_{17}\\text{H}_{35}\\text{COO})_3\\text{C}_3\\text{H}_5\\text{ (solid)} \\quad [\\text{Hydrogenation}]$$",
            "$$\\text{CH}_3\\text{COOCH=CH}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_3\\text{COONa} + \\text{CH}_3\\text{CHO} \\quad [\\text{Vinyl Ester Cleavage}]$$"
        ],
        "q": "Why are unsaturated fats (vegetable oils) liquid at room temperature whereas saturated fats (animal lard) are solid under identical conditions?",
        "a": "Unsaturated fatty acid chains (such as oleate and linoleate) possess cis-configured C=C double bonds that introduce rigid kinks into the hydrocarbon chain. These kinks prevent tight, orderly intermolecular packing, substantially weakening London dispersion forces and lowering the melting point (liquid state). In contrast, saturated fatty acid chains adopt fully extended zig-zag conformations that pack densely into crystal lattices with strong intermolecular attractions, resulting in higher melting points (solid state)."
    },
    2: {
        "title": "Lesson 2: Soaps & Synthetic Detergents",
        "summary": "Investigation of the physicochemical cleansing mechanisms of soaps and synthetic syndet detergents, comparative analysis of surfactants, and performance characteristics in hard water environments.",
        "sections": [
            {
                "heading": "1. Definition & Composition of Soaps",
                "points": [
                    "Soap is a formulation containing sodium (Na⁺) or potassium (K⁺) salts of long-chain fatty acids (primarily sodium stearate C17H35COONa and sodium palmitate C15H31COONa), blended with perfumes and additives.",
                    "Sodium carboxylate salts form traditional solid bar soaps, while potassium salts yield liquid soaps and creamy shaving foams."
                ]
            },
            {
                "heading": "2. Molecular Architecture & Micellar Cleansing Action",
                "points": [
                    "Surfactant molecules feature amphiphilic structures: a polar hydrophilic head (carboxylate -COO⁻Na⁺ or sulfonate -SO3⁻Na⁺) and a nonpolar hydrophobic hydrocarbon tail (lipophilic alkyl chain).",
                    "Cleansing Mechanism: The lipophilic tails embed deeply into grease and oil stains on fabric fibers, while hydrophilic heads orient outward into the aqueous phase. Agitation disperses oil droplets into suspended colloidal micelles, which are rinsed away with water."
                ]
            },
            {
                "heading": "3. Soaps vs Synthetic Detergents in Hard Water",
                "points": [
                    "Hard water contains elevated concentrations of multivalent calcium (Ca²⁺) and magnesium (Mg²⁺) cations.",
                    "Limitation of Traditional Soaps: Carboxylate anions react with Ca²⁺ and Mg²⁺ to form insoluble precipitates (e.g., (C17H35COO)2Ca ↓ / soap scum), depleting lather and causing yellowing of fabrics.",
                    "Advantage of Synthetic Detergents (Alkylbenzene sulfonates R-C6H4-SO3Na): Calcium and magnesium sulfonate salts are completely water-soluble, maintaining robust cleansing efficiency in hard water."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Amphiphilic Structure}: \\underbrace{R\\text{-}}_{\\text{Hydrophobic / Lipophilic Tail}} \\;-\\; \\underbrace{\\text{COO}^-\\text{Na}^+}_{\\text{Hydrophilic Polar Head}}$$",
            "$$\\text{Soap Precipitation in Hard Water}: 2R\\text{-COO}^- + \\text{Ca}^{2+} \\longrightarrow (R\\text{-COO})_2\\text{Ca}\\downarrow \\quad (\\text{Insoluble Scum})$$",
            "$$\\text{Synthetic Detergent}: R\\text{-SO}_3\\text{Na} + \\text{Ca}^{2+} \\longrightarrow \\text{Soluble complex (No precipitation)}$$"
        ],
        "equations": [
            "$$2\\text{C}_{17}\\text{H}_{35}\\text{COONa} + \\text{Ca}^{2+} \\longrightarrow (\\text{C}_{17}\\text{H}_{35}\\text{COO})_2\\text{Ca}\\downarrow\\text{ (White Scum)} + 2\\text{Na}^+$$",
            "$$R\\text{-SO}_3\\text{Na} + \\text{Ca}^{2+} \\longrightarrow \\text{Readily Soluble in Hard Water}$$"
        ],
        "q": "Why does washing clothes with traditional soap in well water (hard water) lead to fabric yellowing and excessive soap consumption, whereas synthetic laundry detergents lather abundantly and clean effectively?",
        "a": "Traditional soap (sodium fatty acid salts, RCOONa) reacts with dissolved Ca²⁺ and Mg²⁺ cations in hard water to form sticky, insoluble calcium stearate precipitates: 2RCOONa + Ca²⁺ → (RCOO)2Ca ↓. This insoluble scum adheres to fabric fibers causing dinginess and yellow discoloration while consuming large amounts of soap before foaming occurs. In contrast, synthetic detergents contain sulfonate groups (R-SO3Na) whose calcium and magnesium salts are completely water-soluble, allowing unobstructed lathering and cleansing in hard water."
    },
    3: {
        "title": "Lesson 3: Review Chapter 1: Esters & Lipids",
        "summary": "Systematic review of foundational calculations: ester combustion stoichiometry, multi-component saponification mass balance, lipid yield, and saponification number determinations.",
        "sections": [
            {
                "heading": "1. Stoichiometric Methodologies for Esters & Lipids",
                "points": [
                    "Mass Conservation in Saponification: m_ester + m_NaOH = m_salt + m_alcohol.",
                    "Triglyceride Saponification Balance: n_NaOH = 3 × n_fat = 3 × n_glycerol ⇒ m_fat + m_NaOH = m_soap + m_glycerol.",
                    "Saturated Monocarboxylic Ester Combustion: n_CO2 = n_H2O and n_O2 = (3n - 2)/2 × n_ester.",
                    "Saponification Value: The number of milligrams of KOH required to neutralize free fatty acids and completely saponify all esters in 1.0 gram of fat."
                ]
            }
        ],
        "formulas": [
            "$$n_{\\text{NaOH}} = 3 \\times n_{\\text{glycerol}} = 3 \\times n_{\\text{triglyceride}}$$",
            "$$\\text{Mass Conservation}: m_{\\text{fat}} + m_{\\text{NaOH}} = m_{\\text{soap}} + m_{\\text{glycerol}}$$",
            "$$n_{\\text{CO}_2} = n_{\\text{H}_2\\text{O}} \\quad (\\text{Combustion of Saturated Open-Chain Ester})$$"
        ],
        "equations": [
            "$$(R\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\xrightarrow{t^\\circ} 3R\\text{COONa} + \\text{C}_3\\text{H}_5(\\text{OH})_3$$"
        ],
        "q": "Complete saponification of 17.8 g of tristearin (C17H35COO)3C3H5 requires an exact stoichiometric volume of 10% NaOH solution. Calculate the required mass of 10% NaOH solution and the mass of glycerol produced.",
        "a": "Molar mass of tristearin M = 890 g/mol ⇒ n_tristearin = 17.8 / 890 = 0.02 mol. Stoichiometric n_NaOH = 0.02 × 3 = 0.06 mol ⇒ m_pure_NaOH = 0.06 × 40 = 2.4 g ⇒ m_solution_10% = 2.4 / 0.10 = 24.0 g. Amount of glycerol produced n_glycerol = 0.02 mol ⇒ m_glycerol = 0.02 × 92 = 1.84 g."
    },
    4: {
        "title": "Lesson 4: Carbohydrates: Glucose & Fructose (Structures & Tollens Test)",
        "summary": "Carbohydrates (saccharides) are ubiquitous polyhydroxy carbonyl compounds. Glucose and fructose are the two essential monosaccharides providing immediate cellular bioenergetic fuel.",
        "sections": [
            {
                "heading": "1. Molecular Architecture of Glucose & Fructose",
                "points": [
                    "Glucose (C6H12O6, M=180) is a polyhydroxy aldehyde: open-chain form contains 5 adjacent hydroxyl groups (-OH) and 1 terminal aldehyde group (-CHO) (CH2OH-(CHOH)4-CHO). In aqueous solution, it exists in dynamic equilibrium predominantly as cyclic α- and β-pyranose hemiacetal rings.",
                    "Fructose (C6H12O6, M=180) is an isomer of glucose: open-chain polyhydroxy ketone containing 5 hydroxyl groups and a C2 carbonyl ketone group (>C=O) (CH2OH-(CHOH)3-CO-CH2OH), predominantly adopting cyclic furanose hemiketal forms.",
                    "Base-Catalyzed Lobry de Bruyn–Alberda van Ekenstein Transformation: In alkaline media (OH⁻), fructose isomerizes reversibly into glucose via an enediol intermediate (Fructose ⇌ Enediol ⇌ Glucose)."
                ]
            },
            {
                "heading": "2. Characteristic Chemical Reactions of Glucose",
                "points": [
                    "Polyhydroxy Character (Vicinal -OH groups): At room temperature, glucose dissolves freshly precipitated Cu(OH)2 to form an intense deep-blue soluble copper(II)-glucose chelate complex.",
                    "Aldehyde Oxidation (Silver Mirror Test): Reacts with Tollens' reagent [Ag(NH3)2]OH to deposit a brilliant metallic silver mirror on the glass wall (1 mol Glucose yields 2 mol Ag metal).",
                    "Fehling's / Alkaline Copper Reduction: Heating with alkaline Cu(OH)2/NaOH produces a characteristic brick-red precipitate of copper(I) oxide Cu2O.",
                    "Bromine Water Oxidation (Diagnostic Differentiation): Glucose decolorizes aqueous bromine water (forming gluconic acid CH2OH(CHOH)4COOH), whereas Fructose does NOT react with bromine water in neutral/acidic conditions.",
                    "Ethanol Fermentation: Under the enzymatic action of yeast zymase, glucose ferments into ethanol and carbon dioxide (C6H12O6 → 2C2H5OH + 2CO2 ↑)."
                ]
            }
        ],
        "formulas": [
            "$$1\\text{ mol Glucose } (\\text{-CHO}) + 2[\\text{Ag}(\\text{NH}_3)_2]\\text{OH} \\longrightarrow 2\\text{ mol Ag}\\downarrow\\text{ (Silver Mirror)}$$",
            "$$2\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{Cu(OH)}_2 \\longrightarrow [\\text{C}_6\\text{H}_{11}\\text{O}_6]_2\\text{Cu (Royal Blue Complex)} + 2\\text{H}_2\\text{O}$$",
            "$$\\text{Diagnostic Test}: \\text{Glucose decolorizes aqueous } \\text{Br}_2 \\text{ (Fructose does NOT)}$$"
        ],
        "equations": [
            "$$\\text{CH}_2\\text{OH(CHOH)}_4\\text{CHO} + 2[\\text{Ag(NH}_3)_2]\\text{OH} \\xrightarrow{t^\\circ} \\text{CH}_2\\text{OH(CHOH)}_4\\text{COONH}_4 + 2\\text{Ag}\\downarrow + 3\\text{NH}_3 + \\text{H}_2\\text{O}$$",
            "$$2\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{Cu(OH)}_2 \\longrightarrow [\\text{C}_6\\text{H}_{11}\\text{O}_6]_2\\text{Cu} + 2\\text{H}_2\\text{O} \\quad [\\text{Deep Blue Complex}]$$",
            "$$\\text{CH}_2\\text{OH(CHOH)}_4\\text{CHO} + 2\\text{Cu(OH)}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_2\\text{OH(CHOH)}_4\\text{COONa} + \\text{Cu}_2\\text{O}\\downarrow\\text{ (Brick Red)} + 3\\text{H}_2\\text{O}$$",
            "$$\\text{CH}_2\\text{OH(CHOH)}_4\\text{CHO} + \\text{Br}_2 + \\text{H}_2\\text{O} \\longrightarrow \\text{CH}_2\\text{OH(CHOH)}_4\\text{COOH} + 2\\text{HBr} \\quad [\\text{Decolorizes Bromine}]$$"
        ],
        "q": "Why does fructose, despite possessing a ketone group rather than a free aldehyde group, still give a positive silver mirror test with Tollens' reagent and reduce alkaline Cu(OH)2 to a brick-red Cu2O precipitate?",
        "a": "Both Tollens' reagent [Ag(NH3)2]OH and Fehling's/Benedict's reagents operate in an ALKALINE (basic) medium. In basic conditions, fructose rapidly tautomerizes through an enediol intermediate into glucose. The freshly generated glucose possesses a reactive open-chain aldehyde group that undergoes oxidation, cleanly reducing Ag⁺ to metallic silver and Cu²⁺ to brick-red Cu2O."
    },
    5: {
        "title": "Lesson 5: Disaccharides: Sucrose & Maltose (Glycosidic Bonds)",
        "summary": "Sucrose (cane sugar) and maltose (malt sugar) are paramount disaccharides (C12H22O11, M=342). Examination of glycosidic linkages, non-reducing character, and complete acid hydrolysis.",
        "sections": [
            {
                "heading": "1. Molecular Structure of Sucrose",
                "points": [
                    "Sucrose consists of an α-D-glucopyranosyl unit and a β-D-fructofuranosyl unit linked via an ether oxygen bridge between C1 of glucose and C2 of fructose (an α,β-1,2-glycosidic bond).",
                    "Because both anomeric carbonyl carbons (C1 of glucose and C2 of fructose) participate in the glycosidic bond, sucrose lacks a free hemiacetal or hemiketal group. Consequently, sucrose is a NON-REDUCING sugar (negative silver mirror test, no bromine decolorization)."
                ]
            },
            {
                "heading": "2. Chemical Properties of Sucrose",
                "points": [
                    "Polyol Character: Dissolves freshly precipitated Cu(OH)2 at room temperature to form a clear, deep royal-blue soluble bis(sucrosato)copper(II) complex.",
                    "Acid-Catalyzed Hydrolysis: Heating with dilute mineral acids (HCl, H2SO4) or sucrase enzymes cleaves the glycosidic linkage, producing equimolar amounts of D-glucose and D-fructose (invert sugar).",
                    "Hydrolysis products readily undergo silver mirror Tollens reduction: 1 mol of sucrose yields 1 mol glucose + 1 mol fructose, collectively producing 4 mol of Ag metal."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Sucrose}: \\text{Non-reducing disaccharide, dissolves } \\text{Cu(OH)}_2 \\text{ at room temp}$$",
            "$$\\text{Hydrolysis}: \\text{C}_{12}\\text{H}_{22}\\text{O}_{11} + \\text{H}_2\\text{O} \\;\\xrightarrow{\\text{H}^+, t^\\circ}\\; \\text{C}_6\\text{H}_{12}\\text{O}_6\\text{ (Glucose)} + \\text{C}_6\\text{H}_{12}\\text{O}_6\\text{ (Fructose)}$$",
            "$$1\\text{ mol Hydrolyzed Sucrose} \\xrightarrow{\\text{Tollens}} 4\\text{ mol Ag}\\downarrow$$"
        ],
        "equations": [
            "$$2\\text{C}_{12}\\text{H}_{22}\\text{O}_{11} + \\text{Cu(OH)}_2 \\longrightarrow [\\text{C}_{12}\\text{H}_{21}\\text{O}_{11}]_2\\text{Cu} + 2\\text{H}_2\\text{O} \\quad [\\text{Deep Blue Chelate}]$$",
            "$$\\text{C}_{12}\\text{H}_{22}\\text{O}_{11} + \\text{H}_2\\text{O} \\xrightarrow{\\text{H}^+, t^\\circ} \\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{C}_6\\text{H}_{12}\\text{O}_6$$"
        ],
        "q": "Completely hydrolyze 34.2 g of sucrose in dilute aqueous acid. After neutralizing excess acid with dilute alkali, the solution is treated with excess Tollens' reagent. Calculate the total mass of metallic silver precipitated.",
        "a": "Molar mass of sucrose M = 342 g/mol ⇒ n_sucrose = 34.2 / 342 = 0.1 mol. Complete hydrolysis yields 0.1 mol glucose and 0.1 mol fructose. Total reducing hexoses = 0.2 mol. Since each mole of hexose yields 2 mol Ag: n_Ag = 2 × n_glucose + 2 × n_fructose = 4 × n_sucrose = 0.4 mol. Mass of precipitated silver m_Ag = 0.4 × 108 = 43.2 g."
    },
    6: {
        "title": "Lesson 6: Polysaccharides: Starch & Cellulose (Structure & Iodine Staining)",
        "summary": "Starch and cellulose are natural high-molecular biopolymers (C6H10O5)n. Exploration of helical amylose, branched amylopectin, crystalline cellulose microfibrils, and thermochromic iodine inclusion complexation.",
        "sections": [
            {
                "heading": "1. Starch Architecture & Iodine Test",
                "points": [
                    "Starch comprises two macromolecules: Amylose (20--30%, linear helical chains of α-1,4-glycosidic linked glucose units) and Amylopectin (70--80%, highly branched network containing both α-1,4- and α-1,6-glycosidic branching nodes).",
                    "Characteristic Iodine Reaction: Diatomic iodine molecules (I2) slip inside the hydrophobic cavity of the amylose helical coil, forming a characteristic deep BLUE-VIOLET inclusion complex. Heating uncoils the helix, expelling iodine and causing the blue color to vanish; cooling restores the helix and the blue color quantitatively returns.",
                    "Enzymatic Hydrolysis: Hydrolyzed progressively by salivary/pancreatic amylase or boiling dilute mineral acid via intermediate dextrins and maltose into D-glucose."
                ]
            },
            {
                "heading": "2. Cellulose (Xenlulozơ) & Industrial Applications",
                "points": [
                    "Cellulose is the primary structural component of plant cell walls (wood contains ≈50%, raw cotton fibers contain up to 98%).",
                    "Structure: Constructed entirely from β-D-glucose units joined by β-1,4-glycosidic linkages into extended, linear, uncoiled chains bundled via dense intermolecular hydrogen bonds into microfibrils. Each C6H10O5 monomer retains 3 free hydroxyl groups: [C6H7O2(OH)3]n.",
                    "Cellulose Trinitrate (Smokeless Gunpowder): [C6H7O2(OH)3]n + 3nHNO3 → [C6H7O2(ONO2)3]n + 3nH2O (catalyzed by conc. H2SO4 under controlled heating).",
                    "Solubility in Schweizer's Reagent [Cu(NH3)4](OH)2: Dissolves into a viscous solution used to spin cupro / rayon artificial cellulose fibers."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Iodine Test for Starch}: \\text{Aqueous } \\text{I}_2 \\longrightarrow \\text{Deep Blue-Violet (Reversible with heat)}$$",
            "$$\\text{Cellulose Trinitrate (Smokeless Powder)}: [\\text{C}_6\\text{H}_7\\text{O}_2(\\text{OH})_3]_n + 3n\\text{HNO}_3 \\xrightarrow{\\text{H}_2\\text{SO}_4, t^\\circ} [\\text{C}_6\\text{H}_7\\text{O}_2(\\text{ONO}_2)_3]_n + 3n\\text{H}_2\\text{O}$$",
            "$$\\text{Complete Polysaccharide Hydrolysis}: (\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\text{H}_2\\text{O} \\xrightarrow{\\text{H}^+, t^\\circ} n\\text{C}_6\\text{H}_{12}\\text{O}_6\\text{ (Glucose)}$$"
        ],
        "equations": [
            "$$\\text{Starch} + \\text{I}_2 \\rightleftharpoons \\text{Deep Blue Complex} \\quad [\\text{Inclusion Complexation}]$$",
            "$$[\\text{C}_6\\text{H}_7\\text{O}_2(\\text{OH})_3]_n + 3n\\text{HNO}_3 \\xrightarrow{\\text{H}_2\\text{SO}_4\\text{ (conc)}, t^\\circ} [\\text{C}_6\\text{H}_7\\text{O}_2(\\text{ONO}_2)_3]_n + 3n\\text{H}_2\\text{O}$$"
        ],
        "q": "Why can human digestive tracts readily digest starch (rice, potatoes, grains) for nutritional energy but cannot digest cellulose (grass, straw, wood pulp), despite both polysaccharides being composed exclusively of glucose units?",
        "a": "Human digestive secretions contain α-amylase enzymes that specifically recognize and hydrolyze the α-1,4-glycosidic linkages present in starch. Humans lack the cellulase enzyme required to cleave the rigid β-1,4-glycosidic linkages of cellulose. Herbivorous ruminants can digest cellulose because symbiotic microorganisms inhabiting their specialized rumen secrete active cellulase enzymes."
    }
}

print(f"Loaded high-precision Grade 12 English dictionary for Lessons 1-6.")
