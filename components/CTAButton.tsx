import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function CTAButton({
  href,
  children,
  variant = "primary"
}: CTAButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-cocoa text-cream hover:bg-coffee"
      : "border border-cocoa/25 bg-cream/70 text-cocoa hover:bg-white";

  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </a>
  );
}
