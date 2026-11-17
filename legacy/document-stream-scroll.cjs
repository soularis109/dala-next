// Section 3: compress only the fully gathered streams (logical 3.0..3.3).
const HOLD_END = .3;
const HOLD_RATIO = .5;
const SECTION_RATIO = 1 - HOLD_END * (1 - HOLD_RATIO);
const originalStyles = new WeakMap();

function sectionFraction(fraction) {
  const distance = Math.max(0, Math.min(1, fraction)) * SECTION_RATIO;
  const holdDistance = HOLD_END * HOLD_RATIO;
  return distance < holdDistance ? distance / HOLD_RATIO : distance + HOLD_END - holdDistance;
}

function prepareSections(sections) {
  for (const section of sections) {
    if (!section.hasAttribute('data-stream-stage')) continue;
    // Always measure the natural layout, including responsive copy and padding.
    // Restore only our three properties, leaving GSAP's inline styles intact.
    if (!originalStyles.has(section)) originalStyles.set(section, {
      height: section.style.height, minHeight: section.style.minHeight, boxSizing: section.style.boxSizing
    });
    Object.assign(section.style, originalStyles.get(section));
    const height = section.getBoundingClientRect().height;
    section.dataset.streamNaturalHeight = String(height);
    section.style.boxSizing = 'border-box';
    section.style.height = `${height * SECTION_RATIO}px`;
    section.style.minHeight = section.style.height;
  }
}

module.exports = { HOLD_END, HOLD_RATIO, SECTION_RATIO, sectionFraction, prepareSections };
