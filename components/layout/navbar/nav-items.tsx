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

// expanded -> docked -> collapsed via GSAP Flip (slide right, then drop
// vertical), reversed to expand. See ROOT_CLASS below for each phase.
type Phase = "expanded" | "docked" | "collapsed";

const ROOT_CLASS: Record<Phase, string> = {
  expanded: "hidden md:grid w-full grid-cols-[1fr_auto_1fr] items-center",
  docked: "hidden md:flex fixed right-4 top-4 z-20 md:right-6 items-center gap-4",
  // Desktop only — mobile uses MobileNavBar instead.
  collapsed:
    "hidden md:flex fixed right-4 top-4 z-20 flex-col items-center gap-5 md:top-1/2 md:-translate-y-1/2 md:right-6",
};

// Menu links sit in the grid's left column when expanded; search/cart sit in
// the right column. Docked/collapsed aren't grid-based, so both groups just
// flow into the same rail (order classes below put the logo first there).
const MENU_GROUP_CLASS: Record<Phase, string> = {
  expanded: "flex items-center gap-4 justify-self-start",
  docked: "flex items-center gap-4",
  collapsed: "flex flex-col items-center gap-5",
};

const ACTIONS_GROUP_CLASS: Record<Phase, string> = {
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
  // nonce forces re-animation even on a same-value phase (avoids a stuck
  // sequence if goToPhase("docked") fires twice from overlapping scrolls).
  const [render, setRender] = useState<{ phase: Phase; nonce: number }>({
    phase: isHome ? "expanded" : "collapsed",
    nonce: 0,
  });
  // Tracks the real Hero background separately — layout collapses fast,
  // but the white photo takes longer to actually scroll away.
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

  // Target collapsed/expanded from route + scroll (fires past NAV_HEIGHT).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    let hasMounted = false;

    const setTarget = (collapsed: boolean) => {
      if (collapsedTargetRef.current === collapsed) return;
      collapsedTargetRef.current = collapsed;
      if (!mq.matches || !hasMounted) {
        // No real "before" state to animate from (mobile, or first load
        // already scrolled) — snap directly instead of via the docked
        // waypoint, which would otherwise get stuck with nothing to Flip.
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
      // Compare against the rail's own position (mid-screen), not NAV_HEIGHT.
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

  // Plays each Flip step, continuing docked -> final phase via onComplete.
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
  const isVertical = phase === "collapsed";
  const colorClass = overHero
    ? "text-(--color-midnight-ocean)"
    : "text-(--color-neutral-gray-blue)";
  const chipClass = `neumorphic-surface rail-icon-chip${overHero ? " neumorphic-surface--light" : ""}`;

  // Docked/collapsed aren't grid columns, so pull the logo back to visually
  // lead the rail (matches the pre-split order) instead of the source order
  // grid placement needs (menu, logo, actions).
  const orderClass = showLabels
    ? { menu: "", logo: "", actions: "" }
    : { menu: "order-2", logo: "order-1", actions: "order-3" };

  return (
    <div ref={containerRef} className={`${ROOT_CLASS[phase]} ${colorClass}`}>
      <div key="menu-group" className={`${MENU_GROUP_CLASS[phase]} ${orderClass.menu}`}>
        {menu.map((item: Menu) => {
          const Icon = iconForMenuItem(item.title);
          return (
            <div key={item.title} data-flip-id={`menu-${item.title}`}>
              <NavLink
                href={item.path}
                className={isVertical ? chipClass : ITEM_CLASS}
                showTrail={showLabels}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {showLabels && item.title}
              </NavLink>
            </div>
          );
        })}
      </div>
      <div key="logo" data-flip-id="logo" className={orderClass.logo}>
        <Link href="/" prefetch={true} aria-label="Home" className="flex items-center justify-self-center">
          <LogoSquare size={showLabels ? undefined : "sm"} />
        </Link>
      </div>
      <div key="actions-group" className={`${ACTIONS_GROUP_CLASS[phase]} ${orderClass.actions}`}>
        <div key="search" data-flip-id="search">
          {showLabels ? (
            <SearchAction />
          ) : (
            <Link
              href="/search"
              prefetch={true}
              aria-label="Search"
              title="Search"
              className={
                isVertical
                  ? chipClass
                  : "transition-colors duration-300 ease-in-out hover:text-(--color-campfire)"
              }
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </Link>
          )}
        </div>
        <div key="cart" data-flip-id="cart">
          <CartModal
            iconClassName="h-5 w-5"
            label={showLabels ? "Cart" : undefined}
            iconOnlyClassName={isVertical ? chipClass : undefined}
          />
        </div>
      </div>
    </div>
  );
}
