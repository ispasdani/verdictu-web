import { Logo } from "@/components/shared-components/logo";
import { Text } from "@/components/shared-components/text";
import { Button } from "@/components/ui/button";
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
        <Button>Try it now</Button>
      </div>
    </div>
  );
};
