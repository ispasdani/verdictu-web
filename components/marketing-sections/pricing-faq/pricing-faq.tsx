"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared-components/container";
import { Subheading } from "@/components/shared-components/subheading";
import { Text } from "@/components/shared-components/text";
import { PRICING_FAQS, type PricingFaqItem } from "@/data/pricing-data";

const FaqItem = ({ question, answer }: PricingFaqItem) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <Text as="span" size="sm" weight="semibold" className="block">
          {question}
        </Text>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <Text size="sm" color="muted" className="block pb-6 leading-relaxed max-w-2xl">
          {answer}
        </Text>
      )}
    </div>
  );
};

export const PricingFaq = () => {
  return (
    <Container as="section" className="mx-auto w-full my-15">
      <Subheading className="mb-4">Frequently asked questions</Subheading>
      <div className="border-t border-border">
        {PRICING_FAQS.map((faq) => (
          <FaqItem key={faq.question} {...faq} />
        ))}
      </div>
    </Container>
  );
};
