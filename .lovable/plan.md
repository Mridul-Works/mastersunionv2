# OutClass, Dropshipping, and VIP editorial redesign

## Goal
Redesign only the three sections immediately after Spark so they read as one progression: notice a problem, act on it, test it with customers, then build it into a company. Preserve Spark and every later section unchanged.

## What will change

### 1. OutClass — vertical editorial reveal
- Keep the approved eyebrow and headline exactly as requested.
- Recompose the approved OutClass explanation into three numbered moments: **Run**, **Launch**, and **Build**.
- Pair each moment with a large number, concise approved line, and polished media placeholder.
- Use normal page scrolling with subtle in-view emphasis: the current moment strengthens while earlier moments remain visible for context.
- On mobile, render the same sequence as a clean vertical stack without pinned or horizontal behavior.

### 2. Dropshipping Challenge — cinematic proof
- Keep the approved challenge copy and existing metrics, with the requested headline **Build. Launch. Sell.**
- Make the available venture video the dominant media area with native playback controls, no autoplay, and responsive containment.
- Arrange the three metrics as one editorial result band rather than identical cards, preserving the exact values and labels.
- Retain the four approved top performers as a touch-friendly horizontal venture rail, using placeholders where no real logo or product image exists.
- Keep the media rail subordinate to the main video so the section has one clear visual anchor.

### 3. VIP — scroll-driven venture journey
- Use the requested headline **From Idea to Demo Day** while preserving the approved VIP description and all existing stage details, grants, and Demo Day investor proof.
- Replace the static stage grid with a progressive journey: Pre-Seed → MVP → Go-to-Market → Product-Market Fit → Demo Day.
- On desktop, normal page scrolling advances the active stage across a horizontal track; completed stages remain visible and the supporting copy changes with progress.
- On tablet, simplify the progression while retaining the active/completed hierarchy.
- On mobile, use a vertical progression or touch-friendly stage rail so no desktop horizontal behavior is forced onto the viewport.
- Preserve the existing Startup Challenge episode strip beneath the VIP journey.

## Connected transitions
- Add restrained transition copy and rule treatments between the three sections using the existing Masters’ Union colors, gutters, typography, gradients, and border language.
- Keep each section visually distinct: vertical reveal, cinematic video, then stage progression.
- Do not introduce new fonts, colors, navigation, shared styles, routes, or assets.

## Technical details
- Modify only `src/routes/startups.tsx`.
- Build small local section components and scroll-state hooks inside that file; respect reduced-motion preferences.
- Reuse the existing reveal behavior, semantic tokens, controls, approved content arrays, placeholders, and available venture media.
- Keep normal document scrolling and prevent horizontal overflow.

## Validation
- Verify at 1440px, 1024px, 768px, and 390px.
- Confirm Spark still reaches and holds SeedsAI before release.
- Confirm OutClass emphasis, video playback/controls, VIP progress and reverse scrolling, touch rails, and mobile fallbacks.
- Check for overflow, clipped text, navigation overlap, missing assets, runtime/console errors, and build errors.
- Do not publish or deploy.
