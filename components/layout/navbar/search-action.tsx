"use client";

import { cuteFont } from "lib/fonts";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Drops a search field below the nav line instead of expanding inline, so
// the evenly spaced nav ticks never shift.
export default function SearchAction({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`${className ?? ""} ${open ? "text-(--color-campfire)" : ""}`}
      >
        Search
      </button>
      <Form
        action="/search"
        onSubmit={() => setOpen(false)}
        inert={!open}
        className={`absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 transition-[opacity,translate] duration-200 ease-in-out ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <input
          ref={inputRef}
          key={searchParams?.get("q")}
          type="text"
          name="q"
          placeholder="Search for products..."
          autoComplete="off"
          defaultValue={searchParams?.get("q") || ""}
          className={`search-action-input w-full border-0 border-b border-(--color-campfire) bg-transparent py-1 text-center text-xl tracking-wider text-(--color-campfire) outline-none placeholder:text-current/60 ${cuteFont.className}`}
        />
      </Form>
    </div>
  );
}
