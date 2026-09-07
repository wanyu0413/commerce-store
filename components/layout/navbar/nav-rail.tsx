import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { iconForMenuItem } from "./menu-icon";

// Compact icon-only nav, docked to the right edge. This only ever appears
// once the Hero has scrolled out of view (home) or on any page that has no
// Hero at all (see NavAnimator) — meaning it always sits over the plain
// navy page background, so unlike the expanded nav it can hardcode the
// bright color scheme rather than branching on the route.
export default function NavRail({ menu }: { menu: Menu[] }) {
  return (
    <div className="hidden flex-col items-center gap-5 text-(--color-neutral-gray-blue) md:flex">
      <Link href="/" prefetch={true} aria-label="Home" className="flex-none">
        <LogoSquare size="sm" />
      </Link>
      {menu.map((item: Menu) => {
        const Icon = iconForMenuItem(item.title);
        return (
          <Link
            key={item.title}
            href={item.path}
            prefetch={true}
            aria-label={item.title}
            title={item.title}
            className="transition-colors duration-300 ease-in-out hover:text-(--color-campfire)"
          >
            <Icon className="h-6 w-6" />
          </Link>
        );
      })}
      <Link
        href="/search"
        prefetch={true}
        aria-label="Search"
        title="Search"
        className="transition-colors duration-300 ease-in-out hover:text-(--color-campfire)"
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
      </Link>
      <CartModal />
    </div>
  );
}
