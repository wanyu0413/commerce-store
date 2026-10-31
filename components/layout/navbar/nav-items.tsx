"use client";

import { useCart } from "components/cart/cart-context";
import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { slackey } from "lib/fonts";
import { Menu } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import SearchAction from "./search-action";

const ITEM_CLASS = `${slackey.className} whitespace-nowrap text-[16px] tracking-wide hover:text-(--color-campfire) transition-colors duration-300 ease-in-out`;

const SECTION_LINKS: Menu[] = [
  { title: "Features", path: "/#features" },
  { title: "Products", path: "/#products" },
];

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

  const links = [...SECTION_LINKS, ...menu];
  const items: ReactNode[] = [
    ...links.map((item) => (
      <Link key={item.title} href={item.path} prefetch={true} className={ITEM_CLASS}>
        {item.title}
      </Link>
    )),
    <SearchAction key="search" className={ITEM_CLASS} />,
    <CartModal key="cart" label="Cart" />,
  ];

  // The dog rests on the current page's item and slides to whichever is hovered.
  const restIndex = Math.max(
    0,
    links.findIndex((item) => item.path.split("#")[0] === pathname),
  );
  const { isCartOpen } = useCart();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const dogIndex = isCartOpen ? items.length - 1 : (hoverIndex ?? restIndex);
  const prevIndex = useRef(dogIndex);
  const [facingLeft, setFacingLeft] = useState(false);

  useEffect(() => {
    if (dogIndex !== prevIndex.current) {
      setFacingLeft(dogIndex < prevIndex.current);
      prevIndex.current = dogIndex;
    }
  }, [dogIndex]);

  const colorClass = overHero
    ? "text-(--color-midnight-ocean)"
    : "text-(--color-neutral-gray-blue)";

  return (
    <div className={`hidden md:flex w-full items-start gap-8 ${colorClass}`}>
      <Link href="/" prefetch={true} aria-label="Home" className="flex items-center">
        <LogoSquare />
      </Link>
      <div
        className="relative mt-10 flex flex-1 border-t border-(--color-campfire)"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <Image
          src="/dachshund.svg"
          alt=""
          aria-hidden="true"
          width={56}
          height={42}
          className={`pointer-events-none absolute bottom-full mb-[-2px] h-[42px] w-14 transition-[left] ease-in-out ${
            // Strolls back slowly to its resting spot once the mouse leaves the nav.
            hoverIndex === null && !isCartOpen ? "duration-[1200ms]" : "duration-500"
          }`}
          style={{
            left: `${((dogIndex + 0.5) / items.length) * 100}%`,
            // Tilted back on its haunches, pivoting at the butt so it stays on the line.
            transform: `translateX(-50%) scaleX(${facingLeft ? -1 : 1}) rotate(-6deg)`,
            transformOrigin: `${facingLeft ? 65 : 35}% 100%`,
          }}
        />
        {items.map((item, i) => (
          <div
            key={i}
            className="group flex min-w-0 flex-1 justify-center"
            onMouseEnter={() => setHoverIndex(i)}
            onFocus={() => setHoverIndex(i)}
            onBlur={() => setHoverIndex(null)}
          >
            <div className="flex origin-top flex-col items-center motion-safe:group-hover:animate-nav-swing">
              <span aria-hidden="true" className="h-4 w-px bg-(--color-campfire)" />
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
