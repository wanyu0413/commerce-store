"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

// Height of the fixed nav bar (matches the pt-20/-mt-20 pairing in
// app/layout.tsx and hero.tsx) — used both as the IntersectionObserver's
// rootMargin and as the synchronous "already scrolled past" check on mount.
const NAV_HEIGHT = 80;

// Decides between the full horizontal nav ("expanded") and the compact
// icon-only rail ("compact"), and GSAP-crossfades between them:
//   - Any page without a Hero (i.e. not "/"): always compact.
//   - The homepage: expanded until the Hero scrolls out from behind the
//     nav, then compact — reversing if you scroll back up.
//   - Below the md breakpoint there's no rail to switch to (it's
//     desktop-only), so mobile always stays expanded regardless of scroll.
export default function NavAnimator({
  expanded,
  compact,
}: {
  expanded: ReactNode;
  compact: ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const expandedRef = useRef<HTMLDivElement>(null);
  const compactRef = useRef<HTMLDivElement>(null);
  const hasAnimatedOnce = useRef(false);
  const [collapsed, setCollapsed] = useState(!isHome);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    let observer: IntersectionObserver | undefined;

    const evaluate = () => {
      if (!mq.matches) {
        // No compact rail below md — the full nav always stays put.
        setCollapsed(false);
        return;
      }
      if (!isHome) {
        setCollapsed(true);
        return;
      }
      const hero = document.querySelector<HTMLElement>(
        "[data-hero-section]",
      );
      if (!hero) {
        setCollapsed(true);
        return;
      }
      // Synchronous check first, in case the page loaded already scrolled
      // past the Hero (avoids a flash before the observer's first callback).
      setCollapsed(hero.getBoundingClientRect().bottom <= NAV_HEIGHT);
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) setCollapsed(!entry.isIntersecting);
        },
        { rootMargin: `-${NAV_HEIGHT}px 0px 0px 0px`, threshold: 0 },
      );
      observer.observe(hero);
    };

    evaluate();
    mq.addEventListener("change", evaluate);
    return () => {
      mq.removeEventListener("change", evaluate);
      observer?.disconnect();
    };
  }, [isHome]);

  useEffect(() => {
    const expandedEl = expandedRef.current;
    const compactEl = compactRef.current;
    if (!expandedEl || !compactEl) return;

    // Skip animating on first mount — the CSS classes below already render
    // the correct resting state instantly, with no JS needed.
    if (!hasAnimatedOnce.current) {
      hasAnimatedOnce.current = true;
      return;
    }

    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
    if (collapsed) {
      tl.to(expandedEl, { autoAlpha: 0, y: -12 }, 0).fromTo(
        compactEl,
        { autoAlpha: 0, x: 24 },
        { autoAlpha: 1, x: 0 },
        0.1,
      );
    } else {
      tl.to(compactEl, { autoAlpha: 0, x: 24 }, 0).fromTo(
        expandedEl,
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0 },
        0.1,
      );
    }
  }, [collapsed]);

  return (
    <>
      {/* Below md, "expanded" stays visible on every route (there's no rail
          to switch to there), so its color still has to follow isHome —
          NavBrand/CartModal inherit it via text-current rather than each
          re-deriving the route themselves. */}
      <div
        ref={expandedRef}
        className={`flex w-full items-center justify-between ${
          isHome
            ? "text-(--color-midnight-ocean)"
            : "text-(--color-neutral-gray-blue)"
        } ${collapsed ? "invisible opacity-0" : ""}`}
      >
        {expanded}
      </div>
      <div
        ref={compactRef}
        className={`fixed right-4 top-1/2 z-20 -translate-y-1/2 md:right-6 ${
          collapsed ? "" : "invisible opacity-0"
        }`}
      >
        {compact}
      </div>
    </>
  );
}
