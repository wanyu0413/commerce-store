import { cuteFont } from "lib/fonts";
import ShopButton from './shop-button';


export default function Hero() {
    return (
        <section data-hero-section className="relative -mt-20 w-full h-[800px] flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex w-full h-full">
                <div className="relative flex-1 h-full bg-[url(/hero-babies.png)] bg-center bg-cover">
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center px-4 text-center">
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