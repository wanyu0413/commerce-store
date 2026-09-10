"use client";

import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "./mobile-menu";

export default function MobileNavBar({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const barRef = useRef<HTMLDivElement>(null);
  const [overHero, setOverHero] = useState(isHome);

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }

    const evaluate = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero-section]");
      const barBottom = barRef.current?.getBoundingClientRect().bottom ?? 0;
      setOverHero(hero ? hero.getBoundingClientRect().bottom > barBottom : false);
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  const colorClass = overHero
    ? "text-(--color-midnight-ocean)"
    : "text-(--color-neutral-gray-blue)";

  return (
    <div
      ref={barRef}
      className={`neumorphic-surface mobile-nav-bar flex w-full items-center justify-between md:hidden ${
        overHero ? "neumorphic-surface--light" : ""
      } ${colorClass}`}
    >
      <Link href="/" prefetch={true} aria-label="Home">
        <LogoSquare />
      </Link>
      <div className="flex items-center gap-4">
        <CartModal iconClassName="h-6 w-6" />
        <MobileMenu menu={menu} />
      </div>
    </div>
  );
}
