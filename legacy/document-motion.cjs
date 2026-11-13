// Shared, time-based paper motion. Positions are CSS pixels, angles radians.
function smooth(value, start, end) {
  const t = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

function idlePose(time, weight) {
  const phase = time * Math.PI * 2;
  const degrees = Math.PI / 180 * weight;
  return {
    x: Math.sin(phase / 8) * 2 * weight,
    y: Math.sin(phase / 6) * 5 * weight,
    rx: Math.sin(phase / 8) * 0.6 * degrees,
    ry: Math.sin(phase / 10) * 0.8 * degrees,
    rz: Math.sin(phase / 7) * 0.3 * degrees
  };
}

// Stateless sticker application: the input is scroll progress, never elapsed time.
function visaStickerPose(progress, reducedMotion = false) {
  const t = Math.min(1, Math.max(0, progress));
  if (reducedMotion) {
    return { opacity: smooth(t, 0, 1), scale: 1, offsetY: 0, angle: 0, shadow: 0 };
  }
  const lift = 1 - smooth(t, 0, 0.85);
  return {
    opacity: smooth(t, 0, 0.18),
    scale: 1 + 0.08 * lift,
    offsetY: 0.18 * lift,
    angle: lift > 0 ? -2 * Math.PI / 180 * lift : 0,
    shadow: 0.12 * lift
  };
}

function stepScatterCell(index, now, dt, returnSeconds, values, targets, velocities, hitTimes) {
  if (!hitTimes[index]) return false;
  const age = now - hitTimes[index];
  const held = age < 150;
  const omega = held ? 28 : 10 / returnSeconds;
  const decay = Math.exp(-omega * dt);
  for (let component = 0; component < 4; component++) {
    const j = index * 4 + component;
    const target = held ? targets[j] : 0;
    const delta = values[j] - target;
    const c = velocities[j] + omega * delta;
    values[j] = target + (delta + c * dt) * decay;
    velocities[j] = (velocities[j] - omega * c * dt) * decay;
    if (age > 150 + returnSeconds * 1000) values[j] = velocities[j] = 0;
  }
  if (age > 150 + returnSeconds * 1000) hitTimes[index] = 0;
  return true;
}

function cursorImpulse(index, px, py, segment, dt, tune) {
  const [sx, sy, ex, ey] = segment;
  const vx = ex - sx, vy = ey - sy;
  const length2 = vx * vx + vy * vy;
  const t = length2 > 0 ? Math.min(1, Math.max(0, ((px - sx) * vx + (py - sy) * vy) / length2)) : 0;
  let dx = px - sx - t * vx, dy = py - sy - t * vy;
  const distance = Math.hypot(dx, dy);
  const radius = Math.max(1, tune.radius);
  if (distance >= radius) return null;
  const seed = Math.sin(index * 17.371 + 1.3) * 43758.5453;
  const angle = (seed - Math.floor(seed)) * Math.PI * 2;
  dx = dx / Math.max(distance, 1) + Math.cos(angle) * 0.35;
  dy = dy / Math.max(distance, 1) + Math.sin(angle) * 0.35;
  const norm = Math.max(Math.hypot(dx, dy), 0.001);
  const speed = Math.min(1, Math.sqrt(length2) / Math.max(dt * 1000, 1));
  const weight = Math.pow(1 - distance / radius, 1.2) * (0.45 + speed * 0.55);
  const travel = Math.max(0, tune.distance) * weight;
  return { x: px + dx / norm * travel, y: py + dy / norm * travel, hitX: sx + t * vx, hitY: sy + t * vy, weight,
    tilt: (index % 2 ? -1 : 1) * Math.PI / 12 * weight };
}

module.exports = { smooth, idlePose, visaStickerPose, stepScatterCell, cursorImpulse };
