# Styling Rules

Tailwind v4 is the styling system. Everything else is legacy on its way out.

## Rules

- New/touched components: Tailwind utility classes. No new CSS files.
- No inline styles (`style={{ ... }}`). Utilities or the `hidden` attribute.
- **Tokens are minted intentionally, never bulk-ported.** `@theme` in
  [`src/styles/theme.css`](../../src/styles/theme.css) starts near-empty;
  Tailwind's default theme (spacing scale, `neutral-*`, `text-xs`, …) is the
  baseline. Add a token only when a migration or the redesign needs a value the
  default theme can't express.
- **Migrated components must not reference legacy `--vars`.** Use intentional
  tokens, Tailwind defaults, or arbitrary literals (`text-[#cdcdcdd2]`).
- Legacy tokens live in the `:root` block of theme.css. Delete each line when its
  last consumer migrates.

## Migrating a component

1. Rebuild it with utilities in its intended look (redesign happens here — don't
   pixel-port hover states you're about to redesign).
2. Decide token integration: default theme value, existing `@theme` token, new
   intentional token, or one-off arbitrary literal.
3. Delete its `*.module.css` file / its section of global CSS, and any legacy
   `:root` token lines that lost their last consumer.

## Cascade layers

Order is declared in [`src/styles/main.css`](../../src/styles/main.css):
`theme < base (preflight) < app (legacy CSS) < utilities`. Legacy global CSS is
imported with `layer(app)` so utilities always win over it.

`*.module.css` files are **unlayered** and beat utilities — do not mix modules
and utilities on one element. Migrate a component fully and delete its module
file.

## Migration status

Remaining: the `*.module.css` files, `src/styles/{element,layout,components}/`,
`init/typography.css`, `animations.css`. Migrate opportunistically when touching
a component. `src/components/base-legacy/` (imperative DOM
toast/notification/imagePreview) and its global CSS migrate together when
replaced with components.

## Under Consideration

- Token/palette redesign (incl. dark/light theming) — tokens get minted as that
  lands.
