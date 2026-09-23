# Refine the startups hero video composition

## Scope
- Modify only the hero inside `src/routes/startups.tsx`.
- Preserve the existing content, report-download behavior, video source, marquee loop, synchronized scroll driver, motion values, refs, and every section after the hero.

## Changes
- Vertically center the existing sticky headline, report control, and metric block while pinned.
- Push the video farther down so the heading remains fully visible for most of the hero sequence.
- Constrain the video to a narrower centered column with responsive side space.
- Wrap the unchanged native video in a rounded, lightly dashed technical frame with contained vertical dashed guides.
- Keep the existing clearance-based fade and pointer-interaction protection unchanged so the text disappears before the video reaches it.

## Verification
- Use incremental Playwright mouse-wheel scrolling at 1440px and 390px.
- Confirm the heading remains centered and readable, the video/frame are narrow and rounded, the guides stay contained, and the sticky block releases naturally into Spark.
- Confirm no readable text/video collision, no horizontal overflow, unchanged CTA/video/marquee behavior, and no console errors.
- Run the project typecheck and confirm the preview build is clean.
- Do not deploy.
