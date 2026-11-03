export default function CookieNotice() {
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-notice-title"
      aria-describedby="cookie-notice-body"
      className="cookie-notice fixed | js-cookie-notice"
    >
      <div className="d-flex items-center">
        <div className="flex-grow pr-1">
          <div className="sr" id="cookie-notice-title">
            Cookie consent
          </div>
          <div id="cookie-notice-body" className="cookie-notice__body t-500">
            This website uses cookies.{" "}
            <a href="#cookies" className="cookie-notice__link t-600" target="_blank" rel="noreferrer noopener">
              Learn more<span className="sr"> about how we use Cookies</span>
            </a>
          </div>
        </div>
        <div className="flex-no-shrink d-flex">
          <button
            type="button"
            className="btn t-16 t-lh-1.2 t-14@xs t-lh-1.4@xs t-16@sm t-lh-1.2@sm -t-ls-0.025 t-600 t-uppercase | js-cookie-notice-toggle"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
