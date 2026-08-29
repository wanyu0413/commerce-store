"use client";

import { addItem } from "components/cart/actions";
import { cuteFont } from "lib/fonts";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useCart } from "./cart-context";

// Dog silhouette clipped to `color` — white/transparent WEBP mask
// derived from tail_faster.gif (dog opaque, background fully transparent).
function DogMask({
  url,
  color,
  className = "",
}: {
  url: string;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

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
      className={`relative inline-block aspect-[579/348] w-64 max-w-full ${disabled ? "cursor-not-allowed" : "hover:opacity-90"
        }`}
    >
      <DogMask url="/tail_faster-mask-still.webp" color={color} />
      <span
        className={`${cuteFont.className} relative z-10 flex h-full items-center justify-center text-xl font-bold tracking-wide text-white`}
      >
        {label}
      </span>
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
      className="relative inline-block aspect-[579/348] w-64 max-w-full scale-100 transition-transform duration-300 ease-out hover:scale-105"
    >
      <DogMask url={maskUrl} color="rgba(0, 0, 0, 0.9)" />
      <span
        className={`${cuteFont.className} pt-2 relative z-10 flex h-full items-center justify-center text-[32px] font-bold tracking-wide text-(--color-dusty-pink) transition-transform duration-300`}
      >
        Add To Cart
      </span>
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
