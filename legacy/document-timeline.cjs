const { visaStickerPose } = require("./document-motion.cjs");

// Shared scroll choreography for desktop and mobile. Each resolve starts only
// after the preceding formation has broken apart and spent time floating.
const documentPhases = Object.freeze({
  formSettleStart: 0.6,
  formSettleEnd: 1,
  formSettleStagger: 0.14,
  formScatterStart: 1.8,
  formScatterEnd: 2.2,
  streamsAssembleStart: 2.45,
  streamsAssembleEnd: 2.75,
  streamsScatterStart: 3.05,
  streamsScatterEnd: 3.22,
  stampAssembleStart: 3.4,
  stampAssembleEnd: 3.65,
  stampScatterStart: 4.6,
  stampScatterEnd: 4.95,
  finaleAssembleStart: 5.5,
  finaleAssembleEnd: 6,
  finaleAssembleEndMobile: 5.8,
  folderOpenStart: 6.2,
  folderOpenEnd: 6.85,
  folderOpenEndMobile: 6.65
});

function ramp(progress, start, end) {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

function smooth(progress, start, end) {
  const t = ramp(progress, start, end);
  return t * t * (3 - 2 * t);
}

function normalizeFinaleMode(value) {
  return value === "document" ? "document" : "folder";
}

// A single accumulated turn drives both spin and its positional arc. This is
// also evaluated after runtime easing, so the arc cannot outlive the turn.
function documentFlightArc(phase) {
  return Math.sin((phase - Math.floor(phase)) * Math.PI) ** 2;
}

function documentTimeline(progress, { mobile = false, reducedMotion = false, variant = "a", finaleMode = "folder", finaleMix } = {}) {
  const modeMix = finaleMix === undefined ? (normalizeFinaleMode(finaleMode) === "document" ? 1 : 0)
    : Math.min(1, Math.max(0, finaleMix));
  const intro = ramp(progress, 0, 1);
  const formScatter = smooth(progress, documentPhases.formScatterStart, documentPhases.formScatterEnd);
  const streams = smooth(progress, documentPhases.streamsAssembleStart, documentPhases.streamsAssembleEnd);
  const streamScatter = smooth(progress, documentPhases.streamsScatterStart, documentPhases.streamsScatterEnd);
  const stamp = smooth(progress, documentPhases.stampAssembleStart, documentPhases.stampAssembleEnd);
  const stampScatter = smooth(progress, documentPhases.stampScatterStart, documentPhases.stampScatterEnd);
  const folderEnd = mobile ? documentPhases.finaleAssembleEndMobile : documentPhases.finaleAssembleEnd;
  const openEnd = mobile ? documentPhases.folderOpenEndMobile : documentPhases.folderOpenEnd;
  const finale = smooth(progress, documentPhases.finaleAssembleStart, folderEnd);
  const scatter = formScatter * (1 - streams) + streamScatter * (1 - stamp)
    + stampScatter * (1 - finale);
  // Cumulative turns never reset numerically at a hold. Only their periodic
  // rotation is rendered; reverse scrolling follows exactly the same path.
  const flights = [[0.12, 0.84],
    [documentPhases.formScatterStart, documentPhases.streamsAssembleEnd],
    [documentPhases.streamsScatterStart, 3.5],
    [documentPhases.stampScatterStart, mobile ? folderEnd : folderEnd - 0.05]]
    .map(([start, end]) => smooth(progress, start, end));
  const flightPhase = flights.reduce((sum, phase) => sum + phase, 0);
  const flightArc = documentFlightArc(flightPhase);
  // Entrance variants affect only the folder; the enclosed page stays intact.
  const folderBurst = !mobile && !reducedMotion && variant === "b" && progress > 5.55 && progress < folderEnd
    ? Math.sin(ramp(progress, 5.55, folderEnd) * Math.PI) * 0.45
    : 0;

  const folderOpen = smooth(progress, documentPhases.folderOpenStart, openEnd);
  const standaloneFrame = finale * modeMix;
  // The standalone page must stop moving when its assembly finishes on mobile.
  const finaleShift = smooth(progress, 5.7, 6) * (1 - modeMix)
    + smooth(progress, 5.7, folderEnd) * modeMix;
  const visaApplication = ramp(progress, documentPhases.folderOpenStart, openEnd);
  const visaPose = visaStickerPose(visaApplication, reducedMotion);
  return {
    standaloneFrame,
    finaleLayout: finale,
    visaApplication,
    visaAvailable: folderOpen,
    visaIdleWeight: smooth(folderOpen, 0.9, 1) * (1 - modeMix) + smooth(finale, 0.95, 1) * modeMix,
    streams,
    firstFormScatter: formScatter * (reducedMotion ? 0.12 : 1),
    streamScatter,
    streamsTilt: reducedMotion ? 0 : streams * (1 - streamScatter),
    streamsIdle: reducedMotion ? 0 : smooth(streams, 0.9, 1) * (1 - streamScatter),
    flightPhase,
    flightArc,
    flightStrength: reducedMotion ? 0 : mobile ? 0.5 : 1,
    // Four banks: cloud, form, streams, stamp page.
    formation: intro + streams + stamp,
    explode: reducedMotion ? scatter * 0.12 : scatter,
    // The automatic stamp's finished imprint fades with the breaking paper.
    stampScatter,
    x: 3.4 * intro - 3.4 * formScatter - 3.2 * stamp
      + 2.7 * stampScatter - 1.3 * finaleShift - 1.4 * standaloneFrame,
    tilt: intro * (1 - formScatter),
    stamp,
    finale,
    folderAssemble: ramp(progress, documentPhases.finaleAssembleStart, folderEnd),
    folderEnter: finale,
    folderOpacity: smooth(progress, reducedMotion ? 5.66 : 5.54, mobile ? 5.8 : 5.84) * (1 - modeMix),
    folderBurst,
    // One full viewport between the old finale and footer gives the closed folder
    // a distinct hold before all entrance variants share the same opening.
    folderOpen,
    visaReveal: smooth(progress, mobile ? 5.76 : 5.92, folderEnd) * (1 - modeMix) + visaPose.opacity * modeMix,
    // Hide the independent page while the folder enters, including during A/C.
    // It is ready inside before the cover uncovers it; reverse scroll restores the cloud.
    documentVisibility: 1 - (smooth(progress, 5.5, 5.66) - smooth(progress, 6.2, 6.3)) * (1 - modeMix)
  };
}

// One scroll sample is eased before any phase is evaluated. Consumers must not
// ease the resulting phases a second time.
function stepDocumentProgress(previous, target, easing = 0.1) {
  const next = previous + (target - previous) * easing;
  return Math.abs(target - next) < 0.00001 ? target : next;
}

// Shared by position/spring targets and rendered leaf scale (same ID/order).
const documentResolveGLSL = `
vec3 documentResolve(float progress, float delay, float count, vec3 order) {
  vec3 t = clamp(vec3(progress, progress - 1.0, progress - 2.0)
    * (1.0 + vec3(delay, 0.0005, delay) * (count - 1.0))
    - vec3(delay, 0.0005, delay) * order, 0.0, 1.0);
  t.x = t.x < 0.5 ? 16.0 * t.x * t.x * t.x * t.x * t.x
    : 1.0 - pow(-2.0 * t.x + 2.0, 5.0) / 2.0;
  return t;
}
`;

module.exports = { documentPhases, documentTimeline, documentFlightArc, normalizeFinaleMode,
  stepDocumentProgress, documentResolveGLSL };
