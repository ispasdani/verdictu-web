import { getAllArticles } from "@/data/articles-data";
import { ArticleListItem } from "./article-list-item";
import { ArticlesSidebar } from "./articles-sidebar";

export const ArticlesFeed = () => {
  const articles = getAllArticles();

  return (
    <div className="flex flex-col gap-10 py-8 lg:flex-row lg:gap-16 xl:gap-24 w-full">
      <div className="flex flex-col divide-y divide-border lg:w-3/4 [&>article]:py-8 [&>article:first-child]:pt-0">
        {articles.map((article) => (
          <ArticleListItem key={article.slug} article={article} />
        ))}
      </div>

      <div className="lg:w-1/4">
        <ArticlesSidebar articles={articles} />
      </div>
    </div>
  );
};
