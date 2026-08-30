import React, { useEffect, useRef, useState } from 'react';
import { useSimulationStore } from './store';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';
import { evaluateThermodynamicState } from './ThermodynamicEngine';

interface LabContainerProps {
    id: number;
    isDragging?: boolean;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    draggingContainerId?: number | null;
}

const LabContainer: React.FC<LabContainerProps> = ({ id, isDragging, onDragStart, onDragEnd, draggingContainerId }) => {
    const container = useSimulationStore(state => state.containers.find(b => b.id === id));
    const addReagentToContainer = useSimulationStore(state => state.addReagentToContainer);
    const pourContainer = useSimulationStore(state => state.pourContainer);
    const activeEffect = useSimulationStore(state => state.activeEffect);
    const activeEffectContainerId = useSimulationStore(state => state.activeEffectContainerId);
    const env = useSimulationStore(state => state.env);
    const language = useSimulationStore(state => state.language);
    const isVi = String(language).toLowerCase().includes('v');

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<any[]>([]);
    const animationRef = useRef<number>();
    const containerRef = useRef<HTMLDivElement>(null);
    const pourIntervalRef = useRef<any>(null);

    const [isSnapping, setIsSnapping] = useState(false);

    // Compute live thermodynamic state for this container
    const thermoState = container ? evaluateThermodynamicState(container, env) : null;

    // Drag and Drop Logic for chemical reagents
    const handleDragOver = (e: React.DragEvent) => {
        if (e.dataTransfer.types.includes('containerid')) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'none'; // We don't "drop" containers into containers, we pour on hover
            return;
        }

        const reagentType = Array.from(e.dataTransfer.types).find(t => t.startsWith('reagent-'));
        if (reagentType) {
            const chemId = reagentType.replace('reagent-', '');
            const chemical = CHEMICAL_REGISTRY[chemId];
            if (chemical?.type === 'solid' && container?.type === 'flask') {
                e.dataTransfer.dropEffect = 'none';
                return;
            }
        }

        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        const reagentId = e.dataTransfer.getData('text/plain');
        if (reagentId) {
            const chemical = CHEMICAL_REGISTRY[reagentId];
            if (chemical?.type === 'solid' && container?.type === 'flask') {
                return;
            }
            addReagentToContainer(id, reagentId);
        }
    };

    const updateContainerPosition = useSimulationStore(state => state.updateContainerPosition);

    // Custom Pointer Drag Initiation
    const handlePointerDown = (e: React.PointerEvent) => {
        const state = useSimulationStore.getState();
        if (state.isPaused || state.pendingReaction) return;

        e.preventDefault();
        setIsSnapping(false);
        if (onDragStart) onDragStart();
    };

    // Pouring logic with Frozen state protection
    const handlePourMouseDown = (e: React.MouseEvent) => {
        const state = useSimulationStore.getState();
        if (state.isPaused || state.pendingReaction) return;

        if (draggingContainerId !== null && draggingContainerId !== id) {
            const sourceContainer = state.containers.find(c => c.id === draggingContainerId);
            if (sourceContainer) {
                const sourceThermo = evaluateThermodynamicState(sourceContainer, state.env);
                if (sourceThermo.isFrozen) {
                    console.warn("Substance is frozen solid! Cannot pour.");
                    return;
                }
            }

            if (pourIntervalRef.current) clearInterval(pourIntervalRef.current);
            pourIntervalRef.current = setInterval(() => {
                pourContainer(draggingContainerId, id, 500 - Math.min(e.clientY, 500));
            }, 100);
        }
    };

    const handlePourMouseUp = () => {
        if (pourIntervalRef.current) {
            clearInterval(pourIntervalRef.current);
            pourIntervalRef.current = null;
        }
    };

    // Strict Tabletop Dragging & Clamping Logic
    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (isDragging && containerRef.current) {
                const tableY = Math.max(250, window.innerHeight - 220);
                const x = Math.max(70, Math.min(window.innerWidth - 180, e.clientX - 70));
                
                // Strictly constrain Y to the tabletop: allow only a subtle tactile 30px lift during pick-up
                const clampedY = Math.max(tableY - 30, Math.min(tableY, e.clientY - 100));
                
                containerRef.current.style.left = `${x}px`;
                containerRef.current.style.top = `${clampedY}px`;
            }
        };

        const handlePointerUp = (e: PointerEvent) => {
            if (!isDragging) return;
            
            const tableY = Math.max(250, window.innerHeight - 220);
            const rawX = e.clientX - 70;
            const finalX = Math.max(70, Math.min(window.innerWidth - 180, rawX));
            const finalY = tableY; // Strictly settle directly onto table surface!
            
            setIsSnapping(true);
            if (containerRef.current) {
                containerRef.current.style.transition = 'left 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
                containerRef.current.style.left = `${finalX}px`;
                containerRef.current.style.top = `${finalY}px`;
            }

            setTimeout(() => {
                setIsSnapping(false);
                if (containerRef.current) {
                    containerRef.current.style.transition = '';
                }
                updateContainerPosition(id, finalX, finalY);
                if (onDragEnd) onDragEnd();
            }, 200);
        };

        if (isDragging) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        }

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isDragging, id, onDragEnd, updateContainerPosition]);

    // Active Reaction Particle Effects
    useEffect(() => {
        if (activeEffectContainerId === id && activeEffect) {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const r = container?.color.r || 255;
            const g = container?.color.g || 255;
            const b = container?.color.b || 255;

            let numParticles = 15;
            if (activeEffect === 'explosion') {
                numParticles = 45;
            } else if (activeEffect === 'fizz') {
                numParticles = 40;
            } else if (activeEffect === 'bubbles') {
                numParticles = 25;
            }

            for (let i = 0; i < numParticles; i++) {
                const isExp = activeEffect === 'explosion';
                let color = isExp 
                    ? `rgba(255, ${200 + Math.random() * 55}, ${100 + Math.random() * 155}, ${0.75 + Math.random() * 0.25})`
                    : `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)}, ${0.5 + Math.random() * 0.5})`;
                let vx = (Math.random() - 0.5) * (isExp ? 3.5 : 2);
                let vy = -(isExp ? (3.5 + Math.random() * 4.5) : (1 + Math.random() * 3));
                let radius = isExp ? (1.8 + Math.random() * 3.5) : (1 + Math.random() * 3);
                let decay = isExp ? (0.018 + Math.random() * 0.02) : (0.01 + Math.random() * 0.02);

                particlesRef.current.push({
                    x: Math.random() * canvas.width, 
                    y: canvas.height - ((container?.volume || 0) / (container?.maxVol || 100)) * canvas.height, 
                    vy,
                    vx,
                    radius,
                    color,
                    life: 1.0,
                    decay,
                    isExplosion: isExp
                });
            }
        }
    }, [activeEffect, activeEffectContainerId, id, container?.color, container?.volume, container?.maxVol]);

    // Particle Animation & Thermodynamic Boiling Simulation Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            if (canvas.parentElement) {
                const rect = canvas.parentElement.getBoundingClientRect();
                const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
                if (canvas.width !== Math.floor((rect.width - 6) * dpr) || canvas.height !== Math.floor((rect.height - 6) * dpr)) {
                    canvas.width = Math.floor((rect.width - 6) * dpr);
                    canvas.height = Math.floor((rect.height - 6) * dpr);
                    ctx.scale(dpr, dpr);
                }
            }
        };
        resize();
        window.addEventListener('resize', resize);

        let isDirty = true;
        const animate = () => {
            if (useSimulationStore.getState().activeTab !== 'lab') {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }
            const isPaused = useSimulationStore.getState().isPaused;
            const isEffervescing = !isPaused && (activeEffectContainerId === id) && (activeEffect === 'fizz' || activeEffect === 'bubbles' || activeEffect === 'smoke');
            const needsBoiling = !isPaused && thermoState && (thermoState.isBoiling || thermoState.isSimmering) && container && container.volume > 0;
            const hasParticles = particlesRef.current.length > 0;

            // Idle Canvas Skipping: Zero CPU/GPU usage when container is resting
            if (!needsBoiling && !isEffervescing && !hasParticles) {
                if (isDirty) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    isDirty = false;
                }
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            isDirty = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const canvasLogicalW = canvas.width / (window.devicePixelRatio || 1);
            const canvasLogicalH = canvas.height / (window.devicePixelRatio || 1);
            const liquidHeightPx = (container.volume / container.maxVol) * canvasLogicalH;
            const liquidTopY = canvasLogicalH - liquidHeightPx;

            // Continuous Effervescent Reaction Frothing & Micro-bubble Eruption
            if (isEffervescing && container && container.volume > 0) {
                const spawnCount = activeEffect === 'fizz' ? 5 : 3;
                for (let k = 0; k < spawnCount; k++) {
                    const depthY = liquidTopY + Math.random() * (canvasLogicalH - liquidTopY - 4);
                    const spawnX = 14 + Math.random() * (canvasLogicalW - 28);
                    particlesRef.current.push({
                        x: spawnX,
                        y: depthY,
                        vx: (Math.random() - 0.5) * 1.5,
                        vy: -(2.5 + Math.random() * 4.0),
                        radius: 0.8 + Math.random() * 2.2,
                        color: 'rgba(255, 255, 255, 0.85)',
                        life: 1.0,
                        decay: 0.02,
                        isBoilingBubble: true,
                        surfaceY: liquidTopY
                    });
                }

                // Fine Vapor Mist / Gas Plumes rising out of beaker mouth
                if (Math.random() < 0.45) {
                    particlesRef.current.push({
                        x: canvasLogicalW * 0.5 + (Math.random() - 0.5) * 24,
                        y: liquidTopY - 4,
                        vx: (Math.random() - 0.5) * 1.2,
                        vy: -(1.5 + Math.random() * 2.5),
                        radius: 3 + Math.random() * 5.5,
                        color: 'rgba(240, 248, 255, 0.4)',
                        life: 1.0,
                        decay: 0.025,
                        isSteam: true
                    });
                }
            }

            // Thermodynamic Nucleation: Generate internal boiling bubbles
            if (needsBoiling) {
                const spawnProbability = thermoState.isBoiling ? 0.65 : 0.2;
                if (Math.random() < spawnProbability) {
                    const spawnX = 14 + Math.random() * (canvasLogicalW - 28);
                    particlesRef.current.push({
                        x: spawnX,
                        y: canvasLogicalH - 6,
                        vx: (Math.random() - 0.5) * (thermoState.isBoiling ? 1.5 : 0.6),
                        vy: -(thermoState.isBoiling ? (3.0 + Math.random() * 3.5) : (1.4 + Math.random() * 1.5)),
                        radius: thermoState.isBoiling ? (1.5 + Math.random() * 3.2) : (1 + Math.random() * 1.8),
                        color: 'rgba(255, 255, 255, 0.85)',
                        life: 1.0,
                        decay: 0.015,
                        isBoilingBubble: true,
                        surfaceY: liquidTopY
                    });
                }
            }

            const particles = particlesRef.current;
            for (let i = particles.length - 1; i >= 0; i--) {
                let p = particles[i];
                
                if (!isPaused) {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= p.decay;

                    if (p.isBoilingBubble) {
                        p.x += Math.sin(p.y * 0.2) * 0.5;
                        // Pop at surface and eject aerosol froth droplets!
                        if (p.y <= p.surfaceY) {
                            p.life = 0;
                            if (Math.random() < 0.4) {
                                particles.push({
                                    x: p.x,
                                    y: p.surfaceY - 1,
                                    vx: (Math.random() - 0.5) * 1.8,
                                    vy: -(1.2 + Math.random() * 2.2),
                                    radius: 0.6 + Math.random() * 1.0,
                                    color: 'rgba(255, 255, 255, 0.75)',
                                    life: 0.6,
                                    decay: 0.05,
                                    isDroplet: true
                                });
                            }
                        }
                    } else if (p.isSteam) {
                        p.x += Math.sin(p.y * 0.1) * 0.8;
                        p.radius += 0.12; // Expanding vapor
                    } else if (!p.isExplosion) {
                        p.x += Math.sin(p.y * 0.1) * 0.5;
                    }
                }

                if (p.life > 0 && p.radius > 0.5) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life;
                    ctx.fill();
                    ctx.globalAlpha = 1.0;
                } else if (!isPaused) {
                    particles.splice(i, 1);
                }
            }
            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [thermoState, container?.volume, container?.maxVol]);

    if (!container) return null;

    const heightPct = (container.volume / container.maxVol) * 90;
    const rgbaColor = `rgba(${container.color.r}, ${container.color.g}, ${container.color.b}, 0.8)`;
    const rgbColor = `rgb(${container.color.r}, ${container.color.g}, ${container.color.b})`;

    const label = id === 0 ? 'Alpha' : id === 1 ? 'Beta' : id === 2 ? 'Gamma' : 'Delta';
    const isFlask = container.type === 'flask';

    const currentX = container.x;
    const currentY = container.y;

    const isExploding = activeEffect === 'explosion' && activeEffectContainerId === id;

    return (
        <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerCancel={() => {
               if (isDragging && onDragEnd) onDragEnd();
            }}
            onMouseDown={handlePourMouseDown}
            onMouseUp={handlePourMouseUp}
            onMouseLeave={handlePourMouseUp}
            className={`pointer-events-auto container-wrapper ${isFlask ? 'flask-wrapper' : 'beaker-wrapper'} ${isDragging ? 'opacity-90 scale-105' : ''} ${!isDragging && !isSnapping ? 'hover:-translate-y-2' : ''} ${isExploding ? 'animate-pulse drop-shadow-[0_0_30px_rgba(245,158,11,0.85)]' : ''}`}
            style={{
                position: 'absolute',
                left: `${currentX}px`,
                top: `${currentY}px`,
                zIndex: isDragging ? 50 : 30,
                transition: (isDragging && !isSnapping) ? 'none' : 'left 0.25s ease-out, top 0.25s ease-out, transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                touchAction: 'none'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Reaction Thermal Overheat Aura */}
            {isExploding && (
                <div className="absolute -inset-2 bg-gradient-to-t from-amber-500/30 via-yellow-400/20 to-transparent rounded-3xl animate-ping pointer-events-none blur-md" />
            )}
            {/* Tabletop Cast Shadow Underneath Vessel */}
            <div 
                className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black/60 rounded-full blur-[3px] pointer-events-none transition-all duration-200"
                style={{
                    transform: `translateX(-50%) scale(${isDragging ? 0.85 : 1})`,
                    opacity: isDragging ? 0.35 : 0.75
                }}
            />

            {/* Billowing Steam & Vapor Emitter Plume */}
            {thermoState && (thermoState.isBoiling || thermoState.isSimmering) && container.volume > 0 && (
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-28 h-24 pointer-events-none overflow-visible flex items-end justify-center z-40">
                    <div 
                        className="w-14 h-16 rounded-full blur-lg mix-blend-screen"
                        style={{ 
                            background: `radial-gradient(ellipse at bottom, ${thermoState.steamColor} 0%, transparent 70%)`,
                            animation: 'steamRise 1.8s infinite ease-out'
                        }} 
                    />
                    <div 
                        className="w-20 h-20 rounded-full blur-xl mix-blend-screen absolute -top-4"
                        style={{ 
                            background: `radial-gradient(circle, ${thermoState.steamColor} 0%, transparent 65%)`,
                            animation: 'steamRise 2.4s infinite ease-out 0.4s'
                        }} 
                    />
                </div>
            )}

            {/* Thermodynamic Boiling Badge */}
            {thermoState && thermoState.isBoiling && container.volume > 0 && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-mono font-black text-rose-300 bg-rose-950/90 border border-rose-500/70 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-[0_0_12px_rgba(244,63,94,0.5)] whitespace-nowrap z-50 flex items-center gap-1 animate-bounce">
                    <span>♨️</span>
                    <span>{isVi ? 'ĐANG SÔI' : 'BOILING'} ({thermoState.effectiveBoilingPoint}°C)</span>
                </div>
            )}

            <div className="container-info font-mono text-center">
                <div className="font-bold text-cyan-300">{isFlask ? 'Flask' : 'Beaker'} {label}</div>
                <div>Vol: {container.volume} ml</div>
                <div>pH: {container.ph.toFixed(1)}</div>
            </div>

            {!isFlask ? (
                <>
                    <div className="container-glass beaker-glass"></div>
                    <div className="grad-container">
                        <div className="grad-mark" style={{ bottom: '90%' }}>
                            <span className="grad-num">100</span>
                            <div className="grad-tick"></div>
                        </div>
                        <div className="grad-mark" style={{ bottom: '72%' }}>
                            <span className="grad-num">80</span>
                            <div className="grad-tick"></div>
                        </div>
                        <div className="grad-mark" style={{ bottom: '54%' }}>
                            <span className="grad-num">60</span>
                            <div className="grad-tick"></div>
                        </div>
                        <div className="grad-mark" style={{ bottom: '36%' }}>
                            <span className="grad-num">40</span>
                            <div className="grad-tick"></div>
                        </div>
                        <div className="grad-mark" style={{ bottom: '18%' }}>
                            <span className="grad-num">20</span>
                            <div className="grad-tick"></div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <svg className="flask-glass" viewBox="0 0 160 220" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}>
                        <defs>
                        <linearGradient id="flask-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="15%" stopColor="rgba(255,255,255,0.02)" />
                            <stop offset="85%" stopColor="rgba(255,255,255,0.02)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                        </linearGradient>
                        <pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
                            <rect width="4" height="2" fill="rgba(255,255,255,0.05)" />
                        </pattern>
                        </defs>
                        <path d="M 56 0 L 104 0 L 104 66 L 156 196 Q 160 206 150 214 Q 140 220 130 220 L 30 220 Q 20 220 10 214 Q 0 206 4 196 L 56 66 Z"
                            fill="url(#flask-grad)"
                            stroke="rgba(255,255,255,0.5)"
                            strokeWidth="2"
                            strokeLinejoin="round" />
                        <path d="M 56 0 L 104 0 L 104 66 L 156 196 Q 160 206 150 214 Q 140 220 130 220 L 30 220 Q 20 220 10 214 Q 0 206 4 196 L 56 66 Z"
                            fill="url(#scanlines)"
                            pointerEvents="none" />
                        <path d="M 62 2 L 62 66 L 16 181 Q 12 191 22 199"
                            fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4"
                            filter="blur(1px)" />
                        <rect x="52" y="0" width="56" height="6" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                    </svg>
                    <div className="grad-container">
                        <div className="grad-mark" style={{ bottom: '86%' }}>
                            <span className="grad-num">100</span>
                            <div className="grad-tick" style={{ width: '18px' }}></div>
                        </div>
                        <div className="grad-mark" style={{ bottom: '68%' }}>
                            <span className="grad-num">80</span>
                            <div className="grad-tick" style={{ width: '22px' }}></div>
                        </div>
                        <div className="grad-mark" style={{ bottom: '50%' }}>
                            <span className="grad-num">60</span>
                            <div className="grad-tick" style={{ width: '28px' }}></div>
                        </div>
                        <div className="grad-mark" style={{ bottom: '34%' }}>
                            <span className="grad-num">40</span>
                            <div className="grad-tick" style={{ width: '34px' }}></div>
                        </div>
                        <div className="grad-mark" style={{ bottom: '18%' }}>
                            <span className="grad-num">20</span>
                            <div className="grad-tick" style={{ width: '40px' }}></div>
                        </div>
                    </div>
                </>
            )}

            {/* Frosted Ice Crystal Glass Overlay when Frozen */}
            {thermoState && thermoState.isFrozen && container.volume > 0 && (
                <div className="absolute inset-0 z-30 pointer-events-none rounded-2xl overflow-hidden border-2 border-cyan-300/50 bg-cyan-100/20 backdrop-blur-[2px] shadow-[inset_0_0_25px_rgba(186,230,253,0.5)] animate-[frostGlow_3s_ease-in-out_infinite]">
                    <div className="absolute top-2 right-2 text-cyan-200 text-xs animate-pulse">❄️</div>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-cyan-200 text-[9px] font-mono tracking-widest font-bold bg-cyan-950/85 px-2 py-0.5 rounded-full border border-cyan-400/50 shadow-md whitespace-nowrap">
                        ❄ {isVi ? 'ĐÔNG ĐẶC' : 'FROZEN SOLID'}
                    </div>
                </div>
            )}

            <div className={`liquid-clip-wrapper ${isFlask ? 'flask-clip' : 'beaker-clip'}`}>
                <div
                    className={`container-liquid`}
                    style={{ height: `${heightPct}%`, backgroundColor: rgbaColor }}
                >
                    {container.volume > 0 && !thermoState?.isFrozen && (
                        <svg className="wave-svg" style={{ fill: rgbColor }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 40" preserveAspectRatio="none">
                            <path d="M0,20 Q100,40 200,20 T400,20 T600,20 T800,20 L800,40 L0,40 Z"></path>
                        </svg>
                    )}
                </div>
            </div>

            <canvas ref={canvasRef} className={`reaction-canvas ${isFlask ? 'flask-canvas' : ''}`}></canvas>
        </div>
    );
};

export default LabContainer;