export default function NavTransitionMask() {
  return (
    <>
      <div className="nav-transition-mask-bg | js-nav-transition-mask-bg"></div>
      <div className="nav-transition-mask js-nav-transition-mask">
        <div className="nav-transition-mask__spinner | js-nav-transition-mask-spinner">
          <svg
            className="nav-transition-mask__spinner-svg | js-nav-transition-mask-spinner-svg"
            width="142"
            height="141"
            viewBox="0 0 142 141"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="63.6035" width="14.7917" height="14.7917" fill="white" />
            <rect x="63.6035" y="125.729" width="14.7917" height="14.7917" fill="white" />
            <rect x="142" y="62.125" width="14.7917" height="14.7917" transform="rotate(90 142 62.125)" fill="white" />
            <rect x="16.2715" y="62.125" width="14.7917" height="16.2708" transform="rotate(90 16.2715 62.125)" fill="white" />
          </svg>
        </div>
      </div>
    </>
  );
}
