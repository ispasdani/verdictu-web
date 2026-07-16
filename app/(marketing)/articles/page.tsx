import type { Metadata } from "next";
import Link from "next/link";
import { Text } from "@/components/shared-components/text";
import { getAllArticles } from "@/data/articles-data";
import { ArticleListItem } from "@/components/marketing-sections/articles-feed/article-list-item";
import { ArticlesSidebar } from "@/components/marketing-sections/articles-feed/articles-sidebar";

export const metadata: Metadata = {
  title: "Articles | Verdictu",
  description:
    "Insights on legal AI, privacy, and how Verdictu is built — from the team building it.",
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ label?: string }>;
}) {
  const { label } = await searchParams;
  const allArticles = getAllArticles();
  const articles = label
    ? allArticles.filter((article) => article.label === label)
    : allArticles;

  return (
    <div className="flex flex-col h-full w-full mx-auto py-8 lg:py-12">
      <div className="mb-8 flex flex-col gap-2 border-b border-border pb-8">
        <Text as="h1" size="4xl" font="lora" weight="medium" className="block">
          Articles
        </Text>
        <Text size="md" color="muted" className="block">
          Insights on legal AI, privacy, and how Verdictu is built.
        </Text>

        {label && (
          <div className="mt-2 flex items-center gap-2">
            <Text size="sm" color="muted" className="block">
              Filtered by{" "}
              <span className="font-medium text-foreground">{label}</span>
            </Text>
            <Link
              href="/articles"
              className="text-sm font-medium underline underline-offset-4 transition-colors duration-200 hover:text-muted-foreground"
            >
              Clear
            </Link>
          </div>
        )}
      </div>

      {articles.length > 0 ? (
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 xl:gap-24">
          <div className="flex flex-col divide-y divide-border lg:w-3/4 [&>article]:py-8 [&>article:first-child]:pt-0">
            {articles.map((article) => (
              <ArticleListItem key={article.slug} article={article} />
            ))}
          </div>

          <div className="lg:w-1/4">
            <ArticlesSidebar articles={allArticles} />
          </div>
        </div>
      ) : (
        <Text size="sm" color="muted" className="block">
          No articles found for this topic.
        </Text>
      )}
    </div>
  );
}
