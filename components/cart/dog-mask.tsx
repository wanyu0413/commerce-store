// Dog silhouette clipped to `color` — white/transparent WEBP mask
// derived from design-assets/tail_faster.gif (dog opaque, background fully
// transparent). Shared by the "Add to cart" and "Proceed to Checkout"
// buttons so they stay visually identical.
export default function DogMask({
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
