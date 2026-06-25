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
    <div className="hidden h-[8vh] w-full items-center justify-between py-4 md:flex">
      <div className="flex items-center gap-10">
        <Logo />
        {items.map((item) => (
          <Link href={item.href} key={item.title} className="group">
            <Button variant="link">
              <Text size="sm" color="muted" weight="light" hoverColor="default">
                {item.title}
              </Text>
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary">
          <Text size="sm" color="default" weight="light">
            Download for MacOS
          </Text>
        </Button>
        <Button variant="primary">
          <Text size="sm" color="inverted" weight="light">
            Get started
          </Text>
        </Button>
      </div>
    </div>
  );
};
