const { documentPhases } = require('./document-timeline.cjs');

function smooth(value, start, end) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

// Corners are view-space vectors relative to the formation's origin, before
// layout scaling. Solve the perspective clip inequalities for a uniform scale.
function fitBox(corners, frame, centerX, centerY, column, padding = { x: 0, y: 0 }, widthRatio = 0.36) {
  const { width, height, depth, projectionX: px, projectionY: py } = frame;
  const halfWidth = Math.max(1, Math.min(column ? width * widthRatio / 2 : width / 2 - 24,
    centerX - 24, width - 24 - centerX) - padding.x);
  const halfHeight = Math.max(1, Math.min(column ? height * 0.35 : height / 2 - 24,
    centerY - 24, height - 24 - centerY) - padding.y);
  const left = (centerX - halfWidth) / width * 2 - 1;
  const right = (centerX + halfWidth) / width * 2 - 1;
  const top = 1 - (centerY - halfHeight) / height * 2;
  const bottom = 1 - (centerY + halfHeight) / height * 2;
  const x = (centerX / width * 2 - 1) * depth / px;
  const y = (1 - centerY / height * 2) * depth / py;
  let scale = 1;
  for (const point of corners) {
    for (const [coefficient, limit] of [
      [px * point.x + right * point.z, right * depth - px * x],
      [-px * point.x - left * point.z, px * x - left * depth],
      [py * point.y + top * point.z, top * depth - py * y],
      [-py * point.y - bottom * point.z, py * y - bottom * depth],
      [point.z, depth - 0.1]
    ]) {
      if (coefficient > 0) scale = Math.min(scale, Math.max(0, limit / coefficient));
    }
  }
  return { scale, x: x - frame.originX, y: y - frame.originY };
}

function documentLayout(progress, timeline, frame) {
  const columns = frame.width >= 1024;
  const formScatter = smooth(progress, documentPhases.formScatterStart, documentPhases.formScatterEnd);
  const form = smooth(progress, documentPhases.formSettleStart, documentPhases.formSettleEnd) * (1 - formScatter);
  const streams = timeline.streams * (1 - timeline.streamScatter);
  const stamp = timeline.stamp * (1 - timeline.stampScatter);
  const weight = form + streams + stamp;
  const intro = Math.max(0, Math.min(1, progress));
  const oldColumns = frame.mobile ? 0 : 3.4 * (intro - formScatter) - 3.2 * (timeline.stamp - timeline.stampScatter);
  // Return exact identity at hero and finale; don't perturb their established poses.
  if (weight === 0 && (progress <= documentPhases.formSettleStart || progress >= documentPhases.stampScatterEnd)) {
    return { x: frame.legacyX - oldColumns, y: frame.legacyY, scale: 1, weight: 0 };
  }
  const centerY = columns ? frame.height / 2
    : (1 - (frame.legacyY + frame.originY) * frame.projectionY / frame.depth) * frame.height / 2;
  const page = fitBox(frame.pageCorners, frame, frame.width * (columns ? 0.25 : 0.5), centerY, columns);
  const lanes = fitBox(frame.streamCorners, frame, frame.width * (columns ? 0.75 : 0.5), centerY, columns, frame.streamPadding, 0.45);
  return {
    x: frame.legacyX - oldColumns + page.x * (form + stamp) + lanes.x * streams,
    y: frame.legacyY * (1 - weight) + page.y * (form + stamp) + lanes.y * streams,
    scale: 1 + (page.scale - 1) * (form + stamp) + (lanes.scale - 1) * streams,
    weight
  };
}

module.exports = { documentLayout, fitBox };
