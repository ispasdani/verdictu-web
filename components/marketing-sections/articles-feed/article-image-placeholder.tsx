import { cn } from "@/lib/utils";
import type { Article } from "@/data/articles-data";

const GRADIENTS: Record<Article["label"], string> = {
  "Legal Tech": "from-blue-100 to-blue-50 dark:from-blue-950 dark:to-neutral-900",
  Compliance: "from-emerald-100 to-emerald-50 dark:from-emerald-950 dark:to-neutral-900",
  Product: "from-violet-100 to-violet-50 dark:from-violet-950 dark:to-neutral-900",
  Industry: "from-amber-100 to-amber-50 dark:from-amber-950 dark:to-neutral-900",
  Privacy: "from-rose-100 to-rose-50 dark:from-rose-950 dark:to-neutral-900",
};

const ICON_COLORS: Record<Article["label"], string> = {
  "Legal Tech": "text-blue-500/70",
  Compliance: "text-emerald-500/70",
  Product: "text-violet-500/70",
  Industry: "text-amber-500/70",
  Privacy: "text-rose-500/70",
};

type ArticleImagePlaceholderProps = {
  article: Article;
  className?: string;
  iconClassName?: string;
};

export const ArticleImagePlaceholder = ({
  article,
  className,
  iconClassName,
}: ArticleImagePlaceholderProps) => {
  const Icon = article.icon;

  return (
    <div
      className={cn(
        "flex flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-gradient-to-br",
        GRADIENTS[article.label],
        className,
      )}
    >
      <Icon
        className={cn("h-8 w-8", ICON_COLORS[article.label], iconClassName)}
        strokeWidth={1.5}
      />
    </div>
  );
};
