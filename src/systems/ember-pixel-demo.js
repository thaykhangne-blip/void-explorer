/**
 * Reversible Ember pixel-art visual demo for Void Explorer.
 * The bitmap is deliberately stored as palette-indexed pixel data so the game
 * can render it sharply at any canvas size without external image dependencies.
 */
const CORE_PIXELS = [
  "00000100000",
  "00001210000",
  "00012321000",
  "00123432100",
  "01234543210",
  "12345654321",
  "01234543210",
  "00123432100",
  "00012321000",
  "00001210000",
  "00000100000"
];

const PALETTE = {
  "1": "#78212a",
  "2": "#b92d27",
  "3": "#ed4829",
  "4": "#ff742f",
  "5": "#ffb53e",
  "6": "#ffe16d"
};
const FIRE_COLORS = ["#8d2425", "#e94427", "#ff742f", "#ffb43f", "#ffe16d", "#fff2b2"];
const RING_COLORS = ["#a32b24", "#e94728", "#ff6c2a", "#ff9a32", "#ffd05b"];

const clamp01 = value => Math.max(0, Math.min(1, value));
const snap = (value, grid) => Math.round(value / grid) * grid;

/**
 * Draw the Ember Core as a small animated palette sprite. Call while the
 * canvas is translated to the core's center. Its parent may rotate the canvas
 * toward the current aim direction.
 */
export function drawEmberPixelCore(ctx, {
  size = 10,
  time = 0,
  evoTier = 0,
  dashing = false,
  skillActive = false
} = {}) {
  const pixel = Math.max(1, Math.min(3, Math.round((size * 2) / 11)));
  const left = -(CORE_PIXELS[0].length * pixel) / 2;
  const top = -(CORE_PIXELS.length * pixel) / 2;
  const frame = Math.floor(time / 115) % 4;

  ctx.save();
  ctx.globalAlpha = 1;

  // Flickering outer ember pixels give the core a readable, chunky silhouette.
  const flameBits = [
    [0, -7], [-2, -6], [2, -6], [-6, -3], [6, -3],
    [-7, 0], [7, 0], [-5, 4], [5, 4], [-2, 6], [2, 6], [0, 7]
  ];
  for (let i = 0; i < flameBits.length; i++) {
    if ((i + frame) % 4 === 0) continue;
    const [gx, gy] = flameBits[i];
    const flicker = (i + frame) % 3;
    const px = gx * pixel - pixel / 2;
    const py = gy * pixel - pixel / 2;
    ctx.fillStyle = FIRE_COLORS[(flicker + Math.floor(i / 3)) % FIRE_COLORS.length];
    ctx.fillRect(Math.round(px), Math.round(py), pixel, pixel * ((i + frame) % 5 === 0 ? 2 : 1));
  }

  // A handful of dark-red pixels create a subtle shadow beneath the crystal.
  ctx.fillStyle = "#4a1722";
  ctx.fillRect(-pixel * 2, pixel * 4, pixel * 4, pixel);
  ctx.fillRect(-pixel, pixel * 5, pixel * 2, pixel);

  for (let y = 0; y < CORE_PIXELS.length; y++) {
    const row = CORE_PIXELS[y];
    for (let x = 0; x < row.length; x++) {
      const token = row[x];
      if (token === "0") continue;
      ctx.fillStyle = PALETTE[token];
      ctx.fillRect(
        Math.round(left + x * pixel),
        Math.round(top + y * pixel),
        pixel,
        pixel
      );
    }
  }

  // The center heat pixel flickers between gold and near-white.
  ctx.fillStyle = frame === 1 ? "#fff6c1" : frame === 3 ? "#fff0a6" : "#fff7cf";
  ctx.fillRect(-pixel / 2, -pixel / 2, pixel, pixel);
  ctx.fillStyle = "#fff4c0";
  ctx.fillRect(-pixel * 1.5, -pixel * 1.5, pixel, pixel);

  // E skill and evolution add tiny orbiting pixels rather than smooth vector rings.
  if (skillActive || evoTier > 0) {
    const count = skillActive ? 8 : 4 + Math.min(4, evoTier);
    const phase = time * 0.0015;
    for (let i = 0; i < count; i++) {
      const angle = phase + (i * Math.PI * 2) / count;
      const radius = pixel * (skillActive ? 8 : 7);
      const x = snap(Math.cos(angle) * radius, pixel);
      const y = snap(Math.sin(angle) * radius, pixel);
      ctx.fillStyle = FIRE_COLORS[(i + frame) % FIRE_COLORS.length];
      ctx.fillRect(x - pixel / 2, y - pixel / 2, pixel, pixel);
    }
  }

  // A short square-pixel tail sells the dash without changing movement logic.
  if (dashing) {
    for (let i = 1; i <= 4; i++) {
      ctx.fillStyle = FIRE_COLORS[(i + frame) % FIRE_COLORS.length];
      ctx.globalAlpha = 1 - i * 0.16;
      ctx.fillRect(-pixel * (5 + i * 2), -pixel * (i % 2), pixel * 2, pixel);
    }
  }

  ctx.restore();
}

/** Pixel-block Ring of Fire. This is purely visual; combat radius stays in game.js. */
export function drawEmberPixelRing(ctx, x, y, radius, time = 0, rank = 0) {
  const block = 4;
  const phase = Math.floor(time / 80);
  const segments = 76 + Math.min(20, Math.max(0, rank) * 3);

  ctx.save();
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const wobble = Math.sin(i * 0.83 + phase * 0.37) * 2.5;
    const r = radius + wobble;
    const px = snap(x + Math.cos(angle) * r, block);
    const py = snap(y + Math.sin(angle) * r, block);
    ctx.globalAlpha = 0.72 + 0.23 * (0.5 + 0.5 * Math.sin(i * 0.8 + phase));
    ctx.fillStyle = RING_COLORS[(i + phase) % RING_COLORS.length];
    ctx.fillRect(px - block / 2, py - block / 2, block, block);

    // Every few ring pixels stretches into a chunky outward flame lick.
    if ((i + phase) % 4 === 0) {
      const length = 2 + ((i + phase) % 3);
      for (let step = 1; step <= length; step++) {
        const fx = snap(x + Math.cos(angle) * (r + step * 4), block);
        const fy = snap(y + Math.sin(angle) * (r + step * 4), block);
        ctx.globalAlpha = Math.max(0.12, 0.76 - step * 0.13);
        ctx.fillStyle = RING_COLORS[(i + phase + step) % RING_COLORS.length];
        ctx.fillRect(fx - block / 2, fy - block / 2, block, block);
      }
    }

    // A sparse inner row makes the skill read as a fiery field, not a dotted circle.
    if (i % 5 === 0) {
      const inner = snap(x + Math.cos(angle) * (radius - 10), block);
      const innerY = snap(y + Math.sin(angle) * (radius - 10), block);
      ctx.globalAlpha = 0.38 + 0.25 * (0.5 + 0.5 * Math.sin(time * 0.008 + i));
      ctx.fillStyle = FIRE_COLORS[(i + phase + 1) % FIRE_COLORS.length];
      ctx.fillRect(inner - 2, innerY - 2, block, block);
    }
  }
  ctx.restore();
}

/** Full-screen Solar Flare impact/wave rendered as expanding pixels, not smooth rings. */
export function drawEmberSolarFlare(ctx, fx, width, height) {
  const progress = clamp01(1 - fx.life / Math.max(0.001, fx.max));
  const fade = clamp01(fx.life / Math.max(0.001, fx.max));
  const block = 4;
  const maxRadius = Math.hypot(width, height) * 0.68;
  const radius = maxRadius * progress;
  const centerX = fx.x;
  const centerY = fx.y;

  ctx.save();

  // A restrained warm screen flash accompanies the game-wide hit.
  ctx.globalAlpha = 0.075 * fade;
  ctx.fillStyle = "#ff5422";
  ctx.fillRect(0, 0, width, height);

  // Expanding shockwave: discrete tiles make it read like pixel art.
  const segments = 88;
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2 + progress * 0.08;
    const wobble = Math.sin(i * 1.73 + progress * 14) * 4;
    const px = snap(centerX + Math.cos(angle) * (radius + wobble), block);
    const py = snap(centerY + Math.sin(angle) * (radius + wobble), block);
    ctx.globalAlpha = fade * (0.42 + (i % 4) * 0.1);
    ctx.fillStyle = FIRE_COLORS[(i + Math.floor(progress * 24)) % FIRE_COLORS.length];
    ctx.fillRect(px - block / 2, py - block / 2, block, block);
    if (i % 2 === 0) {
      const tailDistance = Math.max(0, radius - 9);
      const tx = snap(centerX + Math.cos(angle) * tailDistance, block);
      const ty = snap(centerY + Math.sin(angle) * tailDistance, block);
      ctx.globalAlpha = fade * 0.38;
      ctx.fillStyle = "#ffd46a";
      ctx.fillRect(tx - block / 2, ty - block / 2, block, block);
    }
  }

  // The central sunburst is built from rectangular sparks.
  const burstRadius = 8 + progress * 46;
  for (let ray = 0; ray < 16; ray++) {
    const angle = ray * Math.PI / 8;
    for (let step = 1; step <= 4; step++) {
      const d = burstRadius - step * 6;
      if (d <= 0) continue;
      const px = snap(centerX + Math.cos(angle) * d, block);
      const py = snap(centerY + Math.sin(angle) * d, block);
      ctx.globalAlpha = fade * (0.65 - step * 0.1);
      ctx.fillStyle = FIRE_COLORS[(ray + step) % FIRE_COLORS.length];
      ctx.fillRect(px - block / 2, py - block / 2, block, block);
    }
  }

  ctx.globalAlpha = fade * 0.9;
  ctx.fillStyle = "#fff0a6";
  ctx.fillRect(snap(centerX, block) - 6, snap(centerY, block) - 6, 12, 12);
  ctx.fillStyle = "#ff782f";
  ctx.fillRect(snap(centerX, block) - 10, snap(centerY, block) - 2, 20, 4);
  ctx.fillRect(snap(centerX, block) - 2, snap(centerY, block) - 10, 4, 20);

  ctx.restore();
}
