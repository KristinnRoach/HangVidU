## App-Wide EDA Contract

`src/shared/events/index.js` is the app-level cross-module API.

The generic emitter primitives now live in:

- `src/lib/event-emitter/`
- module docs: `src/lib/event-emitter/README.md`

Use this `src/shared/events/` layer to define app semantics (`command` vs `event`) and naming contracts. Keep low-level emitter behavior in `src/lib/event-emitter`.

## Public API

- `dispatchCommand(name, payload)`
- `dispatchCommandAndAwait(name, payload)`
- `dispatchCommandAndAwaitSequential(commands)`
- `handleCommand(name, handler, options?)`
- `publish(name, payload)`
- `publishAndAwait(name, payload)`
- `publishAndAwaitSequential(events)`
- `subscribe(name, handler, options?)`

## Rules

- Do not import `appBus` outside `src/shared/events/`.
- Commands ask for work; published events announce facts.
- Commands must have exactly one handler per command name.
- `dispatchCommandAndAwait()` is command-RPC:
  - throws when there is no handler
  - throws when there is more than one handler
  - throws when the handler throws/rejects
  - returns the single handler result
- If async bus behavior is needed, add it to `src/shared/events/index.js` instead of importing `appBus` directly.

## When to use the bus

| Shape                                                    | Primitive                                                            | Use when                                                                    |
| -------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Fact** — "X happened", emitter doesn't care who reacts | `publish` / `subscribe`                                              | Cross-layer side effects that are reactions: push, analytics, sound, badges |
| **Action** — one owner must do X, caller needs it done   | `dispatchCommand[AndAwait]`                                          | Single-owner imperative with completion/back-pressure                       |
| **Query** — need a value back from a capability          | direct import (or `dispatchCommandAndAwait` only if decoupling pays) | 1:1 calls where nobody else would ever listen                               |

Reference: push sends are facts. The call feature `publish`es `evt:call:invite:sent`;
`src/push` subscribes and delivers. The feature never imports push. A request/response
capability like `requestPermission()` stays a direct call (row 3) — routing it through
the bus is indirection with no second listener to decouple from.

## Naming Guidance

- Canonical format (4-part): `<kind>:<domain>:<entity>:<action>`
- `kind` is `cmd` or `evt`
- Recommended regex: `^(cmd|evt):[a-z][a-z0-9-]*:[a-z][a-z0-9-]*:[a-z][a-z0-9-]*$`
- For commands, `domain` is the target domain that owns the handler.
- For events, `domain` is the domain the fact is about, not the module that published it.
- See [DOMAINS.md](./DOMAINS.md) for the current domain inventory.
- Command names: imperative verb phrases.
- Event names: facts/outcomes (typically past tense).
