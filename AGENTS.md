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
