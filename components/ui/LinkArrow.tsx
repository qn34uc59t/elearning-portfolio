import styles from "./LinkArrow.module.css";

type LinkArrowProps = {
  direction?: "forward" | "back";
  size?: "default" | "large";
  className?: string;
};

export default function LinkArrow({
  direction = "forward",
  size = "default",
  className,
}: LinkArrowProps) {
  return (
    <span
      className={[
        styles.icon,
        direction === "back" ? styles.back : "",
        size === "large" ? styles.large : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      arrow_outward
    </span>
  );
}
