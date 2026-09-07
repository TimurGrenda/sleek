#!/bin/bash
# Build sleek's .pacman package and install it on this machine.
# Automates the manual steps from README.local.md.
set -euo pipefail

# run from the repo root regardless of where the script is invoked
cd "$(dirname "$0")"

pnpm install
pnpm run build:pacman

# pick the newest built package; absolute path so an eza alias/shim can't shadow GNU ls
# --sort=time: newest first
# shellcheck disable=SC2012 # dist/ filenames have no spaces/newlines, ls is fine
package=$(ls --sort=time dist/sleek-*-linux-x64.pacman | head --lines=1)

# --upgrade: install from a local package file
sudo pacman --upgrade "$package"
