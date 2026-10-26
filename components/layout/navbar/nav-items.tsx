"use client";

import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { cuteFont } from "lib/fonts";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { iconForMenuItem } from "./menu-icon";
import NavLink from "./nav-link";
import SearchAction from "./search-action";

const ITEM_CLASS = `${cuteFont.className} flex items-center gap-2 text-[24px] tracking-wider hover:text-(--color-campfire) transition-colors duration-300 ease-in-out`;

export default function NavItems({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Tracks the real Hero background so nav text/icons stay legible whether
  // they're sitting over the light Hero photo or the darker page below it.
  const [overHero, setOverHero] = useState(isHome);

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }

    const evaluate = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero-section]");
      setOverHero(hero ? hero.getBoundingClientRect().bottom > 0 : false);
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
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const colorClass = overHero
    ? "text-(--color-midnight-ocean)"
    : "text-(--color-neutral-gray-blue)";

  return (
    <div
      className={`hidden md:grid w-full grid-cols-[1fr_auto_1fr] items-center ${colorClass}`}
    >
      <div className="flex items-center gap-4 justify-self-start">
        {menu.map((item: Menu) => {
          const Icon = iconForMenuItem(item.title);
          return (
            <NavLink key={item.title} href={item.path} className={ITEM_CLASS}>
              <Icon className="h-5 w-5 shrink-0" />
              {item.title}
            </NavLink>
          );
        })}
      </div>
      <Link
        href="/"
        prefetch={true}
        aria-label="Home"
        className="flex items-center justify-self-center"
      >
        <LogoSquare />
      </Link>
      <div className="flex items-center gap-4 justify-self-end">
        <SearchAction />
        <CartModal iconClassName="h-5 w-5" label="Cart" />
      </div>
    </div>
  );
}
