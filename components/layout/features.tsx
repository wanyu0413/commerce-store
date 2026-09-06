import { cuteFont } from 'lib/fonts';
import ScrollFillHeading from './scroll-fill-heading';
import TiltCard from './tilt-card';

const features = [
    {
        name: 'Spine Support',
        description: 'Rigid support integrated into the top panel to help prevent IVDD issues.',
        image: '/spine_support.webp',
    },
    {
        name: 'Deep Chest Fit',
        description: 'Specifically tailored panels for the unique deep-chest dachshund ribcage.',
        image: '/deep_chest_fit.webp',
    },
    {
        name: 'No-Choke Design',
        description: 'Lower neck cut-out distributes pressure away from the sensitive trachea.',
        image: '/no-choke_design.webp',
    },
];

export function Features() {
    return (
        <section className="bg-[transparent] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <ScrollFillHeading
                        text="Designed for Dachshund's Health"
                        className={`${cuteFont.className} text-[100px] leading-none tracking-tight`}
                    />
                    <p className="mt-4 text-lg leading-8 text-(--color-neutral-gray-blue)">
                        Every detail crafted to protect your dog's unique anatomy and prevent long-term back issues.
                    </p>
                </div>
                <dl className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {features.map((feature) => (
                        <TiltCard
                            key={feature.name}
                            image={feature.image}
                            className="flex flex-col aspect-[378/222] bg-(--color-midnight-ocean) rounded-[10px] p-10"
                        >
                            <dt className={`${cuteFont.className} text-[40px] font-bold leading-none text-(--color-neutral-gray-blue) text-right`}>
                                {feature.name}
                            </dt>
                            <dd className="text-base text-(--color-neutral-gray-blue) text-right">
                                {feature.description}
                            </dd>
                        </TiltCard>
                    ))}
                </dl>
            </div>
        </section>
    );
}
