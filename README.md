# Void Explorer v207

Void Explorer is a browser-based cosmic action roguelike. The JavaScript is being modularized incrementally to preserve gameplay while reducing the large shared runtime.

## Project structure

- `index.html` — page markup and ES-module entry point
- `src/game.js` — game state, combat loop, menus, and runtime integration
- `src/data/worlds.js` — campaign worlds and tutorial data
- `src/data/cores.js` — playable core and element definitions
- `src/data/perks.js` — Perk Codex entries and perk-rank limits
- `src/systems/ricochet.js` — reusable Ricochet Circuit behavior with injected dependencies
- `src/utils/geometry.js` — pure line-segment geometry helper
- `src/styles.css` — visual styles and transitions
- `CHANGELOG.md` — version history

## Run locally

Run `npm run serve` from the project root and open http://localhost:8000. Serve over HTTP because browsers commonly block ES-module imports opened directly through `file://`.

Run `npm run check` for JavaScript syntax checks. The checks do not replace browser gameplay testing.

## Refactoring status

The first pass separates data definitions and two low-dependency helpers. The core update loop, rendering, and menus still share considerable mutable state, so those should be extracted in later small steps rather than moved wholesale.
