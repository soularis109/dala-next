import { INVESTORS } from "../../data/investors";
import { sectionCopyProps } from "../../lib/sectionCopy";

export default function Investors() {
  return (
    <div className="investors">
      {INVESTORS.map((investor) => (
        <div className="investors__item" key={investor.name}>
          <div className="investor">
            <div
              className="investor__icon d-none@sm"
              animate-from="yPercent: 100, autoAlpha: 0, rotate: 14, ease: 'expo.out', duration: 1"
            >
              <img className="investor__icon__image" src={investor.image} alt="" aria-hidden="true" loading="lazy" />
            </div>
            <div
              className="investor__icon d-none d-block@sm"
              dom2webgl="c:Pyramid"
              material-color={investor.materialColor}
              start-x={investor.startX}
              parallax-speed={investor.parallaxSpeed}
            ></div>
            <div {...sectionCopyProps} className="investor__body">
              <div className="t-32 t-lh-1.25 -t-ls-0.03 t-400">{investor.name}</div>
              {investor.title && <div className="t-16 t-lh-1.3 -t-ls-0.02 t-400 t-grey-4">{investor.title}</div>}
            </div>
          </div>
        </div>
      ))}
      <div
        {...sectionCopyProps}
        className="investors__text"
        animate-from="y: '2vw', scrollTrigger: { trigger: '.js-team-head', scrub: 0.5, once: false, start: 'top bottom' }"
      >
        <h2
          className="t-56 t-lh-1 t-64@sm t-lh-0.9@sm t-104@md -t-ls-0.03 t-400 mb-2@xs mb-1@sm mb-1.5@md"
          animate-from="preset: 'splitTextRotateIn', rotate: 7, duration: 0.8, scrollTrigger: { start: 'top bottom' }"
        >
          Our investors
        </h2>
        <div
          className="investors__body"
          animate-from="preset: 'splitTextRotateIn', rotate: 7, delay: 0.5, duration: 0.8, scrollTrigger: { start: 'top bottom' }, children: 'p'"
        >
          <p className="t-20 t-lh-1.5 -t-ls-0.03 t-400">
            We are supported by some of the world&#39;s most pioneering operators and progressive funds to fuel our growth.
          </p>
        </div>
      </div>
    </div>
  );
}
