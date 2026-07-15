import Link from "next/link";
import { Text } from "@/components/shared-components/text";
import type { Article } from "@/data/articles-data";
import { formatArticleDate } from "@/data/articles-data";

type ArticlesSidebarProps = {
  articles: Article[];
  excludeSlug?: string;
};

export const ArticlesSidebar = ({
  articles,
  excludeSlug,
}: ArticlesSidebarProps) => {
  const latest = articles
    .filter((article) => article.slug !== excludeSlug)
    .slice(0, 3);

  const labels = Array.from(new Set(articles.map((article) => article.label)));

  return (
    <aside className="flex flex-col gap-10">
      <div>
        <Text
          as="h3"
          size="xs"
          weight="semibold"
          className="mb-5 block uppercase tracking-wide"
          color="muted"
        >
          Latest Articles
        </Text>

        <div className="flex flex-col gap-5">
          {latest.map((article, index) => (
            <div key={article.slug} className="grid grid-cols-[1.5rem_1fr] gap-3">
              <Text size="sm" weight="semibold" color="subtle" className="block">
                {String(index + 1).padStart(2, "0")}
              </Text>
              <div className="flex flex-col gap-1">
                <Text as="h4" size="sm" weight="medium" className="block">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="transition-colors duration-200 hover:text-muted-foreground"
                  >
                    {article.title}
                  </Link>
                </Text>
                <Text size="xs" color="muted" className="block">
                  {formatArticleDate(article.publishedAt)}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Text
          as="h3"
          size="xs"
          weight="semibold"
          className="mb-5 block uppercase tracking-wide"
          color="muted"
        >
          Browse by Topic
        </Text>

        <div className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <Link
              key={label}
              href={`/articles?label=${encodeURIComponent(label)}`}
              className="rounded-full border border-border px-3 py-1.5 transition-colors duration-200 hover:border-neutral-400 dark:hover:border-neutral-600"
            >
              <Text size="xs" weight="medium" className="block">
                {label}
              </Text>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};
