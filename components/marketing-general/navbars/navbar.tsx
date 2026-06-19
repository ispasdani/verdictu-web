import { Container } from "@/components/shared-components/container";
import { DesktopNav } from "./desktop-nav";
import { items } from "@/marketing-data/navbar-data";

export const Navbar = () => {
  return (
    <Container as="nav">
      <DesktopNav items={items} />
    </Container>
  );
};
