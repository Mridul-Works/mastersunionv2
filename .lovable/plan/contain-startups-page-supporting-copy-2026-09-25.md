# Contain startups-page supporting copy

## Scope
- Update only `src/routes/startups.tsx`.
- Keep all wording, section order, typography families, colors, media, and interactions unchanged.

## Changes
- Apply consistent readable line-length limits to paragraphs and supporting copy across every section.
- Keep text aligned with its current section or card container, centered where currently centered and left-aligned where currently left-aligned.
- Add safe width constraints inside cards, story panels, and full-width sections so long copy cannot stretch or shift surrounding layouts.
- Preserve existing responsive behavior while ensuring containment from mobile through wide desktop.

## Validation
- Check the full page with real scrolling on desktop, tablet, and mobile.
- Confirm no clipped copy, horizontal overflow, layout jumps, console errors, or build errors.
