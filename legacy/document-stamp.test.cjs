const { test } = require("node:test");
const assert = require("node:assert/strict");
const { StampPlayback, stampPose, documentScatterWeight, STAMP_DURATION } = require("./document-stamp.cjs");

function at(player, now, options = {}) {
  return player.update({ progress: 3.8, ready: true, now, ...options });
}

test("the first page keeps its cursor effect while the stamp page waits for completion", () => {
  const form = { formation: 1, explode: 0 };
  assert.equal(documentScatterWeight(1.4, form), 1);
  assert.ok(Math.abs(documentScatterWeight(1.75, form) - 0.5) < 1e-9);
  assert.equal(documentScatterWeight(1.8, form), 0);
  const stamp = { formation: 3, explode: 0 };
  assert.equal(documentScatterWeight(3.8, stamp), 0);
  const player = new StampPlayback();
  at(player, 0);
  at(player, 700);
  assert.equal(documentScatterWeight(3.8, { ...stamp, stampDone: player.state === "done" }), 0);
  at(player, 1201);
  assert.equal(documentScatterWeight(3.8, { ...stamp, stampDone: player.state === "done" }), 1);
});

test("stamp cursor motion fades before the global scatter and requires a settled page", () => {
  const stamp = { formation: 3, explode: 0, stampDone: true };
  assert.equal(documentScatterWeight(3.5, stamp), 0);
  assert.equal(documentScatterWeight(4.5, stamp), 1);
  assert.ok(Math.abs(documentScatterWeight(4.55, stamp) - 0.5) < 1e-9);
  for (const progress of [4.6, 4.95, 5.2, 6, 7]) assert.equal(documentScatterWeight(progress, stamp), 0);
  assert.equal(documentScatterWeight(4, { ...stamp, formation: 2.8 }), 0);
  assert.equal(documentScatterWeight(4, { ...stamp, explode: 0.05 }), 0);
});

test("reverse entry permits cursor motion, but returning above the page rearms the stamp first", () => {
  const player = new StampPlayback();
  const weight = progress => documentScatterWeight(progress, {
    formation: 3, explode: 0, stampDone: player.state === "done"
  });
  at(player, 0, { progress: 5.2 });
  at(player, 100, { progress: 4.1 });
  assert.equal(weight(4.1), 1);
  at(player, 200, { progress: 3.3 });
  at(player, 300);
  assert.equal(weight(3.8), 0);
  at(player, 1501);
  assert.equal(weight(3.8), 1);
});

test("waits for an assembled, settled page and then finishes without scrolling", () => {
  const player = new StampPlayback();
  at(player, 0, { progress: 3.6 });
  at(player, 5000, { ready: false });
  assert.equal(player.state, "idle");
  assert.equal(at(player, 6000).ink, 0);
  assert.equal(player.state, "playing");
  assert.ok(at(player, 6450).ink > 0);
  const finished = at(player, 7201);
  assert.equal(player.state, "done");
  assert.equal(finished.ink, 1);
  assert.equal(finished.opacity, 0);
  assert.deepEqual(at(player, 15000), finished);
});

test("fast forward skips to the finished imprint, and reverse entry does not replay", () => {
  const player = new StampPlayback();
  at(player, 0, { progress: 2.8, ready: false });
  at(player, 20);
  const skipped = at(player, 80, { progress: 5.2, ready: false });
  assert.equal(player.state, "done");
  assert.equal(skipped.ink, 1);
  assert.equal(skipped.opacity, 0);
  assert.deepEqual(at(player, 500, { progress: 4.1 }), skipped);
});

test("only returning to the preceding cloud rearms the automatic cycle", () => {
  const player = new StampPlayback();
  at(player, 0);
  at(player, 1201);
  at(player, 1300, { progress: 3.5, ready: false });
  assert.equal(player.state, "done");
  at(player, 1400, { progress: 3.39, ready: false });
  assert.equal(player.state, "idle");
  assert.equal(at(player, 1500).ink, 0);
  assert.equal(player.state, "playing");
  assert.equal(player.elapsed, 0);
});

test("pauses the clock when hidden and resumes at the same pose", () => {
  const player = new StampPlayback();
  at(player, 0);
  const before = at(player, 250);
  player.resetClock();
  assert.deepEqual(at(player, 10000, { hidden: true }), before);
  player.resetClock();
  assert.deepEqual(at(player, 20000), before);
  at(player, 20100);
  assert.ok(Math.abs(player.elapsed - 0.35) < 1e-9);
});

test("temporarily unsettled paper pauses playback without restarting it", () => {
  const player = new StampPlayback();
  at(player, 0);
  const before = at(player, 250);
  assert.deepEqual(at(player, 500, { ready: false }), before);
  assert.deepEqual(at(player, 1500, { ready: false }), before);
  at(player, 1510);
  assert.ok(Math.abs(player.elapsed - 0.26) < 1e-9);
});

test("reduced motion uses a short ink fade with no moving stamp", () => {
  const player = new StampPlayback();
  at(player, 0, { reducedMotion: true });
  const middle = at(player, 75, { reducedMotion: true });
  assert.ok(middle.ink > 0 && middle.ink < 1);
  assert.equal(middle.opacity, 0);
  assert.equal(middle.scale, 1);
  assert.equal(at(player, 151, { reducedMotion: true }).ink, 1);
  assert.equal(player.state, "done");
  assert.equal(at(player, 200).opacity, 0, "changing the preference must not replay a completed cycle");
});

test("changing the motion preference preserves the current cycle fraction", () => {
  const player = new StampPlayback();
  at(player, 0);
  at(player, 600);
  const reduced = at(player, 600, { reducedMotion: true });
  assert.ok(Math.abs(reduced.ink - 0.5) < 1e-9);
  assert.equal(reduced.opacity, 0);
  assert.equal(at(player, 676, { reducedMotion: true }).ink, 1);
  assert.equal(player.state, "done");
});

test("one centered contact leaves ink, with uniform scale and no sliding or squashing", () => {
  let previous = stampPose(0);
  let previousSlope = 0;
  let contactCount = 0;
  for (let millisecond = 1; millisecond <= STAMP_DURATION * 1000; millisecond++) {
    const pose = stampPose(millisecond / 1000);
    for (const key of ["x", "y", "z", "scaleY"]) {
      assert.equal(key in pose, false, "only uniform scale may move the top-down artwork");
    }
    assert.ok(pose.scale >= 1 && pose.scale <= 1.12);
    assert.ok(pose.opacity >= 0 && pose.opacity <= 1);
    assert.ok(pose.ink >= previous.ink && pose.ink <= 1);
    for (const key of Object.keys(pose)) assert.ok(Math.abs(pose[key] - previous[key]) < 0.03);
    const slope = Math.sign(pose.scale - previous.scale);
    if (slope > 0 && previousSlope < 0) contactCount++;
    if (slope !== 0) previousSlope = slope;
    previous = pose;
  }
  assert.equal(contactCount, 1);
  assert.equal(stampPose(0.35).scale, 1.12);
  assert.equal(stampPose(0.5).scale, 1);
  assert.equal(stampPose(0.65).scale, 1);
  assert.equal(stampPose(0.5).opacity, 1, "the body must cover the ink at contact");
  assert.equal(stampPose(0.65).opacity, 1);
  assert.equal(stampPose(0.5).ink, 1);
  assert.equal(previous.opacity, 0);
});
