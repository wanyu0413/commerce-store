// Paw-print hover trail, sliced/staggered for a cascading fade.
const TRAIL_SLICES = 5;
const TRAIL_WIDTH = 80; // px, matches the previous w-20
const TRAIL_HEIGHT = TRAIL_WIDTH * (200 / 824); // preserves the source image's aspect ratio
const SLICE_WIDTH = TRAIL_WIDTH / TRAIL_SLICES;
const STAGGER_STEP_MS = 60;

export default function PawTrail() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-3 right-0 flex"
      style={{ width: TRAIL_WIDTH, height: TRAIL_HEIGHT }}
    >
      {Array.from({ length: TRAIL_SLICES }, (_, i) => (
        <span
          key={i}
          className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          style={{
            width: SLICE_WIDTH,
            height: TRAIL_HEIGHT,
            backgroundColor: "var(--color-campfire)",
            WebkitMaskImage: "url(/paw-prints-trail.png)",
            maskImage: "url(/paw-prints-trail.png)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: `-${i * SLICE_WIDTH}px center`,
            maskPosition: `-${i * SLICE_WIDTH}px center`,
            WebkitMaskSize: `${TRAIL_WIDTH}px ${TRAIL_HEIGHT}px`,
            maskSize: `${TRAIL_WIDTH}px ${TRAIL_HEIGHT}px`,
            transitionDelay: `${i * STAGGER_STEP_MS}ms`,
          }}
        />
      ))}
    </span>
  );
}
