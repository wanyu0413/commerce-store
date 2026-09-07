import LogoSquare from "components/logo-square";
import { cuteFont } from "lib/fonts";
import Link from "next/link";

// Part of the "expanded" nav state. On desktop that only ever appears on
// the homepage (before the Hero scrolls past), but below md it's always
// shown regardless of route — so its color isn't hardcoded here; it
// inherits (text-current) from NavAnimator's wrapper, which is the one that
// actually knows the route. Menu links/Search/Cart live in NavActions,
// aligned separately on the right — this is just the logo/wordmark.
export default function NavBrand({ siteName }: { siteName?: string }) {
  return (
    <Link
      href="/"
      prefetch={true}
      className="mr-2 flex w-full items-center justify-center text-current md:w-auto md:mr-6"
    >
      <LogoSquare />
      <div
        className={`${cuteFont.className} flex-none text-3xl font-medium uppercase md:hidden lg:block`}
      >
        {siteName}
      </div>
    </Link>
  );
}
