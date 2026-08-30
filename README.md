# Chemic-AI: The Quantum Reality Engine

Welcome to the official repository for **Chemic-AI**, built for the RMIT TechCamp competition. This is not just a drag-and-drop web toy. It is a highly optimized, fully reactive, mathematically authentic WebGL physics and thermodynamics sandbox built entirely in React.

## 🚀 Architectural Overview

The core philosophy behind Chemic-AI is the pursuit of **AAA Game Engine Simulation fidelity** within the browser environment. We threw out traditional hardcoded DOM logic and standard HTML5 Drag-and-Drop, replacing them with a custom engine that handles spatial physics, collision detection, and exact mathematical color interpolations.

### 1. Root Mean Square (RMS) Color Blending
In standard web applications, color mixing is typically handled using basic linear interpolation (arithmetic averaging). However, linear math fails completely when simulating real-world pigment absorption and light scattering, often resulting in muddy, inaccurate grey tones.

Chemic-AI solves this by utilizing **Root Mean Square (RMS)** mathematical algorithms to calculate exact photon absorption per RGB channel. By calculating the square root of the sum of the squared color values (weighted strictly by exact fluid volume), our simulation flawlessly predicts chemical dye outputs.
- `R_mix = sqrt( (R1² * V1 + R2² * V2) / (V1 + V2) )`
This ensures that combining an inert vivid Yellow (`#fde047`) and an inert Blue (`#2563eb`) results in an authentic, physically accurate Green hue, rather than a mathematically flawed grey gradient.

### 2. The Recursive Class-Based Reaction Matrix
Traditional educational simulations rely on massive, manually typed `if-else` dictionaries (e.g., explicitly defining that `NaCl` + `AgNO3` produces `AgCl`). This approach severely limits sandbox potential.

Chemic-AI introduces the **Chaining Engine**, a recursive, fallback-driven reaction solver:
1. **Explicit Rules**: The engine first scans for exact atomic matches (e.g., Sodium + Water) which take highest execution priority.
2. **Class-Based Parsing**: If no exact match is found, the engine evaluates the broader thermodynamic taxonomy (`reactionClass`). If any `strong_acid` detects any `weak_base`, the engine dynamically solves the neutralization reaction in real-time, mapping the exact product to an aqueous `SALT_WATER` state.
3. **Infinite Chaining**: Because the engine modifies the spatial container's internal array every tick, Product A from Reaction 1 can immediately serve as Reactant B for Reaction 2 in the same frame, allowing for unscripted, highly complex chains of reactions.

### 3. The Thermodynamic "Entropy Sludge" Protocol
What happens when a user attempts to break the physics engine by dumping 10 different reactive chemicals into a single 100mL flask? 

Instead of crashing or endlessly looping, Chemic-AI calculates internal entropy. By scanning the distinct taxonomy classes currently present inside a beaker, the engine detects chaos. If a container holds 4 or more conflicting reactive states without a clear chemical resolution, it triggers the **Sludge Protocol**. 
The thermodynamic state violently collapses. The entire volume of the container converts into `ENTROPY_SLUDGE`, the color hard-shifts to a murky `#4a3b32` brown, and the container becomes completely permanently inert—emulating a dead, burnt-out chemical mess.

### 4. Custom Pointer Physics & Spatial Z-Index Clamping
We explicitly disabled all native HTML5 Drag-and-Drop events. They are too clunky, unresponsive, and restrictive for a AAA fluid sandbox.

Instead, Chemic-AI utilizes a completely custom **"Rubber-Band" Pointer Physics System**:
- Raw `pointerdown`, `pointermove`, and `pointerup` handlers precisely track the user's cursor relative to the viewport.
- As the user clicks and drags a reagent from the glowing neon sidebar, the engine calculates the Euclidean distance to the nearest spawned `Beaker` or `Flask` container.
- If the drop coordinates fall within the spatial bounding box of a container, the Reagent "snaps" in, triggering the volumetric liquid calculation loop. 
- **Z-Index Spatial Clamping**: UI modals (like the critical Red Warning Modal for explosive drops) are strictly clamped via z-index algorithms to ensure they instantly freeze the underlying canvas raycasting, preventing users from dragging new objects while time is stopped.

### 5. WebGL Additive Blending Particle System
To render the violently exothermic reactions (like Alkali metals hitting water), standard React CSS animations are far too expensive on the CPU.

Chemic-AI offloads all explosive VFX to a dedicated, high-performance `requestAnimationFrame` canvas loop. 
- The engine supports hundreds of independent, physics-driven particles bouncing and fading at 60 FPS.
- We utilize **Additive Blending** (`ctx.globalCompositeOperation = 'lighter'`) for the rendering context. When multiple glowing sparks overlap mid-air, their RGB values sum together mathematically to create blinding white hot-spots, perfectly emulating actual incandescence and lens-flare phenomena.

### 6. Procedural Audio Synthesis (The Quantum Audio Gate)
Rather than relying solely on pre-recorded MP3 files, Chemic-AI generates real-time audio waveforms directly within the browser using the Web Audio API. By synthesizing dynamic sine oscillators and sweeping white-noise filters, the audio engine algorithmically builds the sound of "fizzing" and "explosions" based on the exact intensity of the chemical reaction. 

To comply strictly with modern browser autoplay protocols, the Quantum Audio Engine remains fully suspended until the user executes their first valid UI interaction, automatically unlocking the context asynchronously without dropping frames.

---

## 🛠️ Testing Environment
Chemic-AI employs a robust, fully automated **Playwright E2E testing architecture**.
Because we utilize custom raw pointer physics instead of native HTML APIs, our testing suite actively simulates frame-by-frame user cursor movements, mouse clicks, and drag intervals to physically test the bounds of the sandbox.

Run the test suite locally:
```bash
npm run dev
npx playwright test
```

## 🏆 RMIT TechCamp
Built by dedicated engineers striving for the absolute apex of performance, architectural elegance, and aesthetic beauty. Welcome to the future of chemical simulation.
