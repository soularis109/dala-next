const { test } = require("node:test");
const assert = require("node:assert/strict");
const { idlePose, streamsMotion, streamsFacing, streamsPose, visaStickerPose, stepScatterCell, cursorImpulse } = require("./document-motion.cjs");

test("streams hold their 3D pose while idle changes only translation and small angles", () => {
  const base = streamsPose(0, 1, 0);
  assert.equal(base.rx, 6 * Math.PI / 180);
  assert.equal(base.ry, 5 * Math.PI / 180);
  for (let time = 0; time <= 120; time += 0.25) {
    assert.deepEqual(streamsPose(time, 1, 0), base, "fitting pose must be independent of time");
    const pose = streamsPose(time, 1, 1);
    assert.ok(Math.abs(pose.x) <= 1.5 && Math.abs(pose.y) <= 4);
    assert.ok(Math.abs(pose.rx - base.rx) <= streamsMotion.swayX + 1e-12);
    assert.ok(Math.abs(pose.ry - base.ry) <= streamsMotion.swayY + 1e-12);
    assert.equal(pose.rz, 0);
    assert.equal('scale' in pose, false, "floating never drives scale");
    const narrow = streamsPose(time, 1, 1, true);
    for (const key of Object.keys(pose)) assert.equal(narrow[key], pose[key] * 0.5);
    for (const value of Object.values(streamsPose(time, 0, 0))) assert.equal(Math.abs(value), 0);
  }
  const times = [0, 0.5, 7, 18, 100];
  const forward = times.map(time => streamsPose(time, 1, 1));
  assert.deepEqual(times.toReversed().map(time => streamsPose(time, 1, 1)), forward.toReversed());
});

test("stream faces aim back at the camera from off-axis and raised anchors", () => {
  for (const angle of [-0.075, 0, 0.075]) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const basis = [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, -10, 1];
    for (const [cx, cy] of [[0.75, 0.5], [0.5, 0.5], [0.5, 0.38]]) {
      const facing = streamsFacing(2, 3.2, cx, cy, basis);
      const ray = [-(2 * cx - 1) / 2, -(1 - 2 * cy) / 3.2, 1];
      const length = Math.hypot(...ray);
      const alignment = pose => {
        const x = -Math.sin(pose.ry), y = Math.sin(pose.rx) * Math.cos(pose.ry);
        const z = Math.cos(pose.rx) * Math.cos(pose.ry);
        return ((c * x + s * z) * ray[0] + y * ray[1] + (-s * x + c * z) * ray[2]) / length;
      };
      assert.ok(Math.abs(alignment(facing) - 1) < 1e-12);
      assert.ok(alignment(streamsPose(0, 1, 0, false, facing)) > Math.cos(9 * Math.PI / 180));
      assert.ok(alignment(streamsPose(0, 1, 0, true, facing)) > Math.cos(5 * Math.PI / 180));
      const off = streamsPose(100, 0, 0, false, facing);
      assert.ok(Math.abs(off.rx) === 0 && Math.abs(off.ry) === 0);
    }
  }
});

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
