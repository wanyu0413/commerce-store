"use client";

import { cuteFont } from "lib/fonts";
import { useCart } from "./cart-context";
import OpenCart from "./open-cart";

const LABEL_CLASS = `${cuteFont.className} text-[24px] tracking-wider text-current hover:text-(--color-campfire) transition-all duration-300 ease-in-out`;
const ICON_ONLY_CLASS =
  "text-current transition-colors duration-300 ease-in-out hover:text-(--color-campfire)";

// Just the trigger button — the actual drawer is CartDrawer, rendered once
// in the navbar, since this component is itself instantiated twice (mobile
// and desktop nav triggers) and shouldn't each own a separate open <Dialog>.
export default function CartModal({
  iconClassName = "h-6 w-6",
  label,
  iconOnlyClassName = ICON_ONLY_CLASS,
}: {
  iconClassName?: string;
  label?: string;
  iconOnlyClassName?: string;
} = {}) {
  const { cart, openCart } = useCart();

  return (
    <button
      aria-label="Open cart"
      onClick={openCart}
      className={
        label ? `flex items-center gap-2 ${LABEL_CLASS}` : iconOnlyClassName
      }
    >
      <OpenCart className={iconClassName} quantity={cart?.totalQuantity} />
      {label}
    </button>
  );
}
