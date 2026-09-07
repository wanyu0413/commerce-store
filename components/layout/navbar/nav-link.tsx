import Link from "next/link";
import { ReactNode } from "react";
import PawTrail from "./paw-trail";

export default function NavLink({
  href,
  className,
  showTrail = true,
  children,
}: {
  href: string;
  className?: string;
  showTrail?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      prefetch={true}
      className={`group relative ${className ?? ""}`}
    >
      {children}
      {showTrail && <PawTrail />}
    </Link>
  );
}
