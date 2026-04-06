# `setup<Module>` Direction

We are moving toward a consistent app-composition pattern:

- each module/feature exposes a single `setup<Module>()` entrypoint from `src/app/`
- `setup<Module>()` owns orchestration order (initialization vs listeners) for that module
- module internals can still stay split (`init*`, `setup*Listeners`, etc.), but app bootstrap calls one setup API

Current example:

- [`setupAuth.js`](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/app/setupAuth.js)

Guideline:

- when it is not problematic, setup functions should always be idempotent
