"use client";

import PawIcon from "components/icons/paw";
import { useEffect, useRef } from "react";

// How much of the remaining distance the paw closes each frame (0–1):
// lower trails further behind the cursor.
const EASE = 0.18;
// Where the paw sits relative to the cursor tip, so it never covers it.
const OFFSET = { x: 14, y: 18 };

// A paw that trails the mouse cursor. Desktop pointers only, and skipped
// entirely for people who prefer reduced motion.
export default function CursorPaw() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const target = { x: -100, y: -100 };
    const pos = { ...target };
    let frame = 0;

    const tick = () => {
      pos.x += (target.x - pos.x) * EASE;
      pos.y += (target.y - pos.y) * EASE;
      el.style.transform = `translate3d(${pos.x + OFFSET.x}px, ${pos.y + OFFSET.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] opacity-0 transition-opacity duration-300"
    >
      <PawIcon fill="currentColor" className="h-5 w-5 -rotate-12 text-(--color-campfire)" />
    </div>
  );
}
