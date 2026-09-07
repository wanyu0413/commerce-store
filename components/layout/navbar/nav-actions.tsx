import CartModal from "components/cart/modal";
import { cuteFont } from "lib/fonts";
import { Menu } from "lib/shopify/types";
import { iconForMenuItem } from "./menu-icon";
import NavLink from "./nav-link";
import SearchAction from "./search-action";

// The right-hand group of the "expanded" nav row: menu links, Search, and
// Cart all sharing one font/hover treatment (see NavLink/SearchAction/
// CartModal's shared styling) and aligned together — see NavAnimator/index
// for where this sits relative to the logo.
const ACTION_CLASS = `${cuteFont.className} flex items-center gap-2 text-[24px] text-current hover:text-(--color-campfire) transition-all duration-300 ease-in-out`;

export default function NavActions({ menu }: { menu: Menu[] }) {
  return (
    <div className="hidden items-center gap-6 text-sm md:flex">
      {menu.map((item: Menu) => {
        const Icon = iconForMenuItem(item.title);
        return (
          <NavLink key={item.title} href={item.path} className={ACTION_CLASS}>
            <Icon className="h-5 w-5" />
            {item.title}
          </NavLink>
        );
      })}
      <SearchAction />
      <CartModal iconClassName="h-5 w-5" label="Cart" />
    </div>
  );
}
