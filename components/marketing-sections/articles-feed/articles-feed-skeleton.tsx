import { Skeleton } from "@/components/ui/skeleton";

const ArticleListItemSkeleton = () => (
  <article className="grid grid-cols-1 gap-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
    <Skeleton className="aspect-square w-full rounded-xl sm:h-40 sm:w-40" />

    <div className="flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  </article>
);

export const ArticlesFeedSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 py-8 lg:flex-row lg:gap-16 xl:gap-24">
      <div className="flex flex-col divide-y divide-border lg:w-3/4 [&>article]:py-8 [&>article:first-child]:pt-0">
        {Array.from({ length: 4 }).map((_, index) => (
          <ArticleListItemSkeleton key={index} />
        ))}
      </div>

      <div className="flex flex-col gap-10 lg:w-1/4">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-3 w-28" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="grid grid-cols-[1.5rem_1fr] gap-3">
              <Skeleton className="h-4 w-6" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <Skeleton className="h-3 w-24" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-7 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
