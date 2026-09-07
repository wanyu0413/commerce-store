import {
  ClipboardDocumentListIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

// Best-effort icon per menu item title — this project's CMS menu items
// (All Collections, Your Orders) aren't tagged with an icon of their own,
// so we match on keywords in the title instead. Shared by NavActions (the
// horizontal bar) and NavRail (the compact vertical rail) so both pick the
// same icon for the same item.
export function iconForMenuItem(title: string) {
  const t = title.toLowerCase();
  if (t.includes("order")) return ClipboardDocumentListIcon;
  return Squares2X2Icon;
}
