import { TEAM_MEMBERS, SLIDE_REPEAT_COUNT } from "../../data/team";

export default function TeamSlider() {
  const slides = Array.from({ length: SLIDE_REPEAT_COUNT }).flatMap(() => TEAM_MEMBERS);

  return (
    <div className="team-slider | js-slider">
      <div className="team-slider__slides-container">
        <ul className="team-slider__slides | js-slides">
          {slides.map((member, i) => (
            <li className="team-card | js-slide" slide-id={member.slideId} key={i}>
              <div className="team-card__inner">
                <img className="team-card__image | js-slide-image" src={member.image} alt={`Portrait of ${member.name}`} loading="lazy" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul className="team-slider__content">
        {TEAM_MEMBERS.map((member) => (
          <li className="team-slider__content__item" key={member.slideId}>
            <div className="team-card__content | js-slide-content" slide-id={member.slideId}>
              <span className="t-16 t-lh-1.2 t-ls-0.05 t-600 t-uppercase mb-1 t-purple | js-role">{member.role}</span>
              <h3 className="t-40 t-lh-1 t-56@md t-lh-0.9@md t-lh-1.2@md -t-ls-0.03 t-400 t-display mb-1 | js-name">{member.name}</h3>
              <div className="team-card__social">
                <a className="team-card__social__link | js-social-icon" href={member.twitter} target="_blank" rel="noopener">
                  <span className="sr">Twitter</span>{" "}
                  <svg className="team-card__social__icon team-card__social__icon--twitter">
                    <use xlinkHref="images/svgsprite.svg#twitter"></use>
                  </svg>{" "}
                </a>
                <a className="team-card__social__link | js-social-icon" href={member.linkedin} target="_blank" rel="noopener">
                  <span className="sr">Linkedin</span>{" "}
                  <svg className="team-card__social__icon team-card__social__icon--linkedin">
                    <use xlinkHref="images/svgsprite.svg#linkedin"></use>
                  </svg>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="team-slider__controls">
        <button className="team-slider__control team-slider__previous | js-slider-prev">
          <span className="sr">Previous</span>
          <div className="team-slider__control-bg | js-slider-prev-bg"></div>
          <div className="team-slider__control-hover | js-slider-prev-hover"></div>
          <svg>
            <use xlinkHref="images/svgsprite.svg#arrow"></use>
          </svg>
        </button>{" "}
        <button className="team-slider__control team-slider__next | js-slider-next">
          <span className="sr">Next</span>
          <div className="team-slider__control-bg | js-slider-next-bg"></div>
          <div className="team-slider__control-hover | js-slider-next-hover"></div>
          <svg>
            <use xlinkHref="images/svgsprite.svg#arrow"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
