import { cn } from "@/lib/utils";
import React from "react";

type TextSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "9xl";

type TextFont = "sans" | "inter" | "lora" | "mono";

type TextWeight =
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";

type TextColor =
  | "default"
  | "muted"
  | "subtle"
  | "inverted"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "inherit";

const fontClasses: Record<TextFont, string> = {
  sans: "font-sans",
  inter: "font-sans",
  lora: "font-lora",
  mono: "font-mono",
};

const sizeClasses: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "9xl": "text-9xl",
};

const weightClasses: Record<TextWeight, string> = {
  thin: "font-thin",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const colorClasses: Record<TextColor, string> = {
  default: "text-neutral-900 dark:text-neutral-100",
  muted: "text-gray-600 dark:text-gray-300",
  subtle: "text-gray-400 dark:text-gray-500",
  inverted: "text-white dark:text-neutral-900",
  brand: "text-blue-600 dark:text-blue-400",
  success: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  danger: "text-red-600 dark:text-red-400",
  inherit: "text-inherit",
};

// Hover color: the color the text transitions to when parent is hovered
const hoverColorClasses: Record<TextColor, string> = {
  default: "group-hover:text-neutral-900 dark:group-hover:text-neutral-100",
  muted: "group-hover:text-gray-600 dark:group-hover:text-gray-300",
  subtle: "group-hover:text-gray-400 dark:group-hover:text-gray-500",
  inverted: "group-hover:text-white dark:group-hover:text-neutral-900",
  brand: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
  success: "group-hover:text-green-600 dark:group-hover:text-green-400",
  warning: "group-hover:text-yellow-600 dark:group-hover:text-yellow-400",
  danger: "group-hover:text-red-600 dark:group-hover:text-red-400",
  inherit: "group-hover:text-inherit",
};

export type TextProps<T extends React.ElementType = "span"> = {
  /** Required: controls font size */
  size: TextSize;
  /** Font family — defaults to "sans" */
  font?: TextFont;
  /** Text color preset */
  color?: TextColor;
  /** Font weight */
  weight?: TextWeight;
  /**
   * When true, the text reacts to a parent with the `group` class — i.e.
   * hovering the parent container changes this text's color to `hoverColor`.
   * The parent element must have the `group` Tailwind class applied.
   */
  hoverColor?: TextColor;
  /** Polymorphic tag — defaults to <span> */
  as?: T;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ComponentProps<T>, "children" | "className" | "as">;

export const Text = <T extends React.ElementType = "span">({
  size,
  font = "sans",
  color = "default",
  weight = "normal",
  hoverColor,
  as,
  children,
  className,
  ...props
}: TextProps<T>) => {
  const Component = (as ?? "span") as React.ElementType;

  return (
    <Component
      {...props}
      className={cn(
        sizeClasses[size],
        fontClasses[font],
        weightClasses[weight],
        colorClasses[color],
        "transition-colors duration-200",
        hoverColor && hoverColorClasses[hoverColor],
        className,
      )}
    >
      {children}
    </Component>
  );
};
