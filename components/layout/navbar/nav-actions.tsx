import CartModal from "components/cart/modal";
import { cuteFont } from "lib/fonts";
import { Menu } from "lib/shopify/types";
import { iconForMenuItem } from "./menu-icon";
import NavLink from "./nav-link";
import SearchAction from "./search-action";

const ACTION_CLASS = `${cuteFont.className} flex items-center gap-2 text-[24px] text-current hover:text-(--color-campfire) transition-all duration-300 ease-in-out`;

export default function NavActions({ menu }: { menu: Menu[] }) {
  return (
    <div className="flex items-center gap-4 justify-self-end md:gap-6">
      <div className="hidden items-center gap-4 text-sm md:flex">
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
      <div className="md:hidden">
        <CartModal />
      </div>
    </div>
  );
}
