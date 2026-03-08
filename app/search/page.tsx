import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 mb-10 border-y border-primary/10 py-6">
        <span className="text-sm font-bold uppercase tracking-widest text-slate-400 mr-2">Filter By:</span>
        <button className="filter-btn group">
          <span className="text-sm font-semibold">Size</span>
          <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-primary">expand_more</span>
        </button>
        <button className="filter-btn group">
          <span className="text-sm font-semibold">Color</span>
          <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-primary">expand_more</span>
        </button>
        <button className="filter-btn group">
          <span className="text-sm font-semibold">Material</span>
          <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-primary">expand_more</span>
        </button>
        <button className="filter-btn group">
          <span className="text-sm font-semibold">Price Range</span>
          <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-primary">expand_more</span>
        </button>
        <div className="ml-auto hidden lg:flex items-center gap-2 text-slate-400">
          <span className="text-xs font-bold uppercase tracking-tighter">Sort:</span>
          <select className="bg-transparent border-none text-sm font-semibold focus:ring-0 text-slate-900 dark:text-slate-100 py-0 cursor-pointer">
            <option>Featured</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {searchValue ? (
        <p className="mb-8 text-slate-500 font-medium">
          {products.length === 0
            ? "There are no products that match "
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold text-slate-900 dark:text-slate-100">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-30 gap-x-10">
          <ProductGridItems products={products} />
        </div>
      ) : null}
    </>
  );
}
