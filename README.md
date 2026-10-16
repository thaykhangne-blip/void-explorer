# Void Explorer v231

Void Explorer is a browser-based cosmic action roguelike.

## v231 update
- Enemy contact now deals a distinct impact hit instead of tiny frame-by-frame damage ticks. Damage scales by enemy role: runners and shooters hit lighter, tanks and wardens hit harder, and charging rammers and mini-bosses hit hardest.
- Contact damage uses the shared damage pipeline, so armor, Aegis Circuit damage reduction, invulnerability, and Frost/Auralis skill shields continue to mitigate or absorb impacts.

## v230 update
- Moved Flash Core before Auralis in the core selection order.
- Locked Auralis until World 1 is cleared, Nature until World 2 is cleared, and Elemental Core until World 3 is cleared.
- Added a session-only Developer Mode toggle in Settings that unlocks all cores after password verification using a SHA-256 digest; the plaintext password is not stored in the source.

## v229 update
- Fixed Elemental Convergence Nova behavior: every Nova cube attack launched during E now fires a visible salvo of 3 homing missiles, with +1 missile per Nova Swarm rank and 40% critical chance.
- Nova salvos trigger from each Nova attack rather than relying on that cube projectile first colliding with an enemy. E activation only starts the 10-second buff; it does not apply all elemental effects to enemies at once.
- Clarified the on-hit effects: Fire applies 5 burn stacks, Frost instantly freezes, Nature binds for 3.5 seconds, and Lightning chains to more enemies for increased damage.

## v227 update
- Elemental Convergence empowers Elemental Core auto-attacks and status effects for 10 seconds, with a persistent aura and a pulsing buff icon/countdown.
- Extended projectile travel and target acquisition range by 50% for Ember, Frost, Elemental Core, and Auralis auto-attacks. Beam-like attacks and Auralis's light-lance proc retain their previous range.
- Added five Elemental Core-exclusive perks to level-up/portal rewards, the Codex, and the market: Cubic Overload, Chain Reaction, Frost Lattice, Nova Swarm, and Burning Constellation.

## v226 update
- Added five Elemental Core-exclusive perks that improve cube attacks, lightning chains, frost buildup, Nova missiles, and burn damage.
- Added matching perk rank caps and Elemental Core Codex entries.

## v225 update
- Elemental Core fires chunkier, glowing cube projectiles for more impactful attacks.
- E · Elemental Convergence applies five effects in one cast: 5 burn stacks, instant freeze, lightning strikes against 3 additional enemies, a 5-second bind, and 4 homing Nova missiles with 40% critical chance.
- Level 10 Chromatic Tempest reduces Elemental Convergence cooldown by 2 seconds.

## v224 update
- Renamed Prism Core to Elemental Core across core selection, detail panels, visuals, and the exclusive Spectrum Mastery perk.
- Evenly distributed all five elemental spokes around the core at equal 72° intervals; the E activation effects now use the same five-position spacing.

## v223 update
- Renamed Neo-Prism Core to Prism Core and limited its random auto-attacks to Fire, Frost, Lightning, Nova, and Nature damage.
- E activates Prism Overdrive for 10 seconds, amplifies those five elemental effects, and adds a persistent animated rainbow aura.
- Q strikes with all five elements at once. Spectrum Mastery now boosts the five supported elemental damage types.
- Fixed Auralis E to boost fire rate and flight speed by 25%, without increasing projectile speed.

## v222 update
- Added the seven-color Neo-Prism Core with randomized elemental auto-attacks.
- E activates Prism Overdrive and Q unleashes all elements against enemies and the singular core.
- Added core evolutions, Spectrum Mastery, rainbow visuals, and core-detail documentation.

## v221 update
- Core-exclusive perks now have a 4× selection weight in level-up and portal upgrade screens; selection remains random and respects perk rank caps.

## v220 update
- Renamed Luminize to Lumox and Voidflare(s) to Void Burst in player-facing text.
- Added a persistent Auralis Void Burst buff showing stored stacks without a cooldown timer.

## v219 update
- Removed the Space/Q/E mini panels; only dash-charge diamonds remain beneath the active core.

## v218 updates
- Added compact Space, Q, and E status indicators beneath the active core while playing.
- Ready abilities glow; mini indicators show dash charges/recharge, ultimate energy, and E skill cooldown or Nature drone charges.

## v217 fixes
- Nature and Flash no longer play normal attack SFX when no valid target is within range and no attack effect is produced.

## v216 fixes
- Capped targeted core attacks at 440px; reduced chain/ricochet links to 160px and limited Nova beams and Nature's ray.
- Limited Nature drone targeting and projectile/ricochet travel range.
- Added the current Void Shard total beneath the player during portal selection.

## v215 features
- Added ten universal perks to the Codex, level-up choices, portal upgrades, and Void Market.
- Implemented Pulse Reactor's timed area damage, floating damage numbers, and expanding ring effect.
- Added a one-time extra dash charge with diamond charge indicators.

## v214 fixes
- Auralis ability notifications now remain visible instead of being overwritten by frequent Lumox/Void Burst passive notifications.
- Labeled the passive notification as Auralis and updated both visible version labels to v214.

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
