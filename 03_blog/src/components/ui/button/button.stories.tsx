import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components / Buttons / Button",
  component: Button,
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive"],
    },
  },
  args: {
    children: "Button",
    variant: "primary",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button {...args} />,
};
