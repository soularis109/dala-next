import NavToggle from "./components/NavToggle";
import HeaderBlurBlock from "./components/HeaderBlurBlock";
import Header from "./components/Header";
import CookieNotice from "./components/CookieNotice";
import SiteLoader from "./components/SiteLoader";
import NavTransitionMask from "./components/NavTransitionMask";
import Landing from "./components/sections/Landing";
import Introduction from "./components/sections/Introduction";
import ManifestoIntro from "./components/sections/ManifestoIntro";
import ManifestoBlock from "./components/sections/ManifestoBlock";
import TeamInvestors from "./components/sections/TeamInvestors";
import Footer from "./components/sections/Footer";
import ScriptLoader from "./ScriptLoader";
import DevTuner from "./DevTuner";
import FolderVariantToggle from "./components/FolderVariantToggle";

export default function Page() {
  return (
    <>
      <NavToggle />
      <HeaderBlurBlock />
      <Header />
      <CookieNotice />
      <SiteLoader />
      <NavTransitionMask />
      <div asscroll-container="">
        <main>
          <Landing />
          <Introduction />
          <ManifestoIntro />
          <ManifestoBlock
            align="items-end@md"
            title="Document flows"
            paragraphs={[
              "Your documents move into a structured queue, keeping every file visible as it enters the review process.",
              "Each item follows the same clear route, so nothing is lost between submission, verification and decision.",
              "This is placeholder copy; final wording will be supplied after the animation direction is approved.",
            ]}
          />
          <ManifestoBlock
            align="items-start@md"
            title="Processing"
            paragraphs={[
              "The application is checked, matched and prepared for a decision through one consistent process.",
              "A verified document receives its mark and continues to the final result without breaking the flow.",
              "This is placeholder copy; final wording will be supplied by the client.",
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
      <ScriptLoader />
      <DevTuner />
      <FolderVariantToggle />
    </>
  );
}
