import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    size: {
      control: "select",
      options: ["label", "label-small"],
    },
    leftSection: {
      table: {
        disable: true,
      },
    },
    rightSection: {
      table: {
        disable: true,
      },
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

export const LeftIcon: Story = {
  render: (args) => <Button {...args} leftSection={<ChevronLeft />} />,
};

export const RightIcon: Story = {
  render: (args) => <Button {...args} rightSection={<ChevronRight />} />,
};
