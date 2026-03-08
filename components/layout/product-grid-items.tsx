import Grid from "components/grid";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

function StarRating({ rating }: { rating: number }) {
  // Render 5 little stars with an SVG based on the design
  return (
    <div className="flex items-center gap-2">
      <div className="flex text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="h-3 w-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs font-medium text-slate-400">({rating.toFixed(1)})</span>
    </div>
  );
}

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => {
        const price = parseFloat(product.priceRange.maxVariantPrice.amount);
        const currency = product.priceRange.maxVariantPrice.currencyCode === 'USD' ? '$' : product.priceRange.maxVariantPrice.currencyCode;

        return (
          <Grid.Item key={product.handle} className="group animate-fadeIn list-none">
            <Link href={`/product/${product.handle}`} className="block w-full h-full relative cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 mb-4 bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] dark:from-slate-800 dark:to-slate-900 border border-primary/10">
                <Image
                  src={product.featuredImage?.url || '/hero-babies.png'}
                  alt={product.title}
                  fill
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm shadow-xl translate-y-12 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                  Quick View
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">{product.title}</h3>
                  <StarRating rating={5.0} />
                </div>
                <p className="text-lg font-black text-primary tracking-tighter">{currency}{price.toFixed(2)}</p>
              </div>
            </Link>
          </Grid.Item>
        );
      })}
    </>
  );
}
