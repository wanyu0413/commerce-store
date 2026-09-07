import Link from "next/link";
import { ReactNode } from "react";
import PawTrail from "./paw-trail";

export default function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      prefetch={true}
      className={`group relative ${className ?? ""}`}
    >
      {children}
      <PawTrail />
    </Link>
  );
}
