const PARAGRAPH_PAIRS: [string, string][] = [
  [
    "This is your workplace today. Countless fragments of critical knowledge scattered across hundreds of disparate systems.",
    "30% of your time is spent trying to organise and find the information and expertise you need to do your job.",
  ],
  [
    "The impossible battle to make sense of this chaos leaves your team feeling overwhelmed and unproductive.",
    "They’re confronted with the anxiety of bothering a busy coworker again, or aimlessly trying to connect the dots with incomplete context.",
  ],
  [
    "Existing solutions are cumbersome and quickly become outdated. Yet another decaying system that requires continuous maintenance.",
    "They fail to understand what you need from the vast amounts of information that your team creates every day.",
  ],
];

export default function ManifestoIntro() {
  return (
    <div className="js-section" section-name="manifesto">
      <div
        className="manifesto--introduction-container"
        animate-from="preset: 'splitTextRotateIn', rotate: 7, delay: 0.5, duration: 0.8, scrollTrigger: { start: 'top bottom' }, children: '.js-manifesto-p'"
        animate-mq="smMax"
      >
        {PARAGRAPH_PAIRS.map((pair, i) => (
          <div className="section manifesto--introduction" key={i}>
            <div
              className="manifesto__body"
              animate-from="preset: 'splitTextRotateIn', rotate: 7, delay: 0, duration: 0.8, scrollTrigger: { start: 'top bottom' }, children: '.js-manifesto-p'"
              animate-mq="sm"
            >
              {pair.map((text, j) => (
                <p className="t-24 t-lh-1.3 -t-ls-0.03 t-48@sm t-lh-1.2@sm t-400 | js-manifesto-p" key={j}>
                  {text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
