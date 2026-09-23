# Redesign the Startups Hero

## Scope
- Change only the `/startups` hero block in `src/routes/startups.tsx`.
- Add the uploaded `founders.mp4` as a hosted asset pointer under `src/assets`.
- Leave the floating navigation and every section after the hero unchanged.

## Implementation
- Replace the pinned photo-and-grid hero with a natural-height, plain dark composition.
- Preserve the current logo styling, exact two-line headline copy and auto-fit sizing logic, typography, colors, and report-download behavior.
- Center the headline, existing startup/valuation line, and report-download control.
- Add the uploaded founder film as a paused inline native video with controls and intrinsic responsive sizing.
- Add a slow, seamless marquee below the video using the existing 16 venture logos; disable movement for reduced-motion users.
- Remove only the hero’s old background photo, decorative grid/diamonds, supporting paragraph, scroll indicator, and scroll-linked fade.

## Verification
- Check 1440px, 1024px, 768px, and 390px layouts for alignment, native video controls, marquee containment, and horizontal overflow.
- Run the project typecheck/build checks and inspect preview console errors.
- Do not publish or deploy.
