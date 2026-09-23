# Redesign the Dropshipping video collage

## Goal
Apply the selected High-Contrast Editorial Collage direction to the existing Dropshipping Challenge video experience without changing its content, sources, or native-scroll behavior.

## Changes
- Keep one dominant portrait video as the central visual anchor.
- Recompose the other four videos as a sharper asymmetric editorial collage with stronger scale contrast and deliberate left/right placement.
- Add restrained monochrome editorial framing, episode indexing, an active-video progress indicator, and oversized outlined typography derived from the selected direction.
- Preserve every video source, YouTube playback, native controls, reverse scrolling, and reduced-motion fallback.
- Keep the existing section heading, approved copy, metrics, and later content unchanged.
- Adapt the composition for tablet and mobile without horizontal overflow.

## Technical details
- Modify only `src/routes/startups.tsx`.
- Continue using the existing `onScrollFrame` mechanism; no scroll hijacking or new animation library.
- Use existing semantic colors and typography tokens rather than adding global styles.

## Validation
- Test real forward and reverse wheel scrolling at desktop, tablet, and mobile widths.
- Confirm all five videos remain reachable and playable.
- Check active indexing, card framing, reduced-motion behavior, overflow, console errors, and build status.
- Do not publish or deploy.
