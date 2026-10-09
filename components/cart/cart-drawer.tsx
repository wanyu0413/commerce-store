"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { cuteFont } from "lib/fonts";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import DogMask from "./dog-mask";
import { EditItemQuantityButton } from "./edit-item-quantity-button";

type MerchandiseSearchParams = {
  [key: string]: string;
};

// Rendered exactly once (see components/layout/navbar/index.tsx) — CartModal
// itself is instantiated twice (mobile + desktop nav triggers), so the
// drawer's open state and markup live here instead, shared via CartContext.
export default function CartDrawer() {
  const { cart, updateCartItem, isCartOpen, closeCart } = useCart();

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  return (
    <Transition show={isCartOpen}>
      <Dialog onClose={closeCart} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="opacity-0 backdrop-blur-none"
          enterTo="opacity-100 backdrop-blur-[.5px]"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="opacity-100 backdrop-blur-[.5px]"
          leaveTo="opacity-0 backdrop-blur-none"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-[2px] border-(--color-campfire) p-6  text-(--color-neutral-gray-blue) backdrop-blur-xl md:w-[390px]">
            <div className="flex items-center justify-between">
              <p className={`${cuteFont.className} text-[32px] font-semibold tracking-wider text-(--color-campfire)`}>My Cart</p>
              <button aria-label="Close cart" onClick={closeCart}>
                <CloseCart />
              </button>
            </div>

            {!cart || cart.lines.length === 0 ? (
              <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                <ShoppingCartIcon className="h-16" />
                <p className="mt-6 text-center text-2xl font-bold">
                  Your cart is empty.
                </p>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                <ul className="grow overflow-auto py-4">
                  {cart.lines
                    .sort((a, b) =>
                      a.merchandise.product.title.localeCompare(
                        b.merchandise.product.title,
                      ),
                    )
                    .map((item, i) => {
                      const merchandiseSearchParams =
                        {} as MerchandiseSearchParams;

                      item.merchandise.selectedOptions.forEach(
                        ({ name, value }) => {
                          if (value !== DEFAULT_OPTION) {
                            merchandiseSearchParams[name.toLowerCase()] =
                              value;
                          }
                        },
                      );

                      const merchandiseUrl = createUrl(
                        `/product/${item.merchandise.product.handle}`,
                        new URLSearchParams(merchandiseSearchParams),
                      );

                      return (
                        <li
                          key={i}
                          className="flex w-full flex-col border-b border-(--color-neutral-gray-blue)"
                        >
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -ml-1 -mt-2">
                              <DeleteItemButton
                                item={item}
                                optimisticUpdate={updateCartItem}
                              />
                            </div>
                            <div className="flex flex-row">
                              <div className="relative h-16 w-16 overflow-hidden rounded-md border border-(--color-neutral-gray-blue) bg-neutral-300">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={
                                    item.merchandise.product.featuredImage
                                      .altText ||
                                    item.merchandise.product.title
                                  }
                                  src={
                                    item.merchandise.product.featuredImage.url
                                  }
                                />
                              </div>
                              <Link
                                href={merchandiseUrl}
                                onClick={closeCart}
                                className="z-30 ml-2 flex flex-row space-x-4"
                              >
                                <div className="flex flex-1 flex-col text-(--color-campfire)">
                                  <span className="leading-tight">
                                    {item.merchandise.product.title}
                                  </span>
                                  {item.merchandise.title !==
                                    DEFAULT_OPTION ? (
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                      {item.merchandise.title}
                                    </p>
                                  ) : null}
                                </div>
                              </Link>
                            </div>
                            <div className="flex h-16 flex-col justify-between">
                              <Price
                                className="flex justify-end space-y-2 text-right text-sm"
                                amount={item.cost.totalAmount.amount}
                                currencyCode={
                                  item.cost.totalAmount.currencyCode
                                }
                              />
                              <div className="neumorphic-surface ml-auto flex h-9 flex-row items-center rounded-full">
                                <EditItemQuantityButton
                                  item={item}
                                  type="minus"
                                  optimisticUpdate={updateCartItem}
                                />
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm">
                                    {item.quantity}
                                  </span>
                                </p>
                                <EditItemQuantityButton
                                  item={item}
                                  type="plus"
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
                <div className="py-4 text-sm text-white">
                  <div className="mb-3 flex items-center justify-between border-b border-(--color-neutral-gray-blue) pb-1">
                    <p>Taxes</p>
                    <Price
                      className="text-right text-base text-(--color-neutral-gray-blue)"
                      amount={cart.cost.totalTaxAmount.amount}
                      currencyCode={cart.cost.totalTaxAmount.currencyCode}
                    />
                  </div>
                  <div className="mb-3 flex items-center justify-between border-b border-(--color-neutral-gray-blue) pb-1 pt-1">
                    <p>Shipping</p>
                    <p className="text-right">Calculated at checkout</p>
                  </div>
                  <div className="mb-3 flex items-center justify-between border-b border-(--color-neutral-gray-blue) pb-1 pt-1">
                    <p>Total</p>
                    <Price
                      className="text-right text-base text-(--color-neutral-gray-blue)"
                      amount={cart.cost.totalAmount.amount}
                      currencyCode={cart.cost.totalAmount.currencyCode}
                    />
                  </div>
                </div>
                <form action={redirectToCheckout}>
                  <CheckoutButton />
                </form>
              </div>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="neumorphic-surface rail-icon-chip relative h-11 w-11 text-(--color-neutral-gray-blue) hover:text-(--color-campfire)">
      <XMarkIcon
        className={clsx(
          "h-6 transition-all ease-in-out hover:scale-110",
          className,
        )}
      />
    </div>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();
  const [isHovered, setIsHovered] = useState(false);

  // Warm the browser's cache/decoder for the animated mask ahead of time, so
  // the very first hover doesn't stall on fetching+decoding it on demand.
  useEffect(() => {
    const img = new window.Image();
    img.src = "/tail_faster-mask.webp";
  }, []);

  const maskUrl = isHovered
    ? "/tail_faster-mask.webp"
    : "/tail_faster-mask-still.webp";

  return (
    <button
      type="submit"
      disabled={pending}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="neumorphic-surface btn-primary-lift relative flex w-full items-center justify-center gap-3 px-[20px] py-[12px] text-(--color-neutral-gray-blue) hover:text-(--color-campfire) disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <>
          <span
            className={`${cuteFont.className} z-10 text-[24px] uppercase tracking-wider`}
          >
            Proceed to Checkout
          </span>
          <div className="absolute right-[10%] top-1/2 aspect-[579/348] w-[120px] -translate-y-[70%]">
            <DogMask
              url={maskUrl}
              color={isHovered ? "var(--color-neutral-gray-blue)" : "var(--color-campfire)"}
              className="transition-colors duration-300 ease-in-out"
            />
          </div>
        </>
      )}
    </button>
  );
}
