import { Container } from "@/components/shared-components/container";
import { DesktopNav } from "./desktop-nav";
import { items } from "@/marketing-data/navbar-data";
import { MobileNav } from "./mobile-nav";

export const Navbar = () => {
  return (
    <Container as="nav">
      <DesktopNav items={items} />
      <MobileNav items={items} />
    </Container>
  );
};
