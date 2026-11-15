// Seconds after the settled page: short hold, three pairs of values, then a check.
const FORM_DELAY = 0.15;
const FORM_DURATION = 1.8;
const FORM_RESET = 0.85;
const { documentPhases } = require("./document-timeline.cjs");

class FormPlayback {
  constructor() {
    this.state = "idle";
    this.elapsed = 0;
    this._lastTime = null;
    this._reducedMotion = false;
  }
  resetClock() { this._lastTime = null; }
  update({ progress, ready, now, hidden = false, reducedMotion = false }) {
    const delta = this._lastTime === null ? 0 : Math.max(0, (now - this._lastTime) / 1000);
    this._lastTime = now;
    const duration = reducedMotion ? 0.15 : FORM_DELAY + FORM_DURATION;
    if (reducedMotion !== this._reducedMotion) {
      this.elapsed *= duration / (this._reducedMotion ? 0.15 : FORM_DELAY + FORM_DURATION);
      this._reducedMotion = reducedMotion;
    }
    if (progress < FORM_RESET) {
      this.state = "idle";
      this.elapsed = 0;
    } else if (progress >= documentPhases.formScatterStart) {
      this.state = "done";
      this.elapsed = duration;
    } else if (!hidden && ready && progress >= 1) {
      if (this.state === "idle") this.state = "playing";
      else if (this.state === "playing") {
        this.elapsed = Math.min(duration, this.elapsed + delta);
        if (this.elapsed >= duration) this.state = "done";
      }
    }
    // Reduced motion uses the same lifecycle with a single 150 ms fade.
    if (this.state === "done") return 1;
    return reducedMotion ? Math.min(1, this.elapsed / 0.15)
      : Math.min(1, Math.max(0, (this.elapsed - FORM_DELAY) / FORM_DURATION));
  }
}
module.exports = { FormPlayback };
