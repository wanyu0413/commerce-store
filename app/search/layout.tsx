import Footer from "components/layout/footer";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-8">
        <nav className="flex items-center gap-2 mb-8 text-sm font-medium">
          <a className="text-slate-400 hover:text-primary transition-colors" href="/">Home</a>
          <span className="material-symbols-outlined text-xs text-slate-300">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100">Catalog</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-tight tracking-tight mb-4">The Gentle Fit Collection</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">Premium dachshund harnesses meticulously designed for the unique proportions of your long-bodied friend. Comfort meets high-end studio style.</p>
        </div>

        <Suspense fallback={null}>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
