export default function Introduction() {
  return (
    <div className="section section--tall introduction | js-section">
      <div className="mobile-blur" data-cta-text="">
        <h2
          className="text-blur introduction__title t-32 t-lh-1.3 t-56@sm t-lh-0.9@sm t-lh-1.2@sm -t-ls-0.03 t-400 t-display mb-1 mb-2@sm"
          animate-from="preset: 'splitTextRotateIn', scrollTrigger: { start: 'top bottom' }"
        >
          Make decisions with confidence
        </h2>
        <p
          className="text-blur introduction__body t-24 t-lh-1.5 -t-ls-0.02 t-200"
          animate-from="preset: 'splitTextRotateIn', rotate: 7, delay: 0.5, duration: 0.8, scrollTrigger: { start: 'top bottom' }"
        >
          Our bleeding-edge AI search tool automates extracting knowledge from across your organisation so that
          you can take the guesswork out of your work.
        </p>
      </div>
    </div>
  );
}
