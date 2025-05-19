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
        className={cn("grid grid-cols-12 gap-m w-full max-w-[1256px] px-xs mx-auto", className)}
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
    const singleSpan = typeof span === "number";
    const lgSpan = singleSpan ? span : span.lg ?? 1;
    const mdSpan = singleSpan ? span : span.md ?? lgSpan;
    const smSpan = singleSpan ? span : span.sm ?? mdSpan;

    // Calculate offset classes (add 1 because col-start-1 is the default position)
    const singleOffset = typeof offset === "number";
    const lgOffset = singleOffset ? offset : offset.lg ?? 0;
    const mdOffset = singleOffset ? offset : offset.md ?? lgOffset;
    const smOffset = singleOffset ? offset : offset.sm ?? mdOffset;

    // Build class strings
    const spanClasses = `col-span-${smSpan} md:col-span-${mdSpan} lg:col-span-${lgSpan}`;

    let offsetClasses = "";
    if (smOffset > 0) offsetClasses += ` col-start-${smOffset + 1}`;
    if (mdOffset > 0) offsetClasses += ` md:col-start-${mdOffset + 1}`;
    if (lgOffset > 0) offsetClasses += ` lg:col-start-${lgOffset + 1}`;

    return (
      <div ref={ref} {...props} className={cn(spanClasses, offsetClasses, className)}>
        {children}
      </div>
    );
  }
);

GridItem.displayName = "GridItem";
