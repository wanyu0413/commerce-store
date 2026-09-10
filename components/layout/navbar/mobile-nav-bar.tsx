"use client";

import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./mobile-menu";

export default function MobileNavBar({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div
      className={`flex w-full items-center justify-between md:hidden ${
        isHome ? "text-(--color-midnight-ocean)" : "text-(--color-neutral-gray-blue)"
      }`}
    >
      <Link href="/" prefetch={true} aria-label="Home">
        <LogoSquare />
      </Link>
      <div className="flex items-center gap-4">
        <MobileMenu menu={menu} />
        <CartModal iconClassName="h-6 w-6" />
      </div>
    </div>
  );
}
