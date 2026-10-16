/**
 * Reversible Frost pixel-art demo visuals for Void Explorer.
 * These are canvas-rendered pixel sprites/effects. Combat timing and damage stay in game.js.
 */
const ICE_PALETTE = {
  outline: "#16426c",
  deep: "#2569a3",
  mid: "#51b9ed",
  bright: "#a7edff",
  white: "#f2feff",
  shade: "#3478bb"
};
const ICE_FLAKES = [
  "0001000",
  "0011100",
  "0101010",
  "1111111",
  "0101010",
  "0011100",
  "0001000"
];
const pxSnap = (n, g) => Math.round(n / g) * g;
const pxClamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

function drawPixelFlake(ctx, x, y, scale, color, alpha = 1, spin = 0) {
  ctx.save();
  ctx.translate(pxSnap(x, scale), pxSnap(y, scale));
  ctx.rotate(spin);
  ctx.globalAlpha *= alpha;
  ctx.fillStyle = color;
  for (let row = 0; row < ICE_FLAKES.length; row++) {
    for (let col = 0; col < ICE_FLAKES[row].length; col++) {
      if (ICE_FLAKES[row][col] !== "1") continue;
      ctx.fillRect((col - 3) * scale, (row - 3) * scale, scale, scale);
    }
  }
  ctx.restore();
}

/** Draw while the game canvas is translated to the Frost Core center. */
export function drawFrostPixelCore(ctx, { size = 6, time = 0, evoTier = 0, dashing = false, shieldActive = false } = {}) {
  const unit = Math.max(1, Math.min(3, Math.round((size * 2 + 4) / 14)));
  const t = Math.floor(time / 135) % 4;
  const crystal = [
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
  const colors = [ICE_PALETTE.outline, ICE_PALETTE.deep, ICE_PALETTE.mid, ICE_PALETTE.bright, ICE_PALETTE.white, t === 2 ? "#ffffff" : "#d7f8ff"];
  const left = -(crystal[0].length * unit) / 2;
  const top = -(crystal.length * unit) / 2;

  ctx.save();

  // Floating frost chips make the outer contour visibly pixelated in motion.
  const chips = [[-7,-3],[-6,3],[-3,-7],[3,-6],[7,-2],[6,4],[2,7],[-2,6]];
  for (let i = 0; i < chips.length; i++) {
    if ((i + t) % 3 === 0) continue;
    const [gx, gy] = chips[i];
    ctx.fillStyle = i % 2 ? ICE_PALETTE.bright : ICE_PALETTE.mid;
    ctx.globalAlpha = .72 + .22 * Math.sin(time * .005 + i);
    ctx.fillRect(gx * unit - unit / 2, gy * unit - unit / 2, unit, unit);
  }
  ctx.globalAlpha = 1;

  // Dark bevel, pale face and a clean white glint.
  for (let y = 0; y < crystal.length; y++) {
    for (let x = 0; x < crystal[y].length; x++) {
      const n = Number(crystal[y][x]);
      if (!n) continue;
      ctx.fillStyle = colors[n - 1];
      ctx.fillRect(Math.round(left + x * unit), Math.round(top + y * unit), unit, unit);
    }
  }
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-unit / 2, -unit * 2, unit, unit);
  ctx.fillStyle = "#d9faff";
  ctx.fillRect(-unit * 2, -unit / 2, unit, unit);

  // Little orbiting square flakes are used instead of smooth vector rings.
  if (shieldActive || evoTier > 0) {
    const count = shieldActive ? 8 : 4 + Math.min(4, evoTier);
    const phase = time * .00115;
    for (let i = 0; i < count; i++) {
      const a = phase + i * Math.PI * 2 / count;
      const r = unit * (shieldActive ? 9 : 7);
      ctx.fillStyle = i % 3 === 0 ? "#ffffff" : ICE_PALETTE.bright;
      ctx.fillRect(pxSnap(Math.cos(a) * r, unit), pxSnap(Math.sin(a) * r, unit), unit * 1.5, unit * 1.5);
    }
  }

  if (dashing) {
    for (let i = 1; i <= 5; i++) {
      ctx.globalAlpha = 1 - i * .15;
      ctx.fillStyle = i % 2 ? ICE_PALETTE.bright : ICE_PALETTE.mid;
      ctx.fillRect(-unit * (4 + i * 2), -unit * (i % 2 ? 1 : 0), unit * 2, unit);
    }
  }
  ctx.restore();
}

/** Crisp, compact icy bolt. Parent has already translated and rotated to projectile direction. */
export function drawFrostPixelBolt(ctx, bolt, time = 0) {
  const u = pxClamp(Math.round((bolt.r || 3) / 2), 1, 3);
  const flicker = Math.floor(time / 90) % 2;
  ctx.save();
  ctx.globalAlpha = .42;
  ctx.fillStyle = ICE_PALETTE.mid;
  ctx.fillRect(-u * 7, -u * 2, u * 10, u * 4);
  ctx.globalAlpha = 1;
  ctx.fillStyle = ICE_PALETTE.deep;
  ctx.fillRect(-u * 4, -u * 2, u * 8, u * 4);
  ctx.fillStyle = ICE_PALETTE.mid;
  ctx.fillRect(-u * 2, -u * 2, u * 7, u * 4);
  ctx.fillStyle = ICE_PALETTE.bright;
  ctx.fillRect(-u, -u, u * 5, u * 2);
  ctx.fillStyle = flicker ? "#ffffff" : ICE_PALETTE.white;
  ctx.fillRect(u * 2, -u, u * 2, u * 2);
  ctx.fillStyle = ICE_PALETTE.deep;
  ctx.fillRect(-u * 5, -u * 3, u * 2, u * 2);
  ctx.fillRect(-u * 5, u, u * 2, u * 2);
  ctx.fillStyle = ICE_PALETTE.bright;
  ctx.fillRect(-u * 2, -u * 3, u * 2, u);
  ctx.fillRect(-u * 2, u * 2, u * 2, u);
  ctx.restore();
}

/** Pixel-tile Frost Field and faceted shield. No damage or collision logic lives here. */
export function drawFrostPixelShield(ctx, x, y, radius, playerRadius, time = 0, shieldRatio = 1) {
  const tile = 5;
  const phase = Math.floor(time / 110);
  const pulse = .5 + .5 * Math.sin(time * .004);
  const r2 = radius * radius;

  ctx.save();
  // Sparse cyan floor tiles imply a cold field without a smooth gradient wash.
  for (let gy = -radius; gy <= radius; gy += tile * 2) {
    for (let gx = -radius; gx <= radius; gx += tile * 2) {
      const d2 = gx * gx + gy * gy;
      if (d2 > r2 || d2 < (playerRadius + 7) * (playerRadius + 7)) continue;
      const hash = (Math.abs(gx * 7 + gy * 13 + phase * 17) % 11);
      if (hash < 6) continue;
      ctx.globalAlpha = .05 + pulse * .045 + (hash % 3) * .015;
      ctx.fillStyle = hash % 2 ? ICE_PALETTE.mid : ICE_PALETTE.bright;
      ctx.fillRect(pxSnap(x + gx, tile), pxSnap(y + gy, tile), tile, tile);
    }
  }

  // Rotating segmented perimeter made of square blocks.
  const segments = 84;
  for (let i = 0; i < segments; i++) {
    const a = i / segments * Math.PI * 2 + time * .0003;
    const rr = radius + Math.sin(i * .9 + phase * .4) * 2;
    const sx = pxSnap(x + Math.cos(a) * rr, tile);
    const sy = pxSnap(y + Math.sin(a) * rr, tile);
    ctx.globalAlpha = .62 + .3 * (.5 + .5 * Math.sin(i + phase));
    ctx.fillStyle = i % 5 === 0 ? "#ffffff" : (i % 2 ? ICE_PALETTE.mid : ICE_PALETTE.bright);
    ctx.fillRect(sx - tile / 2, sy - tile / 2, tile, tile);
  }

  // Faceted six-sided shield hovering around the core.
  const shieldRadius = playerRadius + 18;
  const points = [];
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3 + Math.PI / 6 + time * .00022;
    points.push({x: pxSnap(x + Math.cos(a) * shieldRadius, tile), y: pxSnap(y + Math.sin(a) * shieldRadius, tile)});
  }
  ctx.globalAlpha = .65 + pulse * .25;
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length];
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    const steps = Math.max(1, Math.round(length / tile));
    for (let j = 0; j <= steps; j++) {
      const px = pxSnap(a.x + (b.x - a.x) * j / steps, tile);
      const py = pxSnap(a.y + (b.y - a.y) * j / steps, tile);
      ctx.fillStyle = (j + i) % 4 === 0 ? "#ffffff" : ICE_PALETTE.bright;
      ctx.fillRect(px - tile / 2, py - tile / 2, tile, tile);
    }
  }
  ctx.globalAlpha = .13 + pulse * .08;
  ctx.fillStyle = ICE_PALETTE.mid;
  ctx.fillRect(pxSnap(x, tile) - tile * 2, pxSnap(y, tile) - tile * 2, tile * 4, tile * 4);
  ctx.globalAlpha = .35 + .3 * shieldRatio;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  ctx.strokeRect(pxSnap(x, tile) - 2, pxSnap(y, tile) - 2, 4, 4);
  ctx.restore();
}

/** Blizzard rendered with chunky falling flakes and pixel wind bands. */
export function drawFrostPixelSnowstorm(ctx, fx, width, height) {
  const fade = pxClamp(fx.life / Math.max(.001, fx.max), 0, 1);
  const elapsed = fx.max - fx.life;
  const phase = Math.floor(elapsed * 18);
  const radius = fx.radius || Math.max(width, height) * .62;

  ctx.save();
  ctx.globalAlpha = .09 * fade;
  ctx.fillStyle = "#5abde9";
  ctx.fillRect(0, 0, width, height);

  // Moving square shards cover the full storm radius. Every position is grid-snapped.
  for (let i = 0; i < 150; i++) {
    const seed = i * 2.3999632297;
    const band = i % 7;
    const drift = elapsed * (35 + (i % 9) * 12);
    const baseRadius = Math.sqrt(((i * 47) % 181) / 180);
    const a = seed + elapsed * (.42 + (i % 5) * .12) * (i % 2 ? -1 : 1);
    const rx = width * .08 + baseRadius * Math.min(width * .72, radius);
    const ry = height * .08 + baseRadius * Math.min(height * .72, radius);
    let sx = fx.x + Math.cos(a) * rx + Math.sin(elapsed + i) * 16;
    let sy = fx.y + Math.sin(a) * ry + drift;
    sx = ((sx % (width + 20)) + width + 20) % (width + 20) - 10;
    sy = ((sy % (height + 20)) + height + 20) % (height + 20) - 10;
    const scale = 2 + i % 3;
    ctx.globalAlpha = fade * (.25 + (i % 5) * .1);
    ctx.fillStyle = i % 6 === 0 ? "#ffffff" : (band % 2 ? ICE_PALETTE.bright : ICE_PALETTE.mid);
    if (i % 4 === 0) {
      drawPixelFlake(ctx, sx, sy, scale, ctx.fillStyle, ctx.globalAlpha, a + Math.PI / 4);
    } else {
      ctx.fillRect(pxSnap(sx, scale), pxSnap(sy, scale), scale, scale * (2 + i % 3));
    }
  }

  // Pixel storm rings spiral around the core, with no smooth vector circles.
  const rings = [Math.max(18, radius * .24), Math.max(30, radius * .46), Math.max(42, radius * .72)];
  for (let ring = 0; ring < rings.length; ring++) {
    const ringR = rings[ring];
    const count = 70 + ring * 14;
    for (let i = 0; i < count; i++) {
      const a = i / count * Math.PI * 2 + elapsed * (.55 + ring * .18) * (ring % 2 ? -1 : 1);
      if ((i + phase + ring) % 3 === 0) continue;
      const x = pxSnap(fx.x + Math.cos(a) * ringR, 4);
      const y = pxSnap(fx.y + Math.sin(a) * ringR, 4);
      ctx.globalAlpha = fade * (.23 + (i % 4) * .09);
      ctx.fillStyle = (i + ring) % 6 === 0 ? "#ffffff" : ICE_PALETTE.bright;
      ctx.fillRect(x - 2, y - 2, 4, 4);
    }
  }

  // Cold starburst at the center of the ultimate cast.
  const burst = 7 + Math.min(24, elapsed * 30);
  for (let arm = 0; arm < 8; arm++) {
    const a = arm * Math.PI / 4;
    for (let step = 1; step <= 5; step++) {
      const d = burst - step * 4;
      if (d <= 0) continue;
      const x = pxSnap(fx.x + Math.cos(a) * d, 4);
      const y = pxSnap(fx.y + Math.sin(a) * d, 4);
      ctx.globalAlpha = fade * (.8 - step * .12);
      ctx.fillStyle = step === 1 ? "#ffffff" : ICE_PALETTE.bright;
      ctx.fillRect(x - 2, y - 2, 4, 4);
    }
  }
  ctx.restore();
}
