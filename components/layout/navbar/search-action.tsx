"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cuteFont } from "lib/fonts";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

// Matches the font/color/hover treatment shared by the other nav-row items
// (All Collections, Your Orders, the Cart trigger) — see NavLink/CartModal.
const ACTION_CLASS = `${cuteFont.className} text-[24px] text-current transition-colors duration-300 ease-in-out group-hover:text-(--color-campfire) group-focus-within:text-(--color-campfire)`;

// Sits in the nav row as a plain "Search" icon+text label at rest (matching
// Your Orders). Hovering — or focusing, e.g. via keyboard tab — smoothly
// widens the text section into the real input in place, so typing a query
// still works without navigating away; both states are pure CSS
// (group-hover/group-focus-within), so the width/opacity change animates
// continuously instead of hard-swapping between two elements. Only ever an
// underline, even while focused — see .search-action-input in globals.css,
// which overrides the shared global focus ring for this one input.
export default function SearchAction() {
  const searchParams = useSearchParams();

  return (
    <Form action="/search" className="group flex items-center gap-2">
      <MagnifyingGlassIcon className={`h-5 w-5 shrink-0 ${ACTION_CLASS}`} />
      <div className="relative h-8 w-20 transition-[width] duration-300 ease-in-out group-hover:w-56 group-focus-within:w-56">
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
          className={`search-action-input pointer-events-none absolute inset-0 w-full border-0 border-b border-current/40 bg-transparent text-xl text-current opacity-0 outline-none placeholder:text-current/60 transition-opacity duration-200 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 ${cuteFont.className}`}
        />
      </div>
    </Form>
  );
}
