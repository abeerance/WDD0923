import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./card";

const meta: Meta<typeof Card> = {
  title: "Components / Data Display / Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

const cardArray = [
  { title: "Title" },
  { title: "Title1" },
  { title: "Title2" },
  { title: "Title3" },
  { title: "Title4" },
  { title: "Title5" },
  { title: "Title6" },
  { title: "Title7" },
];

const RenderCardGrid = () => {
  return (
    <div className="grid grid-cols-12">
      {cardArray.map((element) => (
        <div key={element.title} className="col-span-2">
          <Card title={element.title} />
        </div>
      ))}
    </div>
  );
};

export const Default: Story = {
  render: () => <RenderCardGrid />,
};
