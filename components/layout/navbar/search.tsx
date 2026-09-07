"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cuteFont } from "lib/fonts";
import Form from "next/form";
import { useSearchParams } from "next/navigation";


export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form
      action="/search"
      className="w-max-[550px] relative w-full md:w-80 xl:w-full"
    >
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className={`${cuteFont.className} text-xl w-full border border-(--color-midnight-ocean)/40 rounded-[10px] bg-white/10 px-4 py-2 text-(--color-midnight-ocean) placeholder:text-(--color-midnight-ocean)/60 backdrop-blur-sm md:text-md`}
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center text-(--color-midnight-ocean)">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full md:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className={`${cuteFont.className} w-full border border-(--color-midnight-ocean)/40 rounded-[10px] bg-white/10 px-4 py-2 text-xl text-(--color-midnight-ocean) placeholder:text-(--color-midnight-ocean)/60 backdrop-blur-sm`}
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center text-(--color-midnight-ocean)">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
