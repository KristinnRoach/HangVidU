# Boundary Map

Source of truth is `eslint.boundaries.config.js`. This doc mirrors it.

## Folder -> layer

- `src/app/**` -> `app` (shell / bootstrap / lifecycle root)
- `src/components/**` -> `components`
- `src/auth/**` -> `auth`
- `src/features/<name>/**` -> `feature(<name>)`
- `src/stores/**` -> `stores`
- `src/storage/**` -> `storage`
- `src/realtime/**` -> `realtime`
- `src/infra/**` -> `infra`
- `src/shared/*`, `src/shared/events/**`, `src/shared/i18n/**`, `src/shared/utils/**` -> `shared`
- `src/lib/**` -> `lib`

> `src/styles/**` is currently unclassified (no boundary element).

## Allowed imports

Each layer may import from itself plus:

| from         | may also import                                          |
| ------------ | -------------------------------------------------------- |
| `app`        | auth, stores, feature, components, shared, lib           |
| `feature(X)` | auth, shared, lib, components, infra, stores, realtime, feature(X) |
| `stores`     | auth, shared, lib, storage, infra, feature               |
| `storage`    | shared, lib, infra                                       |
| `realtime`   | shared, lib, infra, auth                                 |
| `auth`       | shared, lib, infra, components                           |
| `components` | auth, shared, lib                                        |
| `infra`      | lib                                                      |
| `shared`     | lib                                                      |
| `lib`        | (lib only)                                               |

## Short rules

- `feature(A)` cannot import `feature(B)` when `A != B`.
- `lib` is the bottom layer — framework-agnostic primitives with zero app
  knowledge. Importable by any layer; may only import from `lib` itself.
- `shared` is app-aware cross-cutting code — may import only `shared` and `lib`
  (plus explicit temporary feature exceptions, currently none).
- `infra` is the external-system bootstrap layer (vendor SDKs + env config).
- `storage` (persistence) and `realtime` (ephemeral coordination — WebRTC
  signaling, later media-sync) are sibling infrastructure layers below
  features. `realtime` also imports `auth` (token for the signaling worker).
- `app` is the shell/lifecycle root. UI bridges live here.
- `src/components/` is the Solid UI composition root. Components never import
  `app` — the arrow points the other way.
