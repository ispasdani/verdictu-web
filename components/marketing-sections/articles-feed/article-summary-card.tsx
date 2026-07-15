import Link from "next/link";
import { Text } from "@/components/shared-components/text";
import type { Article } from "@/data/articles-data";
import { formatArticleDate } from "@/data/articles-data";
import { ArticleImagePlaceholder } from "./article-image-placeholder";

type ArticleSummaryCardProps = {
  article: Article;
};

export const ArticleSummaryCard = ({ article }: ArticleSummaryCardProps) => {
  const href = `/articles/${article.slug}`;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
      <Link href={href}>
        <ArticleImagePlaceholder article={article} className="aspect-video w-full" iconClassName="h-10 w-10" />
      </Link>

      <div className="flex flex-col gap-2">
        <Text as="h3" size="md" font="lora" weight="medium" className="block line-clamp-2">
          <Link href={href} className="transition-colors duration-200 hover:text-muted-foreground">
            {article.title}
          </Link>
        </Text>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Text size="xs" color="muted" className="block">
            {formatArticleDate(article.publishedAt)}
          </Text>
          <Text size="xs" color="muted" className="block">
            {article.readTime}
          </Text>
        </div>
      </div>
    </article>
  );
};
