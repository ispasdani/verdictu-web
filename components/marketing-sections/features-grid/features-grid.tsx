"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/shared-components/container";
import { Text } from "@/components/shared-components/text";
import { FEATURES } from "@/data/features-data";
import { FeatureCard } from "./feature-card";
import { FeatureExpandedPanel } from "./feature-expanded-panel";

const COLUMNS = 3;

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

const rows = chunk(FEATURES, COLUMNS);

export const FeaturesGrid = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedFeature = FEATURES.find((feature) => feature.id === selectedId) ?? null;

  const toggleFeature = (id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  };

  return (
    <Container as="section" className="mx-auto max-w-5xl px-6 py-24">
      <Text as="h2" size="3xl" font="lora" weight="medium" className="mb-10 block text-center">
        Discover what Verdictu can accomplish for you
      </Text>

      <div className="flex flex-col gap-4">
        {rows.map((row) => {
          const rowHasSelected = row.some((feature) => feature.id === selectedId);

          return (
            <div key={row[0]!.id} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {row.map((feature) => (
                  <FeatureCard
                    key={feature.id}
                    feature={feature}
                    isSelected={feature.id === selectedId}
                    onClick={() => toggleFeature(feature.id)}
                  />
                ))}
              </div>

              <AnimatePresence initial={false}>
                {rowHasSelected && selectedFeature && (
                  <motion.div
                    key={selectedFeature.id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <FeatureExpandedPanel
                      feature={selectedFeature}
                      onClose={() => setSelectedId(null)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Container>
  );
};
