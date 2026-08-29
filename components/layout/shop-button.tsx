"use client";

import gsap from "gsap";
import { cuteFont } from "lib/fonts";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

export default function ShopButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pawsRef = useRef<HTMLImageElement>(null);
  const jumpTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    // Start fully tucked away behind the button, and invisible so any
    // mid-slide transit through the button's edge never flashes the root.
    gsap.set(pawsRef.current, { xPercent: -50, yPercent: 100, opacity: 0 });
  }, []);

  const handleEnter = () => {
    const el = containerRef.current;
    const paws = pawsRef.current;
    if (!el || !paws) return;
    const underline = el.querySelector(".squiggle") as SVGPathElement | null;

    jumpTweenRef.current?.kill();
    gsap.killTweensOf([el, paws, underline]);

    gsap
      .timeline()
      .to(el, { scale: 1.06, y: 6, duration: 0.4, ease: "back.out(3)" }, 0)
      .fromTo(
        underline,
        { strokeDashoffset: 220 },
        { strokeDashoffset: 0, duration: 0.5, ease: "circ.inOut" },
        0,
      )
      .to(paws, { yPercent: 0, y: -14, duration: 0.5, ease: "back.out(2)" }, 0.05)
      .to(paws, { opacity: 1, duration: 0.2 }, 0.35)
      .call(() => {
        // A little hopping loop while the paws are up, for a cute/fun feel.
        jumpTweenRef.current = gsap.to(paws, {
          y: -40,
          duration: 0.3,
          ease: "power1.out",
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.1,
        });
      });
  };

  const handleLeave = () => {
    const el = containerRef.current;
    const paws = pawsRef.current;
    if (!el || !paws) return;
    const underline = el.querySelector(".squiggle") as SVGPathElement | null;

    jumpTweenRef.current?.kill();
    gsap.killTweensOf([el, paws, underline]);

    gsap
      .timeline()
      .to(el, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0)
      .to(underline, { strokeDashoffset: 220, duration: 0.3 }, 0)
      // Fade out first, while still safely tucked in place, then slide back
      // down only once invisible — same reasoning as the enter animation.
      .to(paws, { opacity: 0, duration: 0.15 }, 0)
      .to(
        paws,
        { yPercent: 100, y: 0, duration: 0.25, ease: "power2.in" },
        0.12,
      );
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative inline-block"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-20 bottom-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={pawsRef}
          src="/dog-arms.png"
          alt=""
          className="absolute bottom-0 left-1/2 w-30 max-w-none"
        />
      </div>
      <Link
        href="/search"
        className={`${cuteFont.className} text-[24px] btn-primary-lift relative z-10 inline-block uppercase`}
      >
        Shop the Collection
        <svg
          viewBox="0 0 220 12"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 -bottom-1 h-3 w-full"
        >
          <path
            className="squiggle"
            d="M2 8 Q 20 2, 38 8 T 74 8 T 110 8 T 146 8 T 182 8 T 218 8"
            fill="none"
            stroke="var(--color-midnight-ocean)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset="220"
          />
        </svg>
      </Link>
    </div>
  );
}
