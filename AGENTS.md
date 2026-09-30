<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rules

- Startups page media heals itself: `useAssetReload` in `src/routes/startups.tsx` re-requests a failed `<img>`/`<video>` twice with `?asset-try=n`. The preview's asset proxy intermittently times out on `/__l5e/assets-v1/*` and answers 502; without a retry one dropped fetch leaves a card blank for the whole session.
- The shared `.font-serif-italic` utility in `src/styles.css` also sets `color: var(--teal)` (#006A4E). Serif-italic text on the dark startups page must carry an important color (e.g. `!text-background/85`) or it renders as low-contrast green-on-black.
- Photos scraped from mastersunion.org arrive with their card's rounded corners baked in: a 2px flat near-white border on every edge plus a light-grey wedge and transparent notch outside the rounded clip (alpha < 250). Squaring them in CSS is impossible — the file itself is the rounded shape. Fix the bytes: mask every flat-light (sat < 26, mean > 160) or low-alpha pixel that is connected to the frame edge (`scipy.ndimage.label`, keep components touching the border), replace masked pixels with the nearest kept pixel via `scipy.ndimage.distance_transform_edt(..., return_indices=True)`, set alpha 255, re-upload with `lovable-assets create` and overwrite the matching `src/assets/**/*.asset.json` pointer so imports stay unchanged. Interior light content (white shirts) survives because it is not edge-connected.
