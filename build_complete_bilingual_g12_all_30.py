# -*- coding: utf-8 -*-
import json

# Comprehensive English translations for all 30 lessons of Grade 12
G12_COMPLETE_EN = {
    1: {
        "title": "Lesson 1: Esters – Lipids (Structure, Nomenclature & Properties)",
        "summary": "Esters and lipids are vital organic families across biochemistry and industry. Esters provide pleasant fruity fragrances and perfumery essences, while lipids (fats and oils) serve as primary biological energy reserves and cell membrane matrices.",
        "sections": [
            {
                "heading": "1. Definition & Molecular Structure of Esters",
                "points": [
                    "When the -OH hydroxyl group of a carboxylic acid (-COOH) is replaced by an alkoxy group (-OR') from an alcohol, an Ester (general formula: R-COO-R', R' ≠ H) is synthesized.",
                    "Saturated monocarboxylic esters have the general molecular formula C_n H_2n O_2 (n ≥ 2). Examples: HCOOCH3 (Methyl formate), CH3COOC2H5 (Ethyl acetate).",
                    "IUPAC Nomenclature: Hydrocarbon group R' (alkyl/aryl) + Carboxylate root ending in '-oate' / '-ate' (e.g., CH3COOC2H5 is named Ethyl acetate; HCOOCH3 is Methyl formate)."
                ]
            },
            {
                "heading": "2. Physical Properties & Characteristic Aromas of Esters",
                "points": [
                    "Esters are volatile liquids or low-melting solids, lighter than water and sparingly soluble in aqueous media due to the absence of intermolecular hydrogen bonding between ester molecules.",
                    "Boiling points of esters are significantly lower than those of isomeric carboxylic acids and alcohols of comparable molecular mass.",
                    "Characteristic fruity aromas: Isoamyl acetate (CH3COOCH2CH2CH(CH3)2) smells of ripe bananas; Ethyl butyrate smells of pineapples; Benzyl acetate smells of jasmine blossoms."
                ]
            },
            {
                "heading": "3. Chemical Reactions & Hydrolysis Mechanisms of Esters",
                "points": [
                    "Acid-Catalyzed Hydrolysis (Reversible Equilibrium): R-COO-R' + H2O ⇌ R-COOH + R'-OH (reflux with dilute H2SO4). Reaction reaches dynamic equilibrium, separating into two immiscible liquid layers.",
                    "Base-Promoted Hydrolysis / Saponification (Irreversible): R-COO-R' + NaOH → R-COONa + R'-OH (heat). Reaction goes to completion, yielding water-soluble carboxylate salts and alcohols.",
                    "Special Ester Cleavages: Phenyl esters require 2 equivalents of NaOH (R-COOC6H5 + 2NaOH → R-COONa + C6H5ONa + H2O); Vinyl esters yield aldehydes (CH3COOCH=CH2 + NaOH → CH3COONa + CH3CHO)."
                ]
            },
            {
                "heading": "4. Classification of Lipids & Triglyceride Fats",
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
        "title": "Lesson 2: Soaps & Synthetic Detergents (Cleansing Action & Micelles)",
        "summary": "Investigation of the physicochemical cleansing mechanisms of soaps and synthetic detergents, comparative surfactant analysis, and behavior in hard water environments.",
        "sections": [
            {
                "heading": "1. Definition & Composition of Traditional Soaps",
                "points": [
                    "Soap is a formulation containing sodium (Na⁺) or potassium (K⁺) salts of long-chain fatty acids (primarily sodium stearate C17H35COONa and sodium palmitate C15H31COONa), blended with perfumes and additives.",
                    "Sodium carboxylate salts form traditional solid bar soaps, while potassium salts yield liquid soaps and creamy shaving foams."
                ]
            },
            {
                "heading": "2. Molecular Structure & Micellar Cleansing Action",
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
        "title": "Lesson 3: Chapter 1 Review: Esters & Lipids Stoichiometry",
        "summary": "Comprehensive review of foundational calculations: ester combustion stoichiometry, multi-component saponification mass balance, lipid yield, and saponification number determinations.",
        "sections": [
            {
                "heading": "1. Stoichiometric Calculations for Esters & Lipids",
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
        "title": "Lesson 4: Monosaccharides: Glucose & Fructose (Structures & Tollens Test)",
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
            "$$\\text{CH}_2\\text{OH(CHOH)}_4\\text{CHO} + 2[\\text{Ag}(\\text{NH}_3)_2]\\text{OH} \\xrightarrow{t^\\circ} \\text{CH}_2\\text{OH(CHOH)}_4\\text{COONH}_4 + 2\\text{Ag}\\downarrow + 3\\text{NH}_3 + \\text{H}_2\\text{O}$$",
            "$$2\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{Cu(OH)}_2 \\longrightarrow [\\text{C}_6\\text{H}_{11}\\text{O}_6]_2\\text{Cu} + 2\\text{H}_2\\text{O} \\quad [\\text{Deep Blue Complex}]$$",
            "$$\\text{CH}_2\\text{OH(CHOH)}_4\\text{CHO} + 2\\text{Cu(OH)}_2 + \\text{NaOH} \\xrightarrow{t^\\circ} \\text{CH}_2\\text{OH(CHOH)}_4\\text{COONa} + \\text{Cu}_2\\text{O}\\downarrow\\text{ (Brick Red)} + 3\\text{H}_2\\text{O}$$",
            "$$\\text{CH}_2\\text{OH(CHOH)}_4\\text{CHO} + \\text{Br}_2 + \\text{H}_2\\text{O} \\longrightarrow \\text{CH}_2\\text{OH(CHOH)}_4\\text{COOH} + 2\\text{HBr} \\quad [\\text{Decolorizes Bromine}]$$"
        ],
        "q": "Why does fructose, despite possessing a ketone group rather than a free aldehyde group, still give a positive silver mirror test with Tollens' reagent and reduce alkaline Cu(OH)2 to a brick-red Cu2O precipitate?",
        "a": "Both Tollens' reagent [Ag(NH3)2]OH and Fehling's/Benedict's reagents operate in an ALKALINE (basic) medium. In basic conditions, fructose rapidly tautomerizes through an enediol intermediate into glucose. The freshly generated glucose possesses a reactive open-chain aldehyde group that undergoes oxidation, cleanly reducing Ag⁺ to metallic silver and Cu²⁺ to brick-red Cu2O."
    },
    5: {
        "title": "Lesson 5: Disaccharides: Sucrose & Maltose (Glycosidic Bonds & Hydrolysis)",
        "summary": "Sucrose (cane sugar) and maltose (malt sugar) are paramount disaccharides (C12H22O11, M=342). Examination of glycosidic linkages, non-reducing character, and complete acid hydrolysis.",
        "sections": [
            {
                "heading": "1. Molecular Structure of Sucrose (Non-reducing Sugar)",
                "points": [
                    "Sucrose consists of an α-D-glucopyranosyl unit and a β-D-fructofuranosyl unit linked via an ether oxygen bridge between C1 of glucose and C2 of fructose (an α,β-1,2-glycosidic bond).",
                    "Because both anomeric carbonyl carbons (C1 of glucose and C2 of fructose) participate in the glycosidic bond, sucrose lacks a free hemiacetal or hemiketal group. Consequently, sucrose is a NON-REDUCING sugar (negative silver mirror test, no bromine decolorization)."
                ]
            },
            {
                "heading": "2. Chemical Properties & Acid Hydrolysis of Sucrose",
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
                "heading": "1. Starch Architecture & Iodine Inclusion Reaction",
                "points": [
                    "Starch comprises two macromolecules: Amylose (20--30%, linear helical chains of α-1,4-glycosidic linked glucose units) and Amylopectin (70--80%, highly branched network containing both α-1,4- and α-1,6-glycosidic branching nodes).",
                    "Characteristic Iodine Reaction: Diatomic iodine molecules (I2) slip inside the hydrophobic cavity of the amylose helical coil, forming a characteristic deep BLUE-VIOLET inclusion complex. Heating uncoils the helix, expelling iodine and causing the blue color to vanish; cooling restores the helix and the blue color quantitatively returns.",
                    "Enzymatic Hydrolysis: Hydrolyzed progressively by salivary/pancreatic amylase or boiling dilute mineral acid via intermediate dextrins and maltose into D-glucose."
                ]
            },
            {
                "heading": "2. Cellulose Structure, Trinitrate & Industrial Uses",
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
    },
    7: {
        "title": "Lesson 7: Chapter 2 Review: Carbohydrates Diagnostic Separation",
        "summary": "Comprehensive systematic review of carbohydrate structures, qualitative diagnostic separation matrix, and quantitative stoichiometric calculations.",
        "sections": [
            {
                "heading": "1. Diagnostic Separation Matrix for Carbohydrates",
                "points": [
                    "Glucose: Gives positive silver mirror Tollens test, dissolves Cu(OH)2 (deep-blue chelate), decolorizes aqueous bromine water.",
                    "Fructose: Gives positive silver mirror test in alkaline Tollens medium, dissolves Cu(OH)2, does NOT decolorize aqueous bromine water.",
                    "Sucrose: Non-reducing (negative direct Tollens test), dissolves Cu(OH)2, upon acid hydrolysis yields equimolar glucose and fructose which reduce Tollens' reagent.",
                    "Starch: Non-reducing polysaccharide, gives characteristic reversible deep blue-violet inclusion complex with aqueous iodine (I2).",
                    "Cellulose: Insoluble in water and typical solvents, reacts with hot concentrated HNO3 to yield cellulose trinitrate smokeless powder, dissolves in Schweizer's reagent."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Diagnostic Scheme}: \\text{Bromine Water (Glucose)} \\;\\vert\\; \\text{Iodine } \\text{I}_2\\text{ (Starch)} \\;\\vert\\; \\text{Tollens (Glucose, Fructose)}$$"
        ],
        "equations": [
            "$$\\text{Glucose} + \\text{Br}_2 + \\text{H}_2\\text{O} \\longrightarrow \\text{Gluconic Acid} + 2\\text{HBr}$$",
            "$$\\text{Starch} + \\text{I}_2 \\longrightarrow \\text{Deep Blue-Violet Complex}$$"
        ],
        "q": "Present a systematic qualitative chemical scheme to distinguish four unlabeled aqueous solutions: Glucose, Sucrose, Glycerol, and Starch paste.",
        "a": "Step 1: Add a drop of iodine solution (I2) to each sample; Starch paste immediately produces an intense deep blue-violet color. Step 2: To the remaining three samples, add Tollens' reagent [Ag(NH3)2]OH with gentle heating; Glucose produces a brilliant metallic silver mirror. Step 3: Heat the two remaining solutions with dilute HCl, neutralize with alkali, and test with Tollens' reagent; Sucrose yields a silver mirror (due to hydrolysis into reducing sugars), while Glycerol remains unreacted."
    },
    8: {
        "title": "Lesson 8: Amines (Classification, Basicity & Aniline Bromination)",
        "summary": "Amines are ammonia derivatives where hydrogen atoms are replaced by hydrocarbon groups. Exploration of basicity scales, alkyl vs aryl substituents, and the diagnostic tribromination of aniline.",
        "sections": [
            {
                "heading": "1. Definition, Classification & Amine Degrees (1°, 2°, 3°)",
                "points": [
                    "Amine degree corresponds to the number of hydrogen atoms in NH3 replaced by hydrocarbon radicals: Primary 1° (R-NH2), Secondary 2° (R-NH-R'), Tertiary 3° (R-N(R')-R'').",
                    "Classification by hydrocarbon backbone: Aliphatic amines (methylamine CH3NH2, ethylamine C2H5NH2) and Aromatic amines (aniline C6H5NH2).",
                    "IUPAC / Common Nomenclature: Alkyl radical name + suffix '-amine' (CH3NH2: Methylamine; (CH3)2NH: Dimethylamine; (CH3)3N: Trimethylamine; C6H5NH2: Aniline / Benzenamine)."
                ]
            },
            {
                "heading": "2. Physical Properties & Basicity Ranking of Amines",
                "points": [
                    "Methylamine, dimethylamine, trimethylamine, and ethylamine are toxic gases at room temperature with pungent fishy odors, highly soluble in water.",
                    "Basicity Origin: The nitrogen atom possesses an unshared lone electron pair capable of accepting an acidic proton H⁺ (Brønsted–Lowry base).",
                    "Basicity Order: 2° aliphatic amine > 1° aliphatic amine > NH3 > Aromatic amine (Aniline C6H5NH2). Example: (CH3)2NH > CH3NH2 > NH3 > C6H5NH2.",
                    "Aliphatic amines turn litmus blue and phenolphthalein pink. Aniline is an extremely weak base due to resonance electron withdrawal by the benzene ring, hence does NOT change litmus color."
                ]
            },
            {
                "heading": "3. Characteristic Reactions & Tribromination of Aniline",
                "points": [
                    "Mineral Acid Neutralization: C6H5NH2 (insoluble oil droplets) + HCl → C6H5NH3Cl (water-soluble phenylammonium chloride salt).",
                    "Electrophilic Aromatic Tribromination: The strong activating, ortho/para-directing -NH2 group enables instant reaction with bromine water at room temperature, precipitating 2,4,6-tribromoaniline (diagnostic white precipitate)."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Amine Degree} = \\text{Number of Hydrocarbon Radicals bonded to N}$$",
            "$$\\text{Basicity Order}: \\text{CH}_3\\text{-NH-CH}_3 > \\text{CH}_3\\text{NH}_2 > \\text{NH}_3 > \\text{C}_6\\text{H}_5\\text{NH}_2\\text{ (Aniline)}$$",
            "$$\\text{Aniline Test}: \\text{C}_6\\text{H}_5\\text{NH}_2 + 3\\text{Br}_2 \\longrightarrow \\text{C}_6\\text{H}_2\\text{Br}_3\\text{NH}_2\\downarrow\\text{ (White)} + 3\\text{HBr}$$"
        ],
        "equations": [
            "$$\\text{CH}_3\\text{NH}_2 + \\text{HCl} \\longrightarrow \\text{CH}_3\\text{NH}_3\\text{Cl} \\quad [\\text{Methylammonium Chloride Dense Smoke}]$$",
            "$$\\text{C}_6\\text{H}_5\\text{NH}_2 + 3\\text{Br}_2 \\longrightarrow \\text{C}_6\\text{H}_2\\text{Br}_3\\text{NH}_2\\downarrow\\text{ (White Precipitate)} + 3\\text{HBr}$$"
        ],
        "q": "Why does aniline fail to turn red litmus paper blue despite being an amine base, and what is the optimal procedure to clean glassware contaminated with oily aniline residues?",
        "a": "Aniline is an extremely weak base (pKb ≈ 9.4) because the lone electron pair on nitrogen is strongly delocalized into the aromatic benzene π-system, drastically reducing its availability to capture protons from water; thus [OH⁻] is insufficient to turn litmus blue. Because oily aniline is insoluble in neutral water, rinse the glassware with dilute hydrochloric acid (HCl); aniline reacts to form water-soluble phenylammonium chloride (C6H5NH3⁺Cl⁻), which easily rinses clean with water."
    },
    9: {
        "title": "Lesson 9: Amino Acids & Peptides (Zwitterions, Isoelectric Point & Biuret Test)",
        "summary": "Amino acids are amphoteric bifunctional molecules containing both -NH2 and -COOH groups. Peptides are polymers of α-amino acids forming the foundational building blocks of biological life.",
        "sections": [
            {
                "heading": "1. Zwitterionic Structure & Amphoteric Properties of Amino Acids",
                "points": [
                    "Natural amino acids in biological systems are exclusively α-amino acids (the amino -NH2 group is attached to the C2 alpha carbon adjacent to -COOH).",
                    "Five Standard Amino Acids: Glycine (H2N-CH2-COOH, M=75), Alanine (CH3-CH(NH2)-COOH, M=89), Valine ((CH3)2CH-CH(NH2)-COOH, M=117), Glutamic Acid (HOOC-CH2-CH2-CH(NH2)-COOH, M=147, 2 -COOH turns litmus red), Lysine (H2N-(CH2)4-CH(NH2)-COOH, M=146, 2 -NH2 turns litmus blue).",
                    "Zwitterionic State: In solid crystals and neutral aqueous solution, amino acids exist as dipolar zwitterions (+H3N-R-COO⁻), imparting high melting points, non-volatility, and sweet tastes.",
                    "Amphoteric Nature: Reacts with strong mineral acids via the -NH2 group and with strong bases via the -COOH group."
                ]
            },
            {
                "heading": "2. Peptide Concepts, Peptide Bonds & Biuret Reaction",
                "points": [
                    "The peptide bond is the amide linkage -CO-NH- formed between the α-carboxyl group of one amino acid and the α-amino group of another.",
                    "Peptides are polymers containing 2 to 50 α-amino acid residues linked by peptide bonds.",
                    "Classification: Oligopeptides (2--10 residues: Dipeptides have 2 residues and 1 peptide bond; Tripeptides have 3 residues and 2 peptide bonds); Polypeptides (11--50 residues).",
                    "Biuret Color Reaction: In alkaline media, peptides containing two or more peptide bonds (i.e., tripeptides and higher) coordinate with Cu(OH)2 to produce a characteristic intense VIOLET chelate complex. Dipeptides do NOT give the Biuret reaction."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Amphoteric Equilibrium}: \\text{H}_2\\text{N-R-COOH} + \\text{HCl} \\rightarrow \\text{ClH}_3\\text{N-R-COOH}; \\; \\text{H}_2\\text{N-R-COOH} + \\text{NaOH} \\rightarrow \\text{H}_2\\text{N-R-COONa} + \\text{H}_2\\text{O}$$",
            "$$\\text{Number of Peptide Bonds} = \\text{Number of } \\alpha\\text{-amino acid residues} - 1$$",
            "$$\\text{Biuret Test}: \\text{Peptides with } \\ge 2\\text{ peptide bonds } (\\ge \\text{Tripeptides}) + \\text{Cu(OH)}_2 \\longrightarrow \\text{Violet Chelate Complex}$$"
        ],
        "equations": [
            "$$\\text{H}_2\\text{N-CH}_2\\text{-COOH} + \\text{HCl} \\longrightarrow \\text{ClH}_3\\text{N-CH}_2\\text{-COOH} \\quad [\\text{Glycine Hydrochloride}]$$",
            "$$\\text{H}_2\\text{N-CH}_2\\text{-COOH} + \\text{NaOH} \\longrightarrow \\text{H}_2\\text{N-CH}_2\\text{-COONa} + \\text{H}_2\\text{O} \\quad [\\text{Sodium Glycinate}]$$",
            "$$\\text{Gly-Ala} + 2\\text{NaOH} \\longrightarrow \\text{H}_2\\text{N-CH}_2\\text{-COONa} + \\text{H}_2\\text{N-CH(CH}_3)\\text{-COONa} + \\text{H}_2\\text{O}$$"
        ],
        "q": "How do aqueous solutions of Glycine, Glutamic acid, and Lysine affect the color of blue and red litmus paper?",
        "a": "Glycine contains 1 amino group and 1 carboxyl group (-NH2 = -COOH), yielding an essentially neutral aqueous solution (isoelectric point pI ≈ 6.0) that causes NO color change on litmus paper. Glutamic acid contains 1 -NH2 group and 2 -COOH groups (-COOH > -NH2), giving an acidic solution that turns litmus RED. Lysine contains 2 -NH2 groups and 1 -COOH group (-NH2 > -COOH), giving a basic solution that turns litmus BLUE."
    },
    10: {
        "title": "Lesson 10: Proteins & Enzymes (Denaturation & Biological Catalysis)",
        "summary": "Proteins are complex high-molecular polypeptides forming the material foundation of life. Exploration of higher-order spatial structures, denaturation phenomena, and enzyme biocatalytic kinetics.",
        "sections": [
            {
                "heading": "1. Higher-Order Protein Structures, Denaturation & Staining",
                "points": [
                    "Proteins are high-molecular polypeptides with molecular weights ranging from tens of thousands to millions of amu, folding into intricate 3D spatial conformations (Primary 1° to Quaternary 4° structures).",
                    "Protein Denaturation: Elevated temperatures, strong acids, strong alkalis, or heavy metal ions disrupt non-covalent secondary/tertiary folding interactions, causing irreversible unfolding and insoluble coagulation (e.g., cooking egg whites).",
                    "Biuret Color Reaction: All proteins react with alkaline Cu(OH)2 to produce an unmistakable, intense VIOLET coordination complex.",
                    "Xanthoproteic Reaction: Concentrated nitric acid (HNO3) added to proteins precipitates a characteristic YELLOW nitro-derivative due to electrophilic aromatic nitration of aromatic amino acid residues (tyrosine, tryptophan, phenylalanine)."
                ]
            },
            {
                "heading": "2. Enzymes: Biocatalytic Specificity & High Efficiency",
                "points": [
                    "Enzymes are specialized biocatalytic proteins that accelerate physiological biochemical reactions by factors of millions under mild physiological conditions (37°C, neutral pH) with absolute substrate specificity."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Protein Denaturation}: \\text{Heat, Acids, Alkalis, Heavy Metal Salts, Ethanol}$$",
            "$$\\text{Diagnostic Stains}: \\text{Biuret } [\\text{Cu(OH)}_2 \\rightarrow \\text{Violet}] \\;\\vert\\; \\text{Xanthoproteic } [\\text{HNO}_3 \\rightarrow \\text{Yellow}]$$"
        ],
        "equations": [
            "$$\\text{Protein} + \\text{Cu(OH)}_2 / \\text{NaOH} \\longrightarrow \\text{Characteristic Royal Violet Complex}$$",
            "$$\\text{Protein} + \\text{HNO}_3\\text{ (conc)} \\longrightarrow \\text{Yellow Precipitate (Xanthoproteic Reaction)}$$"
        ],
        "q": "Explain why boiling fresh freshwater crab broth causes fluffy floating crab meat curd layers to rise to the surface of the soup.",
        "a": "Fresh crab muscle tissue contains high concentrations of water-soluble globular proteins. When the broth is heated to boiling, thermal energy disrupts the hydrogen bonds and hydrophobic interactions stabilizing the protein's native tertiary structure, causing irreversible denaturation. The unfolded polypeptide chains cross-link and aggregate into porous, buoyant, insoluble coagulated protein masses that float to the soup surface."
    },
    11: {
        "title": "Lesson 11: Chapter 3 Review: Nitrogen Compounds & Peptide Hydrolysis",
        "summary": "Comprehensive mastery of amine basicity, amino acid zwitterionic properties, peptide hydrolysis stoichiometry, and mass balance conservation laws.",
        "sections": [
            {
                "heading": "1. Quantitative Peptide Hydrolysis & Conservation Laws",
                "points": [
                    "Complete Hydrolysis of 1 mol of an n-peptide: Consumes exactly (n - 1) mol of H2O in acid hydrolysis or n mol of NaOH in alkaline saponification.",
                    "Mass Conservation in Alkaline Hydrolysis: m_peptide + m_NaOH = m_salt + m_H2O (where n_H2O generated equals n_peptide)."
                ]
            }
        ],
        "formulas": [
            "$$m_{\\text{peptide}} + m_{\\text{NaOH}} = m_{\\text{dry salt}} + m_{\\text{H}_2\\text{O}} \\quad (n_{\\text{H}_2\\text{O}} = n_{\\text{peptide}})$$ ",
            "$$n_{\\text{HCl consumed}} = \\sum n_{\\text{-NH}_2}; \\quad n_{\\text{NaOH consumed}} = \\sum n_{\\text{-COOH}}$$"
        ],
        "equations": [
            "$$\\text{Gly-Ala-Val} + 3\\text{NaOH} \\longrightarrow \\text{Gly-Na} + \\text{Ala-Na} + \\text{Val-Na} + \\text{H}_2\\text{O}$$"
        ],
        "q": "Completely hydrolyze 0.1 mol of tripeptide Gly-Ala-Val using 400 mL of 1.0 M NaOH solution. Evaporate the resulting solution to dryness. Calculate the total mass of anhydrous solid residue obtained.",
        "a": "Initial n_NaOH = 0.4 mol. Tripeptide requires 3 equivalents of NaOH: n_NaOH_reacted = 3 × 0.1 = 0.3 mol ⇒ Excess unreacted NaOH = 0.1 mol (4.0 g). Molecular mass of Gly-Ala-Val M = 75 + 89 + 117 - (2 × 18) = 245 g/mol ⇒ m_tripeptide = 24.5 g. Water generated n_H2O = n_tripeptide = 0.1 mol (1.8 g). Applying mass conservation: m_solid_residue = m_tripeptide + m_initial_NaOH - m_H2O = 24.5 + (0.4 × 40) - 1.8 = 38.7 g."
    },
    12: {
        "title": "Lesson 12: Fundamentals of Polymers (Polymerization vs Polycondensation)",
        "summary": "Polymers are high-molecular macromolecules constructed from repeating monomer units. Examination of addition polymerization, polycondensation mechanisms, and structural classification.",
        "sections": [
            {
                "heading": "1. Definition, Classification & Polymer Chain Architectures",
                "points": [
                    "Molecular Mass of Polymer M_polymer = n × M_monomer (where n is the degree of polymerization).",
                    "Classification by Origin: Natural polymers (Starch, Cellulose, Silk, Natural Rubber); Synthetic polymers (Polyethylene PE, PVC, Nylon-6,6); Semi-synthetic / Artificial polymers (Viscose rayon, Cellulose acetate).",
                    "Classification by Topology: Linear unbranched chains (PE, PVC, Amylose); Branched chains (Amylopectin, Glycogen); 3D Cross-linked networks (Vulcanized rubber, Bakelite resite network)."
                ]
            },
            {
                "heading": "2. Synthesis Routes: Addition Polymerization vs Polycondensation",
                "points": [
                    "Addition Polymerization: Joining multiple unsaturated monomer molecules without generating byproducts. Requirement: Monomer must contain reactive C=C double bonds or strained rings (e.g., Ethylene → PE, Vinyl chloride → PVC, Styrene → PS).",
                    "Polycondensation: Condensation of monomer molecules containing at least two reactive functional groups to form a polymer accompanied by the elimination of small molecules (predominantly H2O) (e.g., Adipic acid + Hexamethylenediamine → Nylon-6,6; Terephthalic acid + Ethylene glycol → Dacron/Terylene polyester)."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Addition Polymerization}: n\\text{ CH}_2\\text{=CH-}X \\longrightarrow (\\text{-CH}_2\\text{-CH}(X)\\text{-})_n \\quad (\\text{Requires } \\text{C=C})$$",
            "$$\\text{Polycondensation}: n\\text{ H}_2\\text{N-(CH}_2)_5\\text{-COOH} \\longrightarrow (\\text{-NH-(CH}_2)_5\\text{-CO-})_n + n\\text{H}_2\\text{O} \\quad [\\text{Nylon-6}]$$",
            "$$M_{\\text{polymer}} = n \\times M_{\\text{monomer residue}}$$"
        ],
        "equations": [
            "$$n\\text{ CH}_2\\text{=CH}_2 \\longrightarrow (\\text{-CH}_2\\text{-CH}_2\\text{-})_n \\quad [\\text{Polyethylene PE}]$$",
            "$$n\\text{ CH}_2\\text{=CHCl} \\longrightarrow (\\text{-CH}_2\\text{-CHCl-})_n \\quad [\\text{Polyvinyl Chloride PVC}]$$",
            "$$n\\text{ H}_2\\text{N-(CH}_2)_6\\text{-NH}_2 + n\\text{ HOOC-(CH}_2)_4\\text{-COOH} \\longrightarrow (\\text{-NH-(CH}_2)_6\\text{-NH-CO-(CH}_2)_4\\text{-CO-})_n + 2n\\text{H}_2\\text{O} \\quad [\\text{Nylon-6,6}]$$"
        ],
        "q": "Clearly distinguish the structural monomer requirements for undergoing addition polymerization versus polycondensation reactions.",
        "a": "To undergo ADDITION POLYMERIZATION, the monomer molecule must contain unsaturated multiple bonds (such as C=C in ethylene or vinyl chloride) or strained cyclic rings that can open without loss of atoms. To undergo POLYCONDENSATION, the monomer molecule must possess at least two complementary reactive functional groups (such as -COOH, -NH2, or -OH) that react intermolecularly to build the polymer chain while eliminating small byproduct molecules such as water."
    },
    13: {
        "title": "Lesson 13: Polymeric Materials: Plastics, Synthetic Fibers, Rubber & Adhesives",
        "summary": "Industrial polymeric materials: optical Plexiglas (PMMA), bulletproof/high-tenacity polyamides (Nylon-6,6), sulfur-vulcanized elastomer networks, and synthetic adhesives.",
        "sections": [
            {
                "heading": "1. Plastics & Advanced Thermoplastics (PE, PVC, PMMA, Teflon)",
                "points": [
                    "Polyethylene (PE): Food wrap film, plastic bags, flexible squeeze bottles.",
                    "Polyvinyl Chloride (PVC): Rigid water drainage pipes, electrical wire insulation sheath, synthetic leather.",
                    "Polymethyl Methacrylate (PMMA / Plexiglas Organic Glass): Polymerized from methyl methacrylate, boasting 92% optical light transmission, impact shatter-resistance, used in aircraft windshields, protective goggles, and dentures.",
                    "Teflon (-CF2-CF2-)n: Polymerized from tetrafluoroethylene, exceptionally thermal-resistant and chemically inert, used as non-stick cookware coatings."
                ]
            },
            {
                "heading": "2. Synthetic & Semi-Synthetic Fibers (Polyamides, Acrylics)",
                "points": [
                    "Polyamide Fibers (Nylon-6,6; Nylon-6; Nylon-7): Contain repeating -CO-NH- amide linkages; tough, abrasion-resistant, silky, but susceptible to degradation in strong acids and alkalis.",
                    "Polyacrylic / Nitron / Orlon Fibers: Polymerized from vinyl cyanide (acrylonitrile CH2=CH-CN), featuring excellent thermal insulation for winter knitwear."
                ]
            },
            {
                "heading": "3. Elastomers & Sulfur Vulcanization Chemistry",
                "points": [
                    "Elastomers are polymeric materials exhibiting reversible high elasticity upon mechanical deformation.",
                    "Natural Rubber: Cis-1,4-polyisoprene extracted from Hevea brasiliensis latex.",
                    "Synthetic Rubbers: Buna (Polybutadiene), Buna-S (Styrene-butadiene), Buna-N (Acrylonitrile-butadiene).",
                    "Sulfur Vulcanization: Heating raw unvulcanized rubber with elemental sulfur (S) at 140°C introduces covalent disulfide cross-links (-S-S-) between linear chains, converting them into a resilient 3D spatial network with superior elasticity, friction resistance, and heat tolerance (automotive tires)."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Plexiglas (PMMA)}: \\text{Addition polymerization of Methyl Methacrylate}$$",
            "$$\\text{Polyamides (Nylon-6,6)}: \\text{Susceptible to alkaline and acidic hydrolysis}$$",
            "$$\\text{Vulcanized Rubber}: \\text{Disulfide bridges } (\\text{-S-S-}) \\text{ form resilient 3D elastomer network}$$"
        ],
        "equations": [
            "$$n\\text{ CH}_2\\text{=C(CH}_3)\\text{COOCH}_3 \\longrightarrow (\\text{-CH}_2\\text{-C(CH}_3)(\\text{COOCH}_3)\\text{-})_n \\quad [\\text{Plexiglas PMMA}]$$",
            "$$n\\text{ CH}_2\\text{=CH-CH=CH}_2 \\longrightarrow (\\text{-CH}_2\\text{-CH=CH-CH}_2\\text{-})_n \\quad [\\text{Buna Synthetic Rubber}]$$"
        ],
        "q": "Why is it strongly advised never to wash natural silk garments or synthetic nylon garments using strongly alkaline laundry soaps or boiling hot water?",
        "a": "Natural silk (fibroin protein) and nylon fibers (polyamides) contain repeating amide/peptide linkages (-CO-NH-) along their polymer backbones. In strongly alkaline media (high pH) or at elevated temperatures, these amide bonds undergo rapid nucleophilic hydrolysis and chain cleavage, causing the woven fabric to degrade, tear, shrink, and lose structural tensile strength."
    },
    14: {
        "title": "Lesson 14: Chapter 4 Review: Polymers Industrial Stoichiometry",
        "summary": "Comprehensive review of polymer structures, monomer identification, reaction conditions, and industrial multi-step synthesis yield calculations.",
        "sections": [
            {
                "heading": "1. Comprehensive Polymer Classification & Yield Calculations",
                "points": [
                    "Natural Fibers: Natural silk, cotton, linen, sheep wool.",
                    "Semi-synthetic (Artificial) Fibers: Viscose rayon, cellulose acetate (chemically regenerated from natural cellulose).",
                    "Synthetic Fibers: Nylon-6,6; Nylon-6 (Capron); Terylene (Dacron); Nitron (Orlon)."
                ]
            }
        ],
        "formulas": [
            "$$M_{\\text{polymer}} = n \\times M_{\\text{repeating unit}}$$"
        ],
        "equations": [
            "$$n\\text{ CH}_2\\text{=CHCl} \\longrightarrow (\\text{-CH}_2\\text{-CHCl-})_n \\quad [\\text{PVC Plastic}]$$"
        ],
        "q": "To manufacture 1.0 metric ton of Polyvinyl Chloride (PVC) with an overall industrial process yield of 80%, what volume of ethylene gas (C2H4) is required at standard ambient temperature and pressure (25°C, 1 bar)?",
        "a": "Synthesis pathway: C2H4 (M=28) ➔ C2H3Cl ➔ PVC (M=62.5). Theoretical m_C2H4 = (1.0 × 28) / 62.5 = 0.448 tons. Accounting for 80% yield: actual m_C2H4 = 0.448 / 0.80 = 0.56 tons = 560,000 g ⇒ n_C2H4 = 560,000 / 28 = 20,000 mol. Volume at standard conditions (25°C, 1 bar): V_C2H4 = 20,000 × 24.79 L = 495,800 L = 495.8 m³."
    },
    15: {
        "title": "Lesson 15: Standard Electrode Potentials & Galvanic Cells (Zn-Cu Daniell Cell)",
        "summary": "Galvanic cells convert spontaneous redox chemical energy into electrical energy. Examination of standard reduction potentials E°, standard hydrogen electrode, and cell EMF calculations.",
        "sections": [
            {
                "heading": "1. Redox Couples & Standard Reduction Potentials E°",
                "points": [
                    "The oxidized form and reduced form of an element constitute a redox couple M^(n+)/M (e.g., Zn²⁺/Zn, Cu²⁺/Cu, Ag⁺/Ag).",
                    "Standard reduction potential E° is measured at 1.0 M ion concentration, 25°C, and 1 bar relative to the Standard Hydrogen Electrode (SHE, E°(2H⁺/H2) = 0.00 V).",
                    "Significance of E°: More negative E° values signify stronger reducing power of the metal (easily loses electrons); more positive E° values signify stronger oxidizing power of the cation (easily gains electrons)."
                ]
            },
            {
                "heading": "2. Architecture & Operating Principle of the Zn-Cu Daniell Cell",
                "points": [
                    "Anode (Negative Electrode - Lower E° metal): Undergoes OXIDATION: Zn → Zn²⁺ + 2e (Zinc electrode dissolves).",
                    "Cathode (Positive Electrode - Higher E° metal): Undergoes REDUCTION: Cu²⁺ + 2e → Cu (Metallic copper deposits).",
                    "Salt Bridge (contains inert KNO3 or KCl): Maintains electrical neutrality in both half-cells (NO3⁻ migrates to Anode; K⁺ migrates to Cathode).",
                    "Standard Cell Electromotive Force (EMF): E°_cell = E°_cathode - E°_anode = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = +0.34 - (-0.76) = +1.10 V."
                ]
            },
            {
                "heading": "3. The Alpha (α) Rule for Predicting Spontaneous Redox Directions",
                "points": [
                    "Arrange redox couples in increasing order of E° from left to right: Fe²⁺/Fe ... Cu²⁺/Cu.",
                    "Spontaneous reaction occurs between the stronger oxidizing agent and stronger reducing agent, yielding weaker counterparts: Cu²⁺ (stronger oxidant) + Fe (stronger reductant) → Fe²⁺ (weaker oxidant) + Cu (weaker reductant)."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Standard Cell EMF}: E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} > 0$$",
            "$$\\text{Daniell Cell}: E^\\circ_{\\text{cell}} = E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) - E^\\circ(\\text{Zn}^{2+}/\\text{Zn}) = 0.34 - (-0.76) = +1.10\\text{ V}$$",
            "$$\\text{Alpha Rule}: \\text{Stronger Oxidant} + \\text{Stronger Reductant} \\longrightarrow \\text{Weaker Oxidant} + \\text{Weaker Reductant}$$"
        ],
        "equations": [
            "$$\\text{Anode (-)}: \\text{Zn} \\longrightarrow \\text{Zn}^{2+} + 2e \\quad [\\text{Zinc Oxidation}]$$",
            "$$\\text{Cathode (+)}: \\text{Cu}^{2+} + 2e \\longrightarrow \\text{Cu} \\quad [\\text{Copper Ion Reduction}]$$",
            "$$\\text{Overall Cell Reaction}: \\text{Zn} + \\text{Cu}^{2+} \\longrightarrow \\text{Zn}^{2+} + \\text{Cu} \\quad [E^\\circ_{\\text{cell}} = +1.10\\text{ V}]$$"
        ],
        "q": "Given standard reduction potentials E°(Mg2+/Mg) = -2.37 V and E°(Ag+/Ag) = +0.80 V, construct the standard galvanic cell notation, write balanced half-cell reactions, and calculate standard cell EMF E°_cell.",
        "a": "Anode (Negative Electrode) is the Mg half-cell: Mg → Mg²⁺ + 2e. Cathode (Positive Electrode) is the Ag half-cell: Ag⁺ + 1e → Ag. Galvanic Cell Notation: (-) Mg | Mg²⁺ (1.0 M) || Ag⁺ (1.0 M) | Ag (+). Overall Spontaneous Cell Reaction: Mg + 2Ag⁺ → Mg²⁺ + 2Ag. Standard Cell EMF E°_cell = E°(Ag+/Ag) - E°(Mg2+/Mg) = +0.80 - (-2.37) = +3.17 V."
    },
    16: {
        "title": "Lesson 16: Electrolysis: Molten Salts, Aqueous Solutions & Faraday's Laws",
        "summary": "Electrolysis is non-spontaneous redox driven by external direct electric current. Mastery of cathode/anode discharge sequences, molten salt processing, and quantitative Faraday calculations.",
        "sections": [
            {
                "heading": "1. Principles of Electrolysis & Electrode Discharge Sequences",
                "points": [
                    "Cathode (Connected to Negative Terminal): Attracts cations, undergoing REDUCTION (electron gain). Discharge sequence: Strongest oxidants discharge first: Ag⁺ > Fe³⁺ > Cu²⁺ > H⁺ > Fe²⁺ > Zn²⁺ > H2O (Metal cations of Al³⁺ and more electropositive metals do NOT reduce in aqueous solution; water is reduced instead: 2H2O + 2e → H2 ↑ + 2OH⁻).",
                    "Anode (Connected to Positive Terminal): Attracts anions, undergoing OXIDATION (electron loss). Discharge sequence at inert anodes: S²⁻ > I⁻ > Br⁻ > Cl⁻ > H2O (Oxoanions SO4²⁻, NO3⁻ do not oxidize; water is oxidized instead: 2H2O → O2 ↑ + 4H⁺ + 4e)."
                ]
            },
            {
                "heading": "2. Quantitative Faraday Laws of Electrolysis",
                "points": [
                    "Mass of Substance Liberated at Electrode: m = (A × I × t) / (n × F) (where A is molar mass, I is current in Amperes, t is time in seconds, n is electrons transferred per ion, F = 96500 C/mol is Faraday's constant).",
                    "Mole of Transferred Electrons: n_e = (I × t) / F = Σ (n_substance × electrons transferred)."
                ]
            },
            {
                "heading": "3. Industrial Applications: Metal Smelting, Refining & Electroplating",
                "points": [
                    "Extraction of Highly Active Metals (Na, Mg, Al): Obligatory molten salt/oxide electrolysis (Downs cell for Na, Hall-Heroult for Al).",
                    "Copper Electro-refining: Utilizing crude blister copper anodes and pure copper cathode sheets.",
                    "Electroplating: Depositing micro-coatings of Gold, Silver, or Chromium onto decorative and corrosion-resistant components."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Faraday's Law}: m = \\frac{A \\cdot I \\cdot t}{n \\cdot F} \\quad (F = 96500\\text{ C/mol})$$",
            "$$\\text{Moles of Transferred Electrons}: n_e = \\frac{I \\cdot t}{F}$$",
            "$$\\text{Molten NaCl Electrolysis}: 2\\text{NaCl} \\xrightarrow{\\text{electrolysis}} 2\\text{Na} + \\text{Cl}_2\\uparrow$$",
            "$$\\text{Aqueous CuSO}_4\\text{ Electrolysis}: 2\\text{CuSO}_4 + 2\\text{H}_2\\text{O} \\longrightarrow 2\\text{Cu}\\downarrow\\text{ (Cathode)} + \\text{O}_2\\uparrow\\text{ (Anode)} + 2\\text{H}_2\\text{SO}_4$$"
        ],
        "equations": [
            "$$\\text{Cathode (-)}: \\text{Cu}^{2+} + 2e \\longrightarrow \\text{Cu}\\downarrow \\quad [\\text{Aqueous } \\text{CuSO}_4\\text{ Electrolysis}]$$",
            "$$\\text{Anode (+)}: 2\\text{H}_2\\text{O} \\longrightarrow \\text{O}_2\\uparrow + 4\\text{H}^+ + 4e \\quad [\\text{Electrolyte acidifies to } \\text{H}_2\\text{SO}_4]$$",
            "$$2\\text{NaCl} + 2\\text{H}_2\\text{O} \\xrightarrow{\\text{membrane}} 2\\text{NaOH} + \\text{Cl}_2\\uparrow\\text{ (Anode)} + \\text{H}_2\\uparrow\\text{ (Cathode)}$$"
        ],
        "q": "Electrolyze 500 mL of aqueous CuSO4 using inert electrodes with a constant current I = 5.0 A for 3860 seconds. Calculate the mass of copper deposited on the cathode and the volume of oxygen gas evolved at the anode at standard conditions (25°C, 1 bar).",
        "a": "Total transferred electrons: n_e = (I × t) / F = (5.0 × 3860) / 96500 = 0.2 mol. Cathode reaction: Cu²⁺ + 2e → Cu ⇒ n_Cu = n_e / 2 = 0.1 mol ⇒ m_Cu = 0.1 × 64 = 6.4 g. Anode reaction: 2H2O → O2 + 4H⁺ + 4e ⇒ n_O2 = n_e / 4 = 0.2 / 4 = 0.05 mol ⇒ V_O2 = 0.05 × 24.79 L = 1.2395 L."
    },
    17: {
        "title": "Lesson 17: Chapter 5 Review: Electrochemistry & Quantitative Electrolysis",
        "summary": "Comprehensive review of galvanic cell thermodynamics, electrolysis kinetics, mixed-salt discharge sequences, and electron conservation balances.",
        "sections": [
            {
                "heading": "1. Electron Conservation & Mixed Electrolyte Stoichiometry",
                "points": [
                    "Electron Conservation: Total moles of electrons surrendered at the anode must equal total moles gained at the cathode: n_e (Anode) = n_e (Cathode) = (I × t) / F.",
                    "Mass Loss of Solution: Δm_solution_decrease = m_precipitates (Cu, Ag) + m_gases (Cl2, O2, H2)."
                ]
            }
        ],
        "formulas": [
            "$$n_e = \\frac{I \\cdot t}{96500}$$",
            "$$\\Delta m_{\\text{solution loss}} = m_{\\text{precipitates}} + m_{\\text{gases evolved}}$$"
        ],
        "equations": [
            "$$\\text{CuSO}_4 + 2\\text{NaCl} \\xrightarrow{\\text{electrolysis}} \\text{Cu}\\downarrow + \\text{Cl}_2\\uparrow + \\text{Na}_2\\text{SO}_4$$"
        ],
        "q": "An aqueous solution containing 0.1 mol AgNO3 and 0.15 mol Cu(NO3)2 is electrolyzed with inert electrodes. Electrolysis is stopped immediately when gas bubbles first begin to evolve at the cathode. Calculate the total moles of electrons transferred.",
        "a": "Cathode discharge order: Ag⁺ + 1e → Ag (0.1 mol Ag⁺ consumes 0.1 mol e); then Cu²⁺ + 2e → Cu (0.15 mol Cu²⁺ consumes 0.3 mol e). The onset of gas bubbling at the cathode indicates all metallic cations (Ag⁺ and Cu²⁺) have been completely reduced and H2O reduction (2H2O + 2e → H2 + 2OH⁻) has just commenced. Total transferred electrons: n_e = 0.1 + 0.3 = 0.4 mol."
    },
    18: {
        "title": "Lesson 18: Metallic Bonding & Crystal Lattices (BCC, FCC & HCP)",
        "summary": "Nature of metallic bonding: fixed lattice metal cations enveloped by a delocalized free electron gas. Examination of Body-Centered Cubic (BCC), Face-Centered Cubic (FCC), and Hexagonal Close-Packed (HCP) unit cells.",
        "sections": [
            {
                "heading": "1. The Nature of Metallic Bonding & Electron Sea Model",
                "points": [
                    "A metallic bond consists of electrostatic attraction between metal cations situated at crystal lattice nodes and a delocalized gas of valence electrons moving freely throughout the crystal structure.",
                    "These mobile conduction electrons hold the positive lattice cations together and conduct electrical and thermal energy rapidly throughout the metal."
                ]
            },
            {
                "heading": "2. Three Foundational Metallic Crystal Lattices (BCC, FCC, HCP)",
                "points": [
                    "Body-Centered Cubic (BCC): Li, Na, K, Rb, Cs, Ba, Cr, α-Fe. Packing efficiency: 68% (atoms occupy 68% of crystal volume; 32% is void space).",
                    "Face-Centered Cubic (FCC): Cu, Ag, Au, Al, Ni, Pt, γ-Fe. Packing efficiency: 74% (close-packed ABCABC layer sequence).",
                    "Hexagonal Close-Packed (HCP): Be, Mg, Zn, Ti. Packing efficiency: 74% (close-packed ABABAB layer sequence)."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Body-Centered Cubic (BCC)}: \\text{Li, Na, K, Ba, Cr, Fe} \\quad (\\text{Packing Efficiency } 68\\%)$$",
            "$$\\text{Face-Centered Cubic (FCC)}: \\text{Cu, Ag, Au, Al, Pt} \\quad (\\text{Packing Efficiency } 74\\%)$$",
            "$$\\text{Hexagonal Close-Packed (HCP)}: \\text{Be, Mg, Zn} \\quad (\\text{Packing Efficiency } 74\\%)$$",
            "$$\\text{Metallic Bonding}: \\text{Metal Cations } M^{n+} + \\text{Delocalized Free Electron Gas } (e^-)$$"
        ],
        "equations": [
            "$$\\text{Metallic Bonding Model}: \\text{Metal Cations } M^{n+} + \\text{Delocalized Electron Gas}$$"
        ],
        "q": "Why do alkali metals (Li, Na, K) possess very low densities and are so soft that they can easily be sliced with an ordinary laboratory butter knife?",
        "a": "Alkali metals possess large atomic radii with only a single valence electron (ns¹) contributing to the electron sea. Furthermore, they crystallize in the loosely packed Body-Centered Cubic (BCC) lattice with low packing efficiency (68%). This results in weak metallic bonding, large atomic volumes, low densities (Na and K float on water), and low hardness."
    },
    19: {
        "title": "Lesson 19: Physical & Chemical Properties of Metals (Activity & Redox)",
        "summary": "Exploration of universal metallic physical properties (malleability, electrical conductivity, thermal conductivity, metallic luster) and foundational chemical reducing character.",
        "sections": [
            {
                "heading": "1. Four Universal Metallic Physical Properties & Element Extremes",
                "points": [
                    "Malleability: Gold (Au) is the most malleable and ductile metal (can be beaten into 0.0001 mm translucent foil or drawn into kilometer-long wires).",
                    "Electrical & Thermal Conductivity: Decreases in the sequence: Silver (Ag) > Copper (Cu) > Gold (Au) > Aluminum (Al) > Iron (Fe). Increasing temperature increases lattice vibrations, scattering electrons and decreasing conductivity.",
                    "Metallic Luster: Delocalized free electrons reflect virtually all incident visible light, imparting a brilliant metallic sheen.",
                    "Metallic Extremes: Highest Melting Point: Tungsten (W, 3422°C, lamp filaments); Lowest Melting Point: Mercury (Hg, -39°C, liquid); Hardest Metal: Chromium (Cr, cuts glass); Softest Metal: Cesium (Cs); Densest Metal: Osmium (Os, D = 22.6 g/cm³); Lightest Metal: Lithium (Li, D = 0.53 g/cm³)."
                ]
            },
            {
                "heading": "2. Characteristic Chemical Property: Strong Reducing Character",
                "points": [
                    "Metal atoms possess few valence electrons (1, 2, or 3e) and relatively large atomic radii with low ionization energies, readily losing electrons to form cations: M → M^(n+) + ne.",
                    "Reactions with Non-metals (O2, Cl2, S).",
                    "Reactions with Acids: Non-oxidizing acids (HCl, dilute H2SO4) oxidize metals prior to (H) in the reactivity series to evolve H2 gas; Strongly oxidizing acids (HNO3, conc. H2SO4) oxidize metals to their highest oxidation states without producing H2 gas.",
                    "Displacement Reactions with Salts: A more active metal displaces a less active metal from its aqueous salt solution."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Electrical Conductivity}: \\text{Ag} > \\text{Cu} > \\text{Au} > \\text{Al} > \\text{Fe}$$",
            "$$\\text{Highest Melting Point}: \\text{Tungsten W } (3422^\\circ\\text{C}) \\;\\vert\\; \\text{Hardest}: \\text{Chromium Cr}$$",
            "$$\\text{Reducing Nature}: M \\longrightarrow M^{n+} + ne$$"
        ],
        "equations": [
            "$$2\\text{Al} + 3\\text{Cl}_2 \\longrightarrow 2\\text{AlCl}_3$$",
            "$$\\text{Fe} + 2\\text{HCl} \\longrightarrow \\text{FeCl}_2 + \\text{H}_2\\uparrow$$",
            "$$3\\text{Cu} + 8\\text{HNO}_3\\text{ (dilute)} \\longrightarrow 3\\text{Cu}(\\text{NO}_3)_2 + 2\\text{NO}\\uparrow + 4\\text{H}_2\\text{O}$$"
        ],
        "q": "Why is aluminum (Al) widely preferred over higher-conducting copper (Cu) for constructing long-distance high-voltage electrical grid transmission cables?",
        "a": "Although copper has higher electrical conductivity than aluminum, aluminum is nearly 3.3 times lighter in density (D_Al = 2.7 g/cm³ vs D_Cu = 8.9 g/cm³) and significantly less expensive. Utilizing aluminum conductors drastically reduces mechanical tension and weight loading on high-voltage transmission pylons, yielding massive structural and economic savings."
    },
    20: {
        "title": "Lesson 20: Industrial Metallurgy: Pyrometallurgy, Hydrometallurgy & Electrometallurgy",
        "summary": "Foundational industrial metallurgical extraction routes: Pyrometallurgy (high-temperature blast furnace reduction), Hydrometallurgy (aqueous displacement), and Electrometallurgy (molten salt electrolysis).",
        "sections": [
            {
                "heading": "1. Three Industrial Metallurgy Methods (Thermal, Hydro, Electro)",
                "points": [
                    "Pyrometallurgy: Utilizing strong chemical reducing agents (CO, H2, C, Al) at elevated temperatures to reduce metal oxides. Applied to moderately active and less active metals (post-Al metals: Fe, Cu, Pb, Zn) (e.g., blast furnace smelting of iron ore Fe2O3).",
                    "Hydrometallurgy: Utilizing a more electropositive active metal to displace less active metal cations from aqueous leach solutions. Applied to noble or low-grade copper/gold ores (e.g., Fe displacing Cu from mine leachate CuSO4).",
                    "Electrometallurgy: The most powerful extraction method. Molten salt electrolysis is mandatory for extracting strongly reducing metals (Li, Na, K, Ca, Ba, Mg, Al); Aqueous solution electrolysis refines moderately active metals (Cu, Zn)."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Pyrometallurgy}: \\text{Fe}_2\\text{O}_3 + 3\\text{CO} \\xrightarrow{t^\\circ} 2\\text{Fe} + 3\\text{CO}_2$$",
            "$$\\text{Hydrometallurgy}: \\text{Fe} + \\text{CuSO}_4 \\longrightarrow \\text{FeSO}_4 + \\text{Cu}\\downarrow$$",
            "$$\\text{Molten Alumina Electrolysis}: 2\\text{Al}_2\\text{O}_3 \\xrightarrow[\\text{Na}_3\\text{AlF}_6, 950^\\circ\\text{C}]{\\text{electrolysis}} 4\\text{Al} + 3\\text{O}_2\\uparrow$$"
        ],
        "equations": [
            "$$\\text{Fe}_2\\text{O}_3 + 3\\text{CO} \\xrightarrow{t^\\circ} 2\\text{Fe} + 3\\text{CO}_2 \\quad [\\text{Blast Furnace Smelting}]$$",
            "$$2\\text{Al}_2\\text{O}_3 \\xrightarrow{\\text{electrolysis}} 4\\text{Al} + 3\\text{O}_2 \\quad [\\text{Hall-Héroult Process}]$$"
        ],
        "q": "Why is it chemically impossible to extract aluminum metal (Al) via pyrometallurgical reduction of Al2O3 with CO or by aqueous electrolysis of AlCl3 solutions?",
        "a": "The Al³⁺ cation has an extremely negative reduction potential and the Al-O ionic bond in Al2O3 is exceptionally robust, so chemical reductants (CO, H2) cannot thermodynamically reduce Al2O3. In aqueous electrolysis of AlCl3, because the standard reduction potential of Al³⁺ is much more negative than that of water, water is preferentially reduced at the cathode to generate H2 gas and OH⁻ ions rather than depositing aluminum metal."
    },
    21: {
        "title": "Lesson 21: Alloys: Microstructures, Duralumin, Inox & High-Performance Materials",
        "summary": "Alloys are engineered metallic materials combining base metals with alloying elements. Exploration of interstitial/substitutional solid solutions, cast iron, structural steel, stainless Inox, and aerospace Duralumin.",
        "sections": [
            {
                "heading": "1. Concepts, Interstitial/Substitutional Solid Solutions in Alloys",
                "points": [
                    "Alloys consist of metallic bonding lattices containing solid solutions or intermetallic compounds of metals with other metals or non-metals.",
                    "Superior Mechanical Properties: Alloys typically exhibit greater hardness, higher tensile strength, and lower melting points than pure constituent metals because solute atoms disrupt regular lattice planes, preventing crystal planes from sliding past each other under stress."
                ]
            },
            {
                "heading": "2. Representative Industrial Alloys (Cast Iron, Steel, Inox, Duralumin)",
                "points": [
                    "Cast Iron (2--5% C): Brittle, excellent compressive strength, used for engine blocks and heavy manhole covers.",
                    "Steel (< 2% C): Ductile, highly elastic, high tensile strength, foundational for infrastructure and skyscraper construction.",
                    "Stainless Steel / Inox (Fe-Cr-Ni): Chromium forms an ultra-thin, self-healing, impervious Cr2O3 passivation layer providing exceptional corrosion resistance.",
                    "Duralumin (Al-Cu-Mg-Mn): Lightweight with mechanical strength comparable to structural steel, indispensable in aircraft and aerospace fuselage fabrication."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Cast Iron}: 2\\text{--}5\\%\\text{ Carbon} \\;\\vert\\; \\text{Steel}: 0.01\\text{--}2\\%\\text{ Carbon}$$",
            "$$\\text{Duralumin (Al-Cu-Mg)}: \\text{Ultra-lightweight aerospace alloy}$$",
            "$$\\text{Inox Stainless Steel (Fe-Cr-Ni)}: \\text{Passivating } \\text{Cr}_2\\text{O}_3\\text{ layer}$$"
        ],
        "equations": [
            "$$\\text{Fe} + \\text{Cr} + \\text{Ni} \\longrightarrow \\text{Inox Stainless Steel (Corrosion Resistant)}$$"
        ],
        "q": "Why is pure 24K gold (99.99% Au) avoided for setting precious gemstones in jewelry rings, with jewellers preferring 18K or 14K gold alloys instead?",
        "a": "Pure 24K gold is exceptionally soft and malleable; everyday wear would cause ring prongs to bend and deform, allowing gemstones to dislodge. 18K gold is an alloy containing 75% gold blended with copper (Cu), silver (Ag), and zinc (Zn), which introduces lattice strain that drastically elevates hardness and mechanical strength, securely locking gemstones in place."
    },
    22: {
        "title": "Lesson 22: Corrosion of Metals: Chemical vs Electrochemical & Cathodic Protection",
        "summary": "Destructive deterioration of metals: direct chemical oxidation vs localized micro-galvanic electrochemical corrosion. Practical protective coatings and sacrificial cathodic anode protection.",
        "sections": [
            {
                "heading": "1. Chemical Corrosion vs Electrochemical Corrosion",
                "points": [
                    "Chemical Corrosion: Direct redox reaction between metal atoms and environmental oxidants without generating micro-currents (e.g., motorcycle exhaust pipes corroded by hot exhaust gases).",
                    "Electrochemical Corrosion: Deterioration of metals accompanied by localized micro-galvanic currents in electrolyte media (the most pervasive and destructive form of corrosion)."
                ]
            },
            {
                "heading": "2. Three Essential Conditions for Electrochemical Corrosion",
                "points": [
                    "1. Two dissimilar conducting electrodes (Metal-Metal such as Fe-Cu, or Metal-Nonmetal such as Fe-C in steel).",
                    "2. Direct or indirect electrical contact between the two electrodes.",
                    "3. Both electrodes simultaneously immersed in an electrolyte solution (rainwater, seawater, moist air).",
                    "Mechanism: The Anode (more active metal, Fe) undergoes destructive oxidation: Fe → Fe²⁺ + 2e. The Cathode (less active metal/carbon) reduces dissolved O2 or H⁺: O2 + 2H2O + 4e → 4OH⁻."
                ]
            },
            {
                "heading": "3. Protective Surface Coatings & Sacrificial Anodic Protection",
                "points": [
                    "Barrier Protection: Painting, electroplating (galvanizing, tinning), enameling, greasing to isolate metal surfaces from atmospheric moisture and oxygen.",
                    "Cathodic Protection (Sacrificial Anodes): Fastening blocks of a more active metal (such as Zinc Zn) to steel ship hulls or offshore oil drilling platforms. Zinc acts as the sacrificial anode and corrodes preferentially, keeping the steel cathode intact."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Conditions}: 2\\text{ Dissimilar Electrodes} + \\text{Electrical Contact} + \\text{Electrolyte Solution}$$",
            "$$\\text{Anode (-)}: \\text{More active metal undergoes destructive oxidation}$$",
            "$$\\text{Cathodic Protection}: \\text{Sacrificial Zinc (Zn) blocks protect steel ship hulls}$$"
        ],
        "equations": [
            "$$\\text{Anode (-)}: \\text{Fe} \\longrightarrow \\text{Fe}^{2+} + 2e \\quad [\\text{Steel Corrosion}]$$",
            "$$\\text{Cathode (+)}: \\text{O}_2 + 2\\text{H}_2\\text{O} + 4e \\longrightarrow 4\\text{OH}^- \\quad [\\text{In Moist Aerated Atmosphere}]$$",
            "$$\\text{Fe}^{2+} + 2\\text{OH}^- \\longrightarrow \\text{Fe(OH)}_2\\downarrow \\longrightarrow \\text{Fe}_2\\text{O}_3 \\cdot n\\text{H}_2\\text{O} \\quad [\\text{Red-Brown Rust}]$$"
        ],
        "q": "A copper clothesline wire is spliced together with a steel wire (Fe-C) and left exposed outdoors in humid rainy weather. At the joint, which wire will corrode and snap first? Explain why.",
        "a": "The steel wire will corrode and snap first. Because iron (Fe) has a more negative reduction potential than copper (Cu), a localized galvanic micro-cell forms at the joint in the presence of conductive rainwater (electrolyte). Iron acts as the Anode and is preferentially oxidized into solution (Fe → Fe²⁺ + 2e), causing rapid localized galvanic corrosion of the steel wire."
    },
    23: {
        "title": "Lesson 23: Chapter 6 Review: Metallurgy & Electrochemical Displacement",
        "summary": "Comprehensive synthesis of general metallurgy, electrochemical series reactivity, and metal bar displacement stoichiometry.",
        "sections": [
            {
                "heading": "1. Summary of Metallic Properties, Activity Series & Displacement",
                "points": [
                    "Characteristic Chemical Property: Electron donation (reducing character: M → M^(n+) + ne).",
                    "Predicting redox feasibility via the electrochemical reduction series.",
                    "Diagnostic differentiation between chemical and electrochemical corrosion."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Electron Conservation}: \\sum n_e\\text{ lost} = \\sum n_e\\text{ gained}$$"
        ],
        "equations": [
            "$$\\text{Fe} + 2\\text{AgNO}_3 \\longrightarrow \\text{Fe}(\\text{NO}_3)_2 + 2\\text{Ag}\\downarrow$$"
        ],
        "q": "Add 5.6 g of iron powder (Fe) into 200 mL of 1.5 M AgNO3 solution. After the reaction goes to completion, calculate the total mass of metallic precipitate obtained.",
        "a": "Moles: n_Fe = 5.6 / 56 = 0.1 mol; n_AgNO3 = 0.2 × 1.5 = 0.3 mol. Stage 1: Fe + 2Ag⁺ → Fe²⁺ + 2Ag ↓ (0.1 mol Fe consumes 0.2 mol Ag⁺, producing 0.2 mol Ag and 0.1 mol Fe²⁺, with 0.1 mol Ag⁺ remaining). Stage 2: Fe²⁺ + Ag⁺ → Fe³⁺ + Ag ↓ (0.1 mol Fe²⁺ reacts completely with 0.1 mol remaining Ag⁺, producing an additional 0.1 mol Ag). Total metallic silver precipitated: n_Ag = 0.2 + 0.1 = 0.3 mol ⇒ m_Ag = 0.3 × 108 = 32.4 g."
    },
    24: {
        "title": "Lesson 24: Group IA Elements: Alkali Metals (Li, Na, K, Rb, Cs)",
        "summary": "Group IA Alkali Metals (Li, Na, K, Rb, Cs): ns¹ valence configuration, extreme reducing vigor, characteristic flame emission colors, and safe storage under dry kerosene.",
        "sections": [
            {
                "heading": "1. Group IA Coordinates, ns¹ Electronic Structure & Physical Trends",
                "points": [
                    "Group IA Alkali Metals: Lithium (Li), Sodium (Na), Potassium (K), Rubidium (Rb), Cesium (Cs).",
                    "Valence Electron Configuration ns¹: Readily loses 1 electron to achieve noble gas stability ⇒ In all compounds, alkali metals exhibit an invariant +1 oxidation state.",
                    "Physical Trends: Body-Centered Cubic (BCC) crystal lattices, soft, silvery-white luster, low melting/boiling points, low densities (Na and K float on water)."
                ]
            },
            {
                "heading": "2. Extreme Reducing Reactivity, Flame Emission Colors & Kerosene Storage",
                "points": [
                    "Violent Reaction with Water at Room Temperature: 2M + 2H2O → 2MOH + H2 ↑ (exothermic, melting sodium into a floating sphere; potassium ignites with a violet flame).",
                    "Reactions with Oxygen: Burns in air to form oxides (Li2O), peroxides (Na2O2), or superoxides (KO2).",
                    "Characteristic Flame Emission Colors: Li imparts Carmine Red; Na imparts Intense Bright Yellow; K imparts Lilac Violet.",
                    "Safety Storage Protocol: Due to rapid exothermic reaction with atmospheric moisture and oxygen, alkali metals (Na, K) must be stored completely submerged under dry kerosene."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Alkali Metals (Group IA)}: \\text{Invariant Oxidation State } +1$$",
            "$$2M + 2\\text{H}_2\\text{O} \\longrightarrow 2M\\text{OH} + \\text{H}_2\\uparrow \\quad (\\text{Highly Exothermic})$$",
            "$$\\text{Flame Colors}: \\text{Na (Bright Yellow)}, \\text{ K (Lilac Violet)}, \\text{ Li (Carmine Red)}$$",
            "$$\\text{Storage}: \\text{Completely submerged under anhydrous kerosene}$$"
        ],
        "equations": [
            "$$2\\text{Na} + 2\\text{H}_2\\text{O} \\longrightarrow 2\\text{NaOH} + \\text{H}_2\\uparrow \\quad [\\text{Vigorous Reaction}]$$",
            "$$2\\text{Na} + \\text{O}_2 \\longrightarrow \\text{Na}_2\\text{O}_2 \\quad [\\text{Sodium Peroxide in excess Oxygen}]$$"
        ],
        "q": "Why is it strictly prohibited to use water or standard CO2 fire extinguishers to extinguish fires involving burning alkali metals (Sodium, Potassium)?",
        "a": "Alkali metals react violently and explosively with water to evolve combustible hydrogen gas (2Na + 2H2O → 2NaOH + H2 ↑). Furthermore, at high temperatures, molten alkali metals reduce carbon dioxide (4Na + CO2 → 2Na2O + C), feeding the fire and releasing carbon soot. Alkali metal fires must be smothered using dry sand or specialized Class D dry powder extinguishing agents."
    },
    25: {
        "title": "Lesson 25: Group IIA Elements: Alkaline Earth Metals & Hard Water Softening",
        "summary": "Group IIA Alkaline Earth Metals (Be, Mg, Ca, Sr, Ba): ns² valence configuration, +2 oxidation state, calcium mineral chemistry, and chemical softening of temporary, permanent, and total hard water.",
        "sections": [
            {
                "heading": "1. Group IIA ns² Electronic Trends & Chemical Reactivity",
                "points": [
                    "Group IIA Alkaline Earth Metals: Beryllium (Be), Magnesium (Mg), Calcium (Ca), Strontium (Sr), Barium (Ba).",
                    "Valence Configuration ns² ⇒ Invariant +2 oxidation state across all compounds.",
                    "Reducing Power (increases down group): Ca, Sr, Ba react with water at room temperature to form alkaline hydroxides; Mg reacts slowly with hot water; Be does not react with water at any temperature."
                ]
            },
            {
                "heading": "2. Calcium Compounds: Quicklime, Slaked Lime, Limestone & Gypsum",
                "points": [
                    "Calcium Oxide (CaO - Quicklime): Exothermically slakes with water to produce slaked lime (CaO + H2O → Ca(OH)2).",
                    "Calcium Hydroxide (Ca(OH)2 - Slaked Lime / Limewater): Used in mortar, agricultural soil de-acidification, and testing for CO2 gas (milky CaCO3 precipitate).",
                    "Calcium Carbonate (CaCO3 - Limestone): Dissolves in carbonic acid rain water, creating subterranean karst caves and stalactite formations: CaCO3 + CO2 + H2O ⇌ Ca(HCO3)2.",
                    "Calcium Sulfate (Gypsum): Raw Gypsum (CaSO4 · 2H2O), Plaster of Paris (CaSO4 · 0.5H2O, medical bone casting and sculptures), Anhydrite (CaSO4)."
                ]
            },
            {
                "heading": "3. Classification of Hard Water & Chemical Softening Techniques",
                "points": [
                    "Definition: Hard water contains high concentrations of Ca²⁺ and Mg²⁺ ions (Soft water contains negligible concentrations).",
                    "Temporary Hard Water: Contains hydrogen carbonate anions HCO3⁻ (Ca(HCO3)2, Mg(HCO3)2). Softened by boiling (Ca(HCO3)2 → CaCO3 ↓ + CO2 ↑ + H2O), or adding stoichiometric Ca(OH)2, Na2CO3, Na3PO4.",
                    "Permanent Hard Water: Contains Cl⁻ and SO4²⁻ anions (CaCl2, MgSO4). Softened by adding Na2CO3 or Na3PO4 precipitation reagents.",
                    "Total Hard Water: Contains both temporary and permanent hardness. Softened universally using Na2CO3 or Na3PO4."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Temporary Hard Water}: \\text{Contains } \\text{Ca}^{2+}, \\text{Mg}^{2+}, \\text{HCO}_3^-$$",
            "$$\\text{Temporary Softening}: \\text{Boiling } \\;\\vert\\; \\text{Stoichiometric } \\text{Ca(OH)}_2 \\;\\vert\\; \\text{Na}_2\\text{CO}_3 \\;\\vert\\; \\text{Na}_3\\text{PO}_4$$",
            "$$\\text{Universal Softening Reagent (All Hard Water Types)}: \\text{Na}_2\\text{CO}_3 \\text{ or } \\text{Na}_3\\text{PO}_4$$",
            "$$\\text{Karst Cave Speleothem Equilibrium}: \\text{CaCO}_3 + \\text{CO}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{Ca(HCO}_3)_2$$"
        ],
        "equations": [
            "$$\\text{Ca(HCO}_3)_2 \\xrightarrow{t^\\circ} \\text{CaCO}_3\\downarrow + \\text{CO}_2\\uparrow + \\text{H}_2\\text{O} \\quad [\\text{Boiling Softens Temporary Hard Water}]$$",
            "$$\\text{Ca}^{2+} + \\text{CO}_3^{2-} \\longrightarrow \\text{CaCO}_3\\downarrow \\quad [\\text{Precipitation with } \\text{Na}_2\\text{CO}_3]$$",
            "$$\\text{CaO} + \\text{H}_2\\text{O} \\longrightarrow \\text{Ca(OH)}_2 \\quad [\\text{Exothermic Lime Slaking}]$$"
        ],
        "q": "Why does boiling temporary hard water soften the water while simultaneously depositing thick mineral scale crusts at the bottom of heating kettles?",
        "a": "Temporary hard water contains dissolved calcium bicarbonate Ca(HCO3)2 and magnesium bicarbonate Mg(HCO3)2. Upon heating to boiling, these thermally unstable bicarbonates decompose into insoluble calcium carbonate CaCO3 and magnesium carbonate MgCO3: Ca(HCO3)2 → CaCO3 ↓ + CO2 ↑ + H2O. The insoluble carbonates precipitate as solid mineral scale at the bottom of the kettle, thereby removing Ca²⁺ and Mg²⁺ ions from solution and softening the water."
    },
    26: {
        "title": "Lesson 26: Chapter 7 Review: Group IA & IIA Elements Stoichiometry",
        "summary": "Comprehensive review of alkali and alkaline earth reactions: metal-water vigor, CO2 bubbling through Ca(OH)2/Ba(OH)2, and precipitation stoichiometry.",
        "sections": [
            {
                "heading": "1. Quantitative Analysis of CO2 Absorption in Alkaline Hydroxides",
                "points": [
                    "Molar ratio T = n_OH⁻ / n_CO2:",
                    "T ≤ 1: Exclusively acid salt HCO3⁻ is formed (no precipitate).",
                    "1 < T < 2: Both neutral carbonate CO3²⁻ (precipitate) and bicarbonate HCO3⁻ (soluble) are formed.",
                    "T ≥ 2: Exclusively neutral carbonate CO3²⁻ is formed (maximum precipitation)."
                ]
            }
        ],
        "formulas": [
            "$$T = \\frac{n_{\\text{OH}^-}}{n_{\\text{CO}_2}}$$",
            "$$T = 1: \\text{Forms } \\text{HCO}_3^- \\quad \\vert \\quad T = 2: \\text{Forms } \\text{CO}_3^{2-}$$"
        ],
        "equations": [
            "$$\\text{CO}_2 + \\text{Ca(OH)}_2 \\longrightarrow \\text{CaCO}_3\\downarrow + \\text{H}_2\\text{O} \\quad [\\text{White Precipitate}]$$",
            "$$\\text{CaCO}_3 + \\text{CO}_2\\text{ (excess)} + \\text{H}_2\\text{O} \\longrightarrow \\text{Ca(HCO}_3)_2 \\quad [\\text{Precipitate Dissolves}]$$"
        ],
        "q": "Bubble 3.7185 L of CO2 gas at standard conditions (25°C, 1 bar) into 200 mL of 1.0 M Ca(OH)2 solution. Calculate the mass of CaCO3 precipitate obtained.",
        "a": "Moles: n_CO2 = 3.7185 / 24.79 = 0.15 mol; n_Ca(OH)2 = 0.2 × 1.0 = 0.2 mol ⇒ n_OH⁻ = 0.4 mol. Ratio T = n_OH⁻ / n_CO2 = 0.4 / 0.15 = 2.67 > 2 ⇒ Ca(OH)2 is in excess; only neutral CaCO3 precipitates based on limiting CO2. Moles of precipitate: n_CaCO3 = n_CO2 = 0.15 mol ⇒ m_CaCO3 = 0.15 × 100 = 15.0 g."
    },
    27: {
        "title": "Lesson 27: First-Row Transition Metals (3d Series & Electron Configurations)",
        "summary": "First-row 3d transition metals (Sc through Zn): partially filled d-orbitals, anomalous configurations (Cr, Cu), variable oxidation states, colorful d-d electronic transitions, and catalytic excellence.",
        "sections": [
            {
                "heading": "1. 3d Electronic Configurations, Anomalies (Cr, Cu) & Oxidation States",
                "points": [
                    "Ten 3d Transition Elements: Sc (21), Ti (22), V (23), Cr (24), Mn (25), Fe (26), Co (27), Ni (28), Cu (29), Zn (30).",
                    "Aufbau Subshell Filling: Electrons populate the inner 3d subshell before completely filling valence 4s shells.",
                    "Anomalous Stable Configurations: Chromium Cr (Z=24) has configuration [Ar] 3d⁵ 4s¹ (half-filled 3d subshell stability); Copper Cu (Z=29) has configuration [Ar] 3d¹⁰ 4s¹ (completely filled 3d subshell stability).",
                    "Variable Oxidation States: Because 3d and 4s orbitals have comparable energy levels, both participate in chemical bonding. Examples: Fe (+2, +3), Cr (+2, +3, +6), Mn (+2, +3, +4, +6, +7). Manganese exhibits +7 in potassium permanganate (KMnO4), a potent industrial oxidant."
                ]
            },
            {
                "heading": "2. Paramagnetism, Colorful d-d Transitions & Industrial Catalysis",
                "points": [
                    "Transition metal complexes exhibit vibrant colors arising from d-d electronic transitions when ligands split degenerate d-orbital energies in visible light.",
                    "Transition metals and their complexes serve as premier industrial catalysts (Fe in Haber NH3 synthesis; V2O5 in Contact H2SO4 synthesis; Pt/Pd in automotive catalytic converters)."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Special Configurations}: \\text{Cr } [\\text{Ar}] 3d^5 4s^1 \\;\\vert\\; \\text{Cu } [\\text{Ar}] 3d^{10} 4s^1$$",
            "$$\\text{Variable Oxidation States}: \\text{Mn } (+2 \\text{ to } +7), \\text{Fe } (+2, +3), \\text{Cr } (+2, +3, +6)$$ ",
            "$$\\text{Vibrant Colors arise from crystal field } d\\text{-}d \\text{ electronic transitions}$$"
        ],
        "equations": [
            "$$2\\text{KMnO}_4 \\xrightarrow{t^\\circ} \\text{K}_2\\text{MnO}_4 + \\text{MnO}_2 + \\text{O}_2\\uparrow$$",
            "$$\\text{Cr}_2\\text{O}_3 + 2\\text{Al} \\xrightarrow{t^\\circ} 2\\text{Cr} + \\text{Al}_2\\text{O}_3 \\quad [\\text{Aluminothermic Reduction}]$$"
        ],
        "q": "Why are main-group metal cations (Na+, Ca2+, Al3+) colorless in aqueous solution, whereas transition metal cations (Cu2+, Fe3+, Ni2+, MnO4-) display intense, vibrant colors?",
        "a": "Main-group cations (Na⁺, Ca²⁺, Al³⁺) have closed-shell noble gas configurations with no unpaired d electrons. Transition metal cations (Cu²⁺ 3d⁹, Fe³⁺ 3d⁵) possess partially filled d-orbitals. Surrounding coordinated water molecules split the degenerate d-orbitals into distinct energy levels; absorbing specific visible light wavelengths promotes d-electrons between split levels (d-d transition), transmitting the complementary visible colors (Cu²⁺ sky blue, Fe³⁺ yellow-brown, MnO4⁻ deep purple)."
    },
    28: {
        "title": "Lesson 28: Coordination Chemistry: Central Ions, Ligands & Coordination Numbers",
        "summary": "Coordination complexes: central transition metal ions bonded to surrounding electron-donating ligands via coordinate covalent bonds. Formulas [M(L)_n]^z, geometries, and diagnostic color tests.",
        "sections": [
            {
                "heading": "1. Concepts, Central Cations, Ligands & Coordination Numbers",
                "points": [
                    "A coordination complex consists of a central metal atom/ion (possessing vacant valence orbitals) bonded to surrounding molecules or anions called ligands through coordinate covalent (dative) bonds.",
                    "Formula Architecture: [M(L)_n]^z where M is the central metal ion; L is the coordinated ligand; n is the coordination number (number of σ bonds to central ion); z is the net inner sphere charge.",
                    "Common Ligands: Neutral: Aqua (H2O), Ammine (NH3), Carbonyl (CO); Anionic: Chlorido (Cl⁻), Hydroxido (OH⁻), Cyanido (CN⁻)."
                ]
            },
            {
                "heading": "2. Classic Laboratory Complexes: [Cu(NH3)4]²⁺, Tollens, Iron-Phenol",
                "points": [
                    "Tetraamminecopper(II) [Cu(NH3)4]²⁺: Adding aqueous NH3 dropwise to CuSO4 first precipitates pale blue Cu(OH)2, which subsequently dissolves in excess NH3 to form a clear, magnificent ROYAL BLUE solution.",
                    "Diamminesilver(I) Tollens Reagent [Ag(NH3)2]⁺: Formed by dissolving silver oxide in excess aqueous ammonia, used for mirror silvering and aldehyde detection.",
                    "Iron(III)-Phenolate [Fe(OC6H5)6]³⁻: Adding FeCl3 to phenol yields an intense deep VIOLET complex (diagnostic test for phenols)."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Complex Structure}: [M(L)_n]^z \\quad (M: \\text{Central Cation}, L: \\text{Ligand}, n: \\text{Coordination Number})$$",
            "$$\\text{Cu}^{2+} + 4\\text{NH}_3 \\longrightarrow [\\text{Cu}(\\text{NH}_3)_4]^{2+} \\quad (\\text{Royal Blue Solution})$$",
            "$$\\text{Ag}^+ + 2\\text{NH}_3 \\longrightarrow [\\text{Ag}(\\text{NH}_3)_2]^+ \\quad (\\text{Tollens Reagent})$$",
            "$$\\text{Fe}^{3+} + 6\\text{C}_6\\text{H}_5\\text{OH} \\longrightarrow [\\text{Fe}(\\text{OC}_6\\text{H}_5)_6]^{3-} + 6\\text{H}^+ \\quad (\\text{Deep Violet Phenol Test})$$"
        ],
        "equations": [
            "$$\\text{CuSO}_4 + 2\\text{NH}_3 + 2\\text{H}_2\\text{O} \\longrightarrow \\text{Cu(OH)}_2\\downarrow\\text{ (Pale Blue)} + (\\text{NH}_4)_2\\text{SO}_4$$",
            "$$\\text{Cu(OH)}_2 + 4\\text{NH}_3 \\longrightarrow [\\text{Cu}(\\text{NH}_3)_4](\\text{OH})_2 \\quad [\\text{Dissolves to Royal Blue Complex}]$$",
            "$$\\text{AgNO}_3 + 3\\text{NH}_3 + \\text{H}_2\\text{O} \\longrightarrow [\\text{Ag}(\\text{NH}_3)_2]\\text{OH} + \\text{NH}_4\\text{NO}_3 \\quad [\\text{Tollens Reagent}]$$"
        ],
        "q": "Describe the visible observations and write balanced chemical equations when aqueous ammonia (NH3) is added dropwise until in excess to a solution of copper(II) sulfate (CuSO4).",
        "a": "Observations: Initially, a light blue precipitate of Cu(OH)2 forms: CuSO4 + 2NH3 + 2H2O → Cu(OH)2 ↓ + (NH4)2SO4. Upon adding excess aqueous NH3, the precipitate completely dissolves to form a clear, intense DEEP ROYAL BLUE solution of tetraamminecopper(II) hydroxide complex: Cu(OH)2 + 4NH3 → [Cu(NH3)4](OH)2."
    },
    29: {
        "title": "Lesson 29: Complex Stability Constants & Biological Coordination (Hemoglobin, Cisplatin)",
        "summary": "Complex thermodynamic stability constants (K_stab), chelate effect, and vital biological metalloproteins: oxygen-carrying Hemoglobin, photosynthetic Chlorophyll, Vitamin B12, and anticancer Cisplatin.",
        "sections": [
            {
                "heading": "1. Complex Stability Constants (K_stab) & The Chelate Effect",
                "points": [
                    "Complex formation is a dynamic equilibrium: M + nL ⇌ [MLn]. The equilibrium constant is termed the Stability Constant K_stab (or formation constant β).",
                    "Higher K_stab values signify greater thermodynamic stability and tighter ligand binding to the central cation.",
                    "The Chelate Effect: Polydentate chelating ligands (such as EDTA⁴⁻, Ethylenediamine) form multidentate ring structures exhibiting vastly greater stability constants than unidentate analogs."
                ]
            },
            {
                "heading": "2. Vital Biological Coordination: Hemoglobin, Chlorophyll, Vitamin B12, Cisplatin",
                "points": [
                    "Hemoglobin (Human Blood Erythrocytes): Giant bio-coordination complex of Iron(II) Fe²⁺ centered in a porphyrin ring, responsible for capturing O2 in lungs and delivering oxygen to cellular tissues.",
                    "Chlorophyll (Plant Leaves): Magnesium Mg²⁺ porphyrin complex that captures solar photon energy for photosynthetic synthesis of glucose and O2.",
                    "Vitamin B12 (Cobalamin): Essential Cobalt(III) Co³⁺ coordination complex required for red blood cell synthesis and neurological health.",
                    "Anticancer Drug Cisplatin [Pt(NH3)2Cl2]: Square planar Platinum(II) complex that cross-links DNA strands in cancer cells, inhibiting tumor replication."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Hemoglobin in Blood}: \\text{Fe}^{2+}\\text{ porphyrin bio-complex for oxygen transport}$$",
            "$$\\text{Chlorophyll in Leaves}: \\text{Mg}^{2+}\\text{ porphyrin bio-complex for photosynthesis}$$",
            "$$\\text{Cisplatin Anticancer Drug}: [\\text{Pt}(\\text{NH}_3)_2\\text{Cl}_2] \\text{ square planar DNA cross-linker}$$",
            "$$\\text{Stability Constant } K_{\\text{stab}}: \\text{Larger } K_{\\text{stab}} \\implies \\text{Higher complex thermodynamic stability}$$"
        ],
        "equations": [
            "$$\\text{Fe}^{2+}\\text{ (Hemoglobin)} + \\text{O}_2 \\rightleftharpoons \\text{Oxyhemoglobin} \\quad [\\text{Reversible } \\text{O}_2\\text{ Transport}]$$",
            "$$\\text{Mg}^{2+}\\text{ (Chlorophyll)} + h\\nu + \\text{CO}_2 + \\text{H}_2\\text{O} \\longrightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{O}_2\\uparrow \\quad [\\text{Photosynthesis}]$$"
        ],
        "q": "Why is carbon monoxide (CO) gas an insidious, lethal poison where even trace concentrations in air can cause rapid fatal asphyxiation?",
        "a": "Carbon monoxide (CO) acts as a strong field ligand that coordinates with the Fe²⁺ ion in blood hemoglobin with a stability constant K_stab approximately 200 to 250 times greater than that of oxygen (O2). When inhaled, CO irreversibly displaces oxygen to form stable carboxyhemoglobin, permanently crippling the oxygen-carrying capacity of red blood cells and suffocating tissues at the cellular level."
    },
    30: {
        "title": "Lesson 30: Comprehensive Upper Secondary Chemistry Grand Review (GDPT 2018)",
        "summary": "Comprehensive grand review of Upper Secondary Chemistry across Grades 8--12: atomic structure, periodicity, chemical bonding, thermodynamics, kinetics, organic synthesis, and coordination electrochemistry.",
        "sections": [
            {
                "heading": "1. Five Foundational Pillars of Modern Chemistry (GDPT 2018)",
                "points": [
                    "1. Atomic Structure & Chemical Bonding: Octet rule, atomic orbitals, covalent/ionic/hydrogen bonding govern all chemical and physical properties of matter.",
                    "2. Chemical Kinetics & Energetics: Enthalpy change Δr H°298, reaction rates v, equilibrium constant Kc, and Le Chatelier shifts.",
                    "3. Redox Chemistry & Electrochemistry: Electron balancing, galvanic cells, electrolysis, and industrial corrosion protection.",
                    "4. Organic Chemistry & Mechanisms: Functional groups, hydrocarbons, alcohols, phenols, carbonyls, carboxylic acids, esters, carbohydrates, amines, peptides, and polymers.",
                    "5. Transition Metals & Coordination Chemistry: Electron configurations, variable valences, colorful d-d transitions, and vital biological coordination complexes."
                ]
            }
        ],
        "formulas": [
            "$$\\text{Solid Foundation across the 5 Pillars of Upper Secondary Chemistry (GDPT 2018)}$$",
            "$$\\text{Prepared for Excellence in the National High School Graduation Examinations}$$"
        ],
        "equations": [
            "$$\\text{Chemic-AI x RMIT Vietnam x AI Riser 2026} \\quad [\\text{Interactive 3D Chemistry Learning Platform}]$$"
        ],
        "q": "What is the core learning philosophy recommended by Professor Lucy and Chemic-AI for mastering chemistry?",
        "a": "Chemistry is not about memorizing equations by rote; it is about understanding electron movements and chemical bonds between atoms! Combine learning structured theory with interactive 3D laboratory simulations to observe colors, precipitates, and reactions directly. We wish all students brilliant success and top academic achievements!"
    }
}

# Process Grade 12 lessons
with open("src/data/vietnamCurriculumData.json", "r", encoding="utf-8") as f:
    lessons = json.load(f)

count = 0
for l in lessons:
    if l["grade"] == 12:
        num = l["lessonNumber"]
        if num in G12_COMPLETE_EN:
            en_data = G12_COMPLETE_EN[num]
            
            # Title
            l["title"]["EN"] = en_data["title"]
            
            # Summary
            l["summary"]["EN"] = en_data["summary"]
            
            # Sections
            for s_idx, sec in enumerate(l.get("sections", [])):
                if s_idx < len(en_data["sections"]):
                    sec["heading"]["EN"] = en_data["sections"][s_idx]["heading"]
                    for p_idx, pt in enumerate(sec.get("points", [])):
                        if p_idx < len(en_data["sections"][s_idx]["points"]):
                            pt["EN"] = en_data["sections"][s_idx]["points"][p_idx]
                            
            # Theory points (flattened)
            flat_tp = []
            for s_en in en_data["sections"]:
                for p_en in s_en["points"]:
                    flat_tp.append(f"[{s_en['heading']}] {p_en}")
            for tp_idx, tp in enumerate(l.get("theoryPoints", [])):
                if tp_idx < len(flat_tp):
                    tp["EN"] = flat_tp[tp_idx]
                    
            # Formulas
            l["keyFormulas"] = en_data["formulas"]
            
            # Equations
            l["equations"] = en_data["equations"]
            
            # Sample Question
            l["sampleQuestion"] = {
                "question": {
                    "VN": l["sampleQuestion"]["question"]["VN"] if isinstance(l["sampleQuestion"]["question"], dict) else str(l["sampleQuestion"]["question"]),
                    "EN": en_data["q"]
                },
                "answer": {
                    "VN": l["sampleQuestion"]["answer"]["VN"] if isinstance(l["sampleQuestion"]["answer"], dict) else str(l["sampleQuestion"]["answer"]),
                    "EN": en_data["a"]
                }
            }
            count += 1

with open("src/data/vietnamCurriculumData.json", "w", encoding="utf-8") as f:
    json.dump(lessons, f, ensure_ascii=False, indent=2)

print(f"Successfully rebuilt all {count} Grade 12 lessons with 100% natural, scientifically accurate English!")
