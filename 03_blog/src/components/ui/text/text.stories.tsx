import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./text";

const meta: Meta<typeof Text> = {
  title: "Typography / Text",
  component: Text,
  argTypes: {
    children: {
      control: "text",
    },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"],
    },
    variant: {
      control: "select",
      options: [
        "headline-1",
        "headline-2",
        "headline-3",
        "headline-4",
        "headline-5",
        "headline-6",
        "body",
        "body-small",
        "body-micro",
        "display",
        "lead",
        "label",
        "label-small",
      ],
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    children: "Text",
    as: "p",
    variant: "body",
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  render: (args) => <Text {...args} />,
};
