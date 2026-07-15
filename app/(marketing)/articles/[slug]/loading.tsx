import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleLoading() {
  return (
    <div className="flex flex-col h-full max-w-[95rem] w-full mx-auto px-4 py-8 lg:py-12">
      <Skeleton className="mb-8 h-5 w-24" />

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 xl:gap-24">
        <aside className="flex flex-col gap-8 lg:w-1/4">
          <Skeleton className="aspect-square w-full rounded-xl" />

          <div className="flex flex-col gap-4 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <Skeleton className="mb-4 h-6 w-24 rounded-full" />
          <Skeleton className="mb-6 h-12 w-3/4" />
          <Skeleton className="mb-8 h-6 w-full" />

          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-border pt-12">
        <Skeleton className="mb-8 h-8 w-48" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4 rounded-2xl border border-border p-5">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
              <div className="flex gap-4">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
