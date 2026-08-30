import React from 'react';

interface ParsedSubshell {
    label: string;
    type: string;
    boxes: number;
    orbitals: string[][]; 
}

const parseValenceConfiguration = (config: string): ParsedSubshell[] => {
    const terms = config.split(' ').filter(Boolean);
    let maxN = 0;
    
    const parsedTerms = terms.map(t => {
        const match = t.match(/^(\d+)([spdf])(\d+)$/);
        if (!match) return null;
        const n = parseInt(match[1], 10);
        if (n > maxN) maxN = n;
        return { label: match[1] + match[2], n, type: match[2], e: parseInt(match[3], 10) };
    }).filter(Boolean) as { label: string, n: number, type: string, e: number }[];

    const valenceTerms = parsedTerms.filter(t => {
        if (t.n === maxN) return true;
        if (t.n === maxN - 1 && t.type === 'd' && t.e < 10) return true;
        if (t.n === maxN - 2 && t.type === 'f' && t.e < 14) return true;
        return false;
    });

    const boxCounts: Record<string, number> = { s: 1, p: 3, d: 5, f: 7 };

    return valenceTerms.map(t => {
        const numBoxes = boxCounts[t.type] || 1;
        const orbitals: string[][] = Array.from({ length: numBoxes }, () => []);
        let remaining = t.e;

        // Hund's Rule: Fill up arrows first
        for (let i = 0; i < numBoxes && remaining > 0; i++) {
            orbitals[i].push('↑');
            remaining--;
        }
        // Then fill down arrows
        for (let i = 0; i < numBoxes && remaining > 0; i++) {
            orbitals[i].push('↓');
            remaining--;
        }

        return {
            label: t.label,
            type: t.type,
            boxes: numBoxes,
            orbitals
        };
    });
};

interface OrbitalBoxDiagramProps {
    configuration: string;
    color?: string;
}

const OrbitalBoxDiagram: React.FC<OrbitalBoxDiagramProps> = ({ configuration, color = '#00f3ff' }) => {
    const subshells = parseValenceConfiguration(configuration);

    return (
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-3 pt-3 border-t border-white/5">
            {subshells.map((sub, idx) => (
                <div key={idx} className="flex flex-col items-center">
                    <div className="flex gap-1.5">
                        {sub.orbitals.map((box, bIdx) => (
                            <div 
                                key={bIdx}
                                className="w-6 h-6 border border-slate-700 bg-slate-950 rounded flex items-center justify-center shadow-inner"
                            >
                                <span className="flex items-center text-xs font-bold tracking-tighter" style={{ color: color, textShadow: `0 0 5px ${color}` }}>
                                    {box.map((arrow, aIdx) => (
                                        <span key={aIdx} className={arrow === '↓' ? '-ml-0.5' : ''}>{arrow}</span>
                                    ))}
                                </span>
                            </div>
                        ))}
                    </div>
                    <span className="text-[9px] text-white/50 mt-1.5 font-mono uppercase tracking-widest">
                        {sub.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default OrbitalBoxDiagram;
