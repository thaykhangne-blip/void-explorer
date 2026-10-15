# Void Explorer v205

This repository contains the browser-game source.

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

This checks JavaScript syntax. It does not replace in-browser gameplay testing.

## Refactoring approach

The first migration separates markup, styling, and game logic. The runtime is intentionally still a single JavaScript file for now; future changes should extract cohesive systems incrementally and be validated against this version.
