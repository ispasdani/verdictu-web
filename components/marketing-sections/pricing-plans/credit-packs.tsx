import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared-components/container";
import { Subheading } from "@/components/shared-components/subheading";
import { Text } from "@/components/shared-components/text";
import { CREDIT_PACKS } from "@/data/pricing-data";

export const CreditPacks = () => {
  return (
    <Container as="section" className="mx-auto w-full my-15">
      <Subheading className="mb-4">Need more credits?</Subheading>
      <Text size="sm" color="muted" className="block mb-8 max-w-xl">
        Buy a credit pack any time — no subscription required. Credits are
        valid for 12 months and stack on top of your plan&apos;s monthly
        allowance.
      </Text>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CREDIT_PACKS.map((pack) => (
          <div
            key={pack.id}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <Text
                size="sm"
                weight="semibold"
                className="block uppercase tracking-widest"
              >
                {pack.label}
              </Text>
              {pack.badge && (
                <span
                  className={cn(
                    "shrink-0 rounded-full border border-border px-2 py-0.5 text-[0.625rem] font-semibold tracking-widest uppercase text-muted-foreground",
                  )}
                >
                  {pack.badge}
                </span>
              )}
            </div>

            <div>
              <Text as="p" size="2xl" font="lora" weight="medium" className="block">
                {pack.price}
              </Text>
              <Text size="sm" color="muted" className="block mt-1">
                {pack.credits}
              </Text>
            </div>

            <Link
              href={`/credits?pack=${pack.id}`}
              className="mt-auto block rounded-md border border-neutral-900 px-4 py-2 text-center text-xs font-semibold tracking-widest uppercase transition-colors duration-200 hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900"
            >
              Buy
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};
