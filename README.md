# Void Explorer v248

## v248 startup loading screen
- Added a full-screen black startup loader with a circular event-horizon visual, animated void, percentage, and current resource status.
- Preloads the game's local entry module, imported JavaScript modules, CSS, and favicon before game initialization.
- The loader waits for preloading and game startup to finish before fading away; failed file loads show a retry control.
- The game currently has no separate image, audio, or font files to preload: orb artwork is generated with CSS/canvas and sound effects use Web Audio.

## v247 core avatar alignment fix
- Centered core avatar artwork explicitly with absolute positioning, 50% offsets, and a centered transform origin.
- Applied the same centering transform to the compact mobile avatar size to prevent the orbit artwork from clipping into the lower-right corner.

## v246 dialogue avatar update
- Added the selected core's animated orb-detail artwork beside every Explorer speaking line and every internal-thought line in arcade dialogue boxes.
- Reuses the same orb-render layers and core-specific artwork used in Core Details, including Ember, Frost, Nova, Auralis, Elemental, Flash, and Nature.
- Other speakers keep the full-width dialogue layout.

## v245 arcade cutscene update
- Campaign intro briefings and world-end debriefs use the compact arcade dialogue field.
- Campaign scenes show their mission title, chapter, world number, and subtitle, with typewriter reveal and text sound effects.

## v244 combat readability update
- Added a pulsing, core-colored segmented target ring with small crosshair ticks around the current primary auto-attack target.
- Uses the same primary-target selection and range rules as auto-attacks, so it tracks the target for every core.
- The indicator appears during active combat when Auto Shoot is enabled.
