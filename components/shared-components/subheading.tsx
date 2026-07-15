import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Text } from "@/components/shared-components/text";

type SubheadingProps = {
  children: React.ReactNode;
  url?: string;
  linkText?: string;
  className?: string;
};

export const Subheading = ({
  children,
  url,
  linkText,
  className,
}: SubheadingProps) => {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
      <Text
        as="h2"
        size="3xl"
        font="lora"
        weight="medium"
        className={cn("block", className)}
      >
        {children}
      </Text>

      {url && linkText && (
        <Link
          href={url}
          className="group inline-flex flex-shrink-0 items-center gap-1 text-sm font-medium text-neutral-900 transition-colors duration-200 dark:text-neutral-100"
        >
          {linkText}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </Link>
      )}
    </div>
  );
};
