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
  stampScatterEnd: 4.95
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

function documentTimeline(progress, { mobile = false, reducedMotion = false, variant = "a", finaleMode = "folder", finaleMix } = {}) {
  const modeMix = finaleMix === undefined ? (normalizeFinaleMode(finaleMode) === "document" ? 1 : 0)
    : Math.min(1, Math.max(0, finaleMix));
  const intro = ramp(progress, 0, 1);
  const formScatter = smooth(progress, documentPhases.formScatterStart, documentPhases.formScatterEnd);
  const streams = smooth(progress, documentPhases.streamsAssembleStart, documentPhases.streamsAssembleEnd);
  const streamScatter = smooth(progress, documentPhases.streamsScatterStart, documentPhases.streamsScatterEnd);
  const stamp = smooth(progress, documentPhases.stampAssembleStart, documentPhases.stampAssembleEnd);
  const stampScatter = smooth(progress, documentPhases.stampScatterStart, documentPhases.stampScatterEnd);
  const folderEnd = mobile ? 5.8 : 6;
  const finale = smooth(progress, 5.5, folderEnd);
  const scatter = formScatter * (1 - streams) + streamScatter * (1 - stamp)
    + stampScatter * (1 - finale);
  // Cumulative turns never reset numerically at a hold. Only their periodic
  // rotation is rendered; reverse scrolling follows exactly the same path.
  const flights = [[0.12, 0.84], [1.8, 2.75], [3.05, 3.5], [4.6, mobile ? 5.8 : 5.95]]
    .map(([start, end]) => smooth(progress, start, end));
  const flightPhase = flights.reduce((sum, phase) => sum + phase, 0);
  const flightArc = flights.reduce((sum, phase) => sum + (phase > 0 && phase < 1 ? Math.sin(phase * Math.PI) ** 2 : 0), 0);
  // Entrance variants affect only the folder; the enclosed page stays intact.
  const folderBurst = !mobile && !reducedMotion && variant === "b" && progress > 5.55 && progress < folderEnd
    ? Math.sin(ramp(progress, 5.55, folderEnd) * Math.PI) * 0.45
    : 0;

  const folderOpen = smooth(progress, 6.2, mobile ? 6.65 : 6.85);
  const standaloneFrame = finale * modeMix;
  const visaApplication = ramp(progress, 6.2, mobile ? 6.65 : 6.85);
  const visaPose = visaStickerPose(visaApplication, reducedMotion);
  return {
    standaloneFrame,
    finaleLayout: finale,
    visaApplication,
    visaAvailable: folderOpen,
    visaIdleWeight: smooth(folderOpen, 0.9, 1) * (1 - modeMix) + smooth(finale, 0.95, 1) * modeMix,
    streams,
    streamScatter,
    flightPhase,
    flightArc,
    flightStrength: reducedMotion ? 0 : mobile ? 0.5 : 1,
    // Four banks: cloud, form, streams, stamp page.
    formation: intro + streams + stamp,
    explode: reducedMotion ? scatter * 0.12 : scatter,
    // The automatic stamp's finished imprint fades with the breaking paper.
    stampScatter,
    x: 3.4 * intro - 3.4 * formScatter - 3.2 * stamp
      + 2.7 * stampScatter - 1.3 * smooth(progress, 5.7, 6) - 1.4 * standaloneFrame,
    tilt: intro * (1 - formScatter),
    stamp,
    finale,
    folderAssemble: ramp(progress, 5.5, folderEnd),
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

module.exports = { documentPhases, documentTimeline, normalizeFinaleMode };
