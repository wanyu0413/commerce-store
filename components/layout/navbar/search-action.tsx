"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cuteFont } from "lib/fonts";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

const ACTION_CLASS = `${cuteFont.className} text-[24px] text-current transition-colors duration-300 ease-in-out group-hover:text-(--color-campfire) group-focus-within:text-(--color-campfire)`;

// Expands into a real input on hover/focus-within — pure CSS, no state.
export default function SearchAction() {
  const searchParams = useSearchParams();

  return (
    <Form action="/search" className="group flex items-center gap-2">
      <MagnifyingGlassIcon className={`h-5 w-5 shrink-0 ${ACTION_CLASS}`} />
      <div className="relative h-8 w-[50px] transition-[width] duration-300 ease-in-out group-hover:w-56 group-focus-within:w-56">
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 flex items-center whitespace-nowrap opacity-100 transition-opacity duration-200 ease-in-out group-hover:opacity-0 group-focus-within:opacity-0 ${ACTION_CLASS}`}
        >
          Search
        </span>
        <input
          key={searchParams?.get("q")}
          type="text"
          name="q"
          placeholder="Search for products..."
          autoComplete="off"
          defaultValue={searchParams?.get("q") || ""}
          className={`search-action-input pointer-events-none absolute inset-0 w-full border-0 border-b border-(--color-campfire) bg-transparent text-xl text-current opacity-0 outline-none placeholder:text-current/60 transition-opacity duration-200 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 ${cuteFont.className}`}
        />
      </div>
    </Form>
  );
}
