# Dropshipping video collage

## Goal
Turn the five-video row into a scroll-led editorial collage where one portrait video holds the center and the remaining videos arrive from the sides, scale into place, and vary in size.

## What will change
- Keep the Dropshipping heading, copy, video sources, playback behavior, metrics, and later content unchanged.
- Replace the current horizontal five-card row with a taller scroll runway.
- Keep one dominant portrait card sticky at the center of the viewport.
- As the page scrolls, bring the other four cards in from alternating left and right positions with different portrait proportions and sizes.
- Animate each arriving card from smaller to full size, layering the sequence as a controlled collage without transparency or overlap that blocks the active video.
- Keep normal page scrolling and reverse the sequence naturally when scrolling upward.
- On smaller screens, retain the centered sticky card and use tighter, viewport-safe side offsets so the collage never creates sideways scrolling.
- Respect reduced-motion settings by showing a stable, centered collage without scroll-linked movement.

## Technical details
- Modify only `src/routes/startups.tsx`.
- Use the existing `onScrollFrame` driver and element geometry rather than adding a library or scroll hijacking.
- Reuse the current local and YouTube video rendering behavior.
- Keep stable card dimensions and rounded frames while allowing controlled size variation.

## Validation
- Verify real scrolling and reverse scrolling at desktop, tablet, and mobile widths.
- Confirm only the first card is initially prominent, later cards arrive from alternating sides and zoom into place, and videos remain usable.
- Check for clipping, horizontal overflow, unintended transparency, console errors, and build errors.
- Do not publish or deploy.
