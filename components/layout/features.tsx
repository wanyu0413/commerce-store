import { josefinSans, slackey } from 'lib/fonts';
import ScrollFillHeading from './scroll-fill-heading';
import TiltCard from './tilt-card';
import WiggleWords from './wiggle-words';

const features = [
    {
        name: 'Spine Support',
        description: 'Rigid support integrated into the top panel to help prevent IVDD issues.',
    },
    {
        name: 'Deep Chest Fit',
        description: 'Specifically tailored panels for the unique deep-chest dachshund ribcage.',
    },
    {
        name: 'No-Choke Design',
        description: 'Lower neck cut-out distributes pressure away from the sensitive trachea.',
    },
];

export function Features() {
    return (
        <section id="features" className="scroll-mt-28 bg-[transparent] py-24 sm:py-32">
            <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
                <div className="mx-auto text-center">
                    <p className="mb-3 text-[clamp(15px,1.4vw,22px)] font-medium uppercase tracking-[4px] text-(--color-campfire)">
                        Why LONGLOAF
                    </p>
                    <div className="relative inline-block">
                        <ScrollFillHeading
                            text="WHAT HAVE WE DONE"
                            waveWords={3}
                            className={`${josefinSans.className} text-[clamp(40px,4.8vw,72px)] leading-[1.3] [--scroll-fill-color:var(--color-neutral-gray-blue)]`}
                        />
                        {/* Subtitle tucked over the title's bottom-right corner. */}
                        <p className={`${slackey.className} absolute right-0 bottom-0 translate-x-[20%] translate-y-[45%] -rotate-6 whitespace-nowrap text-[clamp(20px,2.4vw,36px)] leading-none text-(--color-campfire)`}>
                            <WiggleWords text="for long bodies' health" />
                        </p>
                    </div>
                </div>
                <dl className="mt-[clamp(44px,5vw,72px)] grid grid-cols-1 gap-8 md:grid-cols-3">
                    {features.map((feature) => (
                        <TiltCard
                            key={feature.name}
                            className="flex flex-col aspect-[378/222] bg-black/25 rounded-[40px] p-10"
                        >
                            <dt className={`${slackey.className} text-[26px] leading-none tracking-wide text-(--color-neutral-gray-blue)`}>
                                {feature.name}
                            </dt>
                            <dd className="text-base text-(--color-neutral-gray-blue)">
                                {feature.description}
                            </dd>
                        </TiltCard>
                    ))}
                </dl>
            </div>
        </section>
    );
}
