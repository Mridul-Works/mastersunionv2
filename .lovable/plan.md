# Startup page editorial redesign

## Goal
Restyle every section below the existing startup hero to match the selected “Editorial ecosystem flow” direction and the referenced Masters’ Union homepage/programme language. The hero remains unchanged.

## Visual system
- Use a continuous near-black editorial canvas with the project’s existing Masters’ Union green accent.
- Match the homepage’s light-weight sans-serif typography, compact mono labels, controlled headline scale, and selective serif-italic company names.
- Replace alternating pale bands with subtle black surface shifts, fine rules, restrained borders, and consistent spacing.
- Use asymmetric editorial rails: alternating text/media proportions, oversized low-contrast chapter words, and deliberate full-width visual pauses.

## Section treatment
- Rework Spark into a fitted one-company-at-a-time editorial rail with stronger media hierarchy, keeping arrows and swipe.
- Restyle challenge results and ecosystem proof as compact rule-based metric bands.
- Give every section a visibly distinct composition rather than repeating one template: timeline, cinematic split, layered gallery, horizontal ledger, portrait rail, typographic manifesto, and portfolio wall treatments will alternate across the page.
- Present journey, case studies, Shark Tank, High School League, fellowship, people, portfolio, and failure stories with varied asymmetric layouts while preserving every existing section and all copy.
- Standardize image galleries and placeholders with dark frames, subtle hover zoom/desaturation shifts, and consistent aspect ratios.
- Restyle native carousels with visible progress, refined controls, snap behavior, and mobile-safe one-card views.
- Give the final action area the same confident black editorial treatment without changing its actions.

## Motion and responsiveness
- Tune below-hero reveals to slower fade/clip/lift transitions inspired by the reference pages, respecting reduced-motion preferences.
- Preserve existing carousel, selector, swipe, video, and View More behavior.
- Verify layouts from 320px through 1920px with no horizontal overflow, clipped text, or navigation overlap.

## Technical scope
- Modify `src/routes/startups.tsx` only.
- Do not alter the hero markup, hero styling, hero state, video behavior, logo, grid, diamonds, or hero navigation.
- Preserve all current data, wording, links, and section IDs.
- Validate with focused type checking, the project build signal, and browser screenshots on mobile, tablet, and desktop.
