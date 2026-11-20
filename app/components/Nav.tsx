const NAV_ITEMS: { sectionName: string; label: string; href: string; anchorLink?: string; external?: boolean }[] = [
  { sectionName: "manifesto", label: "Manifesto", href: "/#manifesto", anchorLink: "manifesto" },
  { sectionName: "team", label: "Team", href: "/#team", anchorLink: "team" },
  { sectionName: "blog", label: "Blog", href: "#", external: true },
];

export default function Nav() {
  return (
    <nav className="nav js-nav">
      <div className="nav__bg js-nav-bg">
        <div className="nav__bg-inner"></div>
      </div>
      <ul className="nav__list js-nav-list">
        {NAV_ITEMS.map((item) =>
          item.anchorLink ? (
            <li className="nav__item | js-nav-item" section-name={item.sectionName} key={item.sectionName}>
              <a href={item.href} aria-label={item.label} className="nav__link js-nav-link" anchor-link={item.anchorLink}>
                {item.label}
              </a>
            </li>
          ) : (
            <li className="nav__item | js-nav-item" section-name={item.sectionName} key={item.sectionName}>
              <a className="nav__link js-nav-link" aria-label={item.label} href={item.href} target="_blank" rel="noopener">
                {item.label}
              </a>
            </li>
          )
        )}
        <li className="nav__cta | js-nav-item">
          <a
            className="btn t-16 t-14@xs t-16@sm t-ls-0.025 t-600 t-uppercase"
            aria-label="Request Access"
            href="#"
            target="_blank"
            rel="noopener"
          >
            <span className="btn__text pointer-events-none">Request Access</span>
            <div className="btn__hover pointer-events-none" aria-hidden="true"></div>
          </a>
        </li>
      </ul>
    </nav>
  );
}
