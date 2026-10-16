# Void Explorer v252 · Ember + Frost Pixel-Art Demo

## v252 reversible Frost pixel-art demo
- Added a crisp Frost crystal sprite, pixel ice-bolt projectiles, a tiled E-skill Cryo Shield/Frost Field, and a pixel-shard Q Snowstorm.
- Frost combat damage, cooldowns, freeze rules, and all other gameplay values are unchanged. Ember's earlier visual demo is preserved.
- Both prototypes remain isolated on `demo/ember-pixel-art`; `main` is untouched.

## v250 portal transition reliability fix
- Ensured portal rewards and the shop's Continue action always pass through the room fade, even when their click handler supplies a browser event.

## v249 portal travel and room transitions
- Clicking a portal locks controls, highlights the chosen gate, and animates the core flying into it before fading to the destination interaction.
- Confirming a portal reward fades out of the reward screen, initializes the next room, then fades back into gameplay.
- The core scales down as it enters the portal, with colored warp streaks and a circular gate pulse.
- Keyboard controls and the pause button are disabled during travel to prevent duplicate or interrupted transitions.

## v248 startup loading screen
- Added a full-screen black startup loader with a circular event-horizon visual, animated void, percentage, and current resource status.
- Preloads the game's local entry module, imported JavaScript modules, stylesheet, and favicon before game initialization.
- No separate image/audio/font files are used by the current game visuals and sound system.

## v247 core avatar alignment fix
- Centered core avatar artwork explicitly with absolute positioning, 50% offsets, and a centered transform origin.

## v246 dialogue avatar update
- Added the selected core's animated orb-detail artwork beside every Explorer speaking line and internal-thought line in arcade dialogue boxes.

## v245 arcade cutscene update
- Campaign briefings and world-end debriefs use the compact arcade dialogue field with typewriter reveal and text sound effects.

## v244 combat readability update
- Added a pulsing, core-colored segmented target ring around the current primary auto-attack target.

## v243 narrative overhaul
- Recentered the campaign on V Corp's failed Singularity Core investment and cascading budget cuts across four distinct worlds.
