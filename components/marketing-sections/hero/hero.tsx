import { Button } from "@/components/shared-components/button";
import { Text } from "@/components/shared-components/text";

const Herobox = () => {
  return (
    <div className="flex flex-col bg-green-300 min-h-[92vh]">
      <div className="flex flex-col">
        <Text size={"6xl"}>Devoted to You.</Text>
        <Text size={"5xl"}>Dangerous to Everyone Else.</Text>
        {/* <Text size={"md"} >We are a team of passionate developers, designers, and marketers who are dedicated to creating the best possible experience for our users. We believe that the best way to achieve this is by putting our users first and foremost in everything we do.</Text> */}
        <Text size={"md"}>
          Like the most loyal dog you've ever had — except it reads case law,
          writes your contracts, ranks your content, and remembers every
          conversation you've ever had. It stays. It learns. It never turns on
          you.
        </Text>
        <Button variant="link">
          <Text size="sm" color="default" weight="light">
            Try it now
          </Text>
        </Button>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Herobox;
