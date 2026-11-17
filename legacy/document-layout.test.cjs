const { test } = require('node:test');
const assert = require('node:assert/strict');
const { documentTimeline } = require('./document-timeline.cjs');
const { documentLayout, fitBox } = require('./document-layout.cjs');
const { streamsMotion, streamsFacing, streamsPose } = require('./document-motion.cjs');

function rotateStream(point, pose) {
  // Matches the shader's Rx(-rx) * Ry(-ry) column-major transform.
  const cx = Math.cos(-pose.rx), sx = Math.sin(-pose.rx);
  const cy = Math.cos(-pose.ry), sy = Math.sin(-pose.ry);
  const x = cy * point.x + sy * point.z;
  const z = -sy * point.x + cy * point.z;
  return { x, y: cx * point.y - sx * z, z: sx * point.y + cx * z };
}

test('one stream fit contains the full idle envelope without time-dependent scaling', () => {
  for (const [width, height, narrow] of [[1440, 900, false], [1920, 1080, false], [1024, 768, false], [390, 844, true]]) {
    const f = frame(width, height, 2.9, { mobile: narrow });
    const strength = narrow ? 0.5 : 1;
    const facing = streamsFacing(f.projectionX, f.projectionY, narrow ? 0.5 : 0.75, 0.5);
    const base = streamsPose(0, 1, 0, narrow, facing);
    const radius = Math.hypot(4.4, 2.3, 0.5) * (streamsMotion.swayX + streamsMotion.swayY) * strength;
    const bounds = box(4.4 + radius, 2.3 + radius, 0.5 + radius).map(p => rotateStream(p, base));
    const nearZ = Math.max(0, ...bounds.map(p => p.z));
    const perspective = f.depth / (f.depth - nearZ);
    const layout = fitBox(bounds, f, width * (narrow ? 0.5 : 0.75), height / 2, !narrow,
      { x: 1.5 * strength * perspective, y: 4 * strength * perspective }, 0.45);
    const scale = layout.scale;
    for (let time = 0; time < 60; time += 0.5) {
      const pose = streamsPose(time, 1, 1, narrow, facing);
      const floating = { ...layout,
        x: layout.x + pose.x * 2 * f.depth / (f.projectionX * width),
        y: layout.y + pose.y * 2 * f.depth / (f.projectionY * height) };
      assert.equal(floating.scale, scale);
      for (const point of box(4.4, 2.3, 0.5)) {
        const p = project(rotateStream(point, pose), floating, f);
        assert.ok(p.x >= 24 - 1e-9 && p.x <= width - 24 + 1e-9);
        assert.ok(p.y >= 24 - 1e-9 && p.y <= height - 24 + 1e-9);
        if (!narrow) {
          assert.ok(p.x >= width * 0.525 - 1e-9 && p.x <= width * 0.975 + 1e-9);
          assert.ok(p.y >= height * 0.15 - 1e-9 && p.y <= height * 0.85 + 1e-9);
        }
      }
    }
  }
});

function box(x, y, z) {
  const points = [];
  for (const a of [-x, x]) for (const b of [-y, y]) for (const c of [-z, z]) points.push({ x: a, y: b, z: c });
  return points;
}

function frame(width, height, progress, options = {}) {
  const timeline = documentTimeline(progress, options);
  const aspect = width / height;
  const viewWidth = 10 * Math.min(1, aspect);
  const viewHeight = 10 / Math.max(1, aspect);
  return {
    width, height, depth: 10, projectionX: 20 / viewWidth, projectionY: 20 / viewHeight,
    originX: 0, originY: 0, mobile: options.mobile || false,
    legacyX: options.mobile ? 0 : timeline.x, legacyY: options.mobile ? 1.2 : 0,
    pageCorners: box(2.2 * 4.9 / 4.35, 3.1 * 4.9 / 4.35, 0.16 * 4.9 / 4.35),
    streamCorners: box(4.4, 2.3, 0.5)
  };
}

function project(point, layout, f) {
  const depth = f.depth - point.z * layout.scale;
  return {
    x: ((point.x * layout.scale + layout.x) * f.projectionX / depth + 1) * f.width / 2,
    y: (1 - (point.y * layout.scale + layout.y) * f.projectionY / depth) * f.height / 2
  };
}

test('desktop pages alternate left/right/left and fit their column in perspective', () => {
  for (const [width, height] of [[1440, 900], [1920, 1080], [1024, 768]]) {
    for (const [progress, center] of [[1.4, 0.25], [2.9, 0.75], [4, 0.25]]) {
      const f = frame(width, height, progress);
      const layout = documentLayout(progress, documentTimeline(progress), f);
      assert.ok(Math.abs(project({ x: 0, y: 0, z: 0 }, layout, f).x / width - center) < 1e-12);
      const points = progress === 2.9 ? f.streamCorners : f.pageCorners;
      for (const point of points) {
        const p = project(point, layout, f);
        const halfWidth = progress === 2.9 ? 0.225 : 0.18;
        assert.ok(p.x >= (center - halfWidth) * width - 1e-9 && p.x <= (center + halfWidth) * width + 1e-9);
        assert.ok(p.y >= height * 0.15 - 1e-9 && p.y <= height * 0.85 + 1e-9);
      }
      assert.ok(layout.scale > 0 && layout.scale <= 1);
    }
  }
});

test('stream width grows about a quarter while pages retain their previous fit', () => {
  for (const [width, height] of [[1024, 768], [1440, 900], [1920, 1080]]) {
    const f = frame(width, height, 2.9);
    const previous = fitBox(f.streamCorners, f, width * 0.75, height / 2, true);
    const current = documentLayout(2.9, documentTimeline(2.9), f);
    assert.ok(current.scale / previous.scale > 1.22 && current.scale / previous.scale < 1.28);
    assert.equal(current.x, previous.x);
    const pageFrame = frame(width, height, 1.4);
    const page = documentLayout(1.4, documentTimeline(1.4), pageFrame);
    const pageFit = fitBox(pageFrame.pageCorners, pageFrame, width * 0.25, height / 2, true);
    assert.equal(page.scale, pageFit.scale);
  }
});

test('portrait layouts center formations and retain safe edges without enlarging', () => {
  for (const [width, height, mobile] of [[768, 1024, false], [390, 844, true]]) {
    for (const progress of [1.4, 2.9, 4]) {
      const options = { mobile };
      const f = frame(width, height, progress, options);
      const layout = documentLayout(progress, documentTimeline(progress, options), f);
      assert.equal(layout.x, 0);
      assert.ok(Math.abs(layout.y - f.legacyY) < 1e-12);
      for (const point of progress === 2.9 ? f.streamCorners : f.pageCorners) {
        const p = project(point, layout, f);
        assert.ok(p.x >= 24 - 1e-9 && p.x <= width - 24 + 1e-9);
        assert.ok(p.y >= 24 - 1e-9 && p.y <= height - 24 + 1e-9);
      }
    }
  }
});

test('wide hero and both finale modes retain their established scale and anchors', () => {
  for (const mobile of [false, true]) for (const finaleMode of ['folder', 'document']) {
    const options = { mobile, finaleMode };
    for (const progress of [0, 0.3, 0.6, 4.95, 5.5, 5.8, 6, 6.85, 7]) {
      const f = frame(mobile ? 390 : 1440, mobile ? 844 : 900, progress, options);
      const layout = documentLayout(progress, documentTimeline(progress, options), f);
      assert.equal(layout.scale, 1);
      assert.equal(layout.x, progress <= 0.6 ? 0 : f.legacyX);
      assert.equal(layout.y, f.legacyY);
    }
  }
});

test('layout is continuous, deterministic on pause/reverse, and independent of previous resize', () => {
  const stops = [0.6, 0.75, 1, 1.8, 2.2, 2.6, 2.9, 3.1, 3.4, 3.65, 4.6, 4.95, 6];
  const at = progress => documentLayout(progress, documentTimeline(progress), frame(1440, 900, progress));
  const forward = stops.map(at);
  assert.deepEqual(stops.toReversed().map(at), forward.toReversed());
  for (const progress of stops) {
    documentLayout(progress, documentTimeline(progress), frame(390, 844, progress));
    assert.deepEqual(at(progress), forward[stops.indexOf(progress)]);
    const before = at(progress - 1e-7), after = at(progress + 1e-7);
    for (const key of ['x', 'y', 'scale']) assert.ok(Math.abs(after[key] - before[key]) < 1e-4);
  }
});

test('perspective fitting accounts for rotated corners and camera origin', () => {
  const f = frame(1440, 900, 1.4);
  const points = f.pageCorners.map(p => ({ x: p.x * Math.cos(0.32) + p.z * Math.sin(0.32),
    y: p.y, z: -p.x * Math.sin(0.32) + p.z * Math.cos(0.32) }));
  const layout = fitBox(points, { ...f, originX: 0.4, originY: -0.1 }, 360, 450, true);
  for (const point of points) {
    const p = project(point, { ...layout, x: layout.x + 0.4, y: layout.y - 0.1 }, f);
    assert.ok(p.x >= 0.07 * f.width - 1e-9 && p.x <= 0.43 * f.width + 1e-9);
    assert.ok(p.y >= 0.15 * f.height - 1e-9 && p.y <= 0.85 * f.height + 1e-9);
  }
});
