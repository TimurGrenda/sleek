# User Decisions

## 2026-07-23 — Prefill new-todo input with selected project filter

- With multiple project filters selected, prefill **all** non-excluded projects
  (`" +A +B"`), not just a single one.
- Do **not** edit existing documentation files (README.md etc.). Document local/fork
  changes in `README.local.md` instead.

## 2026-06-21 — Installing the pacman package

- When installing the built `.pacman` package with `sudo pacman -U`, an error about
  `http-parser` appeared. The user resolved it by adding the `-dd` flag
  (`sudo pacman -U -dd <file>.pacman`), which skips dependency version checks, and the
  install then succeeded.
- **Why it's safe here:** sleek is a self-contained Electron app whose runtime
  libraries are bundled, so the flagged dependency is a false positive. `-dd` should
  not be used for general system package installs.
- This workaround is now documented in `README.md`.
