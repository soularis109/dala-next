const { documentPhases } = require("./document-timeline.cjs");

const STAMP_DURATION = 1.2;
const REDUCED_STAMP_DURATION = 0.15;
// Shared by the body and the printed ink's page-to-texture mapping.
const STAMP_PLACEMENT = Object.freeze({ x: 1.16, y: -2.4, size: 1.4, angle: -0.2 });

function smooth(time, start, end) {
  const t = Math.min(1, Math.max(0, (time - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

// The same cursor effect serves both assembled pages. The stamp page stays
// still until the automatic body has left, and fades before its own scatter.
function documentScatterWeight(progress, { formation, explode, stampDone = false }) {
  if (explode >= 0.04) return 0;
  if (progress >= 1 && progress < documentPhases.formScatterStart && formation >= 0.98) {
    return 1 - smooth(progress, documentPhases.formScatterStart - 0.1, documentPhases.formScatterStart);
  }
  if (progress >= documentPhases.stampAssembleEnd && progress < documentPhases.stampScatterStart
    && stampDone && Math.abs(formation - 3) < 0.01) {
    return 1 - smooth(progress, documentPhases.stampScatterStart - 0.1, documentPhases.stampScatterStart);
  }
  return 0;
}

// Top-down artwork stays centered on the imprint in the page's plane.
// One uniform scale change conveys contact without sliding or oval distortion.
function stampPose(elapsed, reducedMotion = false) {
  if (reducedMotion) {
    return { scale: 1, opacity: 0, ink: smooth(elapsed, 0, REDUCED_STAMP_DURATION) };
  }
  const approach = smooth(elapsed, 0, 0.35);
  const press = smooth(elapsed, 0.35, 0.5);
  const leave = smooth(elapsed, 0.65, STAMP_DURATION);
  return {
    scale: 1 + 0.12 * (1 - press) + 0.12 * leave,
    opacity: approach * (1 - leave),
    ink: smooth(elapsed, 0.43, 0.5)
  };
}

class StampPlayback {
  constructor() {
    this.state = "idle";
    this.elapsed = 0;
    this._lastTime = null;
    this._reducedMotion = false;
  }

  // Called on both visibility transitions, since browsers may stop RAF while
  // hidden. The first resumed frame must not include the time in another tab.
  resetClock() {
    this._lastTime = null;
  }

  update({ progress, ready, now, hidden = false, reducedMotion = false }) {
    const delta = this._lastTime === null ? 0 : Math.max(0, (now - this._lastTime) / 1000);
    this._lastTime = now;
    const duration = reducedMotion ? REDUCED_STAMP_DURATION : STAMP_DURATION;
    if (reducedMotion !== this._reducedMotion) {
      this.elapsed *= duration / (this._reducedMotion ? REDUCED_STAMP_DURATION : STAMP_DURATION);
      this._reducedMotion = reducedMotion;
    }

    if (progress < documentPhases.stampAssembleStart) {
      // Only returning to the preceding cloud arms a fresh playthrough.
      this.state = "idle";
      this.elapsed = 0;
    } else if (progress >= documentPhases.stampScatterStart) {
      // Fast scrolling can skip the entire cycle. Keep the finished imprint
      // when returning from below, without locking or moving the page.
      this.state = "done";
      this.elapsed = duration;
    } else if (!hidden && ready && progress >= documentPhases.stampAssembleEnd) {
      if (this.state === "idle") {
        this.state = "playing";
        this.elapsed = 0;
      } else if (this.state === "playing") {
        this.elapsed = Math.min(duration, this.elapsed + delta);
        if (this.elapsed >= duration) this.state = "done";
      }
    }

    return stampPose(this.elapsed, reducedMotion);
  }
}

module.exports = { StampPlayback, stampPose, documentScatterWeight, STAMP_PLACEMENT, STAMP_DURATION, REDUCED_STAMP_DURATION };
