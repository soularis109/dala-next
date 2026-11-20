export default function SiteLoader() {
  return (
    <div className="site-loader | js-site-loader">
      <div className="site-loader__background"></div>
      <div className="site-loader__content">
        <div className="site-loader__main">
          <div className="site-loader__spinner | js-site-loader-spinner">
            <svg
              className="site-loader__spinner-svg | js-site-loader-spinner-svg"
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
          <div className="site-loader__heading | js-site-loader-heading">
            <div className="site-loader__heading-text">
              <div className="site-loader__heading-inner | js-site-loader-heading-text">Your workplace has the answer.</div>
            </div>
            <div className="site-loader__heading-text">
              <div className="site-loader__heading-inner | js-site-loader-heading-text">Ask to find it.</div>
            </div>
          </div>
        </div>
        <div className="site-loader__info d-flex justify-between items-end">
          <div className="site-loader__loading">
            <div className="d-flex overflow-hidden">
              <div className="site-loader__loading-text | js-site-loader-loading-text">LOADING</div>
            </div>
            <span className="site-loader__ellipsis | js-site-loader-ellipses">
              <div className="site-loader__ellipsis-wrapper | js-site-loader-ellipses-wrapper">
                <span style={{ display: "inline" }}>.</span> <span style={{ display: "inline" }}>.</span>{" "}
                <span style={{ display: "inline" }}>.</span>
              </div>
            </span>
          </div>
          <div className="site-loader__completed | js-site-loader-completed-text">
            <span>Completed</span>
          </div>
          <div className="site-loader__progress | js-site-loader-progress">
            <span className="js-site-loader-progress-digit"></span> <span className="js-site-loader-progress-digit"></span>{" "}
            <span className="js-site-loader-progress-digit">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
