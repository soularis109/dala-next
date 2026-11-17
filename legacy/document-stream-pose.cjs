const STREAM_SIZE_RATIO = 1.5;
const STREAM_DEPTH_FRACTION = (STREAM_SIZE_RATIO - 1) / (STREAM_SIZE_RATIO + 1);

// Fit a frontal, stationary formation. Card centers have a depth gradient;
// individual paper faces stay parallel to the camera, so the print is readable.
function streamPose({ width, height, projectionX: px, projectionY: py, factor = 1, mobile = false, depth = 10, cards, paperScale = 1 }) {
  const columns = width >= 1024;
  const leftPx = columns ? width / 2 : 24;
  const rightPx = width - 24;
  const left = leftPx / width * 2 - 1, right = rightPx / width * 2 - 1;
  const centerY = columns ? height / 2 : (1 - (mobile ? 1.2 : 0) * py / depth) * height / 2;
  const halfHeight = Math.max(1, Math.min(columns ? height * .35 : height / 2 - 24, centerY - 24, height - 24 - centerY));
  const top = 1 - (centerY - halfHeight) / height * 2;
  const bottom = 1 - (centerY + halfHeight) / height * 2;
  if (cards?.length) return fitCards({ width, height, px, py, factor, depth,
    left, right, top, bottom, centerY, cards, paperScale });
  const halfX = 4.4 * factor;
  const slope = depth * STREAM_DEPTH_FRACTION / (4.05 * factor);
  // Center the projected envelope, accounting for its unequal end depths.
  const x = (depth * (left + right) - slope * halfX * (right - left)) / (2 * px);
  const y = (1 - centerY / height * 2) * depth / py;
  let scale = 1.25;
  for (const bx of [-halfX, halfX]) for (const by of [-2.3 * factor, 2.3 * factor]) for (const bz of [-.5 * factor, .5 * factor]) {
    const d = depth - slope * bx;
    for (const [coefficient, limit] of [
      [px * bx + right * bz, right * d - px * x],
      [-px * bx - left * bz, px * x - left * d],
      [py * by + top * bz, top * d - py * y],
      [-py * by - bottom * bz, py * y - bottom * d],
      [bz, d - .1]
    ]) if (coefficient > 0) scale = Math.min(scale, Math.max(0, limit / coefficient));
  }
  return { x, y, z: -depth, scale, slope };
}
// A fixed bounding box invents simultaneous extreme X/Y/Z corners. Fit the
// actual visible sheets instead, reserving a conservative per-axis envelope for each
// paper's aspect jitter, bend and frozen in-plane rotation.
function fitCards({ width, height, px, py, factor, depth, left, right, top, bottom, centerY, cards, paperScale }) {
  // Keep two extra screen pixels for half-float quantization and filtering.
  left += 4 / width; right -= 4 / width;
  top -= 4 / height; bottom += 4 / height;
  const slope = depth * STREAM_DEPTH_FRACTION / (4.05 * factor);
  const points = cards.map(card => ({ x: card.x * factor, y: card.y * factor,
    z: card.z * factor,
    rx: (card.halfX ?? card.radius) * paperScale + .015 * factor,
    ry: (card.halfY ?? card.radius) * paperScale + .015 * factor,
    rz: (card.halfZ ?? card.radius) * paperScale + .015 * factor }));
  const preferredY = (1 - centerY / height * 2) * depth / py;
  function interval(scale) {
    let minX = -Infinity, maxX = Infinity, minY = -Infinity, maxY = Infinity;
    for (const point of points) {
      const { x, y, z, rx, ry, rz } = point;
      const d = depth - slope * x;
      if (d - scale * (z + rz) < .1) return null;
      minX = Math.max(minX, left / px * d - scale * (x + left / px * z) + scale * (rx + rz * Math.abs(left / px)));
      maxX = Math.min(maxX, right / px * d - scale * (x + right / px * z) - scale * (rx + rz * Math.abs(right / px)));
      minY = Math.max(minY, bottom / py * d - scale * (y + bottom / py * z) + scale * (ry + rz * Math.abs(bottom / py)));
      maxY = Math.min(maxY, top / py * d - scale * (y + top / py * z) - scale * (ry + rz * Math.abs(top / py)));
      if (minX > maxX || minY > maxY) return null;
    }
    return { minX, maxX, minY, maxY };
  }
  let lo = 0, hi = 1;
  while (hi < 256 && interval(hi)) hi *= 2;
  for (let step = 0; step < 36; step++) {
    const middle = (lo + hi) / 2;
    if (interval(middle)) lo = middle; else hi = middle;
  }
  const bounds = interval(lo);
  return { x: (bounds.minX + bounds.maxX) / 2,
    y: Math.max(bounds.minY, Math.min(bounds.maxY, preferredY)),
    z: -depth, scale: lo, slope };
}
module.exports = { STREAM_SIZE_RATIO, streamPose };
