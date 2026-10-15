# Void Explorer v209

Void Explorer is a browser-based cosmic action roguelike.

## v209 fixes
- Removed duplicated canvas instruction text from the portal selection screen.
- Orbital Build now supplements stat summaries from the run acquisition history, including rare/core-exclusive perks across cores. Nature's Worldtree Protocol and Evergreen Covenant also have explicit rank rows.
- Nature's living drones persist between rooms. Their sprites are hidden on portal/clear screens and shown again when the next room is active; temporary vines and projectiles are still cleaned up.
- Nature's every-third-attack Verdant Ray only charges and fires while both summoned drones are alive.

## Structure
- `index.html` — page markup and ES-module entry point
- `favicon.svg` — browser-tab icon
- `src/game.js` — game state, combat loop, menus, and integration
- `src/data/worlds.js` — campaign worlds and tutorial data
- `src/data/cores.js` — playable core and element definitions
- `src/data/perks.js` — Perk Codex entries and perk-rank limits
- `src/systems/ricochet.js` — Ricochet Circuit behavior
- `src/utils/geometry.js` — line-segment geometry helper
- `src/styles.css` — visual styles and transitions

## Run locally
Run `npm run serve` from the project root and open http://localhost:8000. Serve over HTTP because browsers commonly block ES-module imports opened directly through `file://`.

Run `npm run check` for JavaScript syntax checks. The checks do not replace browser gameplay testing.
