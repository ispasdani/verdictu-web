import { Skeleton } from "@/components/ui/skeleton";
import { ArticlesFeedSkeleton } from "@/components/marketing-sections/articles-feed/articles-feed-skeleton";

export default function ArticlesLoading() {
  return (
    <div className="flex flex-col h-full max-w-[95rem] w-full mx-auto px-4 py-8 lg:py-12">
      <div className="mb-8 flex flex-col gap-2 border-b border-border pb-8">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-5 w-80" />
      </div>

      <ArticlesFeedSkeleton />
    </div>
  );
}
