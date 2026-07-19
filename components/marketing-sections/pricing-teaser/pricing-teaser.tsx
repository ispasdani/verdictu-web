import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared-components/container";
import { Subheading } from "@/components/shared-components/subheading";
import { Text } from "@/components/shared-components/text";
import { PRICING_PLANS } from "@/data/pricing-data";

export const PricingTeaser = () => {
  return (
    <Container as="section" className="mx-auto w-full my-15">
      <Subheading url="/pricing" linkText="See full pricing" className="mb-8">
        Pricing
      </Subheading>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PRICING_PLANS.map((plan) => (
          <Link
            key={plan.id}
            href="/pricing"
            className={cn(
              "group flex flex-col gap-6 rounded-2xl border p-6 transition-colors duration-200",
              plan.highlighted
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                : "border-border bg-card hover:border-neutral-400 dark:hover:border-neutral-600",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <Text
                as="h3"
                size="sm"
                weight="semibold"
                color="inherit"
                className="block uppercase tracking-widest"
              >
                {plan.label}
              </Text>
              {plan.badge && (
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-2.5 py-0.5 text-[0.625rem] font-semibold tracking-widest uppercase",
                    plan.highlighted ? "border-white/40" : "border-border",
                  )}
                >
                  {plan.badge}
                </span>
              )}
            </div>

            <div>
              <Text
                as="p"
                size="3xl"
                font="lora"
                weight="medium"
                color="inherit"
                className="block"
              >
                {plan.price}
              </Text>
              <Text
                size="sm"
                weight="medium"
                color="inherit"
                className="block mt-1"
              >
                {plan.credits}
              </Text>
            </div>

            <Text
              size="sm"
              color={plan.highlighted ? "inherit" : "muted"}
              className={cn("block", plan.highlighted && "opacity-80")}
            >
              {plan.description}
            </Text>
          </Link>
        ))}
      </div>
    </Container>
  );
};
