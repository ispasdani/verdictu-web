import { Container } from "@/components/shared-components/container";
import { Text } from "@/components/shared-components/text";

const OurMission = () => {
  return (
    <Container as="section" className="mx-auto w-full my-15">
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-border">
        <div className="min-h-[20rem] md:min-h-full bg-neutral-100 dark:bg-neutral-800" />

        <div className="flex flex-col justify-center gap-6 bg-neutral-900 p-8 md:p-12">
          <div className="flex flex-col gap-4">
            <Text size="sm" weight="semibold" color="inverted" className="uppercase tracking-widest">
              Our Mission
            </Text>
            <Text as="h3" size="3xl" font="lora" weight="medium" color="inverted" className="block">
              Law and clarity for everyone.
            </Text>
          </div>

          <Text size="sm" color="inverted" className="block opacity-90">
            At Verdictu, we believe that the law should be accessible to
            everyone. Our mission is to break down complex legal concepts
            into clear, understandable language — empowering individuals to
            navigate the legal landscape with confidence.
          </Text>

          <Text size="sm" color="inverted" className="block opacity-90">
            We are committed to delivering independent, rigorous legal
            analysis that upholds the principles of justice, transparency,
            and accountability. Whether you are a legal professional, a
            student, or a curious citizen, Verdictu is your trusted source
            for law and clarity.
          </Text>

          <div className="flex flex-col gap-1 pt-4 border-t border-white/20">
            <Text size="lg" weight="semibold" color="inverted" className="block">
              Founder Name
            </Text>
            <Text size="sm" color="inverted" className="block opacity-90">
              Founder &amp; Editor-in-Chief
            </Text>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OurMission;
