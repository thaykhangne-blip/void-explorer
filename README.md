# Void Explorer v207

The first JavaScript modularization pass moves data-only definitions out of the shared runtime.

## Structure

- `index.html` — page markup and ES-module entry point
- `src/game.js` — game state, combat loop, menus, and runtime integration
- `src/data/worlds.js` — campaign worlds and tutorial data
- `src/data/cores.js` — playable core and element definitions
- `src/data/perks.js` — Perk Codex entries and perk-rank limits
- `src/styles.css` — visual styles and transitions
- `CHANGELOG.md` — version history

## Run locally

Run `npm run serve` from the project root and open http://localhost:8000. Serve over HTTP because browsers commonly block ES-module imports opened directly through `file://`.

Run `npm run check` for JavaScript syntax checks. The checks do not replace browser gameplay testing.

The main runtime remains together for now because numerous gameplay functions share state. Future extractions should be incremental.
