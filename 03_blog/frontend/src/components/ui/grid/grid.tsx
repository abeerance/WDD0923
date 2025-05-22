import type { PropsWithChildren, HTMLProps } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GridProps extends HTMLProps<HTMLDivElement> {
  className?: string;
}

export const Grid = forwardRef<HTMLDivElement, PropsWithChildren<GridProps>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "grid grid-cols-12 gap-6 w-full max-w-[1256px] px-4 mx-auto",
          "auto-rows-auto grid-flow-row",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

type GridBreakpointValues = {
  sm?: number;
  md?: number;
  lg?: number;
};

interface GridItemProps extends Omit<HTMLProps<HTMLDivElement>, "span"> {
  span?: number | GridBreakpointValues;
  offset?: number | GridBreakpointValues;
  className?: string;
}

export const GridItem = forwardRef<HTMLDivElement, PropsWithChildren<GridItemProps>>(
  ({ span = 1, offset = 0, className, children, ...props }, ref) => {
    // Calculate span classes
    const spanClasses = [];
    const offsetClasses = [];

    // Handle span values
    if (typeof span === "number") {
      // Single span value for all breakpoints
      spanClasses.push(getSpanClass(span));
    } else {
      // Responsive span values
      if (span.sm !== undefined) spanClasses.push(getSpanClass(span.sm));
      if (span.md !== undefined) spanClasses.push(getMdSpanClass(span.md));
      if (span.lg !== undefined) spanClasses.push(getLgSpanClass(span.lg));
    }

    // Handle offset values
    if (typeof offset === "number") {
      // Single offset value for all breakpoints
      if (offset > 0) offsetClasses.push(getOffsetClass(offset));
    } else {
      // Responsive offset values
      if (offset.sm !== undefined && offset.sm > 0) offsetClasses.push(getOffsetClass(offset.sm));
      if (offset.md !== undefined && offset.md > 0) offsetClasses.push(getMdOffsetClass(offset.md));
      if (offset.lg !== undefined && offset.lg > 0) offsetClasses.push(getLgOffsetClass(offset.lg));
    }

    return (
      <div
        ref={ref}
        {...props}
        className={cn(spanClasses.join(" "), offsetClasses.join(" "), className)}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = "GridItem";

// Helper functions to map span/offset values to predefined Tailwind classes
function getSpanClass(span: number): string {
  const spanMap: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  };
  return spanMap[span] || "col-span-1";
}

function getMdSpanClass(span: number): string {
  const spanMap: Record<number, string> = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
    5: "md:col-span-5",
    6: "md:col-span-6",
    7: "md:col-span-7",
    8: "md:col-span-8",
    9: "md:col-span-9",
    10: "md:col-span-10",
    11: "md:col-span-11",
    12: "md:col-span-12",
  };
  return spanMap[span] || "md:col-span-1";
}

function getLgSpanClass(span: number): string {
  const spanMap: Record<number, string> = {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    4: "lg:col-span-4",
    5: "lg:col-span-5",
    6: "lg:col-span-6",
    7: "lg:col-span-7",
    8: "lg:col-span-8",
    9: "lg:col-span-9",
    10: "lg:col-span-10",
    11: "lg:col-span-11",
    12: "lg:col-span-12",
  };
  return spanMap[span] || "lg:col-span-1";
}

function getOffsetClass(offset: number): string {
  const offsetMap: Record<number, string> = {
    1: "col-start-2",
    2: "col-start-3",
    3: "col-start-4",
    4: "col-start-5",
    5: "col-start-6",
    6: "col-start-7",
    7: "col-start-8",
    8: "col-start-9",
    9: "col-start-10",
    10: "col-start-11",
    11: "col-start-12",
  };
  return offsetMap[offset] || "";
}

function getMdOffsetClass(offset: number): string {
  const offsetMap: Record<number, string> = {
    1: "md:col-start-2",
    2: "md:col-start-3",
    3: "md:col-start-4",
    4: "md:col-start-5",
    5: "md:col-start-6",
    6: "md:col-start-7",
    7: "md:col-start-8",
    8: "md:col-start-9",
    9: "md:col-start-10",
    10: "md:col-start-11",
    11: "md:col-start-12",
  };
  return offsetMap[offset] || "";
}

function getLgOffsetClass(offset: number): string {
  const offsetMap: Record<number, string> = {
    1: "lg:col-start-2",
    2: "lg:col-start-3",
    3: "lg:col-start-4",
    4: "lg:col-start-5",
    5: "lg:col-start-6",
    6: "lg:col-start-7",
    7: "lg:col-start-8",
    8: "lg:col-start-9",
    9: "lg:col-start-10",
    10: "lg:col-start-11",
    11: "lg:col-start-12",
  };
  return offsetMap[offset] || "";
}
