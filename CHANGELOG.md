# Changelog

## v222 — Neo-Prism Core
- Added the seven-color Neo-Prism Core; every auto-attack randomly selects Fire, Nova, Lightning, Nature, Frost, Lumine, or Aether.
- Added E: Prism Overdrive, empowering elemental effects for 10 seconds, and Q: Prismatic Cataclysm, applying all seven elements to enemies and the singular core.
- Added Neo-Prism evolution milestones, a Spectrum Mastery signature perk, rainbow projectiles/trails/core visuals, and core details.
- Updated the visible game version to v222.


## v221 — Core-weighted upgrade rewards
- Core-exclusive perks for the active core receive 4× selection weight in level-up and portal reward screens.
- Weighted selection is without replacement, keeps general perks in the pool, and still filters maxed-out perks.
- Updated the visible game version to v221.


## v220 — Auralis terminology and stack HUD
- Renamed Luminize to Lumox and Voidflare(s) to Void Burst across player-facing text.
- Added a persistent Auralis Void Burst buff chip displaying stored stacks with no cooldown timer.
- Updated the visible game version to v220.


## v219 — Minimal dash-charge indicator
- Removed the mini Space, Q, and E panels beneath the active core.
- Kept only filled/outlined dash-charge diamonds beneath the core, with a glow on available charges.
- Updated the visible game version to v219.


## v218 — Mini ability indicators
- Added compact Space, Q, and E indicators beneath the active core during gameplay.
- Ready abilities glow; indicators show dash charges and recharge, ultimate charge, and E cooldown or Nature drone charges.
- Updated the visible game version to v218.


## v217 — Out-of-range attack audio
- Nature and Flash attack SFX now play only when a valid in-range target or visible Nature ray exists.
- Remote targets no longer trigger attack sounds when the range-limited attack produces no visible effect.
- Updated the visible game version to v217.


## v216 — Attack range and portal shard display
- Capped targeted core attacks at 440px and chain/ricochet links at 160px.
- Limited Nature's special ray, drone targeting, Auralis target strikes, Flash chain targets, Nova beams, and projectile/ricochet travel range.
- Added a visible Void Shard total beneath the player during portal selection.
- Updated visible game version to v216.


## v215 — Universal perks and Pulse Reactor
- Pulse Reactor now damages nearby enemies every 2.25 seconds, with rank-scaled damage and radius, floating damage numbers, and an expanding ring effect.
- Added ten universal perks to level-up rewards, portal upgrades, the Void Market, and the Perk Codex.
- Added a one-time extra dash charge and diamond charge indicators; dash charges recharge one at a time.
- Updated the visible game version to v215.


## v214 — Auralis ability notifications
- Prioritized Auralis's Daybreak Waltz and Radiant Finale notifications so passive Lumox/Void Burst notifications cannot replace them immediately.
- Added Auralis to the passive notification label and updated the visible version to v214.


## v213 — Perk card alignment
- Centered perk names in level-up and portal evolution cards.
- Updated the visible game version to v213.


## v212 — Perk selection crash fix
- Fixed the undefined perk-rank lookup that crashed level-up and portal upgrade selection.
- Use the shared `PERK_MAX_RANK` table for all cores, with uncapped perks remaining available.
- Added explicit caps for one-time core perks and capped Nature/Flash perks.
- Updated the in-game version labels to v212.


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

## v209 — Portal UI, Orbital Build, Nature persistence
- Removed duplicate canvas portal instruction text behind the destination notification.
- Added acquisition-backed Orbital Build entries for perks not covered by rank summaries, including Nature's Worldtree Protocol and Evergreen Covenant.
- Preserved Nature drones in memory across room transitions while continuing to clear temporary effects; drone sprites are hidden on non-playing screens.
- Gated Nature's third-attack Verdant Ray behind two living summoned drones.

## v210 — Core selection hover stacking
- Raised the hovered or focused `.core-choice-wrap` above neighboring selection wrappers to prevent the card's frame from being covered.

## v211 — Core-selection hover frame and visible version
- Updated both in-game version labels to v211.
- Increased the hovered/focused core-selection wrapper's stacking level and removed the outward hover scale from the card, keeping its frame visible within the card instead of letting it overlap or clip beneath neighboring wrappers.
