import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Text } from "@/components/shared-components/text";
import type { Article } from "@/data/articles-data";
import { ArticleImagePlaceholder } from "./article-image-placeholder";
import { ArticleMeta } from "./article-meta";

type ArticleListItemProps = {
  article: Article;
};

export const ArticleListItem = ({ article }: ArticleListItemProps) => {
  const href = `/articles/${article.slug}`;

  return (
    <article className="grid grid-cols-1 gap-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
      <Link href={href} className="block">
        <ArticleImagePlaceholder
          article={article}
          className="aspect-square w-full sm:h-40 sm:w-40"
        />
      </Link>

      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Text as="h3" size="xl" font="lora" weight="medium" className="block">
            <Link href={href} className="transition-colors duration-200 hover:text-muted-foreground">
              {article.title}
            </Link>
          </Text>
          <Text size="sm" color="muted" className="block line-clamp-2">
            {article.description}
          </Text>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ArticleMeta article={article} className="flex-1" />

          <Link
            href={href}
            className="group inline-flex flex-shrink-0 items-center gap-1.5 text-sm font-medium text-neutral-900 dark:text-neutral-100"
          >
            Read
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </article>
  );
};
