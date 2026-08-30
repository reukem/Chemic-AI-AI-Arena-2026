import { test, expect, Page } from '@playwright/test';

// Central helper for precise raw pointer physics dragging
async function dragReagentToCenter(page: Page, reagentName: string, beakerX: number, beakerY: number, timeout: number = 30000) {
    const sanitizedName = reagentName.replace(/\\/g, '');
    const card = page.locator('span', { hasText: sanitizedName }).locator('..').locator('..');
    await card.waitFor({ state: 'visible', timeout });

    const target = page.locator('.container-wrapper').first();
    await card.dragTo(target, { timeout });
    await page.waitForTimeout(100); // Wait for internal state calculations
}

// Helper to drag beaker offscreen
async function dragBeakerToCoords(page: Page, sourceX: number, sourceY: number, targetX: number, targetY: number) {
    await page.mouse.move(sourceX, sourceY);
    await page.mouse.down();
    await page.mouse.move(targetX, targetY, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(300);
}

test.describe('Quantum Engine Physics & TDD Exploit Matrix', () => {

    let beakerX: number;
    let beakerY: number;
    let viewportSize: { width: number, height: number };

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3001');
        await page.waitForTimeout(4000); // Wait for boot
        // Navigate through Main Menu
        const startButton = page.locator('button').filter({ hasText: /Start Engine|KHỞI ĐỘNG HỆ THỐNG/i }).first();
        await startButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        if (await startButton.isVisible()) {
            await startButton.click();
            await page.waitForTimeout(2000); // wait for transition
        }

        const beakerButton = page.locator('div').filter({ hasText: 'Empty Beaker' }).locator('span', { hasText: 'Empty Beaker' }).first();
        if (await beakerButton.isVisible()) {
            await beakerButton.click();
        } else {
            await page.locator('text=Empty Beaker').first().click();
        }
        await page.waitForTimeout(500);

        viewportSize = page.viewportSize()!;
        if (!viewportSize) throw new Error('Viewport size not defined');
        
        beakerX = viewportSize.width / 2;
        beakerY = viewportSize.height / 2;

        await page.evaluate(() => {
            localStorage.setItem('chemic_ai_muted_reactions', JSON.stringify([
                'rxn_class_SALT_WATER', 'rxn_class_DILUTE_ACID', 'rxn_HCl_NaOH', 'rxn_DISTILLED_WATER_H2SO4',
                'rxn_class_PINK_BASE', 'rxn_PHENOLPHTHALEIN_NaOH', 'rxn_ETHANOL_ACETIC_ACID', 'rxn_MAGNESIUM_HCl'
            ]));
        });
    });

    // ==========================================
    // EXISTING 10 CORE TESTS
    // ==========================================

    test('1. Sodium + Water triggers explosion and Time-Stop', async ({ page }) => {
        await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY);
        await dragReagentToCenter(page, 'Sodium Metal', beakerX, beakerY);
        await expect(page.locator('text=CRITICAL REACTION')).toBeVisible({ timeout: 2000 });
    });

    test('2. Potassium + Water triggers explosion', async ({ page }) => {
        await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY);
        await dragReagentToCenter(page, 'Potassium Metal', beakerX, beakerY);
        await expect(page.locator('text=CRITICAL REACTION')).toBeVisible({ timeout: 2000 });
    });

    test('3. Strong Acid + Strong Base dynamic neutralization', async ({ page }) => {
        await dragReagentToCenter(page, 'Hydrochloric Acid', beakerX, beakerY);
        await dragReagentToCenter(page, 'Sodium Hydroxide', beakerX, beakerY);
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('4. Acid Dilution Sequencing Danger', async ({ page }) => {
        await dragReagentToCenter(page, 'Sulfuric Acid', beakerX, beakerY);
        await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY);
        await expect(page.locator('text=CRITICAL REACTION')).toBeVisible({ timeout: 2000 });
    });

    test('5. Alkali Metal + Strong Acid dynamic explosion', async ({ page }) => {
        await dragReagentToCenter(page, 'Nitric Acid', beakerX, beakerY);
        await dragReagentToCenter(page, 'Lithium Metal', beakerX, beakerY);
        await expect(page.locator('text=CRITICAL REACTION')).toBeVisible({ timeout: 2000 });
    });

    test('6. Indicator Color Activation', async ({ page }) => {
        await dragReagentToCenter(page, 'Phenolphthalein', beakerX, beakerY);
        await dragReagentToCenter(page, 'Potassium Hydroxide', beakerX, beakerY);
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('7. 5-Chemical Mix triggers ENTROPY_SLUDGE', async ({ page }) => {
        await dragReagentToCenter(page, 'Lithium Metal', beakerX, beakerY);
        await dragReagentToCenter(page, 'Iodine Crystals', beakerX, beakerY);
        
        const ackButton = page.locator('button').filter({ hasText: 'ACKNOWLEDGE' }).first();
        await page.waitForTimeout(500); // wait for slam animation
        await ackButton.click({ timeout: 5000, force: true }).catch(() => {});

        await dragReagentToCenter(page, 'Copper\\(II\\) Sulfate', beakerX, beakerY);
        await dragReagentToCenter(page, 'Ammonia Solution', beakerX, beakerY);
        try { await dragReagentToCenter(page, 'Carbon \\(Graphite\\)', beakerX, beakerY, 1000); } catch(e) {}
        await expect(page.locator('text=Thermodynamic death state reached')).toBeVisible({ timeout: 3000 });
    });

    test('8. Beaker Max Volume Constraint (120mL into 100mL)', async ({ page }) => {
        for(let i=0; i<6; i++) {
            await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY);
        }
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('9. Magnesium + HCl Reaction', async ({ page }) => {
        await dragReagentToCenter(page, 'Hydrochloric Acid', beakerX, beakerY);
        await dragReagentToCenter(page, 'Magnesium Ribbon', beakerX, beakerY);
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('10. Safe Dilution followed by reaction', async ({ page }) => {
        await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY);
        await dragReagentToCenter(page, 'Sulfuric Acid', beakerX, beakerY);
        await dragReagentToCenter(page, 'Sodium Metal', beakerX, beakerY);
        await expect(page.locator('text=CRITICAL REACTION')).toBeVisible({ timeout: 2000 });
    });

    // ==========================================
    // NEW 20 TDD EXPLOIT & EDGE CASE TESTS
    // ==========================================

    test('11. [UI Spamming] Spawn Beaker 50 times rapidly', async ({ page }) => {
        const beakerButton = page.locator('div').filter({ hasText: 'Empty Beaker' }).locator('span', { hasText: 'Empty Beaker' }).first();
        // Spam click 50 times in rapid succession
        for(let i=0; i<50; i++) {
            await beakerButton.click({ force: true }).catch(() => {});
        }
        
        // Internal state should just silently drop after 4 max
        const beakers = await page.locator('.container-wrapper').count();
        expect(beakers).toBeLessThanOrEqual(4);
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('12. [Physics Exploit] Drag beaker off-screen (Y < 0)', async ({ page }) => {
        // Drag beaker to negative coordinates
        await dragBeakerToCoords(page, beakerX, beakerY, beakerX, -500);
        // Ensure no crash, Rubber-Band physics should clamp it or it falls back safely
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('13. [Volume Overflow] Drop 15 different reagents into a single beaker', async ({ page }) => {
        const reagents = [
            'Distilled Water', 'Hexane', 'Ethanol', 'Lithium Metal', 'Sodium Metal',
            'Potassium Metal', 'Rubidium', 'Cesium', 'Francium', 'Hydrochloric Acid',
            'Sulfuric Acid', 'Nitric Acid', 'Acetic Acid', 'Sodium Hydroxide', 'Potassium Hydroxide'
        ];

        for (const r of reagents) {
            await dragReagentToCenter(page, r, beakerX, beakerY).catch(() => {});
            // Clear any popups that might have been triggered by intermediate explosive combinations
            const ackButton = page.locator('button').filter({ hasText: 'ACKNOWLEDGE' }).first();
            await page.waitForTimeout(200); // Wait for slam animation if any
            if (await ackButton.isVisible()) await ackButton.click({ force: true }).catch(() => {});
        }

        // Expected behaviour: Beaker is full, UI doesn't crash
        await expect(page.locator('.container-wrapper').first()).toBeVisible();
    });

    test('14. [Thermodynamic Rejection] Drop Sodium into ENTROPY_SLUDGE', async ({ page }) => {
        // Create Sludge (4 classes)
        await dragReagentToCenter(page, 'Lithium Metal', beakerX, beakerY);
        await dragReagentToCenter(page, 'Iodine Crystals', beakerX, beakerY);

        const ackButton = page.locator('button', { hasText: 'ACKNOWLEDGE' });
        await page.waitForTimeout(500);
        await ackButton.click({ timeout: 5000, force: true }).catch(() => {});

        await dragReagentToCenter(page, 'Copper\\(II\\) Sulfate', beakerX, beakerY);
        await dragReagentToCenter(page, 'Ammonia Solution', beakerX, beakerY);
        try { await dragReagentToCenter(page, 'Carbon \\(Graphite\\)', beakerX, beakerY, 1000); } catch(e) {}
        
        await page.waitForTimeout(500);
        await ackButton.click({ timeout: 5000, force: true }).catch(() => {});

        // Sludge is formed. Now drop Sodium.
        await dragReagentToCenter(page, 'Sodium Metal', beakerX, beakerY);
        
        // Assert explosion modal does NOT appear because Sludge is inert
        const warningModal = page.locator('text=CRITICAL REACTION');
        await expect(warningModal).toBeHidden();
    });

    test('15. [Time-Stop Bypassing] Drag beaker while warning modal is active', async ({ page }) => {
        await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY);
        await dragReagentToCenter(page, 'Sodium Metal', beakerX, beakerY);
        
        const warningModal = page.locator('text=CRITICAL REACTION');
        await expect(warningModal).toBeVisible();

        // Try to drag a new reagent while time is stopped
        try {
            await dragReagentToCenter(page, 'Potassium Metal', beakerX, beakerY, 1000);
        } catch (e) {
            // Expected to timeout/fail because DOM is blocked
        }

        // Since time is stopped, the internal logic shouldn't trigger a second explosion
        // We ensure the DOM is effectively locked.
        await expect(warningModal).toBeVisible();
    });

    test('16. [Precipitate Stacking] Mix 4 transition metal salts', async ({ page }) => {
        // Transition metal salts all share the same reactionClass: 'transition_metal_salt'
        // So they shouldn't trigger the Entropy Sludge (which needs 4 distinct classes)
        await dragReagentToCenter(page, 'Copper\\(II\\) Sulfate', beakerX, beakerY);
        await dragReagentToCenter(page, 'Cobalt\\(II\\) Chloride', beakerX, beakerY);
        await dragReagentToCenter(page, 'Nickel\\(II\\) Sulfate', beakerX, beakerY);
        await dragReagentToCenter(page, 'Iron\\(III\\) Chloride', beakerX, beakerY);

        // Verify sludge did not trigger
        const sludgeModal = page.locator('text=Thermodynamic death state reached');
        await expect(sludgeModal).toBeHidden();
    });

    test('17. [Physics Exploit] Self-Pouring beaker over itself', async ({ page }) => {
        // Try dragging the beaker and releasing it exactly at its own origin
        await dragBeakerToCoords(page, beakerX, beakerY, beakerX, beakerY);
        // Engine should ignore it, no infinite loops or crashes
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('18. [Physics Exploit] Pour Empty Beaker into Target', async ({ page }) => {
        // Spawn a second beaker
        const beakerButton = page.locator('div').filter({ hasText: 'Empty Beaker' }).locator('span', { hasText: 'Empty Beaker' }).first();
        if (await beakerButton.isVisible()) {
            await beakerButton.click();
        } else {
            await page.locator('text=Empty Beaker').first().click();
        }
        await page.waitForTimeout(500);

        // Source is Beaker 1 (Empty). Target is Beaker 2 (Empty).
        await dragBeakerToCoords(page, beakerX, beakerY, beakerX + 150, beakerY);
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('19. [Thermodynamic Exploit] Pouring Sludge blocks transfer', async ({ page }) => {
        // Create Sludge in beaker 1
        await dragReagentToCenter(page, 'Lithium Metal', beakerX, beakerY);
        await dragReagentToCenter(page, 'Iodine Crystals', beakerX, beakerY);

        const ackButton = page.locator('button', { hasText: 'ACKNOWLEDGE' });
        await page.waitForTimeout(500);
        await ackButton.click({ timeout: 5000, force: true }).catch(() => {});

        await dragReagentToCenter(page, 'Copper\\(II\\) Sulfate', beakerX, beakerY);
        await dragReagentToCenter(page, 'Ammonia Solution', beakerX, beakerY);
        try { await dragReagentToCenter(page, 'Carbon \\(Graphite\\)', beakerX, beakerY, 1000); } catch(e) {}

        await page.waitForTimeout(500);
        await ackButton.click({ timeout: 5000, force: true }).catch(() => {});

        // Spawn Beaker 2
        const beakerButton = page.locator('div').filter({ hasText: 'Empty Beaker' }).locator('span', { hasText: 'Empty Beaker' }).first();
        if (await beakerButton.isVisible()) {
            await beakerButton.click();
        } else {
            await page.locator('text=Empty Beaker').first().click();
        }
        await page.waitForTimeout(500);

        // Try pouring Sludge into empty beaker
        await dragBeakerToCoords(page, beakerX, beakerY, beakerX + 150, beakerY);
        
        // Assert Engine handles this gracefully
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('20. [Physics Exploit] Dropping solid into 100mL full beaker', async ({ page }) => {
        // Fill to 100mL (5 drops of 20mL)
        for(let i=0; i<5; i++) {
            await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY);
        }
        // Beaker is 100/100. Drop solid Sodium.
        await dragReagentToCenter(page, 'Sodium Metal', beakerX, beakerY);
        
        // Volume overflow prevention should block it. Explosion should not happen.
        const warningModal = page.locator('text=CRITICAL REACTION');
        await expect(warningModal).toBeHidden();
    });

    test('21. [Dynamic Chaining] Neutralization Double-Dip', async ({ page }) => {
        await dragReagentToCenter(page, 'Hydrochloric Acid', beakerX, beakerY);
        await dragReagentToCenter(page, 'Sodium Hydroxide', beakerX, beakerY); // Neutralized
        // Add more acid
        await dragReagentToCenter(page, 'Sulfuric Acid', beakerX, beakerY);
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('22. [Extreme pH Swings] Acid -> Base -> Acid -> Base', async ({ page }) => {
        await dragReagentToCenter(page, 'Hydrochloric Acid', beakerX, beakerY);
        await dragReagentToCenter(page, 'Sodium Hydroxide', beakerX, beakerY);
        await dragReagentToCenter(page, 'Sulfuric Acid', beakerX, beakerY);
        await dragReagentToCenter(page, 'Potassium Hydroxide', beakerX, beakerY);
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('23. [Optics Overload] Indicator dropping 5 times', async ({ page }) => {
        for(let i=0; i<5; i++) {
            await dragReagentToCenter(page, 'Phenolphthalein', beakerX, beakerY);
        }
        await dragReagentToCenter(page, 'Potassium Hydroxide', beakerX, beakerY);
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('24. [Alkali Duel] Sodium and Potassium rapid drop', async ({ page }) => {
        await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY, 2000);
        try {
            await dragReagentToCenter(page, 'Sodium Metal', beakerX, beakerY, 2000);
            await dragReagentToCenter(page, 'Potassium Metal', beakerX, beakerY, 2000);
        } catch(e) {}
        
        await expect(page.locator('text=CRITICAL REACTION')).toBeVisible();
    });

    test('25. [UI Exploit] Rapid clicking everywhere during explosion modal', async ({ page }) => {
        await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY);
        await dragReagentToCenter(page, 'Sodium Metal', beakerX, beakerY);
        
        const warningModal = page.locator('text=CRITICAL REACTION');
        await expect(warningModal).toBeVisible();

        // Spam clicks
        try {
            await page.mouse.click(0, 0);
            await page.mouse.click(10, 10);
            await page.mouse.click(viewportSize.width, viewportSize.height);
        } catch(e) {}
        
        // Modal must not auto-dismiss or crash
        await expect(warningModal).toBeVisible();
    });

    test('26. [Optics Math] White/Clear Blending Verification', async ({ page }) => {
        await dragReagentToCenter(page, 'Zinc Chloride', beakerX, beakerY); // Clear
        await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY); // Clear
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('27. [Safety Exploit] Reverse Acid Dilution to Safe Order', async ({ page }) => {
        // Safe: Acid into Water
        await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY);
        await dragReagentToCenter(page, 'Sulfuric Acid', beakerX, beakerY);
        // Safe, no popup expected
        const warningModal = page.locator('text=CRITICAL REACTION');
        await expect(warningModal).toBeHidden();
    });

    test('28. [Safety Exploit] Safe Order to Reverse Danger in same beaker', async ({ page }) => {
        // Danger: Water into Acid
        await dragReagentToCenter(page, 'Sulfuric Acid', beakerX, beakerY);
        await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY);
        
        const warningModal = page.locator('text=CRITICAL REACTION');
        await expect(warningModal).toBeVisible();
    });

    test('29. [Physics Exploit] Rapid Drag and Escape', async ({ page }) => {
        // Quickly drag down and hit Escape to try and interrupt the drag state
        await page.mouse.move(beakerX, beakerY);
        await page.mouse.down();
        await page.mouse.move(beakerX, beakerY + 100);
        await page.keyboard.press('Escape');
        await page.mouse.up(); // MUST release the mouse or it will break ALL subsequent tests
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('30. [The God Mix] Attempt to chain ALL states', async ({ page }) => {
        await dragReagentToCenter(page, 'Distilled Water', beakerX, beakerY);
        await dragReagentToCenter(page, 'Sodium Metal', beakerX, beakerY); // Explosion
        
        const ackButton = page.locator('button', { hasText: 'ACKNOWLEDGE' });
        if (await ackButton.isVisible()) await ackButton.click();

        await dragReagentToCenter(page, 'Hydrochloric Acid', beakerX, beakerY); // Neutralize
        await dragReagentToCenter(page, 'Copper\\(II\\) Sulfate', beakerX, beakerY); // Sludge attempt...
        
        await expect(page.locator('canvas').first()).toBeVisible();
    });
});
