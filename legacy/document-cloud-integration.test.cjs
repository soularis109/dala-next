const { test } = require('node:test');
const assert = require('node:assert/strict');
const { cloudIntegration } = require('./document-cloud-integration.cjs');

test('ambient cohort persists through scatter, stream assembly and the next page assembly', () => {
  for (const p of [1.8, 2, 2.2, 2.45, 2.6, 2.75, 2.9, 3.05, 3.22, 3.4, 3.65]) {
    assert.equal(cloudIntegration(p).persistent, true);
  }
  for (const p of [0, 1, 1.79, 3.66, 4.5, 6.9]) assert.equal(cloudIntegration(p).persistent, false);
});

test('per-sheet frame integration reaches full weight before gathering and releases after scatter', () => {
  for (const p of [0, 1.8, 2.2, 3.4, 4, 7]) assert.equal(cloudIntegration(p).bridge, 0);
  for (const p of [2.45, 2.6, 2.75, 2.9, 3.05, 3.22]) assert.equal(cloudIntegration(p).bridge, 1);
  let previous = 0;
  for (let i = 0; i <= 7000; i++) {
    const p = i / 1000, value = cloudIntegration(p).bridge;
    assert.ok(value >= 0 && value <= 1);
    assert.ok(Math.abs(value - previous) < 0.01);
    assert.equal(cloudIntegration(p).bridge, value);
    previous = value;
  }
});
