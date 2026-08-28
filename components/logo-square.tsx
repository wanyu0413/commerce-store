import clsx from "clsx";
import LogoIcon from "./icons/logo";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center"
      )}
    >
      <LogoIcon
        className={clsx({
          "h-[50px] w-[50px] ": !size,
          "h-[40px] w-[40px] ": size === "sm",
        })}
      />
    </div>
  );
}
