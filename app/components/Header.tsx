import Nav from "./Nav";

export default function Header() {
  return (
    <header className="header js-header">
      <div className="header__bg js-header-bg">
        <div className="header__bg-inner"></div>
      </div>
      <div className="header__inner js-header-inner">
        <button className="header__logo | js-header-logo" anchor-link="landing">
          <svg width="0" height="0" aria-hidden="true"><g className="js-header-logo-text-group" /></svg>
        </button>
        <div className="header__cta mr-4">
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
        </div>
        <h1 className="sr">Unlock collective wisdom</h1>
        <Nav />
      </div>
    </header>
  );
}
