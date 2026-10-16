# Void Explorer v247

## v247 core avatar alignment fix
- Centered dialogue core artwork explicitly with absolute positioning, 50% offsets, and a centered transform origin.
- Applied the same centering transform to the compact mobile avatar size to prevent the orbit artwork from clipping into the lower-right corner.

## v246 dialogue avatar update
- Added the selected core's animated orb-detail artwork beside every Explorer speaking line and every internal-thought line in arcade dialogue boxes.
- Reuses the same orb-render layers and core-specific artwork used in Core Details, including Ember, Frost, Nova, Auralis, Elemental, Flash, and Nature.
- Other speakers keep the full-width dialogue layout.

## v245 arcade cutscene update
- Campaign intro briefings and world-end debriefs now use the compact arcade dialogue field instead of the cinematic text presentation.
- Campaign scenes show their mission title, chapter, world number, and subtitle in the arcade frame.
- Briefing lines use the existing typewriter reveal and text sound effect, with Enter, Space, or click to reveal/advance and Escape to skip.

## v244 combat readability update
- Added a pulsing, core-colored segmented target ring with small crosshair ticks around the current primary auto-attack target.
- Uses the same primary-target selection and range rules as auto-attacks, so it tracks the target for every core.
- The indicator appears during active combat when Auto Shoot is enabled and is hidden when auto-shoot is disabled or the run is not active.

## v243 narrative overhaul
- Recentered the campaign on V Corp's failed Singularity Core investment and the emergency budget cuts used to keep the company alive.
- Made the consequences build across all four worlds: understaffed operations, frozen employees, a cheap unsupported automation contract, and a board that keeps funding a failed investment rather than admitting the loss.
- Rewrote all 8 campaign cutscenes, all 20 world-specific field dialogue scenes, and all 4 corporate memos in natural language with occasional swearing and clearly labeled internal thoughts.
- Preserved the World 0 tutorial exclusion and the 5 dialogue checkpoints per campaign world.
