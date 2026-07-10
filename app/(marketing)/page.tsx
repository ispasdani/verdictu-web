import Herobox from "@/components/marketing-sections/hero/hero";
import { FeaturesGrid } from "@/components/marketing-sections/features-grid/features-grid";
import OurMission from "@/components/marketing-sections/our-mission/our-mission";

export default function HomePage() {
  return (
    <div>
      <Herobox />
      <FeaturesGrid />
      <OurMission />
    </div>
  );
}
