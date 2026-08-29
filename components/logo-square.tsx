import clsx from "clsx";

export default function LogoSquare({
  size,
  className,
}: {
  size?: "sm" | undefined;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center",
        className
      )}
    >
      <div
        className={clsx(
          "bg-current transition-colors duration-300",
          {
            "h-[50px] w-[50px]": !size,
            "h-[40px] w-[40px]": size === "sm",
          }
        )}
        style={{
          maskImage: "url(/logo.svg)",
          WebkitMaskImage: "url(/logo.svg)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
    </div>
  );
}
