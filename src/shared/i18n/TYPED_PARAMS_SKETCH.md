# Typed template params — deferred upgrade sketch

Status: **deferred**. Add this when parametric strings get painful (forgotten params shipping as `"{link}"` to users, translator drift between locales, plurals).

## Problem this solves

Current `t(key, params)` validates the key against `keyof typeof en`, but **not** the param shape. These all compile today and ship broken strings:

```ts
t('contact.invite.body', { name });              // missing `link` → "{link}" leaks
t('contact.invite.body', { name, lnk: link });   // typo → same
t('referral.connected', { count: 1 });           // wrong shape → "{name}" leaks
t('call.incoming');                              // forgot params entirely
```

## Approach

Borrow only `Template<T>`, `template()`, and `translator()` from the [solid-primitives/i18n](https://github.com/solidjs-community/solid-primitives/tree/main/packages/i18n) reference impl. Skip `flatten`, `prefix`, `scoped`, `chained`, `proxy`, function-valued dicts, and the heavy `JoinPath`/`UnionToIntersection` types — overkill at our scale.

Cost: ~40 LoC of new code + migrate `en.json` / `is.json` → `en.ts` / `is.ts`.

## Sketch

### `src/shared/i18n/core.ts` (new, ~25 LoC)

```ts
export type BaseArgs = Record<string, string | number>;
export type Template<T extends BaseArgs> = string & { __args: T };
export const template = <T extends BaseArgs>(s: string): Template<T> => s as any;

type ArgsOf<V> = V extends Template<infer A> ? [args: A] : [];
type Out<V> = V extends Template<any> ? string : V;

export function translator<D extends Record<string, unknown>>(dict: () => D) {
  return <K extends keyof D>(key: K, ...args: ArgsOf<D[K]>): Out<D[K]> => {
    const v = dict()[key] as any;
    if (typeof v !== 'string') return key as any;
    const a = args[0] as BaseArgs | undefined;
    return (a ? v.replace(/\{(\w+)\}/g, (_, k) => String(a[k] ?? `{${k}}`)) : v) as Out<D[K]>;
  };
}
```

### `src/shared/i18n/en.ts` (replaces `en.json`)

```ts
import { template as tpl } from './core';

export default {
  'shared.save': 'Save',
  'shared.cancel': 'Cancel',
  'call.incoming': tpl<{ name: string }>('{name} is calling...'),
  'referral.connected': tpl<{ name: string }>('Connected with {name}!'),
  'contact.invite.body': tpl<{ name: string; link: string }>(
    'Hi!\n\n{name} invited you... Click here:\n{link}\n\nSee you there!',
  ),
  // ...rest of keys, plain strings for params-free entries
} as const;
```

### `src/shared/i18n/is.ts`

Mirror the shape of `en.ts`. Enforce parity:

```ts
import en from './en';
// ...
const is = { /* ... */ } satisfies typeof en;
export default is;
```

Any missing key or wrong template shape → compile error.

### `src/shared/i18n/index.ts` (mostly unchanged)

Swap the `t` definition only. Locale signal, `setLocale`, loaders, listeners, storage — all unchanged.

```ts
import en from './en';
import { translator } from './core';

const [dict, setDict] = createSignal<typeof en>(en);
// ...existing setLocale / loaders, but dict is now typed-object not Record<string,string>...

export const t = translator(dict);  // reactive: reads signal on each call
```

## What you get at call sites (no syntactic change)

```ts
t('contact.invite.body', { name, link });               // ok
t('contact.invite.body', { name });                     // TS error: missing 'link'
t('contact.invite.body', { name, lnk: link });          // TS error: unknown property
t('call.incoming');                                     // TS error: expected 2 args
t('shared.save', { foo: 1 });                           // TS error: no args allowed
```

## Migration steps when ready

1. Add `core.ts` (copy from sketch above).
2. Convert `en.json` → `en.ts`. Most keys stay plain strings; wrap only the parametric ones with `tpl<...>(...)`.
3. Convert `is.json` → `is.ts` with `satisfies typeof en`. Fix any mismatches that surface.
4. Update `index.ts`: change `dict` signal type, loaders return TS modules, swap `t` for `translator(dict)`.
5. Drop the old `formatMessage` helper and the `MessageKey = keyof typeof en` (replaced by inferred `keyof D` in `translator`).
6. Run TS check — every existing miscall surfaces as a compile error. Fix.
7. Tests in `tests/index.test.jsx` should keep working unchanged (call surface is identical).

## Things this does NOT do

- No nested dict access (`t.contact.invite.body(...)`). Stays flat.
- No pluralization helper (function-valued entries). Add later via `tpl<...>` + a `plural()` util if needed.
- No scoped translators (`const t = scoped(globalT, 'contact')`). Not enough surface to justify.

## Trigger to actually do this

Any of:
- Two or more bugs shipped because of param drift.
- Adding a third locale (translator parity matters more).
- A feature with >5 new parametric strings landing at once (referral flow, error toasts).
