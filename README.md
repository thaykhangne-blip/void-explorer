# Void Explorer v206

This repository contains the browser-game source in a Git-friendly structure.

## Current mechanics update

- Nature Core fires a wide Verdant Ray every third normal attack. The ray follows the current aim direction, damages every enemy it intersects, and can damage the singular core when it lies in the path.
- Ricochet Circuit now works with Nature's direct vine hits and Flash's instant lightning chain, while preserving existing projectile and laser ricochets.
- The core-selection scrollbar remains hidden while overflow content can still scroll.
- The build version is shown in the main menu and Settings rather than the browser tab title.

## Project structure

- `index.html` — game markup and entry point
- `src/styles.css` — extracted visual styles, menus, and transitions
- `src/game.js` — game runtime and gameplay logic
- `CHANGELOG.md` — version notes
- `package.json` — local validation and server commands

## Run locally

From the project root:

```bash
npm run serve
```

Open http://localhost:8000. Python 3 is required for the simple local server.

## Validate JavaScript

```bash
npm run check
```

This checks JavaScript syntax, not gameplay behavior. Test combat interactions in the browser after changes.
