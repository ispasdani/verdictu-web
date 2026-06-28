import { cn } from "@/lib/utils";
import React from "react";
type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "link" | "icon-circle";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Override the background color for the primary variant (any Tailwind bg-* class) */
  bgColor?: string;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: "button";
    href?: never;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: "a";
    href?: string;
  };

type ButtonAsOther = ButtonBaseProps & {
  as: React.ElementType;
  href?: string;
  [key: string]: unknown;
};

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsOther;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-6 text-sm sm:text-base",
  lg: "h-11 px-8 text-base sm:text-lg",
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  bgColor,
  className,
  as,
  ...props
}: ButtonProps) => {
  const Component = (as ?? "button") as React.ElementType;

  if (variant === "icon-circle") {
    return (
      <Component
        aria-label={props["aria-label"] ?? "Submit"}
        {...props}
        className={cn(
          "group inline-flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-black transition-colors duration-200 hover:bg-neutral-800",
          className,
        )}
      >
        <span className="transition-transform duration-200 group-hover:rotate-90">
          {children ?? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          )}
        </span>
      </Component>
    );
  }

  if (variant === "link") {
    return (
      <Component
        {...props}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden text-sm font-medium text-neutral-900 transition-colors duration-200 dark:text-neutral-100",
          "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full",
          className,
        )}
      >
        {children}
      </Component>
    );
  }

  const isPrimary = variant === "primary";

  return (
    <Component
      {...props}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-lg font-medium transition-all duration-200",
        sizeClasses[size],
        isPrimary
          ? cn("text-white", bgColor ?? "bg-neutral-900")
          : "border border-neutral-900 bg-white text-neutral-900 dark:border-white dark:bg-neutral-950 dark:text-white",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {/* Left-to-right overlay sweep */}
      <div
        className={cn(
          "absolute inset-0 h-full w-0 transition-[width] duration-300 group-hover:w-full",
          isPrimary ? "bg-white/20" : "bg-neutral-900/10 dark:bg-white/10",
        )}
      />
    </Component>
  );
};
