import { cn } from "@/lib/utils";
import { Text } from "@/components/shared-components/text";
import type { Article } from "@/data/articles-data";
import { formatArticleDate } from "@/data/articles-data";

type ArticleMetaProps = {
  article: Article;
  className?: string;
  showLabel?: boolean;
};

export const ArticleMeta = ({
  article,
  className,
  showLabel = true,
}: ArticleMetaProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
        <span className="flex items-center gap-1.5">
          <Text size="xs" weight="semibold" className="block">
            {article.author.name}
          </Text>
        </span>
        <span className="flex items-center gap-1.5">
          <Text size="xs" color="muted" className="block">
            <time dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt)}
            </time>
          </Text>
        </span>
        <span className="flex items-center gap-1.5">
          <Text size="xs" color="muted" className="block">
            {article.readTime}
          </Text>
        </span>
      </div>

      {showLabel && (
        <span className="w-fit rounded-full border border-border px-3 py-1">
          <Text size="xs" weight="medium" color="muted" className="block uppercase tracking-wide">
            {article.label}
          </Text>
        </span>
      )}
    </div>
  );
};
