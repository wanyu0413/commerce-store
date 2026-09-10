"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Headless UI's Dialog locks body/html scroll while open by default (and
  // reapplies it across its own render cycles); this drawer isn't a blocking
  // modal, so keep undoing it via observer for as long as it's open.
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const reset = () => {
      if (html.style.overflow) html.style.overflow = "";
      if (html.style.paddingRight) html.style.paddingRight = "";
    };
    reset();
    const observer = new MutationObserver(reset);
    observer.observe(html, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="flex items-center justify-center text-current transition-colors duration-300 ease-in-out hover:text-(--color-campfire)"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-transform ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="neumorphic-surface mobile-menu-panel fixed bottom-0 right-0 top-0 flex w-full max-w-xs flex-col p-6 text-(--color-neutral-gray-blue)">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="neumorphic-surface rail-icon-chip mb-6 self-end"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              {menu.length ? (
                <ul className="flex flex-col gap-4">
                  {menu.map((item: Menu) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        prefetch={true}
                        onClick={() => setIsOpen(false)}
                        className="text-xl transition-colors duration-300 ease-in-out hover:text-(--color-campfire)"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
