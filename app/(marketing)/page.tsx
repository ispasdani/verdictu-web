import Herobox from "@/components/marketing-sections/hero/hero";
import { FeaturesGrid } from "@/components/marketing-sections/features-grid/features-grid";
import { Subheading } from "@/components/shared-components/subheading";
import { ArticlesFeed } from "@/components/marketing-sections/articles-feed/articles-feed";

export default function HomePage() {
  return (
    <div>
      <Herobox />
      <FeaturesGrid />

      <div className="flex flex-col h-full max-w-[95rem] w-full mx-auto px-4 lg:pt-0 sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
        <Subheading
          className="text-subheading"
          url="/articles"
          linkText="All articles"
        >
          Articles
        </Subheading>
        <ArticlesFeed />
      </div>
    </div>
  );
}
