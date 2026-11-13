const { test } = require("node:test");
const assert = require("node:assert/strict");
const { installHeroPointer, consumeHeroPointer } = require("./hero-pointer.cjs");

function browser() {
  const handlers = {};
  let time = 0;
  const win = {
    PointerEvent: function () {},
    performance: { now: () => time },
    document: { hidden: false, addEventListener: (name, fn) => { handlers[name] = fn; } },
    addEventListener: (name, fn) => { handlers[name] = fn; }
  };
  // Exercise exactly the self-contained function serialized into the root layout.
  new Function("window", `(${installHeroPointer.toString()})(window);`)(win);
  return { win, handlers, point: win.__DALA_HERO_POINTER__, tick: ms => { time += ms; } };
}

test("hover during loading activates at readiness with no click or movement impulse", () => {
  const { point, handlers } = browser();
  const state = {};
  handlers.pointerover({ type: "pointerover", pointerType: "mouse", clientX: 420, clientY: 300 });
  assert.equal(consumeHeroPointer(state, point, false).active, false);
  assert.deepEqual(consumeHeroPointer(state, point, true), { active: true, seed: true, segment: null });
  assert.deepEqual(consumeHeroPointer(state, point, true), { active: true, seed: false, segment: null });
});

test("unknown position waits for real hover; zero coordinates are valid", () => {
  const { point, handlers } = browser();
  const state = {};
  assert.equal(consumeHeroPointer(state, point, true).active, false);
  handlers.pointerover({ type: "pointerover", pointerType: "mouse", clientX: 0, clientY: 0 });
  assert.equal(consumeHeroPointer(state, point, true).active, true);
});

test("real sweeps are consumed once while click and stationary samples cannot push", () => {
  const { point, handlers } = browser();
  const state = {};
  handlers.pointerover({ type: "pointerover", clientX: 100, clientY: 100 });
  consumeHeroPointer(state, point, true);
  handlers.pointermove({ type: "pointermove", clientX: 300, clientY: 100 });
  assert.deepEqual(consumeHeroPointer(state, point, true).segment, [100, 100, 300, 100]);
  assert.equal(consumeHeroPointer(state, point, true).segment, null);
  assert.equal(handlers.pointerdown, undefined);
  assert.equal(handlers.mousedown, undefined);
  assert.equal(consumeHeroPointer(state, point, true).segment, null);
});

test("leave, blur, hidden tabs and scene resets cannot replay an old sweep", () => {
  const { point, handlers, win } = browser();
  let state = {};
  handlers.pointerover({ type: "pointerover", clientX: 100, clientY: 100 });
  consumeHeroPointer(state, point, true);
  for (const leave of [() => handlers.pointerout({ relatedTarget: null }), handlers.blur,
    () => { win.document.hidden = true; handlers.visibilitychange(); }]) {
    leave();
    assert.equal(consumeHeroPointer(state, point, true).active, false);
    win.document.hidden = false;
    handlers.pointermove({ type: "pointermove", clientX: 500, clientY: 300 });
    assert.deepEqual(consumeHeroPointer(state, point, true), { active: true, seed: true, segment: null });
  }
  state = {}; // resize or reverse entry preserves the actual cached hover
  assert.equal(consumeHeroPointer(state, point, true).segment, null);
});

test("touch does not seed a mouse position and tracker installation is idempotent", () => {
  const { point, handlers, win } = browser();
  handlers.pointermove({ type: "pointermove", pointerType: "touch", clientX: 200, clientY: 100 });
  assert.equal(point.known, false);
  const previous = handlers.pointermove;
  installHeroPointer(win);
  assert.equal(handlers.pointermove, previous);
});


test("mouse-only hover works even when PointerEvent exists; paired movement is consumed once", () => {
  const { point, handlers } = browser();
  handlers.mousemove({ type: "mousemove", clientX: 200, clientY: 100 });
  assert.equal(point.known, true);
  assert.equal(point.motion, 1);
  handlers.pointermove({ type: "pointermove", pointerType: "mouse", clientX: 200, clientY: 100 });
  assert.equal(point.motion, 1);
  handlers.mousemove({ type: "mousemove", clientX: 230, clientY: 100 });
  assert.equal(point.motion, 2);
});

test("touch-generated compatibility mouse events cannot activate hover", () => {
  const { point, handlers } = browser();
  handlers.pointermove({ type: "pointermove", pointerType: "touch", clientX: 200, clientY: 100 });
  handlers.mousemove({ type: "mousemove", clientX: 200, clientY: 100, sourceCapabilities: { firesTouchEvents: true } });
  assert.equal(point.known, false);
});


test("focus moving between page elements cannot invalidate the mouse position", () => {
  const { point, handlers, win } = browser();
  handlers.mousemove({ type: "mousemove", clientX: 200, clientY: 100 });
  handlers.blur({ type: "blur", target: {} });
  assert.equal(point.inside, true);
  handlers.blur({ type: "blur", target: win });
  assert.equal(point.inside, false);
});


test("paired events add distance and time once, hover cannot inflate speed", () => {
  const { point, handlers, tick } = browser();
  handlers.mousemove({ type: "mousemove", clientX: 100, clientY: 100 });
  tick(40);
  handlers.pointermove({ type: "pointermove", pointerType: "mouse", clientX: 130, clientY: 140 });
  const time = point.motionTime;
  assert.equal(time, .04);
  assert.equal(point.travel, 50);
  tick(20);
  handlers.mousemove({ type: "mousemove", clientX: 130, clientY: 140 });
  handlers.mouseover({ type: "mouseover", clientX: 130, clientY: 140 });
  assert.equal(point.travel, 50);
  assert.equal(point.motionTime, time);
  handlers.pointermove({ type: "pointermove", pointerType: "mouse", clientX: 100, clientY: 100 });
  assert.equal(point.travel, 100);
  assert.equal(point.motionTime, .06);
});
