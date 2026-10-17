# Void Explorer

**Void Explorer** is a cosmic action roguelike in active beta development. Pilot a living light-core through hostile rooms, destroy singularities and their defenses, collect upgrades, build a run-defining loadout, and push through four increasingly dangerous worlds. Choose from distinct elemental cores, combine perks, and use your skills and ultimate abilities to survive the void.

> **Status: Beta · Version 0.3 (build 300).** The game is playable but still under active development. Balance, progression, visuals, story content, and systems may change, and bugs or unfinished features are expected. This is not a final release.

## Core features

- Four campaign worlds, each with its own atmosphere, enemies, and narrative.
- Multiple playable cores with distinct combat styles and elemental identities.
- Roguelike upgrades, perks, core evolution, and build combinations.
- Boss encounters, minibosses, room challenges, and portal-based progression.
- A corporate-satire campaign following V Corp's disastrous Singularity Core investment and the cost-cutting decisions that follow.
- A persistent Story Archive for recovered transmissions and internal memos.
- Browser-based gameplay built with HTML, CSS, and JavaScript.

## Play and development

The project is developed as a modular browser game. The codebase and ongoing changes are available in the [GitHub repository](https://github.com/thaykhangne-blip/void-explorer). As a beta, gameplay and balance are subject to change between updates.

---

## Campaign story: The Cost of the Void

V Corp gambles its future on the Singularity Core, a supposedly limitless energy source that will eliminate operating costs and make the company unstoppable. The launch fails catastrophically. Instead of acknowledging the failed investment, leadership protects the forecast and pushes the cost of failure onto the people left to clean it up.

The Explorer, a field operations manager, is ordered to contain the Core across four hostile worlds while V Corp dismantles the very support systems needed to do the job. Each world reveals another consequence of the company's savings strategy:

- **Ashen Reach:** emergency cuts leave the Explorer operating a ship designed for a four-person crew alone. The incident is marked as a success when the disaster merely pauses.
- **Cryo Archive:** staff who warned about the Core are placed in cryogenic storage. Their names still count toward headcount, even though nobody is available to do the work.
- **Verdant Ruin:** trained facilities staff are replaced by a cheaper autonomous ecosystem, then the support contract is cut. The system grows out of control and begins imitating the employees it replaced.
- **Event Horizon:** the Core's failure is impossible to hide, but writing it off would expose the original decision. The board keeps spending, rewrites the reports, and demands one last demonstration.

The story uses corporate language as dark comedy: headcount without people, savings that reappear as emergency costs, engagement surveys with one employee, and “resilience” used as a substitute for staffing and equipment. Under the satire is a serious point: individual effort cannot indefinitely compensate for a broken system, missing expertise, and leadership that refuses to admit a mistake.

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
