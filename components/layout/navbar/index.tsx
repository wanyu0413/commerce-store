import { getMenu } from "lib/shopify";
import NavItems from "./nav-items";

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <nav className="fixed inset-x-0 top-0 z-20 flex items-center justify-between bg-transparent p-4 md:px-6">
      <NavItems menu={menu} />
    </nav>
  );
}
