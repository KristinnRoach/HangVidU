# Events

## Single bus

- All pub/sub goes through `src/shared/events/`.
- No module creates its own `EventEmitter` or local listener set.
- No custom `on/off` APIs on controllers.

## Reads vs reactions

- **Read now** → call a sync getter from the module barrel.
- **React to changes** → `subscribe('evt:<module>:state:changed', …)`.
- Do not poll getters in place of subscribing.
- Do not `subscribe` and cache values for re-publishing.

## Writes

- External modules write via commands: `dispatchCommand('cmd:<module>:<entity>:<action>', payload)`.
- Commands are handled inside the owning module only.
- The owning module applies the change via its private `setState` and publishes `evt:<module>:state:changed`.

## Naming

- See [`NAMING.md`](./NAMING.md) for event-name regex and payload shape.

---

## Under Consideration

- Standard "ready" signal per module (`evt:<module>:state:ready` or `get<Module>Ready()` promise). Currently only `auth` has `waitForAuthReady`.
