# Styling Rules

Tailwind v4 is the styling system. Everything else is legacy on its way out.

## Rules

- New/touched components: Tailwind utility classes. No new CSS files.
- Design tokens live in [`src/styles/theme.css`](../../src/styles/theme.css)
  (`@theme` block). Current names are a mechanical port (`bg-bg-primary`,
  `text-text-secondary`, …) — a proper redesign happens after the migration,
  don't polish names now.
- Legacy var names (`--bg-primary`, `--font-size-md`, …) are aliases at the
  bottom of theme.css. Delete each alias once its consumers are migrated.
- No inline styles (`style={{ ... }}`). Utilities or the `hidden` attribute.

## Cascade layers (src/styles/main.css)

- Order: `theme < base (preflight) < app (legacy CSS) < utilities`.
- All legacy global CSS is imported with `layer(app)`, so Tailwind utilities
  always win over it.
- `*.module.css` files are **unlayered** and beat utilities — do not mix
  modules and utilities on one element. Migrate a component fully and delete
  its module file.

## Migration status

- Setup + pilot: PR #606 (LegalFooter, LocaleToggle).
- Remaining: ~14 `*.module.css` files, `src/styles/{element,layout,components}/`,
  `init/typography.css`, `animations.css`. Migrate opportunistically when
  touching a component.
- `src/components/base-legacy/` (imperative DOM toast/notification/imagePreview)
  and their global CSS migrate together when replaced with components.

## Under Consideration

- Token/naming redesign (incl. dark/light theming) once migration completes.
- Whether `element/button.css` + `input.css` base styles become Tailwind
  `@layer base` styles or component classes.
