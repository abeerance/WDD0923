import { Button, ButtonTwo } from "@/components/ui/button/button";
import { CardStrict, CardWithReactNode } from "@/components/ui/card/card";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-2">
      <p>This is the homepage</p>
      <Button label="Hey button" />
      <ButtonTwo>React</ButtonTwo>
      <div className="flex gap-6 flex-wrap">
        <CardStrict
          title="Switzerland"
          description="Visit the beautiful cities of Switzerland"
          buttonLabel="Find out more"
        />
        <CardStrict
          title="Germany"
          description="Check out the best Doner Kebab"
          buttonLabel="Find out more"
        />
        <CardStrict
          title="Italy"
          description="We got the best pasta in the world"
          buttonLabel="Find out more"
        />
        <CardWithReactNode>
          <Button label="This is weird" />
          <h1>Im a bit different</h1>
        </CardWithReactNode>
        <CardWithReactNode>
          <h1>This is super weird</h1>
          <Button label="This is weird" />
        </CardWithReactNode>
      </div>
    </div>
  );
}
