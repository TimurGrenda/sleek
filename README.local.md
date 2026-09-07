# sleek — fork notes

Fork-specific documentation for [TimurGrenda/sleek](https://github.com/TimurGrenda/sleek).
Kept out of `README.md` so upstream merges stay conflict-free.

> Shortcut: `./install.local.sh` runs all the build & install steps below in one go.

### Build the Arch Linux (pacman) package from source

This fork ships a `pacman` Linux target so you can build an installable Arch package
directly from source and copy it to another machine.

#### Build it (on a machine with the toolchain)

Prerequisites: Node.js `>= 25` and `pnpm`.

```sh
# 1. Clone your fork and enter it
git clone https://github.com/TimurGrenda/sleek.git
cd sleek

# 2. Install dependencies
pnpm install

# 3. Build the .pacman package
pnpm run build:pacman
```

The package is written to `dist/`, e.g. `dist/sleek-2.0.26-linux-x64.pacman`.

> `build:pacman` runs `electron-vite build` and then `electron-builder --linux pacman`.
>
> **Note:** only the `x64` architecture is built. An `arm64` package is not produced —
> it can't be built on an x64 host without a cross/emulated toolchain. To build for
> ARM, run the build on an `arm64` machine and add `arm64` to the pacman target's
> `arch` list in `electron-builder.yml`.

#### Install it on a new laptop

Copy the `.pacman` file to the target machine and install it with `pacman -U`:

```sh
sudo pacman -U sleek-2.0.26-linux-x64.pacman
```

The Arch dependency list explicitly excludes electron-builder's obsolete
`http-parser` requirement. If an older package still requests it, rebuild the
package with this configuration and install again. Keep normal dependency checks
enabled: Electron still needs system libraries such as GTK and NSS.

Once installed, launch sleek from your application menu or by running `sleek`.

### Fork feature: priority stepper buttons

The priority picker in the todo dialog is a stepper instead of a plain dropdown:
`◀ | value | ✕ | ▶`. The chevrons step through `- → C → B → A` and wrap around at
both ends, `✕` clears the priority (disabled when already `-`). The dropdown is
kept but trimmed to `A`, `B`, `C`, `-` — the full A–Z alphabet is gone, since
todo.txt priorities beyond `C` are rarely useful in practice.

### Fork feature: new todos inherit the selected project filter

Opt-in via **Settings → "New todos inherit selected project filters"** (disabled by
default). When enabled and one or more projects are selected in the Filters drawer,
the new-todo dialog opens prefilled with ` +<project>` for every selected
(non-excluded) project, with the cursor at the start — typing `text` yields
`text +<project>`. Editing an existing todo is unaffected.
