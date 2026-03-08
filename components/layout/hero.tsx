import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative w-full h-[800px] flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex w-full h-full">
                <div className="relative flex-1 h-full bg-[url(/hero-babies.png)] bg-center bg-cover">
                </div>
            </div>

            <div className="relative z-10 text-center px-4 w-1/3">
                <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg mb-4">
                    Big City Style for Short Legs
                </h1>
                <p className="text-xl text-white drop-shadow-md mb-8 max-w-lg mx-auto">
                    Premium harnesses designed specifically for the unique needs of Corgis and Dachshunds.
                </p>
                <Link
                    href="/search"
                    className="btn-primary-lift"
                >
                    Shop the Collection
                </Link>
            </div>
        </section>
    );
}