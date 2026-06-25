import { Button } from "@/components/shared-components/button";
import { Text } from "@/components/shared-components/text";
import { ArrowBigDown, ArrowDown } from "lucide-react";

const Herobox = () => {
  return (
    <div className="flex flex-col bg-green-300 min-h-[92vh] mx-auto px-10">
      <div className="min-h-[35vh] bg-amber-200 flex flex-col items-start justify-center">
        <Text size={"8xl"} font="lora" className="my-1">
          Devoted to You.
        </Text>
        <Text size={"7xl"} font="lora" className="my-1">
          Dangerous to Everyone Else.
        </Text>
        {/* <Text size={"md"} >We are a team of passionate developers, designers, and marketers who are dedicated to creating the best possible experience for our users. We believe that the best way to achieve this is by putting our users first and foremost in everything we do.</Text> */}
        <Text size={"md"} className="mt-10 mb-5 max-w-[40vw]">
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
      <div className="min-h-[57vh] bg-green-800 flex justify-center items-center">
        <div className="w-[90%] h-[45vh] bg-red-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default Herobox;
