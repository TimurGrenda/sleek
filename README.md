# sleek

![image](https://github.com/ransome1/sleek/assets/11188741/304d2da2-e8bd-4901-9d12-04a0f5426317)

### sleek is an open-source (FOSS) todo manager based on the todo.txt syntax. It's available for Windows, macOS and Linux

sleek is an open-source (FOSS) todo manager based on the [todo.txt syntax](https://github.com/todotxt/todo.txt). Stripped down to only the most necessary features, and with a clean and simple interface, sleek aims to help you focus on getting things done.

All classic todo.txt attributes are supported and enhanced by additional features. Creating todos is straightforward, and tag-based filtering in tandem with highly customisable grouping and smart full-text search allows for rapid information retrieval. Completed todos can be hidden or archived into separate done.txt files. Easy integration with other todo.txt apps is facilitated by continuously scanning todo.txt files for changes.

sleek is available for Windows, macOS and Linux, and in several languages. [Screenshots can be found here](https://github.com/ransome1/sleek/wiki/Screenshots). For more detailed information, [please refer to the sleek wiki](https://github.com/ransome1/sleek/wiki).

### ❤️ Sponsor sleek

Pushing sleek to the Apple and Microsoft app stores creates annual costs. You can help covering these by [sponsoring the project](https://github.com/sponsors/ransome1).

### 👩🏾‍💻 This project needs your support

sleek's backlog is becoming increasingly populated, yet our capacity is limited. If you are skilled in `React`, `TypeScript`, `Electron`, or `vitest` you can support this project. We need to continue refactoring the code, build reliable test coverage, and reduce bugs. Here you'll find our backlog: https://github.com/users/ransome1/projects/3. For those interested, all necessary information about contributing to the project is kept and updated in the [CONTRIBUTING.md](https://github.com/ransome1/sleek/blob/main/CONTRIBUTING.md).

### Get sleek from Apple Mac App Store

<a href="https://apps.apple.com/de/app/sleek-todo-txt-manager/id1614704209?mt=12&itscg=30200&itsct=apps_box_badge&mttnsubad=1614704209" style="display: inline-block;">
<img src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1648771200" alt="Download on the App Store" style="vertical-align: middle; object-fit: contain;" width='180' />
</a>

### Get sleek from Microsoft Store

<a href="//www.microsoft.com/store/apps/9NWM2WXF60KR?cid=storebadge&ocid=badge" target="blank"><img src='https://developer.microsoft.com/store/badges/images/English_get-it-from-MS.png' alt='English badge' width='180'/></a>

### Get sleek from Snap Store

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/sleek)

Install sleek from [Snap Store](https://snapcraft.io/sleek) using: `sudo snap install sleek`

### Get sleek from Flathub

<a href="https://flathub.org/apps/details/com.github.ransome1.sleek" target="blank"><img width='180' alt="Download on Flathub" src="https://flathub.org/assets/badges/flathub-badge-en.png"/></a>

Install sleek from [Flathub](https://flathub.org/apps/details/com.github.ransome1.sleek) using: `flatpak install flathub com.github.ransome1.sleek`

Run it using: `flatpak run com.github.ransome1.sleek`

### Get sleek from Homebrew

Install sleek from [Homebrew](https://formulae.brew.sh/cask/sleek-app).

`brew install --cask sleek-app`

### Get sleek from Arch User Repository

Install sleek from [AUR](https://aur.archlinux.org/packages/sleek/).

1. Setup [Yay](https://github.com/Jguer/yay#installation)
2. `yay -S sleek`

### Download sleek

You can download sleek for Windows, macOS and Linux from

- [SourceForge](https://sourceforge.net/p/sleek/)
- [GitHub](https://github.com/ransome1/sleek/releases/latest)

### Build the Arch Linux (pacman) package from source

This fork ships a `pacman` Linux target so you can build an installable Arch package
directly from source and copy it to another machine.

#### Build it (on a machine with the toolchain)

Prerequisites: Node.js `>= 25` and `npm`.

```sh
# 1. Clone your fork and enter it
git clone https://github.com/TimurGrenda/sleek.git
cd sleek

# 2. Install dependencies
npm install

# 3. Build the .pacman package
npm run build:pacman
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

If `pacman` aborts with an unresolvable dependency error (for example a missing or
version-mismatched `http-parser`, which Electron's bundled runtime does not actually
need), install while skipping the dependency version checks:

```sh
sudo pacman -U -dd sleek-2.0.26-linux-x64.pacman
```

> `-dd` tells pacman to skip **all** dependency version/availability checks. Use it
> only for this self-contained Electron package — its runtime libraries are bundled,
> so the flagged dependency is a false positive. Do not use `-dd` for general system
> package installs.

Once installed, launch sleek from your application menu or by running `sleek`.
