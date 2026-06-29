## What & why

Matelibre's signature feel = buttery smooth-scroll + pinned horizontal/curtain reveals via Locomotive Scroll. Right now the page uses native scroll plus a custom scroll-lock and a GSAP ScrollTrigger pin in `TenThings`. Locomotive Scroll v4 takes over scrolling with a transformed virtual scroller, so it can't just be dropped in — every "scroll" consumer has to switch to its API.

## Changes

**1. Add a global smooth-scroll provider**
- New `src/components/SmoothScroll.tsx` that, on mount, initializes `new LocomotiveScroll({ el: document.querySelector('[data-scroll-container]'), smooth: true, lerp: 0.08, multiplier: 0.9 })`.
- Exposes the instance via a small context (`useLocoScroll()`) so child components can call `scroll.stop()` / `scroll.start()` / `scroll.scrollTo()`.
- Imports Locomotive's CSS once.

**2. Wrap routes in the scroll container**
- In `src/routes/__root.tsx`, mount `<SmoothScroll>` and give the main wrapper `data-scroll-container`.
- Import Locomotive CSS at the root.

**3. Rewire `src/routes/index.tsx`**
- Replace the `window.addEventListener('scroll'|'wheel'|'touchmove'|'keydown')` lock with Locomotive's `scroll.on('scroll', …)` + `scroll.stop()` / `scroll.start()` so the lock works inside the virtual scroller.
- Replace `window.scrollTo` (used by Rewatch + the upward clamp) with `scroll.scrollTo(target, { duration, disableLerp: false })`.
- Mark the sticky video section with `data-scroll data-scroll-sticky data-scroll-target="#hero-curtain"` (Locomotive breaks native `position: sticky`, so the curtain effect has to use Locomotive's sticky API).
- Keep the dark header / nav reveal logic — read scroll position from Locomotive's `scroll` event instead of `window.scrollY`.

**4. Make the TenThings reveal Locomotive-aware**
- Hook ScrollTrigger into Locomotive via `ScrollTrigger.scrollerProxy('[data-scroll-container]', { scrollTop, getBoundingClientRect })` and `scroll.on('scroll', ScrollTrigger.update)`.
- Pass `scroller: '[data-scroll-container]'` to the existing `ScrollTrigger` in `TenThings.tsx` so the pin + xPercent reveal of the 10-things widget still fires correctly under the virtual scroller.
- Add `ScrollTrigger.addEventListener('refresh', () => scroll.update())` and call `ScrollTrigger.refresh()` after init.

**5. SSR / route changes**
- Initialize Locomotive only on the client (guarded by `typeof window !== 'undefined'` in a `useEffect`).
- Destroy and re-create the instance on route change (`useRouterState`) so per-page sections register correctly.

## Risks / known tradeoffs

- Locomotive v4 is no longer actively maintained — fine for this look, but worth flagging. If you'd rather use Lenis (the modern equivalent the studios that originally built matelibre have since moved to), I can swap it in instead with a near-identical API.
- Every `position: sticky`, `100vh`, and `window.scrollY` reference on the site has to move to Locomotive's equivalents, or it'll silently stop working — covered above for the current sections, but any future section needs the `data-scroll-*` attributes.

OK to proceed with Locomotive, or want Lenis instead?
