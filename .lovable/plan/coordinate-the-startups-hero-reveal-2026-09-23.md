# Coordinate the startups hero reveal

## Scope
- Modify only `src/routes/startups.tsx`.
- Keep all hero content, CTA behavior, sticky layout, video, marquee, and later sections unchanged.

## Fix
- Measure the pinned text block and video wrapper in the existing synchronized scroll frame.
- Drive the text fade/scale from the live clearance between the text bottom and video top, so fading begins before collision and completes before overlap.
- Disable pointer interaction once the text is effectively faded, restoring it when scrolling back.
- Keep reduced-motion behavior static and fully readable.

## Verification
- Use incremental Playwright mouse-wheel scrolling at 1440px and 390px.
- Capture several hero states and confirm the video never visibly intersects readable hero text or the report control.
- Confirm reverse scrolling, no horizontal overflow, unchanged report downloads/video/marquee, no console errors, and passing typecheck/build.
- Do not deploy.
