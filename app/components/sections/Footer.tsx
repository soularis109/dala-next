import Logo from "../Logo";

const FOOTER_NAV_ITEMS: { sectionName: string; label: string; anchorLink?: string; href?: string }[] = [
  { sectionName: "manifesto", label: "Manifesto", anchorLink: "manifesto" },
  { sectionName: "team", label: "Team", anchorLink: "team" },
  { sectionName: "blog", label: "Blog", href: "https://medium.com/dala-ai" },
  { sectionName: "privacy", label: "Privacy", href: "/privacy" },
  { sectionName: "terms", label: "Terms", href: "/terms" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/askdala/" },
  { label: "Twitter", icon: "twitter", href: "https://twitter.com/askdala" },
  { label: "Email", icon: "email", href: "mailto:hello@dala.ai" },
];

export default function Footer() {
  return (
    <div className="section footer | js-section">
      <div className="footer__head">
        <h2
          className="t-40 t-lh-1 t-48@sm t-lh-1.2@sm t-64@md t-lh-1.1@md -t-ls-0.03 t-400 mb-2"
          animate-from="preset: 'splitTextRotateIn', scrollTrigger: { start: 'top bottom' }"
        >
          Your workplace has the answer. Ask Dala to find it.
        </h2>
        <div className="d-flex justify-center">
          <a
            className="btn t-16 t-14@xs t-16@sm t-ls-0.025 t-600 t-uppercase"
            aria-label="Request access"
            href="https://askdala.typeform.com/to/lSujgyr8"
            target="_blank"
            rel="noopener"
          >
            <span className="btn__text pointer-events-none">Request access</span>
            <div className="btn__hover pointer-events-none" aria-hidden="true"></div>
          </a>
        </div>
      </div>
      <div className="footer__bar">
        <div className="footer__logo">
          <Logo /> <span className="sr">Dala</span>
        </div>
        <div className="footer__copyright">
          <span className="footer__copyright__item">© 2021 Dala Technologies Limited.</span>{" "}
          <span className="footer__copyright__item">All rights reserved.</span>
        </div>
        <ul className="footer__nav">
          {FOOTER_NAV_ITEMS.map((item) => (
            <li className="footer__nav__item | js-nav-item" section-name={item.sectionName} key={item.sectionName}>
              {item.anchorLink ? (
                <button
                  className="footer__nav__link t-16 t-lh-1.2 t-14@xs t-lh-1.4@xs t-16@sm t-lh-1.2@sm -t-ls-0.025 t-600 t-uppercase | js-nav-link"
                  anchor-link={item.anchorLink}
                >
                  {item.label}
                </button>
              ) : (
                <a
                  className="footer__nav__link t-16 t-lh-1.2 t-14@xs t-lh-1.4@xs t-16@sm t-lh-1.2@sm -t-ls-0.025 t-600 t-uppercase | js-nav-link"
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="footer__social">
          {SOCIAL_LINKS.map((social) => (
            <a className="footer__social__link" href={social.href} rel="noopener" target="_blank" key={social.icon}>
              <span className="sr">{social.label}</span>{" "}
              <svg className={`footer__social__icon footer__social__icon--${social.icon}`}>
                <use xlinkHref={`/images/svgsprite.svg#${social.icon}`}></use>
              </svg>{" "}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
