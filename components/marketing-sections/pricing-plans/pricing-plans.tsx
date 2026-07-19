import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared-components/container";
import { Text } from "@/components/shared-components/text";
import {
  PLAN_INCLUDED_FEATURES,
  PRICING_PLANS,
} from "@/data/pricing-data";

export const PricingPlans = () => {
  return (
    <Container as="section" className="mx-auto w-full my-15">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <article
            key={plan.id}
            className={cn(
              "flex flex-col justify-between gap-8 rounded-2xl border p-6 md:p-8",
              plan.highlighted
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                : "border-border bg-card",
            )}
          >
            <div className="flex flex-col gap-6">
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
                      "shrink-0 rounded-full border px-3 py-1 text-xs font-semibold tracking-widest uppercase",
                      plan.highlighted
                        ? "border-white/40"
                        : "border-border",
                    )}
                  >
                    {plan.badge}
                  </span>
                )}
              </div>

              <div>
                <Text
                  as="p"
                  size="4xl"
                  font="lora"
                  weight="medium"
                  color="inherit"
                  className="block"
                >
                  {plan.price}
                </Text>
                <Text
                  size="sm"
                  color={plan.highlighted ? "inherit" : "muted"}
                  className={cn("block mt-1", plan.highlighted && "opacity-70")}
                >
                  {plan.period}
                </Text>
                <Text
                  size="sm"
                  weight="medium"
                  color="inherit"
                  className="block mt-3"
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

              {plan.extras && (
                <ul
                  className={cn(
                    "flex flex-col gap-2 pt-6 border-t",
                    plan.highlighted ? "border-white/20" : "border-border",
                  )}
                >
                  {plan.extras.map((extra) => (
                    <li key={extra} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0"
                        strokeWidth={2.5}
                      />
                      <Text size="sm" color="inherit">
                        {extra}
                      </Text>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              href={plan.href}
              className={cn(
                "block rounded-md border px-6 py-3 text-center text-sm font-semibold tracking-widest uppercase transition-colors duration-200",
                plan.highlighted
                  ? "border-white/40 hover:bg-white/10"
                  : "border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900",
              )}
            >
              {plan.cta}
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
        <Text
          as="p"
          size="sm"
          weight="semibold"
          className="block uppercase tracking-widest mb-4"
        >
          Every plan includes
        </Text>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {PLAN_INCLUDED_FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground"
                strokeWidth={2.5}
              />
              <Text size="sm" color="muted">
                {feature}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};
