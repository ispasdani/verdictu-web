import type { Metadata } from "next";
import { Text } from "@/components/shared-components/text";
import { PricingPlans } from "@/components/marketing-sections/pricing-plans/pricing-plans";
import { CreditUsage } from "@/components/marketing-sections/pricing-plans/credit-usage";
import { CreditPacks } from "@/components/marketing-sections/pricing-plans/credit-packs";
import { PricingFaq } from "@/components/marketing-sections/pricing-faq/pricing-faq";

export const metadata: Metadata = {
  title: "Pricing | Verdictu",
  description:
    "Simple, credit-based pricing for individuals, professionals, and teams.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col h-full w-full mx-auto py-8 lg:py-12">
      <div className="mb-8 flex flex-col gap-2 border-b border-border pb-8">
        <Text as="h1" size="4xl" font="lora" weight="medium" className="block">
          Pricing
        </Text>
        <Text size="md" color="muted" className="block max-w-xl">
          Every plan runs on credits: pick a monthly allowance that fits how
          you work, and top up with a credit pack whenever you need more. No
          hidden fees, cancel any time.
        </Text>
      </div>

      <PricingPlans />
      <CreditUsage />
      <CreditPacks />
      <PricingFaq />
    </div>
  );
}
