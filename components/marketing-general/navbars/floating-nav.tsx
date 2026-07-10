"use client";

import { Logo } from "@/components/shared-components/logo";
import { Text } from "@/components/shared-components/text";
import { Button } from "@/components/shared-components/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export const FloatingNav = ({
  items,
}: {
  items: { title: string; href: string }[];
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY >= 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`shadow-aceternity fixed inset-x-0 top-0 z-100 mx-auto hidden max-w-7xl items-center justify-between bg-white/80 px-2 py-2 backdrop-blur-sm transition-transform duration-300 ease-out md:flex xl:rounded-2xl dark:bg-neutral-900/80 dark:shadow-[0px_2px_0px_0px_var(--color-neutral-800),0px_-2px_0px_0px_var(--color-neutral-800)] ${visible ? "translate-y-[10px]" : "-translate-y-[100px]"}`}
    >
      <Logo />
      <div className="flex items-center gap-10">
        {items.map((item) => (
          <Link
            className="font-medium text-gray-600 transition duration-200 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-neutral-300"
            href={item.href}
            key={item.title}
          >
            <Text size="sm" color="muted" weight="light" hoverColor="default">
              {item.title}
            </Text>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="primary">
                  <Text size="sm" color="inverted" weight="light">
                    Get started
                  </Text>
                </Button> 
      </div>
    </div>
  );
};
