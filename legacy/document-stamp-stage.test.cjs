const { test } = require('node:test');
const assert = require('node:assert/strict');
const { sample, fitDocument } = require('./document-stamp-stage.cjs');

test('left edge stays closer than the right edge throughout the press', () => {
  assert.equal(sample(3.55).angle, 0);
  for (const progress of [3.7,3.9,4.05,4.12,4.22,4.4]) {
    const { angle } = sample(progress);
    const leftDepth = 10-(-(-1.7)*Math.sin(angle));
    const rightDepth = 10-(-1.7*Math.sin(angle));
    assert.ok(leftDepth < rightDepth);
  }
  assert.ok(Math.abs(sample(3.9).angle-20*Math.PI/180)<1e-12);
});

test('ink is absent before contact and remains after the body has left', () => {
  assert.equal(sample(3.9).ink, 0);
  assert.equal(sample(4.05).ink, 0);
  assert.ok(sample(4.12).ink > 0 && sample(4.12).ink < 1);
  assert.equal(sample(4.4).ink, 1);
  assert.equal(sample(4.4).opacity, 0);
  assert.equal(sample(4.4).scatter, 0);
  assert.equal(sample(5).scatter, 1);
});

test('reverse scroll and skipped stages have no playback history or clock', () => {
  const forward = [0,3.12,3.3,3.65,3.9,4.05,4.12,4.22,4.4,5,6];
  const snapshots = new Map(forward.map(p => [p,sample(p)]));
  for (const p of forward.toReversed()) assert.deepEqual(sample(p), snapshots.get(p));
  assert.equal(sample(6).ink, 1);
  assert.equal(sample(3.9).ink, 0);
  assert.equal(sample(4.12,true).opacity, 0);
  assert.equal(sample(4.12,true).ink, sample(4.12).ink);
});

test('page including the lifted stamp fits desktop and phone safe bands', () => {
  for (const [width,height] of [[1440,900],[1024,768],[1920,1080],[390,844],[375,667]]) {
    const py=1/Math.tan(50*Math.PI/360), px=py/(width/height);
    const top=100, bottom=height-130;
    const layout=fitDocument({width,height,projectionX:px,projectionY:py,top,bottom,maxScale:1.8,radius:.06});
    assert.ok(layout.scale>0 && layout.scale<=1.8);
    assert.ok(layout.x<layout.startX);
    for (let p=3.3;p<=4.3;p+=.01) {
      const state=sample(p), cx=layout.startX+(layout.x-layout.startX)*state.move;
      for (const x of [-1.7,1.7]) for (const y of [-2.4,2.4]) for (const z of [0,1.1]) {
        const vx=cx+layout.scale*(x*Math.cos(state.angle)+z*Math.sin(state.angle));
        const vy=layout.y+y*layout.scale;
        const depth=10-layout.scale*(-x*Math.sin(state.angle)+z*Math.cos(state.angle));
        const sx=(1+px*vx/depth)*width/2, sy=(1-py*vy/depth)*height/2;
        assert.ok(sx>=24 && sx<=width-24, `${width}: x ${sx}`);
        assert.ok(sy>=top && sy<=bottom, `${height}: y ${sy}`);
      }
    }
  }
});
