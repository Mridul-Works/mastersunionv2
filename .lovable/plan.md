# Salary Distribution + Components Redesign

## Scope
Redesign only the salary visualization band immediately below Placement Statistics. Keep every other page section, interaction, and dataset unchanged.

## Changes
- Replace the current light salary band with one cohesive dark editorial section using the existing placements-page typography, white text, green accent, thin rules, and spacing system.
- Use the exact supplied Salary Distribution data: ₹20–25L (21.02%), ₹25–30L (33.76%), ₹30–35L (17.20%), ₹35–40L (8.28%), and ₹40L+ (19.75%).
- Build the distribution as a responsive five-column extruded chart with visible front/top/side depth, baseline and scale context, animated entry, and accessible labels. Hover/focus will lift and slightly scale the active column over 450ms, introduce a restrained green highlight, and emphasize its percentage.
- Replace the existing salary-component data with the exact supplied values: Avg. Base — 81% — ₹27.16 Lakh; Avg. Variable — 13% — ₹4.34 Lakh; Avg. ESOPs — 6% — ₹2 Lakh.
- Build the components graphic as an interactive SVG donut with a refined legend. Hovering or keyboard-focusing either a segment or its matching legend row will offset the segment outward and highlight the corresponding label/value with the existing green accent over 450ms.
- Preserve reduced-motion behavior by showing final chart states without transforms or animated drawing when motion reduction is enabled.

## Technical details
- Keep the work scoped to `src/routes/placements.tsx` and narrowly prefixed styles in `src/styles.css`.
- Use React state to synchronize chart segments with their labels, semantic buttons for interactive legend rows, and SVG titles/ARIA labels for chart accessibility.
- Reuse the existing `Reveal`, `CountUp`, `useInView`, and `useReducedMotion` primitives; add no dependencies.
- Keep responsive dimensions stable so labels and charts do not shift or overlap on mobile, tablet, or desktop.

## Verification
- Confirm all eight supplied values render exactly.
- Verify bar and donut hover/focus states, reduced-motion behavior, and responsive layouts in the live preview.
- Confirm the project build remains clean and no surrounding section changes visually or structurally.
