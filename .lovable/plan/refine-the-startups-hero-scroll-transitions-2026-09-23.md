# Refine the Startups Hero Scroll Transitions

## Scope
- Change only the `/startups` hero inside `src/routes/startups.tsx`.
- Preserve all hero content, typography, CTA behavior, video settings, marquee logos and loop, navigation, and later sections.

## Implementation
- Replace the hero’s vertical overflow clipping with horizontal-only clipping so native sticky positioning works.
- Keep the MU logo in normal flow, then place the headline, report-download control, and startup metric in a responsive sticky text block.
- Keep the founder video in normal flow beneath it and add a subtle scroll-linked opacity and scale entrance using Framer Motion’s existing utilities.
- Add a one-time fade-and-lift entrance around the existing marquee without changing its continuous horizontal animation.
- Add a restrained hero-exit fade and scale to the sticky text, while disabling scroll transforms for reduced-motion users.

## Verification
- Scroll-test at 1440px and 390px for natural sticky release, smooth video reveal, navigation clearance, and no horizontal overflow.
- Run typecheck/build and inspect preview console/runtime errors.
- Do not publish or deploy.
