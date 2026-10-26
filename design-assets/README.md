# Design assets

Source files kept for reprocessing — not served by the app (unlike `public/`).

- `tail_faster.gif` — wagging-dachshund animation. Source for the CSS masks
  used by the "Add to cart" button (`components/cart/add-to-cart.tsx`):
  `public/tail_faster-mask-still.webp` (static, first frame) and
  `public/tail_faster-mask.webp` (animated, all frames). Regenerate both
  whenever this file changes.
