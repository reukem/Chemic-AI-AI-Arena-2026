import React from 'react';

// 1. Add the Shell Calculator Helper:
const getShells = (totalZ: number) => {
  let e = totalZ; const shells = []; const maxShells = [2, 8, 18, 32, 32, 18, 8];
  for (let max of maxShells) { if (e <= 0) break; shells.push(Math.min(e, max)); e -= max; }
  return shells;
};

interface VisualizerProps {
  selectedElement: {
    atomicNumber?: number;
    number?: number;
    color?: string;
    name?: string;
  };
}

// 2. The Ultra-Performant SVG Bohr Model:
export const PeriodicTableBohrModel: React.FC<VisualizerProps> = ({ selectedElement }) => {
  return (
    <div className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center overflow-visible p-4 flex-1">
      {selectedElement.name && (
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 break-words whitespace-normal leading-tight hidden">
          {selectedElement.name}
        </h1>
      )}
      <svg viewBox="-500 -500 1000 1000" className="w-full h-full max-w-full max-h-full overflow-visible pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        {/* Perfectly Centered Nucleus with zero-cost fake glow */}
        <circle cx="0" cy="0" r="40" fill={selectedElement.color || '#38bdf8'} />
        <circle cx="0" cy="0" r="90" fill={selectedElement.color || '#38bdf8'} opacity="0.15" />
        
        {(() => {
          const shells = getShells(selectedElement.atomicNumber || selectedElement.number || 1);
          const baseRadius = 180; // Inner shell starts here
          const maxRadius = 480;  // Outer shell ends perfectly at the edge of the 500px radius viewBox
          const spacing = shells.length > 1 ? (maxRadius - baseRadius) / (shells.length - 1) : 0;

          return shells.map((electronCount, i) => {
            // Rings dynamically scale to fill the entire box!
            const radius = shells.length === 1 ? 300 : baseRadius + (i * spacing);
            const duration = 20 + (i * 5); // Smooth majestic rotation
            const direction = i % 2 === 0 ? 'normal' : 'reverse';
            
            return (
              <g key={i}>
                {/* Bright, Thick Orbit Rings */}
                <circle cx="0" cy="0" r={radius} fill="none" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="3" />
                
                <g style={{ animation: `spinBohr ${duration}s linear infinite ${direction}`, transformOrigin: '0px 0px', willChange: 'transform' }}>
                  {Array.from({ length: electronCount }).map((_, eIdx) => {
                    const angle = (eIdx / electronCount) * Math.PI * 2;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                      <g key={eIdx}>
                         {/* Giant Electrons */}
                         <circle cx={x} cy={y} r="14" fill="#ffffff" opacity="0.6" />
                         <circle cx={x} cy={y} r="6" fill="#ffffff" />
                      </g>
                    );
                  })}
                </g>
              </g>
            )
          });
        })()}
      </svg>
      {/* Inject native keyframes to bypass React/Framer entirely */}
      <style>{`@keyframes spinBohr { 100% { transform: rotate(360deg) translateZ(0); } }`}</style>
    </div>
  );
};
