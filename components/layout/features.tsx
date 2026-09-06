import { AdjustmentsHorizontalIcon, FaceSmileIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { cuteFont } from 'lib/fonts';
import ScrollFillHeading from './scroll-fill-heading';

const features = [
    {
        name: 'Spine Support',
        description: 'Rigid support integrated into the top panel to help prevent IVDD issues.',
        icon: AdjustmentsHorizontalIcon,
    },
    {
        name: 'Deep Chest Fit',
        description: 'Specifically tailored panels for the unique deep-chest dachshund ribcage.',
        icon: ShieldCheckIcon,
    },
    {
        name: 'No-Choke Design',
        description: 'Lower neck cut-out distributes pressure away from the sensitive trachea.',
        icon: FaceSmileIcon,
    },
];

export function Features() {
    return (
        <section className="bg-[transparent] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-center">
                <div className="mx-auto max-w-2xl">
                    <ScrollFillHeading
                        text="Designed for Dachshund's Health"
                        className={`${cuteFont.className} text-[100px] leading-none tracking-tight`}
                    />
                    <p className="mt-4 text-lg leading-8 text-(--color-neutral-gray-blue)">
                        Every detail crafted to protect your dog's unique anatomy and prevent long-term back issues.
                    </p>
                </div>
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col items-center bg-white/10 rounded-3xl p-10 shadow-sm border border-[var(--color-campfire)] hover:shadow-md transition-shadow">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#faeff0]">
                                    <feature.icon className="h-8 w-8 text-[#dca6a3]" aria-hidden="true" />
                                </div>
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
