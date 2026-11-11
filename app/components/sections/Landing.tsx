export default function Landing() {
  return (
    <>
      <div anchor-target="landing"></div>
      <div className="section landing | js-section" section-name="landing">
        <h2
          className="landing__title prototype-copy-hidden t-56 t-80@xs t-104@sm t-150@md t-lh-0.9 -t-ls-0.03 t-400 mb-1.5 t-lh-1.1 mb-1"
          aria-hidden="true"
          animate-from="preset: 'splitTextRotateIn', delay: 0, duration: 1, scrollTrigger: { children: 'span' }"
        >
          <span className="d-block">Unlock</span> <span className="d-block">collective</span>{" "}
          <span className="d-block">wisdom.</span>
        </h2>
        <div className="mobile-blur prototype-copy-hidden mt-0 mb-auto" aria-hidden="true">
          <div className="landing__body">
            <div
              className="t-16 t-lh-1.2 t-ls-0.05 t-600 t-uppercase mb-1 t-yellow"
              animate-from="preset: 'splitTextRotateIn', rotate: 7, delay: 1, duration: 1"
            >
              Stop managing knowledge. Start using it.
            </div>
            <p
              className="t-24 t-lh-1.5 -t-ls-0.02 t-200"
              animate-from="preset: 'splitTextRotateIn', rotate: 7, delay: 1, duration: 1"
            >
              Plug into your team’s shared brainpower. Ask Dala to instantly find anything or anyone from any
              workplace system. Focus on doing your best work with context, conviction and clarity.
            </p>
            <div className="overflow-hidden">
              <div className="d-flex" animate-from="yPercent: 120, rotate: 2, ease: 'expo.out', duration: 1, delay: 1.5">
                <a
                  className="btn t-16 t-14@xs t-16@sm t-ls-0.025 t-600 t-uppercase"
                  aria-label="Request Access"
                  href="https://askdala.typeform.com/to/lSujgyr8"
                  target="_blank"
                  rel="noopener"
                >
                  <span className="btn__text pointer-events-none">Request Access</span>
                  <div className="btn__hover pointer-events-none" aria-hidden="true"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
