# `setup<Module>` Direction

Canonical docs:

- current contract: [SETUP_CONTRACT_CURRENT.md](./SETUP_CONTRACT_CURRENT.md)
- EventEmitter contract target (stub): [SETUP_CONTRACT_EVENT_EMITTER.md](./SETUP_CONTRACT_EVENT_EMITTER.md)
- migration plan (stub): [SETUP_MIGRATION_EVENT_EMITTER.md](./SETUP_MIGRATION_EVENT_EMITTER.md)

High-level intent:

- each module/feature exposes one `setup<Module>()` entrypoint from `src/app/`
- `setup<Module>()` owns its listener/init ordering and teardown ownership
