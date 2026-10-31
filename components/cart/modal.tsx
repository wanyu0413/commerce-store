"use client";

import { slackey } from "lib/fonts";
import { useCart } from "./cart-context";
import OpenCart from "./open-cart";

const LABEL_CLASS = `${slackey.className} text-[16px] tracking-wide text-current hover:text-(--color-campfire) transition-all duration-300 ease-in-out`;
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

  if (label) {
    return (
      <button
        aria-label="Open cart"
        onClick={openCart}
        className={`relative ${LABEL_CLASS}`}
      >
        {label}
        {cart?.totalQuantity ? (
          <span className="absolute -right-5 -top-2 h-4 min-w-4 rounded-sm bg-(--color-campfire) px-0.5 font-sans text-[11px] font-medium leading-4 text-white">
            {cart.totalQuantity}
          </span>
        ) : null}
      </button>
    );
  }

  return (
    <button aria-label="Open cart" onClick={openCart} className={iconOnlyClassName}>
      <OpenCart className={iconClassName} quantity={cart?.totalQuantity} />
    </button>
  );
}
