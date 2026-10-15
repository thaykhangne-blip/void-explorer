# Changelog

## v205 — Hide core selection scrollbar
- Preserve the game runtime and core-selection UI.
- Extract five embedded stylesheet blocks into `src/styles.css`.
- Extract the inline game script into `src/game.js`.
- Hide the visible scrollbar on the core/orb selection overlay while preserving scroll behavior.
- Add project scripts and setup documentation.

## UI polish
- Removed the version from the browser tab title.
- Added a small `VERSION v205` label to the Settings menu.

## v206 — Nature Verdant Ray and Ricochet fixes
- Added Nature Core passive: a wide vine ray fires every third normal attack and damages every enemy in its path.
- Added Ricochet Circuit bounce chains to Nature vine attacks and Flash lightning attacks.
- Added green ray visuals and room-clear cleanup for the new effect.
- Updated Ricochet Circuit perk copy and visible build version.

## v207 — Initial JavaScript modularization
- Moved campaign world and tutorial definitions, core and element definitions, and perk data into ES modules.
- Switched the HTML entry point to module script loading.
- Expanded JavaScript syntax checks and updated project documentation.

- Extracted Ricochet Circuit bounce behavior into `src/systems/ricochet.js`.
- Extracted the pure line-segment geometry helper into `src/utils/geometry.js`.

## v208 — Perk balance and browser icon
- Removed Twin Comets and Split Orbit from level-up choices, portal upgrades, Void Market, rank logic, and Codex data.
- Increased Side Cannons from one rank to two across all cores; rank 2 adds two more side attacks for up to four total.
- Added a custom SVG favicon and updated the visible build label.
