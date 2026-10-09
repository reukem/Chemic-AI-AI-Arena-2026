import React from 'react';
import { motion } from 'framer-motion';

interface GlassCrackOverlayProps {
  isVi?: boolean;
}

export const GlassCrackOverlay: React.FC<GlassCrackOverlayProps> = ({ isVi = false }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[80] overflow-hidden select-none animate-crack-shimmer">
      {/* SVG Fracture System */}
      <svg 
        className="w-full h-full absolute inset-0"
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glass Specular Filter */}
          <filter id="glassGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Frosted Impact Crater Radial Gradient */}
          <radialGradient id="impactCrater" cx="76%" cy="47%" r="14%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="15%" stopColor="#a5f3fc" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.18" />
            <stop offset="85%" stopColor="#0891b2" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
          </radialGradient>

          {/* Prismatic Shard Fill Gradients */}
          <linearGradient id="shardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.22)" />
            <stop offset="50%" stopColor="rgba(34, 211, 238, 0.12)" />
            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.05)" />
          </linearGradient>

          <linearGradient id="shardGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.28)" />
            <stop offset="60%" stopColor="rgba(56, 189, 248, 0.1)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.06)" />
          </linearGradient>
        </defs>

        {/* Central Impact Glow Area */}
        <circle cx="1460" cy="508" r="160" fill="url(#impactCrater)" />

        {/* Glass Shard Polygons (Refraction Facets) */}
        <polygon points="1460,508 1380,440 1410,380 1460,508" fill="url(#shardGrad1)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <polygon points="1460,508 1490,410 1560,430 1460,508" fill="url(#shardGrad2)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <polygon points="1460,508 1550,530 1510,580 1460,508" fill="url(#shardGrad1)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <polygon points="1460,508 1390,570 1350,520 1460,508" fill="url(#shardGrad2)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        <polygon points="1460,508 1420,470 1450,440" fill="rgba(255,255,255,0.35)" />
        <polygon points="1460,508 1490,480 1480,530" fill="rgba(34,211,238,0.25)" />

        {/* Outer Shatter Polygons */}
        <polygon points="1460,508 1260,320 1340,240 1460,340" fill="rgba(255,255,255,0.06)" stroke="rgba(34,211,238,0.25)" strokeWidth="0.6" />
        <polygon points="1460,508 1620,310 1710,360 1580,450" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
        <polygon points="1460,508 1680,620 1590,710 1490,600" fill="rgba(34,211,238,0.05)" stroke="rgba(34,211,238,0.2)" strokeWidth="0.6" />
        <polygon points="1460,508 1320,680 1210,610 1360,550" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />

        {/* Concentric Spiderweb Stress Rings (Jagged Polygons) */}
        {/* Ring 1 - Inner (r ~ 35px) */}
        <polygon 
          points="1460,475 1485,488 1492,515 1475,540 1445,538 1432,512 1440,485" 
          fill="none" 
          stroke="rgba(255,255,255,0.9)" 
          strokeWidth="2.2" 
          filter="url(#glassGlow)"
        />
        {/* Ring 2 - Mid Inner (r ~ 80px) */}
        <polygon 
          points="1460,428 1520,455 1540,510 1515,570 1450,585 1395,550 1385,480 1415,445" 
          fill="none" 
          stroke="rgba(255,255,255,0.8)" 
          strokeWidth="1.6" 
        />
        {/* Ring 3 - Middle (r ~ 160px) */}
        <polygon 
          points="1460,348 1570,390 1620,490 1575,610 1470,660 1340,620 1305,500 1360,410" 
          fill="none" 
          stroke="rgba(34,211,238,0.7)" 
          strokeWidth="1.4" 
        />
        {/* Ring 4 - Outer (r ~ 290px) */}
        <polygon 
          points="1460,218 1650,280 1740,480 1680,690 1480,780 1260,710 1190,490 1280,330" 
          fill="none" 
          stroke="rgba(255,255,255,0.55)" 
          strokeWidth="1.2" 
        />
        {/* Ring 5 - Massive Outer (r ~ 480px) */}
        <polygon 
          points="1460,30 1780,140 1910,480 1820,840 1510,980 1120,890 980,510 1140,220" 
          fill="none" 
          stroke="rgba(34,211,238,0.4)" 
          strokeWidth="1.0" 
        />

        {/* Primary Radial Crack Rays (Spanning from (1460, 508) across whole canvas) */}
        
        {/* Ray 1: Top-Left to Origin (0, 0) */}
        <polyline 
          points="1460,508 1360,430 1240,370 1080,310 880,240 650,170 380,90 120,30 0,0" 
          fill="none" 
          stroke="rgba(255,255,255,0.95)" 
          strokeWidth="2.8" 
          filter="url(#glassGlow)" 
        />
        <polyline points="1080,310 1010,240 920,200 780,120 590,40 450,0" fill="none" stroke="rgba(34,211,238,0.7)" strokeWidth="1.5" />
        <polyline points="650,170 610,110 520,70 380,0" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />

        {/* Ray 2: Left Direct (Through Center UI) */}
        <polyline 
          points="1460,508 1320,515 1160,495 980,520 790,485 580,510 390,475 180,500 0,480" 
          fill="none" 
          stroke="rgba(255,255,255,0.9)" 
          strokeWidth="2.6" 
          filter="url(#glassGlow)" 
        />
        <polyline points="980,520 920,580 840,620 710,670 540,730 310,790 0,840" fill="none" stroke="rgba(34,211,238,0.7)" strokeWidth="1.6" />
        <polyline points="790,485 730,420 640,380 490,320 280,270 0,220" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" />

        {/* Ray 3: Top Direct (To top bar) */}
        <polyline 
          points="1460,508 1445,380 1480,260 1450,140 1470,0" 
          fill="none" 
          stroke="rgba(255,255,255,0.9)" 
          strokeWidth="2.2" 
          filter="url(#glassGlow)" 
        />
        <polyline points="1480,260 1560,190 1620,110 1680,0" fill="none" stroke="rgba(34,211,238,0.65)" strokeWidth="1.3" />
        <polyline points="1445,380 1370,300 1290,190 1220,0" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />

        {/* Ray 4: Top-Right (Towards settings button) */}
        <polyline 
          points="1460,508 1580,410 1710,310 1820,190 1920,100" 
          fill="none" 
          stroke="rgba(255,255,255,0.9)" 
          strokeWidth="2.4" 
          filter="url(#glassGlow)" 
        />
        <polyline points="1710,310 1790,360 1860,390 1920,410" fill="none" stroke="rgba(34,211,238,0.7)" strokeWidth="1.4" />

        {/* Ray 5: Bottom-Right */}
        <polyline 
          points="1460,508 1560,620 1670,740 1790,870 1920,980" 
          fill="none" 
          stroke="rgba(255,255,255,0.9)" 
          strokeWidth="2.4" 
          filter="url(#glassGlow)" 
        />
        <polyline points="1670,740 1740,810 1830,890 1920,950" fill="none" stroke="rgba(34,211,238,0.6)" strokeWidth="1.3" />

        {/* Ray 6: Bottom Direct */}
        <polyline 
          points="1460,508 1430,640 1470,780 1440,920 1460,1080" 
          fill="none" 
          stroke="rgba(255,255,255,0.9)" 
          strokeWidth="2.2" 
          filter="url(#glassGlow)" 
        />
        <polyline points="1470,780 1530,870 1590,970 1640,1080" fill="none" stroke="rgba(34,211,238,0.65)" strokeWidth="1.3" />

        {/* Ray 7: Bottom-Left (To language switch & bottom UI) */}
        <polyline 
          points="1460,508 1350,610 1210,710 1040,820 830,920 590,1010 380,1080" 
          fill="none" 
          stroke="rgba(255,255,255,0.9)" 
          strokeWidth="2.5" 
          filter="url(#glassGlow)" 
        />
        <polyline points="1210,710 1140,810 1020,910 880,1010 760,1080" fill="none" stroke="rgba(34,211,238,0.7)" strokeWidth="1.5" />
        <polyline points="1040,820 950,910 820,990 700,1080" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />

        {/* Micro Splinter Fractures around Point of Impact (Dense Shatter) */}
        <polyline points="1460,508 1450,490 1435,495 1425,480" fill="none" stroke="#ffffff" strokeWidth="2.5" />
        <polyline points="1460,508 1475,495 1490,485 1505,492" fill="none" stroke="#ffffff" strokeWidth="2.5" />
        <polyline points="1460,508 1470,525 1485,530 1495,548" fill="none" stroke="#ffffff" strokeWidth="2.5" />
        <polyline points="1460,508 1448,522 1440,538 1425,545" fill="none" stroke="#ffffff" strokeWidth="2.5" />
        <polyline points="1460,508 1455,475 1440,460 1448,445" fill="none" stroke="#ffffff" strokeWidth="2.2" />
        <polyline points="1460,508 1480,470 1498,460 1515,445" fill="none" stroke="#ffffff" strokeWidth="2.2" />
        <polyline points="1460,508 1495,510 1520,515 1540,508" fill="none" stroke="#ffffff" strokeWidth="2.2" />
        <polyline points="1460,508 1425,510 1400,505 1375,512" fill="none" stroke="#ffffff" strokeWidth="2.2" />

        {/* White Prismatic Nucleus (Exact Fist Strike Center) */}
        <circle cx="1460" cy="508" r="14" fill="#ffffff" filter="url(#glassGlow)" />
        <circle cx="1460" cy="508" r="7" fill="#a5f3fc" />
        <circle cx="1460" cy="508" r="3" fill="#ffffff" />

        {/* Sparkling Micro-Glass Shards / Splinters */}
        <circle cx="1435" cy="485" r="2.2" fill="#ffffff" />
        <circle cx="1485" cy="490" r="2.5" fill="#a5f3fc" />
        <circle cx="1475" cy="535" r="2.0" fill="#ffffff" />
        <circle cx="1430" cy="530" r="1.8" fill="#ffffff" />
        <circle cx="1395" cy="460" r="2.2" fill="#a5f3fc" />
        <circle cx="1525" cy="450" r="2.4" fill="#ffffff" />
        <circle cx="1545" cy="550" r="2.0" fill="#a5f3fc" />
        <circle cx="1370" cy="545" r="2.2" fill="#ffffff" />
        <circle cx="1310" cy="480" r="2.5" fill="#ffffff" />
        <circle cx="1600" cy="470" r="2.0" fill="#a5f3fc" />
        <circle cx="1450" cy="360" r="2.4" fill="#ffffff" />
        <circle cx="1470" cy="650" r="2.2" fill="#ffffff" />
        <circle cx="1180" cy="490" r="3.0" fill="#a5f3fc" />
        <circle cx="950" cy="510" r="2.8" fill="#ffffff" />
        <circle cx="680" cy="495" r="2.2" fill="#a5f3fc" />
      </svg>

      {/* Cyberpunk Screen Damage Telemetry Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 z-[95] flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-rose-950/90 border border-rose-500/70 backdrop-blur-2xl shadow-[0_0_25px_rgba(244,63,94,0.45)] text-rose-200 font-mono text-[10px] sm:text-xs tracking-wider uppercase pointer-events-none whitespace-nowrap select-none"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
        </span>
        <span className="font-semibold tracking-wider">
          {isVi 
            ? '⚠ CẢNH BÁO PHẦN CỨNG: MÀN HÌNH BỊ NỨT DO CÚ ĐẤM CỦA GS. LUCY' 
            : '⚠ HARDWARE WARNING: SCREEN FRACTURED BY PROF. LUCY\'S QUANTUM FIST'}
        </span>
      </motion.div>
    </div>
  );
};
