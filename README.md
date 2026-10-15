# Void Explorer v208

Void Explorer is a browser-based cosmic action roguelike.

## Current update
- Removed Twin Comets and the Split Orbit variant from level-up rewards, portal upgrades, Void Market, rank display, and Codex data.
- Side Cannons now has two ranks. Rank 1 adds two side attacks; rank 2 adds two more, for up to four. Each core retains its specialized attack type.
- Added a custom SVG favicon for the browser tab.

## Structure
- `index.html` — page markup and ES-module entry point
- `favicon.svg` — browser-tab icon
- `src/game.js` — game state, combat loop, menus, and runtime integration
- `src/data/worlds.js` — campaign worlds and tutorial data
- `src/data/cores.js` — playable core and element definitions
- `src/data/perks.js` — Perk Codex entries and perk-rank limits
- `src/systems/ricochet.js` — Ricochet Circuit behavior
- `src/utils/geometry.js` — line-segment geometry helper
- `src/styles.css` — visual styles and transitions
- `CHANGELOG.md` — version history

## Run locally
Run `npm run serve` from the project root and open http://localhost:8000. Serve over HTTP because browsers commonly block ES-module imports opened directly through `file://`.

Run `npm run check` for JavaScript syntax checks. The checks do not replace browser gameplay testing.
