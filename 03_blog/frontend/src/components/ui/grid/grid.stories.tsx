import type { Meta, StoryObj } from "@storybook/react";
import { Grid, GridItem } from "./grid";
import { ComponentProps } from "react";

type GridStoryArgs = ComponentProps<typeof Grid> &
  ComponentProps<typeof GridItem> & { amountOfItems?: number };

const meta: Meta<GridStoryArgs> = {
  title: "Styleguide / Grid",
  component: Grid,
  argTypes: {
    span: {
      control: { type: "range", min: 1, max: 12, step: 1 },
      description: "The amount of columns the grid item should span.",
      table: {
        type: { summary: "number | { sm?: number; md?: number; lg?: number }" },
        defaultValue: { summary: "1" },
      },
    },
    offset: {
      control: { type: "range", min: 0, max: 11, step: 1 },
      description: "The amount of columns the grid item should be offset.",
      table: {
        type: { summary: "number | { sm?: number; md?: number; lg?: number }" },
        defaultValue: { summary: "0" },
      },
    },
    amountOfItems: {
      control: { type: "number", min: 1, max: 24, step: 1 },
      description: "The amount of grid items to render. Only used for storybook.",
      table: {
        type: { summary: "number" },
      },
    },
    className: {
      control: false,
    },
  },
  args: {
    span: 1,
    offset: 0,
    amountOfItems: 12,
  },
};

export default meta;
type Story = StoryObj<GridStoryArgs>;

export const Default: Story = {
  render: (args) => (
    <Grid>
      {Array.from({ length: args.amountOfItems ?? 12 }).map((_, index) => (
        <GridItem
          key={index}
          offset={args.offset}
          span={args.span}
          className="h-48 bg-pink-100 text-black flex justify-center items-center"
        >
          {index + 1}
        </GridItem>
      ))}
    </Grid>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <Grid>
      {Array.from({ length: 6 }).map((_, index) => (
        <GridItem
          key={index}
          span={{ sm: 12, md: 6, lg: 4 }}
          className="h-48 bg-blue-100 text-black flex justify-center items-center"
        >
          Item {index + 1}: sm=12, md=6, lg=4
        </GridItem>
      ))}
    </Grid>
  ),
};

export const WithOffset: Story = {
  render: () => (
    <Grid>
      <GridItem
        span={6}
        offset={3}
        className="h-48 bg-green-100 text-black flex justify-center items-center"
      >
        span=6, offset=3
      </GridItem>
      <GridItem
        span={4}
        offset={2}
        className="h-48 bg-yellow-100 text-black flex justify-center items-center"
      >
        span=4, offset=2
      </GridItem>
    </Grid>
  ),
};
