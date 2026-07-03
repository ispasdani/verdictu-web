import { PlayCircle, X } from "lucide-react";
import { Text } from "@/components/shared-components/text";
import type { Feature } from "@/data/features-data";

type FeatureExpandedPanelProps = {
  feature: Feature;
  onClose: () => void;
};

export const FeatureExpandedPanel = ({
  feature,
  onClose,
}: FeatureExpandedPanelProps) => {
  const Icon = feature.icon;

  return (
    <div className="rounded-2xl border border-neutral-900 bg-card p-6 dark:border-white sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-muted">
            <Icon
              className="h-4 w-4 text-muted-foreground"
              strokeWidth={1.75}
            />
          </span>
          <Text
            as="h3"
            size="lg"
            weight="semibold"
            className="block"
            font="lora"
          >
            {feature.title}
          </Text>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Collapse feature details"
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <Text size="sm" color="muted" className="mt-4 block">
        {feature.fullDescription}
      </Text>

      <div className="mt-6 flex aspect-video w-full  items-center justify-center rounded-xl border border-dashed border-border bg-muted/50">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <PlayCircle className="h-8 w-8" strokeWidth={1.5} />
          <Text size="xs" color="muted">
            Video coming soon
          </Text>
        </div>
      </div>
    </div>
  );
};
