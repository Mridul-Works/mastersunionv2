# Match the Faculty closing section to Placements

## Scope
Rebuild only the Faculty page closing area beneath “The number that matters,” using the exact Placements contact/footer composition shown in the reference.

## Changes
- Replace the current full-screen closing block and campus image strip with the Placements-style dark stage.
- Place “Learn from the people doing it — not just studying it.” inside the same bordered, rounded glass surface used on Placements.
- Keep the Faculty actions inside that glass surface, using the same compact pill styling and spacing language.
- Render oversized “JOIN THE UNION” typography behind and beneath the glass surface, matching the reference overlap and scale across desktop and mobile.
- Keep the shared Placements footer immediately below, preserving its exact width, spacing, logo, columns, and legal row.
- Leave every earlier Faculty section unchanged.

## Technical details
- Reuse the existing Placements design-system classes and shared footer rather than approximating them.
- Remove the obsolete closing-strip image and any imports used only by the replaced layout.
- Preserve keyboard focus, responsive behavior, and reduced-motion handling.

## Verification
- Compare the Faculty closing area against the Placements reference at 1158×758 and mobile widths.
- Confirm the glass panel overlaps the background words cleanly, the footer begins at the same visual boundary, and no text clips or overflows.
- Confirm both calls to action work and the preview remains error-free.
