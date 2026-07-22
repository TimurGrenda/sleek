# Add pacman build & install instructions

Started: 2026-06-21T19:36:49Z

## Goal

User maintains a fork of `ransome1/sleek` (origin: `TimurGrenda/sleek`) and added a
commit. They want documentation on how to build the package for a **pacman** target
(Arch Linux) and install it on a new laptop. During their manual install they hit an
`http-parser` error from `pacman -U`, and adding the `-dd` flag (skip dependency
version checks) let it install successfully.

## Findings

- App is an Electron app (sleek 2.0.26) packaged with `electron-builder`.
- `electron-builder.yml` `linux.target` lists `deb`, `freebsd`, `rpm`, `AppImage` —
  **no `pacman`**.
- Yet `dist/sleek-2.0.26-linux-x64.pacman` exists → it was produced via a CLI
  override (`electron-builder --linux pacman`), not the config.
- `package.json` build scripts: `build`, `build:unpack`, `build:mas`, `build:masdev`.
  There is no dedicated linux-dist script.

## Plan / Decisions

1. Add `pacman` as a Linux target in `electron-builder.yml` so the build is
   reproducible from config (both arm64 + x64 to match siblings).
2. Add a README section documenting:
   - building the `.pacman` package from source,
   - installing it on a new machine with `sudo pacman -U`,
   - the `-dd` workaround for the `http-parser` dependency error.
3. Update `CHANGELOG.md` under `[Unreleased]`.

## Steps

- 2026-06-21T19:36:49Z — Created log. Explored repo, confirmed pacman not in config.
- 2026-06-21T19:38:00Z — Added `pacman` target (arm64 + x64) to `electron-builder.yml`
  linux targets, after `rpm` and before `AppImage`.
- Added `build:pacman` script to `package.json`
  (`npm run build && electron-builder --linux pacman`).
- Added "Build the Arch Linux (pacman) package from source" section to `README.md`
  covering clone/install/build and install via `sudo pacman -U`, including the
  `-dd` workaround with a caution note.
- Added `[Unreleased] > Added` entry to `CHANGELOG.md`.
- Recorded the `-dd` workaround in `.llm-artefacts/user-decisions.md`.
- Validated: package.json is valid JSON, electron-builder.yml is valid YAML.

## Done: 2026-06-21T19:38:00Z

## Follow-up: drop arm64 from pacman target

- 2026-06-21T19:45:00Z — Per user request, removed `arm64` from the pacman target's
  `arch` (now `x64` only) in `electron-builder.yml` and added an explanatory comment.
- Updated the README note to explain arm64 is not built (no cross/emulated toolchain
  on an x64 host) and how to enable it on arm64 hardware.
- Re-validated electron-builder.yml as valid YAML.
