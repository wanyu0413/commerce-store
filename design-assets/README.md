# Design assets

Source files kept for reprocessing — not served by the app (unlike `public/`).

- `tail_faster.gif` — wagging-dachshund animation. Source for the CSS masks
  used by the "Add to cart" button (`components/cart/add-to-cart.tsx`):
  `public/tail_faster-mask-still.webp` (static, first frame) and
  `public/tail_faster-mask.webp` (animated, all frames). Regenerate both
  whenever this file changes.

- `paw-prints-source.png` — raw diagonal paw-trail stamp (extracted from a
  malformed export, `paw prints.svg`, whose outer `<svg>` dimensions didn't
  match its embedded raster — the SVG wrapper was discarded, this raster is
  the real source). Cropped to its bounding box, flipped, and rotated ~42° to
  level the diagonal into a horizontal trail, then recolored dark→white
  (alpha preserved) for use as a CSS luminance mask: `public/paw-prints-trail.png`,
  used by the nav menu links' hover reveal
  (`components/layout/navbar/index.tsx`, `.nav-link-paw` in `globals.css`).
