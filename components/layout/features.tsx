import { AdjustmentsHorizontalIcon, FaceSmileIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

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
        <section className="bg-[#fcfcfc] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[#1a1c29] sm:text-4xl">
                        Designed for Doxie Health
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-[#667085]">
                        Every detail crafted to protect your dog's unique anatomy and prevent long-term back issues.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col items-center bg-white rounded-3xl p-10 shadow-sm border border-neutral-100/50 hover:shadow-md transition-shadow">
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
