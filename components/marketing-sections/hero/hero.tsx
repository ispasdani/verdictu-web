import { AIChatBubble } from "@/components/marketing-general/ai-chat-bubble/ai-chat-bubble";
import { Button } from "@/components/shared-components/button";
import { Text } from "@/components/shared-components/text";
import Image from "next/image";

const Herobox = () => {
  return (
    <div className="flex flex-col min-h-[92vh] mx-auto max-w-[140rem]">
      <div className="min-h-[35vh] flex flex-col items-start justify-center">
        <Text size={"8xl"} font="lora" className="my-1">
          Devoted to You.
        </Text>
        <Text size={"7xl"} font="lora" className="my-1">
          Dangerous to Everyone Else.
        </Text>
        {/* <Text size={"md"} >We are a team of passionate developers, designers, and marketers who are dedicated to creating the best possible experience for our users. We believe that the best way to achieve this is by putting our users first and foremost in everything we do.</Text> */}
        <Text size={"sm"} className="mt-10 mb-5 max-w-[40vw]">
          Like the most loyal dog you've ever had — except it reads case law,
          writes your contracts, ranks your content, and remembers every
          conversation you've ever had. It stays. It learns. It never turns on
          you.
        </Text>
        <Button variant="primary">
          <Text size="sm" color="inverted" weight="light">
            Try it now
          </Text>
        </Button>
      </div>
      <div className="min-h-[50vh] flex justify-center items-start relative">
        <div className="w-full h-[45vh] rounded-md relative">
          <Image
            src={"/assets/images/hero-image.webp"}
            alt="Hero Image"
            fill
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full px-6 flex justify-center">
          <AIChatBubble />
        </div>
      </div>
    </div>
  );
};

export default Herobox;
