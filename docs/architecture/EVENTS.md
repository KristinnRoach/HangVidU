# Events

Bus API, primitives, and when-to-use-what: `src/shared/events/README.md`.
This file holds only the cross-module rules that aren't about the API itself.

## Single bus

- All pub/sub goes through `src/shared/events/`.
- No module creates its own `EventEmitter` or local listener set.
- No custom `on/off` APIs on controllers.

## Vocabulary

- `handler` = command flow (`dispatchCommand`, `dispatchCommandAndAwait`, `handleCommand`).
- `listener` = event/fact flow (`publish`, `publishAndAwait`, `subscribe`).

## Reads vs reactions

- **Read now** → call a sync getter from the module barrel.
- **React to changes** → `subscribe('evt:<module>:state:changed', …)`.
- Do not poll getters in place of subscribing.
- Do not `subscribe` and cache values for re-publishing.

## Commands

- Use `dispatchCommand('cmd:<module>:<entity>:<action>', payload)` for
  **fire-and-forget cross-module intent** where the caller wants neither a typed
  return value nor a dependency on the owning module's API surface (UI opening,
  side-effect triggers from boundary-restricted layers).
- For typed in-process intent — a call that returns a value or a promise the
  caller awaits — import directly from the owning module's barrel. Wrapping that
  in a command adds dispatching with no benefit.
- Commands are handled inside the owning module only.
- Avoid `*:get-*` commands by default. Allowed only for documented edge cases or
  deferred migration steps.

## Naming

See [`NAMING.md`](./NAMING.md).
