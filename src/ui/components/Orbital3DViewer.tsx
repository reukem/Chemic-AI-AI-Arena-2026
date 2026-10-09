import React, { useState, useEffect, useRef } from 'react';
import { audioManager } from '../../engine/AudioManager';

export type OrbitalType = 's' | 'px' | 'py' | 'pz' | 'd_z2' | 'd_x2_y2' | 'd_xy' | 'd_xz' | 'd_yz';

interface Orbital3DViewerProps {
    initialOrbital?: OrbitalType;
    elementSymbol?: string;
    isVi?: boolean;
    className?: string;
}

interface OrbitalMetadata {
    id: OrbitalType;
    label: string;
    subshell: 's' | 'p' | 'd';
    n: number;
    l: number;
    ml: number;
    name: { EN: string; VN: string };
    wavefunction: string;
    nodalSurfaces: { EN: string; VN: string };
    description: { EN: string; VN: string };
}

export const ORBITAL_REGISTRY: Record<OrbitalType, OrbitalMetadata> = {
    s: {
        id: 's',
        label: 's (Spherical)',
        subshell: 's',
        n: 1,
        l: 0,
        ml: 0,
        name: { EN: '1s / 2s Spherical Orbital', VN: 'Obitan s (Hình cầu đối xứng)' },
        wavefunction: '\\psi_{1s} = \\frac{1}{\\sqrt{\\pi a_0^3}} e^{-r/a_0}',
        nodalSurfaces: {
            EN: 'l = 0 (No angular nodes). Spherical symmetry across all directions.',
            VN: 'l = 0 (Không có mặt phẳng nút góc). Đối xứng cầu hoàn hảo mọi phương.'
        },
        description: {
            EN: 'Highest electron probability density at the nucleus, symmetrically decaying outward.',
            VN: 'Mật độ xác suất tìm thấy electron cực đại gần hạt nhân và giảm dần đều theo mọi bán kính.'
        }
    },
    px: {
        id: 'px',
        label: '2px (Dumbbell X)',
        subshell: 'p',
        n: 2,
        l: 1,
        ml: 1,
        name: { EN: '2px Dumbbell Orbital', VN: 'Obitan 2px (Hình số 8 nổi trục Ox)' },
        wavefunction: '\\psi_{2p_x} = \\frac{1}{4\\sqrt{2\\pi a_0^3}} \\frac{r}{a_0} e^{-r/2a_0} \\sin\\theta \\cos\\phi',
        nodalSurfaces: {
            EN: 'Nodal Plane: yz-plane (x = 0). Electron probability is exactly zero at x = 0.',
            VN: 'Mặt phẳng nút: Mặt phẳng yz (x = 0). Xác suất tìm thấy electron bằng 0 tuyệt đối.'
        },
        description: {
            EN: 'Two dumbbell lobes along the x-axis with opposite quantum wavefunction phases (+ and -).',
            VN: 'Hai thùy hình số 8 nổi dọc theo trục Ox mang hai pha hàm sóng trái dấu (+ và -).'
        }
    },
    py: {
        id: 'py',
        label: '2py (Dumbbell Y)',
        subshell: 'p',
        n: 2,
        l: 1,
        ml: -1,
        name: { EN: '2py Dumbbell Orbital', VN: 'Obitan 2py (Hình số 8 nổi trục Oy)' },
        wavefunction: '\\psi_{2p_y} = \\frac{1}{4\\sqrt{2\\pi a_0^3}} \\frac{r}{a_0} e^{-r/2a_0} \\sin\\theta \\sin\\phi',
        nodalSurfaces: {
            EN: 'Nodal Plane: xz-plane (y = 0).',
            VN: 'Mặt phẳng nút: Mặt phẳng xz (y = 0).'
        },
        description: {
            EN: 'Two dumbbell lobes oriented along the y-axis with perpendicular nodal plane.',
            VN: 'Hai thùy đối xứng định hướng dọc theo trục tung Oy với mặt phẳng nút vuông góc.'
        }
    },
    pz: {
        id: 'pz',
        label: '2pz (Dumbbell Z)',
        subshell: 'p',
        n: 2,
        l: 1,
        ml: 0,
        name: { EN: '2pz Dumbbell Orbital', VN: 'Obitan 2pz (Hình số 8 nổi trục Oz)' },
        wavefunction: '\\psi_{2p_z} = \\frac{1}{4\\sqrt{2\\pi a_0^3}} \\frac{r}{a_0} e^{-r/2a_0} \\cos\\theta',
        nodalSurfaces: {
            EN: 'Nodal Plane: xy-plane (z = 0).',
            VN: 'Mặt phẳng nút: Mặt phẳng xy (z = 0).'
        },
        description: {
            EN: 'Two dumbbell lobes oriented along the vertical z-axis.',
            VN: 'Hai thùy đối xứng định hướng dọc theo trục thẳng đứng Oz.'
        }
    },
    d_z2: {
        id: 'd_z2',
        label: '3dz² (Donut Torus)',
        subshell: 'd',
        n: 3,
        l: 2,
        ml: 0,
        name: { EN: '3dz² Orbital with Toroidal Ring', VN: 'Obitan 3dz² (Thùy Oz kèm vành khuyên vành đai)' },
        wavefunction: '\\psi_{3d_{z^2}} \\propto (3\\cos^2\\theta - 1)',
        nodalSurfaces: {
            EN: 'Two conical nodal surfaces at cone angle θ = 54.74°.',
            VN: 'Hai mặt nón nút nghiêng góc θ = 54.74° chia cắt thùy đứng và vành khuyên.'
        },
        description: {
            EN: 'Two major lobes along the z-axis enclosed by an equatorial torus doughnut ring in the xy-plane.',
            VN: 'Hai thùy chính vươn theo trục Oz được bao quanh bởi một vành khuyên bánh donut ở mặt phẳng xOy.'
        }
    },
    d_x2_y2: {
        id: 'd_x2_y2',
        label: '3d(x²-y²) (4 Lobes On-Axis)',
        subshell: 'd',
        n: 3,
        l: 2,
        ml: 2,
        name: { EN: '3d(x²-y²) Cloverleaf Orbital', VN: 'Obitan 3d(x²-y²) (Bốn thùy dọc theo trục Ox, Oy)' },
        wavefunction: '\\psi_{3d_{x^2-y^2}} \\propto \\sin^2\\theta \\cos(2\\phi)',
        nodalSurfaces: {
            EN: 'Two planar nodal surfaces along planes y = x and y = -x.',
            VN: 'Hai mặt phẳng nút phân giác tạo góc 45°: y = x và y = -x.'
        },
        description: {
            EN: 'Four lobes pointing directly along the x and y coordinate axes with alternating phases.',
            VN: 'Bốn thùy hướng chính diện theo các trục Ox và Oy với pha hàm sóng xen kẽ đối xứng.'
        }
    },
    d_xy: {
        id: 'd_xy',
        label: '3dxy (4 Lobes Between Axes)',
        subshell: 'd',
        n: 3,
        l: 2,
        ml: -2,
        name: { EN: '3dxy Cloverleaf Orbital', VN: 'Obitan 3dxy (Bốn thùy xen giữa các trục)' },
        wavefunction: '\\psi_{3d_{xy}} \\propto \\sin^2\\theta \\sin(2\\phi)',
        nodalSurfaces: {
            EN: 'Two planar nodal surfaces: xz-plane (y = 0) and yz-plane (x = 0).',
            VN: 'Hai mặt phẳng nút chính trục: Mặt phẳng xz (y = 0) và yz (x = 0).'
        },
        description: {
            EN: 'Four lobes positioned between the x and y axes in quadrants I, II, III, and IV.',
            VN: 'Bốn thùy nằm phân bố đều giữa các góc phần tư của mặt phẳng tọa độ xOy.'
        }
    },
    d_xz: {
        id: 'd_xz',
        label: '3dxz (Cloverleaf XZ)',
        subshell: 'd',
        n: 3,
        l: 2,
        ml: 1,
        name: { EN: '3dxz Cloverleaf Orbital', VN: 'Obitan 3dxz (Bốn thùy mặt phẳng xOz)' },
        wavefunction: '\\psi_{3d_{xz}} \\propto \\sin\\theta \\cos\\theta \\cos\\phi',
        nodalSurfaces: {
            EN: 'Nodal planes: xy-plane (z = 0) and yz-plane (x = 0).',
            VN: 'Mặt phẳng nút: Mặt phẳng xy (z = 0) và yz (x = 0).'
        },
        description: {
            EN: 'Four lobes situated in the xz-plane.',
            VN: 'Bốn thùy phân bố trong mặt phẳng thẳng đứng xOz.'
        }
    },
    d_yz: {
        id: 'd_yz',
        label: '3dyz (Cloverleaf YZ)',
        subshell: 'd',
        n: 3,
        l: 2,
        ml: -1,
        name: { EN: '3dyz Cloverleaf Orbital', VN: 'Obitan 3dyz (Bốn thùy mặt phẳng yOz)' },
        wavefunction: '\\psi_{3d_{yz}} \\propto \\sin\\theta \\cos\\theta \\sin\\phi',
        nodalSurfaces: {
            EN: 'Nodal planes: xy-plane (z = 0) and xz-plane (y = 0).',
            VN: 'Mặt phẳng nút: Mặt phẳng xy (z = 0) và xz (y = 0).'
        },
        description: {
            EN: 'Four lobes situated in the yz-plane.',
            VN: 'Bốn thùy phân bố trong mặt phẳng thẳng đứng yOz.'
        }
    }
};

export const Orbital3DViewer: React.FC<Orbital3DViewerProps> = ({
    initialOrbital = 'px',
    elementSymbol,
    isVi = true,
    className = ''
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [selectedOrbital, setSelectedOrbital] = useState<OrbitalType>(initialOrbital);
    const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
    const [showNodalPlanes, setShowNodalPlanes] = useState<boolean>(true);
    const [showPhaseColors, setShowPhaseColors] = useState<boolean>(true);
    const [rotX, setRotX] = useState<number>(0.4);
    const [rotY, setRotY] = useState<number>(0.6);
    const [zoom, setZoom] = useState<number>(1.0);

    const isDraggingRef = useRef<boolean>(false);
    const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const metadata = ORBITAL_REGISTRY[selectedOrbital];

    // Handle mouse drag to rotate 3D view
    const handleMouseDown = (e: React.MouseEvent) => {
        isDraggingRef.current = true;
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDraggingRef.current) return;
        const dx = e.clientX - lastMousePosRef.current.x;
        const dy = e.clientY - lastMousePosRef.current.y;
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };

        setRotY(prev => prev + dx * 0.01);
        setRotX(prev => Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, prev + dy * 0.01)));
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

    // Auto-rotation loop
    useEffect(() => {
        if (!isAutoRotating) return;
        let animationFrameId: number;
        const animate = () => {
            if (!isDraggingRef.current) {
                setRotY(prev => prev + 0.008);
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isAutoRotating]);

    // Canvas 3D Render Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
        let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

        // Resize observer
        const handleResize = () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.clientWidth;
            height = canvas.height = canvas.parentElement.clientHeight;
        };
        window.addEventListener('resize', handleResize);

        // Render Frame
        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const scale = Math.min(width, height) * 0.32 * zoom;

        // 3D Point projection helper
        const project = (x: number, y: number, z: number) => {
            // Rotate Y
            const cosY = Math.cos(rotY);
            const sinY = Math.sin(rotY);
            const x1 = x * cosY - z * sinY;
            const z1 = x * sinY + z * cosY;

            // Rotate X
            const cosX = Math.cos(rotX);
            const sinX = Math.sin(rotX);
            const y2 = y * cosX - z1 * sinX;
            const z2 = y * sinX + z1 * cosX;

            // Perspective factor
            const dist = 3.5;
            const fov = dist / (dist + z2 * 0.5);

            return {
                px: centerX + x1 * scale * fov,
                py: centerY - y2 * scale * fov,
                depth: z2,
                fov
            };
        };

        // Draw 3D Coordinate Axes (X: Red, Y: Green, Z: Blue)
        const axisLength = 1.3;
        const origin = project(0, 0, 0);
        const pX = project(axisLength, 0, 0);
        const pY = project(0, axisLength, 0);
        const pZ = project(0, 0, axisLength);

        // Draw Axes Lines
        const drawAxis = (target: { px: number; py: number }, color: string, label: string) => {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([2, 2]);
            ctx.moveTo(origin.px, origin.py);
            ctx.lineTo(target.px, target.py);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = color;
            ctx.font = 'bold 10px monospace';
            ctx.fillText(label, target.px + 4, target.py + 4);
        };

        drawAxis(pX, 'rgba(239, 68, 68, 0.6)', 'X');
        drawAxis(pY, 'rgba(34, 197, 94, 0.6)', 'Y');
        drawAxis(pZ, 'rgba(56, 189, 248, 0.6)', 'Z');

        // Draw Nodal Planes if enabled
        if (showNodalPlanes) {
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);

            if (selectedOrbital === 'px' || selectedOrbital === 'd_xy') {
                // yz-plane (x=0)
                const c1 = project(0, -1.1, -1.1);
                const c2 = project(0, 1.1, -1.1);
                const c3 = project(0, 1.1, 1.1);
                const c4 = project(0, -1.1, 1.1);
                ctx.beginPath();
                ctx.moveTo(c1.px, c1.py);
                ctx.lineTo(c2.px, c2.py);
                ctx.lineTo(c3.px, c3.py);
                ctx.lineTo(c4.px, c4.py);
                ctx.closePath();
                ctx.fillStyle = 'rgba(245, 158, 11, 0.05)';
                ctx.fill();
                ctx.stroke();
            } else if (selectedOrbital === 'py') {
                // xz-plane (y=0)
                const c1 = project(-1.1, 0, -1.1);
                const c2 = project(1.1, 0, -1.1);
                const c3 = project(1.1, 0, 1.1);
                const c4 = project(-1.1, 0, 1.1);
                ctx.beginPath();
                ctx.moveTo(c1.px, c1.py);
                ctx.lineTo(c2.px, c2.py);
                ctx.lineTo(c3.px, c3.py);
                ctx.lineTo(c4.px, c4.py);
                ctx.closePath();
                ctx.fillStyle = 'rgba(245, 158, 11, 0.05)';
                ctx.fill();
                ctx.stroke();
            } else if (selectedOrbital === 'pz') {
                // xy-plane (z=0)
                const c1 = project(-1.1, -1.1, 0);
                const c2 = project(1.1, -1.1, 0);
                const c3 = project(1.1, 1.1, 0);
                const c4 = project(-1.1, 1.1, 0);
                ctx.beginPath();
                ctx.moveTo(c1.px, c1.py);
                ctx.lineTo(c2.px, c2.py);
                ctx.lineTo(c3.px, c3.py);
                ctx.lineTo(c4.px, c4.py);
                ctx.closePath();
                ctx.fillStyle = 'rgba(245, 158, 11, 0.05)';
                ctx.fill();
                ctx.stroke();
            }
            ctx.setLineDash([]);
        }

        // Generate 3D Isosurface Points & Depth Sort
        interface SurfacePoint {
            x: number;
            y: number;
            z: number;
            phase: number; // +1 or -1
            radius: number;
        }

        const surfacePoints: SurfacePoint[] = [];

        // Mathematical parametric surface generation
        const uSteps = 28;
        const vSteps = 28;

        for (let i = 0; i < uSteps; i++) {
            const u = (i / uSteps) * Math.PI; // theta: 0 to PI
            for (let j = 0; j < vSteps; j++) {
                const v = (j / vSteps) * (2 * Math.PI); // phi: 0 to 2PI

                let r = 0;
                let phase = 1;

                if (selectedOrbital === 's') {
                    // Spherical
                    r = 0.85;
                    phase = 1;
                } else if (selectedOrbital === 'pz') {
                    // Y_10 = cos(theta)
                    const val = Math.cos(u);
                    r = Math.abs(val) * 1.15;
                    phase = val >= 0 ? 1 : -1;
                } else if (selectedOrbital === 'px') {
                    // Y_11 = sin(theta)*cos(phi)
                    const val = Math.sin(u) * Math.cos(v);
                    r = Math.abs(val) * 1.15;
                    phase = val >= 0 ? 1 : -1;
                } else if (selectedOrbital === 'py') {
                    // Y_1-1 = sin(theta)*sin(phi)
                    const val = Math.sin(u) * Math.sin(v);
                    r = Math.abs(val) * 1.15;
                    phase = val >= 0 ? 1 : -1;
                } else if (selectedOrbital === 'd_z2') {
                    // 3cos^2(theta) - 1
                    const val = 3 * Math.cos(u) * Math.cos(u) - 1;
                    r = Math.min(1.2, Math.abs(val) * 0.65);
                    phase = val >= 0 ? 1 : -1;
                } else if (selectedOrbital === 'd_x2_y2') {
                    // sin^2(theta)*cos(2phi)
                    const val = Math.sin(u) * Math.sin(u) * Math.cos(2 * v);
                    r = Math.abs(val) * 1.1;
                    phase = val >= 0 ? 1 : -1;
                } else if (selectedOrbital === 'd_xy') {
                    // sin^2(theta)*sin(2phi)
                    const val = Math.sin(u) * Math.sin(u) * Math.sin(2 * v);
                    r = Math.abs(val) * 1.1;
                    phase = val >= 0 ? 1 : -1;
                } else if (selectedOrbital === 'd_xz') {
                    // sin(theta)*cos(theta)*cos(phi)
                    const val = 2 * Math.sin(u) * Math.cos(u) * Math.cos(v);
                    r = Math.abs(val) * 1.1;
                    phase = val >= 0 ? 1 : -1;
                } else if (selectedOrbital === 'd_yz') {
                    // sin(theta)*cos(theta)*sin(phi)
                    const val = 2 * Math.sin(u) * Math.cos(u) * Math.sin(v);
                    r = Math.abs(val) * 1.1;
                    phase = val >= 0 ? 1 : -1;
                }

                if (r > 0.05) {
                    const x = r * Math.sin(u) * Math.cos(v);
                    const y = r * Math.sin(u) * Math.sin(v);
                    const z = r * Math.cos(u);
                    surfacePoints.push({ x, y, z, phase, radius: r });
                }
            }
        }

        // Project and depth-sort points from back to front
        const projectedPoints = surfacePoints.map(pt => {
            const pr = project(pt.x, pt.y, pt.z);
            return {
                ...pt,
                px: pr.px,
                py: pr.py,
                depth: pr.depth,
                fov: pr.fov
            };
        });

        projectedPoints.sort((a, b) => a.depth - b.depth);

        // Draw quantum probability cloud particles with glowing halo
        projectedPoints.forEach(p => {
            const dotSize = Math.max(1.2, (2.8 + p.radius * 2.2) * p.fov * zoom);
            const alpha = Math.min(0.85, Math.max(0.2, 0.35 + (p.depth + 1.2) * 0.25));

            let color = '';
            if (!showPhaseColors) {
                color = `rgba(34, 211, 238, ${alpha})`;
            } else if (p.phase > 0) {
                color = `rgba(6, 182, 212, ${alpha})`; // Cyan positive phase
            } else {
                color = `rgba(244, 63, 94, ${alpha})`; // Rose negative phase
            }

            ctx.beginPath();
            ctx.arc(p.px, p.py, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        });

        // Draw Atomic Nucleus Marker at Origin (Z=0, X=0, Y=0)
        ctx.beginPath();
        ctx.arc(origin.px, origin.py, 4.5 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#22d3ee';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        return () => window.removeEventListener('resize', handleResize);
    }, [selectedOrbital, rotX, rotY, zoom, showNodalPlanes, showPhaseColors]);

    return (
        <div className={`relative flex flex-col rounded-3xl bg-[#030914]/95 border border-cyan-500/40 p-4 shadow-2xl overflow-hidden ${className}`}>
            {/* Top Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-cyan-900/40">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                    <div>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                            {isVi ? 'KHÔNG GIAN LƯỢNG TỬ 3D // OBITAN NGUYÊN TỬ' : '3D QUANTUM ATOMIC ORBITAL LAB'}
                        </span>
                        <h4 className="text-sm font-bold text-white font-mono">
                            {isVi ? metadata.name.VN : metadata.name.EN}
                        </h4>
                    </div>
                </div>

                {/* Subshell Selection Pills */}
                <div className="flex flex-wrap items-center gap-1">
                    {(Object.keys(ORBITAL_REGISTRY) as OrbitalType[]).map(key => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => {
                                audioManager.playClick();
                                setSelectedOrbital(key);
                            }}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                selectedOrbital === key
                                    ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                                    : 'bg-[#061426] text-slate-300 hover:text-white border border-cyan-950'
                            }`}
                        >
                            {ORBITAL_REGISTRY[key].id}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3D Canvas Stage */}
            <div 
                className="relative w-full h-64 md:h-72 my-2 rounded-2xl bg-gradient-to-b from-[#020610] to-[#040e22] border border-cyan-950 flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <canvas ref={canvasRef} className="w-full h-full" />

                {/* Floating 3D Interaction Hint */}
                <div className="absolute top-2 left-2 pointer-events-none text-[9px] font-mono text-cyan-400/70 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm border border-cyan-900/30">
                    {isVi ? '🖱 Rê chuột để xoay 3D • 360° Quantum Mesh' : '🖱 Drag to rotate 3D • 360° Quantum Mesh'}
                </div>

                {/* Wavefunction Phase Legend */}
                {showPhaseColors && (
                    <div className="absolute bottom-2 left-2 pointer-events-none flex items-center gap-3 text-[9px] font-mono bg-black/60 px-2.5 py-1 rounded-md border border-cyan-900/40 backdrop-blur-sm">
                        <div className="flex items-center gap-1 text-cyan-300">
                            <span className="w-2 h-2 rounded-full bg-cyan-400" />
                            <span>Ψ &gt; 0 (+)</span>
                        </div>
                        <div className="flex items-center gap-1 text-rose-400">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            <span>Ψ &lt; 0 (-)</span>
                        </div>
                    </div>
                )}

                {/* Quick Toggle Controls */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 z-10">
                    <button
                        type="button"
                        onClick={() => {
                            audioManager.playClick();
                            setIsAutoRotating(!isAutoRotating);
                        }}
                        className={`px-2 py-1 rounded-md text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                            isAutoRotating
                                ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                        title="Auto-rotate toggle"
                    >
                        {isAutoRotating ? '⏸ Xoay' : '▶ Tự xoay'}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            audioManager.playClick();
                            setShowNodalPlanes(!showNodalPlanes);
                        }}
                        className={`px-2 py-1 rounded-md text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                            showNodalPlanes
                                ? 'bg-amber-950 text-amber-300 border-amber-500'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                        title="Nodal plane toggle"
                    >
                        {isVi ? 'Mặt nút' : 'Nodes'}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            audioManager.playClick();
                            setZoom(prev => (prev >= 1.4 ? 0.8 : prev + 0.2));
                        }}
                        className="px-2 py-1 rounded-md text-[9px] font-mono font-bold bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-400 cursor-pointer"
                        title="Zoom"
                    >
                        🔍 {(zoom * 100).toFixed(0)}%
                    </button>
                </div>
            </div>

            {/* Bottom Pedagogical Quantum Numbers Card */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t border-cyan-900/40 text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-[#040e1e] border border-cyan-950">
                    <span className="text-slate-400 block font-bold">{isVi ? 'SỐ LƯỢNG TỬ CHÍNH (n):' : 'PRINCIPAL (n):'}</span>
                    <span className="text-cyan-300 font-black text-sm">n = {metadata.n}</span>
                </div>

                <div className="p-2 rounded-xl bg-[#040e1e] border border-cyan-950">
                    <span className="text-slate-400 block font-bold">{isVi ? 'SỐ LƯỢNG TỬ PHỤ (l):' : 'ANGULAR (l):'}</span>
                    <span className="text-amber-300 font-black text-sm">l = {metadata.l} ({metadata.subshell})</span>
                </div>

                <div className="p-2 rounded-xl bg-[#040e1e] border border-cyan-950">
                    <span className="text-slate-400 block font-bold">{isVi ? 'SỐ LƯỢNG TỬ TỪ (m_l):' : 'MAGNETIC (m_l):'}</span>
                    <span className="text-purple-300 font-black text-sm">m_l = {metadata.ml}</span>
                </div>

                <div className="p-2 rounded-xl bg-[#040e1e] border border-cyan-950">
                    <span className="text-slate-400 block font-bold">{isVi ? 'SỐ ELECTRON TỐI ĐA:' : 'MAX ELECTRONS:'}</span>
                    <span className="text-emerald-300 font-black text-sm">2 e⁻ (↑↓)</span>
                </div>
            </div>

            {/* Nodal Plane & Symmetry Explanation */}
            <div className="mt-2 p-2.5 rounded-xl bg-slate-950/80 border border-cyan-900/30 text-[10px] font-mono text-slate-300 flex items-start gap-2">
                <span className="text-amber-400 text-xs">💡</span>
                <div>
                    <strong className="text-cyan-300">{isVi ? 'Đặc tính nút góc & đối xứng: ' : 'Nodal surfaces & symmetry: '}</strong>
                    <span>{isVi ? metadata.nodalSurfaces.VN : metadata.nodalSurfaces.EN}</span>
                </div>
            </div>
        </div>
    );
};

export default Orbital3DViewer;
