export type PricingPlan = {
  id: string;
  label: string;
  badge?: string;
  price: string;
  period: string;
  credits: string;
  description: string;
  extras?: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
  oneTime?: boolean;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "trial",
    label: "Trial",
    price: "€2",
    period: "one-time, no subscription",
    credits: "10 credits",
    description:
      "For a single simple action — try Verdictu once before committing to anything.",
    cta: "Try it once",
    href: "/credits?pack=trial",
    oneTime: true,
  },
  {
    id: "starter",
    label: "Starter",
    price: "€9",
    period: "per month",
    credits: "100 credits / month",
    description:
      "For individuals who need occasional legal clarity without the complexity.",
    cta: "Get started",
    href: "/signup?plan=starter",
  },
  {
    id: "pro",
    label: "Pro",
    badge: "Most popular",
    price: "€29",
    period: "per month",
    credits: "400 credits / month",
    description: "For professionals who rely on legal intelligence every day.",
    cta: "Get started",
    href: "/signup?plan=pro",
    highlighted: true,
  },
  {
    id: "business",
    label: "Business",
    price: "€89",
    period: "per month",
    credits: "1,500 credits / month",
    description:
      "For legal teams and organisations that need scalable, integrated access.",
    extras: [
      "Team accounts & roles",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    cta: "Get started",
    href: "/signup?plan=business",
  },
];

export type CreditAction = {
  id: string;
  label: string;
  credits: number;
};

export const CREDIT_ACTIONS: CreditAction[] = [
  { id: "query", label: "Simple AI query", credits: 1 },
  { id: "compare", label: "Compare Mode", credits: 3 },
  { id: "pdf", label: "PDF document analysis", credits: 5 },
  { id: "draft", label: "Draft Mode (document generation)", credits: 8 },
  { id: "workflow", label: "Smart Workflow run", credits: 10 },
];

export type CreditPack = {
  id: string;
  label: string;
  price: string;
  credits: string;
  badge?: string;
};

export const CREDIT_PACKS: CreditPack[] = [
  { id: "small", label: "Small", price: "€9", credits: "50 credits" },
  {
    id: "medium",
    label: "Medium",
    price: "€25",
    credits: "150 credits",
    badge: "Best value",
  },
  { id: "large", label: "Large", price: "€80", credits: "600 credits" },
];

export const PLAN_INCLUDED_FEATURES = [
  "All jurisdictions",
  "Source citations on every answer",
  "PDF document analysis",
  "Compare Mode",
  "Draft Mode templates",
  "Smart Workflows",
];

export type PricingFaqItem = {
  question: string;
  answer: string;
};

export const PRICING_FAQS: PricingFaqItem[] = [
  {
    question: "How do credits work?",
    answer:
      "Every plan includes a monthly credit allowance. Credits are spent as you use the product — a simple query costs 1 credit, while heavier actions like PDF analysis or drafting a document cost more, based on how much work they take. Unused credits from your plan don't roll over to the next month.",
  },
  {
    question: "What's the difference between plan credits and credit packs?",
    answer:
      "Plan credits refresh every month as part of your subscription. Credit packs are one-off, pay-as-you-go top-ups you can buy any time — with or without a subscription — for when you need more credits before your next billing cycle, or want to try Verdictu without committing to a plan.",
  },
  {
    question: "Do credit pack purchases expire?",
    answer:
      "Credits bought in a pack are valid for 12 months from purchase and can be used alongside or instead of a subscription plan.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "You can keep going by buying a credit pack at any time, or upgrade your plan for a larger monthly allowance. We'll notify you before you run out so you're never caught mid-task.",
  },
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes. You can upgrade or downgrade your plan at any time from your account settings. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "Is there a low-commitment way to try Verdictu?",
    answer:
      "Yes — the Trial plan gives you a small number of credits for a couple of euros, no subscription required, so you can try a real query or a short document analysis before committing to a bigger plan.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, Amex) as well as SEPA direct debit for European customers. Enterprise invoicing is available for Business plan customers.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Yes. All queries and documents are encrypted in transit and at rest. We do not use your data to train models. Business plan customers can request a dedicated data processing agreement (DPA).",
  },
];
