"use client";

import { Fragment, useEffect, useRef } from "react";

// Scroll-driven letter fill: --progress starts at 1 (filled), falls to 0
// as the section scrolls past.
export default function ScrollFillHeading({
  text,
  className,
}: {
  text: string;
  className?: string;
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

  const words = text.split(" ");

  return (
    <h2 ref={ref} className={`scroll-fill-heading ${className ?? ""}`}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            data-word={word}
            className={`scroll-fill-word ${i % 2 === 1 ? "scroll-fill-word--reverse" : ""}`}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </h2>
  );
}
