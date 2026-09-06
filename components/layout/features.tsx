import { cuteFont } from 'lib/fonts';
import ScrollFillHeading from './scroll-fill-heading';

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
        <section className="bg-[transparent] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col justify-center items-center md:flex-row">
                <div className="w-full md:flex-1">
                    <ScrollFillHeading
                        text="Designed for Dachshund's Health"
                        className={`${cuteFont.className} relative z-10 text-[100px] leading-none tracking-tight text-center md:text-left md:-mr-64`}
                    />
                    <p className="mt-4 mb-10 text-lg leading-8 text-(--color-neutral-gray-blue) text-center md:text-left">
                        Every detail crafted to protect your dog's unique anatomy and prevent long-term back issues.
                    </p>
                </div>
                <div className="w-full md:flex-1">
                    <dl className="flex flex-col gap-8">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col items-center bg-white/10 rounded-[10px] p-10 shadow-sm border border-[var(--color-campfire)] hover:shadow-md transition-shadow">
                                <dt className="text-xl font-bold leading-7 text-gray-900 mb-4">
                                    {feature.name}
                                </dt>
                                <dd className="text-base leading-7 text-[#667085] text-center">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
