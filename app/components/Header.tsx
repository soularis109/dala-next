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
        <h1 className="sr">Unlock collective wisdom</h1>
        <Nav />
      </div>
    </header>
  );
}
