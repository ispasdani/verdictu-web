import { Button } from "@/components/shared-components/button";
import { Logo } from "@/components/shared-components/logo";
import { Text } from "@/components/shared-components/text";

import Link from "next/link";

export const DesktopNav = ({
  items,
}: {
  items: { title: string; href: string }[];
}) => {
  return (
    <div className="hidden h-[8vh] w-full items-center justify-between px-4 py-4 md:flex">
      <Logo />
      <div className="flex items-center gap-10">
        {items.map((item) => (
          <Link href={item.href} key={item.title} className="group">
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
