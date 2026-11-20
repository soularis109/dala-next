import type { ReactNode } from "react";

export default function ManifestoBlock({
  align,
  title,
  paragraphs,
}: {
  align: "items-end@md" | "items-start@md";
  title: string;
  paragraphs: ReactNode[];
}) {
  return (
    <div
      className={`section section--tall manifesto manifesto--section ${align} js-section`}
      section-name="manifesto"
    >
      <div className="manifesto__inner mobile-blur" data-cta-text="">
        <h2
          className="text-blur manifesto__title t-32 t-lh-1.3 t-56@sm t-lh-0.9@sm t-lh-1.2@sm -t-ls-0.03 t-400 t-display mb-1 mb-2@sm"
          animate-from="preset: 'splitTextRotateIn', scrollTrigger: { start: 'top bottom' }"
        >
          {title}
        </h2>
        <div
          className="manifesto__body"
          animate-from="preset: 'splitTextRotateIn', rotate: 7, delay: 0.5, duration: 0.8, scrollTrigger: { start: 'top bottom' }, children: 'p'"
        >
          {paragraphs.map((p, i) => (
            <p className="text-blur t-24 t-lh-1.5 -t-ls-0.02 t-200" key={i}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
