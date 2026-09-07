import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex items-center justify-center text-current transition-colors">
      <ShoppingCartIcon
        className={clsx(
          "transition-all ease-in-out hover:scale-110",
          className,
        )}
      />

      {quantity ? (
        <div className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-sm bg-(--color-campfire) text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
