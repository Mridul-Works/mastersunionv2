# Add the post-Spark entrepreneurship video

## Goal
Insert the uploaded student entrepreneurship video immediately after the Spark scroll story, without changing Spark or any later section.

## Implementation
- Upload the provided MP4 through the existing project asset system and add only its generated asset pointer.
- Add a media-only section between Spark and The Outclass using the existing page gutters and dark editorial styling.
- Render a responsive native `<video>` with `controls`, `playsInline`, and `preload="metadata"`; omit autoplay, muted autoplay, and loop.
- Reveal the video container once on viewport entry with the existing Framer Motion pattern: subtle opacity and upward movement, reduced to a simple state change when reduced motion is enabled.
- Preserve the source video aspect ratio so it stays inside page margins at desktop, tablet, and mobile widths.

## Validation
- Run the focused TypeScript check and production build.
- Test at 1440px, 1024px, 768px, and 390px for Spark release, video placement, paused state, native controls, playback, responsive fit, overflow, and console errors.

## Scope
- Modify `src/routes/startups.tsx`.
- Add the minimum generated `.asset.json` pointer for the uploaded video.
- Do not alter shared files, other routes, configuration, or publishing state.
