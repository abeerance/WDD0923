import { Button, ButtonReactNode } from "@/components/ui/button/button";
import { Card, CardCombined, CardReactNode } from "@/components/ui/card/card";
import { Text } from "@/components/ui/typography/text";
import { Title } from "@/components/ui/typography/title";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-2">
      <Card
        title="This is the card without ReactNode"
        description="This is a click counter"
        text="This is the without ReactNode Text"
        minusButtonLabel="-"
        additionButtonLabel="+"
      />

      <CardReactNode>
        <Title>A simple click counter with ReactNode</Title>
        <Title headingLevel={4}>This will display another Click counter card</Title>
        <Text>Current count: 0</Text>
        <div className="self-end flex gap-4">
          <Button label="-" />
          <ButtonReactNode>+</ButtonReactNode>
        </div>
        <button className="bg-red-500 text-white self-start p-2.5 rounded">
          This is outside the div
        </button>
      </CardReactNode>

      <CardCombined
        title="This is the combined base Card"
        description="This will be a simple counter in the future"
        text="We are coming along with the React"
      >
        <div className="self-end flex gap-4">
          <Button label="-" />
          <ButtonReactNode>+</ButtonReactNode>
        </div>
        <button className="bg-red-500 text-white self-start p-2.5 rounded">
          This is outside the div
        </button>
      </CardCombined>
    </div>
  );
}
