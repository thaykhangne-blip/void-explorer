# Void Explorer v251

## v251 portal flight transition
- Made portal selection feel like physical travel instead of a quick scene swap.
- The selected portal now draws an expanding event horizon and three animated rings while radial warp streaks intensify around the destination.
- Extended the core's flight and fade timing so the orb visibly travels into the chosen portal, shrinks into it, and the screen fades to black before the selected reward or next room appears.
- Existing portal choice logic, rewards, and destination handling remain unchanged.

## v250 startup loading screen
- Added a full-screen black startup loader with a circular event-horizon visual, animated void, percentage, and current resource status.
- Preloads local game modules, CSS, and favicon before game initialization.
- Failed file loads show a retry control.

## v247 core avatar alignment fix
- Centered core avatar artwork explicitly with absolute positioning, 50% offsets, and a centered transform origin.
- Applied the same centering transform to the compact mobile avatar size.

## v246 dialogue avatar update
- Added selected core artwork beside Explorer speech and internal-thought lines in arcade dialogue boxes.

## v245 arcade cutscene update
- Campaign intro briefings and world-end debriefs use the compact arcade dialogue field with typewriter reveal and text sound effects.

## v244 combat readability update
- Added a pulsing, core-colored segmented target ring with small crosshair ticks around the current primary auto-attack target.
