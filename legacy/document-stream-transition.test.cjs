const { test } = require('node:test');
const assert = require('node:assert/strict');
const { firstStreamTarget } = require('./document-stream-transition.cjs');
const { documentTimeline } = require('./document-timeline.cjs');

test('first scatter feeds each stream from its fixed cloud destination without collapse or overshoot', () => {
  const page = [2, 3, 0.12], stream = [-3, 1, -2], scatterScale = 4;
  const cloud = page.map(value => value * scatterScale);
  assert.deepEqual(firstStreamTarget(page, stream, scatterScale, 0, 0), page);
  assert.deepEqual(firstStreamTarget(page, stream, scatterScale, 1, 0), cloud);
  assert.deepEqual(firstStreamTarget(page, stream, scatterScale, 1, 1), stream);
  const forward = [];
  for (let step = 0; step <= 100; step++) {
    const resolve = step / 100;
    const target = firstStreamTarget(page, stream, scatterScale, 1, resolve);
    target.forEach((value, axis) => {
      assert.ok(value >= Math.min(cloud[axis], stream[axis]) - 1e-12);
      assert.ok(value <= Math.max(cloud[axis], stream[axis]) + 1e-12);
    });
    forward.push(target);
  }
  for (let step = 100; step >= 0; step--) {
    assert.deepEqual(firstStreamTarget(page, stream, scatterScale, 1, step / 100), forward[step]);
  }
});

test('assembly does not retract the first scatter source, including reduced motion', () => {
  for (const mobile of [false, true]) for (const reducedMotion of [false, true]) {
    const expected = reducedMotion ? 0.12 : 1;
    for (const progress of [2.3, 2.45, 2.55, 2.65, 2.75, 2.9]) {
      assert.equal(documentTimeline(progress, { mobile, reducedMotion }).firstFormScatter, expected);
    }
  }
});
