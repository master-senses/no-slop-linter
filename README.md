# No-slop linter

This repo runs two Oxlint JavaScript plugins side by side:

- [`@shadcn/lint`](https://github.com/shadcn-ui/lint) for Tailwind design-system contracts
- Dillon Mulroy’s [anti-slop](https://github.com/dmmulroy/anti-slop) rules for low-evidence TypeScript

The anti-slop skill is only an installer. The rules in `tools/oxlint/anti-slop` are the source of truth here.

## Setup

Needs Node 20.19 or later. On Node 22 the lint scripts enable `--experimental-strip-types` so Oxlint can load the TypeScript anti-slop plugin.

```bash
npm install
```

## Run the linter

Lint the real source and the passing fixtures:

```bash
npm run lint
```

That is `oxlint src examples/pass`.

Confirm the failing fixtures still fire the expected rules:

```bash
npm run check:examples
```

Inspect the raw fail output:

```bash
npm run lint:fail
```

`npm run check` runs the passing lint and the fixture assertion together.

## No-slop rules that landed

These generic anti-slop rules are enabled at `error`:

| Rule | What it rejects |
| --- | --- |
| `anti-slop/no-array-filter-map` | Adjacent eager `filter`/`map` passes |
| `anti-slop/no-reduce-accumulator-copy` | Copying a reducer accumulator instead of mutating a fresh one |
| `anti-slop/no-chained-type-assertions` | Nested `as` / angle-bracket assertions |
| `anti-slop/no-conditional-empty-object-spread` | `...(cond ? { field } : {})` omission |
| `anti-slop/no-known-value-widening` | Known values forced into `unknown` / open dictionaries |
| `anti-slop/no-module-mocking` | Vitest/Jest `vi.mock` / `jest.mock` |
| `anti-slop/no-object-parameters` | `object` on function inputs |
| `anti-slop/no-reflect-apply` | `Reflect.apply` |
| `anti-slop/no-reflect-get` | `Reflect.get` |
| `anti-slop/no-runtime-typeof` | Ad hoc `typeof` narrowing |
| `anti-slop/no-shape-in-symbol-names` | `shape` in locally owned names |
| `anti-slop/no-unknown-parameters` | `unknown` function inputs |
| `anti-slop/no-unknown-returns` | `unknown` / `Promise<unknown>` return contracts |
| `anti-slop/no-unknown-type-aliases` | Aliases that only hide `unknown` |
| `anti-slop/no-unsafe-dictionary-type` | `Record<string, unknown>` and similar dictionaries |
| `anti-slop/no-widen-then-assert` | Widen a known value, then assert it back |
| `anti-slop/require-readable-spacing` | Missing blank lines between top-level / control-flow groups |
| `anti-slop/require-safety-comment-for-type-assertion` | Assertions without a `SAFETY:` justification |

Native companion: `oxc/no-accumulating-spread`.

Effect-specific anti-slop rules were not enabled. This repo does not use Effect.

## shadcn/lint rules that landed

| Rule | Policy in this repo |
| --- | --- |
| `shadcn/no-restyle` | Layout is allowed. Button may take `w-full` and vertical margin. CardTitle may change typography. CardContent may change spacing. |
| `shadcn/no-raw-colors` | Theme tokens only (`src/styles/theme.css`) |
| `shadcn/no-arbitrary-values` | No `p-[13px]`-style values |
| `shadcn/no-inline-styles` | No `style={{ ... }}` |
| `shadcn/no-unknown-classes` | Classes Tailwind cannot generate |
| `shadcn/require-static-classes` | No `` `bg-${color}` `` |

`no-restyle` is off inside `src/components/ui/**` so the components can own their internals.

## Examples

- `examples/pass` — patterns that should stay clean
- `examples/fail` — one fixture per landed rule, used by `npm run check:examples`

## Layout

```
src/                    # Small design system + domain code that should lint clean
examples/pass           # Extra passing fixtures
examples/fail           # Expected violations
tools/oxlint/anti-slop  # Vendored no-slop rules (source of truth)
.oxlintrc.json          # Oxlint + both plugins
```
