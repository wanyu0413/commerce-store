import { cuteFont } from 'lib/fonts';
import ScrollFillHeading from './scroll-fill-heading';
import TiltCard from './tilt-card';

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
                <div className="mx-auto max-w-2xl text-center">
                    <ScrollFillHeading
                        text="Designed for Dachshund's Health"
                        className={`${cuteFont.className} text-[100px] leading-none tracking-wider`}
                    />
                    <p className="mt-4 text-lg leading-8 text-(--color-neutral-gray-blue)">
                        Every detail crafted to protect your dog's unique anatomy and prevent long-term back issues.
                    </p>
                </div>
                <dl className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {features.map((feature) => (
                        <TiltCard
                            key={feature.name}
                            className="flex flex-col aspect-[378/222] bg-black/25 rounded-[40px] p-10"
                        >
                            <dt className={`${cuteFont.className} text-[40px] font-bold leading-none tracking-wider text-(--color-neutral-gray-blue)`}>
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
