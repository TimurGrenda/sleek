# Move fork-specific README changes to README.local.md

Started: 2026-07-22T00:00:00Z

## Goal

Move all fork-specific changes out of `README.md` into a new `README.local.md`,
restoring `README.md` to upstream content. Keeps future upstream merges of
`README.md` conflict-free.

## Findings

- `git show 80480d2 -- README.md` confirms the fork's only README change is the
  appended "Build the Arch Linux (pacman) package from source" section
  (current lines 67–119, including the `-dd` note and the launch line).
- The rest of README.md matches upstream.

## Steps

- 2026-07-22T00:00:00Z — Created log. Verified the fork-only block via git diff
  against commit 80480d2.
- Created `README.local.md` with a short fork header + the moved section.
- Removed the section from `README.md` (now ends at the upstream download links).
- Left everything unstaged per user rules.
- Verified: `git diff 80480d2^ -- README.md` is empty — README.md is byte-identical to upstream state before the fork commit.

## Done: 2026-07-22T00:05:00Z
