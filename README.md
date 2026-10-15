# Void Explorer v213

Void Explorer is a browser-based cosmic action roguelike.

## v213 fixes
- Centered perk names in level-up and portal evolution cards.

## v212 fixes
- Updated both in-game version labels to v212.
- Fixed perk selection crashing because the rank-check helper was undefined.
- Applied shared perk-rank handling to level-up choices and portal upgrades for all cores.
- Added explicit rank caps for one-time core perks and capped Nature/Flash perks.

## Previous v211 fixes
- Core-selection wrappers use explicit hover/focus stacking order. The cyan hover frame stays inside the card instead of clipping under neighboring cards.

## Previous v210 fixes
- Raised hovered/focused core-selection wrappers above neighboring wrappers.

## Previous v209 fixes
- Removed duplicate portal instruction text behind the destination notification.
- Expanded Orbital Build to include acquired run perks, including core-specific relics.
- Preserved Nature drones between rooms and gated Verdant Ray behind two living drones.

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
