# Void Explorer

A first-pass Git-ready source layout for Void Explorer, based on the v204 menu-close-transitions build. The game logic is preserved as a single JavaScript file for this initial migration; inline CSS has been extracted into a stylesheet. This reduces the size of the HTML entry point without risking a large behavioral rewrite.

## Files

- `index.html` — game entry point and UI markup.
- `src/styles.css` — extracted stylesheets, kept in their original order.
- `src/game.js` — current game logic, preserved as one script for a safe first migration.

## Run locally

You can open `index.html` directly in a browser. If your browser restricts local-file behavior, run a local static server from this folder, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Validate JavaScript

Requires Node.js:

```bash
npm run check
```

This performs a syntax check only. It does not validate gameplay behavior.

## Start a Git repository

From this folder:

```bash
git init
git add index.html src/styles.css src/game.js README.md .gitignore package.json
git commit -m "Import Void Explorer v204 baseline"
```

Create an empty repository on your Git hosting service, then add its URL as `origin` and push the `main` branch. Do not commit generated exports or temporary test files.

## Safe refactoring plan

1. Preserve this import as the known-good baseline.
2. Add a smoke-test checklist for core selection, combat, perks, room transitions, Nature drones, and menu open/close transitions.
3. Extract data-only core and perk definitions first.
4. Extract isolated UI helpers next.
5. Separate combat and core-specific systems only after identifying their shared globals and call dependencies.
6. Keep each change small, run `npm run check`, and compare behavior against the baseline.

The JavaScript is intentionally not split into ES modules yet. The current code relies on shared top-level state and functions, so moving functions into modules without mapping dependencies would be a risky rewrite rather than a safe refactor.
