"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cuteFont } from "lib/fonts";
import { useEffect, useRef } from "react";
import ShopButton from './shop-button';

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
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
        <section ref={sectionRef} data-hero-section className="relative -mt-20 w-full h-[800px] flex flex-col items-center justify-center overflow-hidden">
            <div ref={bgRef} className="absolute -inset-y-40 inset-x-0 flex w-full">
                <div className="relative flex-1 h-full bg-[url(/hero-babies.png)] bg-center bg-cover">
                </div>
            </div>

            <div ref={contentRef} className="relative z-10 flex flex-col items-center px-4 text-center">
                <h1 className={`${cuteFont.className} text-[110px] leading-none font-bold text-black drop-shadow-lg`}>
                    LONGLOAF
                </h1>
                <p className="text-lg text-gray-600 drop-shadow-md mt-6 mb-14 max-w-lg">
                    Premium harnesses designed specifically for the unique needs of Corgis and Dachshunds.
                </p>
                <ShopButton />
            </div>
        </section>
    );
}
