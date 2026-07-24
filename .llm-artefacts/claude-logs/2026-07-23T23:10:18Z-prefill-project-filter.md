# Prefill new-todo input with selected project filter

## Task

When project(s) are selected in the Filters drawer, prefill the new-todo dialog input with `" +<project>"` per selected (non-excluded) project and place the cursor at position 0, so typing yields `"text +<project>"`.

## Decisions

- 2026-07-23T22:55Z — User chose: with multiple projects selected, prefill **all** non-excluded ones (`" +A +B"`).
- 2026-07-23T23:05Z — User: do not edit existing docs; document in `README.local.md`.

## Design (from plan, verified against code)

- `filters` state lives in `App.tsx:55`, shape `Filters` (`src/@types/UI.ts`): `filters.projects: Filter[]` with `{ value: string[], exclude, groupedName }`. Not yet passed to `DialogComponent`.
- Injection point: `Dialog.tsx` `dialogOpen` effect (`setTextFieldValue(todoObject?.string || "")`) — new todo means `todoObject === null`.
- Cursor: `AutoSuggest.tsx` focuses `textFieldRef` on mount; add `setSelectionRange(0, 0)` there behind a new `cursorAtStart` prop. AutoSuggest remounts on each dialog open (Dialog conditionally rendered in App), so mount-time is correct.

## Steps

- 23:10Z — Log created. Starting edits: App.tsx (pass filters), Dialog.tsx (prefill + prop), AutoSuggest.tsx (cursor).
- 23:12Z — Edits done:
  - `App.tsx`: pass `filters={filters}` to `DialogComponent`.
  - `Dialog.tsx`: new `filters: Filters` prop; `prefilledProjects` computed for new todos; used as `useState` initializer for `textFieldValue` **and** in the `dialogOpen` effect; `cursorAtStart={Boolean(prefilledProjects)}` passed to `AutoSuggest`.
  - `AutoSuggest.tsx`: optional `cursorAtStart` prop; mount effect calls `setSelectionRange(0, 0)` after `focus()`.
- 23:13Z — ★ Insight: initially seeded the value only via the `[dialogOpen]` effect, but the child (AutoSuggest) mount effect runs before the parent's, so cursor placement would race the value update and depend on React's selection-restore behavior. Fixed by seeding the `useState` initializer — value present at first render, cursor placement deterministic. (Dialog remounts per open since App renders it conditionally, so the initializer runs every open.)
- 23:15Z — Extracted the computation to `SelectedProjectsPrefix(filters)` in `Shared.tsx` (where the other filter helpers live) and added unit tests to `Shared.test.ts` (empty filters; multi-select incl. grouped `value: string[]`; excluded filters skipped).
- 23:16Z — Docs added to `README.local.md` (per user rule: never edit existing docs). No CHANGELOG (AGENTS.md).
- 23:17Z — Verification: ESLint clean on all 5 changed files; `tsc --noEmit -p tsconfig.web.json` clean except two **pre-existing** errors in `src/renderer/Grid/Renderer.tsx` (unused `Tooltip`, `href` prop) untouched by this change. **Vitest could not run**: `node_modules` in this checkout is a partial install (no `vite`/`vitest` packages) and `pnpm` is not on PATH — pre-existing environment issue, tests not executed here. Run `pnpm install && pnpm test` on a full checkout.
- Nothing staged/committed (per user rule).

## 2026-07-24 — Feature gated behind settings flag (user request)

- 08:00Z — New setting `prefillProjectFilters`, disabled by default:
  - `src/@types/Settings.ts`: optional `prefillProjectFilters?: boolean` (optional because pre-fork configs lack the key).
  - `src/main/Stores.ts`: `config.set("prefillProjectFilters", false)` added to the existing `"2.0.26"` migration. ★ Insight: electron-store migrations keyed above the package version (e.g. a new `"2.0.27"`) would NOT run while package.json is still 2.0.26, and the 2.0.26 migration already ran on existing installs — so existing configs simply lack the key and the renderer treats `undefined` as disabled. Fresh installs get an explicit `false`.
  - `src/renderer/Dialog/Dialog.tsx`: prefill now requires `settings.prefillProjectFilters` (undefined → falsy → off).
  - `src/renderer/Settings/Settings.tsx`: toggle added to `visibleSettings`; shared Switch `checked` wrapped in `Boolean()` so a missing key doesn't flip the input uncontrolled→controlled.
  - `src/locales/en.json`: label "New todos inherit selected project filters" (`fallbackLng: "en"`, so other locales fall back).
  - `README.local.md`: feature section now documents the opt-in setting.
- 08:05Z — ESLint clean on changed files. `typecheck:web` clean except pre-existing `Grid/Renderer.tsx` errors; `typecheck:node` errors are all in untouched files (`Attributes.ts`, `DataRequest.ts`, `IpcMain.ts`, `index.ts`) — pre-existing. Vitest still not runnable in this checkout (partial node_modules, no pnpm).

## 2026-07-24 — Tests for the settings flag (user request)

- Added `src/renderer/Dialog/Dialog.test.tsx` — renders the real `DialogComponent` + `AutoSuggest` (jsdom), pickers stubbed via `vi.mock` (they pull `@mui/x-date-pickers`, irrelevant to gating). 4 cases: enabled → `" +ProjectA"` with cursor/selection at 0; disabled → empty; key absent (pre-fork config) → empty; enabled + editing existing todo → untouched.
- ★ Insight (why vitest was broken): `vitest.config.ts` imports `"vite"`, but `vite` was not declared in devDependencies — an undeclared direct dependency. npm hoisting hid it; pnpm's strict `node_modules` exposed it (`ERR_MODULE_NOT_FOUND: vite`). Fixed by declaring `vite ^8.1.5` in devDependencies (matches the version already resolved in `pnpm-lock.yaml` via vitest).
- ★ Insight (environment): `node_modules` was linked from the user's global pnpm store at `/home/tim/.local/share/pnpm/store`; npx-pnpm under root's HOME defaults to a project-local store and aborts with `ERR_PNPM_UNEXPECTED_STORE`. Worked around with `--store-dir /home/tim/.local/share/pnpm/store`. Earlier "partial node_modules" diagnosis was wrong — it was a normal strict pnpm layout, only `vite` was genuinely missing at the root.
- Full suite: **159 tests in 13 files, all pass** (includes yesterday's `SelectedProjectsPrefix` tests, now verified). ESLint clean on the new test file.
- Diff to review: new `Dialog.test.tsx`, plus `package.json`/`pnpm-lock.yaml` gaining the `vite` devDependency.
