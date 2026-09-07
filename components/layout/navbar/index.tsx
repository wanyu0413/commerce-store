import { getMenu } from "lib/shopify";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import NavActions from "./nav-actions";
import NavAnimator from "./nav-animator";
import NavBrand from "./nav-brand";
import NavRail from "./nav-rail";

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <nav className="fixed inset-x-0 top-0 z-20 flex items-center justify-between bg-transparent p-4 md:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <NavAnimator
          expanded={
            <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
              <div />
              <NavBrand />
              <NavActions menu={menu} />
            </div>
          }
          compact={<NavRail menu={menu} />}
        />
      </div>
    </nav>
  );
}
