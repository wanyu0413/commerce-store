"use client";

import { addItem } from "components/cart/actions";
import { cuteFont } from "lib/fonts";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useCart } from "./cart-context";
import DogMask from "./dog-mask";

function DogMaskButton({
  label,
  ariaLabel,
  disabled,
  color,
  ...handlers
}: {
  label: string;
  ariaLabel: string;
  disabled?: boolean;
  color: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      {...handlers}
      className="relative w-full flex items-center justify-center gap-3 bg-neutral-800 text-neutral-400 py-[12px] px-[20px] rounded-[10px] font-bold cursor-not-allowed opacity-50"
    >
      <span className={`${cuteFont.className} text-[24px] uppercase tracking-wider`}>
        {label}
      </span>
      <div className="absolute right-[10%] top-1/2 -translate-y-[70%] w-[120px] aspect-[579/348]">
        <DogMask url="/tail_faster-mask-still.webp" color="currentColor" />
      </div>
    </button>
  );
}

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  if (!availableForSale) {
    return (
      <DogMaskButton
        label="Out Of Stock"
        ariaLabel="Out Of Stock"
        disabled
        color="#9ca3af"
      />
    );
  }

  if (!selectedVariantId) {
    return (
      <DogMaskButton
        label="Add To Cart"
        ariaLabel="Please select an option"
        disabled
        color="#9ca3af"
      />
    );
  }

  return <LiveSubmitButton />;
}

function LiveSubmitButton() {
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
      aria-label="Add to cart"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="btn-primary-lift relative w-full flex items-center justify-center gap-3 py-[12px] px-[20px] text-white hover:text-white"
    >
      <span className={`${cuteFont.className} z-10 text-[24px] uppercase tracking-wider`}>
        Add To Cart
      </span>
      <div className="absolute right-[10%] top-1/2 -translate-y-[70%] w-[120px] aspect-[579/348]">
        <DogMask url={maskUrl} color={isHovered ? "var(--color-midnight-ocean)" : "var(--color-campfire)"} className="transition-colors duration-300 ease-in-out" />
      </div>
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const searchParams = useSearchParams();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
