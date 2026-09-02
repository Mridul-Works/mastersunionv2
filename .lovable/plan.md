# Placements Page Responsive Optimization

## Scope

Optimize the existing Placements page for fluid behavior from 320px through 1920px without changing its content, visual language, section order, animations, or interactions.

## Implementation

1. **Global responsive foundation**
   - Unify page gutters and section padding with fluid `clamp()` values.
   - Add min-width safeguards and overflow containment only where needed.
   - Preserve the current maximum content width and desktop alignment.

2. **Hero, podcast, and navigation**
   - Scale hero typography, copy, spacing, and CTA sizing for short and narrow screens while retaining the pinned transition.
   - Keep the podcast two-column composition on desktop and stack it cleanly at narrower widths.
   - Make the video rail, episode label, subscribe control, and bottom navigation touch-safe and non-clipping.

3. **Outcome data and charts**
   - Reflow audited metrics and report cards at intermediate widths.
   - Make salary bars, donut, legends, placement-stat charts, and cohort data remain legible without label collisions.
   - Preserve intentional horizontal scrolling for wide cohort ledgers while preventing page-level overflow.

4. **Recruiters and career transitions**
   - Adapt recruiter category controls and logo grids without distorting logos.
   - Preserve sticky transition chapters on wide screens and switch to a readable vertical/mobile presentation before the split becomes cramped.

5. **Career experience sections**
   - Stabilize the student story, 52-card professional guidance grid, roadmap, coach tabs/cards, leadership cards, contact strip, and closing CTA at intermediate and mobile widths.
   - Ensure grids reduce columns naturally and long names, roles, quotes, and email text wrap safely.

6. **Dialogs and touch behavior**
   - Constrain the report modal and video dialog to the dynamic viewport, enable safe internal scrolling, and stack the report image/form when required.
   - Keep close/maximize controls inset and all interactive targets usable on touch devices.

## Technical Details

- Prefer scoped responsive CSS in `src/styles.css` and minimal class adjustments in existing Placements components.
- Use content-driven intermediate breakpoints in addition to the existing framework breakpoints.
- Preserve current desktop rules at 1280px and above unless a verified overflow defect requires correction.
- Do not change data, text, media, visual tokens, or interaction logic.

## Validation

- Run automated viewport checks at 320, 360, 375, 390, 414, 480, 600, 768, 820, 1024, 1280, 1440, 1600, and 1920px.
- Inspect representative full-page regions at mobile, tablet, laptop, and large desktop sizes.
- Test the placement-report modal, video modal/maximize control, podcast rail, category tabs, carousel controls, and sticky transition behavior.
- Confirm no page-level horizontal overflow, clipped text, overlapping controls, distorted imagery, unexpected internal scrollbars, build errors, or desktop regressions.