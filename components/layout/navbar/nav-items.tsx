"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { Flip } from "gsap/Flip";
import gsap from "gsap";
import { cuteFont } from "lib/fonts";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { iconForMenuItem } from "./menu-icon";
import NavLink from "./nav-link";
import SearchAction from "./search-action";

const NAV_HEIGHT = 80;
const ITEM_CLASS = `${cuteFont.className} flex items-center gap-2 text-[24px] hover:text-(--color-campfire) transition-colors duration-300 ease-in-out`;

// Three layout phases the nav content physically moves through, via GSAP
// Flip, rather than crossfading between two separately-built layouts:
//   expanded  — full row, labels visible, centered logo (home, pre-scroll)
//   docked    — same row, slid to the right edge, labels hidden (icons only)
//   collapsed — the docked row drops into a vertical stack (the rail)
// Collapsing runs expanded -> docked -> collapsed; expanding reverses it —
// tracing an "L"/"7" shaped path (slide right, then turn and drop down)
// instead of a single diagonal tween.
type Phase = "expanded" | "docked" | "collapsed";

const ROOT_CLASS: Record<Phase, string> = {
  expanded: "hidden md:grid w-full grid-cols-[1fr_auto_1fr] items-center",
  docked: "hidden md:flex fixed right-4 top-4 z-20 md:right-6 items-center gap-4",
  // Visible at every width, not just md+ — mobile always shows this same
  // vertical rail rather than a separate hamburger-drawer bar. On mobile it
  // starts near the top (matching where the old mobile cart icon sat) so
  // it can read as part of the Hero's own parallax motion; on desktop it's
  // vertically centered as before.
  collapsed:
    "flex fixed right-4 top-4 z-20 flex-col items-center gap-5 md:top-1/2 md:-translate-y-1/2 md:right-6",
};

const GROUP_CLASS: Record<Phase, string> = {
  expanded: "flex items-center gap-4 justify-self-end",
  docked: "flex items-center gap-4",
  collapsed: "flex flex-col items-center gap-5",
};

export default function NavItems({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const containerRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const collapsedTargetRef = useRef(!isHome);
  // `nonce` forces the animation effect below to re-fire on every transition
  // even if `phase` repeats the same value as before (e.g. an overlapping
  // scroll-direction reversal calling goToPhase("docked") again mid-flight)
  // — keying the effect on `phase` alone would let React bail out silently
  // on a same-value update, permanently stalling the sequence.
  const [render, setRender] = useState<{ phase: Phase; nonce: number }>({
    phase: isHome ? "expanded" : "collapsed",
    nonce: 0,
  });
  // Layout collapses fast (as soon as scrolled past the nav's own height),
  // but the white Hero photo behind it takes much longer to actually scroll
  // away — so color is tracked separately, following the real background.
  const [overHero, setOverHero] = useState(isHome);

  const goToPhase = (next: Phase) => {
    const container = containerRef.current;
    if (container) {
      flipStateRef.current = Flip.getState(
        container.querySelectorAll("[data-flip-id]"),
      );
    }
    setRender((prev) => ({ phase: next, nonce: prev.nonce + 1 }));
  };

  const phase = render.phase;

  useEffect(() => {
    gsap.registerPlugin(Flip);
  }, []);

  // Decide the target (collapsed vs expanded) from route + scroll position.
  // Triggers as soon as the page has scrolled past the nav's own height,
  // not once the whole Hero has scrolled away — a much snappier reaction.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    let hasMounted = false;

    const setTarget = (collapsed: boolean) => {
      if (collapsedTargetRef.current === collapsed) return;
      collapsedTargetRef.current = collapsed;
      if (!mq.matches || !hasMounted) {
        // No real "before" state to animate from — either there's no
        // horizontal row to slide from (mobile), or this is the very first
        // check on load (e.g. reloading the page already scrolled down),
        // where the user never saw an earlier state to transition out of.
        // Snap straight to the correct phase instead of routing through
        // the animated docked waypoint, which would otherwise get stuck
        // there since it has nothing real to Flip from.
        setRender((prev) => ({
          phase: collapsed ? "collapsed" : "expanded",
          nonce: prev.nonce,
        }));
        return;
      }
      goToPhase("docked");
    };

    const evaluate = () => {
      setTarget(!mq.matches || !isHome || window.scrollY > NAV_HEIGHT);

      if (!isHome) {
        setOverHero(false);
        return;
      }
      // The collapsed rail sits at the vertical center of the screen, not
      // at the top — so "still over hero" has to compare the Hero's own
      // bottom edge against the rail's position, not against scroll
      // distance vs the Hero's total height (which ignores where the rail
      // actually sits and can leave text invisible against its own match).
      const hero = document.querySelector<HTMLElement>("[data-hero-section]");
      const railY = window.innerHeight / 2;
      setOverHero(hero ? hero.getBoundingClientRect().bottom > railY : false);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        evaluate();
      });
    };

    evaluate();
    hasMounted = true;
    mq.addEventListener("change", evaluate);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", evaluate);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  // Play the Flip step for whichever phase we just switched to, then
  // continue toward the final target if "docked" was only a waypoint.
  useEffect(() => {
    const state = flipStateRef.current;
    if (!state) return;
    flipStateRef.current = null;
    Flip.from(state, {
      duration: phase === "docked" ? 0.4 : 0.5,
      ease: "power2.inOut",
      absolute: true,
      onComplete: () => {
        if (phase === "docked") {
          goToPhase(collapsedTargetRef.current ? "collapsed" : "expanded");
        }
      },
    });
  }, [render.nonce]);

  const showLabels = phase === "expanded";
  const colorClass = overHero
    ? "text-(--color-midnight-ocean)"
    : "text-(--color-neutral-gray-blue)";

  return (
    <div ref={containerRef} className={`${ROOT_CLASS[phase]} ${colorClass}`}>
      <div key="spacer" />
      <div key="logo" data-flip-id="logo">
        <Link href="/" prefetch={true} aria-label="Home" className="flex items-center justify-self-center">
          <LogoSquare size={showLabels ? undefined : "sm"} />
        </Link>
      </div>
      <div key="group" className={GROUP_CLASS[phase]}>
        {menu.map((item: Menu) => {
          const Icon = iconForMenuItem(item.title);
          return (
            <div key={item.title} data-flip-id={`menu-${item.title}`}>
              <NavLink href={item.path} className={ITEM_CLASS} showTrail={showLabels}>
                <Icon className="h-5 w-5 shrink-0" />
                {showLabels && item.title}
              </NavLink>
            </div>
          );
        })}
        <div key="search" data-flip-id="search">
          {showLabels ? (
            <SearchAction />
          ) : (
            <Link
              href="/search"
              prefetch={true}
              aria-label="Search"
              title="Search"
              className="transition-colors duration-300 ease-in-out hover:text-(--color-campfire)"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Link>
          )}
        </div>
        <div key="cart" data-flip-id="cart">
          <CartModal
            iconClassName="h-5 w-5"
            label={showLabels ? "Cart" : undefined}
          />
        </div>
      </div>
    </div>
  );
}
