import { cn } from "@/lib/utils";

type GradientBackground4Props = {
  className?: string;
  position?: "top" | "bottom";
};

const GRADIENTS = {
  top: "[background:radial-gradient(125%_125%_at_50%_-50%,#c7d2fe_40%,transparent_100%)]",
  bottom:
    "[background:radial-gradient(125%_125%_at_50%_150%,#c7d2fe_40%,transparent_100%)]",
} as const;

export function GradientBackground4({
  className,
  position = "bottom",
}: GradientBackground4Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full bg-white",
        GRADIENTS[position],
        className
      )}
    />
  );
}
