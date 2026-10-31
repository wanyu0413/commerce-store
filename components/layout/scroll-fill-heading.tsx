"use client";

import { Fragment, useEffect, useRef } from "react";

// Scroll-driven letter fill: --progress starts at 1 (filled), falls to 0
// as the section scrolls past.
export default function ScrollFillHeading({
  text,
  className,
  waveWords,
}: {
  text: string;
  className?: string;
  // Limits each line's wave to its first N words; defaults to the whole line.
  waveWords?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const container = el.closest("section") ?? el;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const passed = Math.min(
        1,
        Math.max(0, (vh - rect.top) / (vh + rect.height)),
      );
      el.style.setProperty("--progress", (1 - passed).toString());
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // "\n" in text starts a new line; each line gets its own wave.
  const lines = text.split("\n").map((line) => line.split(" "));
  let wordIndex = 0;

  const renderWords = (words: string[]) =>
    words.map((word, i) => {
      const reverse = wordIndex++ % 2 === 1;
      return (
        <Fragment key={i}>
          {i > 0 && " "}
          <span
            data-word={word}
            className={`scroll-fill-word ${reverse ? "scroll-fill-word--reverse" : ""}`}
          >
            {word}
          </span>
        </Fragment>
      );
    });

  return (
    <h2 ref={ref} className={`scroll-fill-heading ${className ?? ""}`}>
      {lines.map((words, l) => {
        const waved = waveWords ? words.slice(0, waveWords) : words;
        const rest = words.slice(waved.length);
        return (
          <Fragment key={l}>
            {l > 0 && <br />}
            <span className="scroll-fill-line">{renderWords(waved)}</span>
            {rest.length > 0 && <> {renderWords(rest)}</>}
          </Fragment>
        );
      })}
    </h2>
  );
}
