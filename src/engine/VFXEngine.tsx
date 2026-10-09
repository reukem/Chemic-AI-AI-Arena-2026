import React, { useEffect, useRef } from 'react';
import { useSimulationStore } from './store';
import { audioManager } from './AudioManager';

// Matter.js compatibility optimization block
const Engine = {
  create: (config: any) => ({
    timing: { timeScale: 1 },
    ...config
  })
};
const Events = {
  on: (eng: any, eventName: string, callback: () => void) => {}
};
const engine = Engine.create({
  enableSleeping: true,
  positionIterations: 4,
  velocityIterations: 4
});
Events.on(engine, 'beforeUpdate', () => {
  const activeTab = useSimulationStore.getState().activeTab;
  if (activeTab !== 'lab') {
    engine.timing.timeScale = 0; 
  } else {
    engine.timing.timeScale = 1; 
  }
});

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    type: 'spark' | 'smoke' | 'globule' | 'bubble' | 'crystal';
    chemicalType: 'sodium' | 'potassium' | 'acid_dilution' | 'alkali_acid' | 'generic';
    canBounce?: boolean;
    seed: number;
}

interface Shockwave {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    life: number;
    color: string;
    thickness: number;
}

interface ThermalFlash {
    x: number;
    y: number;
    intensity: number;
    color: string;
}

interface VFXSequence {
    id: number;
    x: number;
    y: number;
    type: 'sodium' | 'potassium' | 'acid_dilution' | 'alkali_acid' | 'generic';
    elapsed: number;
    phase: 0 | 1 | 2; // 0=init, 1=skittering molten bead, 2=coulomb blast
    seed: number;
    beadX: number;
    beadY: number;
}

const VFXEngine: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const sequencesRef = useRef<VFXSequence[]>([]);
    const shockwavesRef = useRef<Shockwave[]>([]);
    const thermalFlashRef = useRef<ThermalFlash | null>(null);
    const screenShakeRef = useRef<number>(0);
    const mousePosRef = useRef<{ x: number, y: number } | null>(null);
    
    const explosions = useSimulationStore(state => state.explosions);
    const removeExplosion = useSimulationStore(state => state.removeExplosion);

    // Audio context initialization on user gesture
    useEffect(() => {
        const initAudio = () => audioManager.init();
        window.addEventListener('click', initAudio, { once: true });
        return () => window.removeEventListener('click', initAudio);
    }, []);

    // Interactive mouse tracking & interactive pop click
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePosRef.current = { x: e.clientX, y: e.clientY };
        };

        const handlePointerDown = (e: MouseEvent) => {
            // Interactive blast pop if user clicks near an active reaction
            const seqs = sequencesRef.current;
            const clickDist = 180;
            let triggeredPop = false;

            for (const seq of seqs) {
                const dx = e.clientX - seq.beadX;
                const dy = e.clientY - seq.beadY;
                if (dx * dx + dy * dy < clickDist * clickDist) {
                    audioManager.playHydrogenPop();
                    screenShakeRef.current = Math.max(screenShakeRef.current, 0.4);
                    triggeredPop = true;

                    // Spawn extra interactive reactive micro-sparks
                    for (let j = 0; j < 35; j++) {
                        const ang = Math.random() * Math.PI * 2;
                        const spd = Math.random() * 16 + 5;
                        particlesRef.current.push({
                            x: seq.beadX,
                            y: seq.beadY,
                            vx: Math.cos(ang) * spd,
                            vy: Math.sin(ang) * spd - 6,
                            life: 0.8,
                            maxLife: 0.8,
                            size: Math.random() * 3.5 + 1.5,
                            type: 'spark',
                            chemicalType: seq.type,
                            canBounce: true,
                            seed: Math.random()
                        });
                    }
                    break;
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('pointerdown', handlePointerDown);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('pointerdown', handlePointerDown);
        };
    }, []);

    // Register incoming explosion events
    useEffect(() => {
        explosions.forEach(exp => {
            const rawType = String(exp.type || '').toLowerCase();
            let resolvedType: 'sodium' | 'potassium' | 'acid_dilution' | 'alkali_acid' | 'generic' = 'sodium';

            if (rawType.includes('potassium')) resolvedType = 'potassium';
            else if (rawType.includes('acid_dilution') || rawType.includes('acid_water')) resolvedType = 'acid_dilution';
            else if (rawType.includes('alkali_acid')) resolvedType = 'alkali_acid';
            else if (rawType.includes('sodium')) resolvedType = 'sodium';
            else resolvedType = 'generic';

            sequencesRef.current.push({
                id: exp.id,
                x: exp.x,
                y: exp.y,
                type: resolvedType,
                elapsed: 0,
                phase: 0,
                seed: Math.random() * 100,
                beadX: exp.x,
                beadY: exp.y
            });
            removeExplosion(exp.id);
        });
    }, [explosions, removeExplosion]);

    // Main VFX Render Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let lastTime = performance.now();
        let isDirty = true;

        const render = (time: number) => {
            if (useSimulationStore.getState().activeTab !== 'lab') {
                animationFrameId = requestAnimationFrame(render);
                return;
            }
            const deltaTime = Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;

            const isPaused = useSimulationStore.getState().isPaused;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

            if (canvas.width !== Math.floor(window.innerWidth * dpr) || canvas.height !== Math.floor(window.innerHeight * dpr)) {
                canvas.width = Math.floor(window.innerWidth * dpr);
                canvas.height = Math.floor(window.innerHeight * dpr);
                ctx.scale(dpr, dpr);
                isDirty = true;
            }

            const sequences = sequencesRef.current;
            const particles = particlesRef.current;
            const shockwaves = shockwavesRef.current;
            const flash = thermalFlashRef.current;
            const shake = screenShakeRef.current;

            // Idle check: skip clears when completely idle
            if (sequences.length === 0 && particles.length === 0 && shockwaves.length === 0 && !flash && shake <= 0.01) {
                if (isDirty) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const labViewport = document.getElementById('lab-canvas-viewport');
                    if (labViewport) labViewport.style.transform = '';
                    isDirty = false;
                }
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            isDirty = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Camera Screen Shake (GPU Transform without React re-render)
            const labViewport = document.getElementById('lab-canvas-viewport');
            if (labViewport) {
                if (screenShakeRef.current > 0.01 && !isPaused) {
                    const shakeAmt = screenShakeRef.current * 18;
                    const ox = (Math.random() - 0.5) * shakeAmt;
                    const oy = (Math.random() - 0.5) * shakeAmt;
                    labViewport.style.transform = `translate3d(${ox.toFixed(1)}px, ${oy.toFixed(1)}px, 0)`;
                    screenShakeRef.current *= 0.88;
                } else {
                    labViewport.style.transform = '';
                    screenShakeRef.current = 0;
                }
            }

            // 2. Full-Screen Thermal Flash
            if (thermalFlashRef.current) {
                const tf = thermalFlashRef.current;
                const grad = ctx.createRadialGradient(tf.x, tf.y, 10, tf.x, tf.y, Math.max(window.innerWidth, window.innerHeight) * 0.75);
                grad.addColorStop(0, tf.color);
                grad.addColorStop(0.35, tf.color.replace(/[\d\.]+\)$/, `${tf.intensity * 0.35})`));
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

                if (!isPaused) {
                    tf.intensity -= deltaTime * 3.0;
                    if (tf.intensity <= 0) thermalFlashRef.current = null;
                }
            }

            // Tabletop height for spark collision & bounce
            const tableY = Math.max(250, window.innerHeight - 170);

            // 3. Update & Draw Sequences (Skittering Molten Bead & Coulomb Blast)
            for (let i = sequences.length - 1; i >= 0; i--) {
                const seq = sequences[i];

                if (!isPaused) {
                    seq.elapsed += deltaTime;

                    // Phase 0 -> Phase 1: Ignition
                    if (seq.phase === 0) {
                        audioManager.playSizzle();
                        seq.phase = 1;
                    }

                    // Phase 1: Skittering & Fizzing Molten Bead (0.0s to 1.35s)
                    if (seq.phase === 1) {
                        const t = seq.elapsed;
                        // Organic high-frequency jitter & skitter across fluid surface
                        seq.beadX = seq.x + Math.sin(t * 18 + seq.seed) * 32 + Math.cos(t * 8) * 14;
                        seq.beadY = seq.y + Math.sin(t * 26) * 5 - 12;

                        // Emit jetting hydrogen bubbles & sizzling smoke
                        if (Math.random() > 0.3) {
                            particlesRef.current.push({
                                x: seq.beadX + (Math.random() - 0.5) * 8,
                                y: seq.beadY + (Math.random() - 0.5) * 6,
                                vx: (Math.random() - 0.5) * 2.5,
                                vy: -(Math.random() * 4 + 2.5),
                                life: 1.0,
                                maxLife: Math.random() * 1.5 + 0.8,
                                size: Math.random() * 12 + 6,
                                type: 'smoke',
                                chemicalType: seq.type,
                                seed: Math.random()
                            });
                        }

                        // Emit arcing micro-sparks from molten bead
                        if (Math.random() > 0.4) {
                            const ang = -Math.PI * 0.5 + (Math.random() - 0.5) * 1.8;
                            const spd = Math.random() * 8 + 3;
                            particlesRef.current.push({
                                x: seq.beadX,
                                y: seq.beadY,
                                vx: Math.cos(ang) * spd,
                                vy: Math.sin(ang) * spd,
                                life: 1.0,
                                maxLife: Math.random() * 0.5 + 0.2,
                                size: Math.random() * 3 + 1.5,
                                type: 'spark',
                                chemicalType: seq.type,
                                canBounce: false,
                                seed: Math.random()
                            });
                        }

                        // Detonation Trigger at 1.35s
                        if (seq.elapsed >= 1.35) {
                            seq.phase = 2;
                            audioManager.playExplosionSound();
                            screenShakeRef.current = 1.0;

                            // Color configuration based on reactant chemistry
                            const isPotassium = seq.type === 'potassium';
                            const isAcid = seq.type === 'acid_dilution';

                            // Trigger Shockwave
                            shockwavesRef.current.push({
                                x: seq.beadX,
                                y: seq.beadY,
                                radius: 10,
                                maxRadius: isPotassium ? 320 : 280,
                                life: 1.0,
                                color: isPotassium ? 'rgba(192, 132, 252, 0.85)' : (isAcid ? 'rgba(56, 189, 248, 0.85)' : 'rgba(251, 191, 36, 0.85)'),
                                thickness: 10
                            });

                            // Trigger Thermal Flash
                            thermalFlashRef.current = {
                                x: seq.beadX,
                                y: seq.beadY,
                                intensity: 1.0,
                                color: isPotassium ? 'rgba(245, 208, 254, 0.7)' : (isAcid ? 'rgba(224, 242, 254, 0.7)' : 'rgba(254, 243, 199, 0.75)')
                            };

                            // Spawn 280 Hypervelocity Blast Sparks with Tabletop Bouncing
                            const sparkCount = isPotassium ? 320 : (isAcid ? 240 : 280);
                            for (let j = 0; j < sparkCount; j++) {
                                const angle = Math.random() * Math.PI * 2;
                                const speed = Math.random() * 36 + 10;
                                particlesRef.current.push({
                                    x: seq.beadX,
                                    y: seq.beadY,
                                    vx: Math.cos(angle) * speed,
                                    vy: Math.sin(angle) * speed - (Math.random() * 14 + 6), // Upward blast bias
                                    life: 1.0,
                                    maxLife: Math.random() * 1.2 + 0.35,
                                    size: Math.random() * 5 + 2,
                                    type: 'spark',
                                    chemicalType: seq.type,
                                    canBounce: true,
                                    seed: Math.random()
                                });
                            }

                            // Spawn 45 Heavy Molten Globules
                            for (let j = 0; j < 45; j++) {
                                const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * 1.8;
                                const speed = Math.random() * 18 + 6;
                                particlesRef.current.push({
                                    x: seq.beadX,
                                    y: seq.beadY,
                                    vx: Math.cos(angle) * speed,
                                    vy: Math.sin(angle) * speed - 6,
                                    life: 1.0,
                                    maxLife: Math.random() * 1.6 + 0.8,
                                    size: Math.random() * 6 + 3.5,
                                    type: 'globule',
                                    chemicalType: seq.type,
                                    canBounce: true,
                                    seed: Math.random()
                                });
                            }

                            // Spawn 65 Volumetric Smoke Clouds
                            for (let j = 0; j < 65; j++) {
                                const angle = Math.random() * Math.PI * 2;
                                const speed = Math.random() * 10 + 2;
                                particlesRef.current.push({
                                    x: seq.beadX + Math.cos(angle) * 20,
                                    y: seq.beadY + Math.sin(angle) * 15,
                                    vx: Math.cos(angle) * speed,
                                    vy: -(Math.random() * 6 + 2),
                                    life: 1.0,
                                    maxLife: Math.random() * 2.2 + 1.2,
                                    size: Math.random() * 24 + 14,
                                    type: 'smoke',
                                    chemicalType: seq.type,
                                    seed: Math.random()
                                });
                            }
                        }
                    }

                    if (seq.elapsed > 4.2) {
                        sequences.splice(i, 1);
                        continue;
                    }
                }

                // Visual Drawing for Phase 1: Glowing Molten Skittering Bead & AR Telemetry HUD
                if (seq.phase === 1) {
                    const bx = seq.beadX;
                    const by = seq.beadY;
                    const isPotassium = seq.type === 'potassium';
                    const isAcid = seq.type === 'acid_dilution';

                    // Outer Radiant Flame Aura
                    ctx.globalCompositeOperation = 'lighter';
                    const auraGrad = ctx.createRadialGradient(bx, by, 2, bx, by, 38);
                    if (isPotassium) {
                        auraGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
                        auraGrad.addColorStop(0.25, 'rgba(232, 121, 249, 0.9)');
                        auraGrad.addColorStop(0.6, 'rgba(168, 85, 247, 0.55)');
                        auraGrad.addColorStop(1, 'rgba(147, 51, 234, 0)');
                    } else if (isAcid) {
                        auraGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
                        auraGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.85)');
                        auraGrad.addColorStop(0.7, 'rgba(14, 165, 233, 0.4)');
                        auraGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
                    } else {
                        // Sodium: Incandescent Solar Yellow/Amber (589nm D-line)
                        auraGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
                        auraGrad.addColorStop(0.25, 'rgba(254, 240, 138, 0.95)');
                        auraGrad.addColorStop(0.55, 'rgba(245, 158, 11, 0.65)');
                        auraGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');
                    }
                    ctx.fillStyle = auraGrad;
                    ctx.beginPath();
                    ctx.arc(bx, by, 38, 0, Math.PI * 2);
                    ctx.fill();

                    // Solid Molten Core Bead
                    ctx.beginPath();
                    ctx.arc(bx, by, 7 + Math.sin(seq.elapsed * 30) * 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffffff';
                    ctx.fill();

                    // AR Holographic Telemetry HUD
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.save();
                    ctx.textAlign = 'center';
                    ctx.font = 'bold 10px monospace';

                    const temp = Math.min(1380, Math.round(180 + (seq.elapsed / 1.35) * 1150));
                    const label = isPotassium ? '⚡ POTASSIUM EXOTHERMIC' : (isAcid ? '⚠ ACID FLASH BOIL' : '⚡ SODIUM RUNAWAY');
                    const themeColor = isPotassium ? '#e879f9' : (isAcid ? '#38bdf8' : '#fbbf24');

                    // Pulsing HUD Ring
                    ctx.strokeStyle = themeColor;
                    ctx.lineWidth = 1.5;
                    ctx.setLineDash([4, 4]);
                    ctx.beginPath();
                    ctx.arc(bx, by, 26 + (seq.elapsed * 6) % 10, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    // HUD Label Box
                    ctx.fillStyle = 'rgba(4, 12, 24, 0.85)';
                    ctx.strokeStyle = themeColor;
                    ctx.lineWidth = 1;
                    const boxW = 160;
                    const boxH = 22;
                    const boxY = by - 44;
                    ctx.beginPath();
                    ctx.roundRect(bx - boxW / 2, boxY, boxW, boxH, 6);
                    ctx.fill();
                    ctx.stroke();

                    // Telemetry Text
                    ctx.fillStyle = themeColor;
                    ctx.fillText(`${label} ${temp}°C`, bx, boxY + 14);

                    ctx.restore();
                }
            }

            // 4. Update & Draw Supersonic Shockwave Rings
            for (let i = shockwaves.length - 1; i >= 0; i--) {
                const sw = shockwaves[i];

                if (!isPaused) {
                    sw.radius += (sw.maxRadius - sw.radius) * (deltaTime * 8.5);
                    sw.life -= deltaTime * 2.2;
                    if (sw.life <= 0 || sw.radius >= sw.maxRadius - 5) {
                        shockwaves.splice(i, 1);
                        continue;
                    }
                }

                ctx.save();
                ctx.globalCompositeOperation = 'lighter';

                // Outer Shockwave Ring
                ctx.strokeStyle = sw.color.replace(/[\d\.]+\)$/, `${sw.life * 0.8})`);
                ctx.lineWidth = sw.thickness * sw.life;
                ctx.beginPath();
                ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
                ctx.stroke();

                // Inner Chromatic Core Ring
                ctx.strokeStyle = `rgba(255, 255, 255, ${sw.life * 0.9})`;
                ctx.lineWidth = Math.max(1, (sw.thickness * 0.4) * sw.life);
                ctx.beginPath();
                ctx.arc(sw.x, sw.y, Math.max(1, sw.radius - 4), 0, Math.PI * 2);
                ctx.stroke();

                ctx.restore();
            }

            // 5. Update & Draw Particles (Sparks, Smoke, Molten Globules)
            const mouse = mousePosRef.current;

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                const oldX = p.x;
                const oldY = p.y;

                if (!isPaused) {
                    p.x += p.vx;
                    p.y += p.vy;

                    // Interactive cursor wind deflection
                    if (mouse) {
                        const mdx = p.x - mouse.x;
                        const mdy = p.y - mouse.y;
                        const mDistSq = mdx * mdx + mdy * mdy;
                        if (mDistSq < 16900 && mDistSq > 1) { // 130px radius
                            const mDist = Math.sqrt(mDistSq);
                            const force = (1 - mDist / 130) * 1.5;
                            p.vx += (mdx / mDist) * force;
                            p.vy += (mdy / mDist) * force;
                        }
                    }

                    if (p.type === 'spark') {
                        p.vy += 0.65;  // Gravity
                        p.vx *= 0.94;  // Air friction
                        p.vy *= 0.94;

                        // Tabletop bounce collision
                        if (p.canBounce && p.y >= tableY) {
                            p.y = tableY;
                            p.vy = -p.vy * 0.42;
                            p.vx *= 0.72;
                        }
                    } else if (p.type === 'globule') {
                        p.vy += 0.85;  // Heavy gravity
                        p.vx *= 0.96;
                        p.vy *= 0.96;

                        if (p.canBounce && p.y >= tableY) {
                            p.y = tableY;
                            p.vy = -p.vy * 0.28;
                            p.vx *= 0.65;
                        }
                    } else if (p.type === 'bubble') {
                        p.vy -= 0.12; // upward buoyancy
                        p.vx += Math.sin(p.life * 10 + p.seed) * 0.1; // gentle fluid wobble
                        p.vx *= 0.95;
                        p.vy *= 0.98;
                    } else if (p.type === 'crystal') {
                        p.vy += 0.08; // slow settling precipitate
                        p.vx *= 0.92;
                        p.vy *= 0.92;
                    } else {
                        // Smoke
                        p.vy -= 0.06; // Buoyancy upward
                        p.vx *= 0.97;
                        p.vy *= 0.97;
                        p.size += 0.35; // Expansion
                    }

                    p.life -= deltaTime;
                    if (p.life <= 0) {
                        particles.splice(i, 1);
                        continue;
                    }
                }

                const lifeRatio = Math.max(0, p.life / p.maxLife);
                const isPotassium = p.chemicalType === 'potassium';
                const isAcid = p.chemicalType === 'acid_dilution';

                if (p.type === 'spark') {
                    // Hypervelocity Spark Trails - Fine Tapered Incandescence
                    ctx.globalCompositeOperation = 'lighter';
                    ctx.beginPath();
                    ctx.moveTo(oldX - p.vx * 1.2, oldY - p.vy * 1.2);
                    ctx.lineTo(p.x, p.y);

                    let strokeColor = 'rgba(255, 255, 255, 1)';
                    if (lifeRatio > 0.75) {
                        strokeColor = 'rgba(255, 255, 255, 1)'; // Hot white core
                    } else if (lifeRatio > 0.35) {
                        strokeColor = isPotassium
                            ? `rgba(232, 121, 249, ${lifeRatio})`
                            : (isAcid ? `rgba(56, 189, 248, ${lifeRatio})` : `rgba(251, 191, 36, ${lifeRatio})`);
                    } else {
                        strokeColor = isPotassium
                            ? `rgba(168, 85, 247, ${lifeRatio * 0.6})`
                            : (isAcid ? `rgba(14, 165, 233, ${lifeRatio * 0.6})` : `rgba(234, 88, 12, ${lifeRatio * 0.6})`);
                    }

                    ctx.strokeStyle = strokeColor;
                    ctx.lineWidth = Math.max(0.8, p.size * 0.45 * lifeRatio);
                    ctx.lineCap = 'round';
                    ctx.stroke();

                } else if (p.type === 'globule') {
                    // Burning Molten Chunks
                    ctx.globalCompositeOperation = 'lighter';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, Math.max(1, p.size * 0.65 * lifeRatio), 0, Math.PI * 2);
                    ctx.fillStyle = isPotassium
                        ? `rgba(240, 171, 252, ${lifeRatio})`
                        : (isAcid ? `rgba(186, 230, 253, ${lifeRatio})` : `rgba(254, 215, 170, ${lifeRatio})`);
                    ctx.fill();

                } else if (p.type === 'bubble') {
                    // Micro Effervescence Bubbles with Specular Highlight
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.beginPath();
                    const bSize = Math.max(1.5, p.size * lifeRatio);
                    ctx.arc(p.x, p.y, bSize, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(186, 230, 253, ${lifeRatio * 0.75})`;
                    ctx.lineWidth = 1;
                    ctx.fillStyle = `rgba(224, 242, 254, ${lifeRatio * 0.25})`;
                    ctx.fill();
                    ctx.stroke();

                    // Specular Highlight Glint
                    ctx.beginPath();
                    ctx.arc(p.x - bSize * 0.35, p.y - bSize * 0.35, Math.max(0.6, bSize * 0.25), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${lifeRatio * 0.9})`;
                    ctx.fill();

                } else if (p.type === 'crystal') {
                    // Twinkling Precipitate Crystal Star Nucleation
                    ctx.globalCompositeOperation = 'lighter';
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.life * 3.5 + p.seed);
                    const starR = Math.max(1.5, p.size * lifeRatio);
                    ctx.fillStyle = `rgba(255, 255, 255, ${lifeRatio * 0.85})`;
                    ctx.beginPath();
                    ctx.moveTo(0, -starR);
                    ctx.lineTo(starR * 0.22, 0);
                    ctx.lineTo(0, starR);
                    ctx.lineTo(-starR * 0.22, 0);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(-starR, 0);
                    ctx.lineTo(0, starR * 0.22);
                    ctx.lineTo(starR, 0);
                    ctx.lineTo(0, -starR * 0.22);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();

                } else {
                    // Soft Billowing Volumetric Steam & Smoke Puffs
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.beginPath();
                    const smokeAlpha = lifeRatio * 0.14;
                    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(1, p.size));
                    if (isPotassium) {
                        grad.addColorStop(0, `rgba(216, 180, 254, ${smokeAlpha})`);
                        grad.addColorStop(0.55, `rgba(192, 132, 252, ${smokeAlpha * 0.45})`);
                        grad.addColorStop(1, 'rgba(168, 85, 247, 0)');
                    } else if (isAcid) {
                        grad.addColorStop(0, `rgba(224, 242, 254, ${smokeAlpha})`);
                        grad.addColorStop(0.55, `rgba(186, 230, 253, ${smokeAlpha * 0.45})`);
                        grad.addColorStop(1, 'rgba(14, 165, 233, 0)');
                    } else {
                        grad.addColorStop(0, `rgba(241, 245, 249, ${smokeAlpha})`);
                        grad.addColorStop(0.55, `rgba(203, 213, 225, ${smokeAlpha * 0.45})`);
                        grad.addColorStop(1, 'rgba(148, 163, 184, 0)');
                    }
                    ctx.fillStyle = grad;
                    ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.globalCompositeOperation = 'source-over';
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 pointer-events-none z-[35]" 
        />
    );
};

export default VFXEngine;

