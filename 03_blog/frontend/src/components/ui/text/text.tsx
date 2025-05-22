import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

// Define allowed element types (excluding 'a' for simplicity)
type TextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

// Define typography variants
export type TextVariant =
  | "headline-1"
  | "headline-2"
  | "headline-3"
  | "headline-4"
  | "headline-5"
  | "headline-6"
  | "body"
  | "body-small"
  | "body-micro"
  | "display"
  | "lead"
  | "label"
  | "label-small";

// Props for the Text component
interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextElement;
  variant?: TextVariant;
  className?: string;
  children: ReactNode;
}

/**
 * Text component that can be rendered as different HTML elements
 * with consistent styling based on variants
 */
export const Text = ({
  as: Component = "p",
  variant = "body",
  className,
  children,
  ...props
}: TextProps) => {
  const variantClasses = {
    "headline-1": "typo-headline-1",
    "headline-2": "typo-headline-2",
    "headline-3": "typo-headline-3",
    "headline-4": "typo-headline-4",
    "headline-5": "typo-headline-5",
    "headline-6": "typo-headline-6",
    body: "typo-body",
    "body-small": "typo-body-small",
    "body-micro": "typo-body-micro",
    display: "typo-display",
    lead: "typo-lead",
    label: "typo-label",
    "label-small": "labe-small",
  };

  return (
    <Component {...props} className={clsx(variantClasses[variant], className)}>
      {children}
    </Component>
  );
};
