# Add install script for the pacman build

Started: 2026-07-22T00:10:00Z

## Goal

Wrap the manual steps from `README.local.md` (npm install, build:pacman,
pacman --upgrade with the -dd fallback) in one script so the user doesn't type
them manually. As simple as possible per request.

## Steps

- 2026-07-22T00:10:00Z — Created log.
- Wrote `install.local.sh` (repo root, named to match README.local.md):
  npm install → npm run build:pacman → sudo pacman --upgrade, retrying with
  --nodeps --nodeps (long form of -dd) on the known http-parser false positive.
- Ran shellcheck on the script.
- Added a one-line pointer to the script in README.local.md.
- Left everything unstaged per user rules.
