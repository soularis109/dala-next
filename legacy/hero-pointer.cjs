// Self-contained so the root layout can serialize this before hydration.
function installHeroPointer(win) {
  var previous = win.__DALA_HERO_POINTER__;
  if (previous && previous.version === 4) return;
  if (previous && previous.dispose) previous.dispose();
  // Replace older snapshots: their old closures cannot alter the new tracker.
  var point = { x: previous ? previous.x : 0, y: previous ? previous.y : 0,
    known: !!(previous && previous.known), inside: !!(previous && previous.inside),
    sequence: 0, motion: 0, reset: previous ? (previous.reset || 0) + 1 : 0, version: 4, motionTime: null, travel: 0 };
  win.__DALA_HERO_POINTER__ = point;
  var subscriptions = [], ignoreMouseUntil = 0, lastMoveX = null, lastMoveY = null;
  function listen(target, name, fn) {
    target.addEventListener(name, fn, { capture: true, passive: true });
    subscriptions.push([target, name, fn]);
  }
  point.dispose = function () {
    subscriptions.forEach(function (entry) { entry[0].removeEventListener(entry[1], entry[2], true); });
  };
  function leave() {
    if (!point.inside) return;
    point.inside = false;
    point.reset++;
    point.sequence++;
    lastMoveX = lastMoveY = null;
  }
  function isMouse(event) {
    if (event.pointerType && event.pointerType !== "mouse") {
      ignoreMouseUntil = Date.now() + 800;
      return false;
    }
    return !(event.sourceCapabilities && event.sourceCapabilities.firesTouchEvents)
      && !(String(event.type || "").indexOf("mouse") === 0 && Date.now() < ignoreMouseUntil);
  }
  function update(event) {
    if (!isMouse(event)) return;
    if (!Number.isFinite(event.clientX) || !Number.isFinite(event.clientY)) return;
    var moving = event.type === "pointermove" || event.type === "mousemove";
    var sample = moving && (lastMoveX !== event.clientX || lastMoveY !== event.clientY);
    if (sample) {
      if (lastMoveX !== null) point.travel += Math.hypot(event.clientX-lastMoveX,event.clientY-lastMoveY);
      point.motionTime = (win.performance ? win.performance.now() : Date.now()) / 1000;
      point.motion++;
      lastMoveX = event.clientX; lastMoveY = event.clientY;
    }
    if (!sample && point.known && point.inside && point.x === event.clientX && point.y === event.clientY) return;
    point.x = event.clientX;
    point.y = event.clientY;
    point.known = true;
    point.inside = true;
    point.sequence++;
  }
  ["pointerover", "pointermove", "mouseover", "mousemove"]
    .forEach(function (name) { listen(win, name, update); });
  function out(event) { if (!event.relatedTarget && isMouse(event)) leave(); }
  listen(win, "pointerout", out);
  listen(win, "mouseout", out);
  listen(win, "blur", function (event) { if (!event || event.target === win) leave(); });
  listen(win.document, "visibilitychange", function () { if (win.document.hidden) leave(); });
}

// A position can activate hover, but only a new motion sample can produce a sweep.
function consumeHeroPointer(state, point, enabled) {
  if (!enabled || !point || !point.known || !point.inside) {
    state.previous = null;
    return { active: false, segment: null, seed: false };
  }
  const seed = !state.previous || state.reset !== point.reset;
  let segment = null;
  if (!seed && point.motion !== state.motion
    && Math.hypot(point.x - state.previous.x, point.y - state.previous.y) > 0.5) {
    segment = [state.previous.x, state.previous.y, point.x, point.y];
  }
  if (seed || point.sequence !== state.sequence) state.previous = { x: point.x, y: point.y };
  state.motion = point.motion;
  state.sequence = point.sequence;
  state.reset = point.reset;
  return { active: true, segment, seed };
}

module.exports = { installHeroPointer, consumeHeroPointer };
