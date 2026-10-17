<div align="center">

# Void Explorer

**A cosmic action roguelike about light, singularities, and the cost of corporate "efficiency."**

[![Beta](https://img.shields.io/badge/status-beta-orange?style=for-the-badge)](https://github.com/thaykhangne-blip/void-explorer)
[![Version](https://img.shields.io/badge/version-v0.3-blue?style=for-the-badge)](https://github.com/thaykhangne-blip/void-explorer/commits/main)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=for-the-badge&logo=javascript&logoColor=111111)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Main branch](https://img.shields.io/badge/branch-main-181717?style=for-the-badge&logo=github)](https://github.com/thaykhangne-blip/void-explorer/tree/main)

[Gameplay source](https://github.com/thaykhangne-blip/void-explorer) · [Issues](https://github.com/thaykhangne-blip/void-explorer/issues) · [Commit history](https://github.com/thaykhangne-blip/void-explorer/commits/main)

</div>

---

## Overview

**Void Explorer** is a browser-based cosmic action roguelike. Control a living light-core, fight through hostile rooms, destroy singularities and their defenses, collect upgrades, and shape a build as you push through four increasingly dangerous worlds.

The game combines fast arcade combat with elemental core identities, active abilities, roguelike upgrades, boss encounters, and a narrative about a company whose disastrous investment is followed by increasingly absurd cost-cutting decisions.

> [!WARNING]
> **This project is currently in beta: v0.3 (build 300).** It is playable and actively developed, but it is not a final release. Expect bugs, balance changes, unfinished content, and revisions to gameplay systems, visuals, progression, and story.

## Features

- **Four campaign worlds** with distinct environments, threats, and narrative arcs.
- **Playable cores** with different combat identities, elemental effects, skills, and ultimate abilities.
- **Roguelike progression** through upgrades, perks, core evolution, and build combinations.
- **Combat encounters** including regular rooms, minibosses, bosses, and room-specific objectives.
- **Portal-based advancement** with animated transitions between rooms.
- **Story Archive** for replaying recovered transmissions and reading internal corporate memos.
- **Corporate satire** following V Corp's failed Singularity Core investment and its increasingly desperate attempts to protect the budget and the board.

## Campaign: The Cost of the Void

V Corp bets its future on the Singularity Core, a supposedly limitless energy source that promises to eliminate operating costs. The launch fails catastrophically. Rather than acknowledge the failure, leadership pushes the cost onto the people left to clean it up.

The Explorer, a field operations manager, must contain the Core across four hostile worlds while V Corp dismantles the very support systems needed to do the job.

| World | Campaign focus |
| --- | --- |
| **Ashen Reach** | Emergency cuts leave the Explorer operating a ship designed for a four-person crew alone. |
| **Cryo Archive** | Employees who warned about the Core are placed in cryogenic storage while still counting toward headcount. |
| **Verdant Ruin** | Trained staff are replaced by a cheaper autonomous ecosystem that grows beyond control. |
| **Event Horizon** | Leadership keeps funding a failed investment and demands one last demonstration rather than admit the mistake. |

The story uses corporate jargon, wellness theatre, engagement surveys, and accounting tricks as dark comedy. Beneath the satire is a simple premise: individual effort cannot indefinitely replace missing staff, equipment, time, or accountable leadership.

## Technology

| Technology | Role |
| --- | --- |
| HTML5 | Game page and interface structure |
| CSS3 | Styling, layouts, animation, and responsive UI |
| JavaScript (ES modules) | Gameplay logic, systems, and application behavior |

The project is organized as a modular browser game rather than a single standalone HTML file.

## Run locally

1. Clone or download the repository.
   ```bash
   git clone https://github.com/thaykhangne-blip/void-explorer.git
   cd void-explorer
   ```
2. Serve the project directory with a local web server. For example, if Python is installed:
   ```bash
   python -m http.server 8000
   ```
3. Open [http://localhost:8000](http://localhost:8000) in your browser.

A local server is recommended because the game uses JavaScript modules, which browsers may restrict when opened directly from the filesystem.

## Versioning

- **Current beta:** `v0.3`
- **Build:** `300`
- **Development branch:** `main`

The README's version label describes the current in-game beta version. Git tags and GitHub releases are separate repository metadata; check the repository's [Tags](https://github.com/thaykhangne-blip/void-explorer/tags) and [Releases](https://github.com/thaykhangne-blip/void-explorer/releases) pages for published milestones.

## Development notes

Void Explorer is an actively evolving independent game project. Mechanics, core balance, enemy behavior, narrative content, interface design, and progression may change as development continues. Bug reports and specific reproduction steps are useful when reporting issues.

- [Report a bug or request a feature](https://github.com/thaykhangne-blip/void-explorer/issues)
- [Browse source code](https://github.com/thaykhangne-blip/void-explorer)
- [Review recent changes](https://github.com/thaykhangne-blip/void-explorer/commits/main)

---

<div align="center">

*The crisis is not solved. The report is green.*

</div>
