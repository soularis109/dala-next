export default function NavToggle() {
  return (
    <button className="nav-toggle js-nav-toggle">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="nav-toggle__cross js-nav-toggle-cross">
          <path d="M2.56 2.535L13.4386 13.4136" stroke="white" strokeMiterlimit="10" />
          <path d="M13.4389 2.58871L2.56034 13.4673" stroke="white" strokeMiterlimit="10" />
        </g>
        <g className="nav-toggle__burger js-nav-toggle-burger">
          <path d="M0.31 3.35L15.6946 3.35" stroke="white" strokeMiterlimit="10" />
          <path d="M0.31 7.96426L15.6946 7.96426" stroke="white" strokeMiterlimit="10" />
          <path d="M0.31 12.579L15.6946 12.579" stroke="white" strokeMiterlimit="10" />
        </g>
      </svg>{" "}
      <span className="sr">Toggle Mobile Navigation</span>
    </button>
  );
}
