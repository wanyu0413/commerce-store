"use client";

import gsap from "gsap";
import Link from "next/link";
import { ReactNode, useRef } from "react";

// Paw-print trail in place of an underline. Enter and leave use different
// clip-path axes on purpose: revealing grows the visible area in from the
// left (as if new footprints are being placed), while leaving shrinks it
// away from the left too — so the trail fades in the order it appeared,
// like real footprints aging/vanishing behind you, rather than just
// rewinding the reveal in reverse.
export default function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const pawRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    const paw = pawRef.current;
    if (!paw) return;
    gsap.killTweensOf(paw);
    gsap.set(paw, { clipPath: "inset(0 100% 0 0)" });
    gsap.to(paw, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    const paw = pawRef.current;
    if (!paw) return;
    gsap.killTweensOf(paw);
    gsap.to(paw, {
      clipPath: "inset(0 0 0 100%)",
      duration: 0.45,
      ease: "power2.in",
    });
  };

  return (
    <Link
      href={href}
      prefetch={true}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative ${className ?? ""}`}
    >
      {children}
      {/* aspect-[824/200] matches paw-prints-trail.png's real dimensions, so
          adjusting `w-*` alone resizes it without distorting the artwork —
          no need to keep a height value in sync by hand. */}
      <span
        ref={pawRef}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 right-0 aspect-[824/200] w-20 max-w-none"
        style={{
          clipPath: "inset(0 100% 0 0)",
          backgroundColor: "currentColor",
          WebkitMaskImage: "url(/paw-prints-trail.png)",
          maskImage: "url(/paw-prints-trail.png)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "left center",
          maskPosition: "left center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </Link>
  );
}
