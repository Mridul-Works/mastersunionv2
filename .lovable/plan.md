# Apply the UG v2.0 Visual System to Careers & Placements

## Scope
Restyle the current Careers & Placements page using the visual language from “Program Layout - UG v2.0,” while preserving all existing page content, data, section order, media, interactions, and scroll behavior.

## Changes
- Apply the reference typography hierarchy: light-weight display headings, restrained body copy, technical mono labels, and editorial italic accents.
- Match the reference sizing rhythm across hero, section headings, descriptions, labels, and supporting text, with responsive scaling.
- Replace current page-specific CTA treatments with the reference rounded accent and outlined pill styles, including their subtle lift and color transitions.
- Adopt the reference bottle-green accent treatment for italic emphasis, active states, rules, chart highlights, and interactive feedback while retaining accessible contrast on the dark page.
- Standardize page containers to the reference `1320px` content width and responsive `16px / 24px / 40px` gutters.
- Restyle metric strips as full-width, rule-separated rails with restrained hover backgrounds and an accent line reveal, without changing any metric values.
- Apply the reference hover language to applicable cards, tabs, rows, links, and category controls: subtle lift, border emphasis, and smooth 350–700ms easing.
- Replace page divider treatments with the reference fine edge rule: neutral fades at the sides with a bottle-green center accent.

## Technical details
- Scope all overrides beneath the placements page root so other routes remain unchanged.
- Add reusable placements-page utility classes in `src/styles.css` and make targeted class updates in `src/routes/placements.tsx`.
- Reuse the current Inter, Fraunces, and JetBrains Mono font loading; no new dependencies or assets.
- Preserve reduced-motion behavior, keyboard focus states, modal functionality, podcast controls, charts, tables, recruiter filters, and report downloads.

## Verification
- Compare the live page at desktop and mobile widths against the reference system.
- Verify CTA hover/focus, metric-strip hover, recruiter tabs, charts, tables, and section dividers.
- Confirm no content or behavior changed and the build remains clean.
