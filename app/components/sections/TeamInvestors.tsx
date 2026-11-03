import TeamSlider from "./TeamSlider";
import Investors from "./Investors";

export default function TeamInvestors() {
  return (
    <div className="section js-section js-team-section mb-1" section-name="team" anchor-target="team">
      <div className="team">
        <div
          className="team__head js-team-head"
          animate-mq="sm"
          animate-from="y: '-5vw', scrollTrigger: { scrub: 0.5, once: false, start: 'top bottom' }"
        >
          <h2
            className="t-56 t-lh-1 t-64@sm t-lh-1.2@sm t-104@md t-lh-1.1@md -t-ls-0.03 t-400 mb-2@xs mb-2.5@sm mb-3@md"
            animate-from="preset: 'splitTextRotateIn', scrollTrigger: { start: 'top bottom' }"
          >
            Our team
          </h2>
        </div>
        <TeamSlider />
        <div animate-from="y: '-5vw', scrollTrigger: { trigger: '.js-team-head', scrub: 0.5, once: false, start: 'top bottom' }">
          <h3
            className="t-36 t-lh-1 -t-ls-0.03 t-400 mt-5@sm"
            animate-from="preset: 'splitTextRotateIn', rotate: 7, delay: 0.5, duration: 0.8, scrollTrigger: { start: 'top bottom' }"
          >
            Build with us.
          </h3>
          <div
            className="team__body"
            animate-from="preset: 'splitTextRotateIn', rotate: 7, delay: 1, duration: 0.8, scrollTrigger: { start: 'top bottom' }, children: 'p'"
          >
            <p className="t-20 t-lh-1.5 -t-ls-0.03 t-400">
              We are actively hiring intentional, empathetic and curious people who thrive on creating delightful
              experiences. If you&apos;d like to be a part of the journey, email{" "}
              <a href="mailto:careers@dala.ai">careers@dala.ai</a> with your CV or portfolio, and a thoughtful note.
            </p>
            <p className="t-20 t-lh-1.5 -t-ls-0.03 t-400">
              Read more about our values{" "}
              <a
                href="https://medium.com/dala-ai/why-we-wrote-our-values-before-we-wrote-a-single-line-of-code-99ada8a18cd5"
                target="_blank"
                rel="noreferrer noopener"
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <Investors />
    </div>
  );
}
