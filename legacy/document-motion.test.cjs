const { test } = require("node:test");
const assert = require("node:assert/strict");
const { idlePose, visaStickerPose, stepScatterCell, cursorImpulse } = require("./document-motion.cjs");

test("idle strength zero removes motion and mobile half weight halves the pose", () => {
  for (const time of [0, 1.5, 17, 123]) {
    const full = idlePose(time, 1), half = idlePose(time, 0.5), off = idlePose(time, 0);
    for (const key of Object.keys(full)) {
      assert.equal(Math.abs(off[key]), 0);
      assert.equal(half[key], full[key] / 2);
    }
    assert.ok(Math.abs(full.x) <= 2 && Math.abs(full.y) <= 5);
  }
});

test("swept cursor crosses a cell even when both endpoints are outside it", () => {
  const tune = { radius: 45, distance: 25 };
  const segment = [-100, 0, 100, 0];
  const hit = cursorImpulse(7, 0, 0, segment, 1 / 60, tune);
  assert.ok(hit);
  assert.ok(Math.hypot(hit.x, hit.y) <= 25 + 1e-9);
  assert.ok(Math.abs(hit.tilt) <= Math.PI / 12);
  assert.deepEqual(hit, cursorImpulse(7, 0, 0, segment, 1 / 60, tune));
  assert.equal(cursorImpulse(7, 0, 46, segment, 1 / 60, tune), null);
});

test("spring holds briefly then returns every component to exact zero", () => {
  const values = new Float32Array(4), velocities = new Float32Array(4);
  const targets = new Float32Array([1, -1, 0.1, Math.PI / 12]);
  const hitTimes = new Float64Array([100]);
  for (let frame = 1; frame <= 6; frame++) {
    stepScatterCell(0, 100 + frame * 1000 / 60, 1 / 60, 1, values, targets, velocities, hitTimes);
  }
  assert.ok(values[0] > 0.5 && values[1] < -0.5);
  for (let frame = 7; frame <= 72; frame++) {
    stepScatterCell(0, 100 + frame * 1000 / 60, 1 / 60, 1, values, targets, velocities, hitTimes);
  }
  assert.deepEqual([...values], [0, 0, 0, 0]);
  assert.deepEqual([...velocities], [0, 0, 0, 0]);
  assert.equal(hitTimes[0], 0);
  assert.equal(stepScatterCell(0, 1500, 1 / 60, 1, values, targets, velocities, hitTimes), false);
});


test("sticker approach ends in the original static artwork pose, then holds contact", () => {
  const start = visaStickerPose(0);
  assert.equal(start.opacity, 0);
  assert.equal(start.scale, 1.08);
  assert.equal(start.offsetY, 0.18);
  assert.ok(start.angle < 0 && start.shadow > 0);
  const contact = { opacity: 1, scale: 1, offsetY: 0, angle: 0, shadow: 0 };
  for (const progress of [0.85, 0.9, 1, 2]) assert.deepEqual(visaStickerPose(progress), contact);
  assert.deepEqual(visaStickerPose(-1), start);
  let previous = start;
  for (let i = 1; i <= 100; i++) {
    const pose = visaStickerPose(i / 100);
    assert.ok(pose.scale <= previous.scale && pose.scale >= 1);
    assert.ok(pose.offsetY <= previous.offsetY && pose.offsetY >= 0);
    assert.ok(pose.shadow <= previous.shadow && pose.shadow >= 0);
    assert.ok(pose.opacity >= previous.opacity && pose.opacity <= 1);
    previous = pose;
  }
});

test("sticker pose is reversible and reduced motion uses only an opacity change", () => {
  const stops = [0, 0.1, 0.4, 0.7, 0.9, 1];
  const forward = stops.map(progress => visaStickerPose(progress));
  stops.toReversed().forEach((progress, index) => assert.deepEqual(visaStickerPose(progress), forward[forward.length - 1 - index]));
  for (const progress of stops) {
    const pose = visaStickerPose(progress, true);
    assert.equal(pose.scale, 1);
    assert.equal(pose.offsetY, 0);
    assert.equal(pose.angle, 0);
    assert.equal(pose.shadow, 0);
  }
  assert.equal(visaStickerPose(0.5, true).opacity, 0.5);
});
