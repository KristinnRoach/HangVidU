# Boundary Map (Target)

## Folder -> layer

- `src/setup/**` -> `setup`
- `src/app/**` -> `app`
- `src/auth/**` -> `auth`
- `src/features/<name>/**` -> `feature(<name>)`
- `src/components/**`, `src/events/**`, `src/firebase/**`, `src/i18n/**`, `src/media/**`, `src/media-next/**`, `src/pwa/**`, `src/storage/**`, `src/styles/**`, `src/utils/**` -> `shared`

## Allowed imports matrix

Rows = importer, columns = allowed target.

| from       | setup | app | auth | feature(same) | feature(other) | shared |
| ---------- | ----: | --: | ---: | ------------: | -------------: | -----: |
| setup      |   yes | yes |  yes |           yes |            yes |    yes |
| app        |    no | yes |  yes |           yes |            yes |    yes |
| auth       |    no |  no |  yes |            no |             no |    yes |
| feature(X) |    no |  no |  yes |           yes |             no |    yes |
| shared     |    no |  no |   no |            no |             no |    yes |

## Short rules

- `feature(A)` cannot import `feature(B)` when `A != B`.
- `shared` only imports `shared`.
- `setup` is the composition root.
