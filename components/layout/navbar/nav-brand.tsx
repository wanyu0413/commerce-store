import LogoSquare from "components/logo-square";
import Link from "next/link";

// Logo mark only, centered via index.tsx's grid — wordmark moved to Hero.
export default function NavBrand() {
  return (
    <Link
      href="/"
      prefetch={true}
      aria-label="Home"
      className="flex items-center justify-self-center text-current"
    >
      <LogoSquare />
    </Link>
  );
}
