import Logo from "./Logo";
import Nav from "./Nav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="header js-header">
      <div className="header__bg js-header-bg">
        <div className="header__bg-inner"></div>
      </div>
      <div className="header__inner js-header-inner">
        <button className="header__logo | js-header-logo" anchor-link="landing">
          <Logo /> <span className="sr">Dala</span>
        </button>
        <div className="header__cta mr-4 d-flex" style={{ alignItems: "center", gap: "0.75rem" }}>
          <ThemeToggle />
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
        <h1 className="sr">Dala</h1>
        <Nav />
      </div>
    </header>
  );
}
