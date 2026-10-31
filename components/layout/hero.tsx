"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slackey, josefinSans } from "lib/fonts";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ShopButton from './shop-button';
import WiggleWords from './wiggle-words';

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.to(imageRef.current, {
                y: 80,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
            gsap.to(contentRef.current, {
                y: -120,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} data-hero-section className="torn-edge-bottom relative -mt-20 w-full overflow-hidden bg-(--color-neutral-gray-blue) pt-20 md:h-[800px]">
            {/* 52px gutters that grow to cap the content at 1600px on very wide screens. */}
            <div className="grid h-full items-center gap-12 px-6 pt-12 pb-24 md:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] md:gap-x-[52px] md:px-[max(52px,calc((100vw-1600px)/2))] md:py-0">
                <div ref={contentRef} className="@container relative z-10 flex flex-col items-start">
                    <h1 className="text-(--color-midnight-ocean)">
                        <span className={`${slackey.className} block whitespace-nowrap text-[min(13cqw,110px)] leading-none tracking-tight text-(--color-campfire)`}>
                            <WiggleWords text="It's the end..." />
                        </span>
                        <span className={`${josefinSans.className} mt-4 block text-[32px] uppercase leading-[1.05] md:text-[48px]`}>
                            Of bad harnesses for long bodies.
                        </span>
                    </h1>
                    <p className="mt-6 mb-14 max-w-lg text-lg text-(--color-midnight-ocean)/75">
                        Premium harnesses designed specifically for the unique needs of Corgis and Dachshunds.
                    </p>
                    <ShopButton />
                </div>

                {/* Photo has an opaque off-white backdrop: brightness lifts it to pure
                    white, then multiply lets the white take on the hero background. */}
                <div ref={imageRef} className="relative aspect-[1.6] w-full mix-blend-multiply md:scale-115 [mask-image:linear-gradient(to_right,transparent,#000_18%,#000_85%,transparent)]">
                    <Image
                        src="/hero.png"
                        alt="Two dachshunds wearing Snoopy denim harnesses"
                        fill
                        priority
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover brightness-[1.06]"
                    />
                </div>
            </div>
        </section>
    );
}
