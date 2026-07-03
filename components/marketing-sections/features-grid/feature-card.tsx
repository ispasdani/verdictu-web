import { cn } from "@/lib/utils";
import { Text } from "@/components/shared-components/text";
import type { Feature } from "@/data/features-data";

type FeatureCardProps = {
  feature: Feature;
  isSelected: boolean;
  onClick: () => void;
};

export const FeatureCard = ({
  feature,
  isSelected,
  onClick,
}: FeatureCardProps) => {
  const Icon = feature.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isSelected}
      className={cn(
        "group flex flex-col justify-between gap-6 rounded-2xl border bg-card p-5 text-left transition-colors duration-200",
        isSelected
          ? "border-neutral-900 dark:border-white"
          : "border-border hover:border-neutral-400 dark:hover:border-neutral-600",
      )}
    >
      <div className="flex flex-col gap-1.5">
        <Text as="h3" size="sm" weight="semibold" className="block" font="lora">
          {feature.title}
        </Text>
        <Text size="xs" color="muted" className="line-clamp-2 block">
          {feature.shortDescription}
        </Text>
      </div>

      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
      </span>
    </button>
  );
};
