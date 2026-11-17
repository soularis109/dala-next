const { test } = require('node:test');
const assert = require('node:assert/strict');
const { streamDescriptorForId, streamPosition } = require('./document-stream-motion.cjs');

// Captured from the original asset generator before extracting its path logic.
const fixtures = [[0,[1.2973056934308262,-0.126125976182051,-0.19057751584332436]],
  [1,[0.15925629520788753,1.6630184573157072,0.01484747277572751]],
  [7,[3.331317663635127,-0.49454993313574946,0.005950202210806311]],
  [1234,[3.823719660518691,-0.5361282050319468,0.0436182013945654]],
  [9999,[-1.8948678395943714,1.2575573799367588,0.07067501584533602]]];

test('static positions reproduce the original seeded waves without changing their shape', () => {
  for (const [id, expected] of fixtures) {
    const actual = streamPosition(streamDescriptorForId(id));
    actual.forEach((v, axis) => assert.ok(Math.abs(v - expected[axis]) < 1e-12));
  }
});
test('static stream positions are deterministic for all five lanes', () => {
  const lanes = new Set();
  for (let id = 0; id < 10000; id += 3) {
    const path = streamDescriptorForId(id); lanes.add(path[0]);
    assert.deepEqual(streamPosition(path), streamPosition(streamDescriptorForId(id)));
    assert.ok(Math.abs(streamPosition(path)[0]) <= 4.05);
  }
  assert.equal(lanes.size, 5);
});

test('paper and cross-section share a 25% gain without changing the five wave axes or depth', () => {
  const { thickerStreamPosition, STREAM_APPEARANCE_GAIN } = require('./document-stream-motion.cjs');
  assert.equal(STREAM_APPEARANCE_GAIN,1.25);
  for(let id=0;id<10000;id++){
    const path=streamDescriptorForId(id),before=streamPosition(path),after=thickerStreamPosition(before);
    const axis=(path[0]-2)*.78+Math.sin(path[1]*Math.PI*2+path[0]*.85)*.28;
    assert.equal(before[0],after[0]);assert.equal(before[2],after[2]);
    assert.ok(Math.abs((after[1]-axis)-(before[1]-axis)*1.25)<1e-12);
    assert.deepEqual(thickerStreamPosition(before,1),before);
    // Paper half-height and center scatter add, rather than multiply each other.
    const halfPaper=.1;
    assert.ok(Math.abs((Math.abs(after[1]-axis)+halfPaper*1.25)/(Math.abs(before[1]-axis)+halfPaper)-1.25)<1e-12);
  }
});
