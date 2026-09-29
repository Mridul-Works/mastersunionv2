# Replace Selected Student Ventures image cards

## Scope
- Change only `src/routes/startups.tsx`.
- Keep the existing statistic cards and application card unchanged.
- Replace only the image-based venture cards in Selected Student Ventures.

## Implementation
- Use every company listed in the Portfolio section, including entries revealed by “View all ventures”.
- Reuse available real founder/company photography first; use the company’s existing real logo when photography is unavailable.
- Carry each Portfolio entry’s company name, founder, category, metric, and description into its image card.
- Preserve the current mosaic layout and reveal behavior.

## Validation
- Check the section at desktop, tablet, and phone widths for clipping or horizontal overflow.
- Confirm all Portfolio companies appear and all non-company statistic cards remain unchanged.
- Confirm the page builds cleanly; do not publish.
