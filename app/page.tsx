import NavToggle from "./components/NavToggle";
import HeaderBlurBlock from "./components/HeaderBlurBlock";
import Header from "./components/Header";
import CookieNotice from "./components/CookieNotice";
import FloatingCta from "./components/FloatingCta";
import SiteLoader from "./components/SiteLoader";
import NavTransitionMask from "./components/NavTransitionMask";
import Landing from "./components/sections/Landing";
import Introduction from "./components/sections/Introduction";
import ManifestoIntro from "./components/sections/ManifestoIntro";
import ManifestoBlock from "./components/sections/ManifestoBlock";
import TeamInvestors from "./components/sections/TeamInvestors";
import Footer from "./components/sections/Footer";
import ScriptLoader from "./ScriptLoader";
import DocumentStamp from "./components/DocumentStamp";

export default function Page() {
  return (
    <>
      <NavToggle />
      <HeaderBlurBlock />
      <Header />
      <CookieNotice />
      <FloatingCta />
      <SiteLoader />
      <NavTransitionMask />
      <div asscroll-container="">
        <main>
          <Landing />
          <Introduction />
          <ManifestoIntro />
          <ManifestoBlock
            align="items-start@md"
            title="Build a better world of work"
            paragraphs={[
              <>
                Our mission is to make work more coherent and delightful—reframing productivity from <em>doing more</em>{" "}
                to{" "}
                <a href="#" target="_blank" rel="noreferrer noopener">
                  <em>
                    being better<span className="t-white">.</span>
                  </em>
                </a>
              </>,
              "Your happiest and most purposeful moments at work are when you’re in flow, intellectually stimulated, and creating value for customers.",
              "We want to recreate that every time you use it. A tool that is completely integrated with how you think, feel and work.",
            ]}
          />
          <ManifestoBlock
            align="items-end@md"
            title="Spark lightbulb moments"
            paragraphs={[
              "This is your intelligent, real-time source of truth that eliminates the cultural, financial and operational struggles of splintered tools.",
              "We connect your systems behind the scenes and pull together exactly the knowledge you require into an elegant contextual view.",
              "Just ask for the answer that advances your work, and helps you make better decisions with more confidence.",
            ]}
          />
          <TeamInvestors />
          <Footer />
          <div style={{ position: "absolute", left: 0, bottom: "-1px", width: "2px", height: "2px" }}></div>
        </main>
      </div>
      <div className="fixed fill w-1/1 h-1/1 z-negative user-select-none pointer-events-none">
        <canvas id="canvas" />
      </div>
      <DocumentStamp />
      <ScriptLoader />
    </>
  );
}
