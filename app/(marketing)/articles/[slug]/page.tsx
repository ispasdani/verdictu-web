import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Text } from "@/components/shared-components/text";
import { getAllArticles, getArticleBySlug } from "@/data/articles-data";
import { formatArticleDate } from "@/data/articles-data";
import { ArticleImagePlaceholder } from "@/components/marketing-sections/articles-feed/article-image-placeholder";
import { ArticleSummaryCard } from "@/components/marketing-sections/articles-feed/article-summary-card";

type ArticlePageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageParams): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: `${article.title} | Verdictu`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageParams) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const relatedArticles = getAllArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="flex flex-col h-full max-w-[95rem] w-full mx-auto px-4 py-8 lg:py-12">
      <Link
        href="/articles"
        className="group mb-8 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
          strokeWidth={2}
        />
        All articles
      </Link>

      <article className="flex flex-col gap-10 lg:flex-row lg:gap-16 xl:gap-24">
        <aside className="flex flex-col gap-8 lg:w-1/4">
          <ArticleImagePlaceholder article={article} className="aspect-square w-full" iconClassName="h-12 w-12" />

          <div className="flex flex-col gap-4 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <Text size="sm" weight="semibold" className="block">
                Author
              </Text>
              <Text size="sm" color="muted" className="block text-right">
                {article.author.name}
              </Text>
            </div>
            <div className="flex items-center justify-between">
              <Text size="sm" weight="semibold" className="block">
                Date
              </Text>
              <Text size="sm" color="muted" className="block">
                <time dateTime={article.publishedAt}>
                  {formatArticleDate(article.publishedAt)}
                </time>
              </Text>
            </div>
            <div className="flex items-center justify-between">
              <Text size="sm" weight="semibold" className="block">
                Read
              </Text>
              <Text size="sm" color="muted" className="block">
                {article.readTime}
              </Text>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <span className="mb-4 inline-block w-fit rounded-full border border-border px-3 py-1">
            <Text size="xs" weight="medium" color="muted" className="block uppercase tracking-wide">
              {article.label}
            </Text>
          </span>

          <Text as="h1" size="4xl" font="lora" weight="medium" className="mb-6 block">
            {article.title}
          </Text>

          <Text size="lg" color="muted" className="mb-8 block">
            {article.description}
          </Text>

          <div className="flex flex-col gap-5">
            {article.content.map((paragraph, index) => (
              <Text key={index} as="p" size="md" className="block leading-relaxed">
                {paragraph}
              </Text>
            ))}
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <div className="mt-20 border-t border-border pt-12">
          <Text as="h2" size="2xl" font="lora" weight="medium" className="mb-8 block">
            More Articles
          </Text>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((relatedArticle) => (
              <ArticleSummaryCard key={relatedArticle.slug} article={relatedArticle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
