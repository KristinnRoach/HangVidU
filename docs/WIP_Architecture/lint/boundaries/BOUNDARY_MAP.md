# Boundary Map (Target)

## Folder -> layer

- `src/setup/**` -> `setup`
- `src/components/**` -> `components`
- `src/auth/**` -> `auth`
- `src/features/<name>/**` -> `feature(<name>)`
- `src/shared/components/**`, `src/shared/events/**`, `src/shared/vendors/**`, `src/shared/i18n/**`, `src/shared/media/**`, `src/shared/media-next/**`, `src/shared/pwa/**`, `src/shared/storage/**`, `src/shared/styles/**`, `src/shared/utils/**` -> `shared`

## Allowed imports matrix

Rows = importer, columns = allowed target.

| from       | setup | components | auth | feature(same) | feature(other) | shared |
| ---------- | ----: | ---------: | ---: | ------------: | -------------: | -----: |
| setup      |   yes |        yes |  yes |           yes |            yes |    yes |
| components |    no |        yes |  yes |           yes |            yes |    yes |
| auth       |    no |         no |  yes |            no |             no |    yes |
| feature(X) |    no |         no |  yes |           yes |             no |    yes |
| shared     |    no |         no |   no |            no |             no |    yes |

## Short rules

- `feature(A)` cannot import `feature(B)` when `A != B`.
- `shared` only imports `shared`.
- `setup` is the bootstrap/lifecycle root. UI bridges live here (`setupAppRoot.js`, `setupXyzAppBusHandlers.js`).
- `src/components/` is the Solid UI composition root. Components never import `setup` — the arrow points the other way.
